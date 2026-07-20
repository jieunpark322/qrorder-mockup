# QR오더 사장님 관리자 — 매출·정산 영역 Mockup

> 비개발 사장님이 "오늘 얼마 벌었고, 언제 얼마 들어와요?"를 한눈에 보고 이해할 수 있게 만드는 게 목표입니다.

## 🔗 진입점

- **라이브 데모**: https://jieunpark322.github.io/qrorder-mockup/
- **PRD (비즈니스 요구사항·정합성 검증)**: [`PRD.md`](./PRD.md)
- **단일 파일 mockup**: [`index.html`](./index.html) — 외부 의존성은 Chart.js(CDN), Pretendard 폰트뿐. 더블클릭으로 바로 열림.

---

## 📌 이 문서가 책임지는 범위

| 문서 | 다루는 내용 |
|---|---|
| **README.md** (이 문서) | 개발자가 mockup을 어떻게 읽고 무엇을 구현해야 하는지 — 진입점 가이드 |
| **PRD.md** | 비즈니스 룰, 정산식, Before→After 비교, 데이터 정합성 검증 결과 |
| **index.html** | 동작하는 화면·인터랙션·UI 디테일의 단일 진실의 원천 |

→ **mockup의 시각·인터랙션은 `index.html`이 정답**, **숫자·규칙은 `PRD.md`가 정답**입니다. 두 문서가 충돌하면 알려주세요.

---

## 🚀 빠른 시작

### 보기만 하려면
1. https://jieunpark322.github.io/qrorder-mockup/ 접속
2. 좌측 사이드바에서 메뉴 클릭하며 동선 따라가 보기
3. 우상단의 `🕒 영업시간 기준` 토글, 거래 행 클릭(모달), 정산 회차 클릭(이동) 등 인터랙션 확인

### 로컬에서 코드 보면서 만지려면
```bash
git clone https://github.com/jieunpark322/qrorder-mockup.git
cd qrorder-mockup
# 별도 빌드 불필요 — 그냥 브라우저로 index.html 열기
# 또는 간단한 정적 서버
python -m http.server 8010
# → http://localhost:8010
```

---

## 🗺 화면 구조와 핵심 흐름

### 사이드바 (좌측 메뉴 8종)

```
주문관리
  📋 주문 내역              orders
매출관리
  📊 매출 한눈에 보기        overview
  🔎 매출 상세 보기          detail   (기간별/시간대별/메뉴별/카테고리별/결제수단별 5탭)
정산관리
  🗓️  정산 달력             stl-calendar
  🔎 정산 내역              stl-list
  🏦 정산 계좌              bank
```

→ 라우팅은 `index.html`의 `sectionMap` 참고. SPA 형태, 한 페이지에서 `state.section`만 바꿔 렌더링.

### 대표 사용자 흐름 4가지 (PRD §7 시나리오와 동일)

| 흐름 | 진입 | 결과 |
|---|---|---|
| A. 오늘 받을 정산 확인 | 정산 내역 (기본 진입 = 오늘 1일치) | 행 클릭 → 정산 회차 상세 |
| B. 이번 달 총합 | 정산 내역 → 칩 `[이번 달]` | 15일치 합계 KPI |
| C. 특정 주문 → 정산 추적 | 주문 내역 → 행 클릭 (모달) → 회차 링크 | 해당 회차 상세 자동 이동 |
| D. 달력에서 일자 클릭 | 정산 달력 → 5/19 셀 | 정산 회차 상세 직행 (중간 단계 생략) |

---

## ⚠️ 구현 시 반드시 지켜야 할 것

세부 룰은 PRD에 있고, 여기선 **자주 놓치는 6가지**만 강조합니다.

1. **정산 화면은 항상 "자정 기준" 고정** — 사장님이 매출 화면에서 영업시간 기준 토글을 켜도 정산 화면(달력/내역/상세/계좌)은 영향받지 않습니다. 카드사 표준이라 협상 불가.
2. **매출 화면은 자정 기준 ↔ 영업시간 기준 토글 가능** — 매출 한눈에 보기 / 매출 상세 보기 두 곳에서만 동작. `state.useBusinessHours` 참고.
3. **자정 넘김 매장은 안내 박스 노출** — 매장 영업시간(`businessHoursOpen` ~ `businessHoursClose`)이 자정을 넘기는 매장에서 영업시간 기준을 켜면 `bhActiveNotice()` 함수가 큰 안내 박스를 띄움. 안 넘김 매장은 작은 한 줄만.
4. **정산 회차 ID는 표에 노출하지 않음** — 정산 내역 표에는 ID 없음, 정산 회차 상세 페이지에서만 표시. PRD §3 Before→After 참조.
5. **D+2 영업일 정산 + 주말/공휴일 자동 스킵** — `HOLIDAYS_2026` 리스트 참조. 토·일·공휴일 매출은 다음 영업일 회차로 합산.
6. **카드번호 마스킹 (PCI DSS)** — 1년 이내 거래는 `BIN(6) + 끝 4자리`, 1년 초과는 전체 마스킹 + 검색 자체 차단. `isWithinYear()` 함수 참고.

---

## 🧪 Mockup의 더미·한계 (실 구현 시 백엔드 연동 필요)

mockup에서 하드코딩되어 있어 **실 구현에서 동적으로 채워져야 하는 부분**:

| 부분 | 현 상태 (mockup) | 실 구현 |
|---|---|---|
| 오늘 날짜 | `TODAY_DATE = '2026-05-15'` 고정 | 서버 현재 KST 일자 |
| 매장 정보 | `STORE = { name:'소프트커피 합정점', owner:'홍길동' }` 고정 | 로그인한 점주의 매장 정보 |
| 매출 데이터 | `DAY` 배열 15일치 하드코딩 | DB에서 일자별 집계 |
| 주문 14건 | `ORDERS` 배열 하드코딩 | 페이지네이션 + 검색·필터 쿼리 |
| 정산 회차 | `DAY`에서 동적 생성 (`SETTLEMENTS`) | 정산 시스템과 동기화된 회차 데이터 |
| 영업시간 기준 토글 | 자정 기준 매출에 **비율(`bhRatio()`)을 곱해서 시뮬레이션** | 실제로는 시간 단위 매출에서 영업시간 외 거래를 제외해 재계산 필요 |
| 공휴일 | `HOLIDAYS_2026` 16일 하드코딩 (2026년만) | 매년 갱신, 운영자 도구 필요 |
| 차트 데이터 | 더미 비율로 분해 | 실제 시간대·메뉴·카테고리 집계 |
| 결제번호(tid) | 더미 문자열 | PG 응답 그대로 |
| 정산 상세 결제 내역 8건 | 하드코딩 | ORDERS와 회차 매핑으로 동적 (PRD §9 중기 과제) |

---

## 🧱 데이터 모델 핵심

PRD §5에 상세히 있고, 코드 진입점은 아래와 같습니다.

```js
// 매장 정보
const STORE = { name, owner };

// 진실의 원천 — 일별 매출 15일치
const DAY = [
  { d:'5/15', w:'금', gross, disc, pt, ref, rcnt, ocnt },
  ...
];

// 정산 회차 — DAY에서 자동 생성
// ID 포맷: STL-{정산일YYYYMMDD}-{영업일MMDD}
const SETTLEMENTS = [
  { id, approvalDate, approvalDow, settleDate, settleDow,
    cnt, grossAmt, refundAmt, feeAmt, payoutAmt, status,
    approvalDays:[{ date, dow, gross, ref, cnt }, ...] },
  ...
];

// 주문 — 검색·필터·정산 회차 추적용
const ORDERS = [
  { id, date, time, channel, ch, menu, issuer, amt,
    status, stl, card, tid, _expired, _settlementId },
  ...
];

// 화면 상태 — 단일 객체로 관리, 변경 후 renderApp() 호출하면 전체 리렌더
state = {
  section, useBusinessHours, businessHoursOpen, businessHoursClose,
  overviewPeriod, detailTab, orderDateFilter, ...
}
```

→ 모든 매출 숫자는 `DAY`에서 파생되어 화면 간 일치 (PRD §10 정합성 검증).

---

## 🎨 디자인 토큰

`index.html` `:root` 변수 그대로 사용 중.

```css
--blue: #3182f6;  --blue-50: #e8f3ff;  --blue-100: #cfe4ff;
--ink: #191f28;   --ink-2: #4e5968;   --ink-3: #8b95a1;   --ink-4: #b0b8c1;
--line: #e5e8eb;  --line-2: #f2f4f6;
--bg: #f9fafb;    --bg-2: #f2f4f6;
--red: #f04452;   --red-50: #ffeaec;
--green: #1eb18d; --green-50: #e3f6f0;
```

- **폰트**: `Pretendard`, `Apple SD Gothic Neo`, system-ui
- **숫자 컬럼**: `font-variant-numeric: tabular-nums` (자릿수 정렬용)
- **컨테이너 최대폭**: 1280px
- **모서리**: 카드 10~14px, 버튼·칩 8~10px
- **그림자**: `0 8px 32px rgba(0,0,0,.06)` (메인 카드)

---

## 📋 결정 대기·미확정 항목

PRD §9 향후 과제 참조. 개발 들어가기 전 합의 필요한 것들:

- **권한 분리**: 현재는 점주 단일 권한. 본사·운영자·점주 분리는 별도 PRD 필요.
- **매장 영업시간 설정 저장 위치**: mockup은 클라이언트 state. 실 구현은 매장 마스터에 저장 필요.
- **비과세/면세 매출**: 현재 일괄 10% VAT 처리. 실제로는 메뉴별 과세 구분 필요.
- **자체 포인트·상품권 매출의 정산 처리**: mockup에선 정산 제외. 정책 확정 필요.
- **부분취소 시 수수료 환급 명세**: 현재 표시 없음.

---

## ❓ 문의

mockup 의도가 모호한 부분, 누락된 케이스가 보이면 GitHub Issues 또는 작성자(박지은, 소프트먼트)에게 바로 알려주세요. 화면 캡처와 함께 주시면 빠릅니다.
