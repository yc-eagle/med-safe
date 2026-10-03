"""Install local Cantonese ASR on Apple Silicon. Downloads software/model only."""
from pathlib import Path
import hashlib,json,os,platform,subprocess,sys,venv
ROOT=Path(__file__).resolve().parents[1]
REPO='mlx-community/Qwen3-ASR-0.6B-4bit';REVISION='313d850181767edf09f00a9c289becca70e58cd0'
if platform.system()!='Darwin' or platform.machine()!='arm64':raise SystemExit('Cantonese recognition in this prototype requires an Apple Silicon Mac. Typed questions still work.')
runtime=ROOT/'.voice-runtime';python=runtime/'bin/python'
if not python.exists():venv.create(runtime,with_pip=True)
subprocess.run([str(python),'-m','pip','install','-r',str(ROOT/'tools/asr-requirements.lock.txt')],check=True)
model=ROOT.parent/'HacKU-Sunsy-VoiceModel/model';model.mkdir(parents=True,exist_ok=True)
code='from huggingface_hub import snapshot_download;import sys;snapshot_download(repo_id=sys.argv[1],revision=sys.argv[2],local_dir=sys.argv[3],max_workers=3)'
subprocess.run([str(python),'-c',code,REPO,REVISION,str(model)],check=True,env={**os.environ,'HF_HUB_DISABLE_XET':'1','HF_HUB_DOWNLOAD_TIMEOUT':'90'})
(model.parent/'download.json').write_text(json.dumps({'repo':REPO,'revision':REVISION,'url':'https://huggingface.co/'+REPO},indent=2))
print('Cantonese recognition installed. Restart the app with 启动演示.command. No patient audio was used during installation.')
