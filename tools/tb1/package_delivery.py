"""Package tracked project sources, local builds and reviewed TB1 artifacts."""
from pathlib import Path, PurePosixPath
from datetime import datetime, timezone
from hashlib import sha256
import json
import subprocess
import zipfile

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'deliverables/tb1'
PREFIX = 'upc-pre-202620-1asi0730-16127-creditor-'
REPOS = {'report': ROOT, 'landing': ROOT.parent / 'creditor-landing-page',
         'frontend': ROOT.parent / 'creditor-web-app'}

def git(repo, *args):
    return subprocess.check_output(['git', *args], cwd=repo, encoding='utf-8').strip()

def allowed(name):
    parts = PurePosixPath(name.replace('\\', '/')).parts
    if any(p in {'.git', 'node_modules', '.tb1-build', 'test-results', 'playwright-report', '__pycache__'} for p in parts):
        return False
    return not any(p.startswith('.env') and p != '.env.example' for p in parts)

def build():
    files = [OUT / (PREFIX + suffix) for suffix in ['report-tb1.pdf', 'keynote-tb1.pptx',
        'keynote-tb1.pdf', 'performance-tb1.docx', 'performance-tb1.pdf']]
    for p in files:
        if not p.is_file() or not p.stat().st_size:
            raise RuntimeError(f'Missing deliverable: {p}')
    snapshot = {label: {'branch': git(repo, 'branch', '--show-current'),
        'sourceCommit': git(repo, 'rev-parse', 'HEAD'),
        'features': git(repo, 'for-each-ref', '--format=%(refname:short) %(objectname)', 'refs/heads/feature').splitlines(),
        'main': git(repo, 'rev-parse', 'main'),
        'originDevelop': git(repo, 'rev-parse', 'origin/develop') if label != 'frontend' else None}
        for label, repo in REPOS.items()}
    manifest = {'project': 'CREDITOR', 'milestone': 'TB1',
        'createdUtc': datetime.now(timezone.utc).isoformat(),
        'scope': 'Local preparation; no push, remote creation or new deployment.',
        'commitBoundary': 'Source snapshot before artifact-package commit and local GitFlow merge.',
        'identity': 'MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com>',
        'repositories': snapshot,
        'checks': {'landingUnitTests': 12, 'frontendDomainTests': 14,
            'frontendBrowserTests': 2, 'builds': ['landing', 'frontend'],
            'frontendFinalCssChecks': 'Browser tests and build rerun after CSS-only history fix.',
            'presentationSlides': 22, 'performancePages': 3,
            'reportReferences': 'Resolved local Markdown files/images.',
            'documentPdfExport': 'WPS Writer Office-compatible COM; canonical renderer unavailable.'},
        'pendingAcademicEvidence': ['Two S2 interviews and analysis with quotes/timestamps',
            'Team planning/LACX/board/story acceptance and leader evaluation',
            'Design sync in required online tools', 'Authorized deployment of landing/frontend',
            'Real recorded exposition MP4/Stream'],
        'artifacts': [{'file': p.name, 'bytes': p.stat().st_size,
            'sha256': sha256(p.read_bytes()).hexdigest()} for p in files]}
    # Record the slide-package validator summary without local runtime paths.
    receipt = json.loads((ROOT / '.tb1-build/keynote/validation.json').read_text(encoding='utf-8'))
    deck = next(item for item in manifest['artifacts'] if item['file'].endswith('.pptx'))
    if receipt['finalSha256'] != deck['sha256']:
        raise RuntimeError('Presentation receipt does not match final deck')
    if receipt['packageIntegrity']['findingCount'] or receipt['presentationLayout']['findingCount']:
        raise RuntimeError('Presentation package/layout validation findings')
    if not receipt['firstPartyImport']['passed'] or not receipt['nativeTableArithmetic']['passed']:
        raise RuntimeError('Presentation import or table arithmetic did not pass')
    manifest['presentationValidation'] = {'sha256': receipt['finalSha256'],
        'packageFindings': 0, 'layoutFindings': 0, 'reimport': 'pass',
        'nativeTableArithmetic': '26 SP total verified',
        'nativePowerPointExecution': 'Not performed', 'visualReview': 'All 22 rendered slides reviewed'}
    zip_path = OUT / (PREFIX + 'supporting-tb1.zip')
    provisional = OUT / 'MANIFEST.json'
    provisional.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED, compresslevel=6) as archive:
        for label, repo in REPOS.items():
            tracked = git(repo, 'ls-files', '-z').split('\0')
            for name in tracked:
                if not name or not allowed(name) or name.startswith('deliverables/'):
                    continue
                archive.write(repo / name, f'sources/{repo.name}/{name}')
            if label != 'report':
                dist = repo / 'dist'
                if not (dist / 'index.html').is_file():
                    raise RuntimeError(f'Missing build: {repo.name}')
                for p in sorted(dist.rglob('*')):
                    if p.is_file():
                        archive.write(p, f'builds/{repo.name}/{p.relative_to(dist).as_posix()}')
        for p in [*files, OUT / 'README.md', provisional]:
            archive.write(p, f'deliverables/{p.name}')
    with zipfile.ZipFile(zip_path) as archive:
        if archive.testzip() is not None:
            raise RuntimeError('ZIP CRC validation failed')
        if not all(allowed(n) for n in archive.namelist()):
            raise RuntimeError('Forbidden directory/file in ZIP')
        manifest['supportingZip'] = {'file': zip_path.name, 'bytes': zip_path.stat().st_size,
            'sha256': sha256(zip_path.read_bytes()).hexdigest(), 'entries': len(archive.namelist()),
            'manifestInsideZip': 'Source snapshot without ZIP self-checksum to avoid a circular hash.'}
    provisional.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'{zip_path}\n{provisional}\nZIP integrity and exclusion checks passed.')

if __name__ == '__main__':
    build()
