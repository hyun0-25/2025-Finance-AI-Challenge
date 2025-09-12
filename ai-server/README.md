# FastAPI Schedule Processor

## 소개
Spring Boot와 연동되는 FastAPI 서버 프로젝트

## 구조
- app/
  - main.py
  - routers/
  - services/
  - schemas/

## 실행 방법
1. 가상환경 생성 및 활성화
   ```bash
   python -m venv venv
   source venv/bin/activate  # mac/linux
   venv\Scripts\activate     # Windows
2. 패키지 설치
    ```bash
    pip install -r requirements.txt
3. 서버 실행
    ```bash
    cd app
    uvicorn app.main:app --reload
4. 브라우저에서 확인:
    ```bash
    http://127.0.0.1:8000
    → 기본 root 엔드포인트

    http://127.0.0.1:8000/docs
    → Swagger UI 자동 문서화

    http://127.0.0.1:8000/redoc
    → ReDoc 문서