"""Build the public static app and an exact offline manifest. No patient files."""
from pathlib import Path
import argparse,shutil,subprocess,sys
ROOT=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--out',required=True);args=p.parse_args();out=Path(args.out).resolve();out.mkdir(parents=True,exist_ok=True)
shutil.copytree(ROOT/'app',out,dirs_exist_ok=True)
s=(out/'index.html').read_text().replace('<script src="browser-runtime.js">','<script>window.PUBLIC_DEMO=true;</script><script src="browser-runtime.js">');(out/'index.html').write_text(s)
for name in ['demo-3min.mp4','demo-3min.en.srt']:
    if (ROOT/'assets'/name).exists():shutil.copy2(ROOT/'assets'/name,out/name)
if (out/'demo-3min.en.srt').exists():
    import re
    text=(out/'demo-3min.en.srt').read_text();(out/'demo-3min.en.vtt').write_text('WEBVTT\n\n'+re.sub(r'(\d{2}:\d{2}:\d{2}),(\d{3})',r'\1.\2',text))
for name in ['Med-Safe-HacKU2026.pptx','Med-Safe-HacKU2026.pdf']:
    if (ROOT/'deck'/name).exists():shutil.copy2(ROOT/'deck'/name,out/name)
subprocess.run([sys.executable,str(ROOT/'tools/build_offline_manifest.py'),'--app-dir',str(out)],check=True)
print(out)
