"""Create the ungraded TB1 performance form with python-docx."""
from pathlib import Path
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'deliverables/tb1'
NAME = 'upc-pre-202620-1asi0730-16127-creditor-performance-tb1'
MEMBERS = [
 ('Juan Manuel Santos Torres', 'u20221a371', [
  'AV1: problemática, Lean UX y segmentos. Evidencia histórica del capítulo 00.',
  'AV1: planificación Sprint 1, protocolo e inspección de validación.',
  'TB1: revisión de objetivo, hipótesis y LACX propuesta. Actividad aún no confirmada.']),
 ('Sebastián Gutarra Velapatiño', 'u20241a314', [
  'AV1: identidad visual, Style Guidelines y bocetos de landing/aplicación.',
  'AV1: actualización de registro de entrevistas e imágenes de personas.',
  'TB1: revisión visual y traslado del prototipo a Figma propuestos. Actividad aún no confirmada.']),
 ('Miguel Angel Egocheaga Suyo', 'u202215188', [
  'TB1: correcciones de informe, investigación, requisitos, diagramas y SQL; features y commits personales.',
  'TB1: landing corregida y primera frontend local US-004–007. Pruebas de dominio, navegador y build.',
  'TB1: Sprint 2 documental, capturas y paquete de entrega local. No publicación ni deployment.']),
]

def shade(cell, color):
 node=OxmlElement('w:shd');node.set(qn('w:fill'),color);cell._tc.get_or_add_tcPr().append(node)

def build():
 OUT.mkdir(parents=True,exist_ok=True)
 doc=Document();sec=doc.sections[0]
 sec.page_width=Inches(11.69);sec.page_height=Inches(8.27)
 sec.top_margin=sec.bottom_margin=Inches(.65);sec.left_margin=sec.right_margin=Inches(.65)
 for style in ['Normal','Title','Heading 1','Heading 2']:
  doc.styles[style].font.name='Arial';doc.styles[style].font.color.rgb=RGBColor(0,0,0)
 doc.styles['Normal'].font.size=Pt(10)
 doc.styles['Normal'].paragraph_format.space_after=Pt(6)
 doc.styles['Title'].font.size=Pt(24)
 doc.styles['Title'].base_style=doc.styles['Normal']
 for border in doc.styles.element.xpath('.//w:pBdr'):
  border.getparent().remove(border)
 footer=sec.footer.paragraphs[0];footer.text='CREDITOR  TB1  Evaluación pendiente del Team Leader   '
 field=OxmlElement('w:fldSimple');field.set(qn('w:instr'),'PAGE');footer._p.append(field)
 for index,(name,code,items) in enumerate(MEMBERS,1):
  if index>1:doc.add_page_break()
  doc.add_paragraph('Informe de participación TB1',style='Title')
  doc.add_paragraph('Startup y producto: CREDITOR     Entrega: TB1     Curso: 1ASI0730     NRC: 16127     Periodo: 202620')
  doc.add_paragraph('Team Leader: ____________________________________     Fecha de evaluación: __________________')
  doc.add_paragraph('Este formato reúne responsabilidades respaldadas por el historial y tareas propuestas. El líder debe confirmar el cumplimiento, explicar su evaluación y asignar una calificación de 20, 16, 13, 07 o 00. No se ha emitido una calificación ni se presume trabajo realizado sin evidencia.')
  doc.add_paragraph(f'{index}  {name}  {code}',style='Heading 1')
  table=doc.add_table(rows=1,cols=6);table.alignment=WD_TABLE_ALIGNMENT.CENTER;table.autofit=False
  widths=[4.55,1.05,1.10,1.10,1.00,1.05]
  for column,width in zip(table.columns,widths):column.width=Inches(width)
  headers=['Responsabilidad y evidencia','A tiempo','A destiempo','Parcialmente','No cumplió','Nota\n20 / 16 / 13\n07 / 00']
  for cell,width,text in zip(table.rows[0].cells,widths,headers):
   cell.width=Inches(width);cell.text=text;shade(cell,'1E3A5F')
   for run in cell.paragraphs[0].runs:run.font.color.rgb=RGBColor(255,255,255);run.bold=True
  for n,item in enumerate(items):
   cells=table.add_row().cells
   for cell,width,text in zip(cells,widths,[item,'(  )','(  )','(  )','(  )','________']):
    cell.width=Inches(width);cell.text=text
    if n%2==0:shade(cell,'F2F5F9')
  for row in table.rows:
   for col,cell in enumerate(row.cells):
    cell.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
    props=cell._tc.get_or_add_tcPr();borders=OxmlElement('w:tcBorders')
    for edge in ['top','left','bottom','right']:
     node=OxmlElement('w:'+edge);node.set(qn('w:val'),'single');node.set(qn('w:sz'),'4');node.set(qn('w:color'),'D9D9D9');borders.append(node)
    props.append(borders)
    margins=OxmlElement('w:tcMar')
    for edge in ['top','left','bottom','right']:
     node=OxmlElement('w:'+edge);node.set(qn('w:w'),'100');node.set(qn('w:type'),'dxa');margins.append(node)
    props.append(margins)
    for para in cell.paragraphs:
     para.paragraph_format.space_after=Pt(5);para.paragraph_format.space_before=Pt(5)
     if col>0:para.alignment=1
     for run in para.runs:run.font.size=Pt(10)
  doc.add_paragraph('Sustento y observaciones del líder',style='Heading 2')
  doc.add_paragraph('__________________________________________________________________________________________________\n__________________________________________________________________________________________________\n__________________________________________________________________________________________________')
  doc.add_paragraph('Calificación final del integrante: __________     Firma o conformidad del Team Leader: __________________')
  doc.add_paragraph('Fuentes: capítulo 00 y docs/tb1/commits-locales.md del report. Corte técnico 03/10/2026. Los nuevos commits locales se atribuyen a Miguel. Marcar cumplimiento requiere acuerdos, plazos y evidencia real del equipo.')
 doc.core_properties.title='Informe de participación TB1 CREDITOR'
 doc.core_properties.author='Miguel Angel Egocheaga Suyo'
 doc.save(OUT/(NAME+'.docx'))
 print(str(OUT/(NAME+'.docx')))

if __name__=='__main__':build()
