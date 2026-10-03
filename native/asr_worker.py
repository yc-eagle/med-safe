"""Local Cantonese ASR; one-shot compatibility or a single resident model over stdin."""
import argparse,contextlib,json,os,subprocess,sys,tempfile,time,wave,gc
from pathlib import Path
os.environ['HF_HUB_OFFLINE']='1'
os.environ['TRANSFORMERS_OFFLINE']='1'
os.environ['TOKENIZERS_PARALLELISM']='false'
class Transcriber:
    def __init__(self,model_path,no_hotwords=False):
        self.path=Path(model_path).resolve();self.model=None;self.no_hotwords=no_hotwords
    def transcribe(self,audio):
        import imageio_ffmpeg,numpy as np
        started=time.perf_counter();warm=self.model is not None
        with tempfile.TemporaryDirectory(prefix='hakku-asr-decode-') as tmp:
            wav=Path(tmp)/'input.wav'
            r=subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-nostdin','-v','error','-protocol_whitelist','file,pipe','-i',str(Path(audio).resolve()),'-t','21','-vn','-ac','1','-ar','16000','-c:a','pcm_s16le',str(wav)],capture_output=True,timeout=20)
            if r.returncode:raise ValueError('audio_unreadable')
            with wave.open(str(wav),'rb') as w:
                duration=w.getnframes()/w.getframerate();pcm=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(np.float32)/32768
            if not 0.3<=duration<=20.3:raise ValueError('duration_out_of_range')
            if float(np.sqrt(np.mean(pcm*pcm)))<0.001:raise ValueError('audio_too_quiet')
            del pcm
            with contextlib.redirect_stdout(sys.stderr):
                if self.model is None:
                    from mlx_audio.stt import load
                    self.model=load(str(self.path))
                lexicon=json.loads((Path(__file__).resolve().parents[1]/'data/seed_lexicon.json').read_text())
                hotwords=None if self.no_hotwords else [e['zh_hant'] for e in lexicon['entries'] if e['kind'] in {'ingredient','brand_family'}]
                result=self.model.generate(str(wav),language='Cantonese',max_tokens=192,temperature=0,verbose=False,hotwords=hotwords)
            text=result.text.strip();del result
            if not text:raise ValueError('no_speech_detected')
        gc.collect()
        return {'text':text[:1000],'language':'yue','duration_seconds':round(duration,2),'processing_seconds':round(time.perf_counter()-started,2),'requires_confirmation':True,'seed_vocabulary_hint':not self.no_hotwords,'model':'Qwen3-ASR-0.6B-4bit','resident_model_reused':warm}
def main():
    parser=argparse.ArgumentParser();parser.add_argument('audio');parser.add_argument('model');parser.add_argument('--no-hotwords',action='store_true');args=parser.parse_args();worker=Transcriber(args.model,args.no_hotwords)
    if args.audio=='--':raise SystemExit('Use --serve as the audio argument via --serve MODEL')
    if args.audio=='serve':
        for line in sys.stdin:
            try:
                req=json.loads(line);path=req.get('audio')
                if not isinstance(path,str) or not Path(path).is_file():raise ValueError('audio_unreadable')
                output=worker.transcribe(path)
            except (ValueError,OSError,subprocess.TimeoutExpired) as e:output={'error':str(e) if isinstance(e,ValueError) else 'audio_processing_failed'}
            except Exception:output={'error':'recognition_failed'}
            print(json.dumps(output,ensure_ascii=False),flush=True)
            del output
        return 0
    try:print(json.dumps(worker.transcribe(args.audio),ensure_ascii=False));return 0
    except ValueError as e:print(json.dumps({'error':str(e)}));return 2
if __name__=='__main__':raise SystemExit(main())
