from pydantic import BaseModel


class NotificationRequest(BaseModel):
    scheduleName: str


class NotificationResponse(BaseModel):
    notificationTitle: str
    notificationContent: str
