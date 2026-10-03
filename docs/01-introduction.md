# Capítulo I: Introducción

## 1.1 Startup Profile

### 1.1.1 Descripción de la startup

CREDITOR es una propuesta de plataforma web para mypes que necesitan organizar sus compras a crédito, cuentas por pagar, abonos parciales, comprobantes y préstamos. Busca reunir en un mismo espacio la información que normalmente se distribuye entre cuadernos, hojas de cálculo, mensajes y archivos, para facilitar la consulta de saldos y vencimientos.

La propuesta contempla un panel de deuda consolidada, registro de compras con proveedor, moneda, fecha límite y comprobante; registro de abonos con voucher; seguimiento de préstamos; y reportes filtrables. Estas capacidades son hipótesis de producto y no deben confundirse con funciones ya validadas o implementadas.

**Misión.** Desarrollar una herramienta clara y accesible que ayude a las mypes a mantener un control transparente de sus obligaciones financieras.

**Visión.** Ser una alternativa de apoyo para la gestión diaria de cuentas por pagar de las mypes de la región.

### 1.1.2 Perfiles de integrantes del equipo

Los tres perfiles y fotografías existentes se conservan. El equipo debe confirmar las descripciones y el uso de las fotografías antes de exportar la entrega; la presencia del archivo no acredita esa confirmación.

| Integrante | Código | Perfil y responsabilidad propuesta | Fotografía existente |
|---|---|---|---|
| Juan Manuel Santos Torres | u20221a371 | Estudiante de Ingeniería de Software. Aporta perspectiva de producto e interfaces web a partir de su experiencia en la operación de negocios comerciales. |<img src="../assets/research/foto-juan.jpeg" alt="Juan Manuel Santos Torres, integrante" width="150">|
| Sebastián Gutarra Velapatiño | u20241A314 | Estudiante de Ingeniería de Software. Aportaré con mis conocimientos en frontend para esta primera entrega. Mi responsabilidad fue el capítulo 4 Product Design | <img src="../assets/research/20240110_181602.jpg" alt="Sebastián perfil de integrante" width="150">
| Miguel Angel Egocheaga Suyo | u202215188 | Estudiante de Ingeniería de Software. Organiza avances locales de documentación y landing mediante GitFlow; sus aportes finales se contrastarán con el historial publicado. | <img src="../assets/research/foto-miguel.jpg" alt="Miguel Angel Egocheaga Suyo, integrante" width="150"> |

## 1.2 Solution Profile

### 1.2.1 Antecedentes y problemática

Las mypes comerciales compran bienes a proveedores y pueden recibir préstamos para su operación. CREDITOR aborda la gestión de **cuentas por pagar del negocio**: registrar una compra a crédito, conservar su comprobante, aplicar abonos y consultar el saldo y vencimiento. Los préstamos representan obligaciones del negocio; el producto no se presenta como plataforma de créditos a clientes o cobranzas.

La información fragmentada entre cuadernos, hojas de cálculo, mensajes y documentos es una **hipótesis inicial**, no un hallazgo demostrado. Hay cuatro registros de entrevista incorporados al informe (tres S1 y uno S2); sus resúmenes y análisis todavía requieren evidencia de contenido. No se atribuyen ahorros, morosidad o intención de compra a esos participantes sin analizar sus respuestas.

#### Análisis 5W2H

| Pregunta | Descripción y estado de evidencia |
|---|---|
| **What** | Posible dificultad para reconstruir compras a crédito, abonos y obligaciones pendientes. Hipótesis por contrastar. |
| **When** | Al registrar una compra, pagar parcialmente, revisar vencimientos o conciliar con el proveedor. Momentos propuestos para el guion. |
| **Where** | Administración cotidiana de una mype comercial peruana; distrito y condiciones concretas se registran por participante. |
| **Who** | S1 dueños de negocio y S2 administradores o encargados de finanzas que participan en compras o pagos. |
| **Why** | Fuentes separadas podrían aumentar el esfuerzo para conocer el saldo vigente o recuperar un comprobante. |
| **How** | Se investigarán los medios realmente usados; no se presupone que todos trabajen manualmente. |
| **How much** | No existe medición del costo del problema. Se recogerán pasos, tiempos relatados y consecuencias, indicando muestra y fuente. |

**Objetivo de la propuesta:** permitir que el negocio conserve la relación proveedor–compra–abono y revise obligaciones por moneda. **Alcance local TB1:** dashboard, registro de compras, registro de abonos e historial (US-004 a US-007), mediante una aplicación Vue/PrimeVue y un adaptador local de demostración. Los datos de ejemplo no son datos de entrevistas ni registros operativos. **Iteraciones posteriores:** préstamos y reportes (US-008/009), API propia ASP.NET Core/EF Core, integración externa y persistencia PostgreSQL. La primera Web Services desplegada corresponde a AV2; TB1 requiere la primera Frontend Web Application. En esta ejecución se preparan y comprueban artefactos localmente; no se declara despliegue nuevo.

La solución no suma PEN y USD como si fueran una moneda, no procesa transferencias bancarias y no sustituye contabilidad o asesoría financiera. La demostración de roles/organizaciones en el navegador no equivale a autenticación o aislamiento de seguridad en producción.

### 1.2.2 Lean UX Process

#### 1.2.2.1 Lean UX Problem Statement

**Brand New Initiative.** La gestión de obligaciones de las mypes comerciales puede distribuirse entre registros contables, hojas de cálculo, mensajes y comprobantes. El análisis documental identifica productos que ya ofrecen facturas, abonos y reportes; por ello la brecha propuesta no es la ausencia de esas funciones. La brecha por verificar es si dueños y administradores necesitan una experiencia más acotada a reconstruir rápidamente una compra, sus pagos y su saldo, con el vocabulario y condiciones de su operación.

CREDITOR abordará esa brecha con un recorrido continuo de cuentas por pagar: proveedor, compra, comprobante, abonos, saldo y vencimiento por moneda. El enfoque inicial abarca S1, dueños que revisan obligaciones, y S2, administradores que registran o concilian operaciones. Se considerará una señal inicial de valor si, en un piloto autorizado de 30 días con cinco negocios, al menos cuatro pueden localizar saldo y vencimiento sin ayuda y al menos tres realizan una revisión semanal durante tres semanas. Son **metas propuestas**, no resultados; el reclutamiento, la línea base, el consentimiento y el protocolo se acuerdan antes del piloto.

#### 1.2.2.2 Lean UX Assumptions

Los IDs permiten rastrear las creencias hasta hipótesis, preguntas e historias. Ningún supuesto se presenta como conclusión de las entrevistas.

| Tipo | ID | Creencia por contrastar |
|---|---|---|
| Business Assumption | B-01 | Un alcance centrado en cuentas por pagar puede aportar valor aunque existan suites contables más amplias. |
| Business Assumption | B-02 | Un eventual modelo de suscripción debe cubrir soporte, almacenamiento seguro y operación; precio y disposición de pago no están definidos. |
| Business Assumption | B-03 | Un piloto con pocas compras puede reducir el esfuerzo inicial de adopción; no se exige migrar toda la contabilidad. |
| Business Outcome Assumption | BO-01 | Una consulta de obligaciones clara podría favorecer una revisión semanal recurrente. |
| Business Outcome Assumption | BO-02 | La trazabilidad compra–abono–comprobante podría favorecer que el negocio conserve sus registros en una sola herramienta. |
| Business Outcome Assumption | BO-03 | Los reportes y préstamos podrían contribuir a la continuidad de uso únicamente si aparecen como necesidades relevantes en la investigación. |
| User Assumption | U-01 | S1 interviene en decisiones de compra, endeudamiento o priorización de pagos. |
| User Assumption | U-02 | S2 interviene en el registro, ejecución o conciliación de operaciones. |
| User Assumption | U-03 | Una persona puede realizar ambas responsabilidades; los segmentos no representan poblaciones demográficas mutuamente excluyentes. |
| User Outcome & Benefit Assumption | UB-01 | Los usuarios quieren conocer el saldo y el vencimiento sin reconstruir información en varias fuentes. |
| User Outcome & Benefit Assumption | UB-02 | El registro de campos mínimos y comprobantes podría facilitar una compra rastreable. |
| User Outcome & Benefit Assumption | UB-03 | Un historial de abonos podría facilitar la verificación del saldo. |
| User Outcome & Benefit Assumption | UB-04 | Cuando se usan préstamos, un cronograma podría aclarar próximos compromisos. |
| User Outcome & Benefit Assumption | UB-05 | Cuando se preparan revisiones contables, filtros y exportación podrían reducir búsquedas repetidas. |
| Feature Assumption | F-01 | Un dashboard con saldos separados por PEN/USD y vencimientos facilitaría revisar obligaciones. |
| Feature Assumption | F-02 | Un formulario de compra con proveedor, importe, moneda, vencimiento y comprobante facilitaría conservar la obligación. |
| Feature Assumption | F-03 | Un historial de abonos con fecha, importe y voucher permitiría reconstruir el saldo. |
| Feature Assumption | F-04 | Un módulo de préstamos con frecuencia y cronograma permitiría consultar otras obligaciones cuando el segmento las utilice. |
| Feature Assumption | F-05 | Un reporte filtrable por fecha, proveedor y moneda facilitaría preparar una revisión. |

#### 1.2.2.3 Lean UX Hypothesis Statements

| ID | Hipótesis | Supuestos y alcance |
|---|---|---|
| **H-01** | Creemos que lograremos una revisión recurrente de obligaciones si Rosa (S1) y Diego (S2) obtienen visibilidad de saldos y vencimientos mediante un dashboard por moneda. | BO-01, UB-01, F-01; US-004; TB1 local. |
| **H-02** | Creemos que lograremos registros más completos si Diego (S2) obtiene trazabilidad de la compra mediante un formulario estructurado y un comprobante asociado. | BO-02, UB-02, F-02; US-005; TB1 local. |
| **H-03** | Creemos que lograremos una verificación más sencilla del saldo si Rosa (S1) y Diego (S2) obtienen una secuencia de movimientos mediante un historial de abonos y vouchers asociados. | BO-02, UB-03, F-03; US-006/007; TB1 local. |
| **H-04** | Creemos que lograremos continuidad de uso cuando haya préstamos si Rosa (S1) obtiene claridad de próximos compromisos mediante frecuencia y cronograma de cuotas. | BO-03, UB-04, F-04; US-009; futura iteración. |
| **H-05** | Creemos que lograremos continuidad de uso en revisiones financieras si Diego (S2) obtiene información seleccionada mediante reportes filtrados y exportables. | BO-03, UB-05, F-05; US-008; futura iteración. |

Existe una hipótesis por cada Feature Assumption. La investigación cualitativa inicial contrasta pertinencia, tareas y lenguaje; los resultados de uso requieren una evaluación posterior. Rosa y Diego son Personas provisionales, sin demografía ni conducta atribuida a entrevistados.

#### 1.2.2.4 Lean UX Canvas

El Canvas local actualizado usa los cinco IDs anteriores y distingue hipótesis, riesgos y experimentos propuestos. Es una representación declarativa local; no acredita una sesión con usuarios ni una exportación de UXPressia.

![Lean UX Canvas local provisional de CREDITOR](../assets/research/tb1/lean-ux-canvas-local.svg)

La imagen histórica `assets/research/lean-ux-canvas.jpg` se conserva en el repositorio para trazabilidad, pero no constituye el Canvas vigente de TB1.

## 1.3 Segmentos objetivo

Los segmentos se distinguen por responsabilidades, no por tamaño de mercado inventado. El criterio de inclusión es participación reciente en tareas de compras o pagos. Edad exacta, distrito, dispositivos, browser y canales se documentan con permiso y evidencia de cada participante; no se trasladan datos ficticios a las Personas.

| Segmento | Perfil operativo y demográfico de inclusión | Necesidad por contrastar | Criterio verificable |
|---|---|---|---|
| **S1. Dueños de mypes comerciales** | Persona adulta que dirige un negocio comercial y decide o supervisa compras, endeudamiento o pagos. Localidad y demás características por registrar. | Consultar obligaciones y decidir qué revisar o autorizar. | Participó en una compra a crédito, pago a proveedor o préstamo del negocio durante los últimos tres meses. |
| **S2. Administradores o encargados de finanzas** | Persona adulta que registra compras, prepara pagos, concilia saldos o conserva comprobantes en una mype. Localidad y demás características por registrar. | Registrar operaciones, recuperar comprobantes y preparar información financiera. | Realizó una tarea directa de registro, pago o conciliación durante los últimos tres meses. |

### Contexto estadístico y límites de la fuente secundaria

El informe oficial **Las Mipyme en cifras 2024** de PRODUCE/OGEIEE, Cuadro A1, registra **2 331 173 Mipyme formales** en Perú frente a **2 346 592 empresas formales** (fuente SUNAT–RUC 2024). Este universo incluye micro, pequeñas **y medianas** empresas; no es el tamaño del mercado de CREDITOR ni cuenta a dueños y administradores como personas. La cifra contextualiza la selección de negocios pequeños; no estima qué proporción usa créditos, tiene dificultades de pago o adoptaría la aplicación. Fuente consultada el 03/10/2026: [publicación oficial](https://www.producempresarial.pe/las-mipyme-en-cifras-2024/) y [informe, Cuadro A1](https://www.producempresarial.pe/wp-content/uploads/2025/11/La-Mipyme-en-Cifras-2024_.pdf).

| Segmento | Tarea a investigar | Funcionalidad propuesta | Riesgo abierto |
|---|---|---|---|
| S1 | Revisar obligaciones y decidir prioridades. | Dashboard e historial TB1; cronograma futuro. | Que la tarea se delegue o no sea recurrente. |
| S2 | Registrar y verificar operaciones. | Compra y abono TB1; reportes futuros. | Que otra herramienta sea obligatoria y la solución duplique trabajo. |

Pendiente de evidencia: caracterización demográfica de los participantes y análisis de su experiencia. No se publican porcentajes poblacionales de S1/S2 ni cifras de demanda a partir de una muestra cualitativa.
