import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {execFileSync} from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const modules = process.env.CODEX_NODE_MODULES || path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
process.env.RUNTIME_NODE_MODULES = modules;
const python = path.resolve(modules, '../../python/python.exe');
const skill = process.env.PRESENTATIONS_SKILL_DIR || path.join(os.homedir(), '.codex/plugins/cache/openai-primary-runtime/presentations/26.930.11008/skills/presentations');
const {Presentation, PresentationFile, FileBlob} = await import(pathToFileURL(path.join(modules, '@oai/artifact-tool/dist/artifact_tool.mjs')).href);
const {finalizePresentation} = await import(pathToFileURL(path.join(skill, 'container_tools/artifact_tool_utils.mjs')).href);
const build = path.join(root, '.tb1-build/keynote-expanded');
await fs.mkdir(build, {recursive: true});
const stamp = Date.now();
const final = path.join(root, '.tb1-build/validated-expanded', `final-${stamp}.pptx`);
await fs.mkdir(path.dirname(final), {recursive: true});
const script = await fs.readFile(path.join(root, 'docs/tb1/guion-ppt-detallado.md'), 'utf8');
const brief = await fs.readFile(path.join(root, 'docs/tb1/prompt-crear-ppt.md'), 'utf8');
const durations = [15,30,35,25,30,30,20,20,30,20,30,30,25,25,30,35,25,35,40,35,35,90,80,120,50,135,90,95,50,50,50,50,60,60,45,25];
const shortRoute = [1,2,3,4,6,9,12,16,19,21,22,23,24,25,26,27,28,29,30,32,33,36];
const shortDurations = [20,20,20,20,25,25,25,25,30,30,45,35,50,20,60,50,40,35,35,35,55,20];
const shortSpeakers = ['Juan','Juan','Juan','Sebastián','Sebastián','Sebastián','Sebastián','Sebastián','Sebastián','Sebastián','Miguel','Miguel','Miguel','Miguel','Miguel','Miguel','Miguel','Juan','Sebastián','Sebastián','Los tres: Juan 20 s, Sebastián 20 s, Miguel 15 s','Juan'];
const p = Presentation.create({slideSize: {width: 1280, height: 720}});
const blue = '#2563EB', ink = '#111827', gray = '#52617A', pale = '#E8EFFF';
const nativeTables = new Set();
const titles = [], links = {}, pdfLinks = [];
let shapeNumber = 0;
const mmss = seconds => `${Math.floor(seconds / 60).toString().padStart(2,'0')}:${(seconds % 60).toString().padStart(2,'0')}`;

function text(s, value, x, y, w, h, size = 30, bold = false, color = ink, name) {
  const shape = s.shapes.add({geometry: 'textbox', name: name || `text-${++shapeNumber}`, position: {left:x, top:y, width:w, height:h}, fill:'none', line:{fill:'none', width:0}});
  shape.text = value;
  shape.text.style = {typeface:'Arial', fontSize:size, bold, color, autoFit:'none', verticalAlignment:'top'};
  return shape;
}
function section(md, n, prefix) {
  const label = String(n).padStart(2,'0');
  return md.match(new RegExp(`^${prefix} ${label}\\. [\\s\\S]*?(?=^${prefix} \\d{2}\\.|^## |$(?![\\s\\S]))`, 'm'))?.[0] || '';
}
function notes(n, reference, extra = '') {
  const video = n <= 36 ? section(script, n, '###') : 'Consulta fuera del recorrido de video. Expositor: quien responda la pregunta. Duración variable, sin añadir al objetivo de 27:30.';
  const shortIndex = shortRoute.indexOf(n);
  const shortLine = script.split('\n').filter(line => new RegExp(`^\\| 0?${n} \\|`).test(line)).join('\n');
  const start = shortIndex < 0 ? 0 : shortDurations.slice(0,shortIndex).reduce((a,b)=>a+b,0);
  if(shortIndex >= 0 && !shortLine) throw new Error(`Missing short script for slide ${n}`);
  const short = shortIndex < 0 ? 'No incluida en la ruta de 12 minutos; disponible para consulta.' : `${shortSpeakers[shortIndex]} · ${mmss(start)}–${mmss(start+shortDurations[shortIndex])}; ${shortDurations[shortIndex]} segundos.\n${shortLine}`;
  return `GUION VIDEO\n${video}\n\nGUION CLASE\n${short}\n\nFUENTE / LÍMITE DE EVIDENCIA\n${reference}\nBase: ${root}; informe al corte del 03/10/2026.\n${section(brief,n,'####')}\n${extra}`;
}
function slide(title, reference, state = '', extra = '') {
  const s = p.slides.add(), n = p.slides.items.length;
  s.background.fill = '#FFFFFF';
  titles.push(title);
  text(s,'CREDITOR  ·  TB1',56,23,500,24,17,true,blue);
  if(state) text(s,state,765,23,459,25,17,true,gray);
  text(s,title,56,67,1168,94,46,true);
  text(s,reference,56,682,1100,22,16,false,gray);
  text(s,String(n).padStart(2,'0'),1183,680,50,24,17,true,gray);
  s.speakerNotes.textFrame.setText(notes(n,reference,extra));
  return s;
}
async function photo(s,file,x,y,w,h) {
  const data = await fs.readFile(path.join(root,file));
  s.images.add({blob:new Uint8Array(data), contentType:/\.jpe?g$/i.test(file)?'image/jpeg':file.endsWith('.svg')?'image/svg+xml':'image/png', alt:path.basename(file), fit:'contain', position:{left:x, top:y, width:w, height:h}});
}
function table(s, values, widths, y = 180, h = 390, size = 27, x = 56) {
  nativeTables.add(p.slides.items.length);
  const t = s.tables.add({rows:values.length, columns:values[0].length, left:x, top:y, width:widths.reduce((a,b)=>a+b,0), height:h, columnWidths:widths, values});
  t.borders.assign({style:'solid',fill:'#D2DBE7',width:1});
  for(let r=0;r<values.length;r++) for(let c=0;c<values[0].length;c++) {
    const cell=t.getCell(r,c); cell.fill=r===0?'#163B77':r%2?'#FFFFFF':'#F3F6FA';
    cell.text.style={typeface:'Arial',fontSize:size,bold:r===0,color:r===0?'#FFFFFF':ink,autoFit:'none'};
  }
  return t;
}
function box(s,label,x,y,w,h,size=29,future=false,name) {
  const sh=s.shapes.add({geometry:'rect',name:name||`diagram-${++shapeNumber}`,position:{left:x,top:y,width:w,height:h},fill:future?'#F3F6FA':pale,line:{fill:future?'#7C91AD':blue,width:1.5,style:future?'dashed':'solid'}});
  sh.text=label; sh.text.style={typeface:'Arial',fontSize:size,color:ink,autoFit:'none',verticalAlignment:'middle'};
  return sh;
}
function connect(s,a,b,future=false,from='right',to='left') {
  s.shapes.connect(a,b,{kind:'elbow',fromSide:from,toSide:to,line:{style:future?'dashed':'solid',fill:blue,width:2},head:{type:'none'},tail:{type:'triangle',width:'sm',length:'sm'}});
}
function bullets(s,items,x=56,y=190,w=1168,size=32,gap=90) {
  items.forEach((item,i)=>text(s,item,x,y+i*gap,w,gap-12,size));
}
function link(s,label,file,x,y,w,h,size=28,name) {
  const sh=text(s,label,x,y,w,h,size,true,blue,name);
  const url=pathToFileURL(path.join(root,file)).href;
  links[sh.name || name] = url;
  pdfLinks.push({slide:p.slides.items.length,url,rect:[x,y,w,h]});
}

let s=slide('CREDITOR: TB1 Stage Review','00 Información del proyecto · 1ASI0730 · NRC 16127');
text(s,'Compras, abonos y\nsaldos por moneda',56,207,690,155,49,true,blue);
text(s,'Universidad Peruana de Ciencias Aplicadas\nIngeniería de Software · Grupo 2\nPeriodo 202620 · Semana 7',56,400,720,145,29);
text(s,'Docente: Villafuerte Bazan, Oscar Ivan',56,570,750,55,27,false,gray);
await photo(s,'assets/branding/creditorlogo.jpg',850,215,350,350);

s=slide('Equipo y recorrido de la exposición','1.1.2 Perfiles del equipo · 00.4 Aportes', '', 'Confirmar el uso de fotografías antes de publicar. El reparto es una propuesta de exposición, no atribución automática de autoría.');
const people=[['Juan Manuel\nSantos Torres','u20221a371','Problema e investigación','assets/research/foto-juan.jpeg'],['Sebastián Gutarra\nVelapatiño','u20241a314','Requisitos y diseño','assets/research/20240110_181602.jpg'],['Miguel Angel\nEgocheaga Suyo','u202215188','Demo y verificación','assets/research/foto-miguel.jpg']];
for(let i=0;i<3;i++) {
  const x=56+i*402;
  await photo(s,people[i][3],x+30,169,310,245);
  text(s,people[i][0],x,427,370,90,30,true);
  text(s,people[i][1],x,528,370,32,25,false,gray);
  text(s,'Ingeniería de Software',x,570,380,36,24);
  text(s,people[i][2],x,616,380,36,25,true,blue);
}

s=slide('Problema, solución y alcance','1.2.1 Antecedentes y problemática · 1.3 Segmentos','Hipótesis de problema');
text(s,'Reconstruir una obligación desde datos dispersos\npuede dificultar conocer saldo y vencimiento.',56,173,1168,100,33);
const steps=['Proveedor','Compra','Abono','Saldo'];
const flow=steps.map((label,i)=>box(s,label,56+i*307,311,246,92,32));
for(let i=0;i<3;i++) connect(s,flow[i],flow[i+1]);
text(s,'TB1 local\nS1 revisa; S2 registra y concilia.\nDashboard, compra, abono e historial.',56,452,555,170,30);
text(s,'Iteración futura\nReportes y préstamos.\nAPI y persistencia de servidor.',699,452,525,170,30);

s=slide('Mejoras posteriores a AV1','docs/tb1/feedback-resolution.md','Corrección local / evidencia abierta');
table(s,[['Observación','Cambio preparado','Estado'],['Benchmark y trazabilidad','Fuentes y cadena de evidencia','Local; análisis pendiente'],['Móvil y caminos alternativos','Wireframes + 17 caminos','Diseño local'],['Tareas y presentación','Siete tareas de 4–8 h; report','Preparado para revisión'],['Investigación y publicación','Controles y límites explícitos','Aún pendiente']],[350,490,328],185,397,26);
text(s,'Una corrección documental requiere evidencia para cerrar el criterio.',56,612,1168,43,29,true,blue);

s=slide('5W2H y Problem Statement','1.2.1 · 1.2.2.1 Lean UX Problem Statements','Experimento propuesto');
table(s,[['5W2H','Síntesis del contexto'],['Qué / quién','Reconstruir obligaciones; propietarios y administradores'],['Cuándo / dónde','Compra, pago y revisión; fuentes del negocio'],['Por qué / cómo','Explorar encaje de un recorrido compra–abono–saldo'],['Cuánto','Sin línea base medida']],[300,868],178,300,28);
text(s,'Mercado con soluciones existentes → oportunidad de encaje\nUsuarios S1/S2 → señal de éxito por comprobar',56,500,1168,90,29,true,blue);
text(s,'Piloto: 5 negocios / 30 días; 4 localizan saldo; 3 revisan\nsemanalmente durante 3 semanas. Aún no ejecutado.',56,603,1168,68,27);

s=slide('Supuestos e hipótesis de producto','1.2.2.2 Assumptions · 1.2.2.3 Hypothesis Statements','Hipótesis');
text(s,'Resultado de negocio → usuario → beneficio → función',56,173,1168,50,32,true,blue);
table(s,[['Hipótesis','Función y beneficio propuestos','Historias'],['H-01','Dashboard para revisar obligaciones','US-004'],['H-02','Compra y comprobante para registro completo','US-005'],['H-03','Historial para verificar composición del saldo','US-006/007'],['H-04 / H-05','Préstamos / reportes en iteración futura','US-009/008']],[190,750,228],247,335,27);
text(s,'Las metas orientan qué medir; no acreditan beneficios logrados.',56,612,1168,42,29);

s=slide('Lean UX Canvas: decisiones e incertidumbre','1.2.2.4 · assets/research/tb1/lean-ux-canvas-local.svg','Canvas local provisional');
table(s,[['Decisión','Contenido que orienta el incremento'],['Problema','Posible dificultad para reconstruir obligaciones'],['Usuarios','S1 consulta y prioriza; S2 registra y concilia'],['Beneficio / solución','Saldo explicable mediante compra, abono e historial'],['Incertidumbre prioritaria','Contrastar necesidad, encaje y uso recurrente']],[340,828],185,385,29);
text(s,'El Canvas se ajustará con entrevistas y evaluación de uso.',56,606,1168,47,31,true,blue);

s=slide('Segmentos: decidir y registrar','1.3 Segmentos objetivo','Responsabilidades; pueden coincidir');
text(s,'S1 · Propietarios',56,183,555,50,35,true,blue);
text(s,'Revisan compromisos.\nPriorizan pagos.\nDeciden sobre compras.',56,260,555,180,34);
text(s,'Riesgo: la tarea puede estar delegada.',56,473,555,95,29,false,gray);
text(s,'S2 · Administración',699,183,525,50,35,true,blue);
text(s,'Registran obligaciones.\nVerifican comprobantes.\nConcilian movimientos.',699,260,525,180,34);
text(s,'Riesgo: duplicar una herramienta actual.',699,473,525,95,29,false,gray);
text(s,'Inclusión: participación directa reciente en compras o pagos.',56,607,1168,47,30,true);

s=slide('Benchmark: capacidades existentes','2.1.1 Competitive Analysis Landscape · Fuentes oficiales del informe','Revisión documental');
await photo(s,'assets/research/tb1/competitor-alegra.png',390,165,160,65);
await photo(s,'assets/research/tb1/competitor-odoo.png',680,165,160,65);
await photo(s,'assets/research/tb1/competitor-zoho.svg',970,165,160,65);
table(s,[['Dimensión','Alegra','Odoo 19.0','Zoho Books US'],['Compras / proveedores','Obligaciones y fechas','Facturas y condiciones','Facturas y vencimientos'],['Abonos / comprobantes','Abonos; adjunto por\nabono no verificado','Pagos parciales;\nPDF en facturas','Pagos parciales;\nadjuntos y notas'],['Consulta / reportes','Cuentas por pagar','Antigüedad de deuda','Saldos por proveedor'],['Amplitud / encaje','Contabilidad Perú','Suite modular','Gestión contable US']],[290,290,290,298],243,338,24);
text(s,'CREDITOR explora el encaje de compra–abono–saldo.\n«No verificado» no significa ausencia de una función.',56,604,1168,64,28,true,blue);

s=slide('Estrategia y tácticas por contrastar','2.1.1 FODA · 2.1.2 Estrategias y tácticas','Sin ventaja comercial demostrada');
text(s,'Especialización en obligaciones',56,183,1168,55,36,true,blue);
text(s,'Registro guiado → trazabilidad de abonos → adopción gradual',56,256,1168,80,31);
table(s,[['FODA','Lectura para decidir'],['Fortaleza / oportunidad','Foco acotado; piloto con pocas operaciones'],['Debilidad / amenaza','Investigación y API pendientes; alternativas existentes']],[340,828],353,220,27);
text(s,'Táctica propuesta: demostrar una compra con sus pagos\ny observar el esfuerzo de consulta y cambio de herramienta.',56,602,1168,68,29);

s=slide('Entrevistas: preguntas basadas en hechos','2.2.1 Diseño de entrevistas','Meta mínima: 3 S1 + 3 S2');
text(s,'Explorar un episodio reciente antes de presentar la solución.',56,174,1168,80,33,true,blue);
text(s,'¿Qué datos necesita cuando falta el comprobante\nde una compra?',56,278,1168,110,35);
text(s,'¿Cómo maneja una operación duplicada\no un importe incorrecto?',56,414,1168,110,35);
text(s,'H-02 → A-01/A-02 → campos y excepciones → US-005',56,593,1168,60,30,true,blue);

s=slide('Registros y cadena de evidencia','2.2.2 Registro · 2.2.3 Análisis de entrevistas','Investigación pendiente');
table(s,[['Segmento','Registros','Meta mínima','Falta'],['S1 · Propietarios',3,3,'Análisis verificable'],['S2 · Administración',1,3,'2 registros + análisis']],[398,185,205,380],181,217,30);
text(s,'Participante → pregunta → cita/minuto → variable\n→ necesidad → Persona → historia',56,437,1168,108,32,true,blue);
text(s,'Revisar consentimiento, permiso de video y codificación.\nUn enlace de entrevista no demuestra su contenido.',56,582,1168,82,29);

s=slide('Personas y User Task Matrix','2.3.1 User Personas · 2.3.2 User Task Matrix','Provisional: análisis pendiente');
text(s,'Rosa · propietaria\nLocalizar compromisos y priorizar',56,175,555,115,31,true,blue);
text(s,'Diego · administrador\nRegistrar y conciliar',699,175,525,115,31,true,blue);
table(s,[['Tarea','Rosa / S1','Diego / S2'],['Consultar saldo','Revisar compromisos','Verificar saldo'],['Registrar compra','Decidir / revisar','Registrar obligación'],['Registrar abono','Priorizar / revisar','Registrar movimiento'],['Revisar historial','Comprobar saldo','Conciliar abonos']],[540,314,314],298,315,27);
text(s,'Frecuencia y características por contrastar con entrevistas.',56,633,1168,34,27,false,gray);

s=slide('Journey y Empathy Mapping','2.3.3 User Journey · 2.3.4 Empathy Mapping','Fricciones y emociones hipotéticas');
table(s,[['Momento','Rosa / revisión','Diego / registro'],['Detectar obligación','Consulta compromisos','Recupera datos'],['Registrar / verificar','Contrasta monto y fecha','Conserva compra y comprobante'],['Pagar','Prioriza el vencimiento','Registra abono y evidencia'],['Revisar saldo','Explica lo pendiente','Concilia el historial']],[320,420,428],186,341,28);
text(s,'Empathy: qué necesita entender, qué datos busca\ny dónde podría confundirse. Contrastarlo con relatos reales.',56,567,1168,94,30,true,blue);

s=slide('EventStorming y lenguaje del dominio','2.4 Big Picture EventStorming · 2.5 Ubiquitous Language','Diseño de negocio');
const events=['Compra\nregistrada','Obligación\npendiente','Abono\nregistrado','Saldo\nactualizado'];
const ev=events.map((v,i)=>box(s,v,56+i*306,239,248,114,30));
for(let i=0;i<3;i++)connect(s,ev[i],ev[i+1]);
text(s,'Comando: registrar abono\nEvento: abono registrado\nActor: administrador\nPolítica: abono positivo y hasta el saldo',56,413,620,228,30);
text(s,'Saldo cero → compra saldada\n\nVocabulario compartido:\nproveedor, compra, abono,\nsaldo y vencimiento.',767,413,457,228,30,true,blue);

s=slide('Historias, criterios y reglas observables','3.1 User Stories · R-01–10','Escenario con datos demo');
text(s,'E-02 Accounts Payable → US-004 / US-005\nE-03 Payments → US-006 / US-007',56,172,1168,90,31,true,blue);
table(s,[['Given','When','Then'],['Compra PEN 100;\nsaldo pendiente 100','Registrar abono PEN 30','Un movimiento;\nsaldo PEN 70'],['Compra con saldo\npendiente PEN 70','Intentar abono PEN 71','Rechazo; historial\ny saldo sin cambios']],[395,360,413],293,229,29);
text(s,'Centavos enteros · PEN/USD separados · fechas válidas\nReferencia única por proveedor · abono hasta el saldo',56,579,1168,82,30);

s=slide('Impact Mapping y backlog TB1','3.2 Impact Mapping · 3.3 Product Backlog','Estimación propuesta / To-Review');
table(s,[['Historia','Objetivo','SP'],['US-004','Consultar obligaciones',8],['US-005','Registrar compra',8],['US-006','Registrar abono',5],['US-007','Revisar historial',5],['Total','Frontend local',26]],[190,450,100],185,399,28);
text(s,'Rosa → localizar\ncompromisos\n→ dashboard / detalle',845,205,379,165,31,true,blue);
text(s,'Diego → registrar\ny conciliar\n→ compra / abono',845,410,379,165,31,true,blue);
text(s,'Roadmap: US-008/009 y TS-001–003. SP ≠ horas ejecutadas.',56,625,1168,39,28);

s=slide('Diseño: jerarquía, navegación y responsive','4.1–4.4 Estilos · Information Architecture · Wireframes','Wireframes locales');
await photo(s,'assets/ux/tb1/wireframe-dashboard.png',56,179,620,345);
await photo(s,'assets/ux/tb1/wireframe-dashboard-mobile.png',716,173,200,432);
await photo(s,'assets/ux/tb1/wireframe-purchase-mobile.png',1002,173,200,432);
text(s,'Dashboard desktop',56,548,600,45,27,true);
text(s,'Dashboard',702,616,240,38,26,true);
text(s,'Compra móvil',986,616,238,38,26,true);
text(s,'Saldo y vencimiento primero.\nAcciones, etiquetas y errores claros.',56,597,608,69,26,false,blue);

s=slide('Wireflow: éxito y recuperación','4.4.1 Wireflow · 4.4.3 User Flows · 4.5 Prototyping','17 caminos de diseño; no 17 tests');
const a=box(s,'Formulario de abono',56,231,320,105,30), b=box(s,'Revisión / confirmar',494,231,320,105,30), c=box(s,'Movimiento + saldo',932,231,292,105,29);
connect(s,a,b);connect(s,b,c);
const d=box(s,'Error de validación\nConservar entradas',56,463,320,121,29),e=box(s,'Cancelar confirmación\nVolver al formulario',494,463,320,121,28),f=box(s,'Fallo al guardar\nNo anunciar éxito',932,463,292,121,28);
connect(s,a,d,false,'bottom','top');connect(s,b,e,false,'bottom','top');connect(s,b,f,false,'bottom','top');
text(s,'Compra COMP-01–05 · Abono ABO-01–07 · Consulta CON-01–05',56,622,1168,42,28,true,blue);

s=slide('Arquitectura de dominio y C4','4.6 C4 Context / Containers / Components','Ejecución local / previsto AV2');
text(s,'Visitor · Business Owner · Finance Administrator',56,172,1168,48,30);
const ui=box(s,'Vue / PrimeVue\nVistas y rutas',56,254,300,124,30),store=box(s,'Store / validadores\nAdaptador local',493,254,300,124,28),storage=box(s,'Browser storage\nDatos ficticios',924,254,300,124,29);
connect(s,ui,store);connect(s,store,storage);
const api=box(s,'HTTP / ASP.NET Core\nEF Core · AV2',493,479,300,118,27,true),db=box(s,'PostgreSQL\nPersistencia · AV2',924,479,300,118,29,true);
connect(s,store,api,true,'bottom','top');connect(s,api,db,true);
text(s,'Separar UI, reglas y datos\npermite sustituir\nel adaptador.',56,465,380,153,29,true,blue);
text(s,'Sin autenticación real ni persistencia multiusuario en TB1.',56,640,1168,33,26,false,gray);

s=slide('Clases y datos: compra, abono y saldo','4.7.1 Class Diagram · 4.8.1 Database Diagrams · database/schema.sql','Modelo objetivo; DB no conectada');
const business=box(s,'Business / BUSINESSES\nid PK · name',56,178,310,134,27),supplier=box(s,'Supplier / SUPPLIERS\nid PK · business_id FK\nname',480,178,337,155,26),purchase=box(s,'Purchase / PURCHASES\nid PK · business_id FK\nsupplier_id FK · currency\ntotal_amount · due_date',480,434,337,208,25),payment=box(s,'Payment / PAYMENTS\nid PK · purchase_id FK\namount · paid_on',941,434,283,173,25);
connect(s,business,supplier);connect(s,business,purchase,false,'bottom','left');connect(s,supplier,purchase,false,'bottom','top');connect(s,purchase,payment);
text(s,'1 → 0..*',367,204,116,40,22,true,blue);
text(s,'1 → 0..*',690,358,140,40,22,true,blue);
text(s,'1 → 0..*',820,489,123,40,22,true,blue);
text(s,'Business 1 → 0..* Purchase',56,348,363,71,25,true,blue);
text(s,'Purchase.pendingBalance()\nTotal − suma de abonos\n\nMoneda y fechas propias.\nLoan / LoanInstallment: AV2.',56,475,380,180,25);

s=slide('Demo: landing y acceso por objetivo','4.3 Landing UI · 5.2.2.5 Execution Evidence','Captura local de respaldo');
await photo(s,'assets/ux/tb1/landing-desktop-en.png',56,171,871,457);
text(s,'Propietario\n→ dashboard\n\nAdministrador\n→ nueva compra',960,202,264,245,29,true,blue);
text(s,'CTA elige destino.\nContacto demo: no\nenvía ni guarda.',960,488,264,146,28);

s=slide('Demo: obligaciones, filtros y monedas','US-004 · 5.2.2.5 Execution Evidence','Datos ficticios / ejecución local');
await photo(s,'assets/ux/tb1/frontend-dashboard-en.png',56,171,871,457);
text(s,'PEN y USD\nseparados\n\nVencimientos\n\nFiltros y detalle',960,185,264,311,29,true,blue);
text(s,'Aplicar un filtro;\nrestablecer antes\nde registrar.',960,526,264,132,28);

s=slide('Demo: registrar compra PEN 100.00','US-005 · R-01–06 · 5.2.2.5 Execution Evidence','Ejecución local / compra ficticia');
await photo(s,'assets/ux/tb1/frontend-purchase-new-en.png',56,171,871,457);
text(s,'Proveedor existente\nReferencia nueva\nDescripción\nPEN 100.00\nFechas válidas',956,179,268,288,28);
text(s,'Revisar\ny confirmar',956,501,268,104,34,true,blue);
text(s,'Comprobante opcional; almacenamiento en navegador.',56,639,1168,36,27,false,gray);

s=slide('Demo: composición del saldo inicial','US-007 · R-09 · 5.2.2.5 Execution Evidence','Estado inicial del escenario demo');
text(s,'Después de confirmar la compra; antes del primer abono',56,176,1168,60,32);
table(s,[['Concepto','Importe PEN','Qué comprobar en el detalle'],['Total de compra','100.00','Proveedor y vencimiento'],['Suma de abonos','0.00','Historial sin movimientos'],['Saldo pendiente','100.00','Total − abonos, misma moneda']],[380,275,513],263,263,32);
text(s,'100.00 − 0.00 = PEN 100.00',56,579,1168,63,45,true,blue);

s=slide('Demo: abono PEN 30.00 e historial','US-006/007 · R-07–09 · 5.2.2.5 Execution Evidence','Capturas locales / escenario 100–30–70');
await photo(s,'assets/ux/tb1/frontend-balance-es.png',56,179,897,300);
await photo(s,'assets/ux/tb1/frontend-history-es.png',56,472,897,167);
text(s,'PEN 100.00\nCompra\n\nPEN 30.00\nAbono\n\nPEN 70.00\nSaldo',985,189,239,430,30,true,blue);
text(s,'Recargar y volver al detalle: persiste en este navegador.',56,644,1168,31,26,false,gray);

s=slide('Demo: rechazo de un sobreabono','US-006 · R-07–10 · Evidencia local','Intento PEN 71 frente a saldo 70');
await photo(s,'assets/ux/tb1/frontend-payment-error-form.png',56,178,774,452);
text(s,'Importe conservado\n\nError junto al campo\n\nUn solo movimiento\n\nSaldo PEN 70.00',886,205,338,390,30,true,blue);
text(s,'El fallo no se guarda ni se presenta como éxito.',56,640,1168,36,28);

s=slide('Demo: idioma, móvil y accesibilidad','4.1.2 Web Style · 5.1 Configuration · Evidencia local','Comprobaciones concretas');
await photo(s,'assets/ux/tb1/frontend-mobile-es.png',56,169,237,486);
await photo(s,'assets/ux/tb1/landing-contact-mobile-es.png',363,189,275,425);
text(s,'Inglés por defecto\nEspañol latinoamericano\n\nEl idioma no cambia PEN/USD\n\nEtiquetas, foco y error asociado\nNavegación con teclado',715,201,509,347,30);
text(s,'Auditoría completa pendiente.',715,599,509,62,28,true,blue);

s=slide('Sprint 2: objetivo y ocho apartados','5.2.2 Sprint 2 · docs/sprints/sprint-02.md','Planning y acuerdos propuestos');
text(s,'Consultar saldo/vencimiento y registrar compra/abono\ncon trazabilidad por moneda.',56,172,1168,99,32,true,blue);
bullets(s,['.1  Planning','.2  Leaders / Collaborators','.3  Sprint Backlog','.4  Development Evidence'],56,308,554,29,72);
bullets(s,['.5  Execution Evidence','.6  Services Documentation','.7  Software Deployment','.8  Collaboration Insights'],699,308,525,29,72);
text(s,'Acta, LACX, tablero y aceptación requieren acuerdo real.',56,629,1168,42,28,false,gray);

s=slide('Sprint Backlog: alcance y estimación','5.2.2.3 · US-004–007 = 26 SP · To-Review local','43 horas estimadas propuestas');
table(s,[['Task','Trabajo / relación','h'],['T2-01','Dashboard y filtros · US-004',7],['T2-03','Compra · US-005',8],['T2-05','Abono · US-006',6],['T2-07','Detalle y calidad · US-007',7],['T2-08','Landing · US-001/002/003',6],['T2-11','Report y evidencia',5],['T2-12','Capturas y entrega',4],['Total','Frontend y trabajo complementario',43]],[200,835,133],177,443,27);
text(s,'Cada tarea: 4–8 h. SP y horas no acreditan trabajo ejecutado.',56,639,1168,34,27,true,blue);

s=slide('Resultados técnicos del corte','5.2.2.4–5 · docs/tb1/evidencia-local.md · Corte 03/10/2026','Verificaciones locales');
table(s,[['Producto','Verificación','Resultado documentado'],['Landing','12 pruebas unitarias + build','Aprobado al corte'],['Frontend','14 dominio + 2 navegador + build','Aprobado al corte'],['Escenario E2E','100 → 30 → 70; rechazo de 71','Sin movimiento adicional']],[270,490,408],186,321,29);
text(s,'Importes, moneda, proveedor, fechas, adjuntos y guardado.\nResultados técnicos ≠ aceptación de usuarios o equipo.',56,556,1168,107,31,true,blue);

let gitEvidence='# Evidencia Git local para la exposición\n\nCorte de preparación 04/10/2026, antes de los commits de este PPT.\nLos hashes son evidencia histórica de este corte.\n';
for(const repo of ['upc-project-report','creditor-landing-page','creditor-web-app']) {
  const repoPath=path.join(path.dirname(root),repo);
  const status=execFileSync('git',['-C',repoPath,'status','--short','--branch'],{encoding:'utf8'}).trim();
  const log=execFileSync('git',['-C',repoPath,'log','--branches','--decorate','--oneline','-10'],{encoding:'utf8'}).trim();
  gitEvidence+=`\n## ${repo}\n\nRuta: ${repoPath}\n\n\`\`\`text\n${status}\n${log}\n\`\`\`\n`;
}
s=slide('Configuración y GitFlow local','5.1 Configuration · CONTRIBUTING · Historial Git local','Sin push ni release TB1',`Mostrar el log real del repositorio durante la exposición. Este snapshot no demuestra commits posteriores.\n${gitEvidence}`);
const develop=box(s,'develop\nIntegración',56,214,295,111,31),feature=box(s,'feature/<tema>\nCommits y checks',482,214,319,111,30),merge=box(s,'develop\nmerge --no-ff',932,214,292,111,31);
connect(s,develop,feature);connect(s,feature,merge);
text(s,'main recibe una release revisada después.',56,370,1168,64,35,true,blue);
text(s,'Report · landing · frontend en repositorios separados\nVue / PrimeVue / Vite · API y PostgreSQL previstos AV2\nConventional Commits · SemVer · referencias revisables',56,464,1168,161,29);

s=slide('Aportes y Student Outcome 5','00.4 Aportes · 00 Student Outcome · AUTHORSHIP_ALLOCATION.md','Planificación compartida');
table(s,[['Integrante','Artefactos / trabajo identificable'],['Juan Manuel','Problema y Lean UX; Sprint 1; protocolo histórico'],['Sebastián','Marca y bocetos; registros históricos de entrevistas'],['Miguel Angel','Requisitos y arquitectura; código TB1, checks e integración']],[300,868],183,302,29);
text(s,'El crédito de planificación no mide código ni horas.\nMiguel escribió el código nuevo; el equipo planificó con él.',56,526,1168,95,30,true,blue);
text(s,'Student Outcome 5: acuerdos, liderazgo y revisión por evidenciar.',56,638,1168,33,27,false,gray);

s=slide('Contratos previstos y brecha de deployment','5.2.2.6 Services · 5.2.2.7 Deployment','API / PostgreSQL previstos AV2');
text(s,'GET /api/v1/purchases\nPOST /api/v1/purchases\nPOST /api/v1/purchases/{id}/payments',56,184,1168,145,32,true,blue);
text(s,'Autorización, transacción y concurrencia: trabajo AV2.\nEl adaptador local no responde HTTP.',56,358,1168,100,31);
table(s,[['Build local','Publicación histórica AV1','Nuevo deployment TB1'],['Landing y frontend\ncompiladas','Landing 18/09/2026\nno acredita TB1','Ambos pendientes;\nexigidos para entregar']],[350,395,423],505,139,27);

s=slide('Entregables y acciones para cerrar TB1','docs/09-tb1-delivery-checklist.md · Capítulo VII','Revisión del equipo pendiente');
text(s,'Entregables',56,179,550,50,34,true,blue);
text(s,'Report PDF\nKeynote PPTX / PDF\nPerformance validado por líder\nZIP complementario\nExposición MP4 / Stream',56,255,558,296,30);
text(s,'Acciones abiertas',699,179,525,50,34,true,blue);
text(s,'2 entrevistas S2 + análisis\nFigma / UXPressia / flujos\nPlanning, LACX y aceptación\nDeployment landing y frontend\nEvaluación y grabación real',699,255,525,296,30);
text(s,'About-the-Product / About-the-Team y servicios: AV2.',56,612,1168,50,29,false,gray);

s=slide('Conclusiones y siguiente paso','Capítulo VI · Capítulo VII · Control TB1','Incremento local para revisión');
bullets(s,['Dominio centrado en obligaciones con proveedores.','Recorrido compra–abono–saldo con reglas observables.','Diseño y trazabilidad disponibles; evidencia académica abierta.'],56,199,1168,35,117);
text(s,'Revisar con el equipo y cerrar evidencia / deployment\nantes de declarar la entrega completa.',56,571,1168,99,34,true,blue);

s=slide('Consulta: métricas y protocolos propuestos','1.2.2 Lean UX · 3.2.1 Objetivos SMART','Sin mediciones ejecutadas', 'Mostrar solamente el experimento relacionado con la pregunta. Piloto: cinco negocios, treinta días, cuatro localizan saldo/vencimiento sin ayuda y tres revisan semanalmente durante tres semanas. Prueba moderada antes del cierre de Sprint 3: cinco participantes, cuatro completan consulta sin ayuda dentro de dos minutos. Protocolos y línea base pendientes. H-01: éxito/tiempo/recurrencia, observar consultas y reconsiderar dashboard. H-02: completitud/error de compra, revisar campos. H-03: reconstrucción correcta del saldo e historial, revisar detalle. H-04: comprensión del cronograma, protocolo futuro. H-05: comprensión de exportación, protocolo futuro. Ningún resultado comercial afirmado.');
table(s,[['Experimento','Unidad / momento','Meta propuesta'],['Piloto','5 negocios · 30 días','4 localizan; 3 revisan semanalmente\ndurante 3 semanas'],['Prueba moderada','5 participantes · antes de Sprint 3','4 localizan saldo/vencimiento\nsin ayuda en 2 minutos']],[280,400,488],185,222,27);
text(s,'H-01 consulta / recurrencia · H-02 completitud / errores\nH-03 explicación del saldo · H-04/05 protocolo futuro',56,452,1168,100,30,true,blue);
text(s,'Registrar tareas, tiempos, ayuda, errores y consentimiento.\nDecidir qué ajustar después de medir; línea base pendiente.',56,589,1168,80,29);

s=slide('Consulta: historias y backlog completo','3.1 Historias y criterios · 3.3 Product Backlog · Notas: escenarios completos','Prioridades y SP propuestos', 'GIVEN una organización demo, proveedor de esa organización, referencia nueva, descripción de 3–200 caracteres, importe PEN100.00, fecha válida no futura y vencimiento no anterior, WHEN se revisa y confirma la compra, THEN se conserva la obligación, muestra total100/saldo100 sin abonos y detalle con proveedor, moneda y fechas (R-01–06). GIVEN una compra PEN100.00 y un abono válidoPEN30.00 con saldo70, WHEN se intenta registrarPEN71.00, THEN se rechaza, conserva entradas y muestra error, sin movimiento adicional ni cambio de saldo (R-07–10). TS-001: API proveedores/compras, autorización y errores; TS-002: abonos atómicos y concurrencia; TS-003: OpenAPI coherente con servicio real. Todos To-doSprint3/AV2. Abrir el capítuloIII desde el vínculo visible para revisar títulos, descripciones y criterios completos.');
table(s,[['US','Prior.','SP','Sprint','Estado'],['001','Must',3,'1 / corr.2','To-Review'],['002','Must',5,'1 / corr.2','To-Review demo'],['003','Must',2,'1 / corr.2','To-Review'],['004','Must',8,'2','To-Review'],['005','Must',8,'2','To-Review'],['006','Must',5,'2','To-Review'],['007','Should',5,'2','To-Review'],['008','Should',5,'3','To-do'],['009','Could',8,'3','To-do']],[90,130,60,175,245],171,449,23);
table(s,[['TS','Pri./SP','Sprint','Estado'],['001','Must / 8','3','To-do'],['002','Must / 8','3','To-do'],['003','Should / 3','3','To-do']],[70,140,108,110],178,213,23,796);
text(s,'TS: API, abonos\ny OpenAPI, previstos AV2.\n\nGWT completos\ny reglas en las notas.',800,421,424,160,28);
link(s,'Abrir historias, Technical Stories y criterios completos →','docs/03-requirements-specification.md',56,627,1168,43,28,'backlog-complete');

s=slide('Consulta: abrir diagramas por contexto','4.6 C4 · 4.7 Clases · 4.8 Base de datos · Fuentes editables','Índice de vistas ampliadas', 'Los vínculos de esta diapositiva apuntan a archivos locales reales del report. Requieren conservar la carpeta del repositorio o actualizar las rutas antes de compartir. C4 web refleja implementación local; context/container y componentesAPI incluyen diseño objetivo. El modelo SQLypréstamos son previstos, sin servidorDBconectado. Los .mmd del mismo nombre son fuentes editables; el .png es vista legible para preguntas.');
const diagramLinks=[['C4 Context','assets/architecture/c4-context.png'],['C4 Containers','assets/architecture/c4-containers.png'],['C4 Components web / local','assets/architecture/c4-web-components.png'],['C4 Components API / futuro','assets/architecture/c4-components.png'],['Class Diagram completo','assets/architecture/class-diagram.png'],['ER: cuentas por pagar','assets/architecture/database-accounts-payable.png'],['ER: préstamos / futuro','assets/architecture/database-loans.png'],['ER completo + SQL','assets/architecture/database-er-diagram.png']];
diagramLinks.forEach(([label,file],i)=>link(s,`${label} →`,file,56+(i%2)*643,185+Math.floor(i/2)*105,525,70,30,`diagram-index-${i}`));
link(s,'Abrir schema.sql →','database/schema.sql',56,622,525,48,29,'database-schema');
text(s,'Origen editable: assets/architecture/*.mmd',699,623,525,46,25,false,gray);

s=slide('Consulta: bibliografía y trazabilidad','Capítulo VII · source-register.md · Checklist TB1','Base del corte 03/10/2026', 'Fuentes oficiales del benchmark: Alegra Perú https://www.alegra.com/peru/contabilidad/ y ayuda https://ayuda.alegra.com/int/genera-el-reporte-de-cuentas-por-pagar-en-alegra ; Odoo19vendorbills https://github.com/odoo/documentation/blob/19.0/content/applications/finance/accounting/vendor_bills.rst ; ZohoUS https://www.zoho.com/us/books/help/bills/basic-functions.html y https://www.zoho.com/us/books/help/reports/payables.html . Revisión funcional10/09/2026; ampliación comercial03/10/2026. ContextoPRODUCE: Perú2024 CuadroA1, Mipymeformales, noTAM; referencia en source-register.md. Enunciado UPC local upc-pre-202620-1asi0730-final_project-statement-abet_v1.pdf, pp3–4,29–32,37–39. Retroalimentación del usuario identificada por separado; no se convierte en rúbrica adicional. Notas yguion están en docs/tb1/guion-ppt-detallado.md. No existen aún MP4/Stream nuevos ni aceptación académica documentada.');
bullets(s,['Benchmark: documentación oficial de Alegra, Odoo y Zoho.','Curso: enunciado UPC y retroalimentación identificada.','Proyecto: capítulos I–VII, SQL, Git y evidencia local.','Pendientes: entrevistas, herramientas, acuerdos y videos reales.'],56,181,1168,31,91);
link(s,'Bibliografía y anexos del report →','docs/07-bibliography-appendices.md',56,580,1168,45,29,'bibliography');
link(s,'Registro de fuentes / fecha de corte →','assets/research/tb1/source-register.md',56,631,1168,42,28,'source-register');

if(p.slides.items.length!==40 || durations.reduce((a,b)=>a+b,0)!==1650 || shortDurations.reduce((a,b)=>a+b,0)!==720) throw new Error('Slide count or route duration mismatch');
await fs.writeFile(path.join(build,'links.json'),JSON.stringify(links,null,2));
await fs.writeFile(path.join(build,'pdf-links.json'),JSON.stringify(pdfLinks,null,2));
await fs.writeFile(path.join(build,'git-local-cut.md'),gitEvidence);
await fs.writeFile(path.join(build,'manifest.json'),JSON.stringify({titles,video:{slides:Array.from({length:36},(_,i)=>i+1),seconds:durations,total:1650},class:{slides:shortRoute,seconds:shortDurations,total:720},consultation:[37,38,39,40],sourceCut:'2026-10-03',prepared:'2026-10-04'},null,2));
const draft=path.join(build,'draft.pptx'), candidate=path.join(build,`candidate-${stamp}.pptx`);
await (await PresentationFile.exportPptx(p)).save(draft);
execFileSync(python,[path.join(root,'tools/tb1/prepare_keynote_expanded.py'),'--input',draft,'--output',candidate,'--links',path.join(build,'links.json')],{stdio:'inherit'});
const receipt=path.join(build,`validation-${stamp}.json`);
await finalizePresentation({workspaceDir:root,candidatePath:candidate,finalPath:final,pythonExecutable:python,integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit',...[...nativeTables].flatMap(n=>['--require-native-table-slide',String(n)])],requiredNativeTableOwnerSlides:[...nativeTables],tableArithmeticContracts:[{slide:17,table:1,label_column:0,total_row:5,value_columns:[2],component_rows:[1,2,3,4]},{slide:30,table:1,label_column:0,total_row:8,value_columns:[2],component_rows:[1,2,3,4,5,6,7]}],fontPolicy:{basis:'design',families:['Arial']},verifyArtifactToolImport:true,receiptPath:receipt});
const imported=await PresentationFile.importPptx(await FileBlob.load(final));
for(let i=0;i<imported.slides.items.length;i++) {
  const blob=await imported.export({slide:imported.slides.items[i],format:'png',scale:1});
  await fs.writeFile(path.join(build,`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await blob.arrayBuffer()));
}
await fs.writeFile(path.join(build,'final-path.txt'),final);
await fs.copyFile(receipt,path.join(build,'validation.json'));
console.log(`Validated ${imported.slides.items.length} slides; final candidate: ${final}`);
process.exit(0);
