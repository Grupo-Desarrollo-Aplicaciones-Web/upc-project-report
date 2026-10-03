"""Refresh the report index from Markdown headings and GitHub-style anchors."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[2]
CHAPTERS = ['00-project-information.md', '00-student-outcome.md', '01-introduction.md',
    '02-requirements-elicitation-analysis.md', '03-requirements-specification.md',
    '04-product-design.md', '05-implementation-validation-deployment.md',
    '06-conclusions-recommendations.md', '07-bibliography-appendices.md',
    '09-tb1-delivery-checklist.md']

def build():
    # Keep the chapter complete while retaining the canonical sprint source.
    sprint = (ROOT/'docs/sprints/sprint-02.md').read_text(encoding='utf-8-sig')
    details = sprint[sprint.index('## 5.2.2.1 '):]
    assert len(re.findall(r'^## 5\.2\.2\.\d+ ',details,re.M)) == 8
    details = re.sub(r'^## (?=5\.2\.2\.)','#### ',details,flags=re.M)
    details = details.replace('](../tb1/','](tb1/').replace('](../09-','](09-')
    chapter = ROOT/'docs/05-implementation-validation-deployment.md'
    text = chapter.read_text(encoding='utf-8-sig')
    start = text.index('#### 5.2.2.1 ')
    chapter.write_text(text[:start]+details,encoding='utf-8')
    rows = []
    for file in CHAPTERS:
        counts = {}
        for line in (ROOT/'docs'/file).read_text(encoding='utf-8-sig').splitlines():
            match = re.match(r'^(#{1,4})\s+(.+?)\s*$', line)
            if not match:
                continue
            level, title = len(match[1]), match[2]
            slug = re.sub(r'[^\w\s-]', '', title.lower().strip())
            slug = re.sub(r'\s', '-', slug)
            duplicate = counts.get(slug, 0)
            counts[slug] = duplicate+1
            if duplicate:
                slug += f'-{duplicate}'
            target = f'docs/{file}' + (f'#{slug}' if level > 1 else '')
            rows.append('  '*(level-1) + f'- [{title}]({target})')
    rows.extend(['', '- [Sprint 1 histórico](docs/sprints/sprint-01.md)',
        '- [Sprint 2 canónico](docs/sprints/sprint-02.md)',
        '- [Convenciones GitFlow](CONTRIBUTING.md)',
        '- [Revisión de retroalimentación](docs/tb1/feedback-resolution.md)', ''])
    readme = ROOT/'README.md'
    content = readme.read_text(encoding='utf-8-sig')
    start = content.index('## Estructura del informe')
    readme.write_text(content[:start]+'## Estructura del informe\n\n'+'\n'.join(rows), encoding='utf-8')
    print(f'Index refreshed: {len(rows)} entries/lines')

if __name__ == '__main__':
    build()
