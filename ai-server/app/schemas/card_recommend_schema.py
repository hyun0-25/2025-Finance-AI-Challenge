from pydantic import BaseModel
from typing import List


class CardRecommendRequest(BaseModel):
    scheduleId: int
    userUUID: str


class CardRecommendItem(BaseModel):
    cardId: int
    recommendContent: str


class CardRecommendResponse(BaseModel):
    userCardRecommend: List[CardRecommendItem]
    newCardRecommend: List[CardRecommendItem]
