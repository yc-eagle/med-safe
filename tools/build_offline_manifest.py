#!/usr/bin/env python3
"""Embed an explicit, integrity-checked public asset list into the service worker.

Run after changing any app assets, and before deployment. This never scans user
uploads or the repository recursively; only the filenames below are allowed.
"""
import hashlib
import json
import argparse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / 'app'
PUBLIC = [
    'index.html', 'app.css', 'product-features.css', 'release.css',
    'theme.css', 'experience.css', 'experience.js',
    'locale.js', 'vendor/opencc-t2cn.js', 'vendor/OPENCC-LICENSE.txt', 'vendor/opencc-source.json',
    'resource-pages.js', 'resource-pages.css',
    'browser-runtime.js', 'data.js', 'engine.js', 'medicine-info.js', 'patient.js',
    'app.js', 'voice.js', 'product-features.js', 'release-ui.js', 'offline-runtime.js',
    'offline.html', 'data-report.html', 'verify.html', 'verify.css', 'verify.js',
    'validator.js', 'sample-labels.png', 'favicon.svg', 'manifest.webmanifest',
    'icon-192.svg', 'icon-512.svg',
    'vendor/tesseract.min.js', 'vendor/worker.min.js',
    'vendor/eng.traineddata', 'vendor/chi_tra.traineddata',
    'vendor/TESSDATA-LICENSE.txt', 'vendor/TESSERACT-CORE-LICENSE.txt',
    'vendor/TESSERACT-LICENSE.txt', 'vendor/tesseract.min.js.LICENSE.txt',
    'vendor/worker.min.js.LICENSE.txt', 'vendor/sources.json',
]
for suffix in ['', '-lstm', '-simd', '-simd-lstm', '-relaxedsimd', '-relaxedsimd-lstm']:
    PUBLIC += [f'vendor/tesseract-core{suffix}.wasm', f'vendor/tesseract-core{suffix}.wasm.js']


def main(app=APP):
    entries = []
    for name in PUBLIC:
        content = (app / name).read_bytes()
        entries.append({'path': name, 'bytes': len(content), 'sha256': hashlib.sha256(content).hexdigest()})
    encoded = json.dumps(entries, separators=(',', ':'), ensure_ascii=True)
    revision = hashlib.sha256(encoded.encode()).hexdigest()[:16]
    config = {'version': revision, 'bytes': sum(e['bytes'] for e in entries), 'assets': entries}
    path = app / 'sw.js'
    source = path.read_text()
    start, end = '// BEGIN GENERATED ASSETS', '// END GENERATED ASSETS'
    before, rest = source.split(start, 1)
    _, after = rest.split(end, 1)
    path.write_text(before + start + '\nconst RELEASE = ' + json.dumps(config, separators=(',', ':')) + ';\n' + end + after)
    print(json.dumps({'version': revision, 'files': len(entries), 'bytes': config['bytes'], 'MiB': round(config['bytes'] / 1048576, 2)}))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--app-dir', type=Path, default=APP, help='Final published app directory, after any build-time edits')
    main(parser.parse_args().app_dir.resolve())
