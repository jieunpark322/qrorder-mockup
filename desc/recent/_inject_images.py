"""각 보드 HTML의 brd-cap placeholder를 실제 이미지로 교체"""
import re, os

BOARDS = r'C:\Users\박지은\Documents\GitHub\qrorder-mockup\desc\recent'

# 보드 → 이미지 + 설명 캡션
IMG_MAP = {
    '01-menu-badges.html':       ('01-menu-edit.png',           '메뉴 정보 수정 모달 — 섹션 1(기본 정보)의 메뉴 배너 토글 영역'),
    '02-option-modes.html':      ('02-option-bulk.png',         '옵션 그룹 → + 새 옵션 그룹 추가 펼침 — 선택 방식 select + 최대 선택 개수 input'),
    '03-option-edit-modal.html': ('03-option-edit.png',         '옵션 그룹 수정 모달 — ✏️ 수정 버튼으로 진입'),
    '04-option-max-select.html': ('03-option-edit.png',         '옵션 그룹 수정 모달의 「🎚️ 메뉴별 최대 선택 개수」 섹션 — 메뉴 측·옵션 측 양방향 편집'),
    '05-sold-out-unified.html':  ('05-stock.png',               '오늘의 준비량 페이지 — 「오늘 품절 처리」 탭 단일 토글'),
    '06-holiday-schedule.html':  ('06-schedule.png',            '카테고리 판매 시간 모달 — 🇰🇷 법정 공휴일 처리 3옵션'),
    '07-allergy-text.html':      ('07-menu-edit-allergy.png',   '메뉴 정보 수정 모달 — 섹션 5(알레르기 정보) 자유 텍스트 입력'),
    '08-menu-edit-layout.html':  ('01-menu-edit.png',           '메뉴 정보 수정 모달 — 5개 섹션 카드 구조 + 사진 4:3'),
    '09-excel-download.html':    ('09-export.png',              '엑셀 다운로드 모달 — 매출 한눈에 보기에서 진입한 모습'),
}

# 옛 placeholder 패턴 (brd-cap-hint가 들어있는 section)
PATTERN = re.compile(r'<section class="brd-cap">.*?</section>', re.DOTALL)

for fname, (img, caption) in IMG_MAP.items():
    path = os.path.join(BOARDS, fname)
    if not os.path.exists(path):
        print(f'SKIP (missing): {fname}')
        continue
    with open(path, 'r', encoding='utf-8') as f:
        html = f.read()
    new_section = (
        f'<section class="brd-cap">'
        f'<img src="img/{img}" alt="화면 캡처" loading="lazy" />'
        f'<div class="brd-cap-cap"><b>📷 화면 캡처</b> · {caption}</div>'
        f'</section>'
    )
    new_html, n = PATTERN.subn(new_section, html)
    if n == 0:
        print(f'NO MATCH: {fname}')
        continue
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_html)
    print(f'updated: {fname} → img/{img}')

print('done.')
