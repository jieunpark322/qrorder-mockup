/* 화면별 상세 정의(그린필드) — description.html이 base 핀 위에 병합. 자동 생성 + 검수 반영. */
window.DETAILS = {
 "home": {
  "1": {
   "purpose": [
    "어드민 전체 기능의 <b>상시 진입점</b>. 모든 화면 좌측에 고정 노출되며 8개 그룹·21개 메뉴로 구성된다.",
    "현재 보고 있는 화면을 시각적으로 알려 주고(파란 강조), 미처리 업무 건수를 배지로 즉시 인지시킨다.",
    "50~60대 사장님 인지 부담을 줄이기 위해 그룹 단위 접기/펼치기를 제공한다."
   ],
   "behavior": [
    "메뉴 구성(고정): <code>홈</code>·<code>알림 센터</code>(_solo 그룹) / 주문 관리(주문 내역·주문 방식) / 매장 운영(매장 설정·직원 호출·테이블 관리·QR 관리·직원 계정 관리) / 메뉴 관리(메뉴판 관리·오늘의 준비량·번역) / 매출 관리(매출 한눈에 보기·매출 상세 보기) / 정산 관리(정산 달력·정산 내역) / 마케팅·CRM(쿠폰·스탬프·포인트·멤버십·우리 매장 리뷰) / 고객 지원(문의·자주 묻는 질문).",
    "현재 섹션 메뉴 항목에 <code>.navitem.on</code> 클래스(파란 배경)로 강조. 클릭 시 <code>setSection(key)</code> 호출 후 본문 렌더.",
    "<b>그룹 헤더 클릭</b> → 해당 그룹 토글(접기/펼치기). 상태는 <code>state.sidebarOpen</code>에 그룹별로 저장. 최초 진입 시 모든 그룹 펼침(<code>_solo</code> 제외 자동 펼침).",
    "메뉴 우측 <b>빨간 배지</b> = 미처리 건수. 알림 센터=미확인 알림 수(<code>NOTIFICATIONS.filter(!read)</code>), 정산 내역=2(고정 목업값). 0이면 배지 숨김(<code>n||undefined</code>).",
    "현재 화면이 속한 그룹은 진입 시 자동 펼침 처리."
   ],
   "data": [
    "메뉴 트리는 정적 구성(<code>groups[]</code>: {label, items:[{key, ic, label, n?}]}).",
    "배지 수치 바인딩: 알림=미확인 알림 카운트 조회 API, 정산=미확인 정산 건 카운트.",
    "역할 플래그 <code>STORE.role</code>(<code>owner</code>/<code>staff</code>)에 따라 항목 노출/활성 제어 — SPEC §1.6.2 권한 매트릭스.",
    "클릭 라우팅은 섹션 key → <code>SECTION_MAP[key].fn</code>(render 함수) + <code>url</code> 매핑."
   ],
   "exception": [
    "SPEC §1.6.2: 좌측 메뉴는 <b>모두 노출</b>하되 staff 권한 없는 항목(매출 한눈에 보기·매출 상세 보기·정산 달력·정산 내역·직원 계정 관리·주문 방식·QR 관리·매장 설정)은 <b>회색 + 자물쇠 아이콘</b>으로 표시.",
    "권한 없는 항목 클릭 시 모달: <b>\"사장님 권한이 필요해요. 가맹점주 본인 계정으로 로그인해 주세요\"</b> (spec/08-common.md §4 403 처리).",
    "배지는 색만으로 의미 전달하지 않도록 숫자를 병기(접근성).",
    "그룹 접힘 상태에서도 현재 화면이 속한 그룹은 자동으로 펼쳐 길을 잃지 않게 한다."
   ]
  },
  "2": {
   "purpose": [
    "로그인한 계정과 운영 중인 <b>매장·사장님을 식별</b>하는 영역. 사이드바 상단에 고정.",
    "클릭 시 <b>내 정보</b> 화면으로 이동해 계정·비밀번호·정산 계좌를 관리할 수 있다."
   ],
   "behavior": [
    "호버 시 강조. 내 정보 화면을 보고 있을 때 선택 상태(<code>.on</code>).",
    "우측 <code>›</code> 화살표로 진입 가능함을 표시. 박스 전체가 클릭 영역.",
    "클릭 → <code>setSection('내 정보')</code> 라우팅."
   ],
   "data": [
    "표시 필드: 매장명 <code>STORE_INFO.name</code> · 사장님명 <code>STORE_INFO.owner</code> · 역할(<code>owner</code>/<code>staff</code>) 라벨.",
    "계정 ID·비밀번호·정산 계좌 상세는 내 정보 화면 진입 시 별도 로드(여기서는 미노출).",
    "역할 플래그에 따라 하위 메뉴 노출 분기."
   ],
   "exception": [
    "툴팁: \"내 정보·비밀번호·정산 계좌\".",
    "<b>staff 계정</b>은 정산 계좌 항목 비노출(SPEC §1.6.2 정산 권한 없음).",
    "매장명/사장님명 미로드(네트워크 지연) 시 스켈레톤 또는 매장 기본 식별자 노출, 빈 문자열로 깨지지 않게 처리."
   ]
  },
  "3": {
   "purpose": [
    "<b>오늘 영업일과 매장 위치</b>를 확인시키고, 사장님 호칭으로 친근하게 화면을 시작하는 페이지 헤더.",
    "대시보드 전체의 기준 날짜(영업일)를 명시해 이후 카드 수치의 해석 기준을 잡아 준다."
   ],
   "behavior": [
    "표시 날짜 = <b>현재 영업일</b> 기준. 영업일 시작 03:00 KST, 종료 다음 날 02:59 KST (SPEC §1.1).",
    "좌측: 인사 + 보조 안내문. 우측 상단: 매장명·주소(📍) 정렬.",
    "날짜·인사는 정적 텍스트(상호작용 없음)."
   ],
   "data": [
    "영업일은 <b>서버 시각 기준</b> 계산(클라이언트 로컬 시각 미사용).",
    "바인딩: <code>STORE_INFO.owner</code> / <code>STORE_INFO.name</code> / <code>STORE_INFO.addr</code>.",
    "날짜 포맷 <code>YYYY-MM-DD(요일)</code> — 목업 고정값 <code>2026-05-15(목)</code>."
   ],
   "exception": [
    "문구: \"안녕하세요, OOO 사장님 👋\".",
    "보조 문구: \"오늘은 YYYY-MM-DD(요일)이에요. 어제 매장 운영 결과와 오늘 챙겨야 할 일감을 한눈에 모았어요.\"",
    "03:00 영업일 전환 시점에 접속 중이면 전체 새로고침 없이 데이터만 부드럽게 재조회(SPEC §2.5)."
   ]
  },
  "4": {
   "purpose": [
    "<b>어제 영업일의 운영 성과</b>를 KPI 3종(어제 총 매출 · 어제 주문 수 · 평균 객단가)으로 요약하고, 그저께 대비 증감을 보여 준다.",
    "패널 클릭 시 <b>매출 한눈에 보기</b>로 이동해 상세 분석으로 자연스럽게 연결한다."
   ],
   "behavior": [
    "패널 전체가 클릭 영역(<code>cursor:pointer</code>, 호버 시 살짝 떠오름) → <code>setSection('overview')</code>.",
    "증감 표시: <b>▲ 파랑(증가) / ▼ 빨강(감소)</b>. 총 매출은 \"▲/▼ 절댓값 원 (+/-퍼센트%)\", 주문 수는 \"▲/▼ 절댓값 건\".",
    "매출은 <b>어제까지 집계된 확정값</b>. 오늘 실시간 매출은 주문 내역에서 확인하도록 분리.",
    "우측 헤더 액션에 \"매출 한눈에 보기 ›\" 링크 텍스트."
   ],
   "data": [
    "어제 = <code>DAY[TODAY_IDX-1]</code>, 그저께 = <code>DAY[TODAY_IDX-2]</code> (각 {gross, ocnt}).",
    "매출 집계식 <code>actual = gross − disc − pt − ref</code> (SPEC §2.1). 환불은 원거래일 영업일 매출에서 차감(SPEC §1.5).",
    "증감 계산: <code>grossDiff = 어제.gross − 그저께.gross</code>, <code>grossDiffPct = round(grossDiff/그저께.gross*100)</code>(분모 0이면 0%).",
    "평균 객단가 = <code>round(어제.gross / 어제.ocnt)</code> — 홈 KPI는 <b>총매출(gross) 기준 요약</b>이라 매출 화면의 실매출(actual) 객단가와 값이 다름(라벨로 구분 권장). 주문 수 0이면 0.",
    "부가세 round(taxable/11) 등 세부 계산은 상세 화면에서 처리(SPEC §1.3)."
   ],
   "exception": [
    "신규 매장 등 데이터 없음 시 <b>0원 / 0건 / 0원</b> 표시 + 빈 상태 안내(에러 아님, spec/08-common.md §3·§4 404).",
    "그저께 매출 0이면 퍼센트 0% 고정(0 나눗셈 방지), 증감 화살표는 절댓값 기준.",
    "헤더 보조: \"5/14(수) · 그저께(5/13 화)와 비교\"."
   ]
  },
  "5": {
   "purpose": [
    "사장님이 <b>오늘 처리해야 할 미처리 업무</b>를 한곳에 모은 영역: 답변 안 한 리뷰 · 답변 받을 문의 · 확인 안 한 알림.",
    "각 카드 클릭 시 해당 처리 화면으로 바로 이동해 즉시 처리하도록 유도한다."
   ],
   "behavior": [
    "카드 3종. 건수 > 0이면 테두리 강조색(<b>리뷰=노랑 #fbbf24 / 문의=파랑 / 알림=빨강 #fca5a5</b>), 0이면 회색 테두리(<code>--line</code>).",
    "리뷰 카드 클릭 → <code>setSection('reviews')</code> + <code>state.reviewFilter='wait'</code> 설정 후 렌더(리뷰 화면을 '답변 대기' 필터로 연다).",
    "문의 카드 클릭 → <code>setSection('cs')</code>. 알림 카드 클릭 → <code>setSection('notify')</code>.",
    "호버 시 카드 떠오름 효과. 헤더에 총 건수 + 항목별 분해(\"N건 리뷰 N · 문의 N · 알림 N\") 표시.",
    "숫자 색상: >0이면 강조색(리뷰 #d97706, 문의 파랑, 알림 빨강), 0이면 회색."
   ],
   "data": [
    "리뷰 미처리 = <code>REVIEWS.filter(r=>!r.reply).length</code> (사장님 답변 reply 없는 건).",
    "문의 미처리 = <code>CS_INQUIRIES.filter(c=>c.status==='답변 대기').length</code>.",
    "알림 미확인 = <code>NOTIFICATIONS.filter(n=>!n.read).length</code> (없으면 목업 기본 4).",
    "각 수치는 해당 도메인 카운트 API로 조회, 사이드바 배지(핀 1)와 동일 소스 사용."
   ],
   "exception": [
    "0건일 때 능동·긍정 문구: 리뷰 \"모든 리뷰에 답변하셨어요\" / 문의 \"문의 모두 답변 받음\" / 알림 \"모든 알림을 확인하셨어요\".",
    ">0일 때 행동 유도 문구: 리뷰 \"클릭해서 답변하기 →\", 문의 \"운영팀 답변 대기 중\", 알림 \"클릭해서 확인하기 →\".",
    "부정형(\"없어요\") 회피 — 능동·긍정 톤(SPEC §3.2).",
    "staff 계정도 리뷰·문의·알림은 접근 가능(권한 매트릭스상 운영 기능)."
   ]
  },
  "6": {
   "purpose": [
    "오늘 매장 운영의 핵심 변수 4종을 2×2로 점검: <b>오늘 영업시간 · 받는 주문 방식 · 오늘의 준비량 · 오늘 품절 메뉴</b>.",
    "각 카드 클릭 시 해당 설정 화면으로 이동해 즉시 조정하도록 연결한다."
   ],
   "behavior": [
    "영업시간 카드 → <code>setSection('store')</code>. 오늘 요일 기준 영업시간 표시, 휴무면 \"휴무\". 브레이크타임 있으면 \"브레이크 HH:MM~HH:MM\" 보조 노출.",
    "주문 방식 카드 → <code>setSection('order-type')</code>. 현재 채널 모드(<code>ORDER_CHANNELS.mode</code>)를 라벨로 표시.",
    "준비량 카드 → <code>setSection('stock')</code>. \"N개 관리 중\" + <b>곧 품절 ⚠️ / 완료 🔴</b> 배지. 곧 품절·완료 > 0이면 테두리 노랑(#fbbf24).",
    "품절 메뉴 카드 → <code>setSection('menu')</code>. 수동 품절 메뉴 수 표시. >0이면 테두리 빨강(#fca5a5), 숫자 빨강.",
    "각 카드 우측 상단에 진입 링크(\"매장 설정 ›\" 등). 호버 시 떠오름."
   ],
   "data": [
    "영업시간 = <code>STORE_INFO.hours.find(dow===오늘요일)</code> → <code>off</code>면 휴무, 아니면 <code>open~close</code>, <code>breakS/breakE</code>.",
    "주문 방식 = <code>ORDER_CHANNELS.mode</code> → <code>ORDER_LABELS.mode[modeKey]</code>로 한글 라벨.",
    "준비량: <code>MENU_STOCK.items.filter(enabled)</code> 중 곧 품절 <code>remaining>0 && remaining<=lowAlert</code>, 완료 <code>remaining===0</code>.",
    "품절 메뉴 = <code>MENUS.filter(m=>m.manualSoldOut)</code>. 새 영업일 시작 시 manualSoldOut 전부 자동 해제(SPEC §2.5).",
    "메뉴 효과적 판매 상태 규칙 SPEC §2.3."
   ],
   "exception": [
    "준비량 배지: \"⚠️ 곧 품절 N\" / \"🔴 완료 N\". 둘 다 0이면 \"한정 수량 메뉴 정상 운영 중\".",
    "품절 메뉴 0이면 \"모든 메뉴 정상 판매 중\", >0이면 \"손님 화면에 품절로 표시 중\".",
    "휴무일이면 영업시간 카드에 \"휴무\" 표시(에러 아님).",
    "주문 방식 카드 보조: \"클릭해서 채널·결제 방식 확인\". 매장 설정·주문 방식 변경은 owner 전용 — staff는 진입 후 액션 비활성(SPEC §1.6.2)."
   ]
  },
  "7": {
   "purpose": [
    "사용 빈도가 높은 4개 화면으로 <b>즉시 진입</b>하는 바로가기 버튼 묶음: 주문 내역 · 매출 한눈에 보기 · 메뉴판 관리 · 정산 내역.",
    "대시보드에서 자주 가는 화면으로의 클릭 수를 줄여 준다."
   ],
   "behavior": [
    "버튼 4개(<code>.btn-ghost</code>). 클릭 시 각각 <code>setSection('orders')</code> / <code>setSection('overview')</code> / <code>setSection('menu')</code> / <code>setSection('stl-list')</code>.",
    "1차 버전에서는 고정 4개 버튼(개인화 없음). 라벨에 이모지 병행(📋·📊·🍽️·💰).",
    "가로 배치, 공간 부족 시 줄바꿈(<code>flex-wrap</code>)."
   ],
   "data": [
    "정적 링크 매핑(섹션 key 고정). 차후 사용 빈도 기반 개인화 여지.",
    "각 버튼 라벨: \"📋 주문 내역\", \"📊 매출 한눈에 보기\", \"🍽️ 메뉴판 관리\", \"💰 정산 내역\"."
   ],
   "exception": [
    "<b>staff 계정</b>은 매출 한눈에 보기·정산 내역 버튼 비활성(회색 + 자물쇠) — 클릭 시 모달 \"사장님 권한이 필요해요. 가맹점주 본인 계정으로 로그인해 주세요\" (SPEC §1.6.2).",
    "라벨에 이모지를 병행해 색만으로 의미를 전달하지 않도록 한다(접근성, spec/08-common.md).",
    "비활성 버튼에 툴팁 \"사장님 권한이 필요해요\" 노출."
   ]
  }
 },
 "store": {
  "1": {
   "purpose": [
    "<b>화면 제목 영역과 전역 저장 메커니즘</b>. 매장 설정 화면(URL <code>admin.qrorder.softment.co.kr/store</code>)의 최상단 크럼브 '매장 운영 › 매장 설정' + 제목 <code>h2</code> '매장 설정' + 부제 '매장 정보·운영 시간·휴무일을 관리해요.'를 표시한다.",
    "이 화면의 모든 패널(기본 정보·이미지·소개/편의정보·운영 시간·휴게 시간·휴무 일정)에서 일어난 변경을 한 번에 서버에 반영하는 진입점. 화면 내 입력은 메모리(<code>STORE_INFO</code>)에만 반영되므로 명시적 저장이 필요하다."
   ],
   "behavior": [
    "진입 시 <code>STORE_INFO</code> 전체를 deep-copy 해 <code>snapshot</code>으로 보관하고, 이후 현재 값과 비교해 <b>dirty(변경 여부)</b>를 추적한다(SPEC §2.8).",
    "어떤 필드라도 <code>snapshot</code>과 달라지면 상단/저장 버튼 영역에 '저장하지 않은 변경 사항이 있어요' 안내를 띄우고 저장 버튼을 활성화(<code>markUnsavedUI()</code> 호출 지점: 운영시간 select <code>onchange</code>, 행 추가/삭제, 요일 토글). 편의정보/이미지/소개글 변경도 동일하게 dirty로 잡도록 저장 로직에 포함한다.",
    "<b>[저장]</b> 클릭: 전체 폼 검증 통과 시 매장 마스터 PATCH 후 success 토스트 '매장 설정을 저장했어요'(초록, 3초, SPEC 08-common §1.1) 노출 + <code>snapshot</code> 갱신 + dirty 해제. 검증 실패 시 저장 중단하고 첫 오류 필드로 스크롤·포커스.",
    "저장은 명시적 액션이므로 토스트로 결과 표시(08-common §1.3). 200ms 이하 응답은 스피너 생략, 처리 중 버튼 라벨 '처리 중...'(08-common §2)."
   ],
   "data": [
    "저장 대상: 매장 마스터(<code>store</code>) — <code>displayName</code>, <code>phone</code>, <code>intro</code>, <code>amenities[]</code>, <code>amenitiesCustom[]</code>, 로고/이미지 자산, <code>scheduleSlots[]</code>, <code>hours[].breakS/breakE</code>, <code>holidays[]</code>.",
    "<code>business_type</code>(general/simplified)도 매장 마스터 필드이며 1차에서는 owner가 설정(SPEC §1.4, §1.6.2). <b>정산 계좌 변경만 본사 승인 대상</b>이고 나머지 정보 변경은 즉시 반영.",
    "API 성격: 단일 매장 마스터 조회(GET)·부분 갱신(PATCH). 운영 시간·휴무는 손님 주문 화면과 영업일 집계의 기준 데이터로 연동된다."
   ],
   "exception": [
    "<code>staff</code> 권한은 매장 마스터 변경 불가(SPEC §1.6.2). 화면은 보여 주되 입력/버튼을 비활성화하고 툴팁 '사장님 권한이 필요해요'를 표시(SPEC §1.6.2 / 111행).",
    "dirty 상태에서 다른 화면으로 이동·새로고침 시도 시 이탈 확인 안내 '저장하지 않은 변경 사항이 있어요. 이동할까요?'를 띄워 실수 손실을 방지.",
    "저장 API 실패 시 error 토스트(빨강, 자동 닫힘 없음, 08-common §1.1) '저장에 실패했어요. 잠시 후 다시 시도해 주세요'를 표시하고 입력값은 유지한다.",
    "검증 미통과 항목이 있으면 저장을 막고 해당 패널의 인라인 오류(예: 운영시간 모순, 빈 요일)를 먼저 해소하도록 안내."
   ]
  },
  "2": {
   "purpose": [
    "<b>기본 정보 패널</b>(제목 '기본 정보', 부제 '사업자등록증 기준 정보예요'). 매장명·손님용 표시명·대표자명·사업자등록번호·전화번호·주소를 표시·관리한다.",
    "🔒 잠금 항목은 가입 시 사업자등록증으로 시스템 관리자가 설정한 법적 정보로, 매출/세금 계산과 정산의 기준이 되므로 사장님이 임의 수정하지 못하게 막는다."
   ],
   "behavior": [
    "상단에 노랑 안내 박스: '🔒 매장 이름·대표자명·사업자등록번호·매장 주소는 가입 시 사업자등록증 정보로 시스템 관리자가 설정해, 여기서는 바꿀 수 없어요. 변경이 필요하면 고객센터로 알려 주세요.'",
    "잠금 필드(<code>disabled</code>): '매장 이름 🔒'(<code>name</code>), '대표자명 🔒'(<code>owner</code>), '사업자등록번호 🔒'(<code>bizNo</code>), '매장 주소 🔒'(<code>addr</code>) — 읽기 전용으로만 표시.",
    "수정 가능 필드: '손님이 보는 매장 이름'(<code>displayName</code>, <code>oninput</code>으로 즉시 반영, placeholder '손님 화면에 보일 이름', 보조문구 '손님 주문 화면에 이 이름이 보여요. 매장 이름과 다르게 자유롭게 정할 수 있어요.'), '매장 전화번호'(<code>phone</code>).",
    "<code>business_type</code>(일반/간이과세) 설정 컨트롤을 이 패널에 둔다(SPEC §1.4). 기본값 <code>general</code>. 간이과세 선택 시 전 화면 <code>vat=0</code>로 노출(UI 숨김 아님, §1.4 64행)."
   ],
   "data": [
    "기본값 예시: <code>name</code>='소프트커피 합정점', <code>displayName</code>='소프트커피 합정점', <code>owner</code>='홍길동', <code>bizNo</code>='123-45-67890', <code>phone</code>='02-1234-5678', <code>addr</code>='서울 마포구 양화로 45'.",
    "필드 타입/검증: <code>displayName</code> string 필수, 1~30자 권장. <code>phone</code> string, 전화번호 형식(숫자·하이픈) 검증. <code>business_type</code> enum(general/simplified) — 부가세 산식 <code>vat=round(taxable/11)</code>의 분기 기준(SPEC §1.3).",
    "연동: <code>displayName</code>·로고·소개·운영시간은 손님 주문 화면, <code>business_type</code>은 메뉴/주문/매출/정산 화면의 부가세 표기에 영향. 잠금 항목은 시스템 관리자(본사) 마스터에서만 변경."
   ],
   "exception": [
    "잠금 필드 수정 시도 시 안내 '변경이 필요하면 고객센터로 알려 주세요' 경로만 제공하고 직접 편집 불가.",
    "<code>displayName</code>을 비우고 저장 시 인라인 오류 '손님에게 보일 매장 이름을 입력해 주세요'.",
    "<code>phone</code> 형식 오류 시 '전화번호 형식을 확인해 주세요' 인라인 표시.",
    "<code>staff</code> 권한은 본 패널 입력 비활성 + 툴팁 '사장님 권한이 필요해요'(SPEC §1.6.2)."
   ]
  },
  "3": {
   "purpose": [
    "<b>매장 소개·편의정보 패널</b>(제목 '매장 소개 · 편의정보', 부제 '손님 주문 화면에 함께 보여요') + 로고/대표 이미지 관리. 손님이 주문 화면에서 보는 매장 소개글·편의정보 칩·이미지를 입력한다.",
    "매장의 특징(주차·와이파이 등)과 분위기를 손님에게 전달해 주문 경험을 높이는 콘텐츠 영역."
   ],
   "behavior": [
    "<b>매장 로고</b>(1장): 80x80 정사각 업로드 카드(클릭 시 업로드). 보조문구 'PNG·JPG / 정사각형 권장 / 최대 2MB'.",
    "<b>매장 대표 이미지</b>(최대 3장): <code>addStoreImage()</code>로 추가, 각 카드 ✕로 <code>removeStoreImage(idx)</code> 삭제. 3장 도달 시 '+ 이미지 추가' 카드 숨김. 보조문구 'PNG·JPG / 가로형 권장 / 장당 최대 5MB'. (주의: mockup의 <code>extraImages<2</code> 한계는 버그성 — 기획상 <b>최대 3장</b>으로 구현.)",
    "<b>매장 소개글</b>(<code>textarea</code> 3행, <code>intro</code>, <code>oninput</code> 즉시 반영, placeholder '예: 매일 직접 로스팅한 원두로 내린 커피와 갓 구운 베이커리를 즐길 수 있는 동네 카페예요.').",
    "<b>편의정보 칩</b>: 프리셋 14종(주차장·단체석·포장·무선 인터넷·남성/여성 화장실 구분·룸·국민지원금·지역화폐(지류형)·지역화폐(카드형)·제로페이·테라스·발렛파킹·반려동물 동반·유아용 의자)을 칩 클릭으로 선택/해제(<code>toggleAmenity</code>). 보조문구 '해당하는 항목을 눌러 선택할 수 있어요. 다시 누르면 해제돼요.'",
    "<b>직접입력</b>: 텍스트 입력 후 '+ 추가'(<code>addCustomAmenity()</code>, Enter 동일)로 <code>amenitiesCustom</code>에 칩 추가, 칩의 ✕로 <code>removeCustomAmenity(i)</code> 삭제. 보조문구 '목록에 없는 편의정보를 직접 적어 추가할 수 있어요.'"
   ],
   "data": [
    "기본값: <code>intro</code>='매일 직접 로스팅한...', <code>amenities</code>=['주차장','무선 인터넷','포장'], <code>amenitiesCustom</code>=[], <code>extraImages</code>=0.",
    "필드: <code>store.intro</code> string(선택, 권장 0~200자), <code>amenities</code> string[](프리셋 라벨 부분집합), <code>amenitiesCustom</code> string[](자유 텍스트), 로고/이미지 자산 URL. 프리셋 라벨↔아이콘 매핑은 <code>STORE_AMENITY_ICONS</code>.",
    "연동: 소개글·편의정보·로고·대표 이미지는 모두 손님 주문 화면에 노출. 이미지는 업로드 시 형식(PNG/JPG)·용량(로고 2MB, 이미지 5MB) 검증."
   ],
   "exception": [
    "<b>선택 입력</b> — 소개글·편의정보·이미지 모두 빈 값 허용. 손님 화면에서는 값이 있는 항목만 노출.",
    "직접입력에서 이미 선택/추가된 항목 재입력 시 info 토스트 'ℹ️ 이미 추가된 편의정보예요'를 띄우고 입력창만 비운다.",
    "빈 문자열로 '+ 추가' 시 추가하지 않고 입력창에 포커스만 유지.",
    "이미지 형식·용량 초과 업로드 시 '이미지는 PNG·JPG, 로고 2MB·대표 이미지 5MB 이하로 올릴 수 있어요' 안내. <code>staff</code>는 변경 비활성 + 툴팁 '사장님 권한이 필요해요'."
   ]
  },
  "4": {
   "purpose": [
    "<b>매장 운영 시간 패널</b>(제목 '매장 운영 시간'). 요일을 묶은 슬롯(알람 스타일)별로 오픈·마감·라스트오더를 설정해 손님이 주문 가능한 시간을 정의한다.",
    "손님 주문 화면의 영업 여부·라스트오더 마감 판단의 기준이 된다. 영업일(03:00 기준 매출 집계)과는 별개 개념(SPEC §1.1)."
   ],
   "behavior": [
    "<b>[+ 행 추가]</b>(<code>addScheduleSlot()</code>): 빈 요일·open 09:00·close 22:00·lastOrder 빈값의 새 슬롯 추가. 여러 요일을 한 행에 묶어 관리. 보조문구 '요일을 선택하고 오픈·마감·라스트오더 시간을 입력하세요. 여러 요일을 한 행에 묶어서 관리할 수 있어요.'",
    "<b>요일 칩</b>(일·월·화·수·목·금·토 순): 클릭으로 슬롯에 요일 추가/해제(<code>toggleSlotDay</code>). 요일이 0개인 슬롯은 노란 강조 + 경고 '⚠️ 적용할 요일을 하나 이상 선택해 주세요.'",
    "<b>시간 select</b>(10분 단위 <code>timeOptions10</code>): 오픈·마감(필수, 기본 09:00/22:00), 라스트오더(빈값 허용 = '선택 안 함'). 변경 시 <code>updateSlotTime</code> + <code>markUnsavedUI()</code>로 dirty 처리.",
    "<b>[✕ 삭제]</b>(<code>removeScheduleSlot(id)</code>): 슬롯 2개 이상일 때만 노출. 마지막 1개 삭제 시도 시 차단(아래 예외).",
    "기본 슬롯: 슬롯1 월~금 09:00~22:00 라스트오더 21:30, 슬롯2 토·일 10:00~22:00 라스트오더 20:30."
   ],
   "data": [
    "필드: <code>scheduleSlots[{id:number, days:string[], open:'HH:mm', close:'HH:mm', lastOrder:'HH:mm'|''}]</code>. <code>id</code>는 기존 최대값+1로 부여.",
    "검증: <code>open</code>·<code>close</code> 형식 HH:mm, <code>close>open</code>(마감<오픈 모순 차단), <code>lastOrder<=close</code> 권장. 슬롯 간 같은 요일 중복 배정 금지. (참고로 기존 <code>hours[].open/close</code> 배열은 요일별 표시·휴게 기준으로 공존.)",
    "연동: 손님 주문 화면 영업 판단·라스트오더 안내에 사용. <b>영업시간 ≠ 영업일</b> — 매출/재고 집계는 03:00 시작 영업일 기준(SPEC §1.1)."
   ],
   "exception": [
    "요일 미선택 슬롯은 인라인 경고 '⚠️ 적용할 요일을 하나 이상 선택해 주세요.' 표시 + 저장 차단.",
    "마지막 슬롯 삭제 시도 시 안내 '운영 시간은 최소 1개 필요해요.'(<code>removeScheduleSlot</code> alert) 후 삭제 취소.",
    "마감이 오픈보다 빠르거나 같은 모순 입력 시 인라인 오류 '마감 시간은 오픈 시간보다 늦어야 해요'.",
    "두 슬롯에 같은 요일이 중복되면 '같은 요일이 여러 행에 들어 있어요. 한 곳만 남겨 주세요' 안내. <code>staff</code>는 비활성 + 툴팁 '사장님 권한이 필요해요'."
   ]
  },
  "5": {
   "purpose": [
    "<b>매장 휴게 시간(브레이크) 패널</b>(제목 '매장 휴게 시간', 부제 '브레이크타임이 없는 요일은 비워두세요'). 요일별 휴게 시작·종료 시간을 설정한다.",
    "점심 마감 등 영업 중 잠시 주문을 받지 않는 시간대를 손님 화면에 반영하기 위한 영역."
   ],
   "behavior": [
    "요일 7행(월·화·수·목·금·토·일) 표 — 컬럼: <b>요일 · 휴게 시작 · ~ · 휴게 종료 · (요약)</b>. 헤더 보조 '비워두면 해당 요일 휴게 없음'.",
    "휴게 시작/종료는 10분 단위 select(<code>updateBreak(i,'breakS'|'breakE',value)</code>, 빈값 허용). 둘 다 채우면 요약 칸에 'HH:mm ~ HH:mm', 아니면 '휴게 없음' 표시.",
    "브레이크 없는 요일은 두 칸을 비워두면 됨. 변경 시 dirty 처리되어 저장 대상에 포함.",
    "기본값: 월~목 15:00~17:00 브레이크, 금·토·일 브레이크 없음."
   ],
   "data": [
    "필드: <code>hours[i].breakS</code> / <code>hours[i].breakE</code> ('HH:mm'|''). 인덱스 <code>i</code>는 요일 순서(월=0...일=6) 고정.",
    "검증: 한쪽만 입력 불가(시작·종료 동시 입력 필요), <code>breakE>breakS</code>, 브레이크는 해당 요일 운영 시간(open~close) 범위 안이어야 함.",
    "연동: 손님 주문 화면의 브레이크 안내(대시보드 '오늘' 카드에도 '브레이크 HH:mm~HH:mm' 노출, index 2159행)에 사용."
   ],
   "exception": [
    "시작·종료 중 한쪽만 입력 시 인라인 오류 '휴게 시작과 종료를 모두 선택해 주세요'.",
    "종료가 시작보다 빠르면 '휴게 종료는 시작보다 늦어야 해요'.",
    "<b>브레이크 중 손님 주문 처리 정책</b>: 브레이크 시간대에는 손님 주문 화면에서 주문 버튼을 비활성화하고 '지금은 휴게 시간이에요. 잠시 후 다시 주문할 수 있어요'를 안내(설계 기준; 직원 호출은 별도 정책).",
    "<code>staff</code>는 입력 비활성 + 툴팁 '사장님 권한이 필요해요'."
   ]
  },
  "6": {
   "purpose": [
    "<b>공휴일·휴무 일정 패널</b>(제목 '공휴일 · 휴무 일정', 부제에 건수 'N건'). 특정 날짜 또는 사유 기반 휴무를 등록해 해당일 손님 주문을 차단한다.",
    "정기 운영시간과 별개로 임시·기념일 휴무를 관리하기 위한 영역."
   ],
   "behavior": [
    "<b>[+ 휴무일 추가]</b>(<code>openHolidayModal()</code>): 모달(제목 '휴무일 추가', 부제 '날짜를 지정하거나, 기념일·사유를 직접 입력할 수 있어요')에 두 탭 — '📅 날짜 지정' / '✏️ 수기 입력'(<code>switchHdTab</code>).",
    "날짜 지정 탭: 날짜(필수, 기본 오늘) + 사유(선택, placeholder '예: 성탄절, 어린이날'). 추가 시 'YYYY-MM-DD (사유)' 또는 'YYYY-MM-DD' 형태로 <code>holidays</code>에 push.",
    "수기 입력 탭: 기념일·사유(필수, placeholder '예: 추석 연휴, 개업 기념일, 대표자 개인 일정'). 보조문구 '날짜 없이 사유만 기록할 때 사용해요. 목록에 📌로 표시돼요.'",
    "모달 하단 [취소]/[추가](<code>addHolidayFromModal()</code>). 추가 성공 시 success 토스트 '📅 휴무일을 추가했어요'. 목록 각 항목은 날짜형이면 📅, 수기형이면 📌 아이콘 + <b>[삭제]</b>(splice 후 재렌더)."
   ],
   "data": [
    "필드: <code>holidays: string[]</code>. 날짜형 'YYYY-MM-DD (사유)' / 'YYYY-MM-DD', 수기형 자유 텍스트. 정규식 <code>/^\\d{4}-/</code>로 날짜형 판별해 아이콘 분기.",
    "기본값: ['2026-01-01 (신정)','2026-05-05 (어린이날)']. 패널 제목 건수는 <code>holidays.length</code>로 바인딩.",
    "연동: 등록된 날짜형 휴무일에는 손님 주문 화면에서 주문을 차단. 정렬은 날짜 오름차순 권장(SPEC §2.6)."
   ],
   "exception": [
    "빈 상태(0건): '[+ 휴무일 추가]로 첫 휴무일을 등록할 수 있어요.'(가능형, 부정 표현 회피, 08-common §3.2).",
    "날짜 미선택 추가 시 '날짜를 선택해 주세요.', 수기 사유 미입력 시 '기념일·사유를 입력해 주세요.' 안내 후 추가 중단.",
    "<b>경계값</b>: 과거 날짜는 의미가 없으므로 오늘 이전 날짜 입력 시 '지난 날짜는 휴무로 등록할 수 없어요. 오늘 이후로 선택해 주세요' 안내(과거 날짜 입력 제한). 동일 날짜 중복 등록 시 'ℹ️ 이미 등록된 휴무일이에요'.",
    "<code>staff</code>는 추가·삭제 버튼 비활성 + 툴팁 '사장님 권한이 필요해요'."
   ]
  }
 },
 "orders": {
  "1": {
   "purpose": [
    "화면 최상단 운영 바. <b>실시간 주문 유입 알림</b>, <b>매출 집계 기준 전환</b>, <b>현재 조회 결과의 엑셀 내보내기</b>, <b>카드번호 표시 정책 안내</b>를 한 곳에 모아 운영자가 화면을 떠나지 않고 핵심 운영을 제어하게 한다.",
    "왜 있는가: 주문 내역은 영업 중 가장 자주 보는 화면이므로, 신규 주문을 놓치지 않게 하고(실시간) 사장님이 보는 수치의 '집계 기준'을 명확히 고정하기 위함."
   ],
   "behavior": [
    "<b>🟢 실시간 배지</b>(<code>주문 내역</code> 제목 옆): 항상 표시되는 상태 표식. 신규 주문 도착 시 PC 에이전트 팝업+사운드, 모바일 앱 푸시로 알린다(SPEC §1.8). 배지 자체는 클릭 동작 없음.",
    "<b>집계 기준 세그먼트 토글</b> <code>🕛 자정 기준 ↔ 🕒 영업시간 기준</code>: 클릭 시 <code>state.useBusinessHours</code> false↔true 전환 후 즉시 <code>renderApp()</code>. <b>기본값=자정 기준(false)</b>. <b>매장이 영업시간 기준으로 바꾸면 그 선택을 매장별로 저장(라스트 메모리)</b>해 다음 진입·이후에도 같은 기준으로 보여준다. '영업시간 기준' 선택 시 라벨에 <code>(open~close)</code> 시각을 함께 노출하고, 본문 상단에 안내 배너(<code>bhActiveNotice()</code>)를 띄운다.",
    "<b>⚙️ 영업시간 설정 버튼</b>: <code>openBusinessHoursModal()</code> 호출 — 사장님이 영업 시작/마감 시각을 직접 변경(자정 넘김 매장 지원).",
    "<b>📤 내보내기 버튼</b>(<code>.btn-primary</code>): <code>openExport(rows.length, '주문 내역', 기간라벨)</code> 호출. <b>현재 필터/정렬이 적용된 조회 결과 전체(rows.length 건)</b>를 xlsx로 내보낸다(표시 개수 페이징과 무관).",
    "<b>ⓘ 카드번호 표시 정책</b>(목록 헤더): 클릭 시 마스킹 정책 alert 노출."
   ],
   "data": [
    "데이터 소스: <code>ORDERS</code> 주문 트랜잭션 실시간 조회. 신규 주문은 <code>OrderStatus.pending→accepted</code> (PG 승인 콜백, <code>Payment.status='paid'</code>) 시점에 목록 진입(STATES §1.1).",
    "집계 기준 플래그: <code>useBusinessHours:boolean</code>, <code>businessHoursOpen/Close:'HH:MM'</code>. <b>영업일 경계는 03:00 시작·다음 날 02:59 종료</b>이며 자정 이후 거래도 영업 시작일 매출로 묶인다(SPEC §1.1).",
    "내보내기 파라미터: 건수, 화면명, 기간 라벨(today/yesterday/week/month/3m/custom 분기). 출력 범위 = 서버 측 필터 쿼리 결과 전체.",
    "실시간 갱신: 신규 주문 도착 시 전체 새로고침 없이 데이터만 재조회(SPEC §2.5). 알림 채널은 PC 에이전트/앱 푸시(SPEC §1.8)."
   ],
   "exception": [
    "권한: 조리 시작/완료·픽업·예약 수락/거절 등 상태 변경은 <code>staff</code>도 가능하나, <b>환불(결제 취소) 및 주문 거절은 owner 전용</b>(SPEC §1.6, STATES §1.4). staff 계정의 <code>orders</code> 권한은 <b>당일만 조회</b> 가능.",
    "영업시간 기준 ON + 자정 넘김 매장: 강조 안내 배너 노출 — <b>\"영업시간 기준 (open ~ close)으로 보고 있어요\"</b> / \"영업 시작 시각부터 다음 날 마감 시각까지를 하나의 영업분으로 묶어서 보여드려요. 자정 이후 거래도 영업 시작일의 매출로 포함됩니다.\"",
    "영업시간 기준 ON + 자정 안 넘김 매장: 가벼운 한 줄 안내 — <b>\"🕒 영업시간 기준 (open ~ close)으로 보고 있어요.\"</b>",
    "내보낼 데이터가 0건이면 내보내기 버튼은 노출하되 빈 결과 안내로 막는다(능동 톤)."
   ]
  },
  "2": {
   "purpose": [
    "현재 조회 범위(집계 기준+검색 필터 반영)의 주문 현황을 <b>총 주문 · 진행중 · 완료 · 취소 · 매출 합계</b> 5개 카드로 요약한다.",
    "상태별 카드는 단순 요약이 아니라 <b>상태 필터 진입점</b>으로도 동작해, 한 번에 해당 상태 목록으로 좁혀 볼 수 있게 한다."
   ],
   "behavior": [
    "5개 카드 그리드(<code>repeat(5,1fr)</code>): ①총 주문 ②진행중 ③완료 ④취소 ⑤매출 합계.",
    "<b>총 주문/진행중/완료/취소 카드 클릭</b> → <code>setOrderStatus('all'|'진행중'|'완료'|'cancel-all')</code>. 이미 선택된 카드를 다시 누르면 <code>'all'</code>로 토글 해제. 선택 카드는 색 테두리+box-shadow로 강조(진행중=amber, 완료=blue, 취소=red).",
    "<b>매출 합계 카드</b>: <b>완료 기준</b>으로만 합산(<code>status==='완료'</code>인 주문의 <code>amt</code> 합), 클릭 진입점 없음. 하단에 \"완료 기준\" 라벨 고정.",
    "<b>진행중 카드</b>: 건수>0이면 \"처리 대기\" 보조 라벨을 amber로 노출.",
    "KPI는 <b>상태 필터 적용 전 기준</b>으로 산출(카드가 진입점 역할을 하므로 항상 전체 상태 수치를 보여줌). 단 기간·채널·결제수단·메뉴·금액·번호 검색은 반영된 수치."
   ],
   "data": [
    "집계 식: <code>inProgressCnt=count(status='진행중')</code>, <code>completedCnt=count(status='완료')</code>, <code>cancelAllCnt=count(status='취소')</code>, <code>totalCnt=rows.length</code>.",
    "<code>totalAmt = Σ(o.amt where status='완료')</code> = <b>완료 결제금액 합계(결제 기준)</b> — 매출 화면의 실매출(actual=gross−할인−포인트−환불)과는 다른 개념이라 라벨은 '완료 결제 합계' 권장. 취소/환불 건 제외, 환불은 원거래일 매출에서 차감(SPEC §1.5).",
    "표시 단위: 건수는 '건', 매출은 '원'. 천단위 콤마(<code>fmt()</code>).",
    "필드: <code>status:'진행중'|'완료'|'취소'</code>(표시값), <code>amt:number</code> 결제금액."
   ],
   "exception": [
    "해당 기간 주문 0건이면 모든 카드 0 표시, 목록은 빈 상태 안내로 전환.",
    "취소 0건이면 취소 카드 숫자를 회색(<code>--ink-3</code>)으로 톤다운, >0이면 red 강조.",
    "선택된 상태 필터는 카드 강조와 '더 자세히 찾기' 패널 요약 라벨에 동시 반영(\"전체 상태/진행중/완료/취소·환불\")."
   ]
  },
  "3": {
   "purpose": [
    "기간·상태·메뉴·채널·결제수단·금액 범위·주문번호/승인번호/결제번호를 한 패널에서 조합해 정밀 검색한다.",
    "여러 조건을 <b>초안(draft)으로 모아 두고 [검색] 버튼으로 한 번에 적용</b>하는 방식이라, 조건마다 화면이 튀지 않고 의도한 조합으로만 조회된다."
   ],
   "behavior": [
    "<b>펼침/접힘 토글</b>(<code>toggleOrderAdvanced()</code>): 펼칠 때 현재 라이브 필터를 <code>orderFilterDraft</code>로 복사. 헤더에 적용 중 조건 개수 배지(\"N개 조건 적용 중\")와 현재 요약(\"기간 · 상태 …\") 노출. 토글 라벨 펼치기/접기.",
    "<b>기간 칩</b>: 오늘(5/15)/어제/이번 주/이번 달/최근 3개월/📅 기간 직접 선택. <b>기본 기간=오늘</b>. 직접 선택은 <code>openDateRangePicker('orders')</code>로 시작·종료일 지정.",
    "<b>상태 칩</b>: 전체/진행중/완료/취소·환불 전체. <b>메뉴 입력</b>: 요약 라벨(<code>o.menu</code>)과 상세 <code>items.name</code>까지 부분 일치. <b>채널 칩</b>: 전체/먹고가기/포장하기/(포장 예약은 기능 활성 시만 노출). <b>결제수단 칩</b>: 전체/카드/카카오페이/네이버페이/토스페이/현금. <b>금액 범위</b>: 최소~최대 입력. <b>주문/승인번호</b>: 주문번호·승인번호·결제번호(tid) 통합 입력.",
    "하단 버튼: <b>[조건 비우기]</b>(<code>clearOrderFilterDraft()</code> — draft만 기본값 초기화) / <b>[🔍 검색]</b>(<code>applyOrderFilters()</code> — draft를 라이브 state로 일괄 복사 후 갱신).",
    "조건 적용 시 목록·KPI·결과 건수 즉시 갱신, 페이지는 1로."
   ],
   "data": [
    "검색은 부분 일치·대소문자 무시(SPEC §2.6). 번호 검색은 <code>id + tid + makeApproval(o)</code> 결합 문자열 대상.",
    "필드: <code>orderDateFilter</code>(today/yesterday/week/month/3m/custom/all), <code>orderStatusFilter</code>(all/진행중/완료/cancel-all), <code>orderChannelFilter</code>(all/매장/포장/포장 예약), <code>orderPayFilter</code>(<code>payMain(o)</code> 1depth 매칭), <code>orderMenuSearch:string</code>, <code>orderAmountMin/Max:number</code>, <code>orderSearch:string</code>.",
    "조회 정책: <b>한 번에 최대 3개월(90일)</b>, <b>데이터 1년 보관 후 자동 삭제</b>. custom 종료일 max는 시작일 기준 90일로 동적 제한, 시작일 <code>&lt; 2025-05-15</code> 차단.",
    "페이징: 페이지당 10/20/50/100 (<b>기본 20</b>), 이전/다음+번호 페이징(SPEC §2.6)."
   ],
   "exception": [
    "결과 0건: <b>\"조건에 맞는 주문이 없어요. 날짜 범위를 넓히거나 필터를 해제해 보세요.\"</b> (능동 톤).",
    "패널 안내 카드: <b>\"💡 여러 조건을 함께 골라 두고 아래 검색 버튼을 눌러야 적용돼요.\"</b> / 조회 정책 안내 \"🗓️ 한 번에 최대 3개월 조회 가능 · 데이터는 1년 보관 후 자동 삭제\".",
    "기간 90일 초과: <b>\"주문 내역은 한 번에 최대 3개월(90일)까지만 조회할 수 있어요. 기간을 줄여서 다시 선택해 주세요.\"</b>",
    "1년 이전: <b>\"1년 이전 데이터는 보관 정책에 따라 조회할 수 없어요. (보관 기간: 1년)\"</b>. 종료일<시작일: \"종료일을 시작일 이후로 선택해 주세요\". 미래일: \"오늘까지의 날짜에서 선택해 주세요\".",
    "staff 권한은 기간 칩이 '오늘'만 유효(당일 조회 한정, SPEC §1.6)."
   ]
  },
  "4": {
   "purpose": [
    "조회된 주문을 표로 보여주는 본문. 컬럼: <b>No. · 주문일시 · 주문번호 · 채널 · 메뉴 요약 · 결제 시점 · 결제수단 · 결제금액 · 상태 · 자세히</b>.",
    "행 전체 또는 우측 <b>\"자세히 ›\"</b> 클릭 → <code>openOrderDetail(o)</code>로 <b>주문 상세 모달(영수증 단위)</b> 오픈. 운영자가 한 주문의 전체 영수증·결제·환불 내역을 확인하고 취소/영수증 출력을 수행하는 진입점."
   ],
   "behavior": [
    "<b>헤더 클릭 정렬</b>: 주문일시/주문번호/채널/메뉴/결제수단/결제금액/상태 컬럼에 ▲▼ 토글(<code>setOrderSort</code>, <code>applySort</code>). 결제 시점/No./자세히 컬럼은 정렬 없음.",
    "<b>채널 셀</b>: 먹고가기(테이블 N)/포장하기/포장 예약 표시(<code>o.channel</code>). <b>결제 시점 셀</b>: 선불/후불 pill(<code>orderPayType(o)</code> — 포장·예약=선불, 매장 17~21시=후불 데모 규칙). <b>결제수단 셀</b>: <code>payLabel</code>+<code>paySub</code>, 미결제는 \"미결제\".",
    "<b>결제금액 셀</b>: 정상은 <code>amt</code> 굵게; 취소는 취소선. 쿠폰/할인 적용 시 칩 노출 — 🎟️ 소프트먼트/매장 쿠폰 −금액, 🔥 할인 −금액.",
    "<b>취소 행</b>: 연한 적색 배경(<code>#fff7f7</code>), 주문번호 취소선+red, \"↺ 취소일시 + 취소/결제 취소\" 보조 라인.",
    "<b>표시 개수 셀렉트</b>(10/20/50/100, 기본 20)는 화면 페이징에만 적용 — \"💡 화면에만 적용돼요 · 내보내기는 조회된 N건 전체\". 하단 페이지네이션 제공.",
    "<b>상세 모달 버튼</b>: [🖨️ 영수증 출력](항상) · 완료+1년 이내 주문은 [취소](red, 확인 안내) · 1년 초과는 <b>[🔒 취소 기간 만료]</b> 비활성."
   ],
   "data": [
    "<b>상세 모달 내용</b>: 주문번호(<code>id</code>) · 승인번호(<code>makeApproval</code>) · 결제번호 tid(<code>maskTid</code>) · 채널(<code>channel(ch)</code>) · 주문일시(취소 건은 취소 처리 일시 함께).",
    "🧾 주문 메뉴 상세: 항목별 <code>name × qty</code> · 옵션 칩(<code>options[]</code>) · 금액(<code>price*qty</code>), 합계 수량.",
    "금액 블록: 소계(<code>originalAmt</code>) · 쿠폰 할인(<code>couponAmt</code>, <code>couponIssuer</code> = <b>softment=정산 보전 / store=매장 발행·정산 제외</b>) · 할인(<code>discountAmt</code>) · 최종 결제금액(<code>amt</code>). 취소 건은 결제금액 취소선 + 실매출 0원.",
    "결제수단(<code>payLabelFull</code> = 1depth+2depth) · 카드번호(<code>maskCard</code> 마스킹) · 외화(<code>currency</code>, 있을 때).",
    "연동: 메뉴명·옵션·스냅샷 가격은 메뉴판 관리와 연결(주문 시점 <code>unit_price_snapshot</code> 유지). 취소·환불은 매출·정산 화면의 원거래일 차감과 연동(SPEC §1.5)."
   ],
   "exception": [
    "빈 목록: <code>colspan</code> 빈 행에 \"조건에 맞는 주문이 없어요. 날짜 범위를 넓히거나 필터를 해제해 보세요.\".",
    "<b>결제일로부터 1년 초과</b> 거래: 카드번호 전체 마스킹(<code>****-****-****-****</code>) + \"🔒 1년 초과 마스킹\", 결제번호 일부 마스킹. 모달 상단 안내 \"🔒 결제일로부터 1년 초과 거래 — 보안 정책에 따라 카드번호·결제번호 일부가 마스킹돼 표시돼요. 마스킹 해제는 운영팀 본인 인증을 통해서만 가능합니다.\" 목록 행엔 \"🔒 1년 초과\" 표식.",
    "카드번호 표시 정책 ⓘ alert: \"• 1년 이내: 앞 6자리(BIN)+끝 4자리만 • 1년 초과: 전체 마스킹 • 결제번호(tid)도 일부만 노출\".",
    "[취소] 클릭 안내: \"취소 확인 사항: 손님 카드로 환불 영업일 3~5일 소요\". 1년 초과는 취소 버튼 비활성(\"🔒 취소 기간 만료\").",
    "모바일: 가로 스크롤, 핵심 컬럼 sticky(SPEC §10.2)."
   ]
  },
  "5": {
   "purpose": [
    "각 행/모달의 상태값 의미와 <b>취소 유형(주문 취소 vs 결제 취소)</b> 구분 기준을 정의한다.",
    "운영자가 환불 발생 여부를 한눈에 판단하고, 잘못된 상태 전이를 막기 위함."
   ],
   "behavior": [
    "상태 흐름: 접수(<code>accepted</code>=결제 완료·신규) → 조리중(<code>cooking</code>) → 조리완료(<code>ready</code>) → 완료(<code>completed</code>) / 취소(<code>cancelled</code>) (STATES §1.1~1.2).",
    "전이 액션: <b>조리 시작</b>(accepted→cooking) · <b>조리 완료</b>(cooking→ready) · <b>픽업/서빙 완료</b>(ready→completed, 포장은 픽업+30분 경과 시 자동) — staff 가능(STATES §1.4).",
    "<b>포장 예약</b>: 결제 후 보류 상태(<code>status='accepted'</code> + <code>reservation_accepted_at IS NULL</code>)에서 <b>예약 수락 / 예약 거절</b>을 거침. 거절은 자동 환불(STATES §1.3).",
    "표시 pill: 완료=done(blue), 진행중=partial(amber), 취소=cancel/pending(red 계열). 취소 라벨은 유형에 따라 \"주문 취소\"/\"결제 취소\"."
   ],
   "data": [
    "<b>구분 기준 = 결제 완료 여부</b>(선불/후불 아님). 판정: <b><code>Payment.status='paid'</code>이면 결제 취소(환불 발생), 아니면 주문 취소</b>.",
    "<b>주문 취소</b> = 결제 미완료 주문의 취소 → 환불 대상 없음(예: 후불 매장 주문을 결제 전 취소).",
    "<b>결제 취소</b> = 결제 완료 주문의 취소·반품 → 카드 환불 발생(영업일 3~5일). <b>후불이라도 결제 완료 후 손님이 돌아와 환불하면 결제 취소</b>. (index.html의 선불=결제취소/후불=주문취소 라벨링은 단순화이며, 이 결제 완료 여부 기준이 우선.)",
    "취소·환불 건은 실매출 0원, 환불은 <code>refund</code> 테이블에 기록(<code>original_payment_id</code>, <code>refunded_at</code>)되고 <b>원거래(결제)일 매출에서 차감</b>(SPEC §1.5). 부분 환불 시 결제건수 1 유지·환불건수 +1.",
    "상태 전이는 <b>낙관적 락(<code>version</code> 컬럼)</b>, 충돌 시 최신 상태 재조회 후 재시도(SPEC §1.7)."
   ],
   "exception": [
    "<b>완료된 주문은 취소 불가 → 환불로 처리</b>(STATES §1.2 completed→cancelled 불가).",
    "<b>주문 거절(accepted→cancelled, 자동 환불) 및 결제 취소(환불)는 owner 전용, staff 불가</b>(SPEC §1.6, STATES §1.4). 조리/픽업/예약 수락·거절은 staff 가능.",
    "이미 정산 완료된 일자의 사후 환불은 다음 정산 회차에서 차감(SPEC §1.5, 정산 연동).",
    "낙관적 락 충돌 시 사용자에게 최신 상태 재조회를 안내하고 액션 재시도 유도(능동 톤)."
   ]
  }
 },
 "stock": {
  "1": {
   "purpose": [
    "<b>화면 최상단 모드 전환 탭</b>으로, 「오늘의 준비량」을 두 가지 운영 방식으로 나눠 진입시키는 영역이다.",
    "<b>오늘 판매 수량 관리</b>(탭 key <code>qty</code>): 한정 수량 메뉴/옵션의 준비량을 등록하고 주문 시 자동 차감되도록 관리한다.",
    "<b>오늘 품절 처리</b>(탭 key <code>soldout</code>): 재고와 무관하게 오늘만 잠시 안 팔 메뉴/옵션을 빠르게 막는다.",
    "사장님이 매일 영업 시작 전 들러 그날의 판매 가능 상태를 한 번에 점검하는 진입점 역할."
   ],
   "behavior": [
    "탭은 버튼 2개(<code>.stk-tab</code>). 클릭 시 <code>state.stockTab</code> 값을 <code>'qty'</code> 또는 <code>'soldout'</code>으로 설정하고 <code>renderApp()</code> 재렌더. <b>기본값 <code>state.stockTab='qty'</code></b>(코드 5610행).",
    "선택된 탭에 <code>.on</code> 클래스로 강조. 비선택 탭의 본문은 컨테이너 <code>display:none</code>으로 숨기고 선택 탭만 노출(SPA 내 전환, 페이지 이동 아님).",
    "각 탭 라벨 우측에 건수 배지(<code>.cnt</code>) 표시: 수량 관리 탭 = <b>메뉴 수량 관리 건수 + 옵션 수량 관리 건수</b>(<code>items.length + optStockItems.length</code>), 품절 처리 탭 = <b>메뉴 수동 품절 건수 + 옵션 수동 품절 건수</b>(<code>manualOutCnt + optManualOutCnt</code>).",
    "탭 아이콘 고정: 수량 관리 📦, 품절 처리 🚫.",
    "탭 전환 시 아래 분류 필터(핀 2)는 두 탭 공용이라 그대로 유지된다(필터 상태 초기화 안 함)."
   ],
   "data": [
    "<code>state.stockTab</code>: enum <code>'qty'|'soldout'</code>, 기본 <code>'qty'</code>. 클라이언트 UI 상태(서버 비저장).",
    "배지 집계 소스 — 수량 관리: <code>MENU_STOCK.items</code>(<code>enabled=true</code>만) + <code>OPT_STOCK.items</code>(<code>enabled=true</code>만). 품절 처리: <code>MENUS[].manualSoldOut</code> + <code>OPT_GROUPS[].items[].manualSoldOut</code>.",
    "권한: 수량/품절 변경은 운영성 행위 → owner/staff 모두 가능(SPEC §1.6 권한 매트릭스, 매장 설정·정산 같은 잠금 항목 아님).",
    "연동 화면: 결과는 손님 주문 화면의 <code>effectiveStatus</code>(spec/02-menu.md §1.4) 및 메뉴판 관리 화면 카드의 준비량 배지(📦 잔여/준비)와 직접 연결."
   ],
   "exception": [
    "<b>상단 영업일 박스</b>: 탭 위에 별도 카드로 \"오늘 영업일\" 라벨 + 날짜를 노출(목업 고정값 <code>2026-05-15(목)</code>). 실제 구현은 영업일 03:00 시작 기준 당일 영업일을 표시(SPEC §1.1).",
    "페이지 부제 안내문(능동·가능형): \"한정 수량은 <b>수량 관리</b>로 자동 차감하고, 잠시 안 팔 메뉴는 <b>오늘 품절 처리</b>로 빠르게 막을 수 있어요.\"",
    "건수 배지가 0이어도 배지는 숫자 0으로 노출(숨기지 않음) — 현황 파악용."
   ]
  },
  "2": {
   "purpose": [
    "<b>카테고리·분류 태그 필터 바</b>(<code>.menu-panel-filters</code>). 메뉴 수가 많을 때 특정 분류만 좁혀 빠르게 점검하기 위한 영역.",
    "수량 관리 탭과 품절 처리 탭 <b>양쪽에 공통</b>으로 적용된다(필터 1세트로 두 탭 동시 필터)."
   ],
   "behavior": [
    "<b>카테고리</b>: 칩(<code>.chip</code>) 형태. \"전체\" + 매장에 존재하는 카테고리 값들. 클릭 시 <code>state.stockCatFilter</code> 설정 후 재렌더. 단일 선택.",
    "<b>분류 태그</b>: 셀렉트 3개 — 대분류(<code>stockL2Filter</code>), 중분류(<code>stockL3Filter</code>), 소분류(<code>stockTag3Filter</code>). 각 <code>onchange</code>로 <code>state</code> 갱신 후 재렌더. 기본 옵션 \"대/중/소분류 전체\".",
    "<b>다중 필터 AND 결합</b>: 카테고리 + L2 + L3 + tag3 조건을 모두 만족하는 메뉴/옵션만 목록·요약 카드·건수에 반영(즉시 반영, 6606~6621행).",
    "하나라도 <code>'all'</code>이 아니면(<code>stockFilterActive=true</code>) 셀렉트에 <code>.active</code> 강조 + \"✕ 초기화\" 텍스트 버튼 노출. 클릭 시 4개 필터 모두 <code>'all'</code> 리셋.",
    "필터 적용 중에는 요약 카드에 \"· 필터 적용 중\" 표기 및 \"<code>N개 / 전체 M개</code>\" 병기.",
    "기본값: 4개 필터 모두 <code>'all'</code>(코드 5583~5586행)."
   ],
   "data": [
    "<code>state.stockCatFilter</code>, <code>state.stockL2Filter</code>, <code>state.stockL3Filter</code>, <code>state.stockTag3Filter</code> — 각 string, 기본 <code>'all'</code>.",
    "필터 선택지 소스: 전체 <code>MENUS</code> 기준 <code>cat</code> / <code>catL2</code> / <code>catL3</code> / <code>tag3</code>의 distinct 값(공백 제거). <code>ensureMenuExtras(m)</code>로 분류 태그 필드 보강.",
    "필터 대상 매칭: 수량 관리 목록은 <code>it.menuId</code>로 <code>MENUS</code> 조회 후 분류 비교, 품절 목록은 <code>otherMenus</code> 직접 비교.",
    "정렬/검색/페이징 공통 규칙(SPEC §2.6)을 따른다 — 본 화면은 분류 필터 중심이며 별도 페이징은 카드 스크롤로 처리."
   ],
   "exception": [
    "매장에 카테고리·분류 태그가 하나도 없으면 필터 바 자체를 렌더하지 않음(<code>stockAllCats.length===0 && !hasStockTags</code>).",
    "필터 결과 0건 빈 상태(수량/품절 목록 공통): \"필터 조건에 맞는 메뉴가 없어요\" + 보조 \"다른 분류를 선택하거나 필터를 초기화해 보세요.\"(능동·가능형).",
    "분류 태그가 없으면 \"분류 태그\" 행 자체를 생략(있는 단계의 셀렉트만 노출)."
   ]
  },
  "3": {
   "purpose": [
    "<b>수량 관리 목록</b>(탭 <code>qty</code> 본문). 한정 수량 메뉴별로 <b>준비량(prepared)</b>과 <b>남은 수량(remaining)</b>을 관리하는 카드 목록.",
    "주문이 들어올 때마다 자동으로 1씩 차감되고, 0이 되면 손님 화면에 자동 품절로 표시되게 하는 핵심 영역.",
    "동일 패널 하단에 <b>옵션 수량 관리</b>(<code>OPT_STOCK</code>) 목록을 같은 카드 UI로 함께 제공(샷·시럽 등 한정 옵션)."
   ],
   "behavior": [
    "상단 요약 카드 3개: \"수량 관리 메뉴 N개\", \"곧 품절 N개\", \"오늘 판매 완료 N개\". 곧 품절>0이면 노랑, 판매 완료>0이면 빨강 배경 강조.",
    "메뉴 카드별 수량 조정: <code>−10 / − / 입력칸 / + / +10</code> 버튼. <code>changeStock(menuId, delta)</code>는 <code>prepared</code>를 <code>max(0, prepared+delta)</code>로, <code>remaining</code>을 <code>min(prepared, max(0, remaining+delta))</code>로 갱신. 숫자 입력 <code>onchange</code>는 <code>setStock(menuId, qty)</code>로 절대값 세팅(음수 입력 시 0으로 보정).",
    "상태 뱃지/카드 클래스: <code>remaining===0</code> → <code>.out</code> \"🔴 오늘 판매 완료\"; <code>0&lt;remaining≤lowAlert</code> → <code>.low</code> \"⚠️ 곧 품절 (N개 남음)\"; 그 외 → <code>.ok</code> \"✓ 판매 중\". 진행바 너비 = <code>round(remaining/prepared*100)%</code>.",
    "헤더 액션 버튼: \"📥 전체 메뉴 불러오기 (N개)\"(<code>loadAllMenus()</code> — 미등록 메뉴를 준비량 0으로 일괄 추가), \"+ 메뉴 추가\"(<code>openAddStockModal()</code> — 모달에서 메뉴 선택, <code>addStockForMenu</code>는 준비량 50 기본 추가), \"✕ 전체 삭제\"(<code>deleteAllStock()</code>).",
    "카드별 \"✕\" 버튼 = <code>removeStock(menuId)</code>로 해당 메뉴 수량 관리 해제(확인창). 옵션 목록은 <code>changeOptStock/setOptStockQty/removeOptStock</code>로 동일 동작.",
    "기본값: \"+ 메뉴 추가\" 시 <code>prepared=50, remaining=50, unit='개', lowAlert=5, soldOutAlert=true</code>; \"전체 불러오기\" 시 <code>prepared=0, remaining=0</code>."
   ],
   "data": [
    "<code>MENU_STOCK.items[]</code> 필드: <code>menuId</code>(FK→MENUS.id), <code>enabled</code>(bool, true만 노출), <code>prepared</code>(int≥0 준비량), <code>remaining</code>(int≥0 남은 수량), <code>unit</code>(string 단위, 기본 '개'), <code>lowAlert</code>(int 곧 품절 임계값, 기본 5), <code>soldOutAlert</code>(bool 품절 알림), <code>yesterdayPrep</code>/<code>yesterdaySold</code>(전일 실적).",
    "주문 차감은 <b>비관적 락</b> <code>SELECT ... FOR UPDATE</code>로 동시성 보장(SPEC §1.7 / spec 재고 §4.1). <code>remaining&lt;quantity</code>면 주문 거절.",
    "환불 시 복구: <code>remaining = LEAST(prepared, remaining+환불수량)</code>, 복구 후 <code>remaining&gt;0</code>이면 자동 품절 해제(재고 §4.2). 환불은 원거래일 영업일 매출에서 차감(SPEC §1.5).",
    "<b>영업일 리셋</b>(03:00 배치, 재고 §4.4): <code>yesterday_prep=prepared</code>, <code>yesterday_sold=prepared−remaining+당일환불복구</code>, <code>remaining=prepared</code>로 리셋하되 <b><code>prepared</code> 자체는 유지</b>(사장님이 매일 직접 갱신).",
    "임계 이벤트: <code>remaining=0 && soldOutAlert=true</code> → 품절 알림 트리거, <code>remaining≤lowAlert</code> → 곧 품절 경고(재고 §4.3).",
    "연동: 손님 화면 자동 품절(spec/02-menu.md §1.4 <code>stock!=null && sold≥stock</code>) 및 메뉴판 카드 \"📦 잔여/준비\" 배지(클릭 시 본 화면 이동)."
   ],
   "exception": [
    "전체 빈 상태(등록 0건): \"아직 수량 관리하는 메뉴가 없어요\" + \"한정 수량으로 파는 메뉴(예: 떡볶이 100인분, 도시락 30개)를 등록하면 주문이 들어올 때마다 자동 차감되고, 다 팔리면 손님 화면에 품절 표시돼요.\"",
    "옵션 빈 상태: \"수량 관리 옵션이 아직 없어요\" + \"디카페인 원두, 한정 시럽 같이 옵션 단위 한정 수량을 운영할 수 있어요.\"(가능형).",
    "해제 확인창: \"'{메뉴명}'의 수량 관리를 해제할까요? 다시 등록하기 전까지는 잔여 수량이 표시되지 않아요.\" / 전체 삭제: \"등록된 메뉴 N개의 수량 관리를 모두 해제할까요?…\" / 전체 불러오기: \"…준비량은 0으로 시작하니, 추가 후 메뉴마다 직접 수량을 입력해 주세요.\"",
    "경계값: <code>prepared</code> 변경 시 <code>remaining</code>은 항상 <code>min(prepared, ...)</code>로 클램프 → 준비량을 줄이면 잔여도 따라 줄어듦. 음수·빈 입력은 0 처리.",
    "토스트(성공): 추가 \"…수량 관리에 추가했어요\", 해제 \"…수량 관리를 해제했어요\" 등 능동·긍정 문구(spec/08-common.md)."
   ]
  },
  "4": {
   "purpose": [
    "<b>오늘 품절 처리 탭</b>(<code>soldout</code>) 본문. 재고 수량 관리와 무관하게 <b>오늘만 잠시 안 팔 메뉴/옵션</b>을 빠르게 품절로 막는 영역.",
    "대상은 \"수량 관리에 등록되지 않은\" 메뉴 중 판매 가능 상태인 것(<code>otherMenus</code>) — 수량 관리와 역할을 분리해 중복을 피한다."
   ],
   "behavior": [
    "요약 카드 2개: \"오늘 품절 처리 N개\"(품절 중 건수, >0이면 빨강), \"품절 처리 가능한 메뉴 N개\".",
    "메뉴 카드(<code>.qso-card</code>)별 토글 버튼: 판매 중이면 \"품절\" 버튼 → <code>setSoldOut(id,'out')</code>로 <code>manualSoldOut=true</code> 설정. 품절 중이면 \"↺ 판매 재개\" 버튼 → <code>setSoldOut(id,'on')</code>로 <code>manualSoldOut=false</code>.",
    "품절 처리 시 손님 화면에서 즉시 \"품절\"(회색·선택 불가)로 노출(spec/02-menu.md §1.4 우선순위 1: <code>manualSoldOut</code>).",
    "헤더 \"↺ 품절 모두 해제\" 버튼 = <code>clearAllManualSoldOut()</code>(확인창 후 일괄 해제). 옵션 영역은 \"↺ 옵션 품절 모두 해제\"(<code>clearAllOptSoldOut()</code>).",
    "동일 구조의 <b>옵션 품절 처리</b> 패널 제공: <code>setOptSoldOut(gid,idx,'out'|'on')</code>로 <code>OPT_GROUPS.items[].manualSoldOut</code> 토글.",
    "상태 표기: 판매 중 \"✓ 판매 중 · {카테고리}\", 품절 \"🔴 품절 · {카테고리}\". 품절 카드는 <code>.out-full</code> 강조."
   ],
   "data": [
    "<code>MENUS[].manualSoldOut</code>(bool, 기본 false), <code>MENUS[].soldOutKind</code>(enum <code>temp|full</code>, 기본 <code>temp</code> — <code>temp</code>=일시 품절(재판매), <code>full</code>=오늘 완전 품절). 옵션은 <code>OPT_GROUPS.items[].manualSoldOut/soldOutKind</code>(<code>ensureMenuExtras/ensureOptExtras</code>가 기본값 채움).",
    "대상 산출: <code>otherMenus = MENUS.filter(수량관리 미등록 && status!=='숨김')</code>. 옵션 대상은 <code>OPT_STOCK</code>에 없는 옵션 항목.",
    "<b>영업일 리셋</b>(03:00, 재고 §4.4 / spec/02-menu §5.3): 새 영업일 시작 시 <code>manualSoldOut</code> 자동 해제(품절 처리는 오늘 하루만 유효). <code>full</code>도 다음 영업일엔 자동 판매 재개.",
    "권한: owner/staff 모두 토글 가능(SPEC §1.6).",
    "[중요] 품절은 결제와 무관한 <b>판매 가능 상태</b> 플래그일 뿐 — 환불·취소(결제 완료 여부=Payment.status=paid 기준)와는 별개 도메인."
   ],
   "exception": [
    "<b>숨김 메뉴 제외 안내</b>(고정 노출): \"ℹ️ 메뉴판 관리에서 <b>숨김 처리한 메뉴</b>는 여기에 표시되지 않아요. <b>판매 가능한 상태의 메뉴</b>만 품절 설정을 할 수 있어요.\"",
    "전체 빈 상태: \"지금은 품절 처리할 메뉴가 없어요\" + \"모든 메뉴를 수량 관리로 등록했거나, 아직 등록된 메뉴가 없어요. 수량 관리 없이 잠깐만 막아둘 메뉴가 생기면 여기에 표시돼요.\"",
    "옵션 빈 상태: \"품절 처리할 옵션이 없어요\" + \"옵션 그룹을 먼저 등록해 주세요.\"",
    "모두 해제 확인창: \"품절 처리된 메뉴 N개를 모두 판매 중으로 되돌릴까요?\"; 대상 0건이면 \"오늘 품절 처리된 메뉴가 없어요.\" 안내.",
    "토스트: 품절 \"'{메뉴명}'을(를) 품절로 바꿨어요\", 재개 \"'{메뉴명}'을(를) 판매 중으로 되돌렸어요\"(능동·긍정).",
    "접근성: 상태를 색만으로 전달하지 않고 아이콘·텍스트(🔴 품절 / ✓ 판매 중) 병기(spec/08-common.md §7.1)."
   ]
  },
  "5": {
   "purpose": [
    "<b>화면 하단 동작 안내문</b>(💡 박스). 수량 관리의 자동 차감·자동 품절 동작과 오늘 품절 처리의 차이를 비개발 사장님이 이해하도록 쉬운 말로 설명하는 영역.",
    "두 탭의 사용 시점을 헷갈리지 않게 가이드하는 보조 설명(입력·동작 없는 정적 텍스트)."
   ],
   "behavior": [
    "정적 안내 박스로 상호작용 없음(버튼·토글 없음). 탭과 무관하게 항상 노출."
   ],
   "data": [
    "정적 카피. 동적 바인딩·연동 없음."
   ],
   "exception": [
    "노출 문구(능동·친근 톤, 공포 표현 금지 — SPEC 08 §3.2): \"<b>수량 관리</b>는 주문이 들어올 때마다 자동으로 1씩 차감되고, 0이 되면 손님 화면에 품절로 바뀌어요. <b>오늘 품절 처리</b>는 수량 관리 없이 잠깐 막아둘 때 쓰세요 — 오늘 더 팔지 않을 메뉴를 품절로 표시하고, 영업 종료 후 자동으로 초기화돼요. <b>메뉴뿐 아니라 옵션</b>(샷 추가, 시럽 등)도 똑같이 수량 관리·품절 처리할 수 있어요.\"",
    "가능형 보조 문구(\"~할 수 있어요\") 유지, 부정형(\"없어요\"식 경고) 회피."
   ]
  }
 },
 "membership": {
  "1": {
   "purpose": [
    "<b>멤버십 화면 상단 헤더 + 등급 추가 진입점</b>. 매장의 등급 체계(누적 결제 금액 기반 자동 등급) 전체를 관리하는 화면의 시작 영역.",
    "크럼브 <code>마케팅 · CRM › 멤버십</code>, 제목 <code>멤버십</code>, 보조문구 <code>\"누적 결제 금액에 따라 자동으로 등급이 올라가요.\"</code> 노출.",
    "우상단 <code>+ 등급 추가</code> 버튼으로 새 등급 단계를 추가(등급 체계 확장)하는 진입점 제공."
   ],
   "behavior": [
    "<b>+ 등급 추가 버튼 클릭</b>: 등급 추가 모달을 연다(목업은 <code>alert('멤버십 등급 추가 (와이어프레임)')</code> 플레이스홀더 — 정식 구현은 모달). 입력: 등급명(필수), 승급 기준 누적 결제액(원, 정수), 혜택 텍스트. 색상은 팔레트에서 자동/선택.",
    "저장 시 <code>MEMBERSHIP.tiers</code> 배열에 추가하고 <code>threshold</code> 오름차순으로 자동 재정렬 후 화면 재렌더. 신규 등급 <code>members</code> 초기값 0.",
    "등급 추가/수정/삭제는 <b>매월 1일 자동 산정(핀 4)</b>에 반영되며, 등급 순서는 항상 <code>threshold</code> 오름차순으로 유지(가장 낮은 단계 = 누적 0원 시작).",
    "<b>권한 기본값</b>: 마케팅·CRM 영역은 <b>owner 전용</b>. staff 로그인 시 좌측 메뉴에 멤버십 항목이 <b>회색+자물쇠</b>로 노출되고 클릭 시 403 모달(SPEC §1.6.2 \"메뉴는 모두 노출, 권한 없는 항목은 회색+자물쇠\" 원칙 통일). [확정 필요] §1.6.2 매트릭스에 마케팅·CRM 행 신설 요망."
   ],
   "data": [
    "엔터티 <code>MEMBERSHIP.tiers[]</code> = <code>{name:string, color:hex, threshold:int(원,≥0), benefit:string, members:int}</code>.",
    "추가 시 검증: 등급명 필수·공백불가·중복불가(핀 3 rename과 동일 규칙), <code>threshold</code>는 0 이상 정수, 동일 <code>threshold</code> 중복 금지.",
    "저장 API 성격: <code>POST /membership/tiers</code> (owner 토큰 필요). 변경은 즉시 손님 앱의 등급 표시·적립율 계산에 연동.",
    "<code>members</code> 집계는 회원 누적 결제액 배치(핀 4)가 채우는 읽기 전용 파생값 — 추가 시점에는 0."
   ],
   "exception": [
    "staff가 URL <code>/membership</code> 직접 접근 시 접근 차단 후 안내: <code>\"이 화면은 사장님 계정에서만 볼 수 있어요.\"</code> (SPEC §1.6).",
    "등급명 빈값 저장 시도: <code>\"등급 이름을 입력해 주세요.\"</code> / 중복 시: <code>\"이미 사용 중인 등급 이름이에요.\"</code>",
    "<code>threshold</code> 음수·비정수 입력 시: <code>\"승급 기준 금액은 0원 이상 숫자로 입력해 주세요.\"</code>",
    "저장 통신 실패 시 토스트 <code>\"등급을 저장하지 못했어요. 잠시 후 다시 시도해 주세요.\"</code> (spec/08-common 토스트·에러)."
   ]
  },
  "2": {
   "purpose": [
    "<b>회원 · 등급 분포 KPI 카드 줄</b>. 전체 회원 수와 등급별(SILVER/GOLD/PLATINUM 등) 회원 수를 한눈에 보여주는 요약 지표.",
    "4열 그리드: 첫 카드 <code>전체 회원</code> + 등급 수만큼 등급별 카드. 사장님이 회원 규모와 등급 쏠림을 빠르게 파악하도록 함."
   ],
   "behavior": [
    "<b>전체 회원 카드</b>: 값 = <code>m.tiers.reduce((s,t)=>s+t.members,0)</code>, 단위 <code>명</code> 표기.",
    "<b>등급별 카드</b>: 각 등급 <code>members</code> 수치 표시. 카드 라벨은 등급 색상(<code>t.color</code>)·굵게, 테두리는 등급 색상 40% 투명도(<code>${t.color}40</code>).",
    "등급 수에 따라 카드 개수 가변(등급 추가/삭제 시 카드도 증감). 등급 순서는 핀1·핀3과 동일하게 <code>threshold</code> 오름차순.",
    "카드는 <b>집계 표시 전용</b> — 클릭 동작 없음(필터 등 인터랙션 없음). 등급 정의 편집은 핀3 표에서 수행."
   ],
   "data": [
    "표시값 모두 <code>MEMBERSHIP.tiers[].members</code> 파생. 전체 = 등급별 합. API 성격: <code>GET /membership/summary</code>.",
    "<code>members</code>는 회원별 \"이번 산정 주기 등급\" 배치 결과의 등급별 count. 영업일/월 경계는 영업일 03:00 기준(SPEC §1.1)으로 산정한 \"매월 1일\" 스냅샷.",
    "등급 색상 <code>color</code>는 hex 문자열, 카드 테두리·라벨 색에 직접 바인딩."
   ],
   "exception": [
    "회원 0명인 신규 매장: 전체 회원 <code>0명</code>, 등급별 모두 <code>0명</code> 표시(부정문구 대신 자연스러운 0 노출).",
    "등급은 있으나 해당 등급 회원 0명: 해당 카드 <code>0명</code> 정상 표시(빈 상태 별도 처리 불필요).",
    "집계 로딩 중: 카드 숫자 자리에 스켈레톤/로딩 표시(spec/08-common 로딩).",
    "집계 조회 실패: 카드 영역 에러 표시 후 재시도 안내 토스트."
   ]
  },
  "3": {
   "purpose": [
    "<b>등급별 혜택 표</b>. 각 등급의 승급 기준·혜택·회원수·비율을 한 표로 보여주고, 등급명을 편집하는 영역.",
    "패널 제목 <code>등급별 혜택</code> + 부제 <code>${m.tiers.length}단계</code>로 현재 등급 단계 수 표시."
   ],
   "behavior": [
    "<b>표 컬럼</b>: 등급 / 승급 기준 / 혜택 / 회원수 / 비율 / (편집 버튼). 등급 셀은 <code>👑 이름</code> 알약(pill)·등급색 배경.",
    "<b>승급 기준 셀</b>: <code>누적 {fmt(threshold)}원 이상</code> 형식(천단위 콤마). 가장 낮은 단계는 <code>누적 0원 이상</code>(0원부터 시작).",
    "<b>비율 셀</b>: <code>Math.round(members/totalMembers*100)</code>%. 전체 0명이면 0%.",
    "<b>✏️ 이름 버튼 클릭</b>: <code>renameMembershipTier(idx)</code> 호출 — prompt로 새 이름 입력받아 trim 후, 빈값/동일/중복 검증 통과 시 <code>tier.name</code> 갱신 후 재렌더. (정식 구현은 prompt가 아닌 인라인 편집 모달로 승급기준·혜택까지 편집 권장.)",
    "행 표시 순서는 <code>threshold</code> 오름차순 고정."
   ],
   "data": [
    "행 바인딩: <code>tier{name, threshold, benefit, members, color}</code>. 비율 = <code>members/Σmembers</code> 반올림.",
    "<code>fmt()</code>로 금액 천단위 콤마 포맷. <code>threshold</code> 단위는 원(정수).",
    "이름 변경 검증(코드 실측): trim 후 빈값 금지, 기존 이름과 동일하면 무변경, 다른 등급명과 중복 금지.",
    "등급 정의는 손님 앱의 적립율·혜택 노출과 연동. 저장 API 성격 <code>PATCH /membership/tiers/{id}</code> (owner)."
   ],
   "exception": [
    "이름 빈값 입력: <code>\"등급 이름은 비워 둘 수 없어요.\"</code> (코드 실측 문구).",
    "중복 이름 입력: <code>\"'{입력값}'은(는) 이미 사용 중인 등급 이름이에요.\"</code> (코드 실측 문구).",
    "prompt 취소(null) 시 변경 없이 종료.",
    "전체 회원 0명일 때 비율 컬럼 모두 <code>0%</code> 표시(0 나눗셈 가드 <code>totalMembers?…:0</code>).",
    "등급이 1단계만 남도록 삭제 시도 시(정식 구현): <code>\"등급은 최소 한 단계가 필요해요.\"</code> 로 삭제 차단 권장."
   ]
  },
  "4": {
   "purpose": [
    "<b>자동 산정 안내 배너</b>. 등급이 어떤 기준·주기로 자동 산정되는지 사장님에게 설명하는 정보 영역.",
    "수동 등급 부여가 아니라 누적 결제 금액 기반 자동 산정임을 명확히 안내."
   ],
   "behavior": [
    "배너 문구(코드 실측): <code>\"💡 등급은 매월 1일 누적 결제 금액 기준으로 자동 산정돼요. 일정 기간 거래가 없으면 한 단계 떨어질 수 있어요.\"</code>",
    "<b>산정 주기</b>: 매월 1일(영업일 03:00 기준, SPEC §1.1) 배치로 전 회원 누적 결제액을 재평가해 등급 재배치.",
    "<b>승급</b>: 누적 결제액이 상위 등급 <code>threshold</code> 이상이면 해당 등급으로 상향. <b>강등</b>: 정책상 일정 기간 무거래 시 한 단계 하향.",
    "안내 전용 — 클릭/토글 없음. 정책 수치(산정일, 무거래 강등 기간)는 정식 구현에서 설정 가능 항목으로 분리 권장."
   ],
   "data": [
    "산정 입력값: 회원별 <b>누적 결제 완료 금액</b>. 정의는 <code>Payment.status=paid</code> 합계 기준이며, <b>환불은 원거래일 매출에서 차감</b>(SPEC §1.5)하므로 누적액에서도 차감 반영.",
    "누적액 산정 시 결제 취소/환불(<code>refunds.original_paid_at</code> 영업일 기준 차감)을 반영 — 주문 취소(미결제)는 애초 누적에 포함되지 않음(제품노트: paid 여부로 구분).",
    "부가세 등 금액 계산은 공통식 따름(과세분 부가세 <code>round(taxable/11)</code>, SPEC §1.3) — 누적은 결제 총액 기준.",
    "배치 결과가 <code>tiers[].members</code>(핀2·핀3) 및 손님 등급/적립율에 연동. API 성격: 정기 배치 <code>recalcMembershipTiers()</code>."
   ],
   "exception": [
    "누적 0원 회원: 가장 낮은 등급(누적 0원 이상)에 자동 편입.",
    "산정 경계값(<code>threshold</code>와 정확히 동일 금액): \"이상\" 기준이므로 해당 상위 등급으로 편입.",
    "무거래 강등 기간 미설정 시: 강등 비활성(승급만 동작)으로 안전 기본값 처리 권장.",
    "환불로 누적액이 하위 기준 미만이 된 경우: 다음 산정일에 하향 반영(즉시 강등 아님) — 안내문구로 \"매월 1일 기준\" 명시."
   ]
  }
 },
 "stamp": {
  "1": {
   "purpose": [
    "화면 최상단 <b>크럼브 + 타이틀 영역</b>이자 화면 전체의 <b>저장 컨트롤러</b>. 크럼브 \"<code>마케팅 · CRM › 스탬프·포인트</code>\", 타이틀 \"<b>스탬프·포인트</b>\", 서브카피 \"손님이 모은 스탬프와 받은 리워드를 관리해요.\"를 노출한다.",
    "이 화면은 <code>GLOBAL_SAVE_SECTIONS</code>에 포함(index.html:4610)되어 본문 하단에 <b>전역 저장 바</b>가 자동으로 붙는다. 핀2 적립 규칙의 변경을 모아 한 번에 저장하는 단일 저장 지점이다.",
    "마케팅·CRM 그룹 화면으로 쿠폰·멤버십·리뷰와 함께 사장님 전용 CRM 진입점 역할을 한다."
   ],
   "behavior": [
    "<b>화면 진입 시</b> 현재 적립 규칙(<code>rule</code>)을 <code>saved snapshot</code>으로 저장한다(SPEC §2.8). 입력값이 snapshot과 달라지면 <code>dirty=true</code>가 되고 하단 저장 바가 활성화된다.",
    "<b>[저장] 버튼</b>: dirty일 때만 활성(§08-common 5.4). 클릭 시 버튼 텍스트 \"처리 중...\" + 인라인 스피너, 성공 시 success 토스트 \"<b>변경 사항을 저장했어요</b>\" 노출 후 snapshot 갱신·dirty 해제. 실패 시 error 토스트 + 입력값 유지.",
    "<b>[되돌리기/취소] 버튼</b>: dirty 상태에서 노출. 클릭 시 입력값을 snapshot으로 롤백하고 dirty 해제.",
    "<b>저장 바 기본 상태</b>: dirty=false면 저장 바 숨김 또는 비활성. 다른 섹션으로 이동 시 dirty면 확인 prompt \"<b>변경 사항을 버리고 이동할까요?</b>\" 노출(§2.8). ESC·배경 클릭에도 동일 가드 적용(§08-common 6.2).",
    "크럼브 각 단계는 클릭 시 해당 상위 화면으로 이동(§08-common 8.3)."
   ],
   "data": [
    "바인딩 소스: <code>STAMPS.rule</code> (index.html:9736). 저장 단위는 매장 1개 단위가 아닌 <b>전 매장 공통</b>(핀2 참조).",
    "신규 데이터 모델 제안: <code>STAMP_RULE</code> 테이블 — <code>brand_id</code>(전 매장 공통이므로 매장이 아닌 브랜드/사장 단위 FK), <code>stamps_per_order int</code>, <code>reward_at int</code>, <code>reward_type text</code>, <code>updated_at timestamptz</code>, <code>updated_by</code>(owner user id).",
    "저장 API 성격: <code>PUT /stamp/rule</code> (멱등, 전체 규칙 객체 교체). 200ms 이하 응답은 로딩 표시 생략(§08-common 2.2).",
    "<code>dirty</code> 플래그는 클라이언트 상태(<code>state</code>)로만 관리, 서버 미전송."
   ],
   "exception": [
    "<b>권한</b>: 마케팅·CRM 영역은 <b>owner 전용</b>이며 staff는 좌측 메뉴에 회색+자물쇠로 노출되고 클릭 시 403 모달(SPEC §1.6.2 회색+자물쇠 원칙). [확정 필요] §1.6.2에 마케팅·CRM 행 신설 요망. 직접 URL 진입 시 권한 부족(403) 모달 \"<b>사장님 권한이 필요해요. 가맹점주 본인 계정으로 로그인해 주세요</b>\"(§08-common 4.1).",
    "<b>세션 만료(401)</b>: 로그인 화면 리다이렉트 + \"<b>다시 로그인이 필요해요</b>\".",
    "<b>저장 실패(5xx)</b>: error 토스트 + \"다시 시도\" 버튼, 폼 값 유지. 5회 연속 실패 시 본사 자동 알림(§08-common 4.1).",
    "<b>네트워크 오프라인</b>: 상단 노란 배너 \"<b>네트워크 연결을 확인해 주세요</b>\", 자동 재시도 3회."
   ]
  },
  "2": {
   "purpose": [
    "좌측 패널 \"<b>적립 규칙</b> <span>전 매장 공통</span>\". 손님이 주문할 때 스탬프가 얼마나 적립되고 몇 개를 모으면 어떤 리워드를 받는지를 사장님이 설정하는 영역이다.",
    "하단 안내 배너로 현재 규칙을 자연어로 요약해 사장님이 설정 결과를 즉시 확인할 수 있게 한다.",
    "여기서 정한 규칙이 핀3·핀4의 진행률(<code>stamps/rewardAt</code>) 계산과 리워드 발급 판정의 기준이 된다."
   ],
   "behavior": [
    "<b>주문 1건당 적립 스탬프</b> (<code>number</code> input, 기본값 <code>1</code>): 손님 결제 완료 주문 1건당 적립되는 스탬프 개수. 입력 변경 시 dirty.",
    "<b>리워드 지급 기준</b> (<code>number</code> input, 기본값 <code>10</code>): 누적 스탬프가 이 값에 도달하면 리워드 1회가 발급된다. 도달 시 스탬프가 차감(<code>stamps -= rewardAt</code>)되고 <code>rewards += 1</code>되는 순환 적립 방식.",
    "<b>지급 리워드</b> (<code>text</code> input, 기본값 \"<code>무료 음료 1잔</code>\", grid 전체 폭): 손님에게 지급되는 보상 설명 문구.",
    "<b>안내 배너</b>: 입력값에 실시간 연동되어 \"💡 현재 규칙: 주문 <b>N</b>건마다 스탬프 1개, <b>M</b>개 모이면 <b>{리워드}</b> 지급.\"으로 갱신.",
    "규칙 변경은 <b>저장 이후 발생하는 적립부터 적용</b>되며 기존 손님의 누적 스탬프(핀3)는 소급 변경하지 않는다(description.html 핀2 예외)."
   ],
   "data": [
    "필드: <code>stampsPerStamp</code>(=주문 1건당 스탬프, int ≥1), <code>rewardAt</code>(int ≥1), <code>rewardType</code>(string 1~30자).",
    "적립 트리거: 주문의 <code>Payment.status=paid</code>가 되는 시점에 스탬프 적립. <b>주문 취소 vs 결제 취소는 선불/후불이 아니라 결제 완료 여부로 구분</b> — 결제 완료(<code>paid</code>) 후 환불(결제 취소)이 발생하면 해당 주문으로 적립된 스탬프도 회수(<code>stamps -= stampsPerStamp</code>)해야 한다. 결제 전 단순 주문 취소는 애초에 적립되지 않았으므로 회수 없음.",
    "환불 차감은 원거래일 매출 기준(SPEC §1.5)과 동일 사상 — 스탬프 회수도 적립을 유발한 원주문에 귀속.",
    "검증: <code>stampsPerStamp</code>·<code>rewardAt</code>는 0 초과 정수(§08-common 5.3 가격 규칙 준용), <code>rewardType</code>은 빈 값 불가·1~30자. 연동 화면: 핀3 진행률·핀4 행 계산식의 분모로 사용."
   ],
   "exception": [
    "<b>입력 검증 실패</b>: 필드 테두리 빨강 + 필드 아래 빨간 메시지(§08-common 5.2). 예) <code>rewardAt</code>에 0 입력 시 \"<b>1 이상으로 입력해 주세요</b>\". 검증 실패 시 저장 버튼 비활성.",
    "<b>경계값</b>: <code>rewardAt</code>=1이면 매 적립마다 리워드 발급되는 정상 케이스(허용). <code>stampsPerStamp</code>가 <code>rewardAt</code>보다 큰 경우도 허용하되 안내 배너로 결과를 그대로 보여 준다.",
    "<b>리워드 문구 길이 초과</b>: 30자 초과 시 \"<b>30자 이내로 입력할 수 있어요</b>\".",
    "규칙 변경 시 기존 적립 소급 안내(필요 시 info 문구): \"<b>변경한 규칙은 저장 이후 적립부터 적용돼요</b>\"."
   ]
  },
  "3": {
   "purpose": [
    "우측 상단 \"<b>스탬프 현황</b>\" KPI 카드 2개와 하단 \"<b>회원별 스탬프</b>\" 표 헤더를 포함하는, 적립 현황 요약·목록 영역이다.",
    "사장님이 스탬프를 보유한 손님 규모와 누적 지급된 리워드 규모를 한눈에 보고, 손님별 적립 상세를 목록으로 탐색하게 한다."
   ],
   "behavior": [
    "<b>KPI 카드 — 스탬프 보유 회원</b>: <code>members.length</code> 명. <b>리워드 지급 누계</b>(파란 카드): <code>members.reduce((a,m)=>a+m.rewards,0)</code>로 전체 회원의 리워드 받은 횟수 합계.",
    "<b>표 헤더</b>: <code>손님 | 연락처 | 스탬프 | 리워드 받은 횟수(우측정렬) | (상세 버튼 열)</code>. 헤더 우측 \"<span>N명</span>\" 카운트 표시.",
    "<b>헤더 클릭 정렬</b>(description.html 핀3 + SPEC §2.6): 손님명·스탬프 수·리워드 횟수 컬럼 클릭 시 오름차순↔내림차순 토글, 활성 컬럼에 화살표 표시. 기본 정렬은 스탬프 수 내림차순 권장.",
    "<b>검색</b>: 손님명·연락처 부분 일치(대소문자 무시, §2.6). 목록 30건 초과 시 페이징/무한스크롤 적용(§2.6).",
    "각 행의 진행률·리워드 가능 배지는 핀4에서 렌더(핀2 규칙 기준)."
   ],
   "data": [
    "바인딩: <code>STAMPS.members[]</code> = <code>{id, name, phone, stamps, rewards}</code> (index.html:9738~9741).",
    "신규 데이터 모델 제안: <code>STAMP_MEMBER</code> — <code>id</code>, <code>brand_id</code>, <code>customer_id</code>(손님 식별, 연락처 해시 기반), <code>name</code>, <code>phone</code>, <code>stamps int default 0</code>, <code>rewards int default 0</code>, <code>updated_at</code>. 손님은 결제 시 입력/연동된 연락처로 식별·자동 생성된다.",
    "조회 API: <code>GET /stamp/members?sort=&q=&page=</code> (정렬·검색·페이징 쿼리). KPI는 동일 응답의 집계 필드 또는 별도 <code>GET /stamp/summary</code>.",
    "계산식: 보유 손님 수 = 행 수, 리워드 누계 = Σ<code>rewards</code>. 표는 단순 조회이므로 토스트 미사용(§08-common 1.3)."
   ],
   "exception": [
    "<b>빈 상태</b>(손님 0명): 표 영역에 빈 상태 카드 — \"<b>아직 스탬프를 모은 손님이 없어요</b>\" + 가능형 보조문구 \"<b>손님이 주문하면 자동으로 적립돼요</b>\"(§08-common 3.2, 부정 표현 회피). KPI 카드는 0명/0으로 정상 표시.",
    "<b>개인정보 마스킹</b>: 연락처는 모노스페이스로 노출되되 손님명은 \"홍**\"처럼 마스킹 표기(description.html 핀3 예외). 연락처도 정책에 따라 가운데 자리 마스킹 권장(예 010-****-5678).",
    "<b>검색 결과 0건</b>: \"<b>검색 결과가 없어요. 다른 이름이나 번호로 찾아 주세요</b>\".",
    "<b>모바일</b>: 표 가로 스크롤 + 힌트 \"<b>↔️ 좌우로 스크롤해서 모든 정보를 확인할 수 있어요</b>\"(§08-common 10.2)."
   ]
  },
  "4": {
   "purpose": [
    "\"회원별 스탬프\" 표의 <b>개별 회원 행</b>. 한 회원의 적립 진행 상태와 리워드 수령 이력을 시각적으로 보여 주고 상세 진입을 제공한다."
   ],
   "behavior": [
    "<b>셀 구성</b>: 손님명(<b>bold</b>) / 연락처(모노스페이스) / 스탬프 진행 셀(\"<b>{stamps}</b>/{rewardAt}개 · {pct}%\" + 진행 바) / 리워드 받은 횟수(\"<b>{rewards}</b>회\", 우측정렬) / [상세] 버튼.",
    "<b>진행률</b>: <code>pct = round(stamps/rewardAt*100)</code>, 진행 바 폭은 <code>min(100, pct)%</code>. <code>stamps >= rewardAt</code>이면 파란색 \"<b>🎉 리워드 가능</b>\" 배지 표시.",
    "<b>[상세] 버튼</b>(btn-ghost): 클릭 시 해당 손님의 스탬프 적립/리워드 내역 상세를 연다. 현재 목업은 <code>alert('{name} 스탬프 내역 (와이어프레임)')</code> 자리표시자이며, 정식 구현은 <b>적립·차감·리워드 발급 타임라인 모달</b>(form/info 모달, §08-common 6)로 구현한다.",
    "<b>행 클릭 시 상세</b>(description.html 핀4): 행 전체 클릭으로도 상세 모달 진입 가능(상세 버튼과 동일 동작)."
   ],
   "data": [
    "필드: <code>m.name</code>, <code>m.phone</code>, <code>m.stamps</code>(=<code>stampCount</code>), <code>m.rewards</code>(=<code>rewardCount</code>) (description.html 핀4 data).",
    "상세 모달 데이터: <code>STAMP_LEDGER</code> 제안 — <code>member_id</code>, <code>delta int</code>(+적립/−회수/−리워드차감), <code>reason enum</code>(<code>earn</code>/<code>refund_revoke</code>/<code>reward_issue</code>), <code>order_id</code>(연동), <code>occurred_at</code>. 적립/회수는 결제 완료·환불(결제 취소) 이벤트와 연동.",
    "상세 API: <code>GET /stamp/members/{id}/ledger</code>.",
    "리워드 발급은 <code>stamps>=rewardAt</code> 도달 시 자동(핀2 순환 차감)으로 <code>rewards</code> 증가."
   ],
   "exception": [
    "<b>경계값 — rewardAt 도달/초과</b>: <code>stamps>=rewardAt</code>일 때 \"🎉 리워드 가능\" 배지 노출, 진행 바는 100%로 클램프. 다회 적립으로 <code>pct>100</code>이어도 바는 100% 고정.",
    "<b>리워드 0회 손님</b>: \"<b>0</b>회\"로 정상 표시(부정 문구 미사용).",
    "<b>상세 내역 없음</b>: 모달 빈 상태 \"<b>아직 적립 내역이 없어요</b>\".",
    "<b>결제 취소(환불) 반영</b>: 환불로 스탬프 회수 시 진행률·배지가 즉시 갱신되며, 회수로 <code>stamps</code>가 음수가 되지 않도록 0으로 하한 처리(<code>max(0, stamps)</code>).",
    "<b>접근성</b>: 상세 버튼에 <code>aria-label</code> \"{손님명} 스탬프 내역 보기\", 진행률은 색만이 아니라 텍스트(N/M개·%) 병행(§08-common 7.1·7.3)."
   ]
  }
 },
 "detail": {
  "1": {
   "purpose": [
    "<b>매출 상세 보기 화면 전체의 진입 헤더·집계 기준 영역</b>. 페이지 제목(<b>매출 상세 보기</b>)·부제·집계 기준 토글·내보내기 버튼을 묶어 제공한다.",
    "이 화면이 다루는 데이터의 <b>시간 범위를 명확히 고지</b>한다: '어제까지 집계된 매출'. 오늘(영업일) 매출은 사전 집계 전이므로 여기서 다루지 않고 주문 내역으로 유도한다.",
    "모든 탭·표·차트가 공통으로 쓰는 <b>매출 집계 기준(자정 기준 / 영업시간 기준)</b>을 한 곳에서 전환하도록 한다.",
    "owner 전용 화면 진입점(매출 수치 노출) — staff는 진입 불가(SPEC §1.6.2 매트릭스: 매출 상세 보기 owner ✓ / staff ✗)."
   ],
   "behavior": [
    "<b>부제 문구</b>: \"<code>{탭명}</code> · 어제까지 집계된 매출이에요. 오늘 매출은 <b>주문 내역 ›</b> 에서 실시간으로 확인해 주세요.\" — '주문 내역 ›' 클릭 시 <code>setSection('orders')</code> 로 주문 내역 화면 이동.",
    "<b>집계 기준 토글(2-세그먼트)</b>: [🕛 자정 기준](기본, <code>state.useBusinessHours=false</code>) ↔ [🕒 영업시간 기준](<code>true</code>, ON이면 라벨에 <code>(open~close)</code> 표기). 전환 즉시 <code>renderApp()</code> 로 표·차트·KPI 전부 재집계.",
    "토글 ON(영업시간 기준)이면 본문 상단에 안내 배너 노출(<code>bhActiveNotice()</code>). 영업이 자정을 넘기는 매장이면 강조 배너로 '영업 시작 시각부터 다음 날 마감 시각까지를 하나의 영업분으로 묶어 보여준다'고 설명.",
    "토글 우측 <b>⚙️ 버튼</b>: 영업시간 설정 모달(<code>openBusinessHoursModal()</code>) 오픈.",
    "<b>📤 내보내기 버튼</b>: <code>openExport(15, \"매출 상세 · {탭명}\", \"2026년 5월 1일(금) ~ 5월 15일(금)\")</code> 호출 — 현재 탭·기간을 파일명·범위로 전달.",
    "기본 진입 탭은 <code>state.detailTab='period'</code>(날짜별)."
   ],
   "data": [
    "집계 기준 플래그: <code>state.useBusinessHours</code> (boolean, 기본 false=자정 기준). <b>매장이 영업시간 기준 선택 시 매장별로 영속 저장(라스트 메모리)</b>해 다음 진입에도 유지(예: <code>store_settings.sales_basis</code>). 영업시간 값 <code>businessHoursOpen</code>/<code>businessHoursClose</code>.",
    "데이터 출처(SPEC §2.2): <b>당일</b>은 결제 트랜잭션 raw를 시간 단위 <code>GROUP BY</code>(실시간), <b>과거</b>는 영업일 마감(다음 날 02:59:59 직후 배치) 시 사전 집계된 테이블 조회. 매출 상세는 어제까지(사전 집계 완료분)만 다룬다.",
    "영업일 정의(SPEC §1.1): 영업일 03:00 시작 ~ 다음 날 02:59 종료. '오늘/어제'는 영업일 기준.",
    "권한(SPEC §1.6.2): 화면 접근 <code>role=owner</code> 전용. staff 토큰으로는 라우트 진입 차단.",
    "내보내기 메타: 건수·라벨·기간 문자열을 export 모듈에 전달(xlsx 산출)."
   ],
   "exception": [
    "오늘 매출은 본 화면 집계 대상이 아님 — 부제에서 \"오늘 매출은 주문 내역 › 에서 실시간으로 확인해 주세요.\"로 능동 유도.",
    "staff 권한이 우회 접근 시: 403 처리 후 '이 화면은 사장님 권한으로 볼 수 있어요' 토스트 + 대시보드 리다이렉트(SPEC §1.6).",
    "영업시간 기준 전환 시 자정을 넘기는 매장은 묶임 기준이 헷갈릴 수 있으므로 배너로 \"영업 시작 시각(open)부터 다음 날 마감 시각(close)까지를 하나의 영업분으로 묶어서 보여드려요\" 강조 안내.",
    "데이터 로딩 중에는 표·차트 영역에 스켈레톤/로딩 표시(spec/08-common.md 로딩 규칙), 조회 실패 시 '잠시 후 다시 시도해 주세요' 에러 + 재시도 버튼."
   ]
  },
  "2": {
   "purpose": [
    "<b>분석 축을 전환하는 탭 바</b>. 같은 기간 매출을 여러 관점으로 쪼개어 본다.",
    "핀이 정의하는 <b>5종 축</b>: 날짜별 · 시간대별 · 메뉴별 · 메뉴 카테고리별 · 결제수단별. (현재 목업은 여기에 '주문 방식별'을 추가로 구현 — 그린필드 기준 5종을 핵심으로 정의하고 주문 방식별은 확장 탭으로 둔다.)",
    "사장님이 '언제(날짜/시간) · 무엇이(메뉴/카테고리) · 어떻게 결제됐는지(결제수단)' 다각도로 파악하도록 한다."
   ],
   "behavior": [
    "탭 클릭 시 <code>setDetailTab(key)</code> → <code>state.detailTab</code> 갱신 후 <code>renderApp()</code>. body(<code>#detail-body</code>)만 해당 렌더 함수로 교체.",
    "<b>탭 라벨</b>: 📅 날짜별(<code>period</code>) / ⏰ 시간대별(<code>hour</code>) / 🥐 메뉴별(<code>menu</code>) / 🗂️ 메뉴 카테고리별(<code>category</code>) / 💳 결제수단별(<code>method</code>). 확장: 🛵 주문 방식별(<code>channel</code>).",
    "<b>시간대별</b>: '오늘 vs 4주 동요일 평균' 막대/라인 차트 + 시간대별 표(건수·매출·4주 평균·증감%·객단가). 기간 콤보는 잠금(오늘 5/15 고정), 변경 안내는 [날짜별] 탭으로 유도.",
    "<b>메뉴별</b>: 판매량·매출·비중·평균단가·환불건수·환불액 표 + 카테고리 칩 필터(전체/커피/베이커리/음료/차·논커피) + <b>'↺ 환불 있는 메뉴만'</b> 필터(<code>detailMenuRefundOnly</code>) + 메뉴명 검색·매출 범위.",
    "<b>카테고리별</b>: 카테고리 표 + <b>비중 도넛</b> 차트. 행 클릭 시 메뉴별 탭으로 이동하며 해당 카테고리 자동 필터(<code>setDetailCategory</code>).",
    "<b>결제수단별</b>: 비중 도넛 + 결제수단 표(건수·금액·비중·평균 객단가·취소율). 그룹 필터(전체/카드/간편결제/기타). 해외카드는 USD·환율 표기."
   ],
   "data": [
    "탭 상태: <code>state.detailTab</code> ∈ {period, hour, menu, category, method, channel}, 기본 'period'.",
    "축별 집계 소스: 날짜별=<code>DAY[]</code>(일별 enrich), 시간대별=<code>HOUR</code>/<code>HOUR_AVG</code>(4주 동요일 평균), 메뉴별=<code>MENU[]</code>(qty/amt/refund/refundCnt), 카테고리=<code>CATEGORY[]</code>, 결제수단=<code>METHOD[]</code>.",
    "집계 기준 토글(pin1) 적용: 모든 축 데이터에 <code>applyBhFields()</code> 또는 <code>effectiveHourData()</code> 로 영업시간 기준 반영.",
    "탭별 정렬 상태 개별 보존: <code>detailMenuSort</code>·<code>detailCategorySort</code>·<code>detailMethodSort</code>·<code>detailHourSort</code>·<code>detailPeriodSort</code>.",
    "계산식 공통(SPEC §2.1): 비중=항목/합계, 객단가=actual/ocnt, 시간대 증감=<code>(amt-avg)/avg*100</code>."
   ],
   "exception": [
    "시간대별·메뉴별·카테고리별·결제수단별 탭은 <b>기간 콤보가 잠금(고정 기간)</b> 상태 — 기간을 바꾸려면 배너의 \"[날짜별] 탭에서 변경해 주세요\" 링크로 유도(능동형).",
    "메뉴별에서 '환불 있는 메뉴만' 필터 적용 후 결과가 0개면 빈 상태 — '조건에 맞는 메뉴를 다시 찾아볼 수 있어요'(부정형 회피) + ✕ 초기화 칩 제공.",
    "탭별 빈 데이터(매출 0): 표에 합계만 0으로 표기, 도넛/차트는 '표시할 매출이 아직 없어요' 빈 상태.",
    "도넛·라인 차트는 캔버스 렌더 실패 시에도 표 데이터는 항상 노출(차트는 보조)."
   ]
  },
  "3": {
   "purpose": [
    "<b>분석 기간을 선택하는 콤보</b>. 일간 / 주간 / 월간 / 기간 선택(custom) 4단위와 날짜 이동(◀▶)을 제공.",
    "선택 기간을 영업일 경계(03:00~다음 날 02:59) 기준의 실제 조회 구간으로 환산해 표시(startTime/endTime).",
    "날짜별 탭에서 사장님이 '한 날만' 또는 '여러 날 묶음'을 자유롭게 오가도록 한다."
   ],
   "behavior": [
    "<b>기간 단위</b>: [일간](<code>day</code>, 기본) / [주간](<code>week</code>) / [월간](<code>month</code>) / [기간 선택](<code>custom</code>). 클릭 시 <code>setDetailGroup(g)</code>.",
    "<b>일간 모드</b>: ◀▶ 화살표로 일자 이동(<code>setDetailDayPrev</code>/<code>setDetailDayNext</code>, <code>detailDayIdx</code> 0~13). 첫날(5/1) 도달 시 ◀ 비활성, 어제(5/14) 도달 시 ▶ 비활성. 안내 배너: \"<b>한 날만 보기</b> — ◀▶ 버튼으로 다른 날로 이동할 수 있어요. 여러 날을 한 번에 보려면 <b>기간 선택</b>을 눌러 주세요.\"",
    "<b>단일 일자일 때</b>(day 또는 custom 시작=종료): '하루 흐름 한눈에 보기' 패널(피크/한산 시간·시간당 평균·결제 건수 KPI + 시간대 막대 차트)로 표시.",
    "<b>주간 모드</b>: 5월 1주차(5/1~5/3)·2주차(5/4~5/10)·3주차(5/11~5/15) 묶음 행. <b>월간 모드</b>: 1~5월 월별 합계 행.",
    "<b>기간 선택(custom)</b>: 시작일·종료일 지정 → 그 사이 일별 데이터 표시, centerLabel에 'M월 D일(요일) ~ M월 D일(요일) · N일간'.",
    "중앙 라벨/구간 시각 동시 표기: 예 일간 시 <code>startTime '5/14(목) 03:00'</code> ~ <code>endTime '5/15(금) 02:59'</code>."
   ],
   "data": [
    "상태: <code>state.detailGroup</code> ∈ {day, week, month, custom} 기본 'day'; <code>detailDayIdx</code>(기본 13=5/14 어제); custom은 <code>customStart</code>/<code>customEnd</code>(<code>customTarget='detail'</code>).",
    "일별 소스 <code>DAY[]</code> + <code>enrichDay()</code>로 gross/disc/pt/ref/actual/taxable/vat/net/ocnt/rcnt 산출. 주/월은 days 합산 후 enrich.",
    "구간 환산: 영업일 03:00 시작 규칙(SPEC §1.1)으로 startTime=해당일 03:00, endTime=다음 영업일 02:59.",
    "이동 한계: 미래(오늘 이후) 이동 불가 — next 비활성. 데이터 보유 범위는 5/1~5/14(어제).",
    "기간 합계(tot)와 객단가(<code>tot.actual/tot.ocnt</code>)는 콤보 선택 범위 기준으로 KPI 카드·표 합계에 반영."
   ],
   "exception": [
    "오늘 이후 날짜로 이동 시도: ▶ 화살표 <b>비활성(disabled)</b> 처리하여 클릭 불가 — 미래 매출은 아직 집계 전.",
    "custom 종료일을 어제(5/14)보다 이후로 지정 시: 어제까지로 자동 보정 또는 '어제까지 조회할 수 있어요' 안내.",
    "custom 시작>종료 등 잘못된 범위: 폼 검증으로 '시작일은 종료일보다 앞이어야 해요' 인라인 에러(spec/08-common.md 폼검증).",
    "주간/월간 모드에서는 단일 일자 KPI 패널 대신 추이 라인 차트로 전환(데이터 1행일 때만 단일 일자 처리)."
   ]
  },
  "4": {
   "purpose": [
    "<b>기간별 상세 표</b> — 행(날짜·주·월·기간)마다 총매출·할인·포인트·환불·실매출·과세금액·부가세·결제건수·환불건수를 한 줄로 보여주는 핵심 데이터 그리드.",
    "행을 클릭하면 그 단위의 <b>결제 단위 상세 모달</b>('📋 OO 매출 상세 내역')로 드릴다운해 개별 결제(주문일시·승인번호·결제수단)를 확인한다.",
    "매출 계산식(총매출 − 할인 − 포인트 − 환불 = 실매출 → 과세금액 + 부가세)을 표 형태로 검증 가능하게 한다."
   ],
   "behavior": [
    "<b>표 컬럼</b>: No. / 날짜(주·월·기간) / 총매출 / − 할인 / − 포인트 / − 환불 / = 실매출 / 과세금액 / 부가세 / 결제건수 / 환불건수. 맨 아래 <b>합계 행</b> 고정.",
    "<b>헤더 클릭 정렬</b>: <code>setDetailPeriodSort</code> — 오름↔내림 토글, 활성 컬럼에 화살표(SPEC §2.6). 기본 <code>{key:'d', dir:'desc'}</code>(최신일 우선).",
    "<b>행 클릭</b>: \"<b>{라벨}</b> 자세히 ›\" → <code>openPeriodDetail(label, date)</code> 모달. title 툴팁 \"이 날(기간)의 결제 내역을 볼 수 있어요\".",
    "<b>모달 내용</b>: 상단 칩 [결제완료 N건] · [합계 X원](강조) · [취소 M건]. 표 컬럼=주문일시 / 주문번호 / 승인번호 / 메뉴 / 판매유형 / 결제수단 / 금액 / 상태(pill). 하단 버튼 [닫기] [📋 주문 내역 전체 보기].",
    "<b>내보내기(xlsx)</b>: pin1의 📤 버튼이 현재 표를 export. <b>표시 개수</b> 셀렉트(<code>detailRowsPerPage</code>, 10/20/50/100, 기본 목업 50→SPEC 기본 20) + 페이지네이션.",
    "<b>취소 행 표시</b>: 모달에서 취소건은 분홍 배경·주문번호 빨간 취소선·금액 취소선, '↺ M/D HH:MM 취소 처리' 표기 — 결제완료 집계·합계에서 제외."
   ],
   "data": [
    "행 필드(SPEC §2.1): <code>gross</code>, <code>disc</code>, <code>pt</code>, <code>ref</code>, <code>actual=gross−disc−pt−ref</code>, <code>taxable=actual</code>, <code>vat=round(taxable/11)</code>, <code>net=actual−vat</code>, <code>ocnt=count(payment status='paid')</code>, <code>rcnt=count(refund)</code>(부분환불 포함).",
    "모달 결제 행: <code>ORDERS[]</code>에서 해당 일자(<code>o.date</code>) 필터. 필드 date/time/id/<code>makeApproval(o)</code>(승인번호)/menu/channel(판매유형)/<code>payLabel(o)</code>/amt/status.",
    "<b>취소 구분(제품 규칙 우선)</b>: 환불·취소 구분은 선불/후불이 아니라 <b><code>Payment.status==='paid'</code> 여부</b>로 판정 — paid면 <b>결제 취소(환불 발생)</b>, 아니면 <b>주문 취소</b>. 후불이라도 결제 완료 후 환불하면 결제 취소.",
    "환불 차감(SPEC §1.5): 환불은 발생일이 아니라 <b>원거래(결제)일 매출</b>에서 차감(<code>refunds.original_paid_at</code> 영업일 기준). 정산 완료분 사후 환불은 다음 정산 회차에서 차감.",
    "연동: 행→<code>openPeriodDetail</code> 모달, 모달 [주문 내역 전체 보기]→<code>setSection('orders')</code>. 카테고리 행→메뉴별 탭 자동 필터.",
    "합계 행: 표시 중인 모든 행을 컬럼별 누계, 객단가=<code>tot.actual/tot.ocnt</code>."
   ],
   "exception": [
    "총매출 범위 필터(<code>detailPeriodMinAmt</code>/<code>MaxAmt</code>) 결과 0행: 빈 상태 '조건에 맞는 기간을 다시 찾아볼 수 있어요' + ✕ 초기화 칩.",
    "모달에서 해당 일자 결제 0건: 데모는 5/15 데이터를 일자만 바꿔 보조 표시(실서비스는 '이 날 결제 내역을 준비 중이에요' 빈 상태).",
    "취소건 안내 문구(모달 하단): \"<b>취소</b>는 결제 자체가 무효 처리돼서 <b>결제완료 집계와 매출 합계에서 빠져요</b>. 주문번호는 원주문 그대로 남고 빨간 취소선으로 표시돼요.\"",
    "카드번호 마스킹: \"※ 카드번호는 결제일 1년 이내에만 앞 6 + 끝 4가 보이고, 1년 초과 시 전체 마스킹돼요.\"",
    "표 본문 안내 배너: \"<b>실매출</b>은 총매출에서 <b>할인·포인트 사용·환불액</b>을 모두 뺀 금액이에요. 환불은 … <b>원래 결제한 날 매출에서 차감</b>되니, 어제 환불이 발생하면 어제 매출이 줄어드는 것처럼 표시돼요.\"",
    "모달 닫기: ESC·배경 클릭·✕ 모두 지원(SPEC §2.7)."
   ]
  }
 },
 "overview": {
  "1": {
   "purpose": [
    "<b>화면 상단 안내·집계 기준 영역</b>. 이 화면이 보여 주는 매출이 <b>어제(직전 영업일)까지 마감 집계된 값</b>임을 명시해 사장님의 기대치를 정렬한다.",
    "오늘 매출은 실시간 데이터인 <b>주문 내역</b>으로 자연스럽게 유도해, 두 화면의 역할(요약 vs 실시간)을 분리한다.",
    "<code>basisToggleInline()</code> 토글로 매출 집계의 시간 기준(자정 기준 / 영업시간 기준)을 전환하고, <code>⚙️</code> 버튼으로 영업시간 자체를 설정하는 진입점을 제공한다."
   ],
   "behavior": [
    "<b>집계 기준 토글(세그먼트 2개)</b>: 「🕛 자정 기준」(기본 ON, <code>state.useBusinessHours=false</code>) ↔ 「🕒 영업시간 기준」(<code>state.useBusinessHours=true</code>). 클릭 시 즉시 <code>renderApp()</code> 재렌더. ON이면 라벨에 현재 영업시간 <code>(09:00~22:00)</code>이 함께 표시된다.",
    "영업시간 기준 ON일 때 본문 위에 <code>bhActiveNotice()</code> 안내 박스가 노출된다. 영업이 자정을 넘기는 매장(<code>bhCrossesMidnight()</code>=true)이면 강한 안내(💡 큰 박스), 아니면 한 줄 안내(🕒)로 분기한다.",
    "<b>⚙️ 버튼</b>: <code>openBusinessHoursModal()</code> — 영업 시작·마감 시각 입력 모달을 연다. 저장 시 다음 재집계부터 비율(<code>bhRatio()</code>)이 반영된다.",
    "<b>📤 내보내기 버튼</b>: <code>openExport(행수, '매출 한눈에 보기', 기간라벨)</code> 모달. 형식은 엑셀(.xlsx, 기본) / CSV 선택, 「⬇ 다운로드」 시 토스트 노출.",
    "<b>기본값=자정 기준</b>. 매장이 [🕒 영업시간 기준]으로 바꾸면 그 선택을 <b>매장별로 저장(라스트 메모리)</b>해 다음 진입·이후에도 같은 기준으로 보여준다(store 단위 영속). 영업일 03:00 경계(SPEC §1.1)는 영업시간 기준일 때 적용."
   ],
   "data": [
    "과거(어제까지) 데이터는 영업일 마감 직후 배치로 적재된 <b>사전 집계 테이블</b>에서 조회 — SPEC §2.2. 오늘 데이터는 이 화면에 포함하지 않는다(주문 내역에서 실시간).",
    "<code>state.useBusinessHours</code>(boolean), <code>state.businessHoursOpen</code>/<code>businessHoursClose</code>(<code>HH:mm</code>). <code>bhRatio()</code>=영업시간 분(min)/1440 으로 0~1 사이 비율을 계산(자정 넘김 매장 보정 포함).",
    "영업시간 기준 ON 시 <code>applyBhFields()</code>·<code>enrichDay()</code>가 모든 금액·건수에 <code>bhRatio()</code>를 곱해 안분(시뮬레이션). 실서비스에서는 시간대 raw를 영업시간으로 필터링한 합계로 대체.",
    "연동 화면: 「주문 내역」(<code>setSection('orders')</code>), 「영업시간 설정 모달」, 「내보내기 모달」.",
    "내보내기 행수는 <code>days.length</code>(조회 영업일 수), 기간 라벨은 <code>centerLabel</code>을 전달."
   ],
   "exception": [
    "안내 문구(고정): <b>\"어제(5/14)까지 집계된 매출이에요. 오늘 매출은 주문 내역 › 에서 실시간으로 확인해 주세요.\"</b> — '어제' 날짜는 직전 영업일로 동적 치환.",
    "영업시간 기준 ON·자정 넘김 매장: <b>\"영업시간 기준 (HH:MM ~ HH:MM)으로 보고 있어요\"</b> + <b>\"영업이 자정을 넘기는 매장이라, 영업 시작 시각부터 다음 날 마감 시각까지를 하나의 영업분으로 묶어서 보여드려요. 자정 이후 거래도 영업 시작일의 매출로 포함됩니다.\"</b>",
    "영업시간 기준 ON·자정 안 넘김: <b>\"🕒 영업시간 기준 (HH:MM ~ HH:MM)으로 보고 있어요.\"</b>",
    "권한: 이 화면 전체는 <code>owner</code> 전용(SPEC §1.6.2). <code>staff</code> 계정은 좌측 메뉴에 회색+자물쇠로 노출되며 진입 시 403 모달 <b>\"사장님 권한이 필요해요. 가맹점주 본인 계정으로 로그인해 주세요\"</b>(spec/08-common §4.1).",
    "내보내기 모달 안내: <b>\"조회 조건 기준 전체 N건 · 화면 표시 개수와 무관\"</b>, 다운로드 토스트 <b>\"매출 한눈에 보기 N건을 엑셀 파일로 내려받았어요\"</b>."
   ]
  },
  "2": {
   "purpose": [
    "<b>기간 선택 영역</b>(<code>basisCombo()</code>). 매출을 <b>일 / 주 / 월 / 기간 선택</b> 단위로 전환하고, 중앙에 현재 조회 기간을 큰 글씨로 표시한다.",
    "하단 영업일 시간 범위(시작~종료)를 함께 보여 줘, 영업일 03:00 경계(SPEC §1.1)를 시각적으로 이해시킨다.",
    "날짜 화살표(◀▶)로 같은 단위 안에서 기간을 앞뒤로 이동할 수 있는 자리를 제공한다(미래 방향은 잠금)."
   ],
   "behavior": [
    "<b>기간 세그먼트 4개</b>: 「일」(<code>day</code>, 기본값) / 「주」(<code>week</code>) / 「월」(<code>month</code>) / 「기간 선택」(<code>custom</code>). 클릭 시 <code>setOverviewPeriod(key)</code> 호출.",
    "<code>day</code>=오늘 1일(예 5/15), <code>week</code>=최근 7일(5/9~5/15), <code>month</code>=이번 달 1일~오늘(5/1~5/15)로 <code>periodDays()</code>가 영업일 집합을 산출.",
    "「기간 선택」 클릭 시 <code>openDateRangePicker('overview')</code> 캘린더 모달 — 빠른 선택 칩(오늘/어제/지난 7·14·30일/이번 달·지난 달/이번 분기·지난 분기)과 시작·종료 날짜 입력 제공. 확정 시 <code>state.overviewPeriod='custom'</code>.",
    "<b>▶(다음) 화살표</b>는 <code>disableNext:true</code>로 항상 비활성 — 미래 기간은 집계가 없으므로 자리(placeholder)만 차지하고 보이지 않게 처리(<code>visibility:hidden</code>).",
    "기간 변경 시 <code>renderOverview</code> 전체가 재집계되어 KPI 흐름·보조지표·차트가 모두 갱신된다."
   ],
   "data": [
    "<code>state.overviewPeriod</code>: <code>'day' | 'week' | 'month' | 'custom'</code>. custom일 때 <code>state.customStart</code>/<code>customEnd</code>(<code>YYYY-MM-DD</code>)를 사용.",
    "모든 기간은 <b>영업일 경계</b> 기준으로 집계 — 영업일 시작 03:00, 종료 다음날 02:59(SPEC §1.1). 중앙 라벨 하단에 <code>rangeStart</code>~<code>rangeEnd</code>(예 <code>5/15(금) 03:00 ~ 5/16(토) 02:59</code>) 표시.",
    "매출 한눈에 보기 기간 선택은 매출 상세(<code>detail</code>)·주문 내역(<code>orders</code>)과 동일한 <code>openDateRangePicker</code> 컴포넌트를 공유(<code>state.customTarget</code>로 구분). 단 주문 내역은 최대 90일·보관 1년 제약, 매출 화면은 분기 빠른선택 추가.",
    "날짜 입력 <code>max</code>는 항상 오늘(<code>TODAY_DATE</code>)로 미래 선택 차단."
   ],
   "exception": [
    "미래 이동 차단: 「다음」 화살표는 흐리게 처리되어 노출되지 않음(누를 수 없음). 날짜 입력기에서도 <code>max=오늘</code>로 미래일 입력 불가.",
    "custom 기간 라벨은 일수를 계산해 <b>\"5월 9일(토) ~ 5월 15일(금) · 7일간\"</b> 형식으로 노출.",
    "빠른 선택 모달 안내: <b>\"시작일과 종료일을 정해주세요. 빠른 선택도 가능해요.\"</b>",
    "시작일 > 종료일 등 잘못된 범위 입력 시 종료일 <code>min</code> 제약으로 보정하고, 보정 불가 시 적용 버튼 비활성(spec/08-common §5.2 검증)."
   ]
  },
  "3": {
   "purpose": [
    "<b>매출 흐름 카드</b>(<code>kpi-flow</code>). <b>총매출 → −(할인·포인트·환불) → 실매출</b>의 3단계를 좌→우 화살표로 시각화해, 비개발자 사장님이 '들어온 돈에서 무엇이 빠져 실매출이 되는지'를 한눈에 이해하게 한다.",
    "매출 산정의 핵심 계산식(SPEC §2.1)을 화면 위에 직관적으로 노출하는 영역이다."
   ],
   "behavior": [
    "3개 단계 카드를 표시: ① 총매출 <code>gross</code> ② 차감 <code>−(disc+pt+ref)</code>(음수, 빨강 계열) ③ 실매출 <code>actual</code>. 사이에 「→」 화살표.",
    "차감 항목은 항상 <b>음수 표기</b>(예 <code>−12,300원</code>). 차감 0원이어도 <code>−0원</code>이 아닌 정상 0 처리.",
    "이 카드 자체는 클릭 액션이 없으며(요약 표시), 항목별 분해(쿠폰/포인트/환불 내역)는 「매출 상세 보기」에서 제공.",
    "기간 토글(핀 2)·집계 기준 토글(핀 1) 변경 시 값이 즉시 재계산된다."
   ],
   "data": [
    "계산식(SPEC §2.1): <code>gross=sum(payment.amount)</code>, <code>disc=sum(discount.amount)</code>, <code>pt=sum(point.amount)</code>, <code>ref=sum(refund.amount, 원거래일 기준)</code>, <code>actual=gross−disc−pt−ref</code>.",
    "부가세 <code>vat=round(taxable/11)</code>(일반과세), <code>taxable=actual</code>, <code>net=actual−vat</code>(순매출=공급가액). 이 화면 흐름 카드는 actual까지만 보여주고 vat·net은 매출 상세에서 노출.",
    "<b>주문 취소 vs 결제 취소</b>는 선불/후불이 아니라 <code>Payment.status</code>로 구분: <code>paid</code>이면 결제 취소(환불 <code>ref</code> 발생, 원거래일 매출 차감), 미결제면 주문 취소(매출에 애초에 미포함). 후불도 결제 완료 후 환불하면 결제 취소.",
    "환불은 <code>refunds.original_paid_at</code>의 영업일 매출에서 차감 — SPEC §1.5. 부분 환불도 1건의 환불 이벤트로 <code>rcnt</code> +1, 결제건수 <code>ocnt</code>는 유지.",
    "모든 통화는 KRW 정수, 천 단위 <code>,</code>, round half up(SPEC §1.3)."
   ],
   "exception": [
    "<b>간이과세 매장</b>(<code>business_type=simplified</code>)은 <code>vat=0</code>으로 표시(UI 숨김 아님) — SPEC §1.4. 흐름 카드 실매출 값 자체는 동일.",
    "사후 환불로 이미 마감·정산된 과거 영업일 실매출이 감소할 수 있음 — 정산은 다음 회차에서 차감(SPEC §1.5).",
    "해당 기간 결제가 전혀 없으면 각 단계 0원으로 표기하고, 부정형(\"매출이 없어요\") 대신 능동·긍정 톤으로 안내(빈 상태는 보조지표·차트 영역에서 처리).",
    "금액은 음수가 될 수 없는 단계(총매출·실매출)에서 환불 누적으로 실매출이 음수가 되는 경계의 경우, 그대로 음수로 표기하되 빨강으로 강조."
   ]
  },
  "4": {
   "purpose": [
    "<b>보조 지표 카드 4종</b>(<code>kpi-row</code>). 매출 외 핵심 운영 지표 — <b>주문 수 / 가장 바쁜 시간대 / 평균 객단가 / 가장 잘 팔린 메뉴</b>를 요약하고, 각 카드에서 해당 상세 화면으로 바로 이동시킨다.",
    "사장님이 '얼마나 팔렸나(금액)'뿐 아니라 '몇 건·언제·무엇이' 팔렸는지를 한 줄로 파악하게 한다."
   ],
   "behavior": [
    "<b>① 주문 수 카드</b>(클릭형): <code>fmt(ordCnt)</code>건 표시, 하단 \"주문 내역 보기 ›\". 클릭 시 <code>setSection('orders')</code>.",
    "<b>② 가장 바쁜 시간대 카드</b>(클릭형): <code>HOUR</code>에서 매출 최대 시각을 산출, '오전/낮/오후 N시' 라벨. 점심(11~13시)·저녁(17~20시) 구간이면 부제가 \"점심 피크 시간\"/\"저녁 피크 시간\", 그 외 \"오늘 가장 바쁜 시간\". 클릭 시 <code>setDetailTab('hour')</code>.",
    "<b>③ 평균 객단가 카드</b>(비클릭): <code>avgPrice=round(actual/ordCnt)</code>, 부제 \"1건당 결제 평균\".",
    "<b>④ 가장 잘 팔린 메뉴 카드</b>(클릭형): <code>MENU[0]</code>의 이름·수량·매출 표시(베이커리는 '개', 그 외 '잔'). 클릭 시 <code>setDetailTab('menu')</code>.",
    "기간·집계 기준 변경 시 네 카드 모두 재계산."
   ],
   "data": [
    "<code>ordCnt</code>=<code>count(payment WHERE status='paid')</code>(SPEC §2.1 <code>ocnt</code>), 영업시간 기준 ON 시 <code>bhRatio()</code> 안분.",
    "<code>avgPrice</code>=실매출÷주문수(SPEC §2.1 <code>avg</code>). <code>ordCnt=0</code>이면 0 처리(0 나눗셈 방지, 코드상 <code>ordCnt ? round(actual/ordCnt) : 0</code>).",
    "바쁜 시간대는 <code>HOUR[].amt</code> 최대값, 메뉴는 <code>MENU[0]</code>(수량·매출 기준 1위) 사용.",
    "연동: 주문 수→「주문 내역」, 바쁜 시간대→「매출 상세·시간대별 탭」, 잘 팔린 메뉴→「매출 상세·메뉴별 탭」."
   ],
   "exception": [
    "주문이 0건이면 객단가 0원으로 표기하고, 카드 부제는 능동·긍정 톤 유지. 빈 데이터 시 안내 문구 노출(spec/08-common §3 빈 상태 톤).",
    "클릭형 카드(① ② ④)에는 \"›\" 표식으로 이동 가능을 시각적으로 알리고, 평균 객단가(③)는 비클릭이라 표식 없음 — 일관성 유지.",
    "권한 부족(staff) 접근 시 화면 진입 단계에서 차단되므로 카드 단위 별도 처리는 불필요(핀 1 권한 규칙 적용).",
    "데이터 마감 전 과거일 조회 시에도 사전 집계 테이블 기준으로 일관된 값 노출(SPEC §2.2)."
   ]
  },
  "5": {
   "purpose": [
    "<b>차트·표 그리드 영역</b>(<code>grid-2-eq</code>, 4개 패널). 시간대별·결제수단별·메뉴별·판매유형별 매출 분포를 시각화해 매출의 '구성'을 보여 준다.",
    "각 패널은 요약만 제공하고, '상세 보기 ›' 링크로 「매출 상세 보기」의 해당 탭으로 심화 이동시킨다."
   ],
   "behavior": [
    "<b>⏰ 시간대별 매출</b>: <code>drawHourChart('ch-hour')</code> 막대/선 차트, '오늘 vs 4주 평균' 비교. \"시간대별 상세 보기 ›\" → <code>setDetailTab('hour')</code>.",
    "<b>💳 결제수단별 매출</b>: <code>ch-donut-pay</code> 도넛 + 범례(스와치·금액). 금액>0인 결제수단만 노출(<code>filter(m=>m.amt>0)</code>). \"결제수단별 상세 보기 ›\" → <code>setDetailTab('method')</code>.",
    "<b>🥐 메뉴별 매출 TOP 5</b>: 표 컬럼 <code>#</code>/메뉴/수량/매출/비중(%). 행 클릭 시 <code>setDetailTab('menu')</code>. 🔥(hot)·신규 배지 표시. 비중=<code>amt/합계*100</code> 소수 1자리.",
    "<b>🍽️ 판매유형별 매출</b>: <code>ch-donut-ch</code> 도넛 + <code>visCHANNEL()</code> 채널별 금액·비중·건수·평균. 부제는 포장 예약 채널 활성 여부(<code>ORDER_CHANNELS.reservation</code>)에 따라 '먹고가기 / 포장하기 / 포장 예약' 또는 '먹고가기 / 포장하기'.",
    "기간·집계 기준 변경 시 네 패널과 차트가 모두 파괴(<code>destroy</code>) 후 재생성된다."
   ],
   "data": [
    "시간대 매출: 당일은 결제 raw <code>GROUP BY</code> 시간(실시간), 과거는 사전 집계 테이블 — SPEC §2.2. 영업시간 기준 ON 시 <code>inBusinessHours(h)</code> 구간만 반영.",
    "결제수단·판매유형·메뉴 데이터는 <code>applyBhFields()</code>로 영업시간 비율 안분. 메뉴별은 <code>MENU[].qty/amt/refund/refundCnt</code> 사용.",
    "단위는 모두 '원'(<code>unit-tag</code>로 명시). 메뉴 수량 단위는 카테고리에 따라 '개'(베이커리)/'잔'.",
    "연동: 「매출 상세 보기」 4개 탭(<code>hour</code>/<code>method</code>/<code>menu</code>/<code>channel</code>). 판매유형 정의는 spec/04-order-type(채널)과 정합.",
    "메뉴 비중 합계가 100%가 아닐 수 있음(TOP 5만 표시) — '전체 대비 비중'임을 상세 화면에서 보강."
   ],
   "exception": [
    "차트는 캔버스 렌더라 정적 스냅샷·차트 라이브러리 로드 실패 시 빈 칸으로 보일 수 있음 — 실제 화면엔 그래프 표시. 로드 실패 시 \"잠시 후 다시 시도해 주세요\" 폴백(spec/08-common §4).",
    "데이터 0건 패널은 부정형 대신 능동·긍정 빈 상태 문구로 안내하고 '상세 보기' 링크는 유지(가능형 톤).",
    "결제수단·판매유형 도넛은 금액 0 항목을 범례에서 제외해 시각적 노이즈를 줄임.",
    "메뉴 표가 5개 미만이면 있는 만큼만 표시하고 빈 행을 만들지 않음. 매출 합계 0이면 비중 계산 시 분모 보정(<code>sumA||1</code>)으로 NaN 방지."
   ]
  }
 },
 "order-type": {
  "1": {
   "purpose": [
    "화면 최상단 <b>툴바</b>로, 화면 제목 \"주문 방식\"과 부제 \"매장 운영 방식에 맞춰 주문 채널·결제 방식·손님 안내 방식을 한곳에서 관리해요.\"를 노출하고, 이 화면의 모든 설정 변경을 한 번에 <b>저장</b>·<b>초기화</b>하는 통합 액션 영역이에요.",
    "이 화면의 설정(<code>OrderChannelConfig</code>·<code>PaymentSchedule</code>)은 저장 즉시 손님 주문 화면·QR 관리·매출 집계에 영향을 주므로, 변경을 명시적 저장으로만 확정하는 안전장치 역할을 해요."
   ],
   "behavior": [
    "<b>[저장]</b> 클릭(<code>saveOrderType()</code>): 검증 통과 시 현재 <code>ORDER_CHANNELS</code> 전체를 <code>ORDER_SAVED</code> 스냅샷으로 확정하고 success 토스트 \"주문 방식 설정을 저장했어요\" 노출. 변경(dirty)이 있을 때만 버튼이 강조 상태(<code>btn-save-cta pulse</code>)가 되고, 변경이 없으면 일반(<code>btn-ghost</code>) 상태예요.",
    "<b>[↺ 초기화]</b> 클릭(<code>resetOrderType()</code>): dirty가 아니면 \"변경된 내용이 없어요.\" 안내 후 종료. dirty면 확인 후 마지막 저장 스냅샷(<code>ORDER_SAVED</code>)으로 모든 필드(중첩 <code>schedule</code> 포함)를 깊은 복사로 되돌려요.",
    "<b>dirty 추적</b>: 진입 시 <code>ORDER_SAVED = JSON.stringify(ORDER_CHANNELS)</code> 스냅샷을 잡고, 현재 상태와 다르면 dirty=true(<code>ot_isDirty()</code>) — SPEC §2.8.",
    "다른 섹션으로 이동 시 <code>ot_isDirty()</code>가 true면 미저장 가드가 작동해 확인 prompt를 띄워요 — SPEC §2.8(\"변경 사항을 버리고 이동할까요?\"). order-type은 전용 저장 UI를 쓰므로 공통 자동저장 배너 대상에서는 제외되고 이 dirty 가드에만 포함돼요.",
    "저장 기본 흐름: 저장 전에는 손님 화면이 절대 바뀌지 않고, 저장(=API PUT) 성공 후에만 실제 반영돼요."
   ],
   "data": [
    "대상 엔터티: <code>OrderChannelConfig</code>(매장별 1개, PK <code>store_id</code>) 전체 + <code>PaymentSchedule</code> 목록 — DATA_MODEL §5.1/§5.2.",
    "저장 API 성격: <code>PUT /stores/{storeId}/order-channel-config</code> (config + schedule 슬롯 일괄 upsert), 성공 시 <code>updated_at</code> 갱신.",
    "dirty 비교 키: 진입 스냅샷(<code>ORDER_SAVED</code>) vs 현재(<code>ORDER_CHANNELS</code>) 전체 JSON 동등 비교.",
    "민감 액션 감사 로그 대상은 아니지만(가격·정산·권한·환불만 — DATA_MODEL §감사), 변경 주체·시각(<code>updated_at</code>)은 기록해요."
   ],
   "exception": [
    "<b>권한</b>: 변경·저장은 <code>owner</code>만 가능. <code>staff</code>는 이 화면을 열람만 하고 [저장]·[초기화]·모든 입력이 비활성 — SPEC §1.6(주문 방식은 매장 마스터 설정).",
    "저장 검증 실패 시 저장을 중단하고 alert로 사유를 안내(호출 방식 미선택, 시간대 시작≥종료 등 — 핀4 참조).",
    "저장 성공 토스트: \"✅ 주문 방식 설정을 저장했어요\" (능동·긍정 톤).",
    "초기화 시 변경 없음 alert \"변경된 내용이 없어요.\", 확인 prompt \"변경 사항을 모두 취소하고 마지막 저장 상태로 되돌릴까요?\".",
    "staff 접근 시 보조 안내: \"주문 방식은 사장님만 변경할 수 있어요.\" (열람은 허용)."
   ]
  },
  "2": {
   "purpose": [
    "현재 시각 기준으로 매장이 <b>지금 실제 적용 중인 결제 방식</b>을 채널별 카드로 요약해 보여주는 상단 스트립이에요(<code>.ot-pay-summary</code>).",
    "선불/후불/시간대별 설정이 복잡해도 사장님이 \"지금 이 순간 손님이 어떻게 결제하는가\"를 한눈에 확인하도록 돕는 읽기 전용 요약이에요."
   ],
   "behavior": [
    "헤더에 현재 시각을 표기: \"💳 지금 받는 결제 방식 · {HH:MM} 기준\" (예: \"19:48 기준\"). <code>hhmm</code>은 렌더 시점 현재 시각.",
    "<b>먹고가기 카드</b>: <code>ot_currentPolicy()</code> 결과로 결제 라벨(선불=💳 / 후결제=🧾)과 적용 범위(scope)를 표시. payment=prepay→\"선불·고정 정책\", postpay→\"후결제·고정 정책\", scheduled→현재 시각이 속한 슬롯명+\"시간대\"(예 \"점심 시간대\")이며 끝에 \"· 시간대별 자동\" 부기.",
    "scheduled인데 현재 시각이 어떤 슬롯에도 속하지 않으면 <code>defaultPolicy</code>를 적용하고 scope를 \"미정 시간대 기본값\"으로 표시.",
    "<b>포장하기 카드</b>: 항상 \"💳 선불\" + \"포장하기는 항상 선불 · 고정\" (포장은 결제 정책 고정).",
    "노출 카드 수는 <code>mode</code>에 따름: both면 두 카드(2단 그리드 <code>.two</code>), dine_in이면 먹고가기 카드만, takeout이면 포장하기 카드만.",
    "이 영역은 입력이 없는 <b>표시 전용</b>이라 클릭 동작이 없어요."
   ],
   "data": [
    "입력 소스: <code>OrderChannelConfig.mode</code>, <code>.payment</code>, <code>.defaultPolicy</code>, <code>PaymentSchedule[].{name,start,end,policy}</code> — DATA_MODEL §5.1/§5.2.",
    "현재 정책 계산식(<code>ot_currentPolicy()</code>): mode가 takeout 전용이면 무조건 선불/포장 전용; prepay·postpay면 고정 라벨; scheduled면 <code>schedule.find(s => HH:MM >= s.start && HH:MM <= s.end)</code>, 없으면 defaultPolicy.",
    "시각 기준은 영업일이 아니라 <b>벽시계 시:분</b>(시간대 슬롯 매칭용). 영업일 경계(03:00)는 매출·재고용이며 결제 정책 판정과 무관 — SPEC §1.1.",
    "저장 전 변경(dirty)이 있어도 이 요약은 현재 <code>ORDER_CHANNELS</code> 기준으로 즉시 미리보기되지만, 실제 손님 적용은 저장 후예요(핀1)."
   ],
   "exception": [
    "mode가 dine_in/takeout 한쪽만이면 그리드를 1단으로 좁혀 빈 카드를 만들지 않아요(빈 상태 회피).",
    "scheduled에서 슬롯 사이 공백 시간대에 진입하면 \"미정 시간대 기본값\" scope로 명확히 표기해 혼동을 줄여요.",
    "scheduled로 여러 슬롯이 겹쳐도 첫 매칭 슬롯을 적용(겹침은 저장 시 핀4 검증에서 사전 차단).",
    "권한 무관 열람 가능(요약은 민감 수치가 아님). 능동·긍정 톤 유지: \"지금 받는 결제 방식\"으로 표현."
   ]
  },
  "3": {
   "purpose": [
    "매장이 받을 <b>주문 채널을 한 가지만</b> 고르는 단일 선택 영역(<code>.panel</code> 첫 번째). 카드 3종: [먹고가기 + 포장하기], [먹고가기만], [포장하기만].",
    "이 선택이 손님 주문 화면 노출과 QR(테이블 QR·포장 QR) 활성 여부를 결정하는 매장 운영의 최상위 기준이에요."
   ],
   "behavior": [
    "카드 클릭(<code>confirmOrderModeChange(k)</code>): 같은 채널이면 무시. 다르면 <b>변경 전 안내 모달</b>을 띄워요 — STATES §6.1.",
    "모달 헤더 \"주문 채널을 바꿀까요?\", 본문에 from→to 라벨과 영향 목록을 표시. 영향 문구 예: both→dine_in \"포장하기 QR이 손님 화면에서 사라져요.\", *→takeout \"테이블 QR 주문이 손님 화면에서 사라져요.\", →both \"먹고가기와 포장하기를 모두 받게 돼요.\", 공통 \"손님 메뉴판에 보이는 주문 방식이 바로 바뀌어요.\" / \"이미 들어온 주문은 그대로 유지돼요.\"",
    "모달 버튼: <b>[그대로 둘게요]</b>=닫기(변경 취소), <b>[네, 바꿀게요]</b>=<code>applyOrderModeChange(m)</code>로 <code>mode</code> 변경(아직 미저장). 모달 안내 \"여기서 바꿔도 아래 저장 버튼을 눌러야 최종 반영돼요. 저장 전엔 손님 화면이 바뀌지 않아요.\"",
    "선택된 카드는 <code>sel</code> 강조. 패널 하단 보조 안내: \"주문 없이 메뉴만 보여주고 싶다면 QR 관리 → 메뉴판 QR을 활용해 주세요.\" (메뉴판만 모드는 이 화면이 아닌 QR 관리에서 분리 관리).",
    "<b>전환 효과(저장 시)</b> — STATES §6.2: 포장 끄면 포장 QR·테이블 내 포장 메뉴 노출 중단, 매장 끄면 테이블 QR 비노출. 진행 중 매장 주문은 경고만 하고 완료까지 정상 처리."
   ],
   "data": [
    "필드: <code>OrderChannelConfig.mode</code> enum(<code>both</code>/<code>dine_in</code>/<code>takeout</code>), NN — DATA_MODEL §5.1.",
    "연동: 저장 시 <code>mode</code>에 따라 테이블 QR 활성(먹고가기 포함 시)·포장 QR 활성(<code>isTakeoutQRActive()</code>, 포장 포함 시) 자동 갱신 → QR 관리 화면이 이를 따라가요.",
    "라벨 매핑(<code>ORDER_LABELS.mode</code>): both=\"먹고가기 + 포장하기\", dine_in=\"먹고가기만\", takeout=\"포장하기만\". 아이콘: both 🍽️🥡 / dine_in 🍽️ / takeout 🥡.",
    "변경 영향 계산: <code>willDineOff</code>=현재 매장 포함 && 목표 takeout, <code>willTakeOff</code>=현재 포장 포함 && 목표 dine_in."
   ],
   "exception": [
    "<b>포장 끄기 차단</b>: 변경 후 미수락 포장 예약(<code>status='accepted'</code> && <code>reservation_accepted_at IS NULL</code>)이 있으면 저장 차단 + \"포장 예약 N건을 먼저 수락/거절해 주세요\" — STATES §6.3.",
    "진행 중 매장 주문이 있을 때 매장을 끄면 경고만 노출하고, 이미 들어온 주문은 완료까지 그대로 유지(모달 영향 문구 \"이미 들어온 주문은 그대로 유지돼요.\") — STATES §6.2.",
    "<b>권한</b>: 채널 변경은 <code>owner</code>만. staff는 카드가 비활성 — SPEC §1.6.",
    "모달에서 [그대로 둘게요] 또는 ✕로 닫으면 선택이 원래 채널로 유지돼요(변경 미적용).",
    "저장 전까지는 손님 화면 미반영(모달·하단 안내로 반복 고지)."
   ]
  },
  "4": {
   "purpose": [
    "선택한 채널별로 운영 방식을 세부 설정하는 영역(<code>.ot-channel-grid</code>). 먹고가기 패널(서빙 방식·호출 방식·결제 방식)과 포장하기 패널(결제 시점·포장가 안내·대기 시간·포장 예약 토글)로 구성돼요.",
    "both면 좌우 2단, 한쪽 채널만 활성이면 1단으로 표시해 실제 운영 가능한 항목만 노출해요."
   ],
   "behavior": [
    "<b>먹고가기 · 서빙 방식</b>: 🔒 잠금(본사 설정 항목, 시스템 자동 결정). 값에 따라 \"🍳 직원이 서빙\"(테이블별 QR) 또는 \"🚶 손님 셀프 수령\"(공용 QR). 사장님은 변경 불가, 사유 표시.",
    "<b>먹고가기 · 호출 방식</b>(셀프 모드일 때만 노출): 복수 선택 칩 [🎙️ 호명][💬 카카오 알림톡][📺 전광판], 최소 1개. 클릭 <code>toggleOrderNotif(k)</code>로 ON/OFF. 전광판은 미연결 상태라 비활성(\"📺 전광판 · 미연결\"), 클릭 시 <code>alertDisplayNotConnected()</code>. 선택 1개 이상이면 보조 \"손님 식별자: 휴대폰 끝 4자리\".",
    "<b>먹고가기 · 결제 방식 세그먼트</b>: [💳 선불 · 주문할 때 바로][🧾 후불 · 나갈 때][⏰ 시간대별 · 자동 전환], <code>setOrderPayment(k)</code>로 단일 선택. 선택값에 따라 흐름 예시(<code>otPayExample</code>)가 바뀌어요.",
    "<b>시간대별 슬롯</b>(payment=scheduled일 때): 슬롯마다 [이름 입력][시작 select(10분 단위)][~][종료 select][선불/후결제 pill 토글 <code>toggleOrderSlotPolicy(i)</code>][× 삭제]. [+ 시간대 추가](<code>addOrderSlot()</code>, 기본 14:30~17:00·선불). 추가로 \"미정 시간대 기본값\" [선불][후결제] 선택(<code>setOrderDefaultPolicy</code>).",
    "<b>포장하기 패널</b>: 결제 시점 \"💳 선불\"(고정, \"포장하기는 주문 즉시 결제해요\"); 포장가 안내(메뉴 관리에서 메뉴별 입력, 비우면 매장가 적용); 대기 시간 안내 [min 분]~[max 분] number 입력(<code>updateOrderWaitMin/Max</code>) → \"손님 화면에 'N분 ~ M분'으로 표시돼요\"; <b>포장 예약 토글</b>(<code>toggleOrderField('reservation')</code>) ON 시 \"손님이 수령 시간 선택, 사장님 수락 후 접수\", 안내 \"손님이 수령 시간을 선택하면 사장님이 수락해야 확정돼요. (영업 종료 30분 전 자동 마감)\".",
    "<b>제품 정의(코드보다 우선)</b>: 선불/후불 라벨은 손님 결제 시점 안내일 뿐이고, 주문 취소 vs 결제 취소는 <b><code>Payment.status='paid'</code> 여부</b>로 갈려요. paid면 환불 발생(결제 취소), 아니면 주문 취소 — 후불이라도 결제 완료 후 손님이 돌아와 환불하면 결제 취소예요 — STATES §1·§2·§3."
   ],
   "data": [
    "필드: <code>service</code> enum(self/served, 시스템 결정), <code>notifications</code> jsonb(셀프+먹고가기일 때만, 최소 1), <code>payment</code> enum(prepay/postpay/scheduled), <code>defaultPolicy</code> enum, <code>reservation</code> bool — DATA_MODEL §5.1.",
    "<code>wait_minutes</code> 안내는 min/max 두 값(<code>waitMinMin</code>/<code>waitMinMax</code>), number 1~999, 손님 화면에 범위로 노출. (스펙 권장 범위 5~70·5분 간격 — DATA_MODEL §5.1).",
    "<code>PaymentSchedule</code>(scheduled 전용): name(≤20)·start_time·end_time·policy(prepay/postpay)·sort_order. 시간 옵션은 10분 단위 24h(<code>timeOptions10</code>) — DATA_MODEL §5.2.",
    "포장 예약 관련 파생: <code>reservation_slot_minutes</code>(default 30), <code>reservation_block_before_close_minutes</code>(default 30, 영업 종료 N분 전 슬롯 차단) — DATA_MODEL §5.1. 예약 주문은 <code>Order.pickup_time</code>·<code>reservation_accepted_at</code>로 추적 — DATA_MODEL §4.",
    "연동: 결제 정책·포장 예약 설정은 손님 주문 화면 결제 시점/예약 UI, 매출 집계(원거래일 기준 환불 차감 — SPEC §1.5), 부가세 round(taxable/11) — SPEC §1.3 에 반영."
   ],
   "exception": [
    "셀프+먹고가기인데 호출 방식 0개면 저장 차단 alert \"호출 방식을 최소 1개 선택해 주세요.\" + 인라인 \"⚠️ 호출 방식을 최소 1개 선택해 주세요.\"",
    "시간대 슬롯 검증: 슬롯의 시작≥종료면 저장 차단 alert \"{슬롯명} 시간대의 시작 시각이 종료보다 빨라야 해요.\" + 슬롯 간 시간 겹침 차단(저장 시) — DATA_MODEL §5.2.",
    "🔒 본사 설정(서빙 방식)·미연결(전광판)은 비활성 처리 + 사유 안내. 전광판 클릭 시 \"전광판은 아직 매장에 연결되지 않았어요. 본사 문의로 신청해 주세요.\"",
    "대기 시간 입력 경계: 최소값 보정(<code>Math.max(1, …)</code>), 비숫자는 0 방지. min>max 같은 역전 입력은 저장 전 보정/안내 권장.",
    "포장 예약 OFF 시 손님은 즉시 접수만 가능(\"포장 예약 OFF — 포장하기만 즉시 접수\"). ON 시 미수락 예약은 채널 변경을 막아요(핀3·STATES §6.3).",
    "<b>권한</b>: 모든 세부 설정 변경은 <code>owner</code>만. staff 열람 시 입력 비활성 — SPEC §1.6."
   ]
  }
 },
 "stl-list": {
  "1": {
   "purpose": [
    "화면 최상단 <b>요약 헤더</b>로, 현재 조회 조건(기간·날짜 기준) 안에 든 정산 회차의 핵심 합계를 한 줄로 보여주는 영역. 크럼브 <code>정산 관리 › 정산 내역</code> + 제목 <code>정산 내역</code> + 보조문구(<code>.page-sub</code>)로 구성.",
    "사장님이 표를 스크롤하기 전에 \"이 기간에 결제 얼마, 받으실 금액 얼마\"를 즉시 파악하게 해, 정산 신뢰를 주는 진입 요약 역할.",
    "우측 액션으로 화면 이동·내보내기 진입점(<code>🗓️ 정산 달력으로</code>, <code>📤 엑셀로 받기</code>)을 제공."
   ],
   "behavior": [
    "기본 표시 기준은 <b>결제일</b>이 아니라 코드상 기본값 <code>state.stlListDateBasis</code> 초기값에 따른다. 단 핀2의 기준 토글로 결제일/정산일 전환 시 보조문구의 <code>'결제일 기준' / '정산일 기준'</code> 라벨과 합계가 즉시 재계산된다.",
    "보조문구는 두 형태: 하루(specific) 선택 시 <code>📅 {날짜} · {기준} 기준 · <b>N일 분량</b> · 받으실 금액 {금액}원</code>, 그 외 기간 선택 시 <code>{기간라벨} · {기준} 기준 · <b>N일 분량</b> · 결제 {gross}원 · 받으실 금액 {totalSettle}원</code>.",
    "<code>🗓️ 정산 달력으로</code> 클릭 → <code>setSection('stl-calendar')</code>(stl-calendar 화면 이동). <code>📤 엑셀로 받기</code> 클릭 → <code>openExport(rows.length, '정산 내역', '{기간라벨} · {기준} 기준')</code> 모달 오픈.",
    "합계값은 <b>현재 필터링·정렬된 rows</b> 기준으로 재계산되며 표 결과와 항상 일치한다(totGross=ΣgrossAmt, totSettle=ΣtotalSettle)."
   ],
   "data": [
    "데이터 소스: <code>DAY</code>(영업일별 매출) 각 일자를 <code>findSettlementByOrderDate(iso)</code>로 <code>SETTLEMENTS</code> 회차에 매핑한 평면 리스트 <code>dailyList</code>. 1행=1영업일.",
    "<code>grossAmt</code>(결제 금액, int 원), <code>totalSettle</code>(받으실 금액, int 원), <code>rows.length</code>(N일 분량).",
    "영업일 경계는 03:00 시작(SPEC §1.1) — gross/ocnt 집계는 이 경계로 묶인 <code>DAY</code> 값을 그대로 사용.",
    "연동: 핀2 기준/기간 토글, 핀4·5 표·상세, stl-calendar(정산 달력), 엑셀 내보내기(openExport)."
   ],
   "exception": [
    "권한: <b>owner 전용</b> — 정산은 staff 비노출(좌측 메뉴 회색+자물쇠, 진입 시 403 모달). [확정 필요] SPEC §1.6.2에 정산 \"조회\" 행이 없어 출금 기준(owner 전용)을 적용 — staff 조회 허용이 제품 의도면 매트릭스에 행 신설 요망.",
    "조회 결과가 0건이면 합계는 <code>0원</code>으로 표기하고 부정형(\"내역이 없어요\")은 피한다 — 빈 상태 문구는 핀4에서 처리.",
    "톤: 합계 라벨은 능동·긍정형 <code>받으실 금액</code> 사용(\"정산액\"·\"미지급\" 등 부정·딱딱한 표현 회피)."
   ]
  },
  "2": {
   "purpose": [
    "<b>1차 필터 영역</b>(<code>.search-wrap</code>). 날짜 기준(정산일/결제일) 전환 + 기간 프리셋/직접 선택 + 정산 상태 + 쿠폰 사용 여부로 목록을 좁히는 핵심 조회 컨트롤.",
    "정산일·결제일 두 관점을 한 토글로 바꿔 \"언제 들어오나\"(정산일)와 \"언제 판 매출인가\"(결제일)를 자유롭게 볼 수 있게 한다.",
    "자주 쓰는 기간을 칩 한 번으로 적용(오늘·1주일·1개월·이번 달·3개월·전체)하고, 정밀 조회는 기간/하루 직접 선택을 제공."
   ],
   "behavior": [
    "<b>날짜 기준 세그 토글</b>: <code>정산일</code> / <code>결제일</code> 2-state. 클릭 → <code>setStlListBasis('settle'|'approval')</code>, <code>basisKey</code>가 <code>settleISO|approvalISO</code>로 바뀌어 기간 필터·정렬·합계 모두 그 키 기준으로 재조회.",
    "<b>기간 프리셋 칩</b>: <code>오늘/1주일/1개월/이번 달/3개월/전체</code>. 클릭 → <code>setStlListQuick(k)</code>가 <code>stlListQuickRange</code> 설정 + <code>stlListSpecificDate</code> 초기화. 매핑: today=오늘 1일, 1w=7일, 1m=31일, 3m=93일, thismonth=2026-05 전체, all=전체.",
    "<b>직접 선택</b>: <code>📅 기간으로</code> 클릭 → period 모드 진입(기본 2026-05-01~05-15), date input 2개(<code>max=TODAY_DATE</code>) 입력 시 <code>stlListPeriodStart/End</code> 갱신·재조회, <code>✕ 해제</code>로 1w 복귀. <code>📅 하루로</code> 클릭 → specific 모드(기본 TODAY_DATE), 변경은 <code>applyStlSpecificDate()</code>.",
    "<b>상태 칩</b>: <code>전체(N) / 곧 들어와요(N) / 입금 완료(N)</code> — <code>setStlListStatus('all'|'정산대기'|'정산완료')</code>. 괄호 카운트는 전체 dailyList 기준 고정(필터와 무관).",
    "<b>쿠폰 칩</b>: <code>전체 / 사용함 / 안 썼어요</code> — <code>setStlListCoupon('all'|'used'|'none')</code>, used는 platform 또는 merchant 쿠폰 사용 일자만.",
    "<b>처음으로 돌리기</b> 클릭 → <code>resetStlListFilters()</code>: 기준=approval, 기간=1w, 상태=all, 쿠폰=all 등 전체 초기화."
   ],
   "data": [
    "상태 필드: <code>state.stlListDateBasis</code>('settle'|'approval'), <code>stlListQuickRange</code>('today'|'1w'|'1m'|'thismonth'|'3m'|'all'|'period'|'specific'), <code>stlListPeriodStart/End</code>(ISO date str), <code>stlListSpecificDate</code>(ISO date str), <code>stlListStatus</code>, <code>stlListCoupon</code>.",
    "정산 상태값: <code>정산완료</code>(pill=done, 라벨 '입금 완료') / <code>정산대기</code>(pill=pending, 라벨 '곧 들어와요'). 회차 status는 <code>settleISO ≤ todayISO ? 정산완료 : 정산대기</code> 문자열 비교로 산정.",
    "기간 필터는 <code>basisKey</code> 값으로 <code>r[basisKey] >= start && <= end</code> 비교. 정산일 기준이면 settleISO 없는 미래/산정중 행은 자연히 제외.",
    "조회 대상: <code>settlements</code>(회차) ↔ <code>DAY</code> 매핑. 영업일 03:00 경계(SPEC §1.1), 정산 사이클 D+3 영업일(STATES §8.1)."
   ],
   "exception": [
    "직접 기간 선택 시 두 date input 모두 <code>max=TODAY_DATE</code>로 오늘 이후 선택 차단(미래 매출은 정산 대상 아님 — SETTLEMENTS 생성에서 <code>approvalISO > todayISO</code> 제외).",
    "시작일 > 종료일 등 역순 입력 시 결과 0건 빈 상태로 떨어지며, 폼 검증 경고 토스트 권장(spec/08-common 폼검증). 경계: start==end은 하루 조회로 정상.",
    "톤: 쿠폰 미사용 칩은 부정형 대신 친근체 <code>안 썼어요</code>, 초기화는 <code>처음으로 돌리기</code> 사용.",
    "기준 토글로 정산일 선택 시 아직 산정 안 된 회차는 정산일이 비어 표에서 <code>산정 중</code>으로 노출(핀4 참조)."
   ]
  },
  "3": {
   "purpose": [
    "<b>2차(고급) 검색 패널</b>(<code>.adv-search-panel</code>, 접기/펼치기). 1차 필터로 못 좁히는 세부 조건—주문/승인번호·영업일 요일·거래금액 범위·정산금액 범위—으로 정밀 조회.",
    "특정 주문 1건이 어느 정산 회차에 들어갔는지 역추적(주문/승인번호 → 해당 결제 일자 행)하는 CS·대사(reconciliation) 용도.",
    "평소엔 접혀 화면을 단순하게 유지하고, 필요한 사장님만 펼쳐 쓰는 점진적 노출(progressive disclosure)."
   ],
   "behavior": [
    "헤더 클릭 → <code>toggleStlAdvanced()</code>로 <code>stlListAdvancedOpen</code> 토글. 버튼 라벨 <code>펼치기/접기</code> + 캐럿. 적용 중 조건이 있으면 헤더에 <code>{N}개 조건 적용 중</code> 배지 + <code>{조건명} (으)로 좁혀서 보고 있어요</code> 안내.",
    "<b>영업일 요일 칩</b>: <code>전체/월~일요일</code> → <code>setStlListDow(w)</code>. approvalDow 기준 필터.",
    "<b>거래 금액 범위</b>: 최소/최대 input(<code>stlListAmtMin/Max</code>) → grossAmt가 범위 내인 행만. <b>정산 금액 범위</b>: <code>stlListSettleMin/Max</code> → totalSettle 기준. <code>🔍 검색</code> 버튼으로 <code>renderApp()</code> 재조회.",
    "<b>주문/승인번호</b> input(<code>stlListOrdSearch</code>, placeholder <code>🔍 주문번호(예: 20260515-0046) 또는 승인번호(예: 30150046)</code>): 입력 시 <b>기간 필터를 우회</b>하고 전체 dailyList에서 매칭 주문의 결제 일자만 남김(<code>#·공백·-</code> 제거 후 부분일치).",
    "여러 조건은 AND로 누적 적용. 핀2의 <code>처음으로 돌리기</code>가 이 고급 조건도 함께 초기화."
   ],
   "data": [
    "상태 필드: <code>stlListAdvancedOpen</code>(bool), <code>stlListDow</code>('all'|요일), <code>stlListAmtMin/Max</code>(string→Number), <code>stlListSettleMin/Max</code>(string→Number), <code>stlListOrdSearch</code>(string).",
    "주문/승인번호 매칭은 <code>ORDERS</code>를 순회해 <code>o.id</code>(주문번호)·<code>makeApproval(o)</code>(승인번호) 정규화 후 부분일치, 매칭된 <code>o.date</code> 집합으로 행 필터 — 주문 내역 화면과 동일 키 연동.",
    "금액 필터는 표시값과 동일한 int 원 단위 비교. 검증: 숫자 외 입력은 <code>Number()</code> 변환 시 무시되도록 처리 권장.",
    "정렬/검색/페이징 공통 규칙 SPEC §2.6 적용(검색은 AND, 부분일치)."
   ],
   "exception": [
    "조건 적용 후 결과 0건이면 표에 빈 상태 행 노출(핀4) — <code>다른 조건으로 다시 찾아봐 주세요.</code> + <code>처음으로 돌리기</code> 링크.",
    "금액 범위 min>max 경계는 결과 0건으로 자연 처리, 폼 검증 경고 토스트 권장.",
    "주문/승인번호로 검색 중에는 기간 칩 선택이 결과에 영향 없음을 안내(우회 동작) — 혼란 방지 보조문구 권장.",
    "안내 보조문구는 가능형: <code>주문/승인번호·영업일 요일·거래금액 범위·정산금액 범위로 더 정확하게 찾을 수 있어요</code>.",
    "권한: owner 전용(정산 영역) — stl-calendar·home과 통일, staff 진입 차단(403)."
   ]
  },
  "4": {
   "purpose": [
    "<b>정산 내역 표</b>(<code>.panel.tight</code> 내 <code>table.t</code>). 회차/일자별 정산을 컬럼으로 펼쳐 결제→수수료→받으실 금액의 계산 흐름을 투명하게 보여주는 본문.",
    "헤더 정렬과 표시개수 조절을 제공해 큰 매출도 원하는 순서로 확인.",
    "각 행이 한 영업일의 정산 요약이며, 클릭으로 핀5의 회차 상세로 연결되는 목록 본체."
   ],
   "behavior": [
    "컬럼(좌→우): <code>No.</code> · <code>결제일</code> · <code>정산일</code> · <code>건수</code> · <code>결제 금액</code> · <code>쿠폰 보전</code> · <code>수수료</code> · <code>받으실 금액</code> · <code>상태</code> · (자세히 화살표). 금액 컬럼은 우측정렬(<code>.num</code>).",
    "<b>헤더 정렬</b>: 정렬 가능 키 approvalISO·settleISO·cnt·grossAmt·couponPlatformAmt·feeTotal·totalSettle·status. 클릭 → <code>setStlListSort(key)</code> asc/desc 토글. 기본 정렬 <code>{key:'approvalISO', dir:'desc'}</code>(최신 결제일 먼저).",
    "<b>쿠폰 보전 셀</b>: 소프트먼트 발행 쿠폰 있으면 녹색 <code>+{금액}원</code> + <code>소프트먼트 보전</code>(정산에 더함). 사장님 발행 쿠폰은 회색 <code>-{금액}원</code> + <code>사장님 발행 · 정산 제외</code>(참고 표시, 정산 미반영). 둘 다 없으면 <code>−</code>.",
    "<b>수수료 셀</b>: 항상 차감이므로 <code>−{feeTotal}</code> 음수 표기. <b>받으실 금액</b>: 정산완료는 파란색, 정산대기는 주황(<code>#a25e00</code>) 강조.",
    "<b>표시 개수</b> select(<code>orderRowsPerPage</code>) + <code>총 N건 조회</code> + 안내 <code>💡 화면에만 적용돼요 · 엑셀은 조회된 N건 전체</code>. 페이지네이션은 정적(<code>paginationStatic(1,1)</code>).",
    "패널 제목 <code>여기 있어요</code> + 부제 <code>N일 분량 · 한 줄을 누르면 자세히 볼 수 있어요</code>."
   ],
   "data": [
    "행 필드: <code>approvalDate/Dow</code>, <code>settleDate/Dow</code>, <code>cnt</code>(int), <code>grossAmt</code>(int 원), <code>couponPlatformAmt</code>(소프트먼트 보전 +), <code>couponMerchantAmt</code>(사장님, 참고), <code>feeTotal</code>(int), <code>totalSettle</code>(int), <code>status</code>, <code>settlementId</code>.",
    "<b>핵심 계산식</b>: <code>feeBase = round((gross − ref) × AVG_FEE_RATE)</code>(요율 0.02, 환불분은 카드사가 수수료 환급하므로 gross−ref 기준), <code>feeVat = round(feeBase × 0.1)</code>, <code>feeTotal = feeBase + feeVat</code>.",
    "<code>txSettle = gross − ref − feeTotal</code>, <code>totalSettle = txSettle + couponPlatformAmt</code>. <b>사장님 발행 쿠폰(couponMerchantAmt)은 정산에서 제외</b>(사장님 할인 disc로 실매출에서 차감되는 가맹점 부담 — 정산은 결제 실액 기준이라 보전 무가산, coupon 화면과 동일). 화면 핀 타이틀의 \"받으실 금액 = 결제금액 + 쿠폰 보전 − 수수료\"는 환불 0 가정의 단순식이며, 실제식은 위 환불 차감 포함식이 우선.",
    "쿠폰 보전 라벨 '쿠폰 보전'=본사(소프트먼트) 발행 쿠폰 보전액, '수수료'=PG 결제 수수료(부가세 포함). 부가세는 round(taxable/11) 규칙(SPEC §1.3)을 매출 화면과 공유.",
    "연동: 결제 금액·건수는 매출 통계/주문 내역과 동일 <code>DAY</code> 소스, 행 클릭은 stl-detail로 <code>settlementId</code> 전달."
   ],
   "exception": [
    "<b>빈 상태</b>(rows 0건): <code>다른 조건으로 다시 찾아봐 주세요.</code> + 파란 링크 <code>처음으로 돌리기</code>(<code>resetStlListFilters()</code>). colspan 10 한 줄.",
    "정산일 미산정 행(미래·산정 전): 정산일 셀에 <code>산정 중</code>(회색 11px) 표기, <code>settlementId</code> 없으면 행 클릭 비활성·자세히 칸은 <code>−</code>.",
    "<b>환불 반영</b>: 환불은 원거래일 매출에서 차감(SPEC §1.5)되어 gross−ref로 같은 행에 반영. 다만 마감 후(정산 paid_out 이후) 환불은 다음 회차 차감(STATES §8.1, §8.2) — 해당 행 결제 금액은 그대로, 차감은 다음 회차 행에서 보임.",
    "권한: owner 전용(정산 영역, staff 진입 차단). 엑셀 내보내기 안내문구는 가능형 유지.",
    "경계: 정산 금액이 음수(환불>매출)인 회차도 그대로 음수 표기하고 색상은 대기색 처리, 다음 회차 차감/보류 로직은 핀5에서 안내."
   ]
  },
  "5": {
   "purpose": [
    "표의 <b>각 정산 행과 그 상태 pill</b>, 그리고 행 클릭으로 진입하는 <b>회차 정산 상세</b>(stl-detail)로의 연결을 담당하는 영역.",
    "상태 pill로 \"이미 들어왔는지/곧 들어오는지\"를 한눈에 구분하고, 클릭으로 결제·환불·수수료 세부 내역을 확인하게 한다.",
    "D+3 영업일 입금 약속과 마감 후 환불 차감/보류 규칙을 사장님에게 투명하게 전달."
   ],
   "behavior": [
    "<b>상태 pill</b>: <code>정산완료</code> → <code><span class=\"pill done\">입금 완료</span></code>, <code>정산대기</code> → <code><span class=\"pill pending\">곧 들어와요</span></code>. 상태는 <code>settleISO ≤ todayISO</code> 비교로 자동 산정.",
    "<b>행 클릭</b>: <code>settlementId</code>가 있으면 행 전체 클릭 → <code>openStlDetail(settlementId)</code> → stl-detail 화면(<code>state.stlDetailId</code> 세팅). 자세히 칸은 파란 <code>자세히 ›</code> 표시.",
    "상세 화면(stl-detail)은 해당 회차의 결제·환불·수수료·쿠폰 보전 내역과 승인일 묶음(토/일/공휴일은 한 정산일에 여러 영업일이 합쳐짐), D+3 영업일 정산일을 보여준다.",
    "정렬에서 status 키로 정렬 시 정산완료/대기 그룹핑 가능."
   ],
   "data": [
    "<code>settlementId</code> 형식 <code>STL-2026{정산일MMDD}-{승인일MMDD}</code>(예: STL-20260519-0515)로 회차 고유 식별. stl-detail 진입 키.",
    "<code>status</code>('정산완료'|'정산대기'), <code>statusPill</code>('done'|'pending'). 회차 묶음 필드 <code>approvalDays[]</code>(각 영업일 date/dow/gross/ref/cnt) 상세에서 사용.",
    "정산일 산정: <code>addBizDays(결제일, 3)</code> — 주말·공휴일(<code>isHoliday</code>) 제외 D+3 영업일(STATES §8.1). 정산 사이클은 영업일 종료(02:59:59)→다음날 03:00 배치(SPEC §1.1).",
    "상세 모델: Settlement(status: pending|paid_out|held), 결제/환불/수수료 집계 + 사장님 계좌 D+1 출금(STATES §8.1)."
   ],
   "exception": [
    "<b>마감 후 환불</b>(원거래 정산이 paid_out 이후): 환불액을 <b>다음 정산 회차의 차감액</b>으로 반영하고 \"어제 환불 N원이 내일 정산에서 차감돼요\" 알림(STATES §8.2).",
    "<b>보류(held)</b>: 다음 회차 정산액이 환불액보다 작으면 회차 <code>status='held'</code> 처리, 본사 CS 채널로 후속 처리(STATES §8.2). 표/상세에 보류 상태 별도 안내 노출 권장.",
    "<b>주문 취소 vs 결제 취소 구분</b>: 선불/후불이 아니라 <code>Payment.status='paid'</code> 여부로 구분 — paid면 결제 취소(환불 발생→정산 차감), 아니면 주문 취소(정산 영향 없음). 후불도 결제 완료 후 환불은 결제 취소로 처리.",
    "<code>settlementId</code> 없는 산정 중 행은 클릭 비활성, 자세히 칸 <code>−</code>로 진입 차단.",
    "권한: owner 전용(정산 영역, staff 진입 차단). 톤은 능동·긍정형 <code>곧 들어와요</code>/<code>입금 완료</code> 사용."
   ]
  }
 },
 "staff-call": {
  "1": {
   "purpose": [
    "<b>화면 개요</b>: 손님이 테이블에 앉은 채로 직원을 부르는 \"직원 호출\" 기능을 한 화면에서 관리한다. 기능 ON/OFF, 손님이 고를 수 있는 호출 메시지(요청 항목) 관리, 실시간 들어온 호출 처리 현황을 모두 다룬다.",
    "이 기능이 있는 이유: 매장(먹고가기) 손님이 직원을 눈으로 찾거나 큰 소리로 부르지 않고도 테이블 QR 화면에서 \"물\"·\"수저\"·\"계산\" 같은 요청을 보낼 수 있게 해, 응대 누락과 호출 소음을 줄인다.",
    "호출은 어드민 화면이 아니라 <b>매장에 설치된 QR오더 프로그램(PC 에이전트) 기기</b>에서 팝업+사운드로 직원에게 즉시 전달된다(STATES §7.1). 이 어드민 화면은 설정과 사후 내역 확인 용도."
   ],
   "behavior": [
    "이 기능은 <b>먹고가기(매장 식사) 채널에서만</b> 작동한다. 포장·배달 등 비대면 채널에는 호출 버튼이 노출되지 않는다.",
    "상단 breadcrumb는 <code>매장 운영 › 직원 호출</code>, 제목 <code>직원 호출</code>, 부제 \"손님이 테이블에서 직원을 부를 수 있는 기능이에요. 먹고가기 채널에서만 작동해요.\"",
    "화면은 위에서부터 (1) 기능 ON/OFF 큰 토글 카드, (2) 탭(최근 호출 내역 / 호출 메시지), (3) 탭별 본문 순서로 1열 배치.",
    "진입 시 기본 탭은 <code>state.staffCallTab='history'</code>(최근 호출 내역). 사장(owner)·직원(staff) 모두 화면 열람 가능."
   ],
   "data": [
    "화면 전체는 <code>StaffCallConfig</code>(매장별 1개, DATA_MODEL §6.1), <code>StaffCallMessage</code>(호출 메시지, §6.2), <code>StaffCallEvent</code>(호출 이벤트, §6.3) 세 모델을 바인딩한다. 목업 더미: <code>STAFF_CALLS</code>, <code>STAFF_CALL_HISTORY</code>.",
    "호출 발생·처리는 <b>QR오더 프로(매장 PC 에이전트)</b>와 실시간 연동된다(WebSocket/푸시 성격). 손님 테이블 주문 화면(테이블 QR)이 호출 입력 소스.",
    "테이블 식별값(<code>table_id</code>)은 \"테이블 관리\" 화면의 테이블과 연동된다. 처리 소요시간 통계는 어드민 통계 화면에 반영(STATES §7.1, §7.3).",
    "권한 매트릭스: 매장 운영 카테고리는 owner/staff 모두 가능(SPEC §1.6). 단 호출 메시지 추가·삭제·순서·사용 토글 등 설정 변경은 owner 전용(핀 3 참조)."
   ],
   "exception": [
    "<b>포장 전용 매장</b>(먹고가기 채널 미사용)에서는 이 기능이 의미가 없으므로, 화면 진입 시 기능 비활성 안내를 보여 주고 토글을 잠근다. 노출 문구 예: \"먹고가기 채널을 사용하는 매장에서 직원 호출을 켤 수 있어요.\"(가능형 안내)",
    "매장 PC 에이전트(QR오더 프로그램)가 한 대도 연결돼 있지 않으면 호출이 전달될 곳이 없으므로 안내 배너로 \"QR오더 프로그램이 설치된 기기를 1대 이상 연결하면 호출 알림을 받을 수 있어요.\"를 보여 준다.",
    "로딩 중에는 공통 스켈레톤, 데이터 조회 실패 시 공통 에러 상태 \"잠시 후 다시 시도해 주세요\"(spec/08-common.md)."
   ]
  },
  "2": {
   "purpose": [
    "<b>기능 사용 ON/OFF 큰 토글 카드</b>: 직원 호출 기능 전체를 한 번에 켜고 끈다. 카드 전체(아이콘·텍스트·우측 스위치)가 클릭 가능한 단일 토글 영역.",
    "매장 사정(인력 부족·점심 피크 외 시간 등)에 따라 손님 호출 접수를 즉시 중단·재개할 수 있게 하는 마스터 스위치."
   ],
   "behavior": [
    "<b>ON</b> 상태: 초록 테두리(<code>#10b981</code>)+초록 배경 카드, 우측 스위치 노브 우측(켜짐), 상태 pill \"<b>사용 중</b>\"(초록), 설명 \"손님이 테이블에서 직원을 부를 수 있어요. QR오더 프로그램 기기에 팝업으로 알림이 떠요.\" → 손님 화면에 호출 버튼 노출 + 호출 시 매장 기기 팝업 알림.",
    "<b>OFF</b> 상태: 회색 테두리/배경, 스위치 노브 좌측, 상태 pill \"<b>사용 안 함</b>\"(회색), 설명 \"지금은 손님 화면에 직원 호출 버튼이 표시되지 않아요.\" → 손님 화면에 호출 버튼 미표시.",
    "카드 클릭 시 <code>STAFF_CALLS.enabled = !STAFF_CALLS.enabled</code>로 즉시 토글 후 <code>renderApp()</code> 재렌더. 변경은 전역 저장 대상(<code>GLOBAL_SAVE_SECTIONS</code>에 'staff-call' 포함) — 저장 버튼으로 확정.",
    "기본값(default): <code>enabled = true</code>(DATA_MODEL §6.1, 신규 매장 기본 ON)."
   ],
   "data": [
    "바인딩 필드: <code>StaffCallConfig.enabled</code> (bool, NN, default true). 목업 <code>STAFF_CALLS.enabled</code>.",
    "OFF→ON 또는 ON→OFF 전환 시 <code>StaffCallConfig.updated_at</code> 갱신. 변경 즉시 손님 테이블 화면의 호출 버튼 노출 여부에 반영.",
    "전역 저장 섹션이므로 미저장 변경은 공통 \"저장하지 않은 변경\" UI(<code>markUnsavedUI</code>)로 표시되고, 저장 시 서버 PATCH 성격."
   ],
   "exception": [
    "OFF 상태에서 \"호출 메시지\" 탭을 열면 빈 상태 안내가 표시된다: 아이콘 🛎️ + \"<b>직원 호출이 꺼져 있어요</b>\" + \"위 토글을 켜면 손님이 테이블에서 직원을 부를 수 있어요.\"(가능형). 메시지 목록/추가 버튼은 숨김.",
    "OFF로 끄더라도 \"최근 호출 내역\" 탭의 기존 내역과 처리 버튼은 계속 동작한다(이미 들어온 호출은 처리 가능).",
    "staff 계정도 토글을 볼 수 있으나, 설정 변경 권한이 owner 전용으로 운영될 경우 staff에게는 비활성+툴팁 \"설정 변경은 사장님 계정에서 할 수 있어요\"로 처리(SPEC §1.6)."
   ]
  },
  "3": {
   "purpose": [
    "<b>탭 전환 영역</b>: \"🛎️ 최근 호출 내역\"(실시간 처리 현황)과 \"💬 호출 메시지\"(손님이 고를 수 있는 요청 항목 관리)를 전환한다.",
    "\"호출 메시지\"는 손님 테이블 화면에 버튼으로 노출되는 요청 항목 목록(예: 물, 수저, 계산, 메뉴 추천)을 사장이 직접 구성하는 영역."
   ],
   "behavior": [
    "\"최근 호출 내역\" 탭에는 <b>처리 대기 건수</b>(미완료 호출 수)가 주황 배지(<code>#c2410c</code>)로 표시된다. 대기 0건이면 배지 숨김. <code>pendingCnt = STAFF_CALL_HISTORY.filter(r=>!r.completedAt).length</code>.",
    "\"호출 메시지\" 탭: 메시지는 <b>최대 15개</b>(<code>MAX_MSG=15</code>). 헤더 우측에 한도 미만이면 <b>[+ 메시지 추가 (현재수/15)]</b> 버튼, 한도 도달 시 \"최대 15개\" 텍스트로 대체.",
    "각 메시지 행: 드래그 핸들 ⠿(드래그로 순서 변경, <code>sort</code> 재계산), 순번, 본문, <b>사용 토글</b>(ON/OFF), 삭제 버튼 ✕. 토글 OFF면 행이 흐리게(off) 처리되고 손님 화면에서 해당 항목 숨김.",
    "[+ 메시지 추가] 클릭 시 모달 \"메시지 추가\": 입력 라벨 \"호출 단어\", placeholder \"예: 앞치마, 냅킨, 빨대\", <b>최대 10자</b>(<code>maxlength=10</code>) + 실시간 \"N/10자\" 카운터, 안내 \"💡 한눈에 보이도록 짧은 단어로 적어 주세요. 예: 물, 수저, 계산, 메뉴 추천\". 버튼 [취소] / [추가하기].",
    "추가 확정(<code>confirmAddStaffMsg</code>) 시 <code>{id, body, enabled:true, sort}</code> 신규 항목 push, 모달 닫고 토스트 \"✅ 직원 호출 메시지를 추가했어요\". 신규 메시지 기본 <code>enabled=true</code>.",
    "메시지·토글·순서 변경은 모두 미저장 상태로 표시(<code>markUnsavedUI</code>) 후 저장으로 확정."
   ],
   "data": [
    "바인딩: <code>StaffCallMessage[{id, body, enabled, sort_order}]</code>(DATA_MODEL §6.2). 목업 <code>STAFF_CALLS.messages[{id, body, enabled, sort}]</code>. <code>callHistory[]</code>는 <code>StaffCallEvent</code>.",
    "<code>body</code>: string, NN, <b>최대 10자</b>(입력 maxlength=10) — DATA_MODEL §6.2 string(10)과 일치. 공백만 입력 불가.",
    "개수 한도: <b>최대 15개</b>로 확정(<code>MAX_MSG=15</code>). DATA_MODEL §6.2도 15개로 정정 반영 완료.",
    "메시지 <code>enabled</code> 토글과 전역 <code>StaffCallConfig.enabled</code>는 별개: 전역 ON이어도 모든 메시지가 OFF면 손님 화면에 노출할 항목이 없다.",
    "권한: 메시지 추가·수정·삭제·순서·사용 토글은 owner 전용(핀 정의·SPEC §1.6). staff는 내역 열람·처리까지만."
   ],
   "exception": [
    "활성 메시지가 0개면(모든 메시지 OFF) 안내 표시: ℹ️ \"<b>메시지를 1개 이상 켜면 손님 화면에 호출 버튼이 보여요.</b>\" (공포·부정 표현 없이 가능형 — spec/08-common §3.2).",
    "메시지가 1개만 남았을 때 삭제(✕) 시도 시 차단 alert: \"최소 1개의 메시지가 필요해요.\" (마지막 1개는 삭제 불가).",
    "추가 모달에서 내용 미입력(공백) 후 [추가하기] 시 alert \"내용을 입력해 주세요.\". 이미 15개일 때 추가 시도 시 alert \"메시지는 최대 15개까지 추가할 수 있어요.\"",
    "전역 토글 OFF 상태에서는 이 탭 전체가 빈 상태(핀 2 참조)로 대체되어 메시지 편집 UI가 숨겨진다."
   ]
  },
  "4": {
   "purpose": [
    "<b>최근 호출 내역 · 처리 영역</b>: 매장에 들어온 직원 호출을 시각·테이블·요청 내용·처리 상태로 나열하고, 사후 처리(완료/완료 취소)를 기록한다.",
    "패널 제목 \"최근 호출 내역\", 부제 \"총 N건 · 처리 대기 N건 · 24시간 보관 후 자동 삭제\". 컬럼: <code>#</code> · <code>호출 시각</code> · <code>테이블</code> · <code>호출 내용</code> · <code>상태</code> (헤더 클릭 정렬).",
    "실제 즉시 응대는 매장 PC 에이전트 팝업에서 이뤄지고(STATES §7.1), 이 표는 현황 모니터링과 누락 보정용."
   ],
   "behavior": [
    "<code>#</code> 번호는 <b>호출 인입 순서</b>(가장 먼저 들어온 호출이 #1). <code>called_at</code> 오름차순으로 번호를 부여한 뒤 정렬 상태에 따라 표시.",
    "<b>대기 행</b>(<code>completedAt=null</code>): \"⏱ 대기 중\" 라이브 표시 + <b>[처리 완료]</b> 버튼(파랑). 클릭(<code>scCompleteCall</code>) 시 <code>completedAt=now</code> 기록, 상태=완료로 전환, 대기 배지 -1.",
    "<b>완료 행</b>: \"✓ 처리 완료 · 완료시각(HH:MM)\" + <b>[↺ 완료 취소]</b> 버튼(고스트, 툴팁 \"실수로 눌렀다면 완료를 취소할 수 있어요\"). 클릭(<code>scUndoComplete</code>) 시 <code>completedAt=null</code>로 <b>대기 상태 원복</b>.",
    "<b>정렬</b>: 컬럼 헤더 클릭으로 정렬 키·방향 토글(<code>setStaffCallHistSort</code>). 정렬 키: no·calledAt·table·body·status(0=대기,1=완료). 기본 정렬 <code>{key:'no', dir:'desc'}</code>(최신 인입 위). 활성 컬럼에 ▲/▼, 비활성 ⇅ 표시.",
    "표시 범위: 24시간 보관 — 오늘 + 어제(자정 이후 기준) <code>calledDate</code> 데이터만 노출. 어제 항목은 시각 위에 날짜(YYYY.MM.DD) 작게 표기.",
    "하단 도움말 \"💡 컬럼 제목을 클릭하면 정렬 방향이 바뀌어요. 호출 내역은 오늘 들어온 항목만 보여 드리고, 자정 이후엔 자동으로 비워져요.\""
   ],
   "data": [
    "바인딩: <code>StaffCallEvent(id, table_id→table, message_id→body, called_at, resolved_at, resolved_by, handling_seconds)</code>(DATA_MODEL §6.3). 목업 <code>STAFF_CALL_HISTORY[{id, table, body, calledDate, calledAt, completedAt}]</code>.",
    "처리 완료 시 <code>resolved_at=now</code>, <code>resolved_by=user_id(staff)</code>, <code>handling_seconds = resolved_at - called_at</code> 사전 계산(STATES §7.1).",
    "<code>handling_seconds</code>는 어드민 통계의 <b>평균 처리 시간</b>(<code>avg(handling_seconds) where resolved_at IS NOT NULL</code>, 당일 영업일 기준)에 즉시 반영(DATA_MODEL §6.3, STATES §7.1).",
    "테이블 표시값은 \"테이블 관리\" 화면의 테이블명(예: T05, 바01)과 연동. 영업일 기준 03:00 시작(SPEC §1.1)으로 \"오늘/자정\" 경계 판정."
   ],
   "exception": [
    "내역 0건일 때 빈 상태: \"오늘 아직 들어온 호출이 없어요.\"(능동·긍정 톤).",
    "<b>24시간 보관·자동 만료</b>: 영업일 마감(자정/03:00 영업일 경계) 이후 지난 영업일 데이터 자동 비움. 마감 시점 미처리 호출은 자동 만료(<code>resolved_at=영업일 종료 시각</code>, <code>resolved_by=null</code>)되며 평균 처리 시간 통계에서 제외(STATES §7.3).",
    "<b>미처리 10분 경과</b>: <code>resolved_at IS NULL</code>이고 <code>called_at</code>+10분 초과 시 사장에게 알림 \"처리되지 않은 호출이 있어요\" + 어드민 상단 빨간 배지(STATES §7.3).",
    "<b>중복 호출 디바운스</b>: 같은 (table_id, message_id)가 <code>debounce_seconds</code>(기본 30초) 내 재호출되면 DB 미기록(내역에 안 뜸), 손님 화면 토스트 \"방금 호출했어요. 잠시 기다려 주세요\"(STATES §7.2).",
    "[완료]/[완료 취소]는 표시 순번(#)이 아닌 이벤트 <code>id</code> 기준으로 동작하므로 정렬·재번호와 무관하게 정확한 행을 갱신한다."
   ]
  }
 },
 "menu": {
  "1": {
   "purpose": [
    "<b>메뉴 관리 5개 하위 화면 전환 탭바</b>(<code>menuNavTabs()</code>) — 같은 '메뉴 관리' 그룹 내에서 <b>메뉴판 / 옵션 선택지 / 카테고리 / 세트 / 원산지·알레르기 정보</b> 사이를 이동한다 (spec/02-menu §0.1).",
    "각 탭이 다루는 데이터 원본을 분리: 메뉴판=<code>MENUS</code>, 옵션=<code>OPT_GROUPS</code>, 카테고리=<code>CAT_MENU</code>, 세트=<code>SETS</code>, 원산지=<code>STORE_ORIGIN</code>.",
    "사장님이 현재 어느 영역을 보고 있는지와 각 영역의 등록 규모를 한눈에 파악하게 한다."
   ],
   "behavior": [
    "탭 클릭 시 <code>setSection('menu'|'option'|'category'|'set'|'origin')</code> 호출 → 해당 섹션으로 라우팅(별도 render 함수). 핀 번호 n=1 대상은 탭바 전체.",
    "<b>현재 탭 강조</b>: <code>state.section===t.key</code>인 탭에 <code>.on</code> 클래스(파란 강조) 부여.",
    "<b>건수 배지</b>(<code>.mnav-cnt</code>): 메뉴판·옵션·카테고리·세트 탭에만 표시하며 각각 <code>MENUS.length</code> / <code>OPT_GROUPS.length</code> / <code>CAT_MENU.length</code> / <code>SETS.length</code> 실시간 값. 원산지 탭은 <code>cnt</code> 미정의라 배지 없음.",
    "탭 구성·아이콘·라벨: 🍽️ 메뉴판 · 🧩 옵션 선택지 · 🗂️ 카테고리 · 🎁 세트 · 🌿 원산지·알레르기 정보. 순서 고정."
   ],
   "data": [
    "라벨/아이콘/카운트 소스는 <code>tabs[]</code> 배열(렌더 시 즉시 계산). 배지는 별도 API 없이 각 컬렉션 length로 파생.",
    "탭 전환은 클라이언트 라우팅(섹션 key)이며 데이터 재조회 트리거. 실서비스에서는 각 key가 별도 화면/엔드포인트.",
    "5개 영역의 데이터 모델은 <code>DATA_MODEL.md</code> §2(메뉴/옵션/카테고리/세트/원산지) 참조."
   ],
   "exception": [
    "빈 매장이라도 탭바는 항상 노출(배지 0 표시). 0건도 부정형 회피 — 빈 상태 안내는 각 섹션 본문에서 처리.",
    "권한과 무관하게 탭 이동 자체는 owner/staff 모두 허용(개별 동작 권한은 각 화면에서 제어 — SPEC §1.6.2).",
    "원산지 탭은 건수 배지를 의도적으로 표시하지 않음(자유 텍스트/행 수가 운영상 의미가 약함)."
   ]
  },
  "2": {
   "purpose": [
    "<b>메뉴 한 개를 정식(상세)으로 등록</b>하는 진입점. 실제 UI 라벨은 <b>'📝 메뉴 등록 — 한 개씩 정식으로'</b> 카드(<code>.menu-reg-card</code>), 보조문구 \"사진·분류·옵션·포장가까지 메뉴 한 개의 모든 정보를 입력해 바로 등록해요.\"",
    "사진·카테고리·분류 태그·연결 옵션·포장가·판매상태·설명·1회 최대수량 등 메뉴의 <b>모든 필드</b>를 한 번에 입력하는 경로 — 간편(일괄) 등록과 의도적으로 분리된 독립 공간.",
    "신규 메뉴 정보의 정합성(검증·기본값)을 보장하는 1차 입력 지점."
   ],
   "behavior": [
    "<b>+ 메뉴 등록</b> 버튼 클릭 → <code>openMenuDetailNewModal()</code>로 신규 입력 모달 오픈(편집 모달 <code>renderMenuEditModal</code>과 동일 폼, 신규 모드).",
    "모달 입력 순서: 사진 → 메뉴 이름(필수) → 매장 판매가(필수)/포장가(선택) → 카테고리(필수, <code>+ 새 카테고리</code>) → 🏷️ 분류 태그 ①②③(선택·손님 미노출) → 판매 상태 → 설명 → 1회 주문 최대 수량 (spec/02-menu §1.5.3).",
    "실시간 검증: 필수 미충족 시 저장 버튼 비활성. 저장 성공 시 <code>MENUS</code>에 push, success 토스트 + dirty 해제 + 신규 행 플래시(<code>_flashMenuId</code>).",
    "신규 행 기본값: <code>status='판매중'</code>, <code>opt=[]</code>, <code>takeoutPrice=null</code>, <code>maxQty=null</code>, <code>img=''</code>(저장 시 빈값이면 🍽️ 대체 가능)."
   ],
   "data": [
    "<code>name</code> string(1~30) 필수, 빈 값 불가. <code>price</code> int 필수, 0 이상~1억 미만 정수. <code>takeoutPrice</code> int|null(매장가보다 비싸면 저장 전 확인). <code>cat</code>는 <code>CAT_MENU.name</code> 참조 필수.",
    "<code>code</code>(상품코드): <b>영문 대문자 1자(M) + 숫자 5자리 = 6자</b>, 매장 내 유니크(메뉴·옵션·세트 공통 풀), ⚙️ <code>genCode('M')</code> 자동생성 또는 직접 지정 (spec/02-menu §1.2.2, SPEC 08 §5.3).",
    "손님 미노출 내부 필드: <code>catL2/catL3/tag3</code>(어드민 검색·필터 전용, 편집 모달에서 datalist 자동완성). 노출/미노출 기준은 §1.3.",
    "저장 결과는 핀4 '등록된 메뉴 목록'에 즉시 반영, 가격은 다음 주문부터 적용(진행 중 주문은 <code>unit_price_snapshot</code> 유지 — STATES §9)."
   ],
   "exception": [
    "검증 실패 시 해당 필드 빨간 라인 + 인라인 메시지, 저장 버튼 비활성: \"메뉴 이름을 입력해 주세요.\" / \"매장 판매가는 0원 이상이어야 해요.\" (spec/02-menu §1.6).",
    "메뉴명 중복은 <b>차단하지 않고</b> 저장 전 확인: \"…이미 있어요. 그래도 저장할까요?\"",
    "포장가가 매장가보다 비싸면 확인: \"보통은 포장이 더 저렴해요…\". 비우면 <code>null</code>(매장가 동일 적용).",
    "가격 입력·수정은 owner만(staff는 비활성 + 툴팁 \"사장님 권한이 필요해요\"), 사진·설명·카테고리는 staff도 가능 (SPEC §1.6.2)."
   ]
  },
  "3": {
   "purpose": [
    "<b>여러 메뉴를 표(행)로 빠르게 일괄 등록</b>하는 접이식 영역(<code>.bulk-collapse</code>). 실제 UI 라벨 <b>'⚡ 간편 등록 — 여러 메뉴를 행으로 빠르게'</b>.",
    "이름·가격 등 최소 항목만 빠르게 입력해 다수 메뉴를 한 번에 올리는 경로. 사진·옵션 등 상세는 등록 후 개별 편집(핀2/핀4)으로 보완.",
    "오프라인 메뉴판을 옮겨 적거나 엑셀 양식으로 대량 등록할 때의 대량 입력 진입점."
   ],
   "behavior": [
    "헤더 클릭으로 펼침/접힘 토글(<code>state.menuBulkOpen</code>, 화살표 ▼/▶). 닫힌 상태 보조문구 \"클릭해서 펼친 뒤 행을 추가하면 이름·가격만 빠르게 입력할 수 있어요…\", 작성 중이면 \"작성 중 · N개 행 · 저장 전엔 손님 화면에 안 보여요\".",
    "<b>+ 메뉴 행 추가</b>(<code>addMenuBulkRow</code>) → 기본값 행 추가: <code>{code:'',name:'',price:0,takeoutPrice:null,cat:'',desc:'',img:'',status:'판매중'}</code>. <b>전체 행 삭제</b>는 확인 후 비움.",
    "행별 입력: 상품코드(⚙️ <code>genCode('M')</code> 자동, 입력값 자동 대문자화), 메뉴 이름(필수), 매장 판매가(필수), 포장가(비우면 매장가), 카테고리(미지정 허용), 설명, 사진(클릭 시 <code>SAMPLE_ICONS</code> 순환), 상태, ✕ 행 삭제.",
    "<b>저장</b>(<code>saveMenuBulk</code>): <code>name && price>=0</code>인 행만 <code>MENUS</code>에 추가, 코드 미입력 시 자동생성, 카테고리 미지정 시 첫 카테고리 또는 '미분류'. 저장 후 행 비우고 토스트 \"새 메뉴 N개를 저장했어요\".",
    "<b>📊 엑셀로 한 번에 등록</b>(<code>openMenuExcelModal</code>): 엑셀 양식 다운로드 후 작성→업로드 일괄 import. 컬럼 순서는 코드·이름·매장가·포장가·카테고리·설명·상태·최대수량·대/중/소분류."
   ],
   "data": [
    "일괄 행 상태 옵션은 <b>판매중 / 숨김 2가지만</b>(품절은 등록 단계 선택 불가 — §1.4). 일괄 입력은 <code>state.menuBulkRows[]</code>에 임시 보관되며 저장 전 <code>MENUS</code> 미반영.",
    "행별 검증: 이름 필수, 가격 0 이상 정수. 빈 이름 행은 저장 시 자동 스킵. 포장가 빈칸→<code>null</code>.",
    "엑셀 import 양식 컬럼은 export(<code>menuExportRows</code>)와 동일 → 받은 파일 수정 후 재업로드 가능. import는 확인 후 정책에 따라 추가/덮어쓰기.",
    "중복 상품코드는 자동 회피/경고(매장 내 유니크 풀 유지)."
   ],
   "exception": [
    "행 0건 시: \"아래 <b>+ 메뉴 행 추가</b>를 눌러 첫 메뉴를 입력해 주세요.\"",
    "이름 입력 없이 저장: \"메뉴 이름을 입력해 주세요. (가격은 0원도 가능해요)\" (가격 0원 허용 — 무료/증정 메뉴 대비).",
    "엑셀 파싱 실패: \"파일 형식을 확인해 주세요.\" (spec/02-menu §1.7).",
    "저장 전 행은 손님 화면 미노출(임시 상태) — 보조문구로 명시. import 전체 덮어쓰기 시 확인 모달 필수."
   ]
  },
  "4": {
   "purpose": [
    "<b>등록된 모든 단품 메뉴의 목록 표</b>(<code>.menu-saved-panel</code>)이자 메뉴 운영의 중심. 컬럼: 선택 · 순서(≡·ⓘ) · 사진 · 상품코드 · 메뉴명(+'최대 N개' 배지+설명) · 카테고리 · 매장 판매가(+해피아워) · 포장가(없으면 '매장가 동일') · 오늘 준비량(남은/준비+진행바) · 판매 시간 · 연결된 옵션 · 상태(pill) · 추가 설정 ▼.",
    "행 클릭으로 정보·가격을 수정하고, 순서를 손님 메뉴판과 동일하게 정렬하며, 필터·검색·정렬·페이징·내보내기·일괄작업을 제공.",
    "손님 메뉴판에 노출되는 메뉴 데이터의 단일 원본(순서 포함)."
   ],
   "behavior": [
    "<b>행 클릭</b> → <code>openMenuEditModal(id)</code> 정보·가격 수정 모달. <b>추가 설정 ▼</b>(<code>state.menuActionOpen</code>): 메뉴 정보·가격 수정 / 🧩 옵션 그룹 연결(<code>openOptLinkModal</code>) / 🕒 판매 시간(<code>openScheduleModal</code>) / 🔥 해피아워 할인(<code>openDiscountModal</code>) / 📋 복제하기(<code>duplicateMenu</code>) / ✕ 삭제(<code>deleteMenu</code>).",
    "<b>순서 변경</b>: ≡ 손잡이 드래그&드롭(손님 메뉴판 순서와 동일), ⓘ 클릭 시 <code>showOrderHelp()</code> 안내. 순서는 last-write-wins (SPEC §1.7).",
    "<b>헤더 정렬</b>(<code>sortMenu</code>): 순서/메뉴명/카테고리/매장가/포장가/오늘준비량/상태 토글(asc↔desc, 문자열은 ko 로케일). <b>필터</b>: 카테고리 칩, 판매상태 칩(전체·판매중·품절·숨김), 분류태그 대/중/소 드롭다운, 검색어(메뉴명·상품코드·분류태그) → <code>applyMenuFilters</code>/<code>resetMenuFilters</code>.",
    "<b>페이징</b>: 한 페이지 10/20/50/100개(<code>menuRowsPerPage</code>, 기본 20) + 페이지 이동(« ‹ 1..5 › »). <b>오늘 준비량 셀</b> 클릭 → <code>setSection('stock')</code> 이동.",
    "<b>체크박스 일괄작업</b>(<code>menuSel</code>): 📋 복제 / 💰 가격 조정(<code>openBulkPriceModal</code>) / 🗂️ 카테고리 이동(<code>openBulkCatModal</code>) / ✕ 삭제(<code>bulkDeleteMenus</code>) / 선택 해제. <b>📥 엑셀·CSV 받기</b>(<code>openMenuExport</code>) → xlsx/csv 택1 다운로드, export 컬럼=import 양식과 동일."
   ],
   "data": [
    "원본 <code>MENUS[]</code>. 표시값은 <code>ensureMenuExtras(r)</code>로 기본값 보강, 상태는 <code>effectiveStatus(r)</code> 합성, 가격은 해피아워 적용 시 <code>discountAmt</code> 반영.",
    "오늘 준비량 셀은 <code>getMenuStock(id)</code>(<code>MENU_STOCK</code>) 연동: 남은/준비+진행바, 잔여 0이면 '🔴 오늘 완료', 임계(<code>lowAlert</code>) 이하면 '⚠️ 곧 품절'.",
    "가격 변경은 다음 주문부터 적용, 진행 중 주문은 스냅샷 가격(<code>unit_price_snapshot</code>) 유지 (STATES §9). 순서 변경은 last-write-wins (SPEC §1.7).",
    "내보내기 <code>menuExportRows</code> 컬럼: code·name·price·takeoutPrice·cat·desc·status·maxQty·catL2·catL3·tag3. 정렬/검색/페이징 공통 규칙 SPEC §2.6.",
    "삭제 시 연결 데이터 정리(<code>cleanupAfterMenuDelete</code>): <code>OPT_GROUPS.links</code>, <code>MENU_STOCK.items</code>, <code>SETS…candidates</code>에서 해당 메뉴 참조 제거(기본 후보 비면 다른 후보 승격)."
   ],
   "exception": [
    "등록 0건: \"위 <b>✏️ 새 메뉴 입력</b>을 펼쳐 첫 메뉴를 등록해 주세요. 또는 <b>📤 엑셀로 한 번에 올리기</b>로 여러 개를 한 번에 올릴 수 있어요.\" / 필터 0건: \"카테고리·판매 상태·검색어를 다시 살펴봐 주세요.\" (§1.7).",
    "<b>가격을 30% 이상 변경하면</b> 오타 방지 확인 모달: \"가격이 크게 바뀌어요. 정말 이 가격으로 저장할까요?\" (STATES §9).",
    "삭제 확인: \"'{메뉴명}' 메뉴를 삭제할까요? 오늘의 준비량·세트 후보·옵션 연결도 함께 정리돼요.\" 삭제 후 후보가 빈 세트가 있으면 안내: \"…다음 세트의 구성이 비었으니 새 후보를 추가해 주세요\".",
    "권한: 가격 수정·일괄 가격 조정은 owner만(staff 비활성+툴팁 \"사장님 권한이 필요해요\"), 사진·설명 수정·카테고리 이동·추가·삭제·옵션/세트 연결은 staff도 가능 (SPEC §1.6.2).",
    "미연결 옵션 행은 \"옵션을 연결해 주세요\", 포장가 미입력은 '매장가 동일', 사진 없으면 셀에 '없음' 표기(능동·긍정 톤)."
   ]
  },
  "5": {
   "purpose": [
    "표 각 행의 <b>상태(pill) 셀</b> — 메뉴가 지금 손님에게 어떻게 보이는지를 합성한 <b>효과적 상태(<code>effectiveStatus</code>)</b>를 표시·전환한다: 판매중 / 수동 품절(일시·완전) / 자동 품절 / 숨김.",
    "단일 진실의 상태값으로 손님 노출(노출·회색·숨김)을 제어하고, 사장님이 '오늘 품절' 등 당일 운영 조치를 즉시 취하게 한다.",
    "여러 상태 입력(<code>status</code>·<code>manualSoldOut</code>·재고)을 우선순위로 하나의 결과로 정리해 혼선을 막는다."
   ],
   "behavior": [
    "<b>우선순위(먼저 맞는 것 적용)</b>: ① <code>manualSoldOut=true</code> → 수동 품절(<code>soldOutKind</code> temp=일시/full=완전) ② <code>stock!=null && sold>=stock</code> → 자동 품절(준비량 소진) ③ <code>status='숨김'</code> → 숨김 ④ <code>status='품절'</code> → 품절(레거시) ⑤ 그 외 → 판매중 (spec/02-menu §1.4, SPEC §2.3).",
    "<b>'오늘 품절' 토글</b>: 당일만 판매 차단(<code>manualSoldOut</code> ON). 추가 설정의 품절/준비량 흐름과 연동. 일시/완전 품절(<code>soldOutKind</code>) 선택 가능.",
    "어드민 pill 매핑: 판매중=<code>done</code>(초록), 품절(일시/완전)=<code>partial</code>/<code>cancel</code>, 숨김=<code>hold</code>(회색).",
    "판매 시간(<code>schedule</code>) 미충족 시간대에는 판매중이라도 손님 화면 회색 처리(상태 pill과 별개 노출 규칙)."
   ],
   "data": [
    "필드: <code>status</code> enum(판매중|품절|숨김, 기본 판매중), <code>manualSoldOut</code> bool(기본 false), <code>soldOutKind</code> enum(temp|full, 기본 temp), <code>stock</code>/<code>sold</code>(int|null/int) — <code>MENU_STOCK</code> 연동.",
    "<b>새 영업일(03:00 시작, SPEC §1.1) 시작 시 <code>manualSoldOut</code> 자동 해제</b> → 다음날 자동 재판매 (SPEC §2.5, spec/02-menu §1.2.3).",
    "확정 데이터 모델에서는 <code>status</code>를 available/hidden 2값 + 품절은 <code>manualSoldOut</code>·재고 파생으로 정규화 권장, 레거시 '품절'은 <code>manualSoldOut=true</code>로 마이그레이션 (spec/02-menu §7-1, SPEC §2.3).",
    "이 상태는 손님 주문 화면 렌더 분기의 직접 입력값(§1.3)."
   ],
   "exception": [
    "손님 화면 노출 규칙(SPEC §2.4): 판매중+시간충족=정상 선택 가능 / 판매시간 외=회색+'판매 시간 아니에요'(선택 불가) / 수동·자동 품절=회색+'품절' 라벨(선택 불가) / <b>숨김=목록에서 제외(아예 미표시)</b>.",
    "품절은 목록에 남되 선택 불가(회색), 숨김은 손님 화면에서 완전 제외 — 두 개념 혼동 금지.",
    "자동 품절은 준비량이 다시 채워지면 자동 해제(재고 연동), 수동 품절은 새 영업일 또는 사장님 해제 시까지 유지.",
    "운영 중지(<code>paused</code>)된 카테고리 소속 메뉴는 상태와 무관하게 손님 화면에서 빠짐 (카테고리 화면 §3, 안내 \"…자동으로 빠지거나 회색 처리돼요\")."
   ]
  },
  "6": {
   "purpose": [
    "화면 하단 <b>포장가 안내 배너</b>(<code>.banner-info</code>) — 매장 판매가와 포장가를 따로 정할 수 있음을 알리는 보조 안내.",
    "포장가 미입력 시 동작(매장가와 동일 적용)을 사장님이 사전에 이해하도록 돕는다.",
    "포장 채널 가격 정책의 기대치를 명확히 해 입력 누락으로 인한 오해를 줄인다."
   ],
   "behavior": [
    "항상 노출되는 정적 정보 배너(토글·클릭 동작 없음). 노출 문구: \"💡 <b>매장 판매가</b>와 <b>포장가</b>를 따로 정할 수 있어요. 포장가가 비어 있으면 매장가와 같은 가격으로 손님에게 노출돼요.\"",
    "포장가가 비어 있으면(<code>null</code>) 포장 주문 시 매장가를 그대로 적용.",
    "메뉴 편집 모달에서 <b>포장 할인 OFF</b>(주문 방식 설정)일 때는 포장가 입력란 위 경고 배너 + '설정 →' 링크로 주문 방식 화면 이동(연동)."
   ],
   "data": [
    "<code>menu.takeoutPrice</code> int|null(기본 <code>null</code>). 0 이상, 매장가보다 비싸면 저장 전 확인 (spec/02-menu §1.2.1).",
    "노출 규칙(§1.3): 포장 채널에서만 적용, <code>null</code>→매장가, <b>주문 방식에서 포장 할인 OFF면 미적용(매장가로 노출)</b>.",
    "제품 노트: 포장가 자체는 주문 채널·결제 시점 가격 산정의 입력일 뿐, 주문 취소 vs 결제 취소 구분과 무관(취소 구분은 <code>Payment.status=paid</code> 여부로 판단)."
   ],
   "exception": [
    "가능형·긍정 톤 유지: \"따로 정할 수 있어요\"(명령형 회피).",
    "포장가를 매장가보다 높게 입력 시 확인 안내: \"보통은 포장이 더 저렴해요…\"(차단 아님).",
    "포장 할인 OFF 상태에서는 입력해 둔 포장가가 적용되지 않으므로, 편집 모달 경고 배너로 사유와 '설정 →' 경로를 함께 노출(연동 화면: 주문 방식)."
   ]
  }
 },
 "table": {
  "1": {
   "purpose": [
    "<b>테이블 관리 화면 전체</b>의 목적·진입점·산출물 정의. 사장님(owner) 또는 직원(staff)이 매장 좌석 구조를 구역(층)별로 배치하고 각 테이블의 이름·모양을 관리하는 마스터 데이터 편집 화면이다.",
    "여기서 생성된 테이블은 <b>테이블 QR을 자동 발급</b>하는 원천이며(QR 관리 화면 핀4 연동), 손님이 QR을 찍어 주문할 좌석 단위가 된다.",
    "URL: <code>admin.qrorder.softment.co.kr/tables</code>. 좌측 메뉴 그룹 '매장 운영' › '테이블 관리'(icon 🪑, ord 7). 페이지 부제: \"구역별로 테이블을 배치하고, 영업 마감 후 저장하면 반영돼요.\"",
    "위치 변경(드래그 배치)은 <b>안전을 위해 영업 마감 후에만 저장</b>되어 영업 중 손님 주문 매핑 혼선을 방지한다. 이름·모양 변경은 영업 중에도 즉시 가능."
   ],
   "behavior": [
    "툴바 우측 액션 3개: <code>영업중/영업마감 상태 토글</code>(목업에선 데모용 토글 — 실제로는 매장 영업상태에서 read-only 바인딩), <code>[+ 테이블 추가]</code>, <code>[저장]</code> 버튼.",
    "저장 버튼은 미저장 위치 변경(<code>_pendingTablePos</code>)이 0건이면 라벨 '저장'(btn-ghost), 1건 이상이면 '저장 (N건 변경)'으로 바뀌고 강조(pulse) 애니메이션.",
    "기본값: 화면 진입 시 <code>currentZone</code>이 없거나 삭제된 경우 첫 구역으로 설정. <code>storeIsOpen</code> 초기값 true(영업 중).",
    "<b>저장 동작</b>: 영업 마감 상태 + 변경 1건 이상일 때만 확인 모달 → '저장' 시 <code>_pendingTablePos</code>의 좌표를 <code>TABLES[].x/y</code>에 영구 반영하고 pending 초기화. 저장 후 <b>이전 배치로 되돌릴 수 없음</b>(undo 미제공).",
    "화면 구성 순서(위→아래): 크럼브 → 툴바 → 영업상태 배너(핀2) → 구역 탭(핀3) → 평면도 패널(핀4) → 테이블 목록 패널(핀5)."
   ],
   "data": [
    "엔터티 <code>ZONE</code>: <code>{id:int, name:string}</code>. 엔터티 <code>TABLE</code>: <code>{id:int, name:string, zone:int(FK ZONE.id), shape:'square'|'circle', x:int, y:int, status:'비어있음'|'사용중', orderCnt:int}</code>. status·orderCnt는 운영(주문) 연동 read 필드로 본 화면에서 직접 편집하지 않음.",
    "신규 테이블 <code>id</code>는 기존 최대 id+1, <code>name</code> 기본값 <code>'T'+id 2자리 zero-pad</code>(예: T07), shape 기본 'square', 좌표는 현재 구역 테이블 개수 기준 4열 그리드 자동 배치(x=20+col*100, y=20+row*110).",
    "테이블 추가/삭제 시 <b>테이블 QR 자동 발급/회수</b>(QR 관리 연동, SPEC §3.6.4). 구역·테이블 수는 QR 관리의 테이블 QR 개수 배지와 1:1 일치.",
    "API 성격: 구역 CRUD, 테이블 CRUD, 배치 저장(좌표 일괄 PATCH)은 각각 멱등 트랜잭션. 좌표 일괄 저장은 §1.7 last-write-wins(메뉴 순서 변경과 동일 정책).",
    "권한 플래그: owner는 전 기능, staff는 정렬·이름 변경만(SPEC §1.6.2). 영업상태는 매장 마스터의 영업시간/영업일(§1.1)에서 파생."
   ],
   "exception": [
    "staff 접근 시: 추가/삭제/구역관리/모양변경/드래그 저장 버튼 비활성 + 툴팁 \"사장님 권한이 필요해요\"(§1.6.2). 이름 변경만 활성.",
    "빈 상태(테이블 0개): 평면도·목록 각각 빈 상태 안내(핀4·핀5 문구) 노출.",
    "저장 성공 토스트는 §08-common 토스트 패턴 따름. 저장 실패(네트워크/충돌) 시 \"잠시 후 다시 시도해 주세요\" 에러 토스트 + pending 유지(데이터 손실 방지).",
    "다른 섹션 이동 시 미저장 변경(pending)이 있으면 §2.8 확인 prompt \"변경 사항을 버리고 이동할까요?\" 노출 권장."
   ]
  },
  "2": {
   "purpose": [
    "<b>영업 중 위치 변경 제한 배너</b>. 현재 영업 상태를 시각적으로 알리고, 왜 드래그 저장이 막히는지(또는 풀리는지) 사장님이 즉시 이해하도록 한다.",
    "안전장치 안내: 영업 중 좌석 매핑이 바뀌면 진행 중 주문이 엉킬 수 있어 마감 후 저장으로 강제한다는 정책을 전달."
   ],
   "behavior": [
    "<b>영업 중일 때</b>: 노란 경고 배너 노출 — \"🟢 현재 <b>영업 중</b>이에요. 테이블 위치 변경은 <b>영업 마감 후</b>에만 가능해요.\" 평면도 드래그·저장 모두 차단.",
    "<b>영업 마감 + 미저장 변경 1건 이상일 때</b>: 초록 안내 배너로 전환 — \"🔴 영업 마감 상태예요. 변경된 배치(<b>N건</b>)를 저장할 수 있어요.\"",
    "영업 마감 + 변경 0건일 때: 배너 미노출(정상 작업 가능 상태).",
    "상태 전이: 영업중(잠금) → 마감(편집 가능). 토글/영업상태 변경 시 즉시 리렌더되어 배너·평면도 활성도 갱신."
   ],
   "data": [
    "바인딩: <code>state.storeIsOpen</code>(boolean). 실제 구현에서는 매장 영업시간·영업일(SPEC §1.1, 03:00 영업일 시작)과 현재 시각으로 파생되는 read-only 값.",
    "미저장 건수: <code>Object.keys(_pendingTablePos).length</code>로 배너 문구의 N 치환.",
    "영업상태와 영업일은 별개(§1.1) — 배너는 '영업시간 내 여부'(손님 주문 가능 여부) 기준."
   ],
   "exception": [
    "영업 중 평면도 테이블을 드래그 시도하면 모달 \"영업 마감 후에 배치를 바꿀 수 있어요\" + 본문 \"🟢 지금은 영업 중이에요. 테이블 위치는 영업 마감 후에 바꿀 수 있어요.\"",
    "영업 중 저장 버튼 클릭 시 모달 \"영업 마감 후에 저장할 수 있어요\" + 본문 \"테이블 배치는 영업 마감 후에 저장할 수 있어요.\"",
    "이름·모양 변경은 이 배너의 잠금 대상이 아님 — 영업 중에도 허용(즉시 반영)."
   ]
  },
  "3": {
   "purpose": [
    "<b>구역(층) 관리</b>. 1층/2층/테라스/룸 등 매장 공간을 구역 단위로 나눠 추가·전환·삭제한다. 테이블은 반드시 한 구역에 소속된다.",
    "탭으로 현재 편집 중인 구역을 전환하며, 평면도·목록은 선택된 구역의 테이블만 표시."
   ],
   "behavior": [
    "구역 탭: 각 탭에 구역명 + 해당 구역 테이블 개수(예: '1층 5개'). 클릭 시 <code>currentZone</code> 변경 후 리렌더. 활성 탭은 파란색 + 하단 보더 강조.",
    "<code>[+ 구역 추가]</code>: 클릭 시 모달 \"구역 추가 / 새 구역 이름을 입력해요 (예: 2층, 테라스, 룸A) · 현재 N/10\". 입력 후 '추가'하면 신규 구역 생성·자동 전환. 라벨에 현재 개수 표시 \"+ 구역 추가 (N/10)\".",
    "<b>최대 10구역</b>. 10개 도달 시 라벨 \"+ 구역 추가 (최대 10개)\" + 비활성(회색).",
    "<code>현재 구역 삭제</code>: 구역이 2개 이상일 때만 탭 우측에 빨간 텍스트로 노출. 삭제 시 확인 모달 → 확정하면 구역과 소속 테이블 전부 삭제 후 첫 구역으로 이동.",
    "기본값: 초기 구역은 '1층'(id1), '2층'(id2) 2개."
   ],
   "data": [
    "<code>ZONE_LIST[{id,name}]</code>. 신규 id는 기존 최대 id+1. 구역명 검증: trim 후 빈 값 불가(중복명 검증은 1차 미적용 — 추가 권장).",
    "구역 삭제 시 소속 <code>TABLES[].zone===id</code> 전부 삭제 + 해당 테이블의 <code>_pendingTablePos</code> 정리. 삭제된 테이블의 <b>테이블 QR도 함께 회수</b>(QR 관리 연동).",
    "탭 개수 배지 = <code>TABLES.filter(zone===z.id).length</code> 실시간 집계.",
    "권한: 구역 추가·삭제는 owner 전용(staff 불가 — §1.6.2 'staff는 정렬·이름 변경만')."
   ],
   "exception": [
    "구역명 미입력 시 alert \"구역 이름을 입력해 주세요.\" (모달 추가 버튼) / \"구역 이름을 입력해 주세요.\"",
    "10개 초과 추가 시 alert \"구역은 최대 10개까지 추가할 수 있어요.\"",
    "마지막 1개 구역 삭제 시도 시 alert \"구역이 1개일 때는 삭제할 수 없어요.\"",
    "구역 삭제 확인 모달: \"⚠️ <b>OO</b> 구역의 테이블 <b>N개</b>도 모두 삭제돼요. 이 작업은 되돌릴 수 없어요.\" — '취소' / '삭제'(빨강). 삭제 후 토스트 \"🗑️ 'OO' 구역을 삭제했어요\".",
    "추가 성공 토스트 \"✅ 'OO' 구역을 추가했어요\". 모달은 ESC·배경 클릭으로 닫힘(§2.7)."
   ]
  },
  "4": {
   "purpose": [
    "<b>평면도(드래그 배치)</b>. 선택된 구역의 테이블을 실제 매장 좌석 배치와 유사하게 드래그로 자유 배치하고, 사각/원형 모양을 시각 확인한다.",
    "사장님이 한눈에 좌석 위치를 파악하고 손님 안내·운영 시 직관적으로 쓰도록 공간 메타포를 제공."
   ],
   "behavior": [
    "각 테이블 카드(80x80px): 이름 + 모양 라벨('원형'/'사각형') 표시. shape='circle'이면 원형(border-radius 50%), 'square'면 둥근 사각.",
    "<b>드래그 이동</b>(영업 마감 시): 마우스다운→이동→업. 이동량 4px 초과 시 drag로 인정. 놓으면 즉시 <code>TABLES</code>가 아니라 <code>_pendingTablePos[id]={x,y}</code>(임시)에만 저장 → 저장 버튼 강조.",
    "미저장 위치 테이블은 카드 테두리가 <b>주황 점선(2px dashed amber)</b>으로 표시, 저장 후 실선 복귀. 평면도 하단에 범례 \"■ 위치 변경 후 미저장 테이블\"(amber 점선) 노출.",
    "<b>경계 제한</b>: 드래그 좌표는 평면도 내부로 클램프(x: 4 ~ 폭-84, y: 4 ~ 높이-84) — 영역 이탈 방지. (겹침 방지는 1차 미구현, 시각 겹침 허용.)",
    "영업 중에는 드래그 시 모달 차단(핀2). 모양 변경은 이 평면도가 아니라 아래 목록 표(핀5)에서 수행."
   ],
   "data": [
    "<code>TABLE.x, TABLE.y</code>(int, px 좌표, 평면도 좌상단 기준), <code>TABLE.shape</code>('square'|'circle').",
    "임시 좌표 버퍼 <code>_pendingTablePos:{[id]:{x,y}}</code>는 저장 전까지 메모리 보관. 저장(<code>applyTableLayout</code>) 시 일괄 <code>TABLE.x/y</code>로 commit 후 버퍼 비움.",
    "평면도 높이 고정 400px, 격자 배경(40px grid)으로 위치 가늠 보조.",
    "동시성: 좌표 저장은 §1.7 last-write-wins."
   ],
   "exception": [
    "빈 상태(구역 테이블 0개): 평면도 중앙 \"🪑 아직 테이블이 없어요. [+ 테이블 추가]로 추가해 보세요.\"",
    "영업 중 드래그 차단 모달: \"영업 마감 후에 배치를 바꿀 수 있어요\".",
    "단순 클릭(이동 4px 이하)은 위치 변경으로 처리하지 않음 — 의도치 않은 미세 이동 방지.",
    "staff는 드래그 저장 불가(이름 변경만 허용, §1.6.2)."
   ]
  },
  "5": {
   "purpose": [
    "<b>테이블 목록(표)</b>. 선택 구역의 테이블을 표로 나열해 이름·모양을 정밀 관리하고 개별 삭제한다. 평면도가 시각 배치라면, 이 표는 속성 편집 인터페이스.",
    "테이블 추가 시 QR 자동 발급의 트리거 지점."
   ],
   "behavior": [
    "표 컬럼: <code>이름</code> | <code>모양</code>(width 160px) | (액션, width 150px). 헤더에 구역명 + 개수 배지(예: '1층 테이블 목록 5개').",
    "모양 토글: 셀 내 \"▢ 사각 / ◯ 원형\" 세그먼트. 클릭 시 <code>setTableShape</code> 즉시 반영(영업 중에도 가능)·리렌더. 동일 모양 재클릭은 무시.",
    "<code>[✏️ 이름]</code>: prompt \"새 테이블 이름을 적어 주세요. (예: A-1, 창가1, T07)\" 기본값 현재 이름. trim 후 반영.",
    "<code>[삭제]</code>(빨강): confirm \"OO을 삭제할까요?\" 확정 시 <code>TABLES</code>에서 제거 + 해당 pending 좌표 삭제 + 리렌더. 삭제된 테이블의 QR도 회수.",
    "[+ 테이블 추가](툴바): 현재 구역에 기본명 'TNN' 사각 테이블 생성, 그리드 자동 배치, 토스트 \"✅ 'TNN' 테이블을 추가했어요\"."
   ],
   "data": [
    "편집 필드: <code>TABLE.name</code>(string, 필수, trim 후 비어있지 않음, 전체 테이블 범위 <b>중복 불가</b>), <code>TABLE.shape</code>('square'|'circle').",
    "이름 중복 검증 범위: 전 구역 통합(<code>TABLES</code> 전체, 자기 자신 제외). QR·주문 매핑이 이름 기준일 수 있어 전역 유일 권장.",
    "테이블 추가 시 <code>id</code>=max+1, <code>name</code>='T'+2자리, shape='square', status='비어있음', orderCnt=0. <b>QR 자동 발급</b>(QR 관리 연동, SPEC §3.6).",
    "미저장 위치인 테이블 행 이름 옆에 주황 '미저장' 배지 표시(평면도 핀4와 동기)."
   ],
   "exception": [
    "빈 상태: 목록 패널 \"이 구역에 테이블이 없어요.\" (평면도와 별도 문구).",
    "이름 빈 값 입력 시 alert \"테이블 이름은 비워 둘 수 없어요.\" / 중복 시 alert \"'OO'은(는) 이미 사용 중인 테이블 이름이에요.\" — 둘 다 반영하지 않고 종료.",
    "이름 변경 prompt 취소(null)·동일 이름 입력 시 변경 없이 종료.",
    "삭제 confirm 취소 시 변경 없음. 진행 중 주문이 있는 테이블(<code>status='사용중'</code>, orderCnt>0) 삭제는 운영 혼선 우려 — 경고 또는 차단 권장(1차 목업은 단순 confirm).",
    "staff는 이름 변경·정렬만 가능, 모양 변경·삭제·추가는 비활성 + 툴팁 \"사장님 권한이 필요해요\"(§1.6.2)."
   ]
  }
 },
 "stl-calendar": {
  "1": {
   "purpose": [
    "화면 최상단 <b>크럼브·타이틀·서브카피·이동 버튼</b> 영역. 크럼브 <code>정산 관리 › 정산 달력</code>, 타이틀 <code>정산 달력</code>, 서브 <code>정산일을 한눈에 · 정산 주기 D+3 영업일</code>으로 이 화면이 '정산금 입금일을 달력으로 보는 곳'임을 알린다.",
    "사장님이 <b>언제 얼마가 입금되는지</b>를 직관적으로 파악하고, 더 자세한 회차별 표가 필요하면 정산 내역으로 넘어가도록 동선을 제공하는 진입 헤더.",
    "정산 주기 규칙(결제일 + 3영업일 = 정산일)을 한 줄 카피로 상시 노출해 입금 예측의 기준을 명시한다."
   ],
   "behavior": [
    "우측 <b>🔎 정산 내역 보기</b> 버튼(<code>btn-ghost</code>) 클릭 → <code>setSection('stl-list')</code>로 정산 내역 화면 이동. 토글/상태 없는 단순 네비게이션.",
    "서브카피·타이틀은 정적 텍스트로, 월 이동(핀2)이나 선택(핀3)에 영향받지 않고 항상 동일하게 노출.",
    "D+3는 <b>달력(역일)이 아니라 영업일</b> 기준이며 주말·공휴일은 카운트에서 제외(<code>addBizDays</code>가 토·일·<code>isHoliday</code> 스킵). SPEC §1.1 영업일(03:00~익일 02:59) 정의를 따른다."
   ],
   "data": [
    "화면 라우트 <code>admin.qrorder.softment.co.kr/settlements/calendar</code>. 데이터 소스는 정산 회차 컬렉션 <code>SETTLEMENTS</code>(파생 집계).",
    "정산일 산출식: <code>settleISO = addBizDays(approvalDate, 3)</code> — base 결제일에서 영업일 3일 가산. 계산식 근거 SPEC §1.1.",
    "연동: <b>정산 내역</b>(stl-list), 회차 클릭 시 <b>정산 상세</b>(stl-detail). API 성격은 월 단위 정산 스케줄 조회(GET, read-only).",
    "권한 플래그: 정산 영역은 <code>role=owner</code> 전용. <code>staff</code>는 매출·정산 접근 불가(SPEC §1.6.2)."
   ],
   "exception": [
    "<b>권한 부족</b>(staff 접근): 정산 메뉴 자체를 미노출하거나 진입 차단. 가능형 안내 <code>\"정산 정보는 사장님 계정에서 확인할 수 있어요.\"</code>",
    "로딩 중에는 헤더는 즉시 그리고 달력 영역만 스켈레톤 처리(spec/08-common 로딩 규칙).",
    "D+3 계산에서 연휴가 길면 정산일이 크게 밀릴 수 있음 — 카피는 항상 '영업일' 기준임을 명시해 오해를 방지."
   ]
  },
  "2": {
   "purpose": [
    "<b>월 이동 네비게이션 + 상태 범례</b> 패널. 좌측은 ‹ / › 화살표와 <code>YYYY년 M월</code> 라벨, 우측은 정산 상태 색상 범례(입금 완료 / 곧 들어와요).",
    "사장님이 과거·미래 달의 정산 일정을 탐색하고, 달력 셀의 색이 무엇을 뜻하는지 즉시 이해하도록 돕는 컨트롤·범례 영역."
   ],
   "behavior": [
    "<b>‹ 전월</b> 버튼(<code>cal-nav</code>, aria-label '전월') → <code>setCalendarMonth(-1)</code>, <b>› 익월</b> → <code>setCalendarMonth(1)</code>. 보고 있는 월 상태 <code>state.calendarMonth</code>(기본 <code>'2026-05'</code>)를 갱신 후 재렌더.",
    "현재 월(<code>2026-05</code>)이 아닐 때만 <b>오늘로</b> 버튼(<code>btn-ghost</code>) 노출 → <code>setCalendarMonth('today')</code>로 기준월을 <code>'2026-05'</code>로 복귀. 현재 월에서는 숨김.",
    "범례: <code>cal-legend done</code>=<b>입금 완료</b>(정산완료), <code>cal-legend pending</code>=<b>곧 들어와요</b>(정산대기). 색은 의미와 1:1.",
    "월 라벨은 <code>min-width:140px</code> 중앙 정렬로 자릿수 변동에도 화살표 위치 고정."
   ],
   "data": [
    "상태 변수 <code>state.calendarMonth</code>(형식 <code>'YYYY-MM'</code>). <code>setCalendarMonth</code>는 <code>new Date(y, m-1+delta, 1)</code>로 연·월 경계(12월↔1월) 자동 처리.",
    "<code>isCurrentMonth = (monthKey === '2026-05')</code>로 '오늘로' 버튼 노출 여부 결정. 운영 시 '오늘' 기준은 SPEC §1.1 영업일 기준 현재월로 대체.",
    "상태 매핑: <code>statusPill = (status==='정산완료') ? 'done' : 'pending'</code>. 정산완료/대기 판정은 <code>settleISO ≤ todayISO</code> 문자열 비교(타임존 버그 방지)."
   ],
   "exception": [
    "<b>색만으로 의미 전달 금지</b> — 각 셀에 텍스트 태그(<code>입금 완료</code>/<code>곧 들어와요</code>)를 병행하고 범례에도 라벨을 붙여 색각 이상 사용자 대응(접근성, spec/08-common).",
    "화살표로 무한히 과거/미래 이동 가능하나, 데이터 없는 달은 핀4의 빈 상태가 처리.",
    "전월/익월 버튼은 <code>aria-label</code> 제공으로 스크린리더 접근성 확보."
   ]
  },
  "3": {
   "purpose": [
    "<b>월간 정산 달력 그리드</b> 본문. 요일 헤더(일~토)와 7열 날짜 셀로 구성되며, 정산이 발생한 날짜 셀에 <b>입금(예정)액·상태 태그·해당 결제일</b>을 표시한다.",
    "날짜별로 '그날 통장에 들어오는 정산금'을 한눈에 보여주고, 클릭으로 그날 회차 상세까지 바로 진입하게 하는 핵심 영역."
   ],
   "behavior": [
    "셀 렌더: 정산 있는 날만 <code>cal-amt</code>(금액 <code>${fmt(totalSettle)}원</code>) + <code>cal-tag</code>(완료=<b>입금 완료</b>/대기=<b>곧 들어와요</b>) + <code>cal-sub</code>(<code>결제일 M/D(요일)</code>) 표기. 빈 날·월 밖 칸은 비워둠(<code>cal-cell off</code>).",
    "<b>금액이 있는 날짜 클릭</b> → <code>selectStlDate(iso)</code>: 해당 일자 정산 회차 상세(stl-detail)로 즉시 이동(중간 정산내역 단계 생략). 정산 없는 칸은 <code>onclick</code> 미부착(클릭 불가).",
    "오늘(<code>2026-05-15</code>)은 <code>cal-day today</code> 강조, 선택일(<code>state.calendarSelectedDate</code>, 기본 <code>2026-05-15</code>)은 <code>cal-cell selected</code> 강조.",
    "<code>selectStlDate</code> 매칭 우선순위: ① <code>settleISO===iso</code> 직접 회차 → ② 같은 날 결제(<code>approvalDays</code>)에 속한 회차 → ③ 정산일이 가장 가까운 회차. 주말·공휴일 클릭 시 가장 가까운 회차로 진입."
   ],
   "data": [
    "인덱스 <code>byDate[settleISO]=settlement</code>로 정산일별 1셀 매핑. 첫 요일 <code>new Date(year,month-1,1).getDay()</code>, 말일 <code>new Date(year,month,0).getDate()</code>로 7배수 그리드 생성.",
    "셀 표시 필드: <code>totalSettle</code>(받으실/입금 금액, int), <code>status</code>(정산완료|정산대기), <code>approvalDate</code>·<code>approvalDow</code>(결제일·요일).",
    "계산식: <code>totalSettle = (gross − refund − feeTotal) + couponPlatformAmt</code>. 수수료 <code>feeTotal = feeBase + round(feeBase×0.1)</code>, 부가세는 round 규칙(SPEC §1.3). 사장님(merchant) 발행 쿠폰은 정산 제외.",
    "같은 정산일에 여러 영업일 매출이 묶이면(주말·공휴일 이월) 그룹 합산되어 한 셀에 표시. 회차 ID <code>STL-2026MMDD-MMDD</code>.",
    "<b>환불 사후 차감</b>: 이미 정산 완료된 일자의 매출이 나중 환불로 줄면 발생 회차가 아니라 <b>다음 정산 회차에서 차감</b>(SPEC §1.5, §1.5 75행). 결제 취소 여부는 선/후불이 아니라 <code>Payment.status=paid</code>(환불 발생=결제 취소)로 판정."
   ],
   "exception": [
    "<b>미래 달</b>: 오늘 이후 결제는 아직 정산 대상이 아니라 회차 미생성 — 미래 정산 예정일은 <code>곧 들어와요</code>(pending)로만 표시.",
    "정산 없는 날 클릭 무반응(커서 기본). 정산 있는 셀만 <code>cursor:pointer</code>.",
    "<b>환불 사후 차감</b>으로 특정 회차 금액이 음수에 근접/감소할 수 있음 — 상세에서 차감 사유를 안내(SPEC §1.5).",
    "금액은 <code>tabular-nums</code>·천단위 콤마(<code>fmt</code>)로 정렬성 확보, 셀이 좁아도 잘리지 않게 표기."
   ]
  },
  "4": {
   "purpose": [
    "달력 하단 <b>안내 카드</b>(<code>info-card</code>). 달력 사용법(날짜 클릭 = 상세 보기)을 능동·친근한 톤으로 알리고, 데이터가 없을 땐 빈 상태 메시지를 대신 보여주는 보조 영역."
   ],
   "behavior": [
    "데이터 있는 달(<code>hasData=true</code>): <code>💡 금액이 적힌 날짜를 누르면, 그날 받은 정산을 자세히 볼 수 있어요.</code> 가능형 안내 노출.",
    "데이터 없는 달(<code>hasData=false</code>): 🗓️ 아이콘 + <code>${year}년 ${month}월 정산 내역이 없어요</code> + 보조 <code>좌우 화살표로 다른 달을 확인할 수 있어요</code>로 전환.",
    "클릭·토글 동작 없는 정적 안내. 핀2의 월 이동에 따라 hasData가 바뀌면 문구가 자동 전환."
   ],
   "data": [
    "<code>hasData = SETTLEMENTS.some(s => s.settleISO.startsWith(monthKey))</code>로 분기. 별도 API 호출 없이 핀3과 동일 데이터셋 재사용.",
    "동적 바인딩 값은 <code>year</code>·<code>month</code>(보고 있는 월)뿐. 그 외는 고정 카피."
   ],
   "exception": [
    "<b>빈 상태</b>는 부정형('없어요'만 강조) 대신 다음 행동을 제시하는 가능형 보조문구(<code>좌우 화살표로 다른 달을 확인할 수 있어요</code>)를 병기 — 톤앤매너 능동·긍정 규칙 준수.",
    "빈 상태 카드 자체가 에러가 아닌 정상 상태이므로 에러 토스트를 띄우지 않음.",
    "안내 문구는 강조용 이모지(💡/🗓️)를 텍스트 보조로만 사용하고 의미 전달은 텍스트가 담당(접근성)."
   ]
  }
 },
 "support": {
  "1": {
   "purpose": [
    "<b>화면 개요·진입점</b>. 사장님(owner/staff)이 소프트먼트 운영팀이 정리한 사용 안내(FAQ)를 셀프로 확인하고, 답을 못 찾으면 같은 화면 안에서 <b>서비스 관련 문의(CS)</b>로 자연스럽게 전환하도록 하는 통합 고객지원 허브.",
    "사이드바 그룹 <code>고객 지원</code>, 메뉴 라벨 <b>문의·자주 묻는 질문</b>(icon 💁, ord 21), URL <code>admin.qrorder.softment.co.kr/support</code>. 진입 시 기본 탭은 <code>faq</code>.",
    "상단 고정 헤더: 크럼브 <code>고객 지원 › {탭라벨}</code>, 제목 <code>고객 지원</code>(h2), 그 아래 탭별 안내 부제(<code>page-sub</code>) 노출.",
    "셀프서비스(FAQ)를 1차로 두고 사람 응대(CS)를 2차로 두어 운영팀 문의량을 줄이는 것이 목적. 권한 무관하게 owner/staff 모두 열람·문의 가능(<b>SPEC §1.6</b>; 별도 권한 게이트 없음)."
   ],
   "behavior": [
    "헤더 우측 액션 버튼은 <b>탭 종속</b>: <code>cs</code> 탭일 때만 <code>+ 새 문의 남기기</code>(btn-primary) 노출, <code>faq</code> 탭에서는 미노출.",
    "탭 전환은 핀2 카드형 토글로만 수행. 탭 전환 시 <code>state.supportTab</code> 갱신 후 <code>renderApp()</code> 전체 리렌더.",
    "탭 상태는 <code>state.supportTab</code>(기본값 <code>'faq'</code>)에 보존되어 다른 화면 갔다 돌아와도 마지막 탭 유지. <code>navKey</code>에 <code>supportTab</code> 포함되어 탭 변경도 화면 전환으로 추적.",
    "외부 진입 헬퍼: <code>setSection('faq')</code> → faq 탭, <code>setSection('cs')</code> → cs 탭으로 매핑(둘 다 section=support). <code>openNewInquiryWithType(type,title)</code>는 cs 탭으로 이동 후 모달을 분류·제목 미리 채워 자동 오픈."
   ],
   "data": [
    "엔터티 2종: <code>FAQS[]</code>(운영팀 작성, 사장님 읽기 전용), <code>CS_INQUIRIES[]</code>(사장님이 작성·운영팀이 답변).",
    "<code>FAQS[i]</code> = { <code>id:int</code>, <code>cat:string</code>(시작하기·결제·정산·메뉴 관리·QR·테이블·직원 호출·환불·취소·기타), <code>q:string</code>, <code>a:string</code> }.",
    "<code>CS_INQUIRIES[i]</code> = { <code>id:int</code>, <code>date:'YYYY-MM-DD'</code>, <code>type:string</code>, <code>title:string</code>, <code>body:string</code>, <code>status:'답변 대기'|'답변 완료'</code>, <code>reply:string</code>, <code>replyAt:'YYYY-MM-DD HH:mm'</code>, <code>by:string</code> }.",
    "연동: 새 문의 등록 시 status=답변 대기 건수가 <b>홈 대시보드 '답변 받을 문의'</b> KPI와 동기화(<code>inquiryWait</code>). FAQ '직접 문의' 버튼은 cs 탭으로 라우팅.",
    "API 성격(그린필드 정의): <code>GET /faqs</code>(운영자 콘솔에서 관리, 사장님은 read-only), <code>GET/POST /inquiries</code>(매장 단위 scope, store_id 바인딩). 영업일·시간 표기는 <b>SPEC §1.1</b>(03:00 기준) 따름."
   ],
   "exception": [
    "최초 진입·미설정 시 <code>state.supportTab</code>이 비어 있으면 자동으로 <code>'faq'</code>로 세팅(빈 상태 없이 항상 FAQ 먼저 노출).",
    "FAQ 부제 인용: \"소프트먼트 운영팀이 정리한 사용 안내예요. 원하는 답을 찾지 못하시면 <b>서비스 관련 문의</b> 탭에서 직접 남겨 주세요.\"",
    "CS 부제 인용: \"QR오더 사용 중 궁금한 점이나 문제가 있으면 남겨 주세요. 소프트먼트 운영팀이 확인 후 답변드려요.\"",
    "응답 SLA 안내(가능형 톤): \"운영팀이 평균 24시간 안에 답변드려요.\" 긴급 건은 \"가입 시 안내드린 CS 전화\"로 유도."
   ]
  },
  "2": {
   "purpose": [
    "<b>탭 전환 영역</b>. 카드형 토글 버튼 2개로 <b>자주 묻는 질문(faq)</b>과 <b>서비스 관련 문의(cs)</b>를 오가게 함. 각 버튼은 아이콘+라벨+한 줄 설명+카운트 배지로 구성된 큰 카드(<code>.sup-tab</code>).",
    "셀프 해결(FAQ)을 먼저, 사람 응대(CS)를 다음에 배치해 사용자가 문의 전에 FAQ를 보도록 시각적으로 유도.",
    "배지로 즉시 정보 제공: FAQ는 전체 문서 수, CS는 답변 대기 건수를 노출해 '확인해 주세요' 신호를 줌."
   ],
   "behavior": [
    "버튼1 <b>❓ 자주 묻는 질문</b> / 설명 \"사용 안내를 먼저 빠르게 확인\" / 배지 = <code>FAQS.length</code>(예: 11, 항상 표시).",
    "버튼2 <b>📨 서비스 관련 문의</b> / 설명 \"소프트먼트 운영팀에 직접 남기기\" / 배지 = 답변 대기 건수가 0보다 클 때만 \"대기 N\" 표시, 0이면 배지 숨김.",
    "클릭 시 <code>setSupportTab(key)</code> 호출 → section=support 고정, supportTab=key 설정 후 <code>renderApp()</code>. 활성 탭은 <code>.on</code> 클래스로 강조(배지도 <code>.on</code> 스타일).",
    "활성 탭에 따라 본문(<code>#support-body</code>)이 <code>renderFAQ()</code> 또는 <code>renderCS()</code>로 교체. cs 활성 시 헤더에 <code>+ 새 문의 남기기</code> 버튼 동시 노출.",
    "기본 활성 탭은 <code>faq</code>. 두 버튼은 항상 함께 노출(조건부 숨김 없음)."
   ],
   "data": [
    "<code>faqCnt = FAQS.length</code> — FAQ 배지 소스.",
    "<code>csWait = CS_INQUIRIES.filter(c=>c.status==='답변 대기').length</code> — CS 배지 소스.",
    "활성 상태 플래그 <code>state.supportTab</code>: <code>'faq' | 'cs'</code>. 외부 라우팅 키 <code>'faq'</code>/<code>'cs'</code>는 모두 section=support로 정규화(<code>targetSection</code> 로직).",
    "CS 배지(대기 N)는 핀1의 홈 대시보드 <code>inquiryWait</code> KPI와 같은 계산식을 공유 → 문의 등록/답변 시 양쪽이 함께 갱신."
   ],
   "exception": [
    "답변 대기 0건이면 CS 버튼 배지를 숨겨 빈 \"대기 0\" 노이즈를 방지(능동·긍정 톤 유지).",
    "FAQ 배지는 0이 될 일이 없도록 운영팀이 최소 1건 이상 유지하는 것을 전제(그린필드 규칙: 전 카테고리 0이면 빈 상태 문구는 핀3에서 처리).",
    "탭 라벨은 크럼브에도 반영: faq → \"고객 지원 › 자주 묻는 질문\", cs → \"고객 지원 › 서비스 관련 문의\".",
    "접근성: 토글 카드는 클릭 가능 영역 전체가 활성, 활성 탭은 색/배지로 현재 위치를 명확히 표시(<b>spec/08-common.md</b> 현재 위치 표기 원칙)."
   ]
  },
  "3": {
   "purpose": [
    "<b>FAQ 카테고리·검색·아코디언 목록 영역</b>(faq 탭 본문, <code>renderFAQ</code>). 운영팀이 작성한 사용 안내를 분류·검색·펼침으로 빠르게 찾게 함.",
    "카테고리: <b>시작하기 / 결제·정산 / 메뉴 관리 / QR·테이블 / 직원 호출 / 환불·취소 / 기타</b> + 맨 앞 <b>전체</b>. 카테고리는 <code>FAQS</code>의 <code>cat</code>에서 자동 추출(중복 제거).",
    "각 항목 클릭 시 펼쳐 답변(A.)을 보여주는 아코디언. 키워드 검색으로 질문·답변 본문을 동시 필터.",
    "하단에 '못 찾으셨나요' 안내 배너로 CS 전환을 한 번 더 유도(셀프 → 사람 응대 깔때기 완성)."
   ],
   "behavior": [
    "<b>검색</b>: 상단 입력창(placeholder \"🔍 궁금한 키워드로 검색해 보세요 (예: 정산, 옵션, QR)\"), <code>oninput</code>마다 <code>state.faqSearch</code> 갱신·리렌더. 매칭은 <code>(q+' '+a).toLowerCase().includes(검색어)</code> 부분일치.",
    "<b>카테고리 칩</b>: 칩마다 건수 표시(전체=FAQS.length, 그 외=해당 cat 개수). 클릭 시 <code>state.faqCat</code> 변경·리렌더, 활성 칩은 <code>.on</code> 강조. 카테고리+검색은 <b>AND</b> 결합 필터.",
    "<b>아코디언</b>: 행 클릭 시 <code>state.faqOpen</code>(Set, id 보관)에 토글 추가/삭제. 펼침 시 ▾ 아이콘 180° 회전, 본문 영역에 <code>A.</code> 답변 노출(다중 항목 동시 펼침 허용).",
    "정렬: <code>FAQS</code> 원본 배열 순서 그대로(id 오름차순) 표시. 기본 카테고리 <code>전체</code>, 기본 검색어 빈 문자열, 기본 펼침 상태 모두 닫힘.",
    "하단 배너/빈 상태 버튼 <code>📨 직접 문의 남기기</code> / <code>📨 서비스 관련 문의 남기기</code> 클릭 시 <code>setSection('cs')</code>로 CS 탭 이동."
   ],
   "data": [
    "소스 <code>FAQS[]</code>(읽기 전용). 필터 결과 <code>rows</code>는 cat 필터 후 search 필터 순차 적용.",
    "UI 상태 플래그: <code>state.faqCat:string</code>(기본 '전체'), <code>state.faqSearch:string</code>(기본 ''), <code>state.faqOpen:Set<int></code>(펼친 항목 id).",
    "카테고리 목록 = <code>['전체', ...new Set(FAQS.map(f=>f.cat))]</code> — 자동 생성이므로 운영팀이 신규 cat 추가 시 칩도 자동 노출.",
    "답변 본문은 <code>white-space:pre-wrap</code>으로 줄바꿈 보존. 검색·카테고리는 클라이언트 필터(그린필드 API에서는 <code>GET /faqs?cat=&q=</code> 서버 필터로 확장 가능, <b>SPEC §2.6</b> 검색·정렬 표준)."
   ],
   "exception": [
    "검색/카테고리 결과 0건 빈 상태: 아이콘 🔍 + \"조건에 맞는 답변이 없어요\" + 안내 \"다른 키워드로 검색해 보시거나, 아래 버튼을 눌러 직접 문의해 주세요.\" + <code>📨 서비스 관련 문의 남기기</code> 버튼.",
    "하단 상시 배너: \"더 궁금한 점이 있으신가요?\" / \"소프트먼트 운영팀이 평균 24시간 안에 답변드려요.\" / 버튼 \"📨 직접 문의 남기기\".",
    "검색어는 대소문자 무시(<code>toLowerCase</code>) — 영문/한글 혼용 키워드도 매칭. 공백만 입력 시 전체 노출(빈 검색과 동일 처리).",
    "FAQ는 사장님 읽기 전용 — 편집·삭제 액션 없음(운영자 콘솔에서만 관리). 경계: 카테고리 전체 0건이면 빈 상태 문구가 그대로 노출되며 CS 전환 버튼이 유일한 출구."
   ]
  }
 },
 "reviews": {
  "1": {
   "purpose": [
    "<b>우리 매장 리뷰</b> 화면의 진입 헤더 영역. 손님이 주문 후 남긴 별점·후기를 한곳에 모아 확인하고 사장님 답변을 등록하는 운영 화면임을 안내한다.",
    "크럼브 <code>마케팅 · CRM › 우리 매장 리뷰</code>와 제목 <b>우리 매장 리뷰</b>, 보조설명 \"손님이 남긴 리뷰를 확인하고 답변을 등록해요. 아래 카드를 클릭하면 상태별로 골라 볼 수 있어요.\"를 노출한다.",
    "헤더 우측에 기간 필터 적용 후의 <b>평균 별점</b>을 상시 표시해 매장 만족도를 한눈에 보여 준다.",
    "이 화면의 <b>답변 대기</b> 건수를 홈 대시보드 \"사장님이 챙겨야 할 일 › 답변 안 한 리뷰\" 카드와 동기화해, 사장님의 일일 처리 동선의 시작점이 된다."
   ],
   "behavior": [
    "URL은 <code>admin.qrorder.softment.co.kr/reviews</code>, 사이드바 메뉴 라벨은 <code>💬 우리 매장 리뷰</code>(마케팅·CRM 그룹). 진입 시 <code>renderReviews(main)</code>가 실행된다.",
    "평균 별점 = <code>(기간내 리뷰 rating 합 / 기간내 리뷰 수)</code>를 소수점 1자리로 표기. 기간 내 리뷰가 0건이면 <code>⭐ –</code>로 표시(0.0 아님).",
    "기본 정렬은 최신순(date 내림차순). 진입 시 기본 상태 필터는 <code>all</code>, 단 홈 \"답변 안 한 리뷰\" 카드로 진입하면 <code>state.reviewFilter='wait'</code>가 선행 설정된다(공통 §2.6 정렬·진입 규칙).",
    "리뷰 기능이 OFF면 헤더/평균별점/기간바/지표카드/목록을 모두 숨기고 안내 패널만 렌더(핀 2 참조)."
   ],
   "data": [
    "엔터티 <code>Review{ id:int, cust:string(마스킹 표시명), date:string(YYYY-MM-DD), rating:int 1~5, body:string, reply:string, photo:string(이모지/이미지URL) }</code>. 목록 소스는 <code>REVIEWS[]</code>.",
    "리뷰 1건은 완료된 주문(<code>Order</code>)에서 손님 화면을 통해 1회 생성된다(주문 1건당 리뷰 최대 1개). <code>review.orderId</code>, <code>review.storeId</code> 연동 필드 권장.",
    "<b>홈 연동</b>: 홈의 <code>reviewWait</code> = 현재 매장의 <code>reply</code>가 빈 리뷰 수. 답변 등록 시 즉시 감소한다.",
    "<b>권한</b>(SPEC §1.6): 조회는 owner/staff 모두 가능, 답변 등록·기능 ON/OFF는 owner 전용으로 권장(staff는 읽기 전용).",
    "영업일 경계는 03:00 시작(SPEC §1.1) — 기간 필터의 \"이번 달/최근 N일\" 산정은 영업일 기준 날짜로 계산한다."
   ],
   "exception": [
    "기간 내 리뷰가 한 건도 없으면 지표는 0/평균 \"–\"로, 목록은 빈 상태 문구(핀 5)로 처리한다(데이터 없음=404를 에러 아닌 빈 상태로, 공통 §3·에러표 404).",
    "권한 부족(403) 시 답변/토글 액션은 공통 모달 \"사장님 권한이 필요해요. 가맹점주 본인 계정으로 로그인해 주세요\"를 노출한다(공통 에러표).",
    "단순 조회·필터 전환에는 토스트를 띄우지 않는다(공통 §1, 명시적 액션 결과만 토스트)."
   ]
  },
  "2": {
   "purpose": [
    "손님 리뷰 수집 기능 자체를 켜고 끄는 마스터 스위치. 리뷰를 받지 않으려는 매장이 손님 주문 화면의 리뷰 작성 노출을 통제할 수 있게 한다.",
    "카드 제목 <b>⭐ 손님 리뷰 받기</b>, 설명 \"켜면 손님이 주문 후 리뷰를 남기고, 사장님이 여기서 확인하고 답변할 수 있어요. 원치 않으면 꺼 둘 수 있어요.\"를 항상 표시한다."
   ],
   "behavior": [
    "토글 클릭 시 <code>toggleReviewEnabled()</code>가 <code>state.reviewEnabled</code>를 반전. 라벨은 ON일 때 <b>사용 중</b>, OFF일 때 <b>사용 안 함</b>으로 바뀐다.",
    "<b>기본값 ON</b>(<code>reviewEnabled: true</code>). ON이면 헤더·기간바·지표·목록 전체를 렌더한다.",
    "OFF로 전환하면 화면 본문을 빈 안내 패널로 대체: 아이콘 💤 + \"리뷰 기능이 꺼져 있어요\" + \"위 손님 리뷰 받기를 켜면 손님이 리뷰를 남기고, 여기서 한곳에 모아 확인할 수 있어요.\" (단, 토글 카드와 크럼브/제목은 유지).",
    "OFF 시 손님 주문 완료 화면의 리뷰 작성 진입을 숨긴다(기존 리뷰 데이터는 삭제하지 않고 보존, 재ON 시 다시 노출)."
   ],
   "data": [
    "필드 <code>reviews.enabled:boolean</code> (state 키 <code>reviewEnabled</code>), 기본 <code>true</code>. 매장 단위 설정값으로 저장(매장 설정 엔터티).",
    "<b>연동</b>: 손님 앱의 리뷰 작성 화면 노출 플래그를 이 값으로 게이팅. OFF여도 누적 리뷰·답변 데이터는 유지.",
    "변경 권한은 owner 전용 권장(SPEC §1.6). 변경 이력은 매장 ID·역할·화면명·액션명과 함께 기록(공통 §감사로그)."
   ],
   "exception": [
    "OFF 상태에서도 토글은 항상 조작 가능해야 하며, 안내 패널의 \"손님 리뷰 받기\"를 강조(<b>)해 재활성 경로를 명시한다.",
    "OFF→ON 전환 시 기존 미답변 리뷰의 답변 대기 카운트가 홈에 다시 반영되어야 한다.",
    "staff 계정이 토글을 누르면 403 모달 \"사장님 권한이 필요해요. 가맹점주 본인 계정으로 로그인해 주세요\"를 표시하고 값은 변경하지 않는다."
   ]
  },
  "3": {
   "purpose": [
    "리뷰 목록과 지표를 특정 기간으로 한정해 보기 위한 <b>조회 기간</b> 필터 바. 라벨 \"📅 조회 기간\".",
    "프리셋(전체/최근 7일/최근 30일/이번 달)과 직접 날짜 지정을 제공해, 기간별 만족도 추이·답변 현황을 점검할 수 있게 한다."
   ],
   "behavior": [
    "칩 5종: <code>전체(all)</code>, <code>최근 7일(7d)</code>, <code>최근 30일(30d)</code>, <code>이번 달(thismonth)</code>, <code>직접 선택(custom)</code>. 클릭 시 <code>setReviewRange(k)</code> 실행, 선택 칩에 <code>on</code> 강조.",
    "<b>기본값 all(전체)</b>. 기간 변경 시 목록과 5개 지표 카드·평균 별점이 함께 갱신된다.",
    "<code>custom</code> 선택 시 시작/종료 <code>date</code> 인풋 2개가 나타나고(기본 시작 2026-01-01, 종료 2026-05-15), 변경 시 <code>state.reviewStart/reviewEnd</code>에 반영 후 즉시 재필터.",
    "필터 산정식: 7d=기준일 포함 최근 7일(cut(6)), 30d=cut(29), thismonth=date가 해당 월로 시작, custom=start≤date≤end의 양끝 포함(inclusive)."
   ],
   "data": [
    "필드 <code>reviewRange: 'all'|'7d'|'30d'|'thismonth'|'custom'</code>, <code>reviewStart:string(YYYY-MM-DD)</code>, <code>reviewEnd:string(YYYY-MM-DD)</code>.",
    "기간 비교는 문자열 <code>date</code> 사전식 비교(YYYY-MM-DD 포맷 보장 시 안전). 실제 구현은 영업일 03:00 경계(SPEC §1.1)를 반영한 날짜로 산정.",
    "기간 필터 결과는 지표(핀 4)·목록(핀 5)·평균별점(핀 1)의 공통 소스 <code>dated[]</code>가 된다."
   ],
   "exception": [
    "custom에서 시작일이 종료일보다 늦으면 결과가 0건이 되며, 빈 상태 문구 \"이 기간에 등록된 리뷰가 없어요 / 조회 기간을 바꿔 보세요.\"로 안내한다(폼 검증 경고 대신 빈 상태로 처리).",
    "미래 날짜 입력 시에도 오류 없이 0건 처리한다(경계값).",
    "기간 변경은 단순 조회이므로 토스트 미사용(공통 §1)."
   ]
  },
  "4": {
   "purpose": [
    "기간 내 리뷰를 상태·별점별로 집계해 보여 주는 <b>클릭형 KPI 카드</b> 5종. 카드 클릭이 곧 목록 상태 필터로 작동한다.",
    "카드: <b>전체</b>, <b>답변 대기</b>, <b>답변 완료</b>, <b>⭐ 5점</b>, <b>3점 이하</b>. 능동·긍정 톤(\"답변 대기\")으로 처리해야 할 일을 환기한다."
   ],
   "behavior": [
    "각 카드 클릭 시 <code>state.reviewFilter</code>를 <code>all|wait|done|star5|low</code>로 설정하고 목록을 재필터. 선택 카드에 <code>on</code> 강조 테두리(전체=먹색, 대기=주황, 완료=파랑, 5점=주황, 3점이하=빨강).",
    "집계식: 전체=dated.length, 답변대기=reply 빈 건수, 답변완료=reply 있는 건수, 5점=rating===5, 3점이하=rating≤3.",
    "수치 색상 규칙: 답변 대기·3점 이하는 건수>0일 때 강조색(주황/빨강), 0이면 회색으로 차분히 표시.",
    "홈 \"답변 안 한 리뷰\"로 진입하면 <code>wait</code> 카드가 선택된 상태로 열린다(핀 1 behavior)."
   ],
   "data": [
    "집계 소스는 기간 필터 적용 후 <code>dated[]</code>. 상태 구분 키: 답변 여부 = <code>!!review.reply</code>, 별점 구간 = <code>review.rating</code>.",
    "<b>홈 연동</b>: 답변 대기 카운트(<code>waitCnt</code>)가 홈 reviewWait와 동일 정의를 공유.",
    "각 카드는 필터 상태 플래그 <code>reviewFilter</code> 하나에 매핑되며 동시 다중 선택은 없다(단일 토글)."
   ],
   "exception": [
    "기간 내 0건이면 모든 카드 수치는 0으로 표기하고 클릭해도 빈 상태 목록을 보인다.",
    "답변 대기 0건일 때 카드 수치는 회색 0으로 차분히 표시(부정형 문구 없이) — 긍정 톤 유지.",
    "권한 무관하게 카드 조회·필터는 owner/staff 모두 가능."
   ]
  },
  "5": {
   "purpose": [
    "기간·상태 필터가 적용된 실제 <b>리뷰 목록</b>과 항목별 <b>답변 등록</b> 영역. 손님 표시명·별점·날짜·후기 본문·사진과 사장님 답변을 한 카드로 보여 준다.",
    "미답변 리뷰에는 <b>+ 답변 작성</b> 버튼을 제공해 답변을 손님 화면에 노출시킨다."
   ],
   "behavior": [
    "목록 헤더 \"리뷰 목록\"에 부제 <code>{필터라벨} · {표시건수}건</code>, 필터 적용 시 \"· 전체 N건 중\" 병기. 필터가 all이 아니면 우측에 <b>필터 해제</b> 버튼(클릭 시 reviewFilter='all').",
    "각 행: 사진(있으면 54px 박스) + 표시명(굵게) + 별점(★ rating개·☆ 나머지) + 날짜(YYYY.MM.DD) + 본문. 답변이 있으면 파랑 박스 \"💬 사장님 답변\" + 답변 본문 표시.",
    "미답변 행은 <b>+ 답변 작성</b> 버튼 노출. 클릭 시 입력값을 받아 해당 <code>review.reply</code>에 저장, 즉시 재렌더, 성공 토스트 \"✅ 답변을 등록했어요\" 표시(공통 §1 명시적 액션).",
    "정렬 최신순 고정(date 내림차순). 목록이 길면 페이징/무한스크롤 적용 권장(공통 §2.6).",
    "<b>그린필드 보강</b>: 답변 등록은 prompt 대신 인라인 textarea + [등록]/[취소] 버튼으로 구현하고, 등록된 답변은 [답변 수정]/[답변 삭제]로 편집 가능하도록 정의한다."
   ],
   "data": [
    "행 바인딩 필드: <code>cust, photo, rating(1~5), date, body, reply</code>. 답변 저장 = <code>REVIEWS.find(x=>x.id===id).reply = 입력값</code>.",
    "답변 본문 <code>reply:string</code> — 검증: 공백만 입력 불가, 최대 길이 500자 권장(폼 검증, 공통 §폼). 빈 문자열은 \"미답변\" 상태로 간주.",
    "답변 등록/수정/삭제는 owner 전용 권장(SPEC §1.6). 손님은 답변을 읽기만 한다.",
    "<b>연동</b>: 답변 등록 시 답변 대기 카운트(핀 4)·홈 reviewWait 즉시 감소. 손님 주문 내역/리뷰 화면에 답변 노출.",
    "부적절 리뷰 신고: <code>review.reported:boolean</code>, <code>reportReason</code> 필드를 두고 신고 시 본사(소프트먼트) 검수 큐로 전달하는 API 성격."
   ],
   "exception": [
    "빈 상태 문구는 상황별로 분기: 기간 내 0건 \"이 기간에 등록된 리뷰가 없어요 / 조회 기간을 바꿔 보세요.\"(🗓️), wait 0건 \"답변 대기 중인 리뷰가 없어요 / 모든 리뷰에 답변을 남기셨어요. 수고하셨어요!\"(✅), low 0건 \"3점 이하 리뷰가 없어요 / 손님 만족도가 좋아요!\"(😊), 기타 \"해당 조건의 리뷰가 없어요 / 다른 필터를 눌러 보세요.\"(💬).",
    "답변 작성 시 빈 값/공백만 입력하면 저장하지 않고 입력 필드 옆 빨간 라인+메시지(토스트 미사용, 공통 §폼·에러표 4xx).",
    "답변 저장 실패(5xx)는 에러 토스트 + \"다시 시도\" 버튼, 입력값 유지(공통 §1·§폼 dirty 보존).",
    "부적절 리뷰는 사장님이 임의 삭제할 수 없고 <b>신고</b> 경로로만 처리(악성 리뷰 임의 은폐 방지). 신고 시 \"신고를 접수했어요. 소프트먼트 운영팀이 확인할게요\" 안내.",
    "staff가 답변 버튼을 누르면 403 모달 \"사장님 권한이 필요해요. 가맹점주 본인 계정으로 로그인해 주세요\"."
   ]
  }
 },
 "qr": {
  "1": {
   "purpose": [
    "<b>QR 관리 화면의 최상위 목적 정의 영역</b>: 매장에서 쓰이는 모든 QR(테이블 주문 QR·포장하기 QR·메뉴판 QR)을 한 화면에서 확인하고, 종이로 즉시 임시 출력하거나 디자인이 들어간 <b>정식 QR 스티커</b>를 신청하는 진입점이다.",
    "QR은 <b>이 화면에서 직접 만들지 않는다</b>. <code>테이블 관리</code>의 테이블 목록과 <code>주문 방식</code>(먹고가기/포장하기)·메뉴판 설정을 <b>소스로 삼아 자동 파생</b>되므로, 사장님이 별도로 추가/삭제할 필요가 없다는 점을 일관되게 전달한다.",
    "페이지 헤더 문구: 제목 <code>QR 관리</code>, 부제 \"테이블·포장 QR을 즉시 임시 출력하거나, 정식 스티커를 신청할 수 있어요.\" 크럼브는 <code>매장 운영 › QR 관리</code>."
   ],
   "behavior": [
    "화면 진입 시 기본 탭은 <code>state.qrMainTab='code'</code>(QR 코드 현황). 신청 폼 상태 기본값은 <code>qrDesignMode='same'</code>, <code>qrReqColor=null</code>, <code>qrReqQty=9</code>(=<code>QR_BATCH_SIZE</code>), <code>qrReqMemo=''</code>.",
    "QR 자동 생성 규칙: <b>테이블 QR</b>=<code>TABLES</code> 항목 수만큼 / <b>포장 QR</b>=<code>ORDER_CHANNELS.mode</code>가 <code>takeout</code> 또는 <code>both</code>일 때 매장당 1개 / <b>메뉴판 QR</b>=운영 모드와 무관하게 매장당 항상 1개.",
    "연동 화면 설정이 바뀌면(<code>테이블 관리</code>에서 테이블 추가/삭제, <code>주문 방식</code>에서 포장 ON/OFF) <b>QR 현황이 즉시 자동 갱신</b>된다. 사장님 측의 수동 재생성 액션은 없다.",
    "상단 안내 배너 노출(현황 탭): \"QR은 먹고가기 설정·테이블 설정을 보고 자동 생성돼요. 따로 추가하실 필요가 없어요.\" + 테이블 관리/주문 방식으로 점프하는 인라인 링크."
   ],
   "data": [
    "소스 데이터: <code>TABLES[]</code>(테이블 관리), <code>ORDER_CHANNELS.mode</code>(주문 방식: <code>dine_in|takeout|both</code>), <code>ZONE_LIST[]</code>(구역). 이 화면은 이들을 <b>읽기 전용</b>으로 참조해 QR을 렌더한다.",
    "QR 주문 링크 패턴: <code>order.qrorder.co.kr/{storeCode}/{slug}</code>. <code>storeCode</code>는 매장 식별자(예: <code>softcoffee-hapjeong</code>), <code>slug</code>는 테이블명/<code>takeout</code>/<code>menu</code>.",
    "스티커 신청 데이터: <code>QR_REQUESTS[]</code>(신청 이력), 상수 <code>QR_PRICE_PER_UNIT=2000</code>(원/장), <code>QR_BATCH_SIZE=9</code>(최소·증감 단위), <code>QR_COLOR_OPTIONS[]</code>, <code>QR_EXISTING_DESIGN</code>(초도 발송 시안).",
    "공통 규칙 준수: 영업일 03:00 시작(SPEC §1.1), 신청일/발송일 표기는 영업일 기준. 정렬·검색·페이징은 SPEC §2.6, 토스트·로딩·빈상태·모달·접근성은 spec/08-common.md를 따른다."
   ],
   "exception": [
    "<b>권한</b>(SPEC §1.6): QR 현황 확인·임시 출력은 owner·staff 모두 가능하나, <b>정식 스티커 신청/취소는 owner 전용</b>. staff에게는 스티커 신청 탭의 신청·취소 버튼을 비활성(또는 미노출)하고 \"매장 사장님 계정에서 신청할 수 있어요.\" 안내.",
    "설정 미비 경계: 테이블이 0개면 테이블 QR 영역은 빈 상태, 포장 OFF면 포장 QR은 미생성 상태(각 핀에서 처리). 메뉴판 QR은 항상 1개 보장.",
    "링크 복사 시 클립보드 미지원 브라우저 대비: <code>navigator.clipboard</code>가 없으면 링크 텍스트를 선택 가능한 형태로 노출해 수동 복사를 안내."
   ]
  },
  "2": {
   "purpose": [
    "<b>2개 탭 전환 영역</b>: ① <code>📱 QR 코드 현황</code>(현재 매장의 모든 QR 보기·임시 출력) ② <code>📦 QR 스티커 신청</code>(디자인 들어간 정식 스티커를 배치로 신청·이력 확인).",
    "임시 출력(가정용/매장 프린터로 즉시 종이 출력)과 정식 스티커(유료 제작·배송)를 명확히 분리해, 급할 땐 임시로 쓰고 정식은 따로 신청하도록 흐름을 나눈다."
   ],
   "behavior": [
    "탭 클릭 시 <code>state.qrMainTab</code>을 <code>'code'</code>/<code>'sticker'</code>로 설정 후 <code>renderApp()</code> 재렌더. 활성 탭에 <code>.on</code> 스타일.",
    "<code>📦 QR 스티커 신청</code> 탭 라벨 옆에 <b>진행 건수 배지</b> 노출: <code>QR_REQUESTS.length</code>가 1 이상이면 파란 pill로 건수 표시(0이면 배지 숨김).",
    "<b>신청 정책</b>: 한 번의 신청은 <b>장 단위(배치)</b>로 묶어 진행하며, <b>한 번 신청 시 색상은 1가지만</b> 선택할 수 있다. 색상을 여러 종류로 받으려면 신청을 나눠 진행.",
    "임시 출력은 즉시 가능(가정용 흑백 프린터 가능), 정식 스티커는 신청→제작→배송 절차를 거친다."
   ],
   "data": [
    "<code>QR_REQUESTS[]</code> 레코드 필드: <code>id:number</code>, <code>qty:number</code>(배치 배수), <code>colorName:string</code>, <code>hex:string</code>, <code>memo:string</code>, <code>reqDate:string(YYYY-MM-DD)</code>, <code>status:'신청중'|'제작중'|'완료'|'취소'</code>, <code>totalPrice:number</code>.",
    "상태(STATES) 전이: <code>신청중</code>(접수) → <code>제작중</code> → <code>완료</code>(=배송). <code>신청중</code> 단계에서만 매장이 <code>취소</code>로 전이 가능.",
    "배지 카운트 소스는 <code>QR_REQUESTS.length</code>(취소 포함 전체 이력 건수). 정렬은 최신 신청일 우선 권장(SPEC §2.6)."
   ],
   "exception": [
    "배지: 신청 이력이 없으면 배지를 숨겨 0 노출을 피한다(능동·긍정 톤).",
    "권한 부족(staff): 신청 탭 진입은 허용하되 신청·취소 액션은 비활성화하고 \"정식 스티커 신청은 사장님 계정에서 진행할 수 있어요.\" 안내(SPEC §1.6).",
    "정식 스티커 신청은 결제(유료)를 동반하므로 발주 직전 더블 체크 확인창을 거친다(핀 2 신청 흐름은 핀 1 신청 영역 참조)."
   ]
  },
  "3": {
   "purpose": [
    "<b>QR 종류 퀵 점프 탭 영역</b>(현황 탭 내): <code>🪑 테이블 QR</code>·<code>🛍️ 포장하기 QR</code>·<code>📖 메뉴판 QR</code> 3종을 한눈에 보고, 각 종류 섹션으로 페이지 내 스크롤 점프한다.",
    "종류별 현재 생성 개수를 배지로 즉시 파악하게 해, 매장 구성(테이블 수·포장 운영 여부)을 빠르게 확인시킨다."
   ],
   "behavior": [
    "탭 항목 클릭 시 해당 섹션 앵커(<code>#qr-section-table</code> / <code>#qr-section-takeout</code> / <code>#qr-section-menu</code>)로 페이지 내 스크롤 이동(다른 화면 전환 아님).",
    "각 탭에 <b>개수 배지</b>: 테이블=<code>TABLES.length</code>, 포장하기=<code>isTakeoutQRActive()?1:0</code>, 메뉴판=<code>1</code>(고정).",
    "포장 OFF 상태면 포장하기 배지는 0으로 표시되고 해당 섹션은 비활성 안내(핀 5 참조)."
   ],
   "data": [
    "탭 구성은 <code>qrQuickTabs()</code>가 생성. 개수 소스: <code>TABLES.length</code>, <code>ORDER_CHANNELS.mode</code>(<code>isTakeoutQRActive()</code>), 메뉴판 상수 1.",
    "배지 수치는 연동 설정 변경 시 재렌더로 실시간 반영(테이블 추가→테이블 배지 증가, 포장 ON→포장 배지 1)."
   ],
   "exception": [
    "개수 0 표기 허용 영역(포장 OFF 시 0)이나, 문구는 부정형 대신 \"포장하기를 켜면 자동 생성돼요\" 식 가능형 유도가 바람직.",
    "앵커 점프 대상 섹션이 빈 상태(테이블 0개 등)여도 점프는 동작하고, 해당 섹션 내부에서 빈 상태 안내를 노출."
   ]
  },
  "4": {
   "purpose": [
    "<b>테이블 QR 섹션</b>: <code>테이블 관리</code>에서 만든 테이블마다 자동 생성된 주문용 QR·주문 링크를 구역별로 묶어 보여주고, 테이블 단위로 임시 출력·링크 복사를 제공한다.",
    "손님이 테이블 QR을 찍으면 해당 테이블로 식별된 주문 화면(<code>order.qrorder.co.kr/{storeCode}/{테이블명}</code>)에 진입하도록 연결한다."
   ],
   "behavior": [
    "섹션 헤더: \"🪑 테이블 QR · 테이블 관리에서 만든 테이블마다 자동 생성돼요\" + 우측 \"테이블 관리 →\" 링크(<code>setSection('table')</code>).",
    "구역(<code>ZONE_LIST</code>)별 그룹핑: 각 구역 헤더에 \"📍 {구역명} {n}개\". 테이블이 있는 구역만 렌더하고, 구역 내 테이블은 입력 순서대로 1,2,3… 번호 표기.",
    "테이블 행마다: QR 미리보기 이미지(<code>qrMock(t.id)</code>)·테이블명·주문 링크 텍스트 + 버튼 2개. <code>🖨️ 임시 출력</code> 클릭 → <code>openTempPrintQRModal('table', t.id)</code> 모달. <code>🔗 링크 복사</code> 클릭 → 클립보드에 주문 링크 복사 후 \"링크가 복사됐어요\" 알림. 링크 텍스트 자체 클릭으로도 복사된다.",
    "테이블 추가/삭제/이름변경은 이 화면에서 불가 — 모두 <code>테이블 관리</code>에서 수행하면 QR 현황에 자동 반영."
   ],
   "data": [
    "행 소스: <code>TABLES[]</code> (<code>id:number</code>, <code>name:string</code>, <code>zone:zoneId</code>). 구역 소스: <code>ZONE_LIST[]</code>(<code>id</code>, <code>name</code>).",
    "주문 링크: <code>order.qrorder.co.kr/{storeCode}/{t.name}</code>. <code>storeCode</code>는 매장 식별자. 테이블명이 slug로 그대로 쓰이므로 테이블명은 URL-safe 해야 함(테이블 관리 측 검증 책임).",
    "QR 이미지는 테이블 <code>id</code> 기반 결정론적 패턴으로 렌더(실제 구현에서는 서버 발급 QR 이미지/엔드포인트로 대체)."
   ],
   "exception": [
    "빈 상태: 테이블이 0개면 \"테이블을 추가하면 QR이 자동으로 생겨요.\" 안내 + \"테이블 관리 →\" 이동 버튼 노출(부정형 회피).",
    "클립보드 미지원/거부 시: 복사 실패를 조용히 흘리지 말고 링크를 선택 가능한 모달이나 인라인으로 노출해 수동 복사 유도.",
    "임시 출력 모달은 흑백 종이 출력 전제임을 명시: \"이건 임시 출력용이에요. … 디자인이 들어간 정식 QR 스티커는 따로 신청해 주세요.\"",
    "권한: owner·staff 모두 현황 확인·임시 출력·링크 복사 가능(스티커 신청만 owner 전용)."
   ]
  },
  "5": {
   "purpose": [
    "<b>포장하기 QR 섹션</b>: 포장 주문 전용 QR을 1개 제공한다. 카운터·입구·외부 창구 등 여러 위치에 같은 QR을 출력·부착해 손님이 포장 주문 화면(<code>/{storeCode}/takeout</code>)으로 들어오게 한다.",
    "포장 QR의 존재 여부는 <code>주문 방식</code> 설정(포장하기 ON/OFF)에 종속됨을 명확히 보여, QR을 따로 켜고 끄는 개념이 아님을 전달."
   ],
   "behavior": [
    "활성 조건: <code>isTakeoutQRActive()</code> = <code>ORDER_CHANNELS.mode ∈ {takeout, both}</code>. 활성 시 \"포장하기 [자동 생성]\" 배지와 함께 QR·링크·<code>🖨️ 임시 출력</code> 버튼(<code>openTempPrintQRModal('takeout')</code>) 노출.",
    "활성 헤더 부제: \"주문 방식에서 포장하기가 켜져 있어 자동 생성돼요\". 보조 문구: \"카운터·입구·외부 창구 등 여러 위치에 같은 QR을 출력해서 부착할 수 있어요.\"",
    "비활성(포장 OFF) 시: 헤더 부제 \"포장하기가 꺼져 있어요\" + 본문 안내 \"현재 매장은 포장하기를 받지 않아요. 주문 방식에서 먹고가기+포장하기 또는 포장하기만으로 바꾸시면 포장 QR이 자동 생성돼요.\" + \"🛒 주문 방식 설정으로 이동\" 버튼(<code>setSection('order-type')</code>).",
    "우측 헤더 \"주문 방식 →\" 링크로 항상 설정 화면 점프 가능."
   ],
   "data": [
    "활성 판정 소스: <code>ORDER_CHANNELS.mode</code>. 링크: <code>order.qrorder.co.kr/{storeCode}/takeout</code>(고정 slug <code>takeout</code>). QR 미리보기는 <code>qrMock(1000)</code> 식 고정 식별자.",
    "포장 QR은 매장당 항상 1개(테이블처럼 N개 생성되지 않음). 위치별로는 동일 QR을 복수 출력해 사용."
   ],
   "exception": [
    "비활성 빈 상태는 부정형(\"안 받아요\")보다 \"포장하기를 켜면 포장 QR이 자동 생성돼요\" 가능형 유도가 톤에 부합.",
    "주문 방식에서 포장하기를 끄면 손님 화면에서 포장 QR이 사라진다 — 설정 변경 시 영향 안내(\"포장하기 QR이 손님 화면에서 사라져요.\")와 일관.",
    "권한: 현황·임시 출력은 owner·staff 모두 가능."
   ]
  },
  "6": {
   "purpose": [
    "<b>메뉴판 QR 섹션</b>: 주문·결제 없이 <b>메뉴 정보만</b> 보여주는 열람 전용 QR을 매장당 1개 제공한다. 외부 입간판·메뉴 진열대·SNS 공유 등 매장 밖 노출 용도.",
    "운영 모드(먹고가기/포장)와 무관하게 항상 존재하므로, 주문 채널과 분리된 보조 노출 수단으로 정의한다."
   ],
   "behavior": [
    "항상 생성: 운영 모드와 무관하게 매장당 1개. 헤더 부제 \"매장 운영 모드와 무관하게 자동 생성돼요 · 외부 진열·SNS 공유용\".",
    "상단 보라색 안내 배너: \"매장 운영 모드와 무관하게 항상 주문/결제가 불가능해요. 손님은 메뉴 정보만 볼 수 있어요. 외부 입간판·메뉴 진열대·SNS 공유 용도로 쓰면 편해요.\"",
    "행: \"메뉴판 (외부 노출용) [메뉴 전용]\" 배지 + 링크 + <code>🖨️ 임시 출력</code> 버튼(<code>openTempPrintQRModal('menu')</code>, <code>isMenuOnly=true</code>). 임시 출력 모달 안내: \"메뉴판 전용 QR이에요. 손님은 메뉴만 볼 수 있고 주문/결제 화면은 나오지 않아요.\"",
    "링크 텍스트/복사로 <code>/menu</code> URL 클립보드 복사 가능."
   ],
   "data": [
    "링크: <code>order.qrorder.co.kr/{storeCode}/menu</code>(고정 slug <code>menu</code>). QR 미리보기 <code>qrMock(2000)</code> 식 고정 식별자.",
    "노출 메뉴 소스는 메뉴 관리(spec/02-menu.md)의 공개 메뉴 데이터. 손님 화면은 <b>열람 전용 모드</b>로 장바구니·결제 UI를 렌더하지 않는다.",
    "다른 QR과 달리 테이블/주문 채널에 종속되지 않는 독립 자동 생성 항목."
   ],
   "exception": [
    "메뉴가 0개여도 QR 자체는 생성되며, 손님 화면에서는 \"준비 중인 메뉴예요\" 식 빈 상태 노출(주문 버튼은 어떤 경우에도 비노출).",
    "손님이 메뉴판 QR로 들어와 주문을 시도할 수 없도록, 주문/결제 진입 경로를 전 구간 차단(보안·UX 경계).",
    "권한: 현황·임시 출력은 owner·staff 모두 가능."
   ]
  }
 },
 "translate": {
  "1": {
   "purpose": [
    "손님이 보는 메뉴명·설명을 <b>4개 언어</b>(영어 <code>en</code> / 번체 <code>zhTw</code> / 간체 <code>zhCn</code> / 일본어 <code>ja</code>)로 입력·관리하는 화면의 <b>언어 전환 탭</b>과 <b>전체 개요</b> 영역",
    "선택한 언어 1개를 '현재 편집 언어'로 잡아 입력표 전체를 그 언어 기준으로 바인딩(한국어→선택 언어 1:1 편집)",
    "각 언어별 번역 완성도를 <b>진행률(%)·n/총개수</b>로 한눈에 보여 어느 언어가 덜 채워졌는지 파악하게 함",
    "이 데이터는 손님 QR 화면의 언어 전환 기능에 그대로 연결됨(SPEC §6, spec/02-menu.md §6)"
   ],
   "behavior": [
    "언어 탭 4개: 클릭 시 <code>state.trLang</code> 변경 후 <code>renderApp()</code>로 표 재렌더. 기본값 <code>'en'</code>(영어). 활성 탭은 파란 강조(<code>.t.on</code>)",
    "각 탭 라벨 우측에 <b>해당 언어 입력 완료 수 / 총 개수</b> 표시(예: <code>3/9</code>). 카운트는 현재 <b>대상</b>(메뉴/옵션/세트) 항목 중 <code>tr[langCode]</code>가 비어있지 않은 개수",
    "진행률 카드: 큰 퍼센트(<code>pct=round(filled/total*100)</code>) + 진행바(파란 채움) + '<b>{flag} {label} 번역 진행률 — {대상종류} 기준</b>' 캡션. 대상·언어 전환 시 즉시 재계산",
    "완료 요약 문구는 능동·긍정: 미입력이 있으면 '<code>{filled}/{total}개 완료 · 미입력 N개</code>'(앰버), 모두 채우면 '<code>모두 완료</code>'(초록)",
    "헤더 우측 pill에 현재 선택 언어를 표기('<code>{flag} {label}</code>'), 패널 제목 우측에 '<code>한국어 → {flag} {label}</code>' 방향 표시",
    "탭/대상/언어 전환은 저장 없이 즉시 반영(모든 입력은 입력 즉시 메모리 반영, 별도 저장 버튼 없음 — 실서비스는 자동저장 또는 명시 저장 중 택1, §5.4 참고)"
   ],
   "data": [
    "언어 마스터 <code>TR_LANGS = [{code:'en',label:'English',flag:🇺🇸}, {code:'zhTw',label:'繁體中文'}, {code:'zhCn',label:'簡体中文'}, {code:'ja',label:'日本語'}]</code> — 4개 고정, 1차 릴리즈 범위(SPEC §1.1: 서비스 자체는 한국어, 손님 다국어만 이 4종)",
    "항목별 번역 필드: <code>item.tr[langCode]</code>(메뉴명 번역), <code>item.trDesc[langCode]</code>(설명 번역). 둘 다 <code>trEnsure()</code>로 4개 언어 키를 빈 문자열 보장",
    "확정 데이터 모델은 <code>Translation</code> 행 단위(DATA_MODEL §2.11): <code>{store_id, entity_type(menu|category|option_group|option_item), entity_id, locale(en/ja/zh-CN 등), field(name|description), value(≤200자)}</code>, UQ=(entity_type,entity_id,locale,field). 프로토타입의 <code>tr/trDesc</code> 맵은 이 행 집합으로 정규화 저장",
    "진행률 계산식: <code>filled = 현재 대상 항목 중 tr[lang] 비어있지 않은 수</code>, <code>pct = total>0 ? round(filled/total*100) : 0</code> (total=0이면 0%)",
    "로케일 코드 매핑 주의: 화면 내부 코드 <code>zhTw/zhCn</code> ↔ 표준 <code>zh-TW/zh-CN</code>, <code>en/ja</code>는 동일 — 저장 시 표준 BCP-47로 정규화 권장"
   ],
   "exception": [
    "<b>권한</b>: 번역은 owner·staff 모두 편집 가능(SPEC §1.6.2 '옵션 그룹·세트·원산지·번역' = owner ✓ / staff ✓). 별도 비활성 처리 없음",
    "total=0(해당 대상에 항목이 하나도 없음)일 때 진행률 <code>0%</code>·진행바 빈 상태로 표기하고 표는 빈 상태 문구 노출(핀 2 참조)",
    "안내 보조문구는 가능형 유지: '<code>손님이 보는 메뉴명·설명을 4개 언어로 입력해요. 사전 기반 자동 번역도 가능해요.</code>'",
    "언어 추가/삭제는 1차 범위 외(4종 고정). 다국가·추가 로케일은 후속 — 모델은 <code>locale</code> 가변이므로 확장 가능"
   ]
  },
  "2": {
   "purpose": [
    "선택한 언어 기준으로 <b>한국어 원문 → 번역</b>을 입력하는 표 전체 영역과, 그 위의 <b>대상 전환·검색·필터·일괄 자동번역</b> 컨트롤",
    "번역 작업 범위(메뉴/옵션 그룹/세트 메뉴)를 좁히고, 미입력 항목만 빠르게 채워넣도록 돕는 작업 도구 모음",
    "표는 상품코드·원문(메뉴명+설명)·번역 입력칸·행 액션으로 구성되어 항목별 번역을 한 화면에서 처리"
   ],
   "behavior": [
    "대상 chip 3종: '<code>🍽️ 메뉴</code>'(기본, <code>state.trTarget='menu'</code>) / '<code>🧩 옵션 그룹</code>'(<code>'option'</code>) / '<code>🎁 세트 메뉴</code>'(<code>'set'</code>). 클릭 시 표 데이터 소스를 <code>MENUS/OPT_GROUPS/SETS</code>로 교체하고 우측에 항목 수 표시",
    "검색 입력 '<code>원문(한국어)으로 찾기</code>': <code>state.trSearch</code>에 바인딩, 원문 <code>name</code>에 대소문자 무시 부분일치 필터. <code>onchange</code>(엔터/포커스아웃)에 재렌더",
    "토글 '<code>미입력만 보기</code>'(<code>state.trOnlyEmpty</code>, 기본 OFF): ON이면 현재 언어 <code>tr[lang]</code>가 빈 행만 노출. 검색과 AND 결합",
    "버튼 '<code>⚡ 미입력 전체 자동 번역</code>'(<code>autoTranslateAll</code>): 현재 대상의 미입력 항목만 사전 기반 자동번역. 이미 입력된 값은 건드리지 않음(덮어쓰기 없음). 사전에 있으면 <code>tr/trDesc</code> 채우고, 없으면 건너뜀",
    "표 헤더 4컬럼: '<code>상품코드</code>'(90px) · '<code>원문 (한국어)</code>'(35%) · '<code>{flag} {label} 번역</code>' · 행 액션(140px, 무라벨)",
    "정렬은 항목 원본 순서(메뉴판 노출 순서) 유지 — 별도 정렬 UI 없음. 검색·필터는 표시 행만 줄임(SPEC §2.6 검색·필터 준용)"
   ],
   "data": [
    "대상별 소스: <code>menu→MENUS</code>(kind='메뉴'), <code>option→OPT_GROUPS</code>('옵션 그룹'), <code>set→SETS</code>('세트 메뉴'). 진행률·카운트도 이 대상 기준으로 분리 계산",
    "필터 파이프라인: <code>rows = items.filter(name 부분일치).filter(미입력만 보기 ? !tr[lang] : true)</code>",
    "자동번역 사전 <code>TR_DICT</code>: 한글 단어/구문 → <code>{en,zhTw,zhCn,ja}</code> 매핑(카페 메뉴 위주). <code>trAuto(text,lang)</code>는 ① 완전일치 우선 ② 없으면 부분 문자열 치환 ③ 매칭 0건이면 빈 문자열 반환",
    "<code>autoTranslateAll</code> 결과 누계 <code>cnt</code>(번역됨)·<code>skipped</code>(사전 미등록)를 집계하여 결과 안내에 사용",
    "검색·토글 상태는 화면 로컬 상태(<code>trSearch/trOnlyEmpty</code>)이며 저장 대상 아님. 번역 값만 <code>Translation</code>으로 영속화"
   ],
   "exception": [
    "빈 상태 2종(표 본문 colspan=4): 대상 항목이 0개면 '<code>먼저 {대상종류}을 등록해 주세요.</code>'(메뉴 화면으로 유도), 검색·필터로 결과가 0개면 '<code>다른 조건으로 다시 찾아봐 주세요.</code>' (§3.2 능동·긍정 톤)",
    "일괄 자동번역 결과는 안내로 노출: '<code>자동 번역 결과 · 번역됨: {cnt}개 · 사전 미등록 (수동 입력 필요): {skipped}개</code>' (프로토타입 alert → 실서비스 success/info 토스트 §1.1, 미등록 다수 시 직접 입력 유도)",
    "검색은 <b>원문(한국어)만</b> 대상(번역값으로는 검색 안 됨) — placeholder로 명시. 번역값 검색이 필요하면 후속 범위",
    "미입력만 보기 ON 상태에서 한 행을 채우면 다음 렌더에서 그 행이 목록에서 사라짐(완료 처리로 자연 감소) — 의도된 동작",
    "200ms 이하로 끝나는 자동번역은 로딩 표시 생략(§2.2). 실서비스 AI API 연동 시 인라인 스피너('처리 중...')와 5초/30초 타임아웃 규칙 적용"
   ]
  },
  "3": {
   "purpose": [
    "메뉴(또는 옵션 그룹/세트) <b>한 항목당 한 행</b>으로, 해당 항목의 메뉴명·설명을 현재 언어로 번역 입력·수정하는 단위 영역",
    "행 좌측에 원문 컨텍스트(상품코드·이모지·원문명·메타)를 함께 보여 어떤 상품을 번역 중인지 즉시 식별",
    "행 단위 자동번역과 행 단위 비우기로 항목별 빠른 편집 지원"
   ],
   "behavior": [
    "번역 입력칸(메뉴명): <code>oninput</code> 시 <code>setTranslation(target,id,'name',lang,value)</code> → <code>item.tr[lang]</code> 즉시 갱신. placeholder는 자동번역 후보(<code>trAuto(원문)</code>)가 있으면 그 값, 없으면 '<code>번역 입력</code>'",
    "설명 입력칸(2번째): 원문 <code>desc</code>가 있는 항목에만 노출. <code>setTranslation(...,'desc',...)</code>로 <code>item.trDesc[lang]</code> 갱신. placeholder는 자동번역 후보 또는 '<code>설명 번역(선택)</code>'",
    "버튼 '<code>⚡ 자동</code>'(<code>autoTranslateOne</code>): 그 행의 원문명/설명을 사전 기반 번역해 <code>tr/trDesc[lang]</code>에 채움(있으면 덮어씀). 행 단위는 명시 액션이므로 기존 값도 갱신",
    "버튼 '<code>✕</code>'(빨강): 현재 언어의 그 행 <code>tr[lang]</code>·<code>trDesc[lang]</code>를 빈 문자열로 비우고 재렌더. 번역값이 있을 때만 노출",
    "행 메타 표시 규칙: 메뉴='<code>{카테고리|미분류} · {가격}원</code>', 옵션그룹='<code>{필수|선택} · 항목 N개</code>', 세트='<code>구성품 N개 · {가격}원</code>'. 메뉴 행은 좌측에 대표 이모지(<code>img</code>, 기본 🍽️)",
    "입력은 즉시 메모리 반영(자동저장 성격). 표 재렌더 없이 타이핑되며 진행률/탭 카운트는 다음 렌더 때 갱신"
   ],
   "data": [
    "행 키: <code>item.id</code>로 <code>MENUS/OPT_GROUPS/SETS</code>에서 항목 조회. 표시 상품코드 <code>item.code</code>(영문1자+숫자5 = 6자, 매장 내 유니크, M=메뉴/O=옵션/S=세트 — spec/02-menu §1.5.1·§8)",
    "원문 바인딩: <code>origName=item.name</code>, <code>origDesc=item.desc</code>. 번역 바인딩: <code>trName=tr[lang]</code>, <code>trDesc=trDesc[lang]</code>",
    "검증: <code>value</code> 길이 ≤200자(Translation.value), 메뉴명 번역도 원문과 동일하게 1~30자 권장. HTML 주입 방지 위해 따옴표 이스케이프(<code>\"→&quot;</code>) 후 바인딩",
    "연동: 입력값은 손님 QR 화면(언어 전환)에서 해당 상품의 표시명/설명으로 노출. <code>entity_type</code>는 대상별로 menu/option_group(+option_item)/세트로 매핑(DATA_MODEL §2.11)",
    "<code>autoTranslateOne</code>은 <code>trAuto</code> 결과가 빈 문자열이면 값을 쓰지 않고 안내만 표시"
   ],
   "exception": [
    "행 자동번역에서 사전에 없으면: '<code>사전에 없는 단어예요. 직접 입력해 주세요.</code>' 안내(가능형·능동 톤). 값은 변경하지 않음",
    "번역 미입력 행은 손님 화면에서 <b>원문(한국어) fallback</b> 노출(spec/02-menu §6) — 즉 빈 칸이 손님에게 빈 값으로 보이지 않음",
    "설명 원문이 없는 항목은 설명 입력칸 자체를 숨김(불필요 입력 방지)",
    "입력 검증 실패(200자 초과 등) 시 §5.2: 필드 테두리 빨강 + 아래 빨간 메시지, 토스트 미사용. 경계값은 자동 절단이 아닌 입력 거부 권장",
    "권한 부족 상황은 발생하지 않음(번역은 owner/staff 공통). 단 가격은 표 메타로 '표시만' 하며 이 화면에서 수정 불가(가격 수정은 메뉴 화면·owner 전용 §1.6.2)"
   ]
  },
  "4": {
   "purpose": [
    "표 하단 <b>안내 배너</b>로, '⚡ 자동 번역'이 어떤 방식으로 동작하는지(사전 기반)와 한계를 사장님에게 설명",
    "사전에 없는 단어는 직접 입력해야 정확하다는 점을 알려 자동번역 결과를 맹신하지 않도록 유도",
    "실서비스 고도화 방향(AI 번역 API 연동)을 개발팀에 명시하는 제품 노트 성격 포함"
   ],
   "behavior": [
    "정적 정보 배너(<code>.banner-info</code>), 클릭·토글 등 인터랙션 없음. 표 아래 항상 노출",
    "자동번역 동작의 기준 정보를 제공(현재는 내장 <code>TR_DICT</code> 카페 메뉴 사전). 핀 2·3의 ⚡ 버튼 동작과 일관",
    "실서비스 전환 시 본 배너 문구를 'AI 번역으로 초안을 만들고 검수해 주세요' 류로 업데이트하도록 가이드"
   ],
   "data": [
    "참조 데이터: 자동번역 사전 <code>TR_DICT</code>(한글→4개 언어). 완전일치 우선, 부분 치환 보조(<code>trAuto</code>)",
    "별도 저장·연동 필드 없음(순수 안내 텍스트)",
    "실서비스 권장: 외부 번역 API(예: 기계번역) 결과를 초안으로 <code>Translation.value</code>에 채우고 owner 검수 플로우 추가"
   ],
   "exception": [
    "노출 문구 그대로: '<code>💡 ⚡ 자동 번역은 카페 메뉴 사전을 기반으로 동작해요. 사전에 없는 단어는 직접 입력해야 정확해요. (실서비스에서는 AI 번역 API 연동을 권장)</code>'",
    "톤: 능동·긍정·가능형 유지, 경고·공포 표현 금지(§3.2)",
    "배너는 빈 상태·에러와 무관하게 항상 표시(표가 비어 있어도 노출되어 다음 행동을 안내)"
   ]
  }
 },
 "coupon": {
  "1": {
   "purpose": [
    "<b>화면 헤더 + 쿠폰 생성 진입</b> 영역. 페이지 제목 <code>쿠폰</code>, 보조문구 \"손님에게 발급할 쿠폰을 만들고 사용 현황을 봐요.\", 우측 상단 <code>[+ 쿠폰 만들기]</code> 기본 버튼으로 구성한다.",
    "<code>[+ 쿠폰 만들기]</code> 클릭 시 쿠폰 생성 모달을 띄워 신규 <code>coupon</code> 엔터티 1건을 만든다. 이 화면에서 쿠폰을 발행/관리하는 단일 진입점이다.",
    "발행처(매장/소프트먼트)에 따라 정산 처리가 달라지므로, 사장님이 직접 만드는 쿠폰은 항상 <code>issuer='merchant'</code>로 생성된다(소프트먼트 발행분은 본사가 별도 주입)."
   ],
   "behavior": [
    "생성 모달 입력 필드: <b>이름</b>(<code>name</code>, 텍스트), <b>코드</b>(<code>code</code>, 영문대문자+숫자, 미입력 시 자동 생성), <b>종류</b>(<code>kind</code> 라디오: 정액/비율/무료/증정), <b>할인값</b>(<code>value</code> — 정액=원, 비율=%, 무료·증정=0 고정·입력 숨김), <b>사용 조건</b>(<code>condition</code>, 예: 최소 주문금액 1만원 이상), <b>발급 수량</b>(<code>issued</code> 정수), <b>사용 기간</b>(<code>period</code> 시작~종료일 또는 \"상시\").",
    "모달 푸터 <code>[취소]</code>는 변경 폐기 후 닫기, <code>[발급]</code>(기본 버튼)은 검증 통과 시 목록 맨 위에 추가하고 모달을 닫는다(spec/08-common 모달 규칙).",
    "<b>기본값</b>: 종류=정액, 발급 수량=무제한(빈값 허용), 기간 시작=오늘(영업일 03:00 기준 당일, SPEC §1.1), 상태=시작일이 미래면 <code>예약</code>·당일이면 <code>사용중</code>.",
    "발급 직후 토스트 \"쿠폰을 발급했어요.\"를 띄우고 핀2 지표·핀3 목록을 즉시 갱신한다."
   ],
   "data": [
    "<code>coupon{ id, name, code, kind('정액'|'비율'|'무료'|'증정'), value:number, condition:string, period:string, issued:number, used:number, status('사용중'|'종료'|'예약'), issuer('merchant'|'softment') }</code>.",
    "신규 생성 API는 <code>POST /coupons</code> 성격. <code>code</code>는 매장 내 유일(중복 불가).",
    "기간 만료(종료일 < 영업일 당일) 시 배치/조회 시점에 <code>status='종료'</code>로 자동 전환(자동 종료, 핀4와 동일 규칙).",
    "발행처 기본 <code>issuer='merchant'</code> → 정산 제외(사장님 할인 <code>disc</code>로 매출 차감, SPEC §2.1·정산 STATES §8). <code>issuer='softment'</code>는 본사 발행분으로 정산 시 보전."
   ],
   "exception": [
    "권한: 쿠폰 생성·발급은 <b>owner 전용</b>(SPEC §1.6). staff 계정은 <code>[+ 쿠폰 만들기]</code> 버튼을 비활성(disabled)하고 \"사장님만 쿠폰을 만들 수 있어요.\" 툴팁 노출.",
    "필수값 누락 시 폼 검증: 이름 빈값 \"쿠폰 이름을 적어 주세요.\", 정액 value≤0 \"할인 금액을 1원 이상 입력해 주세요.\", 비율 value 1~100 벗어남 \"할인율은 1~100% 사이로 입력해 주세요.\".",
    "코드 중복 시 \"이미 사용 중인 코드예요. 다른 코드를 적어 주세요.\".",
    "기간 종료일이 시작일보다 빠르면 \"종료일은 시작일 이후로 정해 주세요.\". 발급 수량을 비우면 \"수량을 비워 두면 무제한으로 발급할 수 있어요.\" 안내(가능형)."
   ]
  },
  "2": {
   "purpose": [
    "<b>쿠폰 KPI 4지표</b> 카드 행. 좌→우 <code>사용중 쿠폰</code>·<code>발급 누계</code>·<code>사용 누계</code>·<code>사용률</code>을 한눈에 보여준다.",
    "쿠폰 운영 성과(얼마나 발급했고 실제 사용으로 이어졌는지)를 요약해 다음 쿠폰 기획 판단을 돕는다."
   ],
   "behavior": [
    "<b>사용중 쿠폰</b> = <code>COUPONS.filter(c=>c.status==='사용중').length</code>, 접미사 \"개\".",
    "<b>발급 누계</b> = <code>sum(c.issued)</code> 전체 쿠폰 발급 수량 합.",
    "<b>사용 누계</b> = <code>sum(c.used)</code>, 파란색(<code>--blue</code>) 강조.",
    "<b>사용률</b> = <code>round(sum(used)/sum(issued)*100)</code> %. 분모 0이면 0% 표시. 4개 지표는 현재 상태 필터(핀3)와 무관하게 항상 전체 기준으로 집계(요약 성격)."
   ],
   "data": [
    "집계 소스는 발급·사용 로그(<code>coupon.issued</code>, <code>coupon.used</code>). 카운트성 읽기 전용 지표로 API는 <code>GET /coupons/summary</code> 성격.",
    "<code>used</code>는 실제 결제에 적용된 쿠폰 건수로, 결제/주문 화면의 <code>order.couponName/couponAmt</code> 사용 이벤트와 동기화된다.",
    "사용률 계산식은 항상 정수 반올림. 발급 무제한(<code>issued=null</code>) 쿠폰은 발급 누계·사용률 분모에서 제외하고 사용 누계에만 반영."
   ],
   "exception": [
    "쿠폰이 0건이면 모든 카드 0 표시(사용률 0%), \"아직 만든 쿠폰이 없어요. 쿠폰을 만들어 손님에게 혜택을 줄 수 있어요.\" 류의 안내는 핀3 빈 상태에서 처리.",
    "분모 0 방어로 사용률 NaN/Infinity 미발생(0% 고정).",
    "권한 무관 owner·staff 모두 조회 가능(읽기 전용 지표)."
   ]
  },
  "3": {
   "purpose": [
    "<b>쿠폰 목록 패널</b>. 제목 \"쿠폰 목록\" 옆 총 개수(<code>N개</code>)와 우측 상태 필터 칩을 제공한다.",
    "상태별로 쿠폰을 빠르게 추려보고 개별 쿠폰 행(핀4)으로 진입하는 목록 컨테이너."
   ],
   "behavior": [
    "상태 필터 칩 4종: <code>전체</code>(기본 on)·<code>사용중</code>·<code>종료</code>·<code>예약</code>. 클릭 시 <code>state.couponStatusFilter</code> 설정 후 재렌더, 선택 칩에 <code>on</code> 강조.",
    "전체/미설정이면 모든 행, 그 외엔 <code>c.status===필터</code> 행만 노출.",
    "표 헤더 컬럼: <code>이름 | 코드 | 종류 | 조건 | 기간 | 발행처 | 사용 현황 | 상태 | (관리)</code>. 헤더 클릭 정렬 지원(SPEC §2.6 — 기본 정렬은 최신 생성/사용중 우선).",
    "각 행 클릭(또는 행 내 [관리] 버튼) 시 해당 쿠폰 상세/관리로 진입."
   ],
   "data": [
    "소스 <code>COUPONS</code> 배열, 필터 후 행 렌더. 목록 조회 API는 <code>GET /coupons?status=</code> 성격.",
    "헤더의 총 개수 <code>N개</code>는 <b>필터 적용 전 전체 개수</b>(<code>COUPONS.length</code>) 기준.",
    "상태값 <code>status</code> 도메인: 사용중·종료·예약. 종료·예약은 pill 색으로 시각 구분(사용중=<code>done</code>, 그 외=<code>hold</code>)."
   ],
   "exception": [
    "전체 0건 빈 상태: \"아직 만든 쿠폰이 없어요. 위 [+ 쿠폰 만들기]로 첫 쿠폰을 만들 수 있어요.\" (능동·가능형).",
    "특정 필터 결과 0건: \"이 상태의 쿠폰이 아직 없어요.\" 안내 후 [전체 보기] 칩으로 복귀 유도.",
    "정렬/검색/페이징은 공통 규칙(SPEC §2.6) 준수, 목록 길어지면 페이지네이션 노출."
   ]
  },
  "4": {
   "purpose": [
    "<b>개별 쿠폰 행</b>. 이름·코드·종류·조건·기간·발행처·사용 현황·상태를 한 줄에 표기하고 우측 [관리] 버튼을 둔다.",
    "발행처(매장 vs 소프트먼트)에 따른 정산 영향까지 사장님이 행에서 바로 인지하도록 한다."
   ],
   "behavior": [
    "<b>종류 표기</b>: 정액 → \"정액 5,000원\", 비율 → \"비율 15%\", 무료/증정 → 라벨만.",
    "<b>사용 현황</b>: <code>used/issued · rate%</code> 텍스트 + 진행 막대(<code>width=rate%</code>, 파란색). <code>rate=round(used/issued*100)</code>, issued 0이면 0%.",
    "<b>발행처 배지</b>: <code>issuer==='softment'</code> → 초록 \"소프트먼트\" + 보조 \"정산 보전\"; <code>'merchant'</code> → 황색 \"매장 발행\" + 보조 \"정산 제외\".",
    "<b>상태 pill</b>: 사용중=<code>done</code>(초록), 종료·예약=<code>hold</code>(회색). [관리] 버튼으로 수정/중단/삭제 진입(owner 전용)."
   ],
   "data": [
    "행 필드: <code>name, code(monospace), kind, value, condition, period, issuer, used, issued, status</code>.",
    "<b>소프트먼트 발행(<code>issuer='softment'</code>) 쿠폰은 정산 시 보전</b>: 정산 내역 화면의 <code>couponPlatformAmt</code>(보전금, 정산에 가산)로 연동. <b>매장 발행(merchant)</b>은 <code>couponMerchantAmt</code> 참고용으로 정산 제외이며 사장님 할인 <code>disc</code>로 당일 매출 차감(정산 STATES §8).",
    "환불 발생 시 해당 거래의 쿠폰 사용은 <b>원거래일 매출/보전에서 차감</b>(SPEC §1.5). 결제 완료(<code>Payment.status=paid</code>) 거래의 취소는 결제 취소(환불)로 처리되어 쿠폰 사용 카운트·보전금도 함께 되돌린다.",
    "주문/결제 화면 쿠폰 적용 이벤트(<code>order.couponName, couponAmt, couponIssuer</code>)와 <code>used</code> 누계가 동기화된다."
   ],
   "exception": [
    "기간 만료 시 <b>자동 종료</b>: 종료일 < 영업일 당일이면 조회 시점에 <code>status='종료'</code> 전환, pill 회색. [관리]에서 재발급 안내 \"기간이 끝난 쿠폰이에요. 기간을 늘려 다시 사용할 수 있어요.\".",
    "예약 쿠폰(시작일 미래)은 손님 사용 불가, 상태 \"예약\" + \"YYYY-MM-DD부터 쓸 수 있어요\" 보조문구.",
    "발급 수량 소진(<code>used>=issued</code>, 무제한 제외) 시 사용 막대 100%·\"모두 사용했어요\" 표기, 신규 사용 차단.",
    "[관리]는 owner 전용 — staff는 비활성 + \"사장님만 쿠폰을 관리할 수 있어요.\" 툴팁."
   ]
  }
 },
 "staff": {
  "1": {
   "purpose": [
    "<b>직원 계정 관리 화면 전체의 목적 정의</b>. 매장에서 실제 주문 처리를 하는 직원에게 로그인 가능한 계정을 발급·관리하는 owner 전용 운영 화면.",
    "사장님(owner) 본인 계정은 이 화면에서 다루지 않고 <b>사이드바 상단 사용자 박스 → 내 정보</b>에서 별도 관리한다. 따라서 목록·KPI에서 owner는 항상 제외된다.",
    "직원 계정에는 생성 시 <b>자동으로 'staff' 권한</b>이 부여되며, 권한은 화면에서 선택·변경할 수 없다(단일 권한 모델, SPEC §1.6.1)."
   ],
   "behavior": [
    "라우트 진입 시 <code>renderStaff(main)</code> 실행. 크럼브 \"매장 운영 › 직원 계정 관리\", 페이지 제목 \"직원 계정 관리\".",
    "화면 구성 순서: 툴바(제목+안내문구+[ℹ️ 권한 설명][+ 직원 등록] 버튼) → 안내 박스 → KPI 3카드 → 검색·필터 → 직원 목록 표.",
    "owner 전용이므로 staff 역할이 진입하면 화면 자체를 노출하지 않는다(좌측 메뉴는 회색+자물쇠, SPEC §1.6.2 '권한 관리(직원 계정)' staff=✗)."
   ],
   "data": [
    "데이터 소스: <code>STAFF_LIST</code> 배열. 직원 엔터티 필드 = <code>id</code>(number, PK), <code>loginId</code>(string), <code>name</code>(string), <code>phone</code>(string), <code>email</code>(string), <code>groupId</code>(number: 1=사장/owner, 2=직원/staff), <code>useFrom</code>(date|''), <code>useTo</code>(date|''), <code>enabled</code>('Y'|'N'), <code>regDate</code>(date), <code>isMe</code>(bool, owner 본인만 true).",
    "이 화면은 <code>groupId!==1</code> (사장 제외) 레코드만 다룬다. <code>groupId=2</code>(staff)가 노출 대상.",
    "권한 매트릭스(SPEC §1.6.2)와 연동: 여기서 만든 계정의 역할이 전체 어드민 화면 노출/액션 가능 여부를 결정한다."
   ],
   "exception": [
    "owner 전용 화면. staff가 URL 직접 접근 시 권한 안내 모달 \"사장님 권한이 필요해요. 가맹점주 본인 계정으로 로그인해 주세요\" (spec/08-common.md 403 처리).",
    "데이터 로딩 실패 시 표 영역에 공통 에러 빈 상태 + 재시도. 본인(owner) 계정은 이 화면에 노출되지 않음을 페이지 부제로 안내: \"사장님 본인 계정은 사이드바 위 사용자 박스에서 관리할 수 있어요.\""
   ]
  },
  "2": {
   "purpose": [
    "<b>매장 계정의 발급 경로를 안내</b>하는 정보 박스. 사장님이 직원 계정과 매장(본사 발급) 계정을 혼동하지 않도록 구분해 준다.",
    "직원 계정 생성 시 자동으로 '직원' 권한이 부여된다는 점과, 상세 권한 범위는 [ℹ️ 권한 설명]에서 확인 가능함을 안내한다."
   ],
   "behavior": [
    "표 위에 항상 노출되는 정적 안내 박스(💡 아이콘). 클릭 동작 없음(읽기 전용).",
    "노출 문구: \"<b>매장 계정</b>은 가입 시 소프트먼트(본사)에서 만들어 드려요. 사장님은 매장에서 일할 <b>직원 계정만 추가</b>하시면 돼요. 직원에게는 자동으로 <b>'직원' 권한</b>이 부여돼요. 자세한 권한 범위는 우상단 <b>ℹ️ 권한 설명</b> 버튼에서 확인할 수 있어요.\"",
    "[ℹ️ 권한 설명] 버튼 클릭 시 <code>openStaffPermsModal()</code> 실행(핀 6에서 상세)."
   ],
   "data": [
    "정적 텍스트. 바인딩 데이터 없음.",
    "매장(본사 발급) 계정은 <code>groupId=1</code>(owner)로, 가맹 계약 시 소프트먼트가 생성하며 어드민에서 추가/삭제 불가."
   ],
   "exception": [
    "추가 매장 계정이 필요하면 본사 문의 경로(고객 지원)로 안내. 능동·가능형 톤 유지(\"확인할 수 있어요\").",
    "예외 동작 없음(정적 영역). 반응형에서 좁은 화면일 때도 줄바꿈으로 전체 문구 노출 유지."
   ]
  },
  "3": {
   "purpose": [
    "<b>직원 계정 현황을 한눈에 보여 주는 KPI 카드 3종</b>: 전체 직원 계정 / 사용 중 / 사용 안 함.",
    "사장님이 활성 인력 규모와 비활성(퇴사·휴직) 계정 수를 즉시 파악하도록 한다."
   ],
   "behavior": [
    "3개 카드 가로 배치(<code>grid-template-columns:repeat(3,1fr)</code>). 클릭 동작 없는 수치 표시 전용.",
    "카드1 \"전체 직원 계정\" = <code>totalCnt</code> = staff 전체 수. 카드2 \"사용 중\" = <code>activeCnt</code>(enabled==='Y'), 파란색 강조. 카드3 \"사용 안 함\" = <code>offCnt</code>(enabled==='N').",
    "각 수치 뒤 단위 \"명\" 표기. 사용 안 함 카드는 <code>offCnt>0</code>이면 진한 회색, 0이면 연한 회색으로 표시.",
    "수치는 <b>필터·검색과 무관하게 항상 전체 집계</b>(<code>STAFF_LIST.filter(groupId!==1)</code> 기준)로 고정."
   ],
   "data": [
    "집계식: <code>totalCnt = staff(groupId=2) 전체 건수</code>, <code>activeCnt = enabled==='Y' 건수</code>, <code>offCnt = enabled==='N' 건수</code>. 항상 <code>activeCnt + offCnt = totalCnt</code>.",
    "사용 종료일(<code>useTo</code>)이 지난 계정은 영업일 03:00 경계(SPEC §1.1) 기준으로 자동 <code>enabled='N'</code> 처리되어 '사용 안 함' 집계에 반영된다(핀 6 참조)."
   ],
   "exception": [
    "직원 0명이면 세 카드 모두 \"0명\"으로 표시(빈 상태 텍스트는 표 영역에서 별도 처리).",
    "owner 본인 계정은 어떤 카드에도 집계되지 않음."
   ]
  },
  "4": {
   "purpose": [
    "<b>사용 여부 필터 + 직원 검색</b>으로 목록을 좁히는 영역. 계정 수가 많을 때 원하는 직원을 빠르게 찾도록 한다."
   ],
   "behavior": [
    "사용 여부 칩 3종: \"전체\" / \"사용 중\" / \"사용 안 함\". 클릭 시 <code>state.staffUseFilter</code>를 'all'/'Y'/'N'으로 설정하고 <code>renderApp()</code> 재렌더. 기본값 <b>'all'(전체)</b>, 활성 칩은 <code>.chip.on</code> 강조.",
    "검색 입력 1개: placeholder \"직원명·로그인 ID·휴대폰\". <code>oninput</code>으로 <code>state.staffSearch</code> 갱신, <code>onchange</code>(엔터/포커스아웃)에 <code>renderApp()</code> 실행.",
    "검색 매칭 대상: <code>name + ' ' + loginId + ' ' + phone</code> 결합 문자열에 대한 <b>대소문자 무시 부분 일치</b>(SPEC §2.6). 이메일은 검색 대상에서 제외.",
    "필터와 검색은 AND 결합되어 표에 반영. KPI 카드 수치에는 영향을 주지 않음."
   ],
   "data": [
    "<code>state.staffUseFilter</code>: 'all' | 'Y' | 'N' (기본 'all'). <code>state.staffSearch</code>: string (기본 '').",
    "필터링 로직: <code>rows = STAFF_LIST.filter(groupId!==1)</code> → useFilter!=='all'이면 <code>enabled===useFilter</code> → search 있으면 부분 일치(SPEC §2.6 검색 규칙).",
    "정렬·페이징은 SPEC §2.6 공통 규칙 적용 대상이나 현재 표는 등록 순(배열 순) 단일 정렬."
   ],
   "exception": [
    "필터·검색 결과가 0건이면 표 빈 행에 \"조건에 맞는 직원이 없어요. 검색·필터를 다시 살펴봐 주세요.\" 노출(능동·긍정 톤).",
    "전체 직원이 0명이면 \"아직 등록한 직원 계정이 없어요. 위 + 직원 등록을 눌러 추가해 주세요.\" 노출.",
    "검색어 앞뒤 공백은 매칭 시 무시. 빈 검색어면 필터만 적용."
   ]
  },
  "5": {
   "purpose": [
    "<b>직원 계정 목록 표</b>. 등록된 직원의 핵심 정보를 한 줄에 보여 주고, 행에서 바로 수정·삭제·사용여부 확인이 가능하게 한다.",
    "컬럼: # / 직원명 / 로그인 ID / 휴대폰 / 이메일 / 사용 기간 / 사용 여부 / 등록일 / (액션)."
   ],
   "behavior": [
    "표 헤더 \"직원 목록\" 옆에 건수 표시: 필터 결과가 전체와 다르면 \"N명 · 전체 M명 중\", 같으면 \"N명\".",
    "각 행 셀: # = 표시 순번(1부터), 직원명 = 굵게, 로그인 ID = 모노스페이스, 휴대폰·이메일·등록일은 보조색. 등록일은 <code>YYYY-MM-DD</code>를 <code>YYYY.MM.DD</code>로 표기.",
    "사용 기간 셀: <code>useFrom</code>·<code>useTo</code>가 모두 없으면 \"기간 없음\"(연한 회색), 있으면 \"useFrom ~ useTo\" 형식(없는 쪽은 '~').",
    "사용 여부 셀: 상태 pill — 'Y'면 \"사용 중\"(done/초록), 'N'이면 \"사용 안 함\"(cancel/회색).",
    "행 액션 셀: [수정] 버튼 → <code>openStaffEditModal(id)</code>, [삭제] 버튼(빨강) → <code>deleteStaff(id)</code>.",
    "헤더 정렬은 SPEC §2.6 기준으로 확장 가능하나 기본은 등록 순 표시."
   ],
   "data": [
    "행 바인딩: <code>id, name, loginId, phone, email, useFrom, useTo, enabled, regDate</code>.",
    "검증 규칙(등록/수정 시, SPEC 08 §5.3 폼 검증): 직원 이름 한글·영문 2~10자, 로그인 ID 영문·숫자 5~20자(매장 내 유일), 휴대폰 <code>010-0000-0000</code> 형식, 이메일 정규식 <code>^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$</code>.",
    "등록일(<code>regDate</code>)은 생성 시 서버 영업일(SPEC §1.1, 03:00 시작) 기준 자동 기록.",
    "이메일은 비밀번호 찾기·계정 안내 발송 채널과 연동."
   ],
   "exception": [
    "이메일 미입력 행은 셀에 \"—\" 표시(현재 모델상 이메일은 필수이나 표시 안전장치).",
    "빈 상태 문구: 전체 0명 \"아직 등록한 직원 계정이 없어요. 위 + 직원 등록을 눌러 추가해 주세요.\" / 필터 0건 \"조건에 맞는 직원이 없어요. 검색·필터를 다시 살펴봐 주세요.\"",
    "로그인 ID·연락처 형식 오류는 저장 단계에서 차단(핀 6 검증 메시지 참조, SPEC 08 §5.3).",
    "owner(본인) 행은 목록에 절대 표시되지 않음."
   ]
  },
  "6": {
   "purpose": [
    "<b>계정 사용/중지 전환 및 정보 수정·삭제, 권한 설명, 신규 등록</b>을 담당하는 액션 영역. 계정 사용 여부로 로그인 차단을 제어한다.",
    "포함 요소: [+ 직원 등록] 버튼, [ℹ️ 권한 설명] 모달, 행 [수정]/[삭제], 등록·수정 모달 내 '계정 사용 여부' 토글."
   ],
   "behavior": [
    "[+ 직원 등록] → <code>openStaffAddModal()</code>: 빈 폼(기본 <code>enabled='Y'</code>, <code>groupId=3</code>이나 저장 시 강제 2로 고정), 저장 버튼 \"직원 등록하기\".",
    "[수정] → <code>openStaffEditModal(id)</code>: 기존 값 채움, <b>로그인 ID는 readonly</b>(\"한 번 정한 ID는 바꿀 수 없어요\"), 비밀번호는 빈칸(\"비워 두면 변경되지 않아요\"), 저장 버튼 \"저장\".",
    "모달 '계정 사용 여부' 토글: ON=\"사용 중\"(enabled='Y'), OFF=\"사용 안 함\"(enabled='N'). 보조문구 \"사용 안 함으로 두면 로그인이 막혀요\". OFF인 계정은 로그인 차단.",
    "[삭제] → <code>deleteStaff(id)</code>: confirm \"{이름} 직원 계정을 삭제할까요? 이 계정으로는 더 이상 로그인할 수 없게 돼요.\" 확인 시 목록에서 제거 + 토스트.",
    "사용 종료일(<code>useTo</code>) 경과 시 영업일 03:00 경계(SPEC §1.1)에 자동 <code>enabled='N'</code> 전환(\"종료일 이후엔 자동으로 사용 안 함이 돼요\").",
    "권한은 선택 불가 — 모달에 \"자동 '직원' 권한이 부여돼요\" 안내만 노출, 저장 시 <code>groupId=2</code> 강제."
   ],
   "data": [
    "토글 상태 플래그: <code>staff.enabled</code> ('Y'|'N'). 저장 시 등록=<code>STAFF_LIST.push</code>(id=max+1, regDate=오늘), 수정=<code>Object.assign</code>(loginId 제외 갱신).",
    "권한 고정: 저장 시 <code>groupId=2</code>(staff) 강제. 이 값이 SPEC §1.6.2 매트릭스를 통해 전체 어드민 접근 권한을 결정.",
    "비밀번호: 등록 시 필수(영문·숫자·특수문자 8~20자), 수정 시 빈칸이면 미변경. 첫 로그인 시 본인 변경 권장 안내.",
    "사용 여부와 사용 종료일은 로그인 게이트키핑에 함께 사용(enabled='N' 또는 useTo 경과 → 로그인 거부)."
   ],
   "exception": [
    "저장 검증 실패 메시지(SPEC 08 §5.3): 이름 미입력 \"직원 이름을 입력해 주세요.\", 휴대폰 \"휴대폰을 입력해 주세요.\", 로그인 ID \"로그인 ID를 입력해 주세요.\", 비밀번호(등록) \"비밀번호를 입력해 주세요.\", 이메일 미입력 \"이메일을 입력해 주세요. 비밀번호 찾기·계정 안내에 필요해요.\", 이메일 형식 \"이메일 형식을 확인해 주세요. (예: hong@example.com)\".",
    "로그인 ID 중복(등록 시) \"이미 사용 중인 로그인 ID예요. 다른 ID로 입력해 주세요.\"",
    "저장 성공 토스트 \"✅ {이름} 직원 계정을 등록했어요/수정했어요\", 삭제 토스트 \"🗑️ {이름} 직원 계정을 삭제했어요\".",
    "owner(본인) 계정은 이 화면에서 변경/삭제 불가(<code>isMe</code> 가드). 사용여부·정보 변경은 owner만 가능(SPEC §1.6.2, staff=✗).",
    "권한 세분화 요청 안내(권한 모달 하단): \"⚠️ 권한 범위를 더 세밀하게 나누고 싶다면 고객 지원 → 서비스 관련 문의로 알려 주세요. 다음 업데이트 때 검토해 드릴게요.\""
   ]
  }
 },
 "notify": {
  "1": {
   "purpose": [
    "<b>알림 센터</b> 화면의 목적은 소프트먼트(운영사)와 소속 본사가 보내는 <b>공지·안내</b>를 한 곳에서 확인하는 것",
    "실시간 주문·재고·리뷰 알림은 각 기능 페이지에서 다루고, 이 화면에는 <b>상위 조직 공지만</b> 표시 (발신처 3종: 시스템 관리자/기업 관리자/브랜드 관리자)",
    "상단 헤더에 제목 <code>공지·안내</code>와 안내 문구, 우측에 <b>확인이 필요한 공지 강조 칩</b>을 배치해 사장님이 미확인 건을 바로 인지하게 함"
   ],
   "behavior": [
    "미확인 건수는 사이드바 <code>알림 센터</code> 메뉴 우측 <b>빨간 배지</b>로 표시 (값: <code>NOTIFICATIONS.filter(n=>!n.read).length</code>, 0이면 배지 숨김)",
    "헤더 강조 칩은 <code>🔔 N건 확인해 주세요</code> 형태로 미확인 수를 노출, 클릭 시 <code>state.notifyOnlyUnread</code> 토글 → 활성 시 칩 색 반전 + 라벨 끝에 <code>· 보는 중</code> 추가",
    "홈 대시보드 \"챙겨야 할 일\" 카드에도 미확인 수가 합산 노출 (<code>notifyUnread</code>), 카드 클릭 시 <code>setSection('notify')</code>로 진입",
    "최초 진입 기본 상태: 발신처 필터 접힘(<code>notifyFilterOpen=false</code>), 전체 발신처(<code>notifyFilter='all'</code>), 미확인만 보기 꺼짐(<code>notifyOnlyUnread=false</code>)"
   ],
   "data": [
    "공지 엔터티 <code>NOTIFICATIONS[]</code>: <code>id</code>, <code>level</code>(발신처), <code>tag</code>(분류), <code>urgent</code>(긴급 여부), <code>title</code>, <code>body</code>, <code>issuer</code>(표시용 발신 기관명), <code>date</code>, <code>read</code>(읽음 플래그)",
    "발신처 <code>level</code> 3종 — <code>softment</code>(시스템 관리자/운영사), <code>corp</code>(기업 관리자), <code>brand</code>(브랜드 관리자); 표시 메타는 <code>NOTIFY_LEVELS</code>(label·short·color·bg)",
    "본사/운영사 공지는 어드민 <b>상단 배너 + 앱 푸시 동시 발송</b> — SPEC §1.8, 알림 센터는 그 수신 이력의 영구 보관함 역할",
    "미확인 카운트는 클라이언트가 <code>!read</code> 건수를 집계해 사이드바 배지·홈 카드·헤더 칩 세 곳에 동시 반영"
   ],
   "exception": [
    "문구는 <b>능동·긍정 톤</b> 유지 — 미확인을 알릴 때 \"미확인 N건\"이 아닌 <code>🔔 N건 확인해 주세요</code>로 표현 (부정형 회피)",
    "안내 문구는 <code>소프트먼트와 소속 본사에서 보내는 공지·안내를 한 곳에서 확인해 주세요.</code>",
    "공지가 0건일 때는 빈 화면 대신 모두 확인했음을 긍정적으로 안내 (홈 카드 기준 <code>모든 알림을 확인하셨어요</code>)",
    "staff·매니저 권한도 공지는 <b>읽기 전용</b> — 발송·삭제 권한은 상위 조직에만 있고 사장님은 확인만 가능"
   ]
  },
  "2": {
   "purpose": [
    "<b>공지 목록</b>은 전체 공지를 한 목록으로 조회하고, 발신처별 필터와 미확인만 보기로 원하는 공지를 빠르게 좁히는 영역",
    "<code>모두 읽음 처리</code> 버튼으로 누적된 미확인을 한 번에 정리할 수 있게 함",
    "목록 헤더에 현재 노출 건수와 전체 건수를 함께 보여 필터 적용 상태를 인지하게 함 (<code>공지 목록 N건 · 전체 M건 중</code>)"
   ],
   "behavior": [
    "기본 정렬: <b>미확인 + 긴급이 위로</b>, 그다음 발행일시 최신순 (가중치 <code>(!read?2:0)+(urgent?1:0)</code> 내림차순, 동률 시 <code>date</code> 최신순)",
    "<code>발신처 ▼</code> 버튼 클릭 시 필터 줄 펼침(<code>notifyFilterOpen</code> 토글), 칩 4종 — <b>전체 / 🟦 시스템 관리자 / 🟪 기업 관리자 / 🟩 브랜드 관리자</b>, 각 칩에 건수 배지, 선택 시 <code>notifyFilter</code> 갱신 + 버튼에 활성 점(<code>●</code>) 표시",
    "<code>모두 읽음 처리</code> 클릭 시 <code>markAllNotifyRead()</code> 실행 → 전 공지 <code>read=true</code> 일괄 처리 후 재렌더(배지·카운트 즉시 갱신)",
    "안 읽음 공지는 <b>강조 표시</b>(제목 굵게 800, 우측 빨간 점), 읽은 공지는 <code>opacity:.65</code>로 흐리게 처리",
    "미확인만 보기(헤더 칩) + 발신처 필터는 <b>중첩 적용</b>되며, 행 클릭 시 상세로 진입"
   ],
   "data": [
    "읽음 플래그 <code>notification.read</code> (boolean) — 목록 강조·정렬·미확인 집계의 단일 기준",
    "발신처 구분 <code>sender</code>/<code>level</code> 값으로 필터 (<code>all|softment|corp|brand</code>), 발신처별 건수 <code>softCnt·corpCnt·brandCnt</code> 집계",
    "필터 상태는 화면 로컬 상태 <code>state.notifyFilter</code>·<code>state.notifyFilterOpen</code>·<code>state.notifyOnlyUnread</code>로 보관 (구버전 <code>'unread'</code> 값은 <code>notifyOnlyUnread=true</code>로 자동 이관)",
    "발행일시 <code>date</code>는 목록에서 <code>M/D HH:mm</code> 축약 표기, 발신처 기관명 <code>issuer</code>와 함께 메타 줄에 노출"
   ],
   "exception": [
    "새 공지를 모두 확인한 상태 안내: <b>능동·긍정</b>으로 <code>새로운 공지를 모두 확인하셨어요</code> (부정형 회피)",
    "필터·미확인 조건으로 결과가 0건일 때는 빈 상태 문구 <code>다른 조건으로 한번 살펴봐 주세요.</code> 노출 (없다고 단정하지 않음)",
    "<code>모두 읽음 처리</code>는 사이드바 배지·헤더 칩이 즉시 0으로 줄어드는 것으로 처리 결과를 피드백",
    "권한과 무관하게 읽음 처리·필터는 모든 사용자가 사용 가능 (조회·확인 전용 화면이라 별도 권한 제약 없음)"
   ]
  },
  "3": {
   "purpose": [
    "<b>개별 공지 항목</b>을 클릭하면 상세 모달로 공지 본문 전체를 확인할 수 있음",
    "목록에서는 본문을 2줄로 요약(<code>line-clamp:2</code>) 노출하고, 상세에서 전체 본문과 문의처 안내를 제공",
    "긴급·점검 공지는 목록·상세에서 시각적으로 우선 인지되도록 강조"
   ],
   "behavior": [
    "행 클릭 시 <code>openNotifyDetail(id)</code> 호출 → 해당 공지 <code>read=true</code> 처리 + 상세 모달 펼침 (열람 즉시 읽음 처리되어 미확인 카운트 감소)",
    "상세 모달 구성: 발신처 배지 + (긴급 시) <code>긴급</code> 배지 + <code>tag</code> 배지, 제목, <code>발신처 · 발행일시</code> 메타, 본문(<code>white-space:pre-line</code>), 문의 안내 카드, <code>닫기</code> 버튼",
    "<b>긴급(urgent) 공지는 상단 강조</b> — 정렬 가중치로 목록 최상단 배치 + 빨간 <code>긴급</code> 배지 노출 (예: 정기 점검·정책 변경)",
    "목록 행은 마우스 오버 시 배경 강조(<code>--bg-2</code>)되어 클릭 가능함을 표시"
   ],
   "data": [
    "공지 본문 <code>body</code>, 발행일시 <code>date</code>(상세는 <code>YYYY-MM-DD HH:mm</code> 원본 표기), 중요도 <code>urgent</code>, 분류 <code>tag</code>(예: 점검·정책·약관·정산·신메뉴·이벤트·프로모션·안내)",
    "발신처별 문의처 매핑: <code>softment</code>→<code>고객센터(1644-0000)</code>, <code>brand</code>→<code>본사 매장운영팀</code>, <code>corp</code>→<code>본사 사무국</code>",
    "발신처 표시 메타 <code>NOTIFY_LEVELS[level]</code>(label·short·color·bg)로 배지 색·라벨 결정, 본문 첨부(단가표 등)는 본문 내 안내로 연동",
    "열람 시 갱신되는 <code>read</code> 플래그가 목록 강조·사이드바 배지·홈 카드 카운트에 즉시 반영"
   ],
   "exception": [
    "긴급/점검 공지는 <b>색만으로 의미를 전달하지 않고</b> 빨간 색상 + <code>긴급</code> 텍스트 배지·아이콘을 병행 — SPEC 08 §7.1(색만으로 의미 전달 금지, 아이콘/텍스트 라벨 병행)",
    "상세 모달 하단 안내 카드는 긍정 톤으로 문의를 유도: <code>💡 {발신처}에서 보낸 {분류}예요. 추가 문의는 {문의처}으로 부탁드려요.</code>",
    "존재하지 않는 <code>id</code>로 상세 호출 시 모달을 열지 않고 무시(가드 <code>if (!n) return;</code>)해 오류 노출을 방지",
    "공지는 사장님이 수정·삭제할 수 없는 <b>읽기 전용</b>이므로 상세에는 확인용 <code>닫기</code> 액션만 제공"
   ]
  }
 }
};
