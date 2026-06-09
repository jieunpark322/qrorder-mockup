# 상태머신

본 문서는 주요 엔터티의 상태 전이를 정의합니다. 잘못된 상태 전이는 서버 측 검증으로 차단해야 합니다.

---

## 1. 주문 (Order)

### 1.1 상태 목록

| 상태 | 의미 |
|---|---|
| `pending` | 손님이 주문 화면에서 결제 시도 중. 미완료 |
| `accepted` | 결제 완료. 사장님이 주문 확인하기 전 (= '신규') |
| `cooking` | 사장님이 '조리 시작' 액션 |
| `ready` | 조리 완료. 매장 식사면 서빙 대기, 포장이면 픽업 대기 |
| `completed` | 손님 픽업 완료 또는 식사 완료 (테이블 정리) |
| `cancelled` | 결제 실패 / 사장님 거절 / 손님 취소 |

### 1.2 전이 표

| from | to | 트리거 |
|---|---|---|
| (없음) | `pending` | 손님이 주문 생성 (결제 진입) |
| `pending` | `accepted` | PG 결제 승인 콜백 수신 (= `Payment.status='paid'`) |
| `pending` | `cancelled` | 결제 실패 / 손님 이탈 (10분 타임아웃) |
| `accepted` | `cooking` | 사장님이 '조리 시작' 클릭 |
| `accepted` | `cancelled` | 사장님이 '주문 거절' 클릭 (자동 환불 발생) |
| `cooking` | `ready` | 사장님이 '조리 완료' 클릭 |
| `ready` | `completed` | 사장님이 '서빙 완료' / '픽업 완료' 클릭. 또는 자동 (포장 픽업 시간 + 30분 경과) |
| `completed` | `cancelled` | 불가 (이미 완료된 주문은 취소 불가, 대신 환불 처리) |

### 1.3 포장 예약 주문 특수 흐름

`OrderChannelConfig.reservation=true` + 손님이 픽업 시간 선택 + 결제 완료한 경우 :

| from | to | 트리거 |
|---|---|---|
| `pending` | (보류) | 결제 완료 + `reservation_accepted_at = null` 상태로 대기 |
| (보류) | `accepted` | 사장님이 '예약 수락' 클릭. `reservation_accepted_at` 기록 |
| (보류) | `cancelled` | 사장님이 '예약 거절' 클릭. 자동 환불 |

예약 보류 상태는 `status='accepted'` + `reservation_accepted_at IS NULL` 로 구분.

### 1.4 권한

| 액션 | owner | staff |
|---|---|---|
| 조리 시작 / 완료 / 픽업 완료 | ✓ | ✓ |
| 예약 수락 / 거절 | ✓ | ✓ |
| 주문 거절 (`accepted` → `cancelled`) | ✓ | ✗ |
| 환불 | ✓ | ✗ |

---

## 2. 결제 (Payment)

### 2.1 상태 목록

| 상태 | 의미 |
|---|---|
| `pending` | 결제 요청 PG 전송, 응답 대기 |
| `paid` | 결제 승인 완료 |
| `failed` | 결제 실패 (카드 한도·잔액 등) |
| `cancelled` | 결제 취소 (PG 콜백 전 손님 이탈) |

### 2.2 전이

| from | to | 트리거 |
|---|---|---|
| (없음) | `pending` | PG 결제 요청 |
| `pending` | `paid` | PG 승인 콜백 |
| `pending` | `failed` | PG 실패 콜백 |
| `pending` | `cancelled` | 5분 타임아웃 |
| `paid` | (불가) | 환불은 별도 Refund 엔터티로 처리 |

---

## 3. 환불 (Refund)

### 3.1 상태 목록

| 상태 | 의미 |
|---|---|
| `pending` | 환불 요청 PG 전송, 응답 대기 |
| `completed` | 환불 완료 |
| `failed` | 환불 실패 (PG 거부 등) |

### 3.2 전이

| from | to | 트리거 |
|---|---|---|
| (없음) | `pending` | 사장님이 환불 처리 클릭 |
| `pending` | `completed` | PG 환불 콜백 |
| `pending` | `failed` | PG 실패 |
| `failed` | `pending` | 사장님이 재시도 |

`completed` 상태 진입 시 :
- 매출 집계에 반영 (원거래일 영업일 기준 차감)
- 재고 복구 (`StockEvent.event_type='refund'`, `delta=+환불수량`)
- 정산 시스템에 알림 (정산 미완료면 다음 회차에 반영, 완료된 회차면 다음 회차에서 차감)

---

## 4. 재고 차감 (StockItem.remaining)

### 4.1 차감 트리거

```
주문 결제 완료 (Payment.status='paid')
  → 해당 주문의 OrderItem.menu_id 별로
    → StockItem 존재 시 :
       BEGIN TRANSACTION
       SELECT remaining FROM stock_item WHERE menu_id=? FOR UPDATE
       IF remaining < quantity THEN
         ROLLBACK
         → 결제 자동 환불 트리거 (재고 부족)
         → 손님 화면에 안내
       ELSE
         UPDATE stock_item SET remaining = remaining - quantity
         INSERT INTO stock_event (...)
         COMMIT
       END IF
```

### 4.2 복구 트리거

```
환불 완료 (Refund.status='completed')
  → 환불 대상 OrderItem.menu_id 별로
    → StockItem 존재 시 :
       UPDATE stock_item SET remaining = LEAST(prepared, remaining + 환불수량)
       INSERT INTO stock_event (..., event_type='refund', delta=+수량)
```

복구 후 `remaining > 0` 이면 손님 화면에서 자동 품절 해제.

### 4.3 임계값 도달 알림

```
UPDATE 후 remaining 변동 시 :
  IF remaining = 0 AND sold_out_alert = true THEN
    → 사장님에게 '판매 완료' 알림 (PC 팝업 + 앱 푸시)
  ELSE IF remaining <= low_alert_threshold THEN
    → 사장님에게 '곧 품절' 알림 (1일 1회 디바운스)
```

### 4.4 영업일 리셋

영업일 시작 시각(03:00 KST)에 배치 작업:

```
FOR EACH stock_item :
  yesterday_prep = prepared
  yesterday_sold = prepared - remaining + (당일 환불 복구 분)
  remaining = prepared       -- prepared 자체는 유지
```

---

## 5. 메뉴 효과적 상태

`Menu.status` + `Menu.manual_sold_out` + `StockItem.remaining` + 현재 시각의 4가지 입력에서 단일 효과적 상태를 계산합니다.

### 5.1 결정 트리

```
IF menu.manual_sold_out = true :
  → "수동 품절"  (pill: cancel, 회색+빨강 라벨)

ELSE IF EXISTS stock_item AND stock_item.remaining <= 0 :
  → "자동 품절"  (pill: cancel)

ELSE IF menu.status = 'hidden' :
  → "숨김"       (pill: hold, 손님 화면 비노출)

ELSE IF EXISTS menu_schedule AND 현재 시각이 schedule 외 :
  → "판매 시간 외" (손님 화면에는 회색 + "판매 시간 아니에요" 라벨, 사장님 어드민에는 '판매중'으로 표시 + 보조 라벨)

ELSE :
  → "판매중"     (pill: done)
```

### 5.2 손님 화면 노출 규칙

| 효과적 상태 | 손님 화면 |
|---|---|
| 판매중 | 정상 노출, 선택 가능 |
| 판매 시간 외 | 회색 + "판매 시간 아니에요", 선택 불가 |
| 자동 품절 | 회색 + "품절", 선택 불가 |
| 수동 품절 | 회색 + "오늘 품절", 선택 불가 |
| 숨김 | 비노출 |

### 5.3 영업일 리셋 시 `manual_sold_out`

영업일 시작(03:00) 시:

```
UPDATE menu SET manual_sold_out = false WHERE manual_sold_out = true
```

→ 사장님이 어드민에 접속해 있을 경우 화면 데이터 자동 갱신.

---

## 6. 주문 채널 변경

`OrderChannelConfig.mode` 변경 시.

### 6.1 변경 전 안내 모달

`confirmOrderModeChange()` 호출 → 사장님이 [네, 바꿀게요] 클릭 시에만 저장 가능.

### 6.2 변경 영향 (저장 시점)

| 변경 | 즉시 영향 |
|---|---|
| `both` → `dine_in` | 포장 QR / 테이블 안의 포장 메뉴 노출 중단. **미수락 포장 예약은 사장님이 모두 처리 후에만 변경 가능 (변경 차단)** |
| `both` → `takeout` | 테이블 QR 손님 화면 비노출. 진행 중인 매장 식사 주문은 완료까지 정상 처리 |
| `dine_in` → `both` | 포장 주문 받기 시작 |
| `takeout` → `both` | 매장 주문 받기 시작 |
| `dine_in` ↔ `takeout` | 두 변환을 동시에 수행 |

### 6.3 검증 (저장 시점)

- 변경 후 `mode=takeout` 인데 미수락 포장 예약이 있으면 차단 + 안내 "포장 예약 N건을 먼저 수락/거절해 주세요"
- 진행 중인 매장 주문(상태 ≠ `completed`)이 있는데 매장 모드를 끄려 하면 경고만 표시, 저장은 허용 (진행 중 주문은 그대로 완료까지)

---

## 7. 직원호출 이벤트

### 7.1 발생 → 처리 흐름

```
손님이 테이블에서 메시지 선택
  → StaffCallEvent INSERT (called_at=now, resolved_at=null)
    → 매장 PC 에이전트로 푸시
      → 에이전트 PC에 팝업 + 사운드 발생
        → 직원이 팝업의 '완료' 버튼 클릭
          → StaffCallEvent UPDATE (resolved_at=now, resolved_by=user_id, handling_seconds=now-called_at)
            → 어드민 통계에 즉시 반영
```

### 7.2 디바운스

같은 `(table_id, message_id)` 조합이 `StaffCallConfig.debounce_seconds`(기본 30초) 내 두 번째 호출 발생 시:
- 두 번째 호출은 DB INSERT 안 함
- 손님 화면에 안내 토스트 "방금 호출했어요. 잠시 기다려 주세요"

### 7.3 미처리 호출

`resolved_at IS NULL` 이고 `called_at` 으로부터 10분 경과 시:
- 사장님에게 알림 "처리되지 않은 호출이 있어요"
- 어드민 상단에 빨간 배지

영업일 마감 시점에 미처리 호출은 자동 만료 처리 (`resolved_at = 영업일 종료 시각`, `resolved_by = null`). 통계 평균 처리 시간에서는 제외.

---

## 8. 정산

### 8.1 정산 사이클

```
영업일 종료 (02:59:59)
  → 다음날 03:00 배치 시작
    → 해당 영업일의 결제 / 환불 / 수수료 집계
      → Settlement 레코드 생성 (status='pending')
        → 정산 시스템 검증 (수기 또는 자동)
          → status='paid_out' 변경 + 사장님 계좌 입금 (D+3 영업일 출금)
```

### 8.2 마감 후 환불 처리

- 환불 발생 시점이 원거래 정산이 이미 `paid_out` 된 이후인 경우:
  - 환불액을 **다음 정산 회차의 차감액**으로 반영
  - 사장님에게 "어제 환불 N원이 내일 정산에서 차감돼요" 알림
  - 다음 회차 정산액이 환불액보다 작으면 `status='held'` (보류). 본사 CS 채널로 후속 처리.

---

## 9. 메뉴 가격 변경

- 가격 변경은 즉시 적용 (다음 주문부터 새 가격)
- 진행 중 주문에는 영향 없음 (OrderItem.unit_price_snapshot 사용)
- 사장님이 가격을 30% 이상 변경하려 할 경우 확인 모달 "가격이 크게 바뀌어요. 정말 이 가격으로 저장할까요?" (오타 방지)
- 변경 이력은 AuditLog에 기록
