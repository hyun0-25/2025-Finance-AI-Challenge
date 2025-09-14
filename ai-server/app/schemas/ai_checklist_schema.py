from pydantic import BaseModel
from typing import List


class ChecklistRequest(BaseModel):
    scheduleName: str


class ChecklistItem(BaseModel):
    checklistItemCategory: str
    checklistItemContent: str
    checklistItemIsChecked: bool


class ChecklistResponse(BaseModel):
    checklist: List[ChecklistItem]
