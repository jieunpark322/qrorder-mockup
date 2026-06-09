---
name: description-board
description: 목업/프로토타입 사이트(HTML)를 화면별 "기획 주석 보드(디스크립션)"로 만들어 GitHub Pages에 배포한다. 각 화면 왼쪽에 실제 화면 + 번호 핀(이미지에 합성), 오른쪽에 번호별 4분류 카드(기능·목적/동작·상태값/데이터·연동/예외처리·UX문구)를 사이드바 순서대로 전 화면 배치하고, '최초 기획(그린필드)' 수준으로 상세 정의한 뒤 모순·정합성 검수까지 한다. 사용자가 "기획 주석 보드", "디스크립션", "화면 기획서", "기획안 만들어줘", "디스크립션 보드", "화면별 기능 명세를 Figma로", "목업을 기획서로" 등을 말하거나, 목업 URL/레포를 주며 화면별 상세 기획을 요청하면 반드시 이 스킬을 사용한다. 특히 "기획문서로 만들어줘", "기획서로 전환", "기획서로 만들어줘", "기획서로", "기획문서", "기획서" 같은 표현(슬래시 포함/미포함 무관)은 모두 이 스킬(기획 주석 보드 생성)을 의미하므로 즉시 발동한다.
---

# 화면 기획 주석 보드 (디스크립션) 생성

목업 HTML(보통 `setSection()` 류로 화면을 전환하는 SPA)을 입력받아, **사이드바 순서 그대로 모든 화면**을 기획 주석 보드로 만들고 GitHub Pages에 배포한다. 산출물은 Figma(html.to.design)로 가져가 개발자·디자이너와 댓글 소통하는 데 쓰인다.

핵심 산출 구조:
- `description.html` — 보드 본체(화면별: 좌측 핀 합성 이미지 + 우측 4분류 카드)
- `cap.html` — 화면 이미지 위에 번호 핀을 합성 캡처하는 페이지
- `desc/img/<key>.png` / `<key>_pin.png` — 화면 캡처 / 핀 합성본
- `desc/details.js` — `window.DETAILS = {화면키:{핀번호:{purpose,behavior,data,exception}}}` (그린필드 상세 정의)
- `REVIEW_NOTES.md` — 검수 결과·결정 기록
- `desc/boards/<NN>-<key>.html` + `index.html` + `board.css` — **화면별 분리본(Figma 레이어 분리용, 기본 산출)**

## 왜 이 구조인가 (반드시 지킬 원칙)
- **핀은 이미지에 구워 넣는다(별도 레이어 금지).** 핀을 CSS %로 이미지 위에 따로 얹으면 html.to.design 임포트 시 좌표가 찌부러져 화면을 키울 때 핀이 따로 논다. 핀이 그림의 일부면 절대 안 틀어진다.
- **화면은 실제 목업을 캡처**(재현 X). 정확하고 빠르다.
- **상세 정의는 데이터(`details.js`)로 분리**해 base 핀 위에 병합 → 내용 수정 시 이미지·핀 재생성 불필요.
- **사이드바(제품) 순서대로 전 화면을 빠짐없이.** 임의 선별·순서 금지.

## 절차

### 0. 입력 확인 + 화면 목록 추출
- 입력: 목업 레포 경로(또는 URL) + 스펙 문서(`SPEC.md`/`STATES.md`/`DATA_MODEL.md`/`spec/*.md` 등). 없으면 "근거 문서 없음 — 합리적으로 정의하고 가정은 명시"로 진행.
- 목업 `index.html`에서 네비게이션 정의(예: `NAV` 배열, `setSection('key')`, `{key,label}`)를 Grep해 **사이드바 위→아래 순서의 화면 key 목록**을 만든다. 서브탭/모달도 화면이면 포함.

### 1. 캡처 진입점 추가 (목업에 1회, 비침투)
`index.html` 끝(`renderApp()` 뒤)에 `?cap=<key>`일 때만 작동하는 부트스트랩을 추가한다. 평상시 목업엔 영향 없음.
```
(function(){var m=/[?&]cap=([\w-]+)/.exec(location.search||'');if(!m)return;
 function go(){try{setSection(m[1]);
   document.querySelectorAll('.grp-items.closed').forEach(g=>g.classList.remove('closed'));   // 사이드바 전체 펼침
   document.querySelectorAll('.grp .arr:not(.open)').forEach(a=>a.classList.add('open'));
   var dh=document.querySelector('.doc-head'); if(dh) dh.style.display='none';
   document.body.style.padding='0'; document.body.style.margin='0'; document.body.style.background='#fff';
   var pc=document.querySelector('.pc'); if(pc){pc.style.margin='0';pc.style.width='1280px';pc.style.maxWidth='1280px';pc.style.borderRadius='0';pc.style.boxShadow='none';pc.style.border='none';}
 }catch(e){}}
 go(); setTimeout(go,250); setTimeout(go,700);})();
```
(선택자 `.pc`/`.doc-head`/`.grp`는 목업 구조에 맞게 조정.)

### 2. 핀 좌표 실측 (preview_eval)
- 정적 서버를 띄운다: `.claude/launch.json`에 `python -m http.server <port> --directory <repo>` 구성 → `preview_start`.
- `preview_eval`로 목업을 각 화면으로 전환(`setSection`) 후, 핀을 달 요소들의 `getBoundingClientRect`를 **`.pc`(1280px) 기준 %**로 계산한다. 결과를 `POS = {key:{n:{x,y}}}`로 모은다. 요소가 탭 뒤에 숨어 있으면(예: 비활성 탭 패널) 보이는 탭 버튼을 가리키게 한다.

### 3. 깨끗한 화면 PNG 캡처 (Chrome 헤드리스)
`preview_screenshot`은 이 페이지들에서 자주 멈추므로 **쓰지 말고**, Chrome 헤드리스로 캡처한다(Chrome 경로는 환경에서 확인):
```
chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --force-device-scale-factor=2 --virtual-time-budget=4500 \
  --window-size=1280,<화면높이+10> \
  --screenshot="<repo>/desc/img/<key>.png" \
  "http://localhost:<port>/index.html?cap=<key>"
```
- 높이는 2단계에서 잰 `pc.scrollHeight` 사용. **차트(canvas)** 화면은 `--virtual-time-budget`로 렌더 대기(그래야 캔버스가 캡처에 담김).
- **매우 긴 화면**(예: 리뷰 목록 수천 px)은 상단~대표 일부만 보이게 **높이를 잘라** 캡처(임포트 안정화). 자른 높이에 맞춰 핀 %를 다시 산정(`px / 자른높이 * 100`).
- **[중요] Figma 이미지 한 변 최대 4096px.** 캡처 PNG의 가장 긴 변이 4096을 넘으면 Figma(html.to.design) 임포트 시 그 화면만 **공백**으로 떨어진다. `device-scale-factor × 화면높이 ≤ 4096`이 되도록 할 것 — 기본 2배 기준 **화면 논리높이 2048px 초과면 scale-factor를 1.5(또는 1)로 낮춰** 재캡처(예: 2516px 화면은 2배=5036 ✗ → 1.5배=3774 ✓). 캡처 후 `struct`로 PNG 치수를 확인해 4096 초과분을 잡는다.

### 4. 핀 합성본 생성 (cap.html)
`cap.html`(`?key=<key>`): `desc/img/<key>.png`를 width 1280으로 깔고, 그 위에 `POS[key]`의 번호 핀(파란 원+흰 숫자)을 %로 오버레이. 이걸 다시 헤드리스 캡처 → `desc/img/<key>_pin.png`. (POS는 cap.html에 단일 보관.)

### 5. 보드(description.html)
- 상단: 제목 + 4분류 범례 + 화면 인덱스(점프) + Figma 활용 안내 + (검수 후) 결정/확정필요 배너.
- 본체: `SCREENS` 배열(각 `{key, ord, name, icon, group, h, pins:[{n,title}]}`)을 `ord`로 정렬해, 화면마다 좌측 `<img src="desc/img/<key>_pin.png">` + 우측 카드 렌더.
- 카드 4분류는 base 핀의 내용 위에 `window.DETAILS[key][n]`를 **병합**(있으면 우선). `<script src="desc/details.js">`를 본문 스크립트 앞에 로드.
- 핀은 이미지에 이미 합성돼 있으므로 별도 핀 레이어를 만들지 않는다.

### 5b. 화면별 분리본 (Figma 레이어 분리 — 기본 산출, 별도 요청 없어도 함께 생성)
한 파일에 전 화면을 담으면 Figma 임포트 시 레이어가 한 덩어리가 되어 기능별로 찾기 어렵다. 그래서 **화면별 분리본을 기본으로 함께** 만든다:
- `desc/boards/<NN>-<key>.html` — 화면 1개 = 파일 1개(보드 1개: 좌측 `../img/<key>_pin.png` + 우측 4분류 카드). 파일명은 `ord` 2자리 접두(예: `03-orders.html`)로 사이드바 순서 정렬.
- `desc/boards/board.css` — `description.html`의 `<style>` 블록을 추출한 공용 스타일(각 파일이 `<link rel=stylesheet href="board.css">`로 참조).
- `desc/boards/index.html` — 카테고리(사이드바 그룹)별로 화면 링크를 묶은 목록 페이지.
- 생성은 **스크립트로**(per-screen 수작업 금지): 화면 메타(`key/ord/name/icon/group/pins[{n,title}]`)와 `details.js`의 `DETAILS`를 읽어 각 파일을 찍어낸다. 카드 마크업은 `description.html`의 `buildCards`와 동일 규칙(핀 번호+title 헤더, 4분류 행, 내용은 DETAILS).
- Figma 활용: 화면별 URL을 각각 import하면 화면마다 독립 프레임이 되어 기능별 레이어를 쉽게 찾는다. 전체 한 장(`description.html`)도 개요용으로 함께 유지한다.

### 6. 그린필드 상세 정의 (details.js) — 멀티에이전트 워크플로
화면당 1 에이전트가 ① `description.html`의 해당 화면 핀 목록(n+title) 확인(번호 유지) ② `index.html` 렌더 코드 Grep+Read로 실제 버튼·필드·탭·표 컬럼·상태·모달 파악 ③ 스펙 문서 참고 ④ 4분류를 **외주 개발자가 추가 질문 없이 구현할 수준**으로 작성(버튼별 동작·상태전이·기본값·검증·계산식·데이터 바인딩·연동 화면·실제 노출 문구). 스키마로 `{key, pins:[{n,purpose[],behavior[],data[],exception[]}]}` 강제.
- **조립 함정**: 워크플로 조립 에이전트에 거대 파일을 verbatim write 시키면 멈춘다. 결과는 **스크립트(JS/Python)에서 병합**해 `details.js`로 쓰거나, 멈추면 각 에이전트 `.jsonl`/`journal`에서 구조화 결과를 추출해 만든다.
- 제품 노트(목업 코드보다 우선하는 규칙)는 모든 에이전트 프롬프트에 주입(예: 취소 구분은 결제 완료 여부 기준 등).
- **[중요] 카드 내용의 `&` `<` `>`는 반드시 HTML 엔티티로 이스케이프**(`<b>`/`<code>` 태그는 보존). 코드식의 `&&`·`>=`·`!=`·`<` 같은 미이스케이프 특수문자가 있으면 html.to.design 등 **엄격한 파서가 그 화면을 통째로 공백** 처리한다(브라우저는 관대해 로컬은 멀쩡 → 발견이 어려움). `details.js` 생성·수정 후 전 문자열을 이스케이프 검사할 것.

### 7. 모순·정합성 검수 (적대적 워크플로)
8개 관점 병렬 검수: **취소·환불 / 권한(owner·staff) / 영업일·집계 / 정산 / 톤 / 용어 / 상태·전이 / 누락**. 각 에이전트가 `details.js` + 스펙 + 목업을 읽고 `{screen,pin,severity,type,issue,evidence,fix}` 발견 목록 반환.
- **보드 내부 모순·톤·용어·깨진 인용**은 직접 수정. `details.js`는 **JSON 파싱→문자열 치환→재직렬화**로 안전하게 고친다(이스케이프 사고 방지). 매칭 실패 목록을 출력해 검증.
- **제품/문서 결정이 필요한 항목**(스펙 간 충돌, 데이터모델 누락 등)은 임의로 정하지 말고 **보드 상단 배너 + `REVIEW_NOTES.md`**로 분리해 사용자에게 결정 요청. 결정되면 스펙 문서(SPEC/STATES/DATA_MODEL/spec)까지 정합화.

### 8. 톤·배포
- 톤: **능동·긍정**(부정형 "없어요"·"미확인 N건" 회피, 공포 표현 금지), 안내 보조문구는 가능형("~할 수 있어요"), 팀 표준 용어 사용.
- 배포: 작업 폴더 레포에 커밋·푸시(GitHub Pages). 라이브 URL과 `REVIEW_NOTES.md`를 안내.

## 검증 방법 (중요)
- `preview_screenshot`은 이 페이지에서 자주 타임아웃된다(렌더 결함 아님). 검증은 **`preview_eval`**(DOM/좌표 확인) + **Chrome 헤드리스 캡처 후 `Read`(이미지로 눈 확인)**로 한다.
- `details.js` 수정 후 항상 재파싱(`json.loads`)으로 유효성·화면 수(키 개수) 확인.

## 진행 스타일
사용자는 비개발자이며 "추천 1개 + 결과물 우선 + 빠른 진행"을 선호. 큰 작업이면 **포맷 1~2장 먼저 확정 → 전체 확장**, 배치별 커밋. 화면별 상세 생성·검수는 분량이 크므로 **멀티에이전트 워크플로** 사용(사용자 동의·opt-in 시).

---

## 사용자용 복붙 프롬프트 템플릿
사용자에게 이 템플릿을 안내하면 바로 재사용 가능:

```
[목업 URL 또는 레포 경로]의 [무슨] 사이트를 화면 기획 주석 보드(디스크립션)로 만들어줘.
[형식]
- 사이드바 위→아래 순서 그대로, 모든 화면을 빠짐없이 순차 배치
- 각 화면: 왼쪽에 실제 화면 + 요소마다 번호 핀, 오른쪽에 번호별 카드
- 카드 4분류: 기능·목적 / 동작·상태값 / 데이터·연동 / 예외처리·UX문구
- 핀은 이미지에 합성(별도 레이어 X) — Figma(html.to.design)에 가져가도 안 틀어지게
- GitHub Pages에 배포(라이브 URL)
[깊이] 최초 기획(그린필드) 수준 — 외주 개발자가 추가 질문 없이 구현하도록 모든
버튼·상태·검증·계산식·데이터·예외·노출 문구까지. 근거는 [SPEC.md/STATES.md/DATA_MODEL.md 등].
[톤] 능동·긍정(부정형 회피), 표준 용어.
[마무리] 다 만든 뒤 모순·정합성 셀프 검수(화면 간 충돌·스펙 위배·누락·톤)를 적대적으로 돌리고,
보드 내부 문제는 수정, 제품/문서 결정 필요 항목은 따로 정리.
```

한 줄 버전: `[URL]을 description-board 스킬 방식 그대로 — 사이드바 순서 전 화면, 번호 핀 합성 이미지 + 4분류 카드, 그린필드 상세, 모순 검수까지 — 만들어 배포해줘.`
