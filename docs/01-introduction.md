# Capítulo I: Introducción

## 1.1 Startup Profile

### 1.1.1 Descripción de la startup
Nuestra startup desarrolla una plataforma web de gestión financiera orientada a la administración centralizada de compras, deudas y préstamos para pequeñas y medianas empresas (mypes). La solución está diseñada para adaptarse a diversos rubros comerciales, tales como tiendas de electrónica, dulcerías, comercializadoras de telas y tiendas de ropa.

La plataforma permite a los dueños de negocios y administradores llevar un control exacto de su flujo de caja saliente, ofreciendo un panel principal (Dashboard) que consolida la deuda total, el volumen de compras registradas, el estado de facturas (pendientes, vencidas o a tiempo) y el total abonado. 

El núcleo del sistema facilita el registro detallado de nuevas compras (proveedor, fechas límite, moneda local o extranjera, abonos iniciales y comprobantes físicos digitalizados), el seguimiento del historial de pagos mediante la carga de vouchers, y la gestión integral de préstamos bancarios o a terceros con sus respectivos cronogramas de cuotas. Adicionalmente, el sistema permite la exportación de reportes filtrados en formatos PDF y Excel para facilitar la conciliación contable.

Misión
Desarrollar una herramienta de gestión financiera intuitiva y accesible que permita a los comercios de múltiples rubros mantener un control riguroso y transparente sobre sus cuentas por pagar, historial de compras y préstamos, optimizando su toma de decisiones.

Visión
Consolidarnos como la plataforma estándar de control de pasivos para mypes en la región, eliminando la dependencia de métodos de registro manuales o dispersos y garantizando una gestión de deuda eficiente y libre de penalidades por retrasos.

### 1.1.2 Perfiles de integrantes del equipo

A continuación se presenta la ficha de cada integrante del equipo, indicando su código de estudiante y un resumen de sus responsabilidades y perfil técnico para el desarrollo de la aplicación.[cite: 2]

| Integrante | Código | Perfil y responsabilidades |
| :--- | :--- | :--- |
| **Juan Manuel Santos Torres** | u20221a371 | Estudiante de Ingeniería de Software. Encargado del desarrollo de interfaces web y arquitectura frontend (React). Aporta visión comercial y enfoque de producto gracias a su experiencia práctica en la gestión operativa de negocios de electrónica. |
| **Sebastián Gutarra Velapatiño** | u20241A314 ||
| **Azabache Bregante Christopher** | u20231b188 |  |
| **Miguel Angel Egocheaga Suyo** | u202215188 |  |

## 1.2 Solution Profile[cite: 2]

La plataforma es una solución web de control de deudas y compras desarrollada para negocios que requieren verificar, registrar y analizar sus obligaciones financieras y el estado de sus pagos a proveedores y entidades bancarias.

### 1.2.1 Antecedentes y problemática

Los negocios minoristas y mayoristas (como tiendas de electrónica, textiles o abarrotes) necesitan mantener un inventario constante, lo que implica compras frecuentes a crédito con diversos proveedores. 
Actualmente, muchos de estos negocios gestionan sus cuentas por pagar y préstamos utilizando cuadernos físicos, hojas de cálculo no estandarizadas o simplemente confiando en la memoria. Esta descentralización genera un severo descontrol: se extravían comprobantes de abonos, se vencen las fechas límite de las facturas (generando penalidades o ruptura de relaciones comerciales) y existe un desconocimiento de la deuda real consolidada en un momento dado.

**Análisis 5W2H**[cite: 2]

| Pregunta | Descripción |
| :--- | :--- |
| **What** - ¿Cuál es el problema? | Los dueños de negocios carecen de un sistema centralizado para registrar, visualizar y gestionar eficientemente sus compras a crédito, abonos parciales, deudas totales y cronogramas de préstamos. |
| **When** - ¿Cuándo ocurre? | Al momento de realizar nuevas compras, registrar adelantos de pago, solicitar créditos bancarios y al intentar cuadrar cuentas a fin de mes. |
| **Where** - ¿Dónde ocurre?| En la administración financiera diaria del negocio y en la interacción de pago con proveedores y bancos. |
| **Who** - ¿Quiénes están involucrados? | Dueños de negocios (electrónica, textiles, dulcerías, etc.), administradores, contadores y proveedores. |
| **Why** - ¿Por qué representa un problema? | Porque la informalidad en el registro provoca pérdida de comprobantes de pago, vencimiento de facturas, sobreendeudamiento y falta de claridad sobre el flujo de caja saliente. |
| **How** - ¿Cómo se presenta el problema? | Mediante facturas vencidas no identificadas a tiempo, historiales de pago incompletos por comprobantes extraviados, y dificultad para calcular el interés y cuotas de préstamos adquiridos. |
| **How much** - ¿Cuál es su impacto?| Impacta negativamente en la liquidez del negocio, genera gastos adicionales por morosidad y reduce el tiempo útil del administrador al tener que conciliar deudas manualmente. |

### 1.2.2 Lean UX Process

#### 1.2.2.1 Lean UX Problem Statements
Los negocios de venta de productos necesitan controlar de manera precisa las deudas generadas por compras a proveedores y préstamos. Los procesos actuales basados en apuntes físicos o información dispersa dificultan conocer rápidamente el estado de las facturas, los montos exactos adeudados por proveedor y los comprobantes de los abonos ya realizados.

Nuestra solución busca abordar esta situación mediante una plataforma web que centralice el registro de compras (en soles o dólares), permita adjuntar comprobantes digitales, calcule cronogramas de préstamos y ofrezca reportes exportables. Nuestro enfoque inicial estará dirigido a dueños de mypes y administradores financieros.

#### 1.2.2.2 Lean UX Assumptions

**Business Outcomes**
* Creemos que los negocios necesitan mejorar el control preventivo de sus fechas de pago a proveedores.
* Creemos que centralizar las imágenes de los comprobantes de pago reducirá las disputas por cobros indebidos.
* Creemos que la plataforma disminuirá el porcentaje de facturas vencidas mediante una visualización clara del estado de la deuda.

**User Outcomes**
* Creemos que los dueños de negocio desean visualizar su deuda total consolidada en un Dashboard intuitivo (separado por moneda).
* Creemos que los usuarios necesitan poder registrar compras con abonos iniciales y agregar pagos parciales con su respectiva fecha y comprobante.
* Creemos que los administradores necesitan filtrar deudas por proveedor y exportar reportes en PDF y Excel para la contabilidad mensual.

**Features**
* Dashboard interactivo con métricas de deuda total, registro de compras y facturas vencidas/pendientes.
* Módulo de registro de compras con soporte bimonetario (Soles/Dólares) y carga de imágenes.
* Panel flotante para el registro de abonos y consulta del historial de pagos por compra.
* Sección de gestión de préstamos bancarios con cálculo automático de cuotas e intereses.
* Generador de reportes con filtros por fecha, proveedor y moneda, exportable a Excel/PDF.

#### 1.2.2.3 Lean UX Hypothesis Statements

* **Hypothesis Statement 1 - Dashboard de Deudas:** Creemos que lograremos reducir el índice de facturas vencidas si los administradores logran visualizar de inmediato su deuda total, el número de compras y los días restantes para el pago mediante un panel central consolidado.
* **Hypothesis Statement 2 - Registro de Abonos:** Creemos que lograremos mejorar la transparencia financiera si los usuarios pueden registrar abonos individuales adjuntando imágenes de los vouchers, consolidando así el historial de pagos de cada compra en un solo lugar.
* **Hypothesis Statement 3 - Control de Préstamos:** Creemos que lograremos mejorar la gestión de liquidez de los negocios si los dueños logran registrar los préstamos (ya sean otorgados o recibidos), configurando la tasa de interés, la frecuencia y número de cuotas para previsualizar el cronograma de pagos.
* **Hypothesis Statement 4 - Exportación y Reportes:** Creemos que lograremos facilitar el trabajo contable si los usuarios logran filtrar sus deudas por rangos de fecha y proveedor, y exportar estos reportes consolidados en formato PDF o Excel.

#### 1.2.2.4 Lean UX Canvas
Agregar el Lean UX Canvas en `assets/research/lean-ux-canvas.png` y enlazarlo cuando esté disponible.

## 1.3 Segmentos objetivo

| Segmento | Características | Necesidades principales |
|---|---|---|
| [Segmento 1] | [Características] | [Necesidades] |
