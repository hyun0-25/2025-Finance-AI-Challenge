from fastapi import APIRouter
from app.services.ai_checklist_service import run_task1
from app.schemas.ai_checklist import ChecklistRequest, ChecklistResponse

router = APIRouter()


@router.post("/ai-checklist", response_model=ChecklistResponse)
def create_ai_checklist(request: ChecklistRequest):
    return run_task1(request)
