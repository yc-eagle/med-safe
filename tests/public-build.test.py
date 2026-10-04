"""Check the product deployment boundary, including old recording leftovers."""
import json
from pathlib import Path
import sys
import tempfile
import unittest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'tools'))
from build_public import build
from build_offline_manifest import PUBLIC


class ProductBuild(unittest.TestCase):
    def test_only_allowlisted_product_files_are_published(self):
        with tempfile.TemporaryDirectory() as directory:
            root = build(directory)
            actual = {str(p.relative_to(root)) for p in root.rglob('*') if p.is_file()}
            self.assertEqual(actual, set(PUBLIC) | {'sw.js', '404.html'})
            self.assertFalse(any(p.endswith(('.mp4', '.m4a', '.srt', '.vtt', '.pptx', '.pdf')) for p in actual))
            self.assertIn('window.PUBLIC_DEMO=true', (root / 'index.html').read_text())
            self.assertNotIn('demo-3min', (root / 'resource-pages.js').read_text())
            config = json.loads((root / 'sw.js').read_text().split('const RELEASE = ', 1)[1].split(';\n', 1)[0])
            self.assertEqual({a['path'] for a in config['assets']}, set(PUBLIC))

    def test_old_gallery_destination_is_rejected_without_deletion(self):
        with tempfile.TemporaryDirectory() as directory:
            old = Path(directory) / 'showcase'
            old.mkdir()
            recording = old / 'recording.mp4'
            recording.write_bytes(b'archived recording')
            with self.assertRaisesRegex(ValueError, 'empty directory'):
                build(directory)
            self.assertEqual(recording.read_bytes(), b'archived recording')
            self.assertFalse((Path(directory) / 'index.html').exists())


if __name__ == '__main__':
    unittest.main()
