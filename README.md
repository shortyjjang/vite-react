# 프로젝트 개요

이 프로젝트는 Vite와 React를 사용하여 구성된 웹 애플리케이션입니다. 상태 관리는 Zustand를 사용하고 있으며, Google Maps API를 통해 현재 위치를 처리하고 있습니다.

## 프로젝트 구조

- **src**: 애플리케이션의 메인 소스 디렉토리
  - **assets**: 이미지 및 아이콘 파일
  - **components**: 재사용 가능한 React 컴포넌트
  - **features**: 특정 기능별로 구성된 디렉토리
    - **Category**: 카테고리 관련 컴포넌트 및 데이터
    - **Setting**: 설정 관련 컴포넌트 및 유틸리티
    - **Store**: 스토어 관련 컴포넌트 및 데이터
    - **OrderSummary**: 주문 요약 컴포넌트
  - **page**: 페이지별 컴포넌트
    - **Home**: 홈 페이지
    - **Category**: 카테고리 페이지
    - **Store**: 스토어 페이지
  - **provider**: 컨텍스트 및 프로바이더 관련 파일
  - **store**: Zustand를 사용한 상태 관리 파일
  - **main.tsx**: 애플리케이션의 진입점

## 사용된 주요 모듈 및 버전

- **React**: 최신 버전의 React를 사용하여 컴포넌트를 구성
- **Vite**: 빠른 개발 환경을 제공하는 빌드 도구
- **Zustand**: 간단하고 직관적인 상태 관리 라이브러리
- **React Router**: 클라이언트 사이드 라우팅을 위한 라이브러리
- **Tailwind CSS**: 유틸리티 기반의 CSS 프레임워크
- **Google Maps API**: 위치 및 거리 계산을 위한 API

## 코드 스니펫 참조

- **infoStore.ts**: Zustand를 사용하여 주소 및 좌표 상태 관리
- **getDistance.ts**: Google Maps API를 사용하여 거리 및 주소 변환
- **StoreItem/index.tsx**: 스토어 아이템 컴포넌트

이 프로젝트는 Vite의 빠른 빌드 속도와 React의 컴포넌트 기반 아키텍처를 활용하여 효율적인 웹 애플리케이션을 구축하고 있습니다. Zustand를 통해 상태 관리를 간단하게 처리하며, Tailwind CSS를 사용하여 스타일링을 유연하게 적용하고 있습니다.