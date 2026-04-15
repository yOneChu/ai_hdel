# 🏗️ Smart Procurement Analyzer (스마트 구매 분석기)

AI 기반의 구매 발주 데이터 분석 및 원가 절감 솔루션입니다. 구매 이력, 단가 변동, 유사 프로젝트 데이터를 종합적으로 분석하여 최적의 구매 의사결정을 지원합니다.

## 🚀 주요 기능

- **AI 단가 분석**: Gemini 3 Flash 모델을 활용하여 단가 상승 품목을 식별하고 그 원인을 분석합니다.
- **대체 품목 제안**: 현재 사용 중인 자재를 대체할 수 있는 효율적인 품목과 그에 따른 기대 효과를 제안합니다.
- **원가 절감 전략**: 데이터 기반의 원가 절감 후보군을 추출하고 구체적인 실행 전략을 제공합니다.
- **대시보드 시각화**:
  - 품목별 단가 변동 추이 (Line Chart)
  - 프로젝트별 원가 분포 (Bar Chart)
  - 최근 발주 내역 및 주의 품목 알림

## 🛠️ 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **AI**: Gemini API (@google/genai)
- **Styling**: Tailwind CSS
- **Visualization**: Recharts
- **Animation**: Motion (Framer Motion)
- **Icons**: Lucide React

## 📦 설치 및 실행

1. **의존성 설치**:
   ```bash
   npm install
   ```

2. **환경 변수 설정**:
   `.env.example` 파일을 참고하여 `.env` 파일을 생성하고 Gemini API 키를 설정합니다.
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

3. **개발 서버 실행**:
   ```bash
   npm run dev
   ```

## 📊 데이터 구조

- `PurchaseOrder`: 발주 날짜, 품목, 수량, 단가 정보
- `PriceHistory`: 품목별 시계열 단가 데이터
- `ProjectCost`: 유사 프로젝트의 카테고리별 원가 데이터
- `Item`: 품목 기본 정보 및 대체 가능 품목 리스트

## 🤖 AI 분석 프롬프트 전략

본 서비스는 Gemini API를 사용하여 다음과 같은 관점에서 데이터를 분석합니다:
1. **Trend Analysis**: 시계열 데이터를 바탕으로 한 가격 변동성 파악
2. **Comparative Analysis**: 전년 대비 또는 프로젝트 간 단가 비교
3. **Strategic Recommendation**: 시장 상황을 고려한 대체재 및 절감 전략 도출

---
*이 프로젝트는 Google AI Studio Build 환경에서 생성되었습니다.*
