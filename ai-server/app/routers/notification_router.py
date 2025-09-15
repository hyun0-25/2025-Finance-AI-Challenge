from fastapi import APIRouter
from app.services.notification_service import run_task3
from app.schemas.notification_schema import NotificationResponse, NotificationRequest

router = APIRouter()


@router.post("/notification", response_model=NotificationResponse)
def create_card_recommend(request: NotificationRequest):
    return run_task3(request)
