import os, json
from openai import OpenAI
from utils_db import get_connection


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
DEFAULT_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

def generate_notification(schedule_name, days_left, model=DEFAULT_MODEL):
    prompt = f"""
일정명: {schedule_name}
D-Day: D{days_left:+}

조건:
- 준비를 상기시키는 리마인드 문구 1개 생성
- 문구에 D-Day 정보를 반드시 포함
- 친근하고 간결하게 작성
- JSON {{ "message": "..." }} 형태로만 출력
"""
    resp = client.chat.completions.create(
        model=model,
        messages=[
            {"role":"system","content":"너는 카드사 앱의 리마인드 알림 생성기다."},
            {"role":"user","content":prompt}
        ],
        response_format={"type":"json_object"},
        temperature=0.7
    )
    return json.loads(resp.choices[0].message.content)

def main(schedule_id=4):
    conn = get_connection()
    with conn.cursor() as cur:
        cur.execute("SELECT schedule_name, schedule_start_date FROM schedule WHERE schedule_id=%s", (schedule_id,))
        row = cur.fetchone()

        if row:
            schedule_name = row["schedule_name"]

            # 발송 규칙 결정
            if "여행" in schedule_name:
                remind_day = -7   # 여행이면 D-7
            else:
                remind_day = -3   # 이외는 D-3

            notif = generate_notification(schedule_name, remind_day)

           
            print(json.dumps(notif, ensure_ascii=False, indent=2))
            with open("notification_results.json", "w", encoding="utf-8") as f:
                json.dump(notif, f, ensure_ascii=False, indent=2)

            print("\n[저장 완료] notification_results.json")
        else:
            print("해당 schedule_id 없음")

if __name__ == "__main__":
    main()
