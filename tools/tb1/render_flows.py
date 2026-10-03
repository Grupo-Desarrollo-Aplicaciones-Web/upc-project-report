"""Regenerate reviewed Mermaid flows and their readable report stages."""
from pathlib import Path
import argparse, subprocess
from concurrent.futures import ThreadPoolExecutor

ROOT = Path(__file__).resolve().parents[2]

def build(runtime, node, only=None):
    cli = runtime/'node_modules/@mermaid-js/mermaid-cli/src/cli.js'
    config = runtime/'puppeteer.json'
    if not cli.is_file() or not config.is_file():
        raise RuntimeError('Runtime must include Mermaid CLI and a puppeteer.json for an installed browser')
    directory = ROOT/'assets/architecture'
    sources = sorted(p for p in directory.glob('user-flow-*.mmd')
                     if any(p.stem.startswith('user-flow-'+name) for name in ['purchase','payment','obligation']))
    sources.append(directory/'web-wireflow.mmd')
    sources.extend(sorted(directory.glob('big-picture-event-storming*.mmd')))
    if only:
        unknown = set(only) - {p.stem for p in sources}
        if unknown:
            raise RuntimeError(f'Unknown diagram names: {unknown}')
        sources = [p for p in sources if p.stem in only]
    def render(job):
        source, ext = job
        output = source.with_suffix('.'+ext)
        subprocess.run([node,str(cli),'-i',str(source),'-o',str(output),
            '-p',str(config),'-C',str(ROOT/'tools/tb1/flow-style.css'),
            '--size','1800','-q'],check=True)
        return f'{output.name}: {output.stat().st_size} bytes'
    with ThreadPoolExecutor(max_workers=2) as executor:
        for result in executor.map(render, [(p,ext) for p in sources for ext in ['svg','png']]):
            print(result, flush=True)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--runtime',type=Path,required=True)
    parser.add_argument('--node',default='node')
    parser.add_argument('--diagram',nargs='+',help='Optional reviewed source stems to regenerate')
    args = parser.parse_args()
    build(args.runtime,args.node,args.diagram)
