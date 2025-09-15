from fastapi import APIRouter
from app.services.card_recommend_service import run_task2
from app.services.card_recommend_service import (
    CardRecommendRequest,
    CardRecommendResponse,
)

router = APIRouter()


@router.post("/card-recommend", response_model=CardRecommendResponse)
def create_card_recommend(request: CardRecommendRequest):
    return run_task2(request)
