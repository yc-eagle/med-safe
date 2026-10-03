"""Synthetic Cantonese fixtures: integration checks, not human ASR accuracy."""
import base64,json,subprocess,time,urllib.request,urllib.error,wave
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];URL='http://127.0.0.1:8765'
SAMPLES=ROOT/'handoff/voice-samples';SAMPLES.mkdir(exist_ok=True)
opener=urllib.request.build_opener(urllib.request.ProxyHandler({}));status=json.load(opener.open(URL+'/api/status'));results=[]
def post(content):
    req=urllib.request.Request(URL+'/api/asr',json.dumps({'audio':base64.b64encode(content).decode()}).encode(),headers={'Origin':URL,'Content-Type':'application/json','X-MedCheck-Token':status['token']})
    start=time.perf_counter()
    try:
        with opener.open(req,timeout=110) as r:return r.status,json.load(r),round(time.perf_counter()-start,2)
    except urllib.error.HTTPError as e:return e.code,json.load(e),round(time.perf_counter()-start,2)
assert status['asr']
for name,phrase in [('combination','呢兩隻藥可唔可以一齊食？'),('dose','我應該食幾多粒？'),('negation','我冇食華法林。'),('pharmacist','點解要問藥劑師？'),('ingredient','撲熱息痛同必理痛係咪一樣？')]:
    p=SAMPLES/(name+'.wav')
    subprocess.run(['/usr/bin/say','-v','Sinji',phrase,'-o',str(p),'--file-format=WAVE','--data-format=LEI16@22050'],check=True)
    code,data,elapsed=post(p.read_bytes());results.append({'fixture':name,'synthetic':True,'expected_speech':phrase,'http_status':code,'wall_seconds':elapsed,'response':data})
    print(json.dumps(results[-1],ensure_ascii=False),flush=True)
    assert code==200 and data.get('text') and data.get('requires_confirmation')
for name,content,expected in [('corrupt',b'not audio',422),('empty',b'',413)]:
    code,data,elapsed=post(content);results.append({'fixture':name,'http_status':code,'expected_status':expected,'response':data});assert code==expected
import io
for name,duration in [('silence',1),('too_long',21)]:
    buf=io.BytesIO()
    with wave.open(buf,'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(16000);w.writeframes(b'\x00\x00'*int(16000*duration))
    code,data,elapsed=post(buf.getvalue());results.append({'fixture':name,'http_status':code,'response':data});assert code==422
(ROOT/'qa/voice-api-results.json').write_text(json.dumps({'date':time.strftime('%Y-%m-%d'),'synthetic_only':True,'not_a_human_accuracy_benchmark':True,'passed_transport_and_gates':len(results),'results':results},ensure_ascii=False,indent=2))
