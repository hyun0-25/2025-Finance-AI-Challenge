import os, json
from openai import OpenAI
from app.utils.utils_db import get_connection
from dotenv import load_dotenv
from app.schemas.notification_schema import NotificationRequest, NotificationResponse

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
DEFAULT_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")


def generate_notification(schedule_name, days_left, model=DEFAULT_MODEL):
    prompt = f"""
일정명: {schedule_name}
D-Day: D{days_left:+}

조건:
- JSON {{ "title": "...", "body": "..." }} 형태로만 출력
- title: 일정명과 D-Day를 포함한 짧고 요약된 알림 제목 (다양하게 생성, 매번 똑같은 문구 X)
- body: D-Day 정보를 포함하여 친근하고 따뜻하게 작성된 설명 문구 (title보다 조금 길게)
"""
    resp = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "너는 카드사 앱의 리마인드 알림 생성기다."},
            {"role": "user", "content": prompt},
        ],
        response_format={"type": "json_object"},
        temperature=0.9,  # 다양성 확보
    )
    return json.loads(resp.choices[0].message.content)


def run_task3(request: NotificationRequest) -> NotificationResponse:
    # 발송 규칙 결정
    if "여행" in request.scheduleName:
        remind_day = -7  # 여행이면 D-7
    else:
        remind_day = -3  # 이외는 D-3

    notification = generate_notification(request.scheduleName, remind_day)
    return NotificationResponse(
        notificationTitle=notification["title"],
        notificationContent=notification["body"],
    )
