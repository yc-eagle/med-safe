"""Local-only HacKU demonstrator. No account, cloud API or persistent photo store."""
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from pathlib import Path
import argparse, base64, binascii, json, os, secrets, shutil, subprocess, tempfile, threading
import urllib.parse, webbrowser, atexit
from native.asr_service import ASRService

ROOT=Path(__file__).resolve().parent
TOKEN=secrets.token_urlsafe(32)
OCR=ROOT/'native/ocr'
ASR_PYTHON=Path(os.environ.get('ASR_PYTHON',str(ROOT/'.voice-runtime/bin/python' if (ROOT/'.voice-runtime/bin/python').is_file() else ROOT.parent.parent/'work/asr-env/bin/python')))
ASR_MODEL=Path(os.environ.get('ASR_MODEL',str(ROOT.parent/'HacKU-Sunsy-VoiceModel/model')))
ASR_SEM=threading.BoundedSemaphore(1)
VOICE_SERVICE=ASRService(ASR_PYTHON,ROOT/'native/asr_worker.py',ASR_MODEL)
atexit.register(VOICE_SERVICE.close)
def has_asr():return ASR_PYTHON.is_file() and (ASR_MODEL/'model.safetensors').is_file()
MAX_BODY=16*1024*1024
SEM=threading.BoundedSemaphore(2)
VOICES={'yue':'Sinji','cmn':'Tingting','en':'Samantha'}
STATIC={'/demo.html':'app/demo.html','/demo-3min.mp4':'assets/demo-3min.mp4','/demo-3min.en.srt':'assets/demo-3min.en.srt','/demo-3min.en.vtt':'assets/demo-3min.en.vtt','/Med-Safe-HacKU2026.pptx':'deck/Med-Safe-HacKU2026.pptx','/Med-Safe-HacKU2026.pdf':'deck/Med-Safe-HacKU2026.pdf','/medicine-info.js':'app/medicine-info.js','/product-features.js':'app/product-features.js','/product-features.css':'app/product-features.css','/verify.html':'app/verify.html','/verify.css':'app/verify.css','/verify.js':'app/verify.js','/validator.js':'app/validator.js','/':'app/index.html','/index.html':'app/index.html','/app.css':'app/app.css',
        '/vendor/opencc-t2cn.js':'app/vendor/opencc-t2cn.js','/locale.js':'app/locale.js','/resource-pages.js':'app/resource-pages.js','/resource-pages.css':'app/resource-pages.css','/patient.js':'app/patient.js','/voice.js':'app/voice.js','/app.js':'app/app.js','/engine.js':'app/engine.js','/data.js':'app/data.js',
        '/offline-runtime.js':'app/offline-runtime.js','/manifest.webmanifest':'app/manifest.webmanifest','/icon-192.svg':'app/icon-192.svg','/icon-512.svg':'app/icon-512.svg','/browser-runtime.js':'app/browser-runtime.js','/release-ui.js':'app/release-ui.js','/release.css':'app/release.css','/data-report.html':'app/data-report.html','/offline.html':'app/offline.html','/favicon.svg':'app/favicon.svg','/sample-labels.png':'app/sample-labels.png'}

class Handler(BaseHTTPRequestHandler):
    protocol_version='HTTP/1.0'
    def log_message(self,*args): pass
    def send(self,code,body,kind='application/json; charset=utf-8'):
        if isinstance(body,(dict,list)): body=json.dumps(body,ensure_ascii=False).encode()
        elif isinstance(body,str): body=body.encode()
        self.send_response(code)
        self.send_header('Content-Type',kind)
        self.send_header('Content-Length',str(len(body)))
        self.send_header('Cache-Control','no-store')
        self.send_header('X-Content-Type-Options','nosniff')
        self.send_header('Referrer-Policy','no-referrer')
        self.send_header('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'")
        self.end_headers(); self.wfile.write(body)
    def valid_host(self):
        port=self.server.server_port
        return self.headers.get('Host') in {f'127.0.0.1:{port}',f'localhost:{port}'}
    def do_GET(self):
        if not self.valid_host():return self.send(403,{'error':'Local host only'})
        path=urllib.parse.urlsplit(self.path).path
        if path=='/api/status':
            return self.send(200,dict(token=TOKEN,ocr=OCR.is_file(),tts=bool(shutil.which('say')),asr=has_asr(),asr_warm=VOICE_SERVICE.warm,asr_language='yue',audio_retention='temporary_only',mode='local_mac',photo_retention='temporary_only'))
        if path not in STATIC:return self.send(404,{'error':'Not found'})
        p=ROOT/STATIC[path]
        kinds={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.mp4':'video/mp4','.vtt':'text/vtt; charset=utf-8','.pdf':'application/pdf','.pptx':'application/vnd.openxmlformats-officedocument.presentationml.presentation','.srt':'text/plain; charset=utf-8'}
        return self.send(200,p.read_bytes(),kinds.get(p.suffix,'application/octet-stream'))
    def do_POST(self):
        port=self.server.server_port
        if not self.valid_host() or self.headers.get('Origin') not in {f'http://127.0.0.1:{port}',f'http://localhost:{port}'}:
            return self.send(403,{'error':'Only this local page may submit requests'})
        if not secrets.compare_digest(self.headers.get('X-MedCheck-Token',''),TOKEN):
            return self.send(403,{'error':'Reload the local page'})
        if self.headers.get('Content-Type','').split(';')[0]!='application/json':
            return self.send(415,{'error':'JSON required'})
        try:
            length=int(self.headers.get('Content-Length','0'))
            if length<=0 or length>MAX_BODY:return self.send(413,{'error':'Image too large; maximum 10 MB'})
            data=json.loads(self.rfile.read(length))
            if not isinstance(data,dict):raise ValueError()
        except (ValueError,UnicodeDecodeError):return self.send(400,{'error':'Invalid request'})
        if not SEM.acquire(blocking=False):return self.send(429,{'error':'Please wait for the current task to finish'})
        try:
            if self.path=='/api/ocr':return self.ocr(data)
            if self.path=='/api/tts':return self.tts(data)
            if self.path=='/api/asr':return self.asr(data)
            return self.send(404,{'error':'Not found'})
        except subprocess.TimeoutExpired:return self.send(504,{'error':'Local processing timed out; please retry or type the registration number'})
        except (OSError,ValueError):return self.send(500,{'error':'Local processing failed; manual search is still available'})
        finally:SEM.release()
    def ocr(self,data):
        if not OCR.is_file():return self.send(503,{'error':'OCR is unavailable; use manual search'})
        raw=data.get('image','')
        if not isinstance(raw,str):return self.send(400,{'error':'Invalid image'})
        try:content=base64.b64decode(raw,validate=True)
        except binascii.Error:return self.send(400,{'error':'Invalid image data'})
        if not content or len(content)>10*1024*1024:return self.send(413,{'error':'Image must be between 1 byte and 10 MB'})
        with tempfile.TemporaryDirectory(prefix='hakku-image-') as tmp:
            p=Path(tmp)/'input.image';p.write_bytes(content)
            result=subprocess.run([str(OCR),str(p)],capture_output=True,text=True,timeout=30)
            if result.returncode:return self.send(422,{'error':'Image could not be read. Try a clear JPEG or PNG, or enter the registration number.'})
            output=json.loads(result.stdout)
        return self.send(200,output)
    def asr(self,data):
        if not has_asr():return self.send(503,{'error':'Cantonese voice input is not installed. Type your question instead.'})
        raw=data.get('audio','')
        if not isinstance(raw,str):return self.send(400,{'error':'Invalid audio'})
        try:content=base64.b64decode(raw,validate=True)
        except binascii.Error:return self.send(400,{'error':'Invalid audio data'})
        if not content or len(content)>5*1024*1024:return self.send(413,{'error':'Audio must be between 1 byte and 5 MB'})
        if not ASR_SEM.acquire(blocking=False):return self.send(429,{'error':'Voice recognition is busy. Please wait.'})
        try:
            with tempfile.TemporaryDirectory(prefix='hakku-voice-') as tmp:
                path=Path(tmp)/'input.audio';path.write_bytes(content)
                output=VOICE_SERVICE.transcribe(path,timeout=90)
                if output.get('error'):return self.send(422,{'error':output['error']})
            return self.send(200,output)
        finally:ASR_SEM.release()
    def tts(self,data):
        text=data.get('text','');voice=data.get('voice','yue')
        if not isinstance(text,str) or not 1<=len(text)<=5000 or not isinstance(voice,str) or voice not in VOICES:
            return self.send(400,{'error':'Invalid speech text or language'})
        if not shutil.which('say'):return self.send(503,{'error':'System speech unavailable'})
        with tempfile.TemporaryDirectory(prefix='hakku-speech-') as tmp:
            source=Path(tmp)/'text.txt';audio=Path(tmp)/'speech.wav';source.write_text(text)
            result=subprocess.run(['/usr/bin/say','-v',VOICES[voice],'-f',str(source),'-o',str(audio),'--file-format=WAVE','--data-format=LEI16@22050'],capture_output=True,timeout=40)
            if result.returncode or not audio.is_file():return self.send(503,{'error':'Voice unavailable on this Mac'})
            body=audio.read_bytes()
        return self.send(200,body,'audio/wav')

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--port',type=int,default=8765)
    parser.add_argument('--no-open',action='store_true')
    args=parser.parse_args()
    if not OCR.exists() and shutil.which('swiftc'):
        print('Preparing local text recognition…',flush=True)
        result=subprocess.run(['swiftc',str(ROOT/'native/ocr.swift'),'-O','-o',str(OCR)],capture_output=True,timeout=180)
        if result.returncode: print('OCR unavailable. Manual search and sample cases still work.',flush=True)
    try:server=ThreadingHTTPServer(('127.0.0.1',args.port),Handler)
    except OSError:
        print('This port is busy. Close the previous window or run with --port 8766.',flush=True);return 1
    url=f'http://127.0.0.1:{server.server_port}'
    print(f'HacKU Medication Check: {url}\nLocal only. Ctrl+C stops the app.',flush=True)
    if not args.no_open:threading.Timer(.4,lambda:webbrowser.open(url)).start()
    try:server.serve_forever()
    except KeyboardInterrupt:pass
    finally:VOICE_SERVICE.close();server.server_close()
    return 0
if __name__=='__main__':raise SystemExit(main())
