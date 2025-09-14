import os, re, json
from openai import OpenAI
from utils_db import get_connection  


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
DEFAULT_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

CATEGORIES = [
    "ALL_MERCHANTS","TRANSPORTATION","FUEL","TELEPHONE_CHARGE",
    "MART_CONVENIENCE_STORE","ONLINE_SHOPPING","SHOPPING","FOOD",
    "CAFE_DESSERT","BEAUTY_FITNESS","NO_SPENDING_REQUIREMENT",
    "UTILITY_BILLS_RENTAL","HOSPITAL_PHARMACY","PETS",
    "EDUCATION_CHILDCARE","AUTOMOBILE_HI_PASS","LEISURE_SPORTS",
    "DIGITAL_SUBSCRIPTION","MOVIES_CULTURE","EASY_PAYMENT",
    "AIRLINE_MILEAGE","AIRPORT_LOUNGE_PRIORITY_PASS","PREMIUM",
    "TRAVEL_ACCOMMODATION","OVERSEAS","BUSINESS","ETC"
]

def classify_category(item_name, model=DEFAULT_MODEL):
    prompt = f"""
아래 항목을 반드시 주어진 카테고리 27개 중 하나로 분류해.
항목: {item_name}
카테고리: {', '.join(CATEGORIES)}
출력은 JSON {{ "category": "..." }} 만.
"""
    resp = client.chat.completions.create(
        model=model,
        messages=[
            {"role":"system","content":"너는 카드사 앱의 AI 체크리스트 카테고리 분류기다."},
            {"role":"user","content":prompt}
        ],
        response_format={"type":"json_object"},
        temperature=0
    )
    raw = json.loads(resp.choices[0].message.content)
    return raw.get("category","ETC")

# 카드 추천 로직 
def recommend_cards(schedule_id, user_id, conn, max_cards=4):
    with conn.cursor() as cur:
        # 1. 체크된 체크리스트 항목 가져오기
        cur.execute("""
            SELECT ci.checklist_item_id, ci.checklist_item_name
            FROM checklist_item ci
            JOIN schedule s ON s.schedule_id = ci.schedule_id
            WHERE s.schedule_id=%s AND ci.checklist_item_is_checked=b'1' AND ci.is_deleted=b'0'
        """, (schedule_id,))
        checked_items = cur.fetchall()

        if not checked_items:
            return {"user_card_recommend": [], "new_card_recommend": []}

        # 2. 항목 → 카테고리 분류 (LLM)
        categories = []
        for it in checked_items:
            cat = classify_category(it["checklist_item_name"])
            if cat in CATEGORIES:
                categories.append(cat)
        categories = list(set(categories)) 

        if not categories:
            return {"user_card_recommend": [], "new_card_recommend": []}

        # 3. 보유 카드 확인
        cur.execute("SELECT card_id FROM user_card WHERE user_id=%s AND is_deleted=b'0'", (user_id,))
        user_cards = {row["card_id"] for row in cur.fetchall()}

        # 4. 카테고리별 혜택 조회
        cur.execute("""
            SELECT b.benefit_id, b.benefit_category, b.benefit_content,
                   b.benefit_percent, b.benefit_amount_limit, b.card_id,
                   c.card_name
            FROM benefit b
            JOIN card c ON c.card_id = b.card_id
            WHERE b.is_deleted=b'0' AND b.benefit_category IN %s
        """, (categories,))
        benefit_rows = cur.fetchall()

        if not benefit_rows:
            return {"user_card_recommend": [], "new_card_recommend": []}

        # 5. 점수 계산 & 추천 문구
        scored = []
        for b in benefit_rows:
            score = (b["benefit_percent"] or 0) * (b["benefit_amount_limit"] or 1)
            if b["card_id"] in user_cards:
                content = f"보유 중인 {b['card_name']} 카드를 통해 {b['benefit_content']} 혜택을 받을 수 있습니다"
            else:
                content = f"{b['card_name']} 발급 후 이용 시 {b['benefit_content']} 혜택을 받을 수 있어요!"
            scored.append({
                "card_id": b["card_id"],
                "card_name": b["card_name"],
                "is_user_card": b["card_id"] in user_cards,
                "recommend_content": content,
                "score": score
            })

        # 6. 카드별 중복 제거 (가장 점수 높은 혜택만 남기기)
        deduped = {}
        for x in scored:
            cid = x["card_id"]
            if cid not in deduped or x["score"] > deduped[cid]["score"]:
                deduped[cid] = x
        scored = list(deduped.values())

        # 7. 정렬 후 상위 max_cards
        scored.sort(key=lambda x: x["score"], reverse=True)
        top = scored[:max_cards]

        # 8. 보유/신규 분리
        user_recs = [{"card_id": x["card_id"], "recommend_content": x["recommend_content"]}
                     for x in top if x["is_user_card"]]
        new_recs = [{"card_id": x["card_id"], "recommend_content": x["recommend_content"]}
                    for x in top if not x["is_user_card"]]

        return {"user_card_recommend": user_recs, "new_card_recommend": new_recs}

if __name__ == "__main__":
    conn = get_connection()

    schedule_id = 4
    user_id = b'\x89\xdb\xf5>\xc7EE\xe0\x88\x07;\x11#-\xbb\xb9'

    result = recommend_cards(schedule_id, user_id, conn)

    print(json.dumps(result, ensure_ascii=False, indent=2))
    with open("card_recommend_results.json", "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    print("\n[저장 완료] card_recommend_results.json")
