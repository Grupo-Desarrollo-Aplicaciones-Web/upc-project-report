# Capítulo V: Product Implementation, Validation & Deployment

Este capítulo registra la preparación local de TB1 al **3 de octubre de 2026**. El incremento reúne una landing orientada a cuentas por pagar y la primera frontend para consultar obligaciones, registrar compras y abonos. La API propia y la persistencia centralizada se mantienen en el diseño de AV2. El trabajo solicitado no incluye publicación ni despliegue.

## 5.1 Software Configuration Management

### 5.1.1 Software Development Environment Configuration

| Producto o herramienta | Uso | Referencia |
|---|---|---|
| Vue y Vite | Componentes reactivos, desarrollo y compilación de ambos productos web. | Manifests y lockfiles de landing/frontend. |
| PrimeVue | Controles de la frontend con etiquetas y estados accesibles. | Dependencias y componentes de la frontend. |
| Node.js y npm | Instalación reproducible, pruebas y build local. | Versiones registradas en la evidencia de ejecución. |
| Git | Features, integración local y trazabilidad. | Historial de cada repositorio y CONTRIBUTING. |
| GitHub | Historial remoto de AV1, conservado como referencia. | Organización Grupo-Desarrollo-Aplicaciones-Web. |
| Figma y UXPressia | Herramientas requeridas para diseño e investigación del curso. | La sincronización de los artefactos locales a estas herramientas queda pendiente. |
| Trello/Jira/YouTrack | Tablero de sprint del curso. | Se prepara una tabla local; su tablero externo queda pendiente. |
| ASP.NET Core, EF Core y PostgreSQL | Arquitectura de servicios y persistencia del producto completo. | Diseño del capítulo IV; implementación prevista para AV2. |

Las instalaciones se realizan desde el lockfile. Las pruebas locales usan datos de demostración y no requieren credenciales de producción.

```bash
npm ci
npm test
npm run build
```

Para la revisión conjunta se reservan los puertos 5173 para landing y 5174 para frontend. La URL de la frontend se configura en el entorno de la landing; no se incorpora como una dirección de producción.

### 5.1.2 Source Code Management

| Repositorio | Alcance | Estado TB1 |
|---|---|---|
| [upc-project-report](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report) | Informe, fuentes de diagramas, pruebas y paquete documental. | Nuevos commits locales, sin push. |
| [creditor-landing-page](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/creditor-landing-page) | Presentación pública y acceso por segmento. | Nueva versión preparada localmente. |
| `creditor-web-app` | Dashboard, proveedores, compras, detalle y abonos. | Repositorio local; no se ha creado un remoto. |

GitFlow utiliza main para entregas estables, develop para integración y una feature por bloque. La preparación reintegra primero las correcciones de main a develop, conserva el historial anterior y hace merges locales con --no-ff. Las releases usan SemVer y los hotfix vuelven a main/develop. La guía completa está en [CONTRIBUTING](../CONTRIBUTING.md).

Los cambios de TB1 se atribuyen a la identidad que los registra: `MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com>`. Los commits de integrantes anteriores se conservan. Las ramas de trabajo se mantienen para revisión antes de publicar.

### 5.1.3 Source Code Style Guide & Conventions

Se aplican módulos JavaScript, nombres de código en inglés, componentes Vue con responsabilidad delimitada y estilos responsive. Las reglas de compra y abono se separan de la presentación y del adaptador de almacenamiento para facilitar la futura integración HTTP.

| Aspecto | Convención |
|---|---|
| Dinero | Cálculos de compras/abonos en centavos enteros; totales separados por moneda. |
| Idiomas | Inglés por defecto y español latinoamericano alternativo; la moneda pertenece a la operación. |
| Formularios | Etiquetas persistentes, errores asociados y datos conservados ante corrección. |
| Navegación | Destinos explícitos, foco visible y operación por teclado. |
| Datos locales | Se identifican como demostración; no equivalen a autenticación o persistencia de servidor. |
| Commits | tipo(alcance): descripción, con cambios lógicos y autor personal. |
| Evidencias | Producto, commit, fecha, comando o escenario y resultado observado. |

### 5.1.4 Software Deployment Configuration

La compilación local produce dist. Las configuraciones de CI preparadas verifican build/tests y no publican durante esta etapa. La aplicación usa navegación compatible con acceso directo y refresco; landing recibe su destino mediante VITE_APP_URL.

Se conserva la publicación histórica de AV1 en [GitHub Pages](https://grupo-desarrollo-aplicaciones-web.github.io/creditor-landing-page/), asociada al commit cf734ff y al [run 35305597000](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/creditor-landing-page/actions/runs/35305597000), exitoso el 18/09/2026. Esa publicación corresponde a la versión anterior. Las nuevas versiones de TB1 permanecen locales por indicación del usuario.

## 5.2 Landing Page, Services & Applications Implementation

La nueva landing comunica obligaciones de la mype y dirige al propietario hacia el resumen de cuentas por pagar y al administrador hacia nueva compra. La frontend implementa US-004 a US-007 mediante un adaptador local intercambiable. US-008/US-009 y TS-001 a TS-003 permanecen en el roadmap de servicios y módulos posteriores.

### 5.2.1 Sprint 1

El Sprint 1 produjo la primera landing e insumos de diseño/documentación. La ficha histórica se conserva en [Sprint 1](sprints/sprint-01.md). Su publicación del 18/09 es evidencia de AV1; no se presenta como un nuevo deployment TB1. La redacción extensa original se conserva en el [archivo de AV1](sprints/archive/chapter-05-av1.txt) para mantener trazabilidad de las correcciones.

### 5.2.2 Sprint 2

El documento canónico de esta iteración es [Sprint 2](sprints/sprint-02.md). La preparación local cubre las ocho secciones del índice. Los acuerdos de reunión, tablero externo y evidencias humanas se registran como pendientes cuando no se han proporcionado.

#### 5.2.2.1 Sprint Planning 2

| Campo | Registro |
|---|---|
| Fecha/hora/lugar de reunión | Pendiente de registro del equipo. No se declara una reunión realizada. |
| Prepared by | Miguel Angel Egocheaga Suyo, preparación técnica local del informe. |
| Attendees | Pendiente de confirmar por el equipo. |
| Review Sprint 1 | Landing existente publicada el 18/09; informe y diseño requieren alineación al dominio de cuentas por pagar. |
| Retrospective Sprint 1 | Historial combina features/merges y cargas directas; mantener revisión y commits por bloque en el incremento. La sesión de retrospectiva no está registrada. |
| Sprint Goal propuesto | Propietario consulta saldo/vencimiento por moneda y administrador registra compra/abono conservando la composición del saldo. |
| Comprobación técnica | Compra PEN 100 y abono 30 producen saldo PEN 70; abono 71 se rechaza; importes USD no se suman a PEN. |
| Capacidad/Velocity | El equipo debe confirmar capacidad. No se dispone de velocidad real medida. |
| Historias de frontend | US-004 (8 SP), US-005 (8 SP), US-006 (5 SP), US-007 (5 SP): 26 SP relativos de la planificación existente. |
| Alcance adicional | Corrección de landing, i18n/a11y, términos, pruebas locales y evidencia del report. |

#### 5.2.2.2 Aspect Leaders and Collaborators

La matriz siguiente propone la revisión del incremento a partir de los roles históricos; no acredita una asignación acordada en reunión. La preparación local nueva usa la identidad de Miguel.

| Integrante | GitHub | Producto/investigación | Diseño/revisión visual | Implementación/integración | Estado de acuerdo |
|---|---|---|---|---|---|
| Santos Torres, Juan Manuel | JuanManuel312 | L | C | C | Por confirmar para TB1. |
| Gutarra Velapatiño, Sebastián | SebastianGutarra | C | L | C | Por confirmar para TB1. |
| Egocheaga Suyo, Miguel Angel | MiguelAngel0107 | C | C | L | Autor de commits locales de preparación. |

L = líder propuesto del aspecto. C = colaborador propuesto. Los aportes realizados se comprueban con el historial; el Performance Report los evalúa por separado.

#### 5.2.2.3 Sprint Backlog 2

El tablero del curso en Trello/Jira/YouTrack queda pendiente de sincronización. Esta tabla local conserva los work-items textuales para revisión, con estimaciones propuestas en horas; no son horas trabajadas.

| Story | Task | Descripción | Est. h | Assigned to | Estado de aceptación |
|---|---|---|---:|---|---|
| US-004 | T2-01 | Dashboard por moneda y vencimientos (4 h), filtros y rutas al detalle (3 h). | 7 | Miguel, preparación local | Implementación local; ver evidencia de ejecución. |
| US-005 | T2-03 | Formulario de compra y comprobante demo (5 h), validación de campos/proveedor y errores (3 h). | 8 | Miguel, preparación local | Implementación local; ver evidencia de ejecución. |
| US-006 | T2-05 | Registro de abono e historial en centavos (4 h), rechazo de sobreabono y conservación del formulario (2 h). | 6 | Miguel, preparación local | Implementación local; ver evidencia de ejecución. |
| US-007 / Calidad | T2-07 | Detalle y voucher (3 h), revisión inglés/es419, teclado, responsive y pruebas del incremento (4 h). | 7 | Miguel, preparación local | Implementación y verificación técnica local. |
| US-001/002/003 | T2-08 | Landing, CTA y legales (4 h), contacto local sin promesa de envío (2 h). | 6 | Miguel, preparación local | Implementación local; ver evidencia de ejecución. |
| Report | T2-11 | Investigación, requisitos, modelos y evidencia de Sprint 2. | 5 | Miguel, preparación local | Preparado; fuentes humanas pendientes identificadas. |
| Entrega | T2-12 | Capturas, PDF, Keynote, formato performance y guion. | 4 | Miguel, preparación local | Artefactos locales; revisión del equipo pendiente. |

Total estimado propuesto: 43 horas. Los estados To-do/In-Process/To-Review/Done del tablero académico se confirmarán con el equipo; la entrega local técnica pasa a To-Review con sus resultados de prueba.

La revisión de la rúbrica agrupa las subtareas originales en **siete Engineering Tasks de 4 a 8 horas**; las horas dentro de la descripción indican su descomposición, no tareas independientes. T2-02 se integra en T2-01, T2-04 en T2-03, T2-06 en T2-05, T2-10 en T2-07 y T2-09 en T2-08. Se conserva el total propuesto de 43 horas y los 26 SP de las historias; no se modifica ni reconstruye tiempo realmente trabajado.

#### 5.2.2.4 Development Evidence for Sprint Review

La tabla completa de commits se guarda en [commits locales](tb1/commits-locales.md). Se genera desde Git con repositorio, feature, hash, mensaje, cuerpo, fecha y autor. Los hashes de nuevos commits permanecen locales y pueden revisarse con git show.

#### 5.2.2.5 Execution Evidence for Sprint Review

La [evidencia de ejecución](tb1/evidencia-local.md) registra comandos y resultados de build/test y las capturas de escenarios desktop/mobile. Se prueba la regla de saldo, moneda, tenant y validación de formularios. El video de navegación del equipo queda pendiente; las capturas locales no sustituyen ese video.

#### 5.2.2.6 Services Documentation Evidence for Sprint Review

La frontend utiliza un repositorio de datos local de demostración. La separación del adaptador permite integrar la API propia en AV2. Contratos previstos: GET/POST /api/v1/purchases, POST /api/v1/purchases/{purchaseId}/payments y consulta de proveedores. No se anuncia OpenAPI disponible ni respuestas de red ejecutadas de esos servicios. La persistencia local no ofrece autenticación real, almacenamiento privado de comprobantes ni concurrencia multiusuario.

#### 5.2.2.7 Software Deployment Evidence for Sprint Review

| Producto | Versión observada | Resultado |
|---|---|---|
| Landing AV1 | cf734ff, 18/09/2026 | Publicación histórica en Pages, documentada en capítulo V. |
| Landing TB1 | Nuevos commits locales | Build y previsualización local; sin deployment nuevo. |
| Frontend TB1 | Repositorio local creditor-web-app | Build y previsualización local; sin remoto ni deployment. |

El usuario debe publicar las dos versiones para cumplir el criterio de TB1 del curso. Esa acción fue excluida de la preparación actual y no se presenta como pendiente técnico resuelto.

#### 5.2.2.8 Team Collaboration Insights during Sprint

La preparación corrige el dominio de cartera de créditos a cuentas por pagar, reintegra la release anterior y separa implementación, datos locales, pruebas y despliegue. Los commits nuevos usan la cuenta de Miguel. Los insumos de Juan y Sebastián se reconocen en la evidencia histórica del capítulo 00; no se les atribuye el código nuevo sin commits o artefactos propios.

Pendientes del equipo: validar LACX, registrar reuniones/tablero, completar investigación S2/análisis, revisar diseños en herramientas requeridas, grabar navegación/exposición y validar desempeño individual. La revisión técnica local y los límites se detallan en [control TB1](09-tb1-delivery-checklist.md).
