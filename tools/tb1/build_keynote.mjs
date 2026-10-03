import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {fileURLToPath,pathToFileURL} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const modules=process.env.CODEX_NODE_MODULES||path.join(os.homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules');
process.env.RUNTIME_NODE_MODULES=modules;
const runtime=path.resolve(modules,'../..');
const python=path.join(runtime,'python/python.exe');
const skill=process.env.PRESENTATIONS_SKILL_DIR||path.join(os.homedir(),'.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations');
const {Presentation,PresentationFile}=await import(pathToFileURL(path.join(modules,'@oai/artifact-tool/dist/artifact_tool.mjs')).href);
const {finalizePresentation}=await import(pathToFileURL(path.join(skill,'container_tools/artifact_tool_utils.mjs')).href);
const build=path.join(root,'.tb1-build/keynote');await fs.mkdir(build,{recursive:true});
const out=path.join(root,'.tb1-build/validated-keynote',`final-${Date.now()}.pptx`);
await fs.mkdir(path.dirname(out),{recursive:true});
const receipt=path.join(build,`validation-${Date.now()}.json`);
const delivered=path.join(root,'deliverables/tb1/upc-pre-202620-1asi0730-16127-creditor-keynote-tb1.pptx');
const p=Presentation.create({slideSize:{width:1280,height:720}});
const blue='#1D4ED8',ink='#17243B',gray='#52617A';
function text(slide,value,x,y,w,h,size=24,bold=false,color=ink){
 const shape=slide.shapes.add({geometry:'textbox',position:{left:x,top:y,width:w,height:h},fill:'none',line:{fill:'none',width:0}});
 shape.text=value;shape.text.style={typeface:'Arial',fontSize:size,bold,color,autoFit:'none'};return shape;
}
function slide(title,notes='',section='TB1'){
 const s=p.slides.add();s.background.fill='#FFFFFF';
 text(s,section.toUpperCase(),60,28,1100,25,15,true,blue);
 text(s,title,60,73,1160,74,43,true);
 text(s,'CREDITOR   Preparación local   03/10/2026',60,672,1070,22,14,false,gray);
 text(s,String(p.slides.items.length),1180,672,50,22,14,false,gray);
 s.speakerNotes.textFrame.setText(notes);return s;
}
async function photo(s,file,x,y,w,h){const data=await fs.readFile(path.join(root,file));s.images.add({blob:new Uint8Array(data),contentType:/\.jpe?g$/i.test(file)?'image/jpeg':'image/png',alt:path.basename(file),fit:'contain',position:{left:x,top:y,width:w,height:h}});}
function table(s,values,widths,y=190,h=360,size=23){
 const t=s.tables.add({rows:values.length,columns:values[0].length,left:60,top:y,width:1160,height:h,columnWidths:widths,values});
 t.borders.assign({style:'solid',fill:'#D2DBE7',width:1});
 for(let r=0;r<values.length;r++)for(let c=0;c<values[0].length;c++){
  const cell=t.getCell(r,c);cell.fill=r===0?'#163B77':r%2?'#FFFFFF':'#F3F6FA';
  cell.text.style={typeface:'Arial',fontSize:size,bold:r===0,color:r===0?'#FFFFFF':ink,autoFit:'none'};
 }return t;
}
function box(s,label,x,y,w,h){const sh=s.shapes.add({geometry:'rect',position:{left:x,top:y,width:w,height:h},fill:'#F3F6FA',line:{fill:'#7C91AD',width:1.5}});sh.text=label;sh.text.style={typeface:'Arial',fontSize:23,color:ink,autoFit:'none'};return sh;}
function connect(s,a,b,dashed=false,from='right',to='left'){return s.shapes.connect(a,b,{kind:'elbow',fromSide:from,toSide:to,line:{style:dashed?'dashed':'solid',fill:blue,width:2},head:{type:'none'},tail:{type:'triangle',width:'sm',length:'sm'}});}

let s=slide('CREDITOR','Introducción total 1 minuto para diapositivas 1–3. Fuente README y capítulos 00/01. Preparación local sin publicación.','Aplicaciones Web');
text(s,'TB1 Stage Review',60,220,650,90,58,true,blue);
text(s,'Cuentas por pagar para mypes',60,340,660,65,31);
text(s,'Grupo 2\n1ASI0730   NRC 16127\nPeriodo 202620',60,460,620,130,24,false,gray);
await photo(s,'assets/branding/creditorlogo.jpg',815,230,360,270);

s=slide('Equipo','Fuente docs/01-introduction.md y fotos existentes del report. Reparto de exposición propuesto, no registro de una sesión.','Introducción');
const people=[['Juan Manuel\nSantos Torres','u20221a371','assets/research/foto-juan.jpeg'],['Sebastián Gutarra\nVelapatiño','u20241a314','assets/research/20240110_181602.jpg'],['Miguel Angel\nEgocheaga Suyo','u202215188','assets/research/foto-miguel.jpg']];
for(let i=0;i<3;i++){await photo(s,people[i][2],80+i*410,177,300,270);text(s,people[i][0],80+i*410,465,350,85,28,true);text(s,people[i][1],80+i*410,560,350,35,23,false,gray);}

s=slide('Problema y segmentos','Fuente capítulo I. Fragmentación de información como hipótesis, aún no hallazgo empírico. Juan presenta introducción.','Introducción');
text(s,'La mype debe pagar a sus proveedores',60,185,1130,55,32,true,blue);
text(s,'Hipótesis de problema\nCompras, comprobantes y abonos dispersos pueden dificultar reconstruir el saldo y revisar vencimientos.',60,280,530,200,27);
text(s,'S1  Propietarios\nRevisan obligaciones y priorizan pagos.\n\nS2  Administradores de finanzas\nRegistran compras y verifican movimientos.',690,265,520,270,27);
text(s,'CREDITOR centraliza compra, abonos y saldo por moneda.',60,575,1130,65,28,true);

s=slide('Lean UX y metas propuestas','Correcciones AV1 máximo 3 minutos para diapositivas 4–11. Fuente capítulo I H-01…H-05. Metas propuestas, ninguna medida todavía.','Correcciones AV1');
table(s,[['Hipótesis','Capacidad por comprobar'],['H-01','Dashboard para localizar saldo y vencimiento'],['H-02','Compra a crédito con datos suficientes'],['H-03','Abono e historial para reconstruir saldo'],['H-04 / H-05','Préstamos y reportes en Sprint 3']],[260,900],185,330,25);
text(s,'Prueba propuesta: 4 de 5 participantes localizan saldo y vencimiento sin ayuda en dos minutos antes del cierre de Sprint 3.',60,555,1150,80,25);

s=slide('Análisis competitivo','Fuentes oficiales consultadas03/10/2026: https://www.alegra.com/peru/contabilidad/precios/ https://www.odoo.com/es/pricing https://www.zoho.com/us/books/pricing/ . Detalle/FODA/canales en capítulo II. Monedas y ediciones no son equivalentes.','Correcciones AV1');
table(s,[['Alternativa','Precio de referencia','Alcance de comparación'],['Alegra Perú','S/ 105 al mes\nEmprendedor','IGV incluido, límites según plan'],['Odoo Standard','USD 24.90 por usuario/mes','Anual primer año, región por confirmar'],['Zoho Books US','USD 50 mensual\nProfessional','Organización, 5 usuarios, edición US'],['CREDITOR','Sin precio comercial definido','Propuesta acotada a cuentas por pagar']],[300,400,460],190,390,23);
text(s,'Los precios identifican alternativas. No representan cotizaciones equivalentes para Perú.',60,600,1160,45,23,false,gray);

s=slide('Investigación y límites','Fuente capítulo II. YouTube enlaces existentes S1-01Ka9AmFZM3Js S1-02sIYtHGlNyWI S1-03NuDAKMMTmaY S2-01AkhgaNd8Few. No se inventan citas ni conclusiones de relatos no analizados.','Correcciones AV1');
table(s,[['Segmento','Registros existentes','Avance siguiente'],['S1  Propietarios','3 entrevistas registradas','Codificar relatos con cita y minuto'],['S2  Administración','1 entrevista registrada','Completar al menos 2 entrevistas'],['Personas y mapas','Propuestas locales corregidas','Validar rasgos y sincronizar UXPressia']],[320,350,490],190,340,24);
text(s,'Se retiraron cifras y rasgos sin sustento de los artefactos actuales. Las imágenes históricas quedan como referencias de AV1.',60,555,1150,75,25);

s=slide('Personas y objetivos de uso','Fuente capítulo II, Personas locales provisionales Rosa/Diego. Los rasgos representan supuestos, no tamaño de mercado ni hallazgos validados.','Correcciones AV1');
text(s,'Rosa  Propietaria provisional',60,200,540,50,30,true,blue);
text(s,'Objetivo\nConocer saldo y vencimiento por proveedor.\n\nRecorrido\nDashboard, lista y detalle con historial.',60,280,540,280,27);
text(s,'Diego  Administrador provisional',690,200,530,50,30,true,blue);
text(s,'Objetivo\nRegistrar una obligación y su abono.\n\nRecorrido\nCompra, revisión, detalle, abono y saldo.',690,280,530,280,27);
text(s,'Journey y Empathy Maps deben contrastarse con entrevistas.',60,605,1150,40,23,false,gray);

s=slide('Requisitos de Sprint 2','Fuente capítulo III. Story points propuestos, no velocity observada. Reglas de dominio implementadas en frontend local.','Correcciones AV1');
table(s,[['Historia','Objetivo','SP'],['US-004','Consultar obligaciones por moneda/proveedor',8],['US-005','Registrar compra a crédito',8],['US-006','Registrar abono sin superar saldo',5],['US-007','Revisar historial y composición del saldo',5],['Total propuesto','Incremento de demostración local',26]],[260,780,120],185,370,24);
text(s,'Compras/abonos positivos. PEN y USD separados. Campos y fechas válidos. Datos conservados ante error.',60,590,1150,55,25);

s=slide('Arquitectura de la implementación','Fuentes assets/architecture/c4-containers.mmd y c4-web-components.mmd. Diagramas editables, código actual en creditor-web-app. Backend y DB previstos AV2.','Correcciones AV1');
const ui=box(s,'Frontend Vue\nPrimeVue Material',60,215,300,130),adapter=box(s,'Adaptador local\nReglas del dominio',490,215,300,130),storage=box(s,'Browser storage\nDatos ficticios',920,215,300,130);
connect(s,ui,adapter);connect(s,adapter,storage);
const api=box(s,'API ASP.NET Core\nPrevista para AV2',490,450,300,125),db=box(s,'PostgreSQL\nModelo propuesto',920,450,300,125);
connect(s,ui,api,true,'bottom','left');connect(s,api,db,true);
text(s,'TB1  Demostración local',60,170,1160,35,23,true,blue);
text(s,'No hay autenticación ni persistencia multiusuario de servidor.',60,613,1150,35,23,false,gray);

s=slide('Base de datos de compras y abonos','Fuente database/schema.sql y ERD AccountsPayable. Diagrama editable del contexto. UUID, FK compuesta proveedor/organización, importes positivos, referencia única por proveedor. No DB desplegada. Loan/LoanInstallments se conservan en modelo completo con frecuencia MONTHLY, cardinalidad0..*.','Correcciones AV1');
const business=box(s,'BUSINESSES\nid PK\nname',60,190,275,145),supplier=box(s,'SUPPLIERS\nid PK\nbusiness_id FK\nname',440,190,330,175),purchase=box(s,'PURCHASES\nid PK, supplier_id FK\nbusiness_id FK\ntotal_amount, currency\npurchased_on, due_date',440,440,330,195),payment=box(s,'PAYMENTS\nid PK, purchase_id FK\namount, paid_on\nvoucher_url',895,440,315,185);
connect(s,business,supplier);connect(s,supplier,purchase,false,'bottom','top');connect(s,purchase,payment);
text(s,'1 a 0..*',340,220,95,35,18);text(s,'1 a 0..*',650,385,130,35,18);text(s,'1 a 0..*',790,485,100,35,18);
text(s,'Saldo derivado = total de compra − suma de abonos',60,370,330,105,24,true,blue);
text(s,'La API futura debe asegurar autorización y registro atómico del abono.',60,545,330,90,23,false,gray);

s=slide('Sprint 2 y evidencia','Fuente docs/sprints/sprint-02.md. Planning/LACX son preparación propuesta, no acta. 26SP y43h estimadas, no horas reales. Ocho apartados exigidos pp22–27.','Correcciones AV1');
text(s,'5.2.2.1  Planning y objetivo\n5.2.2.2  Líderes y colaboradores\n5.2.2.3  Backlog de tareas\n5.2.2.4  Commits de desarrollo',60,200,545,310,27);
text(s,'5.2.2.5  Ejecución y capturas\n5.2.2.6  Contratos de servicios\n5.2.2.7  Estado de deployment\n5.2.2.8  Colaboración del equipo',690,200,530,310,27);
text(s,'Preparación técnica reproducible. Acuerdos, tablero externo y aceptación pendientes del equipo.',60,550,1140,85,27,true,blue);

s=slide('Nueva landing CREDITOR','Comienza bloque demo 5 minutos (diapositivas12–18). Mostrar también navegador en vivo. Fuentes captura local assets/ux/tb1 y landingdevelop. CTA propietario dashboard, administrador nueva compra.','Demostración');
await photo(s,'assets/ux/tb1/landing-desktop-en.png',60,180,880,450);
text(s,'Propuesta de cuentas por pagar\n\nCTA por segmento\n\nInglés y español\n\nContacto demo y legales',965,185,250,390,25);

s=slide('Dashboard de obligaciones','Mostrar aplicativo local/#/dashboard y totales separados. Captura de datos ficticios. US004.','Demostración');
await photo(s,'assets/ux/tb1/frontend-dashboard-en.png',60,180,900,450);
text(s,'US-004\n\nSaldo por moneda\n\nPróximos vencimientos\n\nAcceso al detalle',980,195,230,380,25);

s=slide('Registro de compra','US005. Demo en vivo: proveedorDistribuidoraNorte, referencia nueva, importe100PEN, descripción yfechas. Revisarconfirmación. Source frontend-purchase-new-en.png.','Demostración');
await photo(s,'assets/ux/tb1/frontend-purchase-new-en.png',60,180,900,450);
text(s,'US-005\n\nProveedor\nImporte y moneda\nReferencia y fechas\n\nRevisión antes de guardar',980,195,230,390,25);

s=slide('Saldo e historial después del abono','Demo compra100PEN/abono30PEN/saldo70PEN. Captura auténtica ejecuciónlocal03/10. US006/007.','Demostración');
await photo(s,'assets/ux/tb1/frontend-balance-es.png',60,180,900,275);
await photo(s,'assets/ux/tb1/frontend-history-es.png',60,475,900,160);
text(s,'PEN 100.00\nCompra\n\nPEN 30.00\nAbono\n\nPEN 70.00\nSaldo pendiente',980,190,230,435,27,true,blue);

s=slide('Rechazo de sobreabono','Demo: compra ficticia100PEN, abono30PEN, saldo70PEN. Intentar abonar71PEN conserva el saldo y el historial. Captura local del formulario y prueba E2E del mismo escenario.','Demostración');
await photo(s,'assets/ux/tb1/frontend-payment-error-form.png',60,180,770,455);
text(s,'US-006\n\nEl abono no supera el saldo\n\nConserva el importe\n\nFoco en el campo\n\nHistorial sin cambios',875,190,340,415,26);

s=slide('Móvil y traducción','Capturas390×844. Prueba overflowfalse. Cambiar idioma no conviertePENenUSD. CSSresponsiveycontextodemofijo.','Demostración');
await photo(s,'assets/ux/tb1/frontend-mobile-es.png',65,175,235,450);
await photo(s,'assets/ux/tb1/landing-mobile-es.png',360,175,235,450);
text(s,'Inglés por defecto\nEspañol latinoamericano\n\nLa operación conserva su moneda\n\nFormularios con etiquetas y errores asociados',675,200,520,340,28);

s=slide('Contacto de demostración','Contacto validalocalmenteyborraentradas. MensajeauténticoNothingwas sentor saved. Source landing-contact-demo.png. Sinservicioexterno definido.','Demostración');
await photo(s,'assets/ux/tb1/landing-contact-demo.png',70,175,575,455);
text(s,'La confirmación explica el alcance\n\nNo envía email\nNo guarda datos de contacto\n\nTérminos y privacidad accesibles',725,220,480,330,28);

s=slide('Verificación técnica','Fuentes tests en repos código y docs/tb1/evidencia-local.md. 14 unit frontend +2E2E y12landing. Buildsnuevoincrementopasaron. No equivalen aceptaciónusuarios. Bloque colaboración3min slides19–22.','Colaboración');
table(s,[['Producto','Resultados locales','Límite'],['Landing','12 pruebas y build','Sin nuevo deployment'],['Frontend','14 pruebas de dominio\n2 pruebas de navegador y build','Adaptador local, sin API propia'],['Report','Fuentes, enlaces y exportaciones','Evidencia humana aún pendiente']],[300,520,340],190,340,24);
text(s,'Compra y abono, moneda, proveedor, fechas, adjuntos y errores de almacenamiento.',60,565,1130,75,27);

s=slide('Aportes y revisión del equipo','Fuente capítulos00históricoSept18yTB1Oct03. No afirmar nuevoscommitsJuan/Seb. NuevapreparaciónpersonalMiguel. RegistrosGitlocales.','Colaboración');
table(s,[['Integrante','Base histórica AV1','Preparación TB1'],['Juan Manuel','Producto, Lean UX, planning y validación','Revisión propuesta, por confirmar'],['Sebastián','Marca, bocetos y registros de entrevistas','Revisión visual propuesta, por confirmar'],['Miguel Angel','Requisitos, arquitectura e integración','Commits locales, implementación, pruebas y paquete']],[250,455,455],190,345,24);
text(s,'Los nuevos commits conservan la identidad personal de Miguel. No se reconstruyen reuniones, horas ni aprobaciones.',60,575,1150,70,25);

s=slide('GitFlow local','FuenteCONTRIBUTING e historial local. Mainestablepreservado, developintegraciónfeatures--no-ff, refsretenidos. Reintegración main reportprevia. Sinreleaseestablede TB1 sinaceptación.','Colaboración');
text(s,'main\nEntrega estable preservada',60,205,450,110,30,true);
text(s,'develop\nIntegración local revisable',690,205,520,110,30,true,blue);
text(s,'feature/<tema>\nCambios lógicos y commits personales\nMerges locales con --no-ff\nFeatures conservadas para revisión',60,380,1130,205,28);
text(s,'Sin push, PR remoto ni nuevo deployment.',60,607,1140,40,27,true,blue);

s=slide('Pendientes para la entrega académica','FuentechecklistTB1 y enunciado31–32/37–39. Userexcluyódeploylocalprep. Próximospasosequipo sininventarfechahorario.','Colaboración');
text(s,'Investigación\nDos entrevistas S2 y análisis con citas/minutos\n\nEquipo\nPlanning, LACX, tablero, aceptación y desempeño',60,195,555,300,27);
text(s,'Diseño y publicación\nUXPressia, Figma y herramienta de flujos\nDeployment de landing y frontend autorizado\n\nExposición\nGrabación real MP4 y enlace privado Stream',690,195,525,345,27);
text(s,'Paquete local listo para revisión. El líder completa la evaluación antes de entrega.',60,575,1140,65,27,true,blue);

const candidate=path.join(build,'candidate.pptx');await (await PresentationFile.exportPptx(p)).save(candidate);
await finalizePresentation({workspaceDir:root,candidatePath:candidate,finalPath:out,pythonExecutable:python,integrityValidatorPath:path.join(skill,'container_tools/inspect_presentation_package_integrity.py'),layoutValidatorPath:path.join(skill,'container_tools/inspect_presentation_layout_geometry.py'),layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-heading-fit',...[4,5,6,8,19,20].flatMap(n=>['--require-native-table-slide',String(n)])],requiredNativeTableOwnerSlides:[4,5,6,8,19,20],tableArithmeticContracts:[{slide:8,table:1,label_column:0,total_row:5,value_columns:[2],component_rows:[1,2,3,4]}],fontPolicy:{basis:'design',families:['Arial']},verifyArtifactToolImport:true,receiptPath:receipt});
for(let i=0;i<p.slides.items.length;i++){
 const blob=await p.export({slide:p.slides.items[i],format:'png',scale:1});
 await fs.writeFile(path.join(build,`slide-${String(i+1).padStart(2,'0')}.png`),new Uint8Array(await blob.arrayBuffer()));
}
await fs.copyFile(out,delivered);
await fs.copyFile(receipt,path.join(build,'validation.json'));
console.log(`${p.slides.items.length} slides: ${delivered}`);
process.exit(0);
