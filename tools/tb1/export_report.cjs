const fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os');
const root=path.resolve(__dirname,'../..');
const modules=process.env.CODEX_NODE_MODULES||path.join(os.homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
const {chromium}=require(path.join(modules,'playwright'));
const {pathToFileURL}=require('node:url');
const sources=['README.md','docs/00-project-information.md','docs/00-student-outcome.md','docs/01-introduction.md','docs/02-requirements-elicitation-analysis.md','docs/03-requirements-specification.md','docs/04-product-design.md','docs/05-implementation-validation-deployment.md','docs/06-conclusions-recommendations.md','docs/07-bibliography-appendices.md','docs/09-tb1-delivery-checklist.md','docs/sprints/sprint-01.md','docs/sprints/sprint-02.md','docs/tb1/evidencia-local.md','docs/tb1/commits-locales.md','docs/tb1/guion-exposicion.md'];
const name='upc-pre-202620-1asi0730-16127-creditor-report-tb1';
(async()=>{
 const {marked}=await import(pathToFileURL(path.join(modules,'marked/lib/marked.esm.js')).href);
 await fs.mkdir(path.join(root,'.tb1-build'),{recursive:true});
 let body='';
 for (const source of sources){
  let html=marked.parse(await fs.readFile(path.join(root,source),'utf8'));
  html=html.replace(/src="([^"]+)"/g,(m,url)=>{
   if(/^https?:/.test(url))return 'src="" class="remote-logo"';
   return 'src="'+pathToFileURL(path.resolve(root,path.dirname(source),url)).href+'"';
  });
  html=html.replace(/href="([^"#]+\.md)(#[^"]*)?"/g,(m,href,anchor)=>{
   const target=path.relative(root,path.resolve(root,path.dirname(source),href)).replaceAll('\\','/');
   return sources.includes(target)?`href="#${target.replaceAll('/','-').replace('.md','')}"`:m;
  });
  body+=`<section class="chapter" id="${source.replaceAll('/','-').replace('.md','')}"><p class="source">CREDITOR · ${source}</p>${html}</section>`;
 }
 const html=`<!doctype html><html lang="es-419"><meta charset="utf-8"><title>CREDITOR TB1 Report</title><style>
 @page{size:A4;margin:17mm 14mm 19mm}*{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#17243b;font-size:10.5pt;line-height:1.45}h1{font-size:23pt;color:#163b77;margin:0 0 18px}h2{font-size:17pt;margin-top:26px}h3{font-size:13pt}h4{font-size:11pt}h1,h2,h3,h4{break-after:avoid}p,li{orphans:3;widows:3}a{color:#154eab;overflow-wrap:anywhere}table{border-collapse:collapse;width:100%;font-size:8.6pt;line-height:1.35;margin:15px 0 22px;table-layout:fixed}th,td{border:1px solid #bdc8d9;padding:7px;vertical-align:top;overflow-wrap:anywhere}th{background:#eaf0f8;font-weight:700}thead{display:table-header-group}tr{break-inside:avoid}img{display:block;max-width:100%;max-height:205mm;object-fit:contain;margin:16px auto;break-inside:avoid}.remote-logo{display:none}code{font:8.3pt Consolas,monospace;overflow-wrap:anywhere}pre{white-space:pre-wrap;border:1px solid #cbd5e1;background:#f8fafc;padding:14px;font:9pt Consolas;line-height:1.4}.chapter{break-before:page}.chapter:first-child{break-before:auto}.source{font-size:8pt;color:#69758b;margin-bottom:20px}blockquote{border-left:3px solid #bfccdc;padding-left:15px;margin-left:0}
 img[src*="creditorlogo"]{max-width:90mm;max-height:55mm}
 </style>${body}</html>`;
 const htmlPath=path.join(root,'.tb1-build/report.html');await fs.writeFile(htmlPath,html);
 const browser=await chromium.launch({channel:process.env.TB1_BROWSER_CHANNEL||'msedge',headless:true});
 const p=await browser.newPage();await p.goto(pathToFileURL(htmlPath).href);await p.evaluate(()=>document.fonts.ready);
 const broken=await p.locator('img:not(.remote-logo)').evaluateAll(es=>es.filter(e=>!e.complete||!e.naturalWidth).map(e=>e.src));
 if(broken.length)throw new Error('Broken images: '+broken.join(', '));
 const out=path.join(root,'deliverables/tb1',name+'.pdf');
 await p.pdf({path:out,format:'A4',printBackground:true,displayHeaderFooter:true,headerTemplate:'<span></span>',footerTemplate:'<div style="font:8px Arial;width:100%;text-align:center;color:#64748b">CREDITOR · TB1 · Preparación local · <span class="pageNumber"></span> / <span class="totalPages"></span></div>'});
 await browser.close();console.log(out);
})().catch(e=>{console.error(e);process.exit(1)});
