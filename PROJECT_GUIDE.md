# HIARC Platform Frontend Project Guide

## 📖 프로젝트 개요

HIARC Platform Frontend는 한양대학교 알고리즘 학회(HIARC)를 위한 웹 플랫폼입니다. 이 프로젝트는 Monorepo 구조로 설계되어 있으며, 다음과 같은 애플리케이션들을 포함합니다:

- **Admin App** - 관리자를 위한 관리 시스템
- **Intra App** - 학회원을 위한 내부 시스템  
- **Intro App** - 학회 소개 및 홍보 페이지
- **Rating App** - 레이팅 시스템

## 🏗️ 프로젝트 구조

### Monorepo 아키텍처
```
HIARC-Platform-FE/
├── apps/
│   ├── admin/          # 관리자 애플리케이션
│   ├── intra/          # 내부 시스템 애플리케이션
│   ├── intro/          # 소개 페이지
│   └── rating/         # 레이팅 시스템
├── packages/
│   ├── shared/         # 공통 타입 및 유틸리티
│   ├── ui/            # 공통 UI 컴포넌트
│   └── util/          # 공통 유틸리티 함수
├── package.json
└── PROJECT_GUIDE.md
```

### 애플리케이션별 구조
각 앱은 다음과 같은 일관된 구조를 가집니다:

```
apps/{app-name}/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── features/              # 기능별 모듈
│   │   └── {domain}/         # 도메인별 그룹화
│   │       ├── api/          # API 함수들
│   │       ├── components/   # 컴포넌트들
│   │       ├── hooks/        # 커스텀 훅들
│   │       │   ├── query/    # React Query 훅들
│   │       │   ├── mutation/ # Mutation 훅들
│   │       │   └── page/     # 페이지 상태 관리 훅들
│   │       ├── pages/        # 페이지 컴포넌트들
│   │       │   └── {page-name}/
│   │       │       ├── desktop-{page-name}.tsx
│   │       │       ├── mobile-{page-name}.tsx
│   │       │       └── index.ts
│   │       └── types/        # 타입 정의들
│   ├── shared/               # 앱 내 공통 요소
│   └── hooks/               # 전역 훅들
└── package.json
```

## 🎨 아키텍처 특징

### 1. Feature-Based Architecture
- 도메인별로 기능을 그룹화하여 모듈화
- 각 기능은 독립적으로 개발 및 테스트 가능
- 코드의 재사용성과 유지보수성 향상

### 2. 모바일/데스크톱 분리 구조
- 각 페이지는 데스크톱과 모바일 버전으로 분리
- `PageLayout` 컴포넌트를 통한 반응형 처리
- 디바이스별 최적화된 UX 제공

### 3. 커스텀 훅을 통한 상태 관리
- 페이지 로직을 `useXXXPageState` 훅으로 분리
- React Query를 활용한 서버 상태 관리
- 로직과 UI의 명확한 분리

### 4. 공통 컴포넌트 시스템
- `@hiarc-platform/ui` 패키지를 통한 일관된 디자인
- 재사용 가능한 컴포넌트들
- 타입 안전성 보장

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Animation**: Framer Motion
- **Package Manager**: pnpm (Monorepo)

### Development Tools
- **Linting**: ESLint
- **Code Formatting**: Prettier
- **Type Checking**: TypeScript
- **Build Tool**: Next.js

## 🚀 시작하기

### 1. 의존성 설치
```bash
# 루트 디렉토리에서 실행
pnpm install
```

### 2. 개발 서버 실행
```bash
# 특정 앱 실행
pnpm --filter admin dev
pnpm --filter intra dev
pnpm --filter intro dev
pnpm --filter rating dev

# 또는 각 앱 디렉토리에서
cd apps/admin && pnpm dev
```

### 3. 빌드
```bash
# 전체 빌드
pnpm build

# 특정 앱 빌드
pnpm --filter admin build
```

### 4. 타입 체크
```bash
# 전체 타입 체크
pnpm type-check

# 특정 앱 타입 체크
pnpm --filter admin type-check
```

## 📝 개발 가이드

### 새로운 페이지 추가하기

1. **페이지 디렉토리 생성**
   ```bash
   mkdir -p src/features/{domain}/pages/{page-name}
   ```

2. **페이지 컴포넌트 작성**
   ```typescript
   // desktop-{page-name}.tsx
   export function Desktop{PageName}(): React.ReactElement {
     const pageState = use{PageName}PageState();
     return <div>Desktop UI</div>;
   }

   // mobile-{page-name}.tsx  
   export function Mobile{PageName}(): React.ReactElement {
     const pageState = use{PageName}PageState();
     return <div>Mobile UI</div>;
   }

   // index.ts
   export { Desktop{PageName} } from './desktop-{page-name}';
   export { Mobile{PageName} } from './mobile-{page-name}';
   ```

3. **페이지 상태 훅 작성**
   ```typescript
   // hooks/page/use-{page-name}-page-state.ts
   export function use{PageName}PageState() {
     // 페이지 로직 구현
     return {
       // 상태와 함수들
     };
   }
   ```

4. **Next.js 라우트 연결**
   ```typescript
   // app/{route}/page.tsx
   import { PageLayout } from '@hiarc-platform/ui';
   import { Desktop{PageName}, Mobile{PageName} } from '@/features/{domain}/pages/{page-name}';

   export default function {PageName}Page(): React.ReactElement {
     return (
       <PageLayout
         desktopChildren={<Desktop{PageName} />}
         mobileChildren={<Mobile{PageName} />}
       />
     );
   }
   ```

### API 함수 작성하기

1. **API 함수 정의**
   ```typescript
   // features/{domain}/api/{domain}.ts
   export const {domain}Api = {
     /**
      * API 함수의 목적을 한국어로 설명합니다.
      * @param param - 파라미터에 대한 설명입니다.
      * @returns 반환값에 대한 설명을 반환합니다.
      */
     GET_ITEMS: async (params: QueryParams): Promise<Item[]> => {
       const response = await apiClient.get('/api/items', { params });
       return response.data.map(item => Item.fromJson(item));
     },
   };
   ```

2. **React Query 훅 작성**
   ```typescript
   // hooks/query/use-{domain}.ts
   export function useItems(params: QueryParams) {
     return useQuery({
       queryKey: ['items', params],
       queryFn: () => {domain}Api.GET_ITEMS(params),
     });
   }
   ```

### 컴포넌트 개발하기

1. **기본 컴포넌트 구조**
   ```typescript
   interface ComponentProps {
     // props 정의
   }

   export function Component({ ...props }: ComponentProps): React.ReactElement {
     // 컴포넌트 로직
     return <div>Component Content</div>;
   }
   ```

2. **스타일링**
   - Tailwind CSS 클래스 사용
   - `cn()` 유틸리티를 통한 조건부 스타일링
   - `@hiarc-platform/ui`의 기본 컴포넌트 활용

## 📚 주요 컨벤션

### 1. 파일 및 폴더 명명
- **컴포넌트**: PascalCase (`UserProfile.tsx`)
- **훅**: camelCase (`useUserData.ts`)
- **API 파일**: kebab-case (`user-api.ts`)
- **타입**: PascalCase (`UserProfile.ts`)

### 2. 컴포넌트 구조
- Props 인터페이스 정의
- 기본값 설정
- 타입 안전성 확보
- 접근성(a11y) 고려

### 3. 상태 관리
- React Query로 서버 상태 관리
- 로컬 상태는 useState/useReducer 사용
- 전역 상태는 Zustand 활용

### 4. 타입 정의
- 공통 타입은 `@hiarc-platform/shared`에 정의
- 앱별 타입은 해당 앱의 `types` 폴더에 정의
- API 응답 타입과 클라이언트 타입 분리

## 🔧 패키지 관리

### 의존성 추가
```bash
# 특정 앱에 의존성 추가
pnpm --filter admin add package-name

# 공통 패키지에 의존성 추가  
pnpm --filter @hiarc-platform/ui add package-name

# 개발 의존성 추가
pnpm --filter admin add -D package-name
```

### 내부 패키지 사용
```typescript
// 공통 UI 컴포넌트 사용
import { Button, Input } from '@hiarc-platform/ui';

// 공통 타입 사용
import { User, Study } from '@hiarc-platform/shared';

// 공통 유틸리티 사용
import { formatDate } from '@hiarc-platform/util';
```

## 🎯 베스트 프랙티스

### 1. 컴포넌트 설계
- 단일 책임 원칙 준수
- Props 인터페이스 명확히 정의
- 재사용 가능한 컴포넌트 작성
- 접근성 기능 포함

### 2. 상태 관리
- 서버 상태와 클라이언트 상태 분리
- 불필요한 리렌더링 방지
- 로딩 및 에러 상태 처리

### 3. 타입 안전성
- `any` 타입 사용 금지
- 엄격한 타입 체크 활용
- 런타임 타입 검증 구현

### 4. 성능 최적화
- React.memo() 적절히 활용
- 무거운 연산은 useMemo() 사용
- 이미지 최적화 적용
- 번들 크기 모니터링

## 🐛 디버깅 및 트러블슈팅

### 개발 도구
- **React Developer Tools**: 컴포넌트 구조 확인
- **React Query DevTools**: 쿼리 상태 모니터링  
- **Browser DevTools**: 네트워크 및 성능 분석

### 일반적인 문제 해결
1. **타입 에러**: `npm run type-check` 실행 후 오류 수정
2. **빌드 실패**: 의존성 설치 확인 및 캐시 클리어
3. **스타일 문제**: Tailwind CSS 클래스명 확인
4. **API 호출 실패**: 네트워크 탭에서 요청/응답 확인

## 🚀 배포

### 빌드 검증
```bash
# 타입 체크
pnpm type-check

# 전체 빌드
pnpm build

# 특정 앱 빌드 테스트
pnpm --filter admin build
```

### 환경 변수 설정
```bash
# .env.local 파일 생성
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_ENV=production
```

## 📞 지원 및 문의

- **GitHub Issues**: 버그 리포트 및 기능 요청
- **문서**: 프로젝트 Wiki 참조
- **개발팀 연락처**: 내부 문의 채널 이용

---

## 📋 체크리스트

### 새 기능 개발 시
- [ ] 기능 요구사항 분석
- [ ] 컴포넌트 설계
- [ ] API 설계 및 구현
- [ ] 타입 정의
- [ ] 테스트 작성
- [ ] 문서화
- [ ] 코드 리뷰

### 배포 전 체크리스트
- [ ] 타입 체크 통과
- [ ] 빌드 성공 
- [ ] 기능 테스트 완료
- [ ] 성능 테스트 완료
- [ ] 보안 검토 완료
- [ ] 문서 업데이트

이 가이드를 통해 HIARC Platform Frontend 프로젝트를 효율적으로 개발하고 유지보수할 수 있습니다.