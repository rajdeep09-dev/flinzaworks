"""
Check every static asset the built site references — including the ones only the JavaScript
names.

The first version of this script read the prerendered HTML and the CSS, and reported all 21
assets loading. That was true and useless: the nine client-only components are loaded with
ssr:false, so their asset references appear in NO markup. The WhatsApp audio players request
six audio files that exist only inside a JS bundle, and the client components are exactly
where a missing file would be invisible to an HTML-only sweep.

So the sources here are the HTML, the CSS and every emitted JS chunk, deduplicated, and each
distinct URL is asked for once.
"""

import re
import sys
import urllib.error
import urllib.request
from collections import defaultdict
from pathlib import Path

BASE = "https://flinzaworks.freebuff.app"
NEXT = Path("/home/daytona/codebase/website/.next")

ASSET = re.compile(
    r"""(?P<p>/(?:images|audio|video|videos|fonts|icons|files)/[^"'()\s?\\]+\.(?:png|jpe?g|webp|avif|gif|svg|mp4|webm|mov|mp3|wav|ogg|m4a|woff2?|ttf|otf|eot|ico))""",
    re.I,
)

# The vendored Framer components hardcode ABSOLUTE asset URLs such as
#   https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg?width=...
# The regex above happily matches the `/images/...` tail of one of those, and testing that
# tail against our own host reports a 404 for an asset that is not ours and is not broken.
# The first version of this script did exactly that and produced thirteen fake failures.
# So: capture what precedes the match and skip anything with a host in front of it.
HOSTED = re.compile(r"""[A-Za-z][A-Za-z0-9+.\-]*://[^"'\s?\\]*$""")


def sources():
    """Every file in the build that can name an asset."""
    yield from sorted((NEXT / "server" / "app").rglob("*.html"))
    for sheet in (NEXT / "static" / "css").glob("*.css"):
        yield sheet
    for chunk in (NEXT / "static" / "chunks").rglob("*.js"):
        yield chunk
    for page_chunk in (NEXT / "static" / "chunks" / "app").rglob("*.js"):
        yield page_chunk


def collect():
    urls = set()
    files = list(sources())
    for path in files:
        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        for m in ASSET.finditer(text):
            if HOSTED.search(text[max(0, m.start() - 200) : m.start()]):
                continue  # absolute URL on another host — not ours to serve
            urls.add(m.group("p"))
    return sorted(urls), len(files)


def status(url):
    try:
        request = urllib.request.Request(BASE + url, method="HEAD")
        with urllib.request.urlopen(request, timeout=30) as resp:
            return resp.status
    except urllib.error.HTTPError as exc:
        return exc.code
    except Exception as exc:  # noqa: BLE001 - report whatever the network did
        return type(exc).__name__


def main():
    urls, file_count = collect()
    print("scanned %d build files" % file_count)
    print("distinct static assets referenced: %d" % len(urls))
    if not urls:
        print("none found — the check would be vacuous, so failing")
        return 2

    by_status = defaultdict(list)
    for url in urls:
        by_status[status(url)].append(url)

    for code in sorted(by_status, key=str):
        group = sorted(by_status[code])
        print()
        print("%s — %d" % (code, len(group)))
        for url in group[:60]:
            print("   %s" % url)
        if len(group) > 60:
            print("   ... and %d more" % (len(group) - 60))

    broken = sorted(u for c, g in by_status.items() if c != 200 for u in g)
    print()
    if broken:
        print("FAIL - %d of %d referenced assets do not return 200" % (len(broken), len(urls)))
        return 1
    print("PASS - all %d referenced assets return 200" % len(urls))
    return 0


if __name__ == "__main__":
    sys.exit(main())
