"""Record real local Git history and validate local Markdown references."""
from pathlib import Path
import subprocess, re, json
ROOT=Path(__file__).resolve().parents[2]
def git(repo,*args):return subprocess.check_output(['git',*args],cwd=repo,text=True,encoding='utf-8').strip()

def record():
 blocks=['# Commits locales de preparación TB1\n\nCorte técnico: 03/10/2026. Sin push ni deployment. Hashes locales, no enlaces remotos ficticios. Los commits históricos no cambian de autor.\n']
 ranges=[('Report',ROOT,'9907263'),('Landing',ROOT.parent/'creditor-landing-page','origin/develop'),('Frontend',ROOT.parent/'creditor-web-app','main')]
 for label,repo,base in ranges:
  head=git(repo,'rev-parse','HEAD');branch=git(repo,'branch','--show-current')
  blocks.append(f'\n## {label}\n\nRama `{branch}`, HEAD `{head}`. Rango `{base}..HEAD`.\n\n| SHA | Fecha | Autor y correo | Mensaje | Body |\n|---|---|---|---|---|\n')
  rows=git(repo,'log','--reverse',f'{base}..HEAD','--format=%h%x1f%cs%x1f%an <%ae>%x1f%s%x1f%b%x1e')
  for row in rows.split('\x1e'):
   if not row.strip():continue
   fields=row.strip('\r\n ').split('\x1f');fields=[f.replace('|','/').replace('\n',' ').strip() or 'Sin body' for f in fields]
   blocks.append('| '+' | '.join(fields)+' |\n')
  blocks.append('\nFeatures conservadas para revisión:\n\n')
  for b in git(repo,'for-each-ref','--format=%(refname:short) %(objectname:short)','refs/heads/feature').splitlines():blocks.append('- `'+b+'`\n')
 (ROOT/'docs/tb1/commits-locales.md').write_text(''.join(blocks),encoding='utf-8')

def check():
 missing=[]
 for p in [ROOT/'README.md',*sorted((ROOT/'docs').rglob('*.md')),*sorted((ROOT/'assets/research/tb1').glob('*.md')),*sorted((ROOT/'assets/ux/tb1').glob('*.md'))]:
  text=p.read_text(encoding='utf-8-sig')
  # Code blocks contain examples, not navigable document references.
  text=re.sub(r'```.*?```','',text,flags=re.S)
  urls=re.findall(r'!?\[[^\]]*\]\(([^\n]+?)\)',text)+re.findall(r'<img[^>]+src="([^"]+)"',text)
  for url in urls:
   url=url.strip().strip('<>')
   if re.match(r'^(https?:|mailto:|data:|#)',url):continue
   target=url.split('#')[0]
   if target and not (p.parent/target).exists():missing.append(f'{p.relative_to(ROOT)}: {url}')
 if missing:raise SystemExit('Missing local references:\n'+'\n'.join(missing))
 print('Local Markdown file/image references resolve.')
if __name__=='__main__':
 import sys
 if '--record' in sys.argv:record()
 else:check()
