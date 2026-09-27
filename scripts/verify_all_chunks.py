"""
Verify that every JS/CSS asset the DEPLOYED site references actually resolves.

Two earlier attempts at this were wrong in instructive ways, and both are avoided here:

  · Reading chunks off disk is not valid. `next dev` (the preview server) writes into
    the SAME .next directory as `next build`, so the tree on disk is a dev build —
    `development/_buildManifest.js`, `hot-update.js` — which of course is not what
    production serves. Reading the local build proved nothing about the deploy.
  · Reading only the <script src> tags covers just the initial bundle. The nine
    client-only components load through next/dynamic, so each is a separate async
    chunk fetched at mount, and those names live inside the RSC flight payload
    rather than in a script tag.

So the source of truth is the deployed HTML itself: pull every /_next/ path out of it,
including the ones buried in the flight payload, and check each one.
"""

import re
import sys
import urllib.error
import urllib.request

BASE = "https://flinzaworks.freebuff.app"
PAGE = BASE + "/"

# Anything under /_next/ that looks like a build asset, however it is spelled in the
# document — in a src=, a href=, or inside an escaped string in the flight payload.
ASSET = re.compile(r"/_next/(?:static/)?[A-Za-z0-9_\-./]+\.(?:js|css)")


def main():
    with urllib.request.urlopen(PAGE, timeout=30) as resp:
        html = resp.read().decode("utf-8", "replace")

    assets = sorted(set(ASSET.findall(html)))
    print("assets referenced by the deployed home page: %d" % len(assets))
    if not assets:
        print("none found — the check would be vacuous, so failing")
        return 2

    failures = []
    for asset in assets:
        try:
            with urllib.request.urlopen(BASE + asset, timeout=30) as resp:
                code = resp.status
        except urllib.error.HTTPError as exc:
            code = exc.code
        except Exception as exc:  # noqa: BLE001 - report whatever the network did
            code = type(exc).__name__
        if code != 200:
            failures.append((asset, code))
            print("  %-8s %s" % (code, asset))

    print()
    if failures:
        print("FAIL - %d of %d referenced assets do not resolve" % (len(failures), len(assets)))
        return 1
    print("PASS - all %d referenced assets return 200" % len(assets))
    return 0


if __name__ == "__main__":
    sys.exit(main())
