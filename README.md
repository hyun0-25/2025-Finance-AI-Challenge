# 2025-Finance-AI-Challenge
# AI 캘린더

사용자의 일정과 지출 계획을 연결하여 **맞춤형 금융 혜택을 추천**하는 서비스입니다.  
(트랙2) 공모전 기획서 양식2_생성형AI설명추가_250916.hwp 참조.  
기존 카드사 모바일 앱 내 `슈퍼 앱` 기능으로 구현되어, 고객이 여행, 결혼식 등 중요한 이벤트를 놓치지 않고 최적의 카드 혜택을 활용할 수 있도록 돕습니다.

---

## 📌 주요 기능

### 1. AI 체크리스트
- 사용자가 캘린더에 일정을 입력하면, AI가 해당 이벤트에 필요한 소비 항목들을 자동으로 제안합니다.

### 2. AI 카드 추천
- 체크리스트 항목을 기반으로 사용자의 **보유 카드**와 **신규 추천 카드** 중 최적의 혜택을 제공하는 카드를 선별하여 추천합니다.

### 3. 맞춤형 알림
- 일정명과 D-Day에 맞춰 **AI가 생성한 개인화된 알림 메시지**(제목 및 본문)를 전송하여 사용자의 금융 생활을 돕습니다.

### 4. 개인화된 분기별 리포트
- 지난 일정들을 요약하고, 이를 기반으로 생성된 **개인화 키워드**와 **캐릭터 이미지**를 제공하여 사용자가 자신의 라이프스타일을 돌아볼 수 있는 재미있는 경험을 제공합니다.

---

## 🏗️ 아키텍처

AI 캘린더 서비스는 **3개의 주요 모듈(Frontend, Backend, AI Server)** 로 구성된 마이크로서비스 아키텍처를 따릅니다.

- **Frontend**: 사용자 인터페이스 담당 (React, TypeScript, Vite)
- **Backend**: 핵심 비즈니스 로직 처리 (Spring Boot)
- **AI Server**: AI 관련 기능 전담 (FastAPI + OpenAI API)

### 📷 아키텍처 다이어그램


---

## 🗂 IA 구조도
<img width="822" height="740" alt="ai_challenge (1)" src="https://github.com/user-attachments/assets/31b1b298-07db-4ab2-840e-88921ed11a2f" />


---

## 📂 기술 스택

### Frontend
- React, TypeScript, Vite, React Router, Tailwind CSS

### Backend
- Spring Boot, Java 17, JPA, MySQL

### AI Server
- FastAPI, Python, OpenAI API, PyMySQL

---

## ⚙️ 설치 및 실행 방법

### 1. Frontend
```bash
cd frontend/app
npm install
npm run dev
```

### 2. Backend
```bash
cd backend
./gradlew bootRun
```

### 3. AI Server
```bash
cd ai-server
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## 🌱 Git Branch 전략
- **main**: 운영 배포용 브랜치
- **develop**: 개발 통합 브랜치
- **feature/**: 기능 단위 개발 브랜치
- **hotfix/**: 긴급 수정 브랜치

---

## 📏 코드 컨벤션

---

## 🚀 배포 아키텍처

---

## 📜 라이선스

