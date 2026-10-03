"""Run against the already running local server; Python stdlib only."""
import base64,io,json,time,urllib.request,urllib.error,wave
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
URL='http://127.0.0.1:8765'
opener=urllib.request.build_opener(urllib.request.ProxyHandler({}))
status=json.load(opener.open(URL+'/api/status'));results=[]
def request(path,data,origin=URL,token=status['token']):
    req=urllib.request.Request(URL+path,json.dumps(data).encode(),headers={'Content-Type':'application/json','Origin':origin,'X-MedCheck-Token':token})
    start=time.perf_counter()
    try:
        with opener.open(req,timeout=60) as r:return r.status,r.read(),time.perf_counter()-start
    except urllib.error.HTTPError as e:return e.code,e.read(),time.perf_counter()-start
def record(name,ok,**extra):
    assert ok,name
    results.append(dict(name=name,status='passed',**extra))
img=base64.b64encode((ROOT/'app/sample-labels.png').read_bytes()).decode()
code,b,seconds=request('/api/ocr',{'image':img});d=json.loads(b)
record('Synthetic two-pack image OCR',code==200 and all(x in str(d) for x in ['HK-53362','HK-53319']),wall_seconds=seconds,native_seconds=d.get('elapsed_seconds'),rows=d.get('rows'))
code,b,seconds=request('/api/ocr',{'image':base64.b64encode((ROOT/'tests/blank.png').read_bytes()).decode()})
record('Blank image returns no text',code==200 and not json.loads(b)['rows'])
for label,image,expected in [('Corrupt image','bXkgbm90IGFuIGltYWdl',422),('Invalid base64','!!!',400),('Empty image','',413)]:
    code,_,_=request('/api/ocr',{'image':image});record(label,code==expected)
code,_,_=request('/api/ocr',{'image':img},origin='https://example.com');record('Reject remote website origin',code==403)
code,_,_=request('/api/ocr',{'image':img},token='invalid');record('Reject missing local token',code==403)
for voice,text in [('yue','這是演示。兩項產品含同一成分，請向藥劑師核實。'),('cmn','这是演示。两项产品含同一成分，请向药剂师核实。'),('en','This is a demonstration. Check duplicate ingredients with a pharmacist.')]:
    code,b,seconds=request('/api/tts',dict(voice=voice,text=text))
    record('Local speech '+voice,code==200 and b[:4]==b'RIFF',wall_seconds=seconds)
    with wave.open(io.BytesIO(b)) as w:results[-1]['audio_duration_seconds']=w.getnframes()/w.getframerate()
    (ROOT/f'handoff/speech-{voice}.wav').write_bytes(b)
code,_,_=request('/api/tts',dict(voice='invalid',text='a'));record('Reject unlisted speech voice',code==400)
code,_,_=request('/api/tts',dict(voice='yue',text='a'*5001));record('Reject excessive speech input',code==400)
try:opener.open(URL+'/../server.py');code=200
except urllib.error.HTTPError as e:code=e.code
record('Server source is not served',code==404)
(ROOT/'qa/api-results.json').write_text(json.dumps(dict(tested_at=time.strftime('%Y-%m-%d %H:%M:%S'),passed=len(results),failed=0,results=results),ensure_ascii=False,indent=2))
print(f'{len(results)} API checks passed')
