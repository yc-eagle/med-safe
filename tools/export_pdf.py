#!/usr/bin/env python3
"""Export pitch-ppt/index.html to a 16:9 PDF, one deck page per PDF page.

Why this script exists rather than a plain --print-to-pdf call
--------------------------------------------------------------
Two things about this deck make a naive print unreliable, and both were hit
while producing the first PDF:

1. A fixed `@page { size: ... }` box makes Chromium reflow the slide inside the
   paper box and silently drop content. On one slide the fifth pipeline step and
   the closing line vanished; on another, a callout disappeared. Nothing was
   clipped and every element still reported opacity 1 - the content simply was
   not painted. Isolating the print CSS one rule at a time showed the @page rule
   was the cause, so this script sets the paper size through the DevTools
   protocol (`Page.printToPDF`, paperWidth/paperHeight in inches) and never
   declares @page.

2. The deck reveals most content on a key press. `[data-anim="step"]` items
   inside a `data-animate="pipeline"` slide start at opacity .15 and are
   advanced with the space bar, so an un-advanced print shows them as nearly
   invisible. The injected stylesheet forces every animated element to its final
   state. That is also the deck's own documented fallback for when the motion
   library fails to load, so it does not invent a new rendering path.

`#deck` is a 10000vw-wide nowrap flex track for the horizontal slide transition.
Letting the paginator slice that track loses content too, so it is laid out as a
plain vertical block here and the slides are separated by explicit page breaks.

Usage
-----
    python tools/export_pdf.py                 # writes pitch-ppt/Ngon-Sam-HacKU2026.pdf
    python tools/export_pdf.py --out custom.pdf

Requires Microsoft Edge and the `websockets` package.
"""

from __future__ import annotations

import argparse
import asyncio
import base64
import json
import os
import pathlib
import subprocess
import sys
import time
import urllib.request

import websockets

REPO = pathlib.Path(__file__).resolve().parent.parent
DEFAULT_SRC = REPO / "pitch-ppt" / "index.html"
DEFAULT_OUT = REPO / "pitch-ppt" / "Ngon-Sam-HacKU2026.pdf"

# 1280x720 CSS px at 16:9 -> 10.000in x 5.625in
PAPER_W_IN = 10.0
PAPER_H_IN = 5.625
DEBUG_PORT = 9333

PRINT_CSS = """
<style id="print-export">
html, body {
  overflow: visible !important;
  width: 1280px !important;
  height: auto !important;
  margin: 0 !important;
  padding: 0 !important;
  background: #ffffff !important;
}
*, *::before, *::after {
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}
canvas.bg, #hint, #nav, #ppt-presenter, .ppt-annotation-layer { display: none !important; }

#deck {
  position: static !important;
  display: block !important;
  width: 1280px !important;
  height: auto !important;
  transform: none !important;
  transition: none !important;
  will-change: auto !important;
}
#deck > .slide {
  width: 1280px !important;
  height: 720px !important;
  min-height: 720px !important;
  max-height: 720px !important;
  flex: none !important;
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
  padding: 43.2px 76.8px 72px 76.8px !important;   /* 6vh | 6vw | 10vh | 6vw at 720x1280 */
  margin: 0 !important;
  break-inside: avoid !important;
  page-break-inside: avoid !important;
}
#deck > .slide + .slide {
  break-before: page !important;
  page-break-before: always !important;
}

/* the hero overlay exists to let the WebGL canvas through; with the canvas
   hidden it multiplies down to almost nothing, and each slide already paints
   its own solid colour */
#deck > .slide.hero::before { background: transparent !important; backdrop-filter: none !important; }
#deck > .slide.hero::after  { background: none !important; }

/* reveal everything the deck would otherwise animate in */
body.motion-ready [data-anim],
body.low-power.motion-ready [data-anim],
[data-anim],
[data-anim="line"],
[data-anim="left"],
[data-anim="right"],
[data-anim="step"],
[data-animate] [data-anim],
[data-animate="pipeline"] [data-anim] {
  opacity: 1 !important;
  transform: none !important;
  transition: none !important;
  animation: none !important;
}
</style>
"""

EDGE_CANDIDATES = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
]


def find_edge() -> str:
    for candidate in EDGE_CANDIDATES:
        if pathlib.Path(candidate).exists():
            return candidate
    raise SystemExit("Microsoft Edge was not found in the usual locations.")


def wait_for_target(port: int, timeout: float = 30.0) -> str:
    deadline = time.time() + timeout
    last_error: Exception | None = None
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(f"http://127.0.0.1:{port}/json/list", timeout=5) as response:
                targets = json.load(response)
            page = next((t for t in targets if t.get("type") == "page"), None)
            if page and page.get("webSocketDebuggerUrl"):
                return page["webSocketDebuggerUrl"]
        except Exception as exc:                      # the browser is still starting
            last_error = exc
        time.sleep(0.4)
    raise SystemExit(f"Could not reach the browser's debugging port: {last_error}")


async def render(ws_url: str, url: str) -> bytes:
    async with websockets.connect(ws_url, max_size=256 * 1024 * 1024) as ws:
        counter = 0

        async def call(method: str, params: dict | None = None):
            nonlocal counter
            counter += 1
            message_id = counter
            await ws.send(json.dumps({"id": message_id, "method": method, "params": params or {}}))
            while True:
                message = json.loads(await ws.recv())
                if message.get("id") == message_id:
                    if "error" in message:
                        raise RuntimeError(f"{method}: {message['error']}")
                    return message.get("result", {})

        await call("Page.enable")
        await call("Emulation.setEmulatedMedia", {"media": "print"})
        await call("Page.navigate", {"url": url})
        await asyncio.sleep(4.0)                       # let fonts and the layout settle

        result = await call("Page.printToPDF", {
            "landscape": False,
            "printBackground": True,
            "preferCSSPageSize": False,                # must stay false: see the module docstring
            "paperWidth": PAPER_W_IN,
            "paperHeight": PAPER_H_IN,
            "marginTop": 0,
            "marginBottom": 0,
            "marginLeft": 0,
            "marginRight": 0,
            "scale": 1.0,
            "displayHeaderFooter": False,
        })
        return base64.b64decode(result["data"])


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--src", type=pathlib.Path, default=DEFAULT_SRC)
    parser.add_argument("--out", type=pathlib.Path, default=DEFAULT_OUT)
    args = parser.parse_args()

    if not args.src.exists():
        raise SystemExit(f"Deck not found: {args.src}")

    source = args.src.read_text(encoding="utf-8")
    if "</body>" not in source:
        raise SystemExit("The deck has no </body>; cannot inject the print stylesheet.")

    staged = args.src.with_name("_print.html")
    staged.write_text(source.replace("</body>", PRINT_CSS + "\n</body>"), encoding="utf-8")

    profile = pathlib.Path(os.environ.get("TEMP", ".")) / "edge-cdp-profile"
    edge = find_edge()
    process = subprocess.Popen(
        [edge, "--headless=new", "--disable-gpu", "--no-sandbox", "--no-first-run",
         f"--user-data-dir={profile}", f"--remote-debugging-port={DEBUG_PORT}",
         "--window-size=1280,720", "about:blank"],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )

    try:
        ws_url = wait_for_target(DEBUG_PORT)
        data = asyncio.run(render(ws_url, staged.as_uri()))
        args.out.write_bytes(data)
        print(f"wrote {args.out}  ({len(data):,} bytes)")
    finally:
        process.terminate()
        try:
            process.wait(timeout=10)
        except subprocess.TimeoutExpired:
            process.kill()
        staged.unlink(missing_ok=True)

    return 0


if __name__ == "__main__":
    sys.exit(main())
