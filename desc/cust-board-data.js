/* 손님 화면 기획 보드 — 화면·핀·4분류 데이터 + 렌더 (전체보드/화면별 분리본 공용) */
window.CUST_CATS = {
  p:{t:'🎯 기능·목적',k:'p'}, b:{t:'⚙️ 동작·상태값',k:'b'}, d:{t:'🗄️ 데이터·연동',k:'d'}, e:{t:'⚠️ 예외·UX문구',k:'e'}
};
window.CUST_SCREENS = [
  { key:'menu', ord:1, name:'메뉴 화면', icon:'🍽️', group:'진입·탐색', pins:[
    {n:1,title:'주문 유형·테이블 배지',
      p:['QR로 진입한 주문 유형(내점·포장·예약)과 테이블 번호를 상단에 고정 표시'],
      b:['QR 파라미터로 자동 결정 · 손님이 변경 불가'],
      d:['orderType(dinein/takeout/preorder) · 테이블 번호'],
      e:['영업시간 외 진입 시 "준비중" 모달 · 메뉴 탐색만 할 수 있어요']},
    {n:2,title:'카테고리 탭',
      p:['메뉴를 카테고리로 빠르게 탐색'],
      b:['탭 클릭 시 해당 섹션으로 스크롤 · 스크롤 위치 따라 탭 자동 활성화'],
      d:['카테고리 목록(사장님 설정)'],
      e:['빈 카테고리는 탭에 표시하지 않아요']},
    {n:3,title:'메뉴 카드·담기',
      p:['메뉴를 골라 상세 시트로 담기'],
      b:['카드 탭 시 메뉴 상세 시트 오픈'],
      d:['메뉴명·가격·이미지·품절 여부'],
      e:['품절 메뉴는 탭·담기를 막아요']},
    {n:4,title:'품절 표시',
      p:['주문할 수 없는 메뉴를 명확히 구분'],
      b:['품절 배지 + 카드 흐리게 표시'],
      d:['soldOut 플래그(사장님 실시간 토글)'],
      e:['영업시간 외에는 전체 메뉴를 비활성화해요']},
  ]},
  { key:'sheet', ord:2, name:'메뉴 상세 시트', icon:'🧾', group:'진입·탐색', pins:[
    {n:1,title:'메뉴 기본 정보',
      p:['담기 전 메뉴 정보 확인'],
      b:['카드 탭 시 시트 슬라이드업 · S.sheet={id,sel,qty:1} 초기화'],
      d:['이름·단가·설명·이미지'],
      e:['품절 메뉴는 시트 진입을 막아요']},
    {n:2,title:'옵션 그룹(필수/선택)',
      p:['사이즈·온도 등 옵션 선택'],
      b:['필수 옵션 미선택 시 담기 버튼 비활성 · 선택값은 sel에 저장'],
      d:['옵션 그룹·항목·추가금액'],
      e:['옵션 없는 메뉴는 그룹을 표시하지 않아요']},
    {n:3,title:'수량·담기 버튼',
      p:['수량을 정해 장바구니에 담기'],
      b:['스테퍼로 수량 조절(최소 1) · 버튼에 개수·소계 실시간 반영'],
      d:['qty · 소계 (단가+옵션)×수량'],
      e:['동일 메뉴+옵션 조합을 다시 담으면 수량이 합쳐져요']},
    {n:4,title:'닫기(X)',
      p:['담지 않고 시트 닫기'],
      b:['X 또는 시트 밖 터치 시 닫힘 · 선택값 폐기'],
      d:['—'],
      e:['담기 전이면 장바구니에 변화가 없어요']},
  ]},
  { key:'checkout', ord:3, name:'결제 화면', icon:'💳', group:'결제', pins:[
    {n:1,title:'주문 내용',
      p:['담은 메뉴·수량·금액을 최종 확인'],
      b:['수량 변경·삭제 가능 · 변경 즉시 합계 재산출'],
      d:['cart[] (메뉴·옵션·수량·소계)'],
      e:['전부 삭제하면 메뉴 화면으로 돌아가요']},
    {n:2,title:'쿠폰 코드',
      p:['보유 쿠폰·코드로 할인'],
      b:['코드 입력 후 적용 · 한 번에 1장'],
      d:['couponId · 할인액'],
      e:['후불(내점+후불)은 쿠폰 섹션을 노출하지 않아요']},
    {n:3,title:'결제 수단',
      p:['선불 결제 수단 선택'],
      b:['카드·카카오페이·네이버페이·토스페이 중 택1'],
      d:['pay'],
      e:['후불은 결제수단을 숨기고 "현장 결제"로 안내해요']},
    {n:4,title:'약관 동의',
      p:['필수 약관 동의 후 결제'],
      b:['필수 미동의 시 결제 차단·하이라이트 · 마케팅은 선택'],
      d:['termsChecked{service,privacy,marketing}'],
      e:['후불은 약관 섹션을 노출하지 않아요']},
    {n:5,title:'결제하기 버튼',
      p:['결제·주문 진행'],
      b:['선불=알림 시트 오픈 / 후불=바로 주문 / 예약=수령시간 선택 필수'],
      d:['결제 금액(쿠폰 반영)'],
      e:['예약은 수령시간 미선택 시 버튼이 비활성화돼요']},
  ]},
  { key:'notif', ord:4, name:'알림 수단 시트', icon:'🔔', group:'결제', pins:[
    {n:1,title:'알림 수단 버튼',
      p:['주문·준비완료 알림을 받을 방법 선택'],
      b:['카카오 로그인 / 휴대폰 직접 입력 중 택1 · notifChoice 업데이트'],
      d:['notifChoice (kakao/phone)'],
      e:['카카오 로그인 유지 상태(이전 카톡 주문 이력)면 시트를 생략해요']},
    {n:2,title:'✉️ 이메일로 받기 (외국인 대응)',
      p:['휴대폰 번호가 없는 손님(외국인)도 알림을 받을 수 있어요'],
      b:['토글 시 이메일 입력 필드 노출 · 형식 검증'],
      d:['email'],
      e:['이메일은 마케팅·쿠폰을 노출하지 않아요']},
    {n:3,title:'결제 버튼',
      p:['선택한 수단으로 결제 진행'],
      b:['kakao 즉시 / phone 10자리 / email 유효형식 충족 시 활성화'],
      d:['결제 금액'],
      e:['수단 미선택 시 비활성 + 안내 문구']},
    {n:4,title:'필수 안내',
      p:['알림 수단 선택이 필요함을 안내'],
      b:['포장·예약·내점셀프+알림톡은 알림 수단 필수'],
      d:['—'],
      e:['내점 서빙은 "알림 없이 주문"을 선택할 수 있어요']},
  ]},
  { key:'processing', ord:5, name:'결제 처리 중', icon:'⏳', group:'처리·완료', pins:[
    {n:1,title:'로딩 인디케이터',
      p:['결제·주문 처리 중임을 안내'],
      b:['선불=결제→접수 2단계 / 후불=접수 1단계'],
      d:['procStep'],
      e:['응답 지연·오류 시 에러 화면으로 전환해요']},
    {n:2,title:'상태 안내 문구',
      p:['현재 처리 단계를 설명'],
      b:['"결제 처리 중" → "주문 접수 중" 단계별 문구'],
      d:['—'],
      e:['처리 중에는 뒤로가기를 막아요']},
  ]},
  { key:'done', ord:6, name:'주문 완료', icon:'✅', group:'처리·완료', pins:[
    {n:1,title:'완료 헤더·주문번호',
      p:['주문 접수를 확인'],
      b:['유형별 문구(주문 받았어요 / 포장 주문 / 예약 요청)'],
      d:['orderNo'],
      e:['예약은 "사장님 수락 대기"로 안내해요']},
    {n:2,title:'진행 단계 바',
      p:['현재 주문 상태를 시각화'],
      b:['유형별 단계 (포장: 접수·준비·픽업대기·픽업완료)'],
      d:['orderStatus'],
      e:['예약은 "수락 대기" 단계를 포함해요']},
    {n:3,title:'호출 번호 + 준비완료 알림',
      p:['대기번호 안내 + 준비완료 알림 방법 안내'],
      b:['선택 수단에 맞춰 "준비되면 카카오 알림톡으로 / 이메일로 알려드려요"'],
      d:['callNo · notifChoice'],
      e:['내점 서빙은 번호 없이 자리로 가져다 드려요']},
    {n:4,title:'주문 내역(영수증)',
      p:['주문 내역·금액 확인'],
      b:['완료 시점 cart 스냅샷'],
      d:['cart · 결제 금액'],
      e:['후불은 "나갈 때 카운터에서 결제" 안내를 더해요']},
    {n:5,title:'새 주문하기',
      p:['같은 테이블에서 추가 주문'],
      b:['cart·쿠폰·연락처 초기화 후 메뉴로 복귀'],
      d:['—'],
      e:['카카오 로그인 유지 상태면 연락처를 유지해요']},
  ]},
  { key:'error', ord:7, name:'에러 화면', icon:'⚠️', group:'처리·완료', pins:[
    {n:1,title:'에러 제목·메시지',
      p:['오류 원인을 안내'],
      b:['errType별 문구 (결제실패 / POS끊김 / 네트워크)'],
      d:['errType · CODE'],
      e:['알 수 없는 오류는 기본 안내로 처리해요']},
    {n:2,title:'재시도 버튼',
      p:['복구 동선 제공'],
      b:['결제실패=결제화면 복귀 / POS·네트워크=다시 시도'],
      d:['—'],
      e:['내점 서빙 POS 끊김은 직원 호출 버튼을 더해요']},
    {n:3,title:'결제 화면 복귀',
      p:['처음부터 다시 진행'],
      b:['결제 화면으로 돌아가기 · 장바구니 유지'],
      d:['—'],
      e:['결제 미완료라 중복 결제가 생기지 않아요']},
  ]},
  { key:'session', ord:8, name:'세션 만료', icon:'⏱️', group:'처리·완료', pins:[
    {n:1,title:'만료 안내',
      p:['보안을 위해 세션 만료를 알림'],
      b:['무활동 5분 → 자동 전환'],
      d:['—'],
      e:['기획 보드 iframe 안에서는 타이머가 작동하지 않아요']},
    {n:2,title:'QR 재스캔 카드',
      p:['새 세션 시작 방법 안내'],
      b:['테이블 QR을 다시 스캔하면 새로 시작할 수 있어요'],
      d:['—'],
      e:['다른 기기에서 같은 URL로 접속하면 독립 세션이에요']},
  ]},
];

(function(){
  var C = window.CUST_CATS;
  function catBlock(cls, items){
    var empty = (!items || !items.length || (items.length===1 && items[0]==='—'));
    return '<div class="cat '+cls+(empty?' empty':'')+'"><div class="ct">'+C[cls].t+'</div><ul>'+
      (items||['—']).map(function(i){return '<li>'+i+'</li>';}).join('')+'</ul></div>';
  }
  function boardHTML(s, imgBase){
    var cards = s.pins.map(function(pin){
      return '<div class="pinrow"><div class="pinrow-h"><span class="pn">'+pin.n+'</span><span class="pt">'+pin.title+'</span></div>'+
        '<div class="cat4">'+catBlock('p',pin.p)+catBlock('b',pin.b)+catBlock('e',pin.e)+'</div></div>';
    }).join('');
    return '<div class="board" id="b-'+s.key+'"><div class="board-h"><span class="num">'+s.ord+'</span>'+
      '<span class="nm">'+s.icon+' '+s.name+'</span><span class="gp">· '+s.group+'</span></div>'+
      '<div class="board-b"><div class="stage"><img src="'+imgBase+'cust-'+s.key+'_pin.png" alt="'+s.name+'" loading="lazy"></div>'+
      '<div class="cards">'+cards+'</div></div></div>';
  }
  /* opts: {mount, imgBase, only, idxMount} */
  window.renderCustBoards = function(opts){
    opts = opts || {};
    var imgBase = opts.imgBase || 'desc/img/';
    var list = window.CUST_SCREENS.filter(function(s){ return !opts.only || s.key===opts.only; });
    var mount = document.getElementById(opts.mount || 'boards');
    if(mount) mount.innerHTML = list.map(function(s){return boardHTML(s, imgBase);}).join('');
    if(opts.idxMount){
      var im = document.getElementById(opts.idxMount);
      if(im) im.innerHTML = window.CUST_SCREENS.map(function(s){return '<a href="#b-'+s.key+'">'+s.ord+'. '+s.name+'</a>';}).join('');
    }
  };
})();
