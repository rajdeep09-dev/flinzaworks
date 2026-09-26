"""Resolve the shipped CSS cascade for the home hero, at a list of viewport widths.

There is no browser in this sandbox, so the first screen is verified the only honest way
available: read the CSS that actually ships, in the order the browser reads it, and compute
the geometry it produces.

Three things are checked, against `.next/server/app/index.html` plus the stylesheets it links:

  A  the rail   the pinned chrome row and the hero's text share one content edge, and the
                wordmark's two cyan rules stand on that edge — except on a phone, where they
                deliberately step out past it
  B  the mark  the wordmark's painted em, the width of the word, and the band of the frame
                it occupies (the reference puts it at 25–46% of the height)
  C  the tiers  the phone is a different composition, not the same one scaled: its own
                alignment, its own button, its own framed 2×2, its own figure crop

Desktop renders under `html { zoom: 0.75 }` (globals.css), so one viewport unit paints at
0.75 of a screen percent and the hero's 133.333svh box is exactly one real screen.
"""

import os
import re
import sys
from html.parser import HTMLParser

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "website")
HTML = os.path.join(BASE, ".next", "server", "app", "index.html")
ZOOM = 0.75

# F L I N Z A in Nohemi 800 at -0.045em tracking: .70 .55 .30 .72 .63 .70 of advance, less
# six trackings. 3.74em is deliberately the CONSERVATIVE figure — a real render can only be
# narrower than the numbers this prints.
ADVANCE_EM = 3.74


# ── input ───────────────────────────────────────────────────────────────────────────────────

def stylesheet_order():
    class P(HTMLParser):
        def __init__(self):
            super().__init__()
            self.hrefs = []

        def handle_starttag(self, tag, attrs):
            d = dict(attrs)
            if tag == "link" and d.get("rel") == "stylesheet":
                self.hrefs.append(d["href"])

    p = P()
    p.feed(open(HTML, encoding="utf8").read())
    return p.hrefs


def load_css(hrefs):
    out = []
    for h in hrefs:
        rel = h.lstrip("/")
        if rel.startswith("_next/"):
            rel = rel[len("_next/"):]
        for cand in (os.path.join(BASE, ".next", rel),
                     os.path.join(BASE, "public", rel)):
            if os.path.exists(cand):
                out.append((h, open(cand, encoding="utf8").read()))
                break
        else:
            raise SystemExit("stylesheet not on disk: " + h)
    return out


# ── a small CSS reader ──────────────────────────────────────────────────────────────────────

def strip_comments(css):
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)


def match_brace(css, open_idx):
    depth, k, n = 0, open_idx, len(css)
    while k < n:
        if css[k] == "{":
            depth += 1
        elif css[k] == "}":
            depth -= 1
            if depth == 0:
                return k
        k += 1
    raise SystemExit("unbalanced braces")


def match_paren(s, open_idx):
    depth, k = 0, open_idx
    while k < len(s):
        if s[k] == "(":
            depth += 1
        elif s[k] == ")":
            depth -= 1
            if depth == 0:
                return k
        k += 1
    raise SystemExit("unbalanced parens")


def split_values(s):
    """Split a CSS value list on top-level commas AND whitespace (e.g. `padding-block: a b`)."""
    out, depth, cur = [], 0, ""
    for c in s:
        if c == "(":
            depth += 1
        elif c == ")":
            depth -= 1
        if depth == 0 and c in ", ":
            if cur.strip():
                out.append(cur.strip())
            cur = ""
        else:
            cur += c
    if cur.strip():
        out.append(cur.strip())
    return out


def split_args(s):
    out, depth, cur = [], 0, ""
    for c in s:
        if c == "(":
            depth += 1
        elif c == ")":
            depth -= 1
        if c == "," and depth == 0:
            out.append(cur)
            cur = ""
        else:
            cur += c
    if cur.strip():
        out.append(cur)
    return out


def split_selectors(sel):
    return [s.strip() for s in split_args(sel) if s.strip()]


def parse_decls(body):
    d = {}
    for m in re.finditer(r"([-a-zA-Z]+)\s*:\s*([^;{}]+)", body):
        d[m.group(1).lower()] = m.group(2).strip()
    return d


def parse(css):
    """Yield (media conditions, selector, declarations) in document order."""
    css = strip_comments(css)
    i, n, stack, start = 0, len(css), [], 0
    while i < n:
        c = css[i]
        if c == "}":
            if stack:
                stack.pop()
            i += 1
            start = i
            continue
        if c == "@":
            j = css.index("{", i)
            header = css[i:j].strip()
            if header.startswith("@media"):
                # descend: the block's own closing brace pops the condition
                stack.append(header[6:].strip())
                i, start = j + 1, j + 1
            elif header.startswith("@supports"):
                stack.append("")  # treated as satisfied
                i, start = j + 1, j + 1
            else:  # @keyframes, @font-face, @layer — not a selector
                i = start = match_brace(css, j) + 1
            continue
        if c == "{":
            sel = css[start:i].strip()
            k = match_brace(css, i)
            if sel and not sel.startswith("@"):
                decls = parse_decls(css[i + 1:k])
                if decls:
                    for part in split_selectors(sel):
                        yield (tuple(stack), part, decls)
            i = start = k + 1
            continue
        if c == ";":
            i += 1
            start = i
            continue
        i += 1


def specificity(sel):
    s = re.sub(r"::?[a-zA-Z-]+(\([^)]*\))?", "", sel)
    return (
        len(re.findall(r"#[\w-]+", s)),
        len(re.findall(r"\.[\w-]+", s)) + len(re.findall(r"(?<!:):(?!:)", s)),
        len(re.findall(r"[\w]+", re.sub(r"[#.][\w-]+", "", s))),
    )


def media_ok(cond, width, height, fine):
    if not cond.strip():
        return True
    for p in re.findall(r"\(([^()]+)\)", cond):
        p = p.strip()
        m = re.match(r"(min|max)-(width|height|device-width|device-height)\s*:\s*([\d.]+)px", p)
        if m:
            cur = width if "width" in m.group(2) else height
            if m.group(1) == "min" and cur < float(m.group(3)):
                return False
            if m.group(1) == "max" and cur > float(m.group(3)):
                return False
            continue
        m = re.match(r"pointer\s*:\s*(fine|coarse|none)", p)
        if m:
            if m.group(1) == "fine" and not fine:
                return False
            if m.group(1) == "coarse" and fine:
                return False
            continue
    return True


def collect(sheets, width, height, fine):
    won = {}
    for href, css in sheets:
        for conds, sel, decls in parse(css):
            if not all(media_ok(c, width, height, fine) for c in conds):
                continue
            spec = specificity(sel)
            prev = won.get(sel)
            if prev and prev[0] > spec:
                continue
            merged = dict(prev[1]) if prev else {}
            merged.update(decls)
            won[sel] = (spec, merged, href)
    return won


def root_props(sheets, width, height, fine):
    out = {}
    for _, css in sheets:
        for conds, sel, decls in parse(css):
            if sel == ":root" and all(media_ok(c, width, height, fine) for c in conds):
                for k, v in decls.items():
                    if k.startswith("--"):
                        out[k] = v
    return out


def decl(won, sel, prop, default=None):
    hit = won.get(sel)
    return hit[1].get(prop, default) if hit else default


# ── value maths ─────────────────────────────────────────────────────────────────────────────

def clamp(v, lo, hi):
    return max(lo, min(hi, v))


def term(t, vw, vh, em=None):
    m = re.fullmatch(r"(-?[\d.]+)(px|vw|vh|svh|em|rem|%)?", t.strip())
    if not m:
        return None
    n, unit = float(m.group(1)), (m.group(2) or "px")
    if unit == "px":
        return n
    if unit in ("vw", "svw"):
        return n / 100 * vw
    if unit in ("vh", "svh"):
        return n / 100 * vh
    if unit == "em":
        return n * (em if em is not None else 16)
    if unit == "rem":
        return n * 16
    if unit == "%":
        return n / 100 * (em if em is not None else vw)
    return None


def value(expr, vw, vh, root=None, em=None):
    """Resolve any CSS length expression this codebase actually uses to px."""
    expr = (expr or "").strip()
    if not expr:
        return None
    m = re.search(r"(clamp|min|max|calc|env|var)\(", expr)
    if not m:
        return sum_of(expr, vw, vh, em)
    name = m.group(1)
    op = expr.index("(", m.start())
    cl = match_paren(expr, op)
    inner = expr[op + 1:cl]
    if name == "var":
        ref = inner.split(",")[0].strip()
        if not root or ref not in root:
            return None
        return value(root[ref], vw, vh, root, em)
    args = [value(a, vw, vh, root, em) for a in split_args(inner)]
    if name == "env":
        out = args[1] if len(args) > 1 else 0.0
    elif name == "calc":
        out = sum(a for a in args if a is not None)
    elif name == "min":
        vals = [a for a in args if a is not None]
        out = min(vals) if vals else None
    elif name == "max":
        vals = [a for a in args if a is not None]
        out = max(vals) if vals else None
    else:
        vals = [a for a in args if a is not None]
        out = clamp(vals[1], vals[0], vals[2]) if len(vals) == 3 else None
    if out is None:
        return None
    rest = expr[:m.start()] + str(out) + "px" + expr[cl + 1:]
    if rest.strip() == str(out) + "px":
        return out
    return sum_of(rest, vw, vh, em)


def sum_of(expr, vw, vh, em=None):
    expr = re.sub(r"\s+", "", expr)
    if re.fullmatch(r"-?[\d.]+px", expr):
        return float(expr[:-2])
    total, sign, buf = 0.0, 1, ""
    for ch in expr:
        if ch in "+-" and buf:
            total += sign * (term(buf, vw, vh, em) or 0.0)
            buf, sign = "", 1 if ch == "+" else -1
        else:
            buf += ch
    if buf:
        total += sign * (term(buf, vw, vh, em) or 0.0)
    return total


# ── the report ──────────────────────────────────────────────────────────────────────────────

WIDTHS = [
    (2560, 1440, True), (1920, 1080, True), (1728, 1117, True), (1512, 982, True),
    (1440, 900, True), (1280, 800, True), (1101, 900, True), (1100, 900, True),
    (1024, 768, True), (900, 1200, False), (820, 1180, False),
    (768, 1024, False), (700, 900, False), (430, 932, False),
    (390, 844, False), (360, 640, False), (320, 568, False),
]


def two(value_str, lo, hi, vw, vh, root):
    """A one- or two-value CSS property resolved to (start, end)."""
    if not value_str:
        return lo, hi
    parts = split_values(value_str)
    if len(parts) == 1:
        one = value(parts[0], vw, vh, root) or 0.0
        return one, one
    return (value(parts[0], vw, vh, root) or 0.0, value(parts[1], vw, vh, root) or 0.0)


def main():
    sheets = load_css(stylesheet_order())
    print("stylesheets, in the order the document links them:")
    for h, _ in sheets:
        print("   ", h)
    print()

    rows = []
    for w, h, fine in WIDTHS:
        won = collect(sheets, w, h, fine)
        vw, vh = float(w), float(h)
        root = root_props(sheets, w, h, fine)
        rail = value(decl(won, ":root", "--flinza-rail"), vw, vh, root) or 0.0
        rail_end = value(decl(won, ":root", "--flinza-rail-end"), vw, vh, root)
        if rail_end is None:
            rail_end = rail
        ch = two(decl(won, ".flinza-hero-chrome", "padding-inline"), rail, rail_end, vw, vh, root)
        inn = two(decl(won, ".flinza-hero-inner", "padding-inline"), rail, rail_end, vw, vh, root)
        escaped = "-1)" in (decl(won, ".flinza-hero-mark", "margin-inline") or "")
        rule_l = 0.0 if escaped else inn[0]
        rule_r = 0.0 if escaped else inn[1]
        z = ZOOM if fine else 1.0
        mark = value(decl(won, ":root", "--flinza-mark-size"), vw, vh, root) or 0.0
        painted = mark * z
        if decl(won, ".flinza-hero-stage", "padding-top"):
            pad_t = value(decl(won, ".flinza-hero-stage", "padding-top"), vw, vh, root) or 0.0
        else:
            blk = decl(won, ".flinza-hero-stage", "padding-block")
            pad_t = value(split_values(blk)[0], vw, vh, root) if blk else 0.0
        mt = value(decl(won, ".flinza-hero-markwrap", "margin-top"), vw, vh, root) or 0.0
        band_top = (pad_t + mt) * z
        band_bot = band_top + painted * 0.86
        rows.append(dict(w=w, h=h, fine=fine, won=won, vw=vw, vh=vh, root=root, z=z,
                         rail=rail, rail_end=rail_end, ch=ch, inn=inn, escaped=escaped,
                         rule_l=rule_l, rule_r=rule_r, mark=mark, painted=painted,
                         band_top=band_top, band_bot=band_bot))

    # A ── the rail
    print("A · THE RAIL — one gutter, shared by the pinned chrome row and the hero's text")
    print(f"{'viewport':>13} {'tier':>8} {'rail':>6} | {'chrome L/R':>11} {'hero L/R':>11} "
          f"| {'rule L/R':>11} {'tier rule':>10} | {'verdict':>8}")
    print("-" * 92)
    bad = 0
    for r in rows:
        w = r["w"]
        same = (abs(r["ch"][0] - r["inn"][0]) < 0.5 and abs(r["ch"][1] - r["inn"][1]) < 0.5
                and abs(r["ch"][0] - r["rail"]) < 0.5
                and abs(r["ch"][1] - r["rail_end"]) < 0.5)
        if not same:
            bad += 1
        tier = "mobile" if w <= 760 else ("tablet" if w <= 900 else "desktop")
        print(f"{w:>6}x{r['h']:<6} {tier:>8} {r['rail']:>6.0f} | "
              f"{r['ch'][0]:>5.0f}/{w - r['ch'][1]:<5.0f} {r['inn'][0]:>5.0f}/{w - r['inn'][1]:<5.0f} | "
              f"{r['rule_l']:>5.0f}/{w - r['rule_r']:<5.0f} {'escaped' if r['escaped'] else 'on rail':>10} | "
              f"{'MATCH' if same else 'MISMATCH':>8}")
    print()
    print("  rail check:", "MATCH at every width" if bad == 0 else str(bad) + " MISMATCHES")
    print()

    # B ── the wordmark
    print("B · THE WORDMARK — painted size and the band of the frame it occupies")
    print(f"{'viewport':>13} {'tier':>8} {'em (px)':>9} {'painted':>8} {'word px':>8} "
          f"{'% width':>8} | {'band top':>9} {'band bottom':>12} | {'reference':>10}")
    print("-" * 92)
    for r in rows:
        w = r["w"]
        word = r["painted"] * ADVANCE_EM
        pct = word / w * 100
        flag = "" if 55 <= pct <= 82 else "  <-- outside 55–82%"
        band = ""
        if w >= 1101:
            t, b = r["band_top"] / r["h"] * 100, r["band_bot"] / r["h"] * 100
            band = f"{t:>8.1f}% {b:>11.1f}%"
            if not (18 <= t <= 30 and 33 <= b <= 50):
                band += "!"
        tier = "mobile" if w <= 760 else ("tablet" if w <= 900 else "desktop")
        print(f"{w:>6}x{r['h']:<6} {tier:>8} {r['mark']:>9.1f} {r['painted']:>8.1f} {word:>8.0f} "
              f"{pct:>7.1f}% | {band or '        -':>9} {'' if not band else '':>12} | "
              f"{'25-46%' if w >= 1101 else '-':>10}{flag}")
    print()

    # C ── the tiers are different compositions
    print("C · THE PHONE IS A DIFFERENT COMPOSITION, NOT THE DESKTOP ONE SCALED")
    keys = [("desktop 1280x800", 1280, 800, True),
            ("tablet   820x1180", 820, 1180, False),
            ("phone    390x844", 390, 844, False)]
    hdr = ("word %W", "claim", "support", "button", "stats", "foot", "figure crop")
    print(f"{'tier':>17} | " + " | ".join(f"{h:>11}" for h in hdr))
    print("-" * 104)
    for label, w, h, fine in keys:
        won = collect(sheets, w, h, fine)
        vw, vh = float(w), float(h)
        root = root_props(sheets, w, h, fine)
        z = ZOOM if fine else 1.0
        mark = value(decl(won, ":root", "--flinza-mark-size"), vw, vh, root) or 0.0
        word = mark * z * ADVANCE_EM / w * 100
        claim = decl(won, ".flinza-hero-claim", "align-items", "?")
        sup = decl(won, ".flinza-hero-support", "text-align", "?")
        btn = decl(won, ".flinza-hero-explore", "display", "?")
        cols = decl(won, ".flinza-hero-stats", "grid-template-columns", "?")
        stats = ("2x2 framed" if "minmax" in (cols or "") and decl(won, ".flinza-hero-stats", "border-radius")
                 else "4-across")
        foot = decl(won, ".flinza-hero-bottom", "display", "?")
        crop = decl(won, ".flinza-hero-photo", "background-size", "?")
        print(f"{label:>17} | {word:>10.1f}% | {claim:>11} | {sup:>11} | {btn:>11} | "
              f"{stats:>11} | {foot:>11} | {crop:>11}")
    print()
    return 0 if bad == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
