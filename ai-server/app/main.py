from fastapi import FastAPI
from app.routers import ai_checklist_router

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Hello FastAPI!"}


app.include_router(ai_checklist_router.router)
