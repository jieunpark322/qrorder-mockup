# 슬랙 공유용 텍스트 모음

복사해서 슬랙에 그대로 붙여 쓰세요. 상황(전체 공지·항목별 상세·디자인팀 한정 등)에 따라 골라 쓸 수 있게 3가지 버전을 정리했어요.

---

## 1) 전체 공지용 (한 번에 9개 다 알리기)

```
📢 QR오더 점주 관리자 — 최근 변경 9건 (2026-06-10)

이번에 메뉴 관리·옵션 그룹 영역을 손봤어요. 항목별로 기능 명세·동작·예외처리를 정리한 디스크립션 보드를 만들었으니, Figma로 가져가시거나 그대로 검토 부탁드려요.

🔗 보드 목차 — https://jieunpark322.github.io/qrorder-mockup/desc/recent/index.html
🔗 라이브 화면 — https://jieunpark322.github.io/qrorder-mockup/

[변경 항목 9건]
① 메뉴 배너 (인기·추천·신메뉴) — 메뉴마다 토글로 켜고 끄기
② 옵션 그룹 모드 + 최대 선택 개수 — 1개만/여러 개 + N개까지
③ 옵션 그룹 수정 버튼 + 모달 — 삭제 후 재등록 불필요
④ 옵션 최대 선택 개수 (양방향) — 메뉴 측·옵션 측 어디서나 편집
⑤ 품절 처리 통합 — 일시/종일 구분 제거, 단일 토글
⑥ 카테고리 판매 시간 — 법정 공휴일 처리 3옵션
⑦ 알레르기 정보 자유 텍스트 — 14종 토글 → textarea
⑧ 메뉴 수정 모달 재정렬 + 사진 4:3 — 5개 섹션 그룹화
⑨ 엑셀 다운로드 버튼 통일 — 전 화면 단일 라벨, CSV 옵션 제거

각 보드는 「기능·목적 / 동작·상태값 / 예외·UX 문구」 3분류 카드로 정리되어 있어요. 의견·질문은 보드 URL이나 이 스레드에 달아주세요. 🙏
```

---

## 2) 항목별 상세 (보드 1개씩 따로 공유)

각 보드 URL을 그대로 첨부하면 슬랙이 OG 미리보기를 띄워줘요.

### 메뉴 정보
```
🍽️ 01 · 메뉴 배너 (인기·추천·신메뉴)
메뉴마다 손님 메뉴판에 노출할 배너(🔥 인기 / ⭐ 추천 / 🆕 신메뉴)를 토글로 켜고 끄기. 복수 선택 가능.
👉 https://jieunpark322.github.io/qrorder-mockup/desc/recent/01-menu-badges.html
```

```
⚠️ 07 · 알레르기 정보 자유 텍스트
기존 14종 토글을 폐기하고 사장님이 직접 입력하는 textarea로 변경. 원산지 페이지에서 분리해 메뉴 상세 안으로 이동.
👉 https://jieunpark322.github.io/qrorder-mockup/desc/recent/07-allergy-text.html
```

```
📐 08 · 메뉴 수정 모달 재정렬 + 사진 4:3
시각 복잡도가 높던 메뉴 수정 모달을 5개 섹션 카드로 그룹화하고 사진을 4:3 비율로 키움.
👉 https://jieunpark322.github.io/qrorder-mockup/desc/recent/08-menu-edit-layout.html
```

```
⛔ 05 · 품절 처리 통합
옛 「일시 품절·종일 품절」 구분을 단일 「품절」로 통합. 한 번 누르면 품절·다시 누르면 판매 재개.
👉 https://jieunpark322.github.io/qrorder-mockup/desc/recent/05-sold-out-unified.html
```

### 옵션 그룹
```
🧩 02 · 옵션 그룹 모드 + 최대 선택 개수
선택 방식을 「1개만 / 여러 개」로 정리. 여러 개일 때 그룹 자체의 최대 선택 항목 수를 지정.
👉 https://jieunpark322.github.io/qrorder-mockup/desc/recent/02-option-modes.html
```

```
✏️ 03 · 옵션 그룹 수정 버튼 + 모달
등록된 옵션 그룹을 직접 수정 가능. 기존엔 삭제 버튼만 있어서 항목 1개 바꾸려면 삭제 후 재등록 필요했음.
👉 https://jieunpark322.github.io/qrorder-mockup/desc/recent/03-option-edit-modal.html
```

```
🎚️ 04 · 옵션 최대 선택 개수 (양방향 편집)
메뉴×옵션 항목당 추가 횟수를 메뉴 측·옵션 측 어디서나 편집. 같은 데이터 공유.
예) 「샷 추가」 — 아메리카노 3회, 디카페인 라떼 1회, 키즈 음료 0회
👉 https://jieunpark322.github.io/qrorder-mockup/desc/recent/04-option-max-select.html
```

### 판매 스케줄
```
🇰🇷 06 · 카테고리 판매 시간 — 법정 공휴일 처리
판매 시간 모달에 공휴일 3옵션 추가 — 설정한 요일대로 / 공휴일엔 노출 안 함 / 공휴일에만 노출.
👉 https://jieunpark322.github.io/qrorder-mockup/desc/recent/06-holiday-schedule.html
```

### 공통 UI
```
📥 09 · 엑셀 다운로드 버튼 통일
화면마다 다른 라벨(📤 내보내기 · 📤 엑셀로 받기 · 📥 엑셀·CSV 받기)을 「📥 엑셀 다운로드」 하나로 통일. CSV 옵션 제거.
👉 https://jieunpark322.github.io/qrorder-mockup/desc/recent/09-excel-download.html
```

---

## 3) 디자인팀 한정 (Figma 가져갈 때)

```
🎨 [디자인팀] QR오더 점주 관리자 변경분 9건 — Figma 임포트용 보드

이번에 메뉴 관리·옵션 영역 변경 내용을 항목별 HTML 보드로 정리했어요. html.to.design으로 임포트 후 작업 부탁드려요.

📋 보드 목차 — https://jieunpark322.github.io/qrorder-mockup/desc/recent/index.html

[임포트 방법]
1. Figma → Plugins → html.to.design 실행
2. 각 보드 URL을 하나씩 붙여넣기 (총 9개)
3. 변환된 프레임에 「화면 캡처 자리」가 있는데, 라이브 화면을 직접 캡처해서 그 위에 배치해 주세요.

[보드 구조]
- 좌측: 화면 캡처 자리 (placeholder)
- 우측: 3분류 카드 (기능·목적 / 동작·상태값 / 예외·UX 문구)
- 헤더: 항목명 + 진입 경로 + 라이브 링크
- 변경 전/후 비교: 무엇이 어떻게 바뀌었는지 명시

라이브 화면 캡처가 필요하면 https://jieunpark322.github.io/qrorder-mockup/ 에서 직접 보고 화면 캡처해 주세요. 캡처 도움 필요하면 말씀해 주세요. 🙏
```

---

## 변경 후 라이브 URL

- 메인 라이브 — https://jieunpark322.github.io/qrorder-mockup/
- 보드 목차 — https://jieunpark322.github.io/qrorder-mockup/desc/recent/index.html
- 보드 개별 (01~09) — `https://jieunpark322.github.io/qrorder-mockup/desc/recent/{NN}-{key}.html`
