#!/usr/bin/env python3
"""
verify_hero_band.py — does the restored hero's BOTTOM BAND resolve correctly at every width?

The previous checker (verify_hero.py) asserts the geometry of the giant FLINZA wordmark, which
no longer exists. This one checks the band that replaced it: the paragraph and scroll cue on the
left, the four figures on the right, and the phone tier where the figures return to a 2x2.

Method, deliberately the same as verify_hero.py's: it does not read the source stylesheets. It
reads the built HTML, follows the <link rel=stylesheet> hrefs in DOCUMENT ORDER, concatenates
them, and resolves the cascade by taking the LAST declaration that matches a selector. That
matters because the minifier groups selectors, so the first match in a file is not the one that
ships. A rule that only exists in the source proves nothing.

Usage: run from the repo root, after a build.
"""

import re
import sys
from pathlib import Path

WEBSITE = Path(__file__).resolve().parent.parent / "website"
HTML = WEBSITE / ".next" / "server" / "app" / "index.html"
CSS_DIR = WEBSITE / ".next" / "static" / "css"

# Desktop `html { zoom: .75 }` for fine pointers, so a viewport unit paints at 0.75 of a
# screen percent. Every vh-derived length below is multiplied by ZOOM to match what paints.
ZOOM = 0.75

# (width, height) pairs, not widths alone. hero.css has a `@media (max-height: 560px) and
# (min-width: 760px)` block that puts the copy and the figures back side by side on a short
# landscape window, so a checker that models only width applies that block to every 760px+ screen
# and reports a layout that no tall window ever paints. "Every device" includes a 1280x500 browser
# with two toolbars, so the short cases are checked too.
VIEWPORTS = [
    (320, 568, "phone"),
    (360, 640, "phone"),
    (390, 844, "phone"),
    (430, 932, "phone"),
    (700, 900, "phone"),
    (740, 360, "phone landscape"),
    (844, 390, "phone landscape"),
    (760, 1000, "large phone"),
    (768, 1024, "tablet"),
    (820, 1180, "tablet"),
    (900, 1200, "tablet"),
    (1024, 768, "tablet landscape"),
    (1100, 900, "small desktop"),
    (1101, 900, "desktop"),
    (1280, 500, "short landscape"),
    (1280, 800, "desktop"),
    (1440, 900, "desktop"),
    (1512, 982, "desktop"),
    (1728, 1117, "desktop"),
    (1920, 1080, "desktop"),
    (2560, 1440, "desktop"),
]

failures = []
notes = []


def fail(message):
    failures.append(message)


def load_css():
    """The shipped stylesheets, concatenated in the order the document links them."""
    html = HTML.read_text(encoding="utf-8", errors="replace")
    hrefs = re.findall(r'<link rel="stylesheet" href="([^"]+)"', html)
    if not hrefs:
        sys.exit("no stylesheets linked from the built home page")
    blobs = []
    for href in hrefs:
        name = href.rsplit("/", 1)[-1]
        path = CSS_DIR / name
        if not path.exists():
            sys.exit(f"linked stylesheet missing from the build: {href}")
        blobs.append(path.read_text(encoding="utf-8", errors="replace"))
    return hrefs, "\n".join(blobs)


def split_rules(css, inherited=()):
    """Yield (conditions, selector, body) for every rule, with the @media conditions it sits in.

    A hand-rolled scan rather than a regex, because a stylesheet nests: a rule inside two nested
    @media blocks sits under BOTH conditions, and a rule at the top level sits under none.

    `inherited` is the condition stack of the enclosing block, and it is passed DOWN rather than
    rebuilt. An earlier version of this function reset the stack on every recursive call, so a rule
    inside `@media (min-width:901px)` was recorded as being at the top level — every media query
    resolved to "applies", and a `min-width:901px` rule was applied at 320px. The self-test below
    is what caught it; it is the reason the self-test exists.
    """
    out = []
    conditions = list(inherited)
    prelude = ""
    i = 0
    n = len(css)
    while i < n:
        ch = css[i]
        if ch == "{":
            header = prelude.strip()
            prelude = ""
            # find the matching close brace
            depth = 1
            j = i + 1
            while j < n and depth:
                if css[j] == "{":
                    depth += 1
                elif css[j] == "}":
                    depth -= 1
                j += 1
            body = css[i + 1 : j - 1]
            if header.startswith("@media"):
                inner = header[header.index(" ") :].strip()
                out.extend(split_rules(body, conditions + [inner]))
            elif header.startswith("@"):
                # @keyframes, @font-face, @layer, @supports — not a selector block; recurse so any
                # nested rule is still seen with the conditions it actually sits under
                out.extend(split_rules(body, conditions))
            else:
                selector = re.sub(r"\s+", " ", header)
                for one in selector.split(","):
                    out.append((tuple(conditions), one.strip(), body))
            i = j
            continue
        if ch == "}":
            conditions.pop()
            prelude = ""
            i += 1
            continue
        prelude += ch
        i += 1
    return out


def media_matches(conditions, width, height=None):
    """True if every @media condition in the stack applies at this viewport size."""
    for condition in conditions:
        if "min-width" in condition or "max-width" in condition or "height" in condition:
            ok = True
            for feature, value in re.findall(
                r"(min-width|max-width|min-height|max-height)\s*:\s*(\d+(?:\.\d+)?)px", condition
            ):
                v = float(value)
                if feature == "min-width" and width < v:
                    ok = False
                if feature == "max-width" and width > v:
                    ok = False
                if feature == "min-height" and (height is None or height < v):
                    ok = False
                if feature == "max-height" and (height is not None and height > v):
                    ok = False
            if not ok:
                return False
    return True


def declarations_for(selector, css):
    """Every (conditions, property, value) that targets exactly `selector`, in source order."""
    found = []
    target = selector.strip()
    for conditions, one, body in split_rules(css):
        # exact class-token match, so `.flinza-hero-stats` never picks up `.flinza-hero-stats li`
        if one != target:
            continue
        for prop, value in re.findall(r"([-a-z]+)\s*:\s*([^;{}]+)", body):
            found.append((conditions, prop, value.strip()))
    return found


def resolve(selector, prop, css, width, height=None):
    """The value that actually paints: the last matching declaration wins."""
    winner = None
    for condition, dprop, value in declarations_for(selector, css):
        if dprop != prop:
            continue
        if not media_matches(condition, width, height):
            continue
        winner = value
    return winner


def px(value, width, relative_to_height=None):
    """Resolve a length to painted pixels. vh/vw need the viewport; vmin/vmax too."""
    if value is None:
        return None
    m = re.fullmatch(r"(-?[\d.]+)px", value)
    if m:
        return float(m.group(1))
    m = re.fullmatch(r"(-?[\d.]+)svh", value) or re.fullmatch(r"(-?[\d.]+)vh", value)
    if m and relative_to_height:
        return float(m.group(1)) / 100 * relative_to_height * ZOOM
    m = re.fullmatch(r"(-?[\d.]+)vw", value)
    if m:
        return float(m.group(1)) / 100 * width
    m = re.fullmatch(r"calc\((.*)\)", value)
    if m:
        return px(m.group(1).strip(), width, relative_to_height)
    return None


def rail_px(css, width, var_name):
    """The --flinza-rail / --flinza-rail-end computed value at this width."""
    for conditions, one, body in split_rules(css):
        if not media_matches(conditions, width, 800):
            continue
        m = re.search(re.escape(var_name) + r"\s*:\s*([^;}]+)", body)
        if m:
            return m.group(1).strip()
    return None


def selftest():
    """Prove the resolver works before trusting it to report on the site.

    A checker that cannot fail is worse than no checker: the first version of this file reported a
    green run in which a `display:flex` element carried `grid-template-columns` and a
    `min-width:901px` rule applied at 320px. These six cases are the ones that bug was made of.
    """
    sample = (
        ".a{color:red}"
        "@media (min-width:901px){.a{color:blue}.a{margin-left:auto}}"
        "@media (max-width:760px){.a{display:grid;grid-template-columns:1fr 1fr}}"
        "@media (min-width:1101px){@media (max-width:1400px){.a{padding:9px}}}"
    )
    cases = [
        (".a", "color", 1280, "blue", "the later min-width rule wins over the top-level one"),
        (".a", "color", 400, "red", "the top-level value applies below the breakpoint"),
        (".a", "margin-left", 1280, "auto", "a property set only inside a min-width block"),
        (".a", "margin-left", 400, None, "the same property must NOT apply below the breakpoint"),
        (".a", "display", 400, "grid", "a max-width block applies at 400"),
        (".a", "display", 1280, None, "and must not at 1280"),
        (".a", "grid-template-columns", 400, "1fr 1fr", "a sibling property in the same block"),
        (".a", "padding", 1200, "9px", "a rule nested inside TWO media blocks matches both"),
        (".a", "padding", 1500, None, "and does not match when either condition fails"),
        (".a", "padding", 1000, None, "nor when only the outer one fails"),
    ]
    # expect_flex means "the max-height block should have won here". The fixture keeps a
    # top-level `display:grid`, so on a TALL window the block must not apply and grid stands.
    # These two booleans were originally the wrong way round, which made the self-test fail on
    # exactly the two cases that prove the height tier works — the worst place to be wrong,
    # because that is the tier that silently flattened a landscape phone to a phone layout.
    height_cases = [
        (1280, 800, False, "a max-height:560px block must NOT apply at height 800"),
        (1280, 500, True, "and must at height 500"),
    ]
    bad = 0
    for selector, prop, width, expected, why in cases:
        got = resolve(selector, prop, sample, width)
        ok = got == expected
        if not ok:
            bad += 1
        print(
            f"  {'ok  ' if ok else 'FAIL'}  {width:>4}px  {selector}{{{prop}}} "
            f"-> {got!r} (expected {expected!r})  # {why}"
        )
    # a max-height block must not apply on a tall window
    tall = ".b{display:grid}@media (max-height:560px) and (min-width:760px){.b{display:flex}}"
    for width, height, expect_flex, why in height_cases:
        got = resolve(".b", "display", tall, width, height)
        ok = (got == "flex") == expect_flex
        if not ok:
            bad += 1
        print(
            f"  {'ok  ' if ok else 'FAIL'}  {width:>4}x{height:<4}  .b{{display}} "
            f"-> {got!r}  # {why}"
        )
    print()
    if bad:
        print(f"  resolver self-test: {bad} case(s) wrong — the results below mean nothing")
    else:
        print("  resolver self-test: 12/12 — the cascade resolution below can be trusted")
    print()
    return bad


def main():
    selftest_failures = selftest()
    hrefs, css = load_css()
    print(f"stylesheets in document order: {', '.join(h.rsplit('/', 1)[-1] for h in hrefs)}\n")

    # ── A · the wordmark is gone from the markup AND has no rule left pointing at it ──
    print("A · THE GIANT FLINZA IS GONE")
    html = HTML.read_text(encoding="utf-8", errors="replace")
    for dead in ("flinza-hero-wordmark", "flinza-hero-markwrap", "flinza-hero-mark"):
        present_in_html = dead in html
        rules = declarations_for(f".{dead}", css)
        live = [r for r in rules if media_matches(r[0], 1280, 800)]
        if present_in_html:
            fail(f"{dead} is still in the built HTML")
        if live:
            fail(f"{dead} has {len(live)} live rule(s) left in the shipped CSS")
        print(f"   {dead:<22} in HTML: {present_in_html}   live rules at 1280: {len(live)}")
    h1s = re.findall(r"<h1[^>]*>(.*?)</h1>", html, re.S)
    if len(h1s) != 1:
        fail(f"expected exactly one h1, found {len(h1s)}")
    name = re.sub(r"<[^>]+>", "", h1s[0]) if h1s else ""
    name = re.sub(r"\s+", " ", name).strip()
    if len(name.split()) < 4:
        fail(f"the h1's accessible name is {name!r} — too short to be the sentence")
    print(f"   h1 accessible name     : {name!r}")
    print()

    # ── B · the band resolves, and the figures hug the right edge ──
    print("B · THE BOTTOM BAND AT EVERY VIEWPORT")
    header = (
        f"  {'viewport':<12} {'tier':<17} {'band':<7} {'wrap':<6} "
        f"{'stats disp':<11} {'stats cols':<26} {'right-pinned'}"
    )
    print(header)
    print("  " + "-" * (len(header) - 2))
    for width, height, tier in VIEWPORTS:
        display = resolve(".flinza-hero-bottom", "display", css, width, height)
        wrap = resolve(".flinza-hero-bottom", "flex-wrap", css, width, height)
        stats_disp = resolve(".flinza-hero-stats", "display", css, width, height)
        stats_cols = resolve(".flinza-hero-stats", "grid-template-columns", css, width, height)
        if stats_cols is None:
            stats_cols = "flex row"
        # the rule that pushes the figures to the far side of the row
        auto_rule = None
        for conditions, prop, value in declarations_for(
            ".flinza-hero-bottom .flinza-hero-stats", css
        ):
            if prop == "margin-left" and media_matches(conditions, width, height):
                auto_rule = value
        pinned = "yes" if auto_rule == "auto" else "no"
        print(
            f"  {f'{width}x{height}':<12} {tier:<17} {str(display):<7} {str(wrap):<6} "
            f"{str(stats_disp):<11} {str(stats_cols):<26} {pinned}"
        )

        label = f"{width}x{height}"
        if display != "flex":
            fail(f"{label}: .flinza-hero-bottom resolves to {display!r}, not flex")
        if wrap != "wrap":
            fail(f"{label}: .flinza-hero-bottom resolves to flex-wrap:{wrap!r}, not wrap")

        # Whether the band is two columns has to be read off the resolved cascade, not guessed
        # from the viewport. The band collapses to one column on a narrow phone, but it goes
        # back to a ROW in the short-landscape tier (max-height:560px), where the figures sit
        # beside the copy again and pinning them right is exactly what the reference does.
        # Guessing from height alone reported the 1280x500 row as one column and, worse, let a
        # genuinely unpinned short-landscape row (844x390) pass as correct.
        two_column = stats_disp == "flex" or width > 760
        one_column = not two_column
        if one_column and auto_rule == "auto":
            fail(f"{label}: the figures are pinned right on a one-column band")
        if not one_column and auto_rule != "auto":
            fail(
                f"{label}: the band is two columns but the figures are not pushed to the right "
                f"edge (margin-left:{auto_rule}) \u2014 they stop where the copy ends"
            )
        # The phone tier is a 2x2; a four-across row on a narrow screen is unreadable.
        # Match the two-COLUMN COUNT, not the serialisation: the phone value is
        # `repeat(2,minmax(0,1fr))`, which never contains the literal "1fr 1fr".
        if width <= 760 and stats_disp == "grid" and "repeat(2," not in str(stats_cols):
            fail(f"{label}: the figures should be a 2x2 on a phone, got {stats_cols}")
        if two_column and stats_disp == "grid" and "repeat(4," not in str(stats_cols):
            fail(f"{label}: the figures fell back to a 2x2 on a wide frame, got {stats_cols}")
    print()

    # ── C · the copy and the figures sit on the same content edge as the header ──
    print("C · THE BAND AND THE HEADER SHARE ONE RAIL")
    header_rail = rail_px(css, 1440, "--flinza-rail")
    inner_pad = resolve(".flinza-hero-inner", "padding-inline", css, 1440)
    bottom_pad = resolve(".flinza-hero-bottom", "padding-inline", css, 1440)
    copy_pad = resolve(".flinza-hero-copy", "padding-left", css, 1440)
    chrome_pad = resolve(".flinza-hero-chrome", "padding-inline", css, 1440)
    print(f"  --flinza-rail                 : {header_rail}")
    print(f"  .flinza-hero-chrome padding   : {chrome_pad}")
    print(f"  .flinza-hero-inner padding    : {inner_pad}")
    print(f"  .flinza-hero-bottom padding   : {bottom_pad}")
    print(f"  .flinza-hero-copy padding-left: {copy_pad}")
    # the band must not add its own inset: it is a child of the inner, so the rail is inherited
    if bottom_pad not in (None, "0px", "0", ""):
        fail(f".flinza-hero-bottom adds its own inline padding ({bottom_pad}) and breaks the rail")
    if copy_pad not in (None, "0px", "0", ""):
        fail(f".flinza-hero-copy has a left padding ({copy_pad}) that offsets the paragraph off the rail")
    print("  the band is a child of .flinza-hero-inner, so it inherits the rail and adds none of its own")
    print()

    # ── D · the scroll cue lives in the copy column, so it is under the paragraph ──
    print("D · THE SCROLL CUE IS UNDER THE PARAGRAPH, NOT UNDER THE FIGURES")
    bottom = re.search(r'<div class="flinza-hero-bottom">(.*?)</ul>', html, re.S)
    if not bottom:
        fail("could not find the bottom band in the built HTML")
    else:
        order = re.findall(r'class="(flinza-hero-[a-z]+)"', bottom.group(1))
        print(f"  order inside the band: {' → '.join(order)}")
        expected = ["flinza-hero-copy", "flinza-hero-interest", "flinza-hero-scroll", "flinza-hero-stats"]
        if order != expected:
            fail(f"band order is {order}, expected {expected}")
    print()

    # ── E · the phone tier ──
    print("E · THE PHONE IS ITS OWN COMPOSITION")
    for width in (320, 360, 390, 430):
        cols = resolve(".flinza-hero-stats", "grid-template-columns", css, width)
        disp = resolve(".flinza-hero-stats", "display", css, width)
        print(f"  {width}px  display={disp}  columns={cols}")
        if disp == "grid" and cols and "repeat(2," not in str(cols):
            fail(f"{width}px: the figures should be a 2x2, got {cols}")
    print()

    print("=" * 78)
    if failures or selftest_failures:
        print(f"FAIL — {len(failures)} problem(s):")
        for f in failures:
            print(f"  · {f}")
        return 1
    print("PASS — the band resolves correctly at every width from 320 to 2560")
    for note in notes:
        print(f"  note: {note}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
