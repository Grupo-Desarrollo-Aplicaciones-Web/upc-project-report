const fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os');
const root=path.resolve(__dirname,'../..');
const modules=process.env.CODEX_NODE_MODULES||path.join(os.homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
const {chromium}=require(path.join(modules,'playwright'));
const {pathToFileURL}=require('node:url');
const sources=['README.md']; // Canonical complete report; chapter files are synchronized views of the same source.
const aliases={'docs/sprints/sprint-02.md':{target:'docs/05-implementation-validation-deployment.md',anchor:'522-sprint-2'}};
const name=process.env.CREDITOR_REPORT_NAME||'upc-pre-202620-1asi0730-16127-creditor-report-unified-20261102';
const sourceId=source=>source.replaceAll('/','-').replace(/\.md$/,'');
const decodeAnchor=anchor=>{try{return decodeURIComponent(anchor)}catch{return anchor}};
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
  html=html.replace(/href="#([^"]+)"/g,(m,anchor)=>`href="#${sourceId(source)}--${decodeAnchor(anchor)}"`);
  html=html.replace(/href="([^"#]+\.md)(#[^"]*)?"/g,(m,href,anchor)=>{
   const linked=path.relative(root,path.resolve(root,path.dirname(source),href)).replaceAll('\\','/');
   const alias=aliases[linked],target=alias?.target||linked;
   const fragment=anchor?decodeAnchor(anchor.slice(1)):alias?.anchor;
   return sources.includes(target)?`href="#${sourceId(target)}${fragment?'--'+fragment:''}"`:`href="${pathToFileURL(path.resolve(root,path.dirname(source),href)).href}${anchor||''}"`;
  });
  body+=`<section class="chapter" id="${sourceId(source)}"><p class="source">CREDITOR · ${source}</p>${html}</section>`;
 }
 const html=`<!doctype html><html lang="es-419"><meta charset="utf-8"><title>CREDITOR Informe unificado</title><style>
 @page{size:A4;margin:17mm 14mm 19mm}*{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#17243b;font-size:10.5pt;line-height:1.45}h1{font-size:23pt;color:#163b77;margin:0 0 18px}h2{font-size:17pt;margin-top:26px}h3{font-size:13pt}h4{font-size:11pt}h1,h2,h3,h4{break-after:avoid}p,li{orphans:3;widows:3}a{color:#154eab;overflow-wrap:anywhere}table{border-collapse:collapse;width:100%;font-size:8.6pt;line-height:1.35;margin:15px 0 22px;table-layout:fixed}th,td{border:1px solid #bdc8d9;padding:7px;vertical-align:top;overflow-wrap:anywhere}th{background:#eaf0f8;font-weight:700}thead{display:table-header-group}tr{break-inside:avoid}img{display:block;max-width:100%;max-height:205mm;object-fit:contain;margin:16px auto;break-inside:avoid}.remote-logo{display:none}code{font:8.3pt Consolas,monospace;overflow-wrap:anywhere}pre{white-space:pre-wrap;border:1px solid #cbd5e1;background:#f8fafc;padding:14px;font:9pt Consolas;line-height:1.4}.chapter{break-before:page}.chapter:first-child{break-before:auto}.source{font-size:8pt;color:#69758b;margin-bottom:20px}blockquote{border-left:3px solid #bfccdc;padding-left:15px;margin-left:0}
 img[src*="creditorlogo"]{max-width:90mm;max-height:55mm}
 .section-page-start{break-before:page;page-break-before:always}
 p:has(>strong:only-child){break-after:avoid}
 p{break-inside:avoid}
 img[src*="-part-"]{max-height:225mm}
 </style>${body}</html>`;
 const htmlPath=path.join(root,'.tb1-build/report.html');await fs.writeFile(htmlPath,html);
 const browser=await chromium.launch({channel:process.env.TB1_BROWSER_CHANNEL||'msedge',headless:true});
 try{
  // Match the printable A4 width when checking horizontal overflow.
  const p=await browser.newPage({viewport:{width:Math.round((210-28)*96/25.4),height:1000}});
  await p.goto(pathToFileURL(htmlPath).href);await p.emulateMedia({media:'print'});await p.evaluate(()=>document.fonts.ready);
  const checks=await p.evaluate(()=>{
   const isHeading=e=>/^H[1-4]$/.test(e.tagName);
   const slug=text=>text.toLowerCase().trim().replace(/[^\p{L}\p{N}\s_-]/gu,'').replace(/\s/g,'-');
   const numbered=e=>/^\d+(?:\.\d+)+(?:\.)?\s/.test(e.textContent.trim());
   const sections=[];
   for(const chapter of document.querySelectorAll('.chapter')){
    const counts=new Map();
    for(const heading of chapter.querySelectorAll('h1,h2,h3,h4,h5,h6')){
     const base=slug(heading.textContent),duplicate=counts.get(base)||0;
     counts.set(base,duplicate+1);
     heading.id=`${chapter.id}--${base}${duplicate?'-'+duplicate:''}`;
    }
    const firstHeading=chapter.querySelector('h1,h2,h3,h4');
    for(const heading of chapter.querySelectorAll('h2,h3,h4')){
     if(heading.tagName!=='H2'&&!numbered(heading))continue;
     // A parent with no intervening content shares the page of its first
     // subsection. Moving the whole heading run avoids title-only pages.
     let start=heading;
     while(start.previousElementSibling&&isHeading(start.previousElementSibling))start=start.previousElementSibling;
     if(start!==firstHeading)start.classList.add('section-page-start');
     sections.push({id:heading.id,title:heading.textContent.trim(),pageStart:start.id,chapterStart:start===firstHeading});
    }
   }
   const unresolvedLinks=[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href').slice(1)).filter(id=>!document.getElementById(id));
   const body=document.body.getBoundingClientRect();
   const horizontalOverflow=[...document.querySelectorAll('table,pre,img:not(.remote-logo),svg')].filter(e=>{
    const r=e.getBoundingClientRect();return r.width>0&&(r.left<body.left-1||r.right>body.right+1);
   }).map(e=>({element:e.tagName,source:e.getAttribute('src')||e.textContent.trim().slice(0,80)}));
   return {sections,forcedSectionBreaks:document.querySelectorAll('.section-page-start').length,unresolvedLinks:[...new Set(unresolvedLinks)],horizontalOverflow};
  });
  const broken=await p.locator('img:not(.remote-logo)').evaluateAll(es=>es.filter(e=>!e.complete||!e.naturalWidth).map(e=>e.src));
  checks.brokenImages=broken;
  await fs.writeFile(path.join(root,'.tb1-build/report-checks.json'),JSON.stringify(checks,null,2));
  await fs.writeFile(htmlPath,await p.content());
  if(broken.length)throw new Error('Broken images: '+broken.join(', '));
  if(checks.unresolvedLinks.length)throw new Error('Unresolved internal report links: '+checks.unresolvedLinks.join(', '));
  if(checks.horizontalOverflow.length)throw new Error('Horizontal report overflow: '+JSON.stringify(checks.horizontalOverflow));
  const out=path.join(root,'deliverables/tb1',name+'.pdf');
  await p.pdf({path:out,format:'A4',printBackground:true,displayHeaderFooter:true,headerTemplate:'<span></span>',footerTemplate:'<div style="font:8px Arial;width:100%;text-align:center;color:#64748b">CREDITOR · Revisión documental local · <span class="pageNumber"></span> / <span class="totalPages"></span></div>'});
  console.log(JSON.stringify({out,sections:checks.sections.length,forcedSectionBreaks:checks.forcedSectionBreaks,unresolvedLinks:0,horizontalOverflow:0}));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
