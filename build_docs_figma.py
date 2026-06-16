# -*- coding: utf-8 -*-
"""기획 보드 + 요구사항정의서를 한 장의 Figma 임포트용 정적 페이지로 합본."""
import re, io, sys

ROOT = r"C:/Users/박지은/Documents/GitHub/qrorder-mockup"
BOARD = ROOT + "/customer-description-dev.html"
REQ   = ROOT + "/requirements.html"
OUT   = ROOT + "/customer-docs-figma.html"

def read(p):
    with io.open(p, "r", encoding="utf-8") as f:
        return f.read()

board = read(BOARD)
req   = read(REQ)

def between(s, a, b):
    i = s.index(a) + len(a)
    j = s.index(b, i)
    return s[i:j]

# ── 보드: style / main 본문 / script ──
board_style  = between(board, "<style>", "</style>")
board_main   = between(board, '<main class="main" id="main">', "</main>")
board_script = between(board, "<script>", "</script>")
# 사이드바·스크롤 JS 제거 (보드 렌더까지만 사용)
board_script = board_script.split("document.getElementById('sidebar')")[0]

# ── 요구사항: style(스코핑) / body 본문 ──
req_style = between(req, "<style>", "</style>")
req_style = req_style.replace(":root{", ".req-doc{").replace("body{", ".req-doc{")
req_body  = between(req, "<body>", "</body>")

OVERRIDE = """
/* ── 합본 전용 오버라이드 ── */
body{display:block !important;min-height:auto !important;background:#EEF1F5;
  font-family:'Pretendard',-apple-system,sans-serif;}
.combo-wrap{max-width:1480px;margin:0 auto;padding:28px 28px 80px;}
.combo-hero{background:linear-gradient(135deg,#111827 0%,#2563EB 100%);
  color:#fff;border-radius:18px;padding:32px 36px;margin-bottom:8px;}
.combo-hero h1{font-size:26px;font-weight:800;letter-spacing:-.5px;margin-bottom:6px;}
.combo-hero p{font-size:14px;opacity:.85;}
.part-banner{display:flex;align-items:center;gap:12px;
  font-size:20px;font-weight:800;color:#111827;margin:36px 0 16px;
  padding-bottom:12px;border-bottom:3px solid #111827;}
.part-banner span{font-size:12px;font-weight:800;color:#fff;background:#2563EB;
  padding:4px 12px;border-radius:100px;letter-spacing:.5px;}
.req-doc{background:transparent;padding:0;}
.req-doc .page{max-width:none;padding:0;}
.req-doc .doc-header{display:none;}  /* 합본 히어로와 중복 → 숨김 */
"""

html = f"""<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>QR오더 손님 화면 · 통합 기획본 (보드 + 요구사항)</title>
<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet">
<style>
{board_style}
</style>
<style>
{req_style}
</style>
<style>
{OVERRIDE}
</style>
</head>
<body>
<div class="combo-wrap">

  <header class="combo-hero">
    <h1>QR오더 손님 화면 · 통합 기획본</h1>
    <p>PART 1 화면별 기획 보드 + PART 2 요구사항 정의서 — 한 페이지 통합 · 개발·디자인 전달용</p>
  </header>

  <div class="part-banner"><span>PART 1</span> 화면별 기획 보드</div>
  {board_main}

  <div class="part-banner"><span>PART 2</span> 요구사항 정의서</div>
  <div class="req-doc">
  {req_body}
  </div>

</div>
<script>
{board_script}
</script>
</body>
</html>
"""

with io.open(OUT, "w", encoding="utf-8") as f:
    f.write(html)

print("WROTE", OUT, len(html), "chars")
