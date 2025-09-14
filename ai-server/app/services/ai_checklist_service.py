import os, re, json
from openai import OpenAI
from dotenv import load_dotenv
from app.schemas.ai_checklist_schema import (
    ChecklistRequest,
    ChecklistResponse,
    ChecklistItem,
)

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
DEFAULT_MODEL = "gpt-4o-mini"

CATEGORIES = [
    "ALL_MERCHANTS",
    "TRANSPORTATION",
    "FUEL",
    "TELEPHONE_CHARGE",
    "MART_CONVENIENCE_STORE",
    "ONLINE_SHOPPING",
    "SHOPPING",
    "FOOD",
    "CAFE_DESSERT",
    "BEAUTY_FITNESS",
    "NO_SPENDING_REQUIREMENT",
    "UTILITY_BILLS_RENTAL",
    "HOSPITAL_PHARMACY",
    "PETS",
    "EDUCATION_CHILDCARE",
    "AUTOMOBILE_HI_PASS",
    "LEISURE_SPORTS",
    "DIGITAL_SUBSCRIPTION",
    "MOVIES_CULTURE",
    "EASY_PAYMENT",
    "AIRLINE_MILEAGE",
    "AIRPORT_LOUNGE_PRIORITY_PASS",
    "PREMIUM",
    "TRAVEL_ACCOMMODATION",
    "OVERSEAS",
    "BUSINESS",
    "ETC",
]

CHECKLIST_SCHEMA = {
    "name": "checklist_schema",
    "strict": True,
    "schema": {
        "type": "object",
        "properties": {
            "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "checklist_item_category": {
                            "type": "string",
                            "enum": CATEGORIES,
                        },
                        "checklist_item_content": {"type": "string"},
                    },
                    "required": ["checklist_item_category", "checklist_item_content"],
                    "additionalProperties": False,
                },
                "minItems": 2,
                "maxItems": 7,
            }
        },
        "required": ["items"],
        "additionalProperties": False,
    },
}


def llm_generate_checklist(schedule_name, model=DEFAULT_MODEL):
    prompt = f"""
일정명: {schedule_name}

규칙:
- 반드시 위 27개 카테고리(enum) 중 하나만 사용. 새로운 카테고리는 금지.
- 카드 결제/소비로 이어지는 항목만 생성.
- '확인/알림/준비/경로확인' 등 소비와 무관한 항목은 제외.
- 항목은 구체적인 소비 행동으로 작성 (예: '왕복 항공권 예매', '호텔 예약', '맛집 예약')
- 적절한 카테고리가 없으면 ETC 사용.
출력은 JSON만.
"""
    resp = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "너는 카드사 앱의 AI 체크리스트 생성기다."},
            {"role": "user", "content": prompt},
        ],
        response_format={"type": "json_schema", "json_schema": CHECKLIST_SCHEMA},
        temperature=0,
    )
    raw = json.loads(resp.choices[0].message.content)
    items = raw.get("items", [])
    return ensure_valid_categories(items)


def ensure_valid_categories(items):
    out = []
    for it in items:
        cat = it.get("checklist_item_category", "ETC")
        if cat not in CATEGORIES:
            cat = "ETC"
        text = (it.get("checklist_item_content") or "").strip()
        if re.search(r"(경로|확인|알림|준비|체크)", text):
            continue
        if len(text) < 2:
            continue
        out.append(
            {
                "checklistItemCategory": cat,
                "checklistItemContent": text,
                "checklistItemIsChecked": False,
            }
        )
    return out[:7]


def run_task1(request: ChecklistRequest) -> ChecklistResponse:

    checklist = llm_generate_checklist(request.scheduleName)
    checklist_response = [ChecklistItem(**item) for item in checklist]  # json -> model
    return ChecklistResponse(checklist=checklist_response)
