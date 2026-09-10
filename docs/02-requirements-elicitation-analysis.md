# Capítulo II: Requirements Elicitation & Analysis

## 2.1 Competidores

CREDITOR propone centralizar las compras a crédito, los abonos y los préstamos de las mypes, con énfasis en dueños de negocios y administradores o encargados de finanzas. Para analizar su entorno competitivo se seleccionaron tres soluciones que cubren necesidades similares de control de obligaciones con proveedores: Alegra Contabilidad, Odoo y Zoho Books. La selección responde a la coincidencia funcional con el problema descrito en el capítulo I; no constituye un ranking de participación de mercado.

| ID | Competidor | Descripción general | Propuesta de valor y características relevantes | Canal de acceso y fuente |
|---|---|---|---|---|
| C-01 | Alegra Contabilidad | Software contable y de facturación con una oferta dirigida a pymes en Perú. | Integra facturación, inventario y contabilidad. Su documentación describe la consulta de obligaciones con proveedores y sus vencimientos. | Plataforma web; [oferta para Perú][alegra-peru] y [cuentas por pagar][alegra-cxp]. |
| C-02 | Odoo | Sistema de gestión empresarial cuyo módulo contable incluye facturas de proveedores y préstamos. | Permite registrar pagos parciales, consultar deudas pendientes y gestionar cronogramas de amortización. | Aplicación empresarial; [facturas de proveedores][odoo-facturas] y [préstamos][odoo-prestamos]. |
| C-03 | Zoho Books | Software de gestión contable que incorpora compras, pagos a proveedores y reportes. | Relaciona las facturas con los pagos registrados y permite consultar saldos por proveedor. | Plataforma web; [gestión de facturas][zoho-facturas] y [reportes de obligaciones][zoho-reportes]. |

También se consideran alternativas sustitutas los cuadernos, las hojas de cálculo y el almacenamiento de comprobantes en carpetas o conversaciones. Su uso por los segmentos de CREDITOR es un supuesto del capítulo I que se explorará en las entrevistas; todavía no representa un hallazgo de campo.

### 2.1.1 Análisis competitivo

**Propósito del análisis:** identificar capacidades compartidas, oportunidades de diferenciación y riesgos para una solución centrada en el control cotidiano de deudas de mypes.

**Pregunta guía:** ¿qué valor podría aportar CREDITOR a un dueño o administrador que necesita conocer cuánto debe, cuándo debe pagar y qué abonos ya realizó, frente a las alternativas disponibles?

**Método y alcance:** revisión documental de fuentes oficiales consultadas el 10 de septiembre de 2026. Se analiza Alegra con su oferta peruana y una guía internacional, Odoo con su documentación de la versión 19.0 y Zoho Books con su documentación de la edición estadounidense. Las funciones pueden depender de la edición, configuración o plan; la revisión de Zoho no acredita adecuación tributaria al Perú. No se realizaron pruebas comparativas de uso ni se contrataron planes. Las capacidades de CREDITOR son propuestas del proyecto, todavía no funcionalidades implementadas.

#### Competitive Analysis Landscape

| Dimensión | CREDITOR — propuesta | Alegra Contabilidad | Odoo 19.0 | Zoho Books |
|---|---|---|---|---|
| Enfoque del producto | Control operativo de compras, abonos y préstamos de mypes. | Gestión contable y facturación para pymes. [Fuente][alegra-peru] | Gestión de facturas y préstamos dentro del módulo contable. [Fuentes][odoo-facturas] y [préstamos][odoo-prestamos] | Gestión de compras y pagos integrada al registro contable. [Fuente][zoho-facturas] |
| Registro de compras y vencimientos | Proveedor, importe, moneda, comprobante y fecha límite. | Consulta de facturas de compra, montos adeudados y vencimientos. [Fuente][alegra-cxp] | Facturas con proveedor, fecha y condiciones de pago. [Fuente][odoo-facturas] | Facturas con proveedor, fecha límite y condiciones de pago. [Fuente][zoho-facturas] |
| Abonos e historial | Asociar cada abono con la compra y mostrar el saldo restante. | La guía contempla abonos que afectan los saldos reportados. [Fuente][alegra-cxp] | Pagos parciales y saldo pendiente de la factura. [Fuente][odoo-facturas] | Pagos parciales y consulta de pagos registrados por factura. [Fuente][zoho-facturas] |
| Evidencias digitales | Adjuntar comprobantes de compras y vouchers de abonos. | El vínculo de un archivo con cada abono no se verificó en las fuentes consultadas. | Carga de facturas en PDF; no se verificó aquí el adjunto por abono. [Fuente][odoo-facturas] | Adjuntos y notas en el registro del pago. [Fuente][zoho-facturas] |
| Consulta de deuda | Dashboard con saldos separados en soles y dólares y estado de vencimientos. | Reporte de cuentas por pagar con filtros de consulta. [Fuente][alegra-cxp] | Reporte de antigüedad de deuda con detalle por proveedor. [Fuente][odoo-facturas] | Reporte por proveedor con importes facturados, pagados y saldo. [Fuente][zoho-reportes] |
| Préstamos y cuotas | Registro de préstamos y visualización de cronogramas. | No verificado en las fuentes consultadas. | Cronogramas importados, calculados o registrados manualmente, con capital e intereses. [Fuente][odoo-prestamos] | No verificado en las fuentes consultadas. |
| Salida de información | Reportes filtrados exportables a PDF y Excel. | Descarga de reportes y exportación de facturas de proveedor. [Fuente][alegra-cxp] | Exportación del reporte de deuda a PDF y XLSX. [Fuente][odoo-facturas] | Reporte de saldos con rango de fechas y filtros; formatos de exportación no verificados aquí. [Fuente][zoho-reportes] |

**Criterio de lectura:** “no verificado” identifica una limitación de esta revisión; no significa que el competidor carezca de esa función. Tampoco se atribuye exclusividad a CREDITOR por proponer abonos, adjuntos o cronogramas, ya que existen capacidades equivalentes documentadas.

#### Fortalezas, limitaciones y oportunidades para CREDITOR

Las fortalezas siguientes se apoyan en las capacidades documentadas. Las limitaciones de encaje y las oportunidades son interpretaciones del equipo que deberán contrastarse con usuarios; no son defectos demostrados de los competidores.

| Alternativa | Fortaleza relevante | Limitación de encaje o cuestión por validar | Oportunidad propuesta para CREDITOR |
|---|---|---|---|
| Alegra Contabilidad | Reúne distintas tareas de gestión y ofrece una propuesta para el mercado peruano. | Determinar si el usuario necesita esa amplitud o busca resolver principalmente el seguimiento de sus pagos. | Evaluar una experiencia centrada en las tareas de consultar deuda y registrar abonos. |
| Odoo | Cubre tanto obligaciones con proveedores como cronogramas de préstamos. | Evaluar cuánto acompañamiento requiere el segmento para configurar y utilizar el flujo contable descrito. | Probar un registro guiado que emplee el vocabulario cotidiano del comerciante. |
| Zoho Books | Conecta facturas, pagos y documentos de respaldo. | Comprobar el encaje del flujo y de la edición disponible con la operación concreta del negocio. | Validar una navegación por compra que permita recuperar rápidamente cada voucher y saldo. |
| Registros manuales y hojas de cálculo | Pueden adaptarse a la forma de trabajo que el negocio ya conoce. | Investigar cómo mantienen consistentes los saldos, fechas y comprobantes cuando participan varias personas. | Comprobar si centralizar los registros reduce búsquedas y conciliaciones manuales. |

CREDITOR parte con una propuesta de alcance específico, pero aún debe demostrar utilidad y facilidad de uso. La principal oportunidad planteada es facilitar un flujo continuo de consulta de deuda, registro de abono y recuperación del comprobante. Sus riesgos iniciales son la falta de validación con usuarios, el esfuerzo necesario para mantener los registros al día y la preferencia por herramientas ya adoptadas. No se plantea competir por un precio menor hasta conocer los costos del proyecto y la disposición de pago del segmento.

#### Fuentes del análisis

- Alegra. (s. f.). [Software contable y de facturación para Pymes en Perú][alegra-peru].
- Alegra. (s. f.). [Genera el reporte de cuentas por pagar en Alegra][alegra-cxp]. Guía internacional.
- Odoo. (s. f.). [Vendor bills][odoo-facturas]. Documentación oficial 19.0, archivo fuente.
- Odoo. (s. f.). [Loans management][odoo-prestamos]. Documentación oficial 19.0, archivo fuente.
- Zoho. (s. f.). [Basic Functions in Bills][zoho-facturas]. Ayuda de Zoho Books, edición estadounidense.
- Zoho. (s. f.). [Payables Reports][zoho-reportes]. Ayuda de Zoho Books, edición estadounidense.

Todas las fuentes fueron consultadas el 10 de septiembre de 2026.

[alegra-peru]: https://www.alegra.com/peru/contabilidad/
[alegra-cxp]: https://ayuda.alegra.com/int/genera-el-reporte-de-cuentas-por-pagar-en-alegra
[odoo-facturas]: https://github.com/odoo/documentation/blob/19.0/content/applications/finance/accounting/vendor_bills.rst
[odoo-prestamos]: https://github.com/odoo/documentation/blob/19.0/content/applications/finance/accounting/bank/loans.rst
[zoho-facturas]: https://www.zoho.com/us/books/help/bills/basic-functions.html
[zoho-reportes]: https://www.zoho.com/us/books/help/reports/payables.html

### 2.1.2 Estrategias y tácticas frente a competidores

Las estrategias se plantean a partir del análisis anterior y de las hipótesis del capítulo I. Sus resultados se evaluarán durante la investigación y las pruebas posteriores del prototipo.

| Estrategia | Fundamento | Tácticas propuestas | Evidencia para evaluarla |
|---|---|---|---|
| Especialización en control de obligaciones | Los competidores cubren tareas contables más amplias; debe comprobarse si un flujo acotado aporta valor al segmento. | Priorizar la consulta de saldos y vencimientos, el registro de compras y abonos y el seguimiento de préstamos. Mostrar soles y dólares por separado. | Problemas recurrentes identificados en entrevistas y tareas que los usuarios consideran prioritarias. |
| Facilidad de registro y consulta | La existencia de una función no demuestra que su uso encaje con la rutina del negocio. | Diseñar un formulario guiado con proveedor, fecha, importe, moneda y comprobante; usar términos como compra, abono y saldo pendiente. | En pruebas posteriores: tareas completadas, errores, tiempo empleado y necesidad de ayuda. |
| Trazabilidad de pagos | Recuperar el respaldo de un abono forma parte del problema planteado para CREDITOR. | Vincular cada voucher con su abono y compra; permitir consultar el historial y el saldo desde el mismo contexto. | Casos reales de búsqueda o discrepancia relatados; posteriormente, capacidad de recuperar un comprobante en el prototipo. |
| Adopción gradual | El usuario puede preferir mantener sus herramientas actuales si cambiar implica duplicar trabajo. | Proponer un piloto con pocas compras, orientación inicial y reportes exportables para compartir con el contador. | Barreras de adopción relatadas y continuidad de uso observada durante un futuro piloto. |
| Captación por demostraciones del flujo | El beneficio propuesto debe resultar comprensible para dueños y administradores. | Mostrar en la landing page ejemplos de consulta de deuda y registro de abonos; solicitar comentarios a negocios de los rubros objetivo. | Comprensión de la propuesta e interés en participar en pruebas, diferenciados de una intención de compra. |

## 2.2 Entrevistas

### 2.2.1 Diseño de entrevistas

Definir objetivos, segmentos, criterios de selección y preguntas.

### 2.2.2 Registro de entrevistas

| Entrevistado | Segmento | Fecha | Evidencia | Resumen |
|---|---|---|---|---|
| [Código o nombre autorizado] | [Segmento] | [Fecha] | [Enlace] | [Hallazgos] |

### 2.2.3 Análisis de entrevistas

## 2.3 Needfinding

### 2.3.1 User Personas

### 2.3.2 User Task Matrix

### 2.3.3 User Journey Mapping

### 2.3.4 Empathy Mapping

### 2.3.5 As-Is Scenario Mapping

## 2.4 Big Picture Event Storming

## 2.5 Ubiquitous Language

| Término | Definición | Contexto |
|---|---|---|
| [Término] | [Definición] | [Bounded context] |

