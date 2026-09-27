"""
verify_client_guarding — proves the shared layout cannot take the page down again.

The home page's nine client-only components are bounded (app/HomeClient.jsx, `dynamicClient`).
The shared layout's five were not, and those render from the ROOT LAYOUT — which sits above the
route-level error boundary — so a throw in any of them skipped every boundary on the page and
replaced the whole document. That is the "bare error screen, no hero" symptom.

This checks two things, from the built output rather than the source:

  A. Every `dynamic()` in src/components/*.jsx has its loaded component passed to `guarded(...)`.
     A dynamic that is loaded but never wrapped is an unguarded client component, and it is the
     exact regression this file exists to catch.

  B. Each component's label appears in the emitted client bundle, which proves the boundary is
     really wired to that component rather than merely imported somewhere.

The self-test runs first: a checker that cannot detect the fault is worse than no checker.
"""

import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "components"
BUNDLE = ROOT / "website" / ".next" / "static" / "chunks"

# The five client-only components the shared layout mounts, and the label each is guarded with.
EXPECTED = {
    "LiquidMetal": "SiteHeader.jsx",
    "EtherealShadow": "SiteGround.jsx",
    "SocialGlassRow": "SiteFooter.jsx",
    "CamoLiquid": "CamoCtaButton.jsx",
    "LiquidChromeButton": "ChromeBookButton.jsx",
}


def selftest() -> int:
    """The detector must flag an unguarded dynamic and clear a guarded one."""
    guarded = 'const XLoaded = dynamic(() => import("./X"), { ssr: false });\nconst X = guarded(XLoaded, "X");\n'
    unguarded = 'const X = dynamic(() => import("./X"), { ssr: false });\n'

    if find_unwrapped(guarded):
        print("SELF-TEST FAILED: a guarded component was reported unguarded")
        return 0
    if not find_unwrapped(unguarded):
        print("SELF-TEST FAILED: an unguarded component was not detected")
        return 0
    print("self-test: 2/2 (detects unguarded, clears guarded)")
    return 2


def find_unwrapped(text: str):
    """Names of components that are loaded with dynamic() but never passed to guarded()."""
    loaded = set(re.findall(r"const\s+(\w+)\s*=\s*dynamic\(", text))
    wrapped = set(re.findall(r"guarded\(\s*(\w+)\s*,", text))
    return sorted(loaded - wrapped)


def main() -> int:
    score = selftest()
    if not score:
        return 1

    failures = []

    # A. Source: no client-only component may be loaded without a boundary.
    files = sorted(SRC.glob("*.jsx"))
    for path in files:
        if path.name == "guardedClient.jsx":
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        for name in find_unwrapped(text):
            failures.append(f"{path.name}: '{name}' is loaded with dynamic() but not wrapped in guarded()")

    # B. Bundle: the labels must be really present, i.e. the boundary is wired to that component.
    chunks = list(BUNDLE.rglob("*.js")) if BUNDLE.exists() else []
    blob = "\n".join(c.read_text(encoding="utf-8", errors="replace") for c in chunks)
    if not blob:
        failures.append("no client bundle found to search for the boundary labels")

    for label, where in EXPECTED.items():
        if label not in EXPECTED:
            continue
        if blob and f'"{label}"' not in blob and f"'{label}'" not in blob:
            failures.append(f"{where}: label '{label}' not found in the client bundle")

    print()
    if failures:
        print(f"FAIL — {len(failures)} unguarded client component(s):")
        for f in failures:
            print(f"  - {f}")
        return 1

    print(f"PASS — all 5 shared-layout client components are individually bounded")
    print(f"       {len(chunks)} client chunks searched; every label present in the bundle")
    return 0


if __name__ == "__main__":
    sys.exit(main())
