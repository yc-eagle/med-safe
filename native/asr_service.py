"""Serial, bounded local child process. Retains model weights, not a conversation."""
import json,os,queue,subprocess,threading,time
class ASRService:
    def __init__(self,python,worker,model):
        self.command=[str(python),'-u',str(worker),'serve',str(model)];self.process=None;self.messages=None;self.lock=threading.Lock();self.warm=False
    def _start(self):
        self.messages=queue.Queue()
        self.process=subprocess.Popen(self.command,stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr=subprocess.DEVNULL,text=True,bufsize=1,env={**os.environ,'HF_HUB_OFFLINE':'1','TRANSFORMERS_OFFLINE':'1'})
        process,messages=self.process,self.messages
        def collect():
            try:
                for line in process.stdout:messages.put(line)
            finally:messages.put(None)
        threading.Thread(target=collect,daemon=True).start()
    def transcribe(self,path,timeout=90):
        with self.lock:
            if self.process is None or self.process.poll() is not None:self.close();self._start()
            try:
                self.process.stdin.write(json.dumps({'audio':str(path)})+'\n');self.process.stdin.flush()
                line=self.messages.get(timeout=timeout)
                if line is None:raise RuntimeError('Voice worker stopped')
                result=json.loads(line)
                if not isinstance(result,dict):raise ValueError('Invalid voice response')
                if result.get('text'):self.warm=True
                return result
            except queue.Empty:
                self.close();raise subprocess.TimeoutExpired(self.command,timeout)
            except (BrokenPipeError,ValueError,RuntimeError):
                self.close();raise ValueError('Voice worker unavailable')
    def close(self):
        p=self.process;self.process=None;self.warm=False
        if p is not None:
            if p.poll() is None:
                p.terminate()
                try:p.wait(timeout=2)
                except subprocess.TimeoutExpired:p.kill();p.wait(timeout=2)
            for pipe in [p.stdin,p.stdout]:
                if pipe:
                    try:pipe.close()
                    except OSError:pass
