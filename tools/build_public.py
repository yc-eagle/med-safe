"""Build only the public product. Use an empty output directory, never a gallery."""
from pathlib import Path
import argparse
import shutil
from build_offline_manifest import PUBLIC, ROOT, main as build_manifest


def build(out):
    out = Path(out).resolve()
    # Refusing an occupied destination prevents stale recordings or unrelated
    # files from silently becoming part of a later public deployment.
    if out.exists() and (not out.is_dir() or any(out.iterdir())):
        raise ValueError('Output must be an empty directory. Choose a new build directory.')
    out.mkdir(parents=True, exist_ok=True)
    for name in [*PUBLIC, 'sw.js', '404.html']:
        target = out / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(ROOT / 'app' / name, target)
    index = out / 'index.html'
    index.write_text(index.read_text().replace(
        '<script src="browser-runtime.js">',
        '<script>window.PUBLIC_DEMO=true;</script><script src="browser-runtime.js">'))
    build_manifest(out)
    return out


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--out', required=True)
    try:
        print(build(parser.parse_args().out))
    except ValueError as error:
        parser.error(str(error))
