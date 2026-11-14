const fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os');
const {spawn}=require('node:child_process');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'../..');
const modules=process.env.CODEX_NODE_MODULES||path.join(os.homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
const {chromium}=require(path.join(modules,'playwright'));
const out=path.join(root,'assets/ux/tb1');
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
(async()=>{
 let server,browser;
 const url='http://127.0.0.1:5173/creditor-landing-page/';
 try{
  try{await fetch(url,{signal:AbortSignal.timeout(1500)});}catch{
   const landing=path.resolve(root,'../creditor-landing-page');
   server=spawn(process.execPath,[path.join(landing,'node_modules/vite/bin/vite.js'),'--host','127.0.0.1','--port','5173','--strictPort'],{cwd:landing,windowsHide:true,stdio:'pipe'});
   let message='';server.stderr.on('data',chunk=>{message+=chunk.toString();});
   for(let i=0;i<40;i++){
    try{const response=await fetch(url,{signal:AbortSignal.timeout(1000)});if(response.ok)break;}catch{}
    if(server.exitCode!==null)throw new Error('Temporary landing server failed: '+message);
    await pause(250);
   }
  }
  browser=await chromium.launch({channel:process.env.TB1_BROWSER_CHANNEL||'msedge',headless:true});
  const page=await browser.newPage({viewport:{width:1180,height:1000},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const wireframes=[['dashboard','dashboard'],['purchases','list'],['new','purchase'],['detail','detail'],['payment','payment']];
  await page.goto(pathToFileURL(path.join(out,'wireframes.html')).href);
  for(const [id,name] of wireframes)await page.locator('#'+id).screenshot({path:path.join(out,'wireframe-'+name+'.png')});
  await page.setViewportSize({width:390,height:844});
  for(const [id,name] of wireframes)await page.locator('#'+id).screenshot({path:path.join(out,'wireframe-'+name+'-mobile.png')});
  const frontendWireframeOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  await page.goto(pathToFileURL(path.join(out,'landing-wireframes.html')).href);
  for(const id of ['overview','process'])await page.locator('#'+id).screenshot({path:path.join(out,'wireframe-landing-'+id+'-mobile.png')});
  const landingWireframeOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  await page.setViewportSize({width:1180,height:1000});
  for(const id of ['overview','process'])await page.locator('#'+id).screenshot({path:path.join(out,'wireframe-landing-'+id+'-desktop.png')});
  await page.goto(url);
  if(!/CREDITOR/i.test(await page.title()))throw new Error('Unexpected application on port 5173');
  await page.getByRole('button',{name:'ES',exact:true}).click();
  await page.setViewportSize({width:390,height:844});
  await page.locator('form').screenshot({path:path.join(out,'landing-contact-mobile-es.png')});
  const landingOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  if(landingOverflow||frontendWireframeOverflow||landingWireframeOverflow||errors.length)throw new Error('Capture checks failed: '+JSON.stringify({landingOverflow,frontendWireframeOverflow,landingWireframeOverflow,errors}));
  const result={date:new Date().toISOString(),desktop:'1180×1000',mobile:'390×844',assets:'5 desktop and 5 mobile frontend wireframes, 4 landing wireframes, local landing mobile contact',landingOverflow,frontendWireframeOverflow,landingWireframeOverflow,pageErrors:errors,temporaryServerStopped:!!server};
  await fs.writeFile(path.join(out,'design-execution.json'),JSON.stringify(result,null,2)+'\n');
  console.log(JSON.stringify(result));
 }finally{if(browser)await browser.close();if(server)server.kill();}
})().catch(error=>{console.error(error);process.exitCode=1;});
