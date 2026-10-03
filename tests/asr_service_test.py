"""Checks process lifecycle using a fake text worker; not ASR accuracy."""
from pathlib import Path
import json,sys,tempfile,subprocess,unittest
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from native.asr_service import ASRService
class Lifecycle(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();w=Path(self.tmp.name)/'worker.py'
  w.write_text('''import sys,json,time,os
for line in sys.stdin:
 req=json.loads(line);a=req['audio']
 if a=='hang':time.sleep(5)
 elif a=='crash':os._exit(7)
 elif a=='malformed':print('not json',flush=True);continue
 elif a=='bad_audio':print(json.dumps({'error':'audio_unreadable'}),flush=True);continue
 print(json.dumps({'text':'synthetic','pid':os.getpid()}),flush=True)
''')
  self.service=ASRService(sys.executable,w,'unused')
 def tearDown(self):self.service.close();self.tmp.cleanup()
 def test_reuses_and_closes_process(self):
  a=self.service.transcribe('a');b=self.service.transcribe('b');self.assertEqual(a['pid'],b['pid']);p=self.service.process;self.service.close();self.assertIsNotNone(p.poll())
 def test_crash_recovers(self):
  with self.assertRaises(ValueError):self.service.transcribe('crash',timeout=2)
  self.assertEqual(self.service.transcribe('good')['text'],'synthetic')
 def test_timeout_recovers(self):
  with self.assertRaises(subprocess.TimeoutExpired):self.service.transcribe('hang',timeout=.1)
  self.assertEqual(self.service.transcribe('good')['text'],'synthetic')
 def test_malformed_response_recovers(self):
  with self.assertRaises(ValueError):self.service.transcribe('malformed')
  self.assertEqual(self.service.transcribe('good')['text'],'synthetic')
 def test_bad_audio_keeps_worker_ready(self):
  self.assertEqual(self.service.transcribe('bad_audio')['error'],'audio_unreadable')
  self.assertEqual(self.service.transcribe('good')['text'],'synthetic')
if __name__=='__main__':
 result=unittest.TextTestRunner().run(unittest.defaultTestLoader.loadTestsFromTestCase(Lifecycle))
 (Path(__file__).resolve().parents[1]/'qa/asr-service-lifecycle.json').write_text(json.dumps({'passed':result.testsRun-len(result.errors)-len(result.failures),'tests':result.testsRun,'fake_worker':True,'failures':len(result.failures),'errors':len(result.errors)},indent=2))
 sys.exit(0 if result.wasSuccessful() else 1)
