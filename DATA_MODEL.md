# 데이터 모델

본 문서는 QR오더 사장님 어드민의 주요 엔터티·필드·관계를 정의합니다. 본 문서는 **논리 모델**로, 실제 DB 스키마(테이블·인덱스·제약·정규화 수준)는 개발팀이 본 문서를 기반으로 설계합니다.

표기 :
- `PK` 기본키 / `FK` 외래키 / `UQ` 유니크
- `NN` not null / `NL` nullable
- `(default)` 기본값

---

## 1. 매장 / 사용자

### 1.1 Store (매장)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| name | string(60) | NN | 매장명 |
| business_type | enum | NN, default `general` | `general` / `simplified` / `tax_free`(미지원) |
| business_number | string(12) | NN, UQ | 사업자등록번호 |
| owner_user_id | uuid | FK, NN | User.id |
| address | string(200) | NN | |
| phone | string(20) | NN | |
| opening_hours | json | NN | 요일별 영업시간 (`{mon: [{start,end}], ...}`) |
| business_day_start | time | NN, default `03:00` | 영업일 시작 시각 |
| timezone | string | NN, default `Asia/Seoul` | |
| settlement_bank_account_id | uuid | FK, NL | BankAccount.id |
| created_at | timestamptz | NN | |
| updated_at | timestamptz | NN | |

### 1.2 User (사용자)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| email | string | NN, UQ | 로그인 ID |
| phone | string(20) | NN, UQ | SMS 인증용 |
| name | string(30) | NN | |
| password_hash | string | NN | bcrypt |
| created_at | timestamptz | NN | |

### 1.3 StoreUserRole (매장-사용자 역할)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | Store.id |
| user_id | uuid | FK, NN | User.id |
| role | enum | NN | `owner` / `staff` |
| active | bool | NN, default true | |
| invited_at | timestamptz | NN | |
| accepted_at | timestamptz | NL | |

(store_id, user_id) UQ. owner는 매장당 1명 권장 (다중 owner는 1차 범위 외).

### 1.4 BankAccount (정산 계좌)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| bank_code | string | NN | |
| account_number | string | NN | |
| holder_name | string | NN | 예금주명 |
| verified | bool | NN, default false | 1원 인증 등 검증 완료 여부 |
| created_at | timestamptz | NN | |

---

## 2. 메뉴 / 옵션 / 카테고리

### 2.1 MenuCategory (메뉴 카테고리)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| name | string(30) | NN | 카테고리명 |
| sort_order | int | NN | 정렬 순번 |
| created_at | timestamptz | NN | |

(store_id, name) UQ.

### 2.2 Menu (메뉴)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| code | string(6) | NN, UQ per store | 상품코드 (영문 대문자+숫자) |
| name | string(30) | NN | |
| category_id | uuid | FK, NL | MenuCategory.id. null이면 '미분류' |
| price | int | NN | 매장 판매가 (원) |
| takeout_price | int | NL | 포장가. null이면 매장가와 동일 |
| description | string(200) | NL | |
| image_url | string(500) | NL | CDN URL |
| status | enum | NN, default `available` | `available` / `hidden` |
| manual_sold_out | bool | NN, default false | 오늘 품절 토글 (영업일 시작 시 자동 false) |
| max_qty_per_order | int | NL | 1회 주문 최대 수량. null이면 제한 없음 |
| sort_order | int | NN | 정렬 순번 |
| created_at | timestamptz | NN | |
| updated_at | timestamptz | NN | |

`status='soldout'` 레거시 enum 값은 마이그레이션으로 제거.

### 2.3 OptionGroup (옵션 그룹)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| code | string(6) | NN, UQ per store | 상품코드 |
| name | string(30) | NN | 그룹명 |
| required | bool | NN, default false | 필수 선택 여부 |
| select_mode | enum | NN | `single` / `multi` |
| multi_max | int | NL | 중복 선택일 때 최대 개수. null이면 무제한 |
| sort_order | int | NN | |
| created_at | timestamptz | NN | |

### 2.4 OptionItem (옵션 항목)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| option_group_id | uuid | FK, NN | |
| name | string(30) | NN | |
| add_price | int | NN, default 0 | 추가 금액 (음수 허용 — 할인) |
| sort_order | int | NN | |

(option_group_id, name) UQ.

### 2.5 MenuOptionLink (메뉴-옵션 연결)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| menu_id | uuid | FK, NN | |
| option_group_id | uuid | FK, NN | |
| sort_order | int | NN | 메뉴 내 옵션 그룹 노출 순서 |

(menu_id, option_group_id) PK.

### 2.6 MenuSchedule (메뉴 판매 시간)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| menu_id | uuid | FK, NN | |
| days | int[] | NN | 요일 비트 (0=일 ~ 6=토) |
| start_time | time | NN | |
| end_time | time | NN | |
| enabled | bool | NN, default true | |

판매 시간 미설정 메뉴는 행 없음 → 항상 판매.

### 2.7 MenuDiscount (해피아워 할인)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| menu_id | uuid | PK, FK | |
| enabled | bool | NN, default false | |
| discount_type | enum | NN | `percent` / `fixed` |
| value | int | NN | percent이면 1~100, fixed이면 원 |
| days | int[] | NN | 요일 |
| start_time | time | NN | |
| end_time | time | NN | |

### 2.8 SetMenu (세트 메뉴)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| code | string(6) | NN, UQ per store | |
| name | string(30) | NN | |
| price | int | NN | 세트 가격 |
| description | string(200) | NL | |
| image_url | string | NL | |
| status | enum | NN | `available` / `hidden` |
| sort_order | int | NN | |

### 2.9 SetMenuItem (세트 구성 항목)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| set_menu_id | uuid | FK, NN | |
| menu_id | uuid | FK, NN | |
| quantity | int | NN, default 1 | |

(set_menu_id, menu_id) PK.

### 2.10 Origin (원산지)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| ingredient | string(30) | NN | 식재료명 (예: 쌀, 김치, 닭고기) |
| origin | string(30) | NN | 원산지 (예: 국내산, 중국산) |
| sort_order | int | NN | |

손님 화면 풋터에 표 형태로 노출.

### 2.11 Translation (번역)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| entity_type | enum | NN | `menu` / `category` / `option_group` / `option_item` |
| entity_id | uuid | NN | |
| locale | string(5) | NN | `en` / `ja` / `zh-CN` 등 |
| field | enum | NN | `name` / `description` |
| value | string(200) | NN | |

(entity_type, entity_id, locale, field) UQ.

---

## 3. 재고 (오늘의 준비량)

### 3.1 StockItem (수량 관리 메뉴)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| menu_id | uuid | FK, NN, UQ per store | 한 메뉴당 하나의 stock_item |
| enabled | bool | NN, default true | |
| prepared | int | NN | 오늘 준비량 |
| remaining | int | NN | 잔여 수량 |
| unit | string(10) | NN, default `개` | |
| low_alert_threshold | int | NN, default 5 | '곧 품절' 임계값 |
| sold_out_alert | bool | NN, default true | 0 도달 시 알림 |
| yesterday_prep | int | NN, default 0 | 어제 준비량 (참고용) |
| yesterday_sold | int | NN, default 0 | 어제 판매량 (참고용) |
| updated_at | timestamptz | NN | |

`remaining <= 0` 이면 손님 화면에서 자동 품절 처리. `effectiveStatus` 계산에 사용.

### 3.2 StockEvent (재고 변동 이력)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| stock_item_id | uuid | FK, NN | |
| event_type | enum | NN | `order` / `refund` / `manual_set` / `manual_delta` / `day_reset` |
| delta | int | NN | 변동량 (음수 가능) |
| remaining_after | int | NN | 변동 후 잔여 |
| ref_order_id | uuid | FK, NL | 주문에 의한 변동일 때 |
| user_id | uuid | FK, NL | 수동 변경한 사용자 |
| occurred_at | timestamptz | NN | |

차감·복구 추적, 정산·감사용.

---

## 4. 주문 / 결제 / 환불

### 4.1 Order (주문)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| order_number | string | NN, UQ per store | 표시용 주문 번호 (예: 매장 일련번호) |
| channel | enum | NN | `dine_in` / `takeout` |
| table_id | uuid | FK, NL | 매장 주문일 때 |
| status | enum | NN | `pending` / `accepted` / `cooking` / `ready` / `completed` / `cancelled` |
| payment_id | uuid | FK, NL | Payment.id |
| customer_phone | string(20) | NL | 포장 예약 시 |
| pickup_time | timestamptz | NL | 포장 예약 시 |
| reservation_accepted_at | timestamptz | NL | 사장님 수락 시각 (예약 주문) |
| subtotal | int | NN | 옵션·할인 적용 후 금액 합 |
| discount_total | int | NN, default 0 | 할인 합 |
| point_used | int | NN, default 0 | 사용 포인트 |
| total | int | NN | 손님이 낸 금액 (= subtotal - discount - point) |
| memo | string(200) | NL | 손님 요청사항 |
| placed_at | timestamptz | NN | 손님이 주문한 시각 |
| accepted_at | timestamptz | NL | |
| ready_at | timestamptz | NL | |
| completed_at | timestamptz | NL | |
| cancelled_at | timestamptz | NL | |

주문 상태 전이는 `STATES.md` §1 참조.

### 4.2 OrderItem (주문 항목)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| order_id | uuid | FK, NN | |
| menu_id | uuid | FK, NN | |
| menu_name_snapshot | string | NN | 주문 시점 메뉴명 (사후 변경 무관) |
| unit_price_snapshot | int | NN | 주문 시점 단가 (매장가 또는 포장가) |
| quantity | int | NN | |
| line_total | int | NN | unit_price * quantity + sum(options) |

### 4.3 OrderItemOption (주문 항목 옵션)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| order_item_id | uuid | FK, NN | |
| option_item_id | uuid | FK, NN | |
| option_name_snapshot | string | NN | |
| add_price_snapshot | int | NN | |
| quantity | int | NN, default 1 | 중복 선택 시 |

### 4.4 Payment (결제)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| order_id | uuid | FK, NN | |
| amount | int | NN | 결제 금액 (gross, 부가세 포함) |
| method | enum | NN | `card` / `bank_transfer` / `kakaopay` / `naverpay` / `cash` ... |
| pg_transaction_id | string | NL | PG 측 거래 ID |
| status | enum | NN | `pending` / `paid` / `failed` / `cancelled` |
| paid_at | timestamptz | NL | status=paid 시점 |
| pg_fee | int | NL | 결제 수수료 (정산 시 차감) |

### 4.5 Refund (환불)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| original_payment_id | uuid | FK, NN | |
| amount | int | NN | 환불 금액 |
| reason | string(200) | NL | |
| refunded_by | uuid | FK, NN | User.id (owner) |
| refunded_at | timestamptz | NN | |
| pg_refund_id | string | NL | |
| status | enum | NN | `pending` / `completed` / `failed` |

매출 집계에서 `original_payment.paid_at` 의 영업일 기준으로 차감.

### 4.6 Discount (할인 적용 이력)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| order_id | uuid | FK, NN | |
| source | enum | NN | `happy_hour` / `coupon` / `set` |
| ref_id | uuid | NL | source에 따른 참조 ID |
| amount | int | NN | 할인액 (양수) |

매출 `disc` 컬럼 합계에 사용.

---

## 5. 주문 방식 / 결제 정책

### 5.1 OrderChannelConfig (매장별 1개)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| store_id | uuid | PK, FK | |
| mode | enum | NN | `both` / `dine_in` / `takeout` |
| service | enum | NN, default `self` | `self` / `served` (매장 식사 시 셀프/서빙) |
| payment | enum | NN | `prepay` / `postpay` / `scheduled` |
| default_policy | enum | NN, default `prepay` | scheduled 미정 시간대의 기본 정책 |
| reservation | bool | NN, default false | 포장 예약 ON/OFF |
| reservation_slot_minutes | int | NN, default 30 | 슬롯 단위 |
| reservation_block_before_close_minutes | int | NN, default 30 | 영업 종료 N분 전 슬롯 차단 |
| wait_minutes | int | NN | 대기 시간 안내 (5~70, 5분 간격) |
| notifications | jsonb | NN | 매장 식사 셀프 모드 시 호출 방식 `["call_name","kakao","display"]` |
| updated_at | timestamptz | NN | |

### 5.2 PaymentSchedule (시간대별 결제 슬롯)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| name | string(20) | NN | 슬롯 이름 (예: 런치, 디너) |
| start_time | time | NN | |
| end_time | time | NN | |
| policy | enum | NN | `prepay` / `postpay` |
| sort_order | int | NN | |

`mode=scheduled` 일 때만 사용. 슬롯 간 시간 겹침 차단 (저장 시 검증).

---

## 6. 직원호출

### 6.1 StaffCallConfig (매장별 1개)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| store_id | uuid | PK, FK | |
| enabled | bool | NN, default true | 직원호출 기능 전역 ON/OFF |
| debounce_seconds | int | NN, default 30 | 같은 테이블 동일 메시지 중복 차단 시간 |
| updated_at | timestamptz | NN | |

### 6.2 StaffCallMessage (호출 메시지)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| body | string(10) | NN | 메시지 본문 (예: 물, 수저, 계산) |
| enabled | bool | NN, default true | |
| sort_order | int | NN | |
| created_at | timestamptz | NN | |

매장당 최대 15개.

### 6.3 StaffCallEvent (호출 이벤트)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| message_id | uuid | FK, NN | |
| table_id | uuid | FK, NN | |
| called_at | timestamptz | NN | 호출 시각 |
| resolved_at | timestamptz | NL | 처리 완료 시각 (직원이 '완료' 버튼 클릭) |
| resolved_by | uuid | FK, NL | User.id (staff) |
| handling_seconds | int | NL | resolved_at - called_at (분석용 사전 계산 컬럼) |

집계 :
- 메시지별 '호출 횟수' : 당일 영업일 기준 count
- 평균 처리 시간 : 당일 영업일 기준 `avg(handling_seconds) where resolved_at IS NOT NULL`
- 미처리 호출 수 : `where resolved_at IS NULL`

---

## 7. 테이블 / QR

### 7.1 Table (테이블)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| name | string(20) | NN | 테이블명 (예: 1번, A1, 창가-1) |
| sort_order | int | NN | |
| qr_code_id | uuid | FK, NL | QRCode.id |
| active | bool | NN, default true | |
| created_at | timestamptz | NN | |

(store_id, name) UQ.

### 7.2 QRCode (QR 코드)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| type | enum | NN | `table` / `takeout` / `menu_only` |
| token | string(32) | NN, UQ | URL에 들어가는 토큰 |
| target_url | string | NN | `https://order.qrorder.co.kr/{store_code}/{name}` |
| issued_at | timestamptz | NN | |
| revoked_at | timestamptz | NL | 재발급 시 이전 QR 무효화 시각 |

테이블 QR : 각 테이블당 1개. 포장 QR : 매장당 1개. 메뉴 전용 QR : 매장당 1개 (주문 불가, 메뉴 열람만).

---

## 8. 정산

### 8.1 Settlement (정산)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| settlement_date | date | NN | 정산 대상 영업일 (1일 단위) |
| gross | int | NN | 해당일 결제 합계 |
| refund | int | NN | 해당일 결제분에 대한 환불 합계 (사후 환불 포함) |
| pg_fee | int | NN | 결제 수수료 합계 |
| net_payable | int | NN | 출금 예정액 = gross - refund - pg_fee |
| status | enum | NN | `pending` / `paid_out` / `held` |
| paid_out_at | timestamptz | NL | |
| created_at | timestamptz | NN | |

(store_id, settlement_date) UQ. 정산은 영업일 종료 후 D+3 영업일 출금이 기본 (정산 정책은 `spec/01-sales.md` §4 참조).

---

## 9. 알림 / 공지

### 9.1 Notification (사장님 알림)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| recipient_user_id | uuid | FK, NN | |
| type | enum | NN | `new_order` / `staff_call` / `low_stock` / `sold_out` / `settlement` / `refund` / `system` |
| title | string(60) | NN | |
| body | string(500) | NN | |
| ref_url | string | NL | 클릭 시 이동할 어드민 경로 |
| read_at | timestamptz | NL | |
| created_at | timestamptz | NN | |

### 9.2 Announcement (본사 공지)

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| title | string | NN | |
| body | text | NN | |
| target | enum | NN | `all` / `store_ids` |
| target_store_ids | uuid[] | NL | target=store_ids일 때 |
| published_at | timestamptz | NN | |
| expires_at | timestamptz | NL | |

---

## 10. 감사 로그

### 10.1 AuditLog

| 필드 | 타입 | 제약 | 설명 |
|---|---|---|---|
| id | uuid | PK | |
| store_id | uuid | FK, NN | |
| user_id | uuid | FK, NN | 작업 수행자 |
| action | string | NN | 예: `menu.update`, `refund.create` |
| entity_type | string | NN | |
| entity_id | uuid | NL | |
| before_json | jsonb | NL | 변경 전 |
| after_json | jsonb | NL | 변경 후 |
| ip | string | NL | |
| user_agent | string | NL | |
| occurred_at | timestamptz | NN | |

가격 변경, 정산 계좌 변경, 권한 변경, 환불 처리 등 민감 액션에 적용.
