# Capítulo V: Product Implementation, Validation & Deployment

Este capítulo registra la preparación técnica de TB1 al **3 de octubre de 2026**, ampliada mediante revisión documental remota el **4 de octubre de 2026**. El incremento reúne una landing orientada a cuentas por pagar y la primera frontend para consultar obligaciones, registrar compras y abonos. La API propia y la persistencia centralizada se mantienen en el diseño de AV2. La revisión actual actualiza el informe en `develop`; no incluye un nuevo despliegue de los productos.

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
| [upc-project-report](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report) | Informe, fuentes de diagramas, pruebas y paquete documental. | Informe y evidencias publicados en develop; revisión documental del 04/10/2026. |
| [creditor-landing-page](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/creditor-landing-page) | Presentación pública y acceso por segmento. | Nueva versión preparada localmente. |
| `creditor-web-app` | Dashboard, proveedores, compras, detalle y abonos. | Repositorio local; no se ha creado un remoto. |

GitFlow utiliza main para entregas estables, develop para integración y una feature por bloque. La preparación reintegra primero las correcciones de main a develop, conserva el historial anterior y hace merges locales con --no-ff. Las releases usan SemVer y los hotfix vuelven a main/develop. La guía completa está en [CONTRIBUTING](../CONTRIBUTING.md).

Los cambios de TB1 se atribuyen a la identidad que los registra: `MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com>`. Los commits de integrantes anteriores se conservan. La evidencia del 03/10 describe ramas de trabajo locales; la revisión del 04/10 comprueba los commits de preparación del informe disponibles en GitHub.

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

# 5.2.1 Sprint 1: Landing Page de CreditFlow

## 5.2.1.1 Sprint Planning 1

**Naturaleza del registro.** Las fechas, horas, estimaciones y actividades de planificación siguientes se proponen para la semana del 14 al 20 de septiembre de 2026. No existe acta que acredite que la reunión ya ocurrió. La implementación visible tiene commits del 14 de septiembre; el plan organiza su documentación, revisión y preparación de entrega, además de reconstruir el backlog del incremento.

| Sprint # | Sprint 1 |
|---|---|
| Sprint Planning Background | Primera entrega de la landing y organización de la evidencia técnica. |
| Inicio propuesto | Lunes 14/09/2026. |
| Fin propuesto | Domingo 20/09/2026. |
| Planificación propuesta | Lunes 14/09/2026, de 19:00 a 20:00, hora de Lima (UTC−5). |
| Location | Google Meet. |
| Prepared By | Juan Manuel Santos Torres. |
| Attendees previstos | Juan Manuel Santos Torres, Sebastián Gutarra Velapatiño y Miguel Angel Egocheaga Suyo. |
| Sprint n−1 Review Summary | No se dispone de un sprint previo documentado para esta entrega. |
| Sprint n−1 Retrospective Summary | No aplica como reunión previa; se propone iniciar con acuerdos sobre alcance y evidencia. |
| Sprint Goal | Consolidar la landing bilingüe de CreditFlow, documentar sus componentes e interacciones, definir su validación y preparar una configuración de publicación estática. |
| Sprint 1 Velocity | No disponible: no existe una medición de historias aceptadas al cierre. |
| Sum of Story Points propuestos | 34 SP. |
| Esfuerzo de tareas estimado | 61 horas-persona; estimación reconstruida, no horas trabajadas acreditadas. |
| Sprint Review propuesta | Domingo 20/09/2026, 19:00–19:40, Google Meet. |
| Retrospectiva propuesta | Domingo 20/09/2026, 19:40–20:00, Google Meet. |

### Agenda de planificación propuesta

| Tiempo | Actividad | Salida esperada |
|---|---|---|
| 10 min | Revisar visión y alcance. | Distinguir landing y aplicación futura. |
| 15 min | Revisar código y funcionalidades. | Inventario del incremento disponible. |
| 15 min | Definir historias y criterios. | Backlog y condiciones de aceptación. |
| 10 min | Revisar riesgos y dependencias. | Lista de defectos y publicación pendiente. |
| 10 min | Acordar evidencias y próximos pasos. | Responsables por confirmar y calendario aceptado. |

### Criterios de entrada propuestos

Cada historia deberá especificar usuario, necesidad, alcance y evidencia esperada. Las tareas de corrección deberán referir el componente afectado. Ninguna tarea de backend o persistencia forma parte de este sprint.

### Definition of Done propuesta

1. La funcionalidad prevista está implementada dentro del alcance de la landing.
2. Los criterios de aceptación cuentan con una verificación registrada.
3. La compilación finaliza correctamente para el commit de entrega.
4. Los cambios no introducen errores de navegación, recursos faltantes ni regresiones conocidas.
5. Los textos ES/EN y los estados de demostración son coherentes.
6. La documentación identifica archivo, commit y limitaciones.
7. Los defectos críticos de honestidad de la interacción y comprensión del cálculo están corregidos o la entrega queda explícitamente condicionada.

La existencia de un componente no permite asignar automáticamente `Done` a la historia. A fecha de corte, no hay cierre ni velocidad medida.

## 5.2.1.2 Aspect Leaders and Collaborators

Los aspectos de esta entrega son documentación de producto, documentación técnica, interfaces de la landing, internacionalización e interacciones, validación y preparación de despliegue.

**L:** responsable principal confirmado. **C:** colaborador confirmado. Una celda vacía indica que el equipo no ha proporcionado una asignación formal. Se mantienen vacías las tareas de Sebastián y Miguel según lo solicitado.

| Team Member | GitHub Username | Capítulo I | Capítulo V | Implementación Vue/CSS | Idiomas e interacciones | Validación documental | Despliegue |
|---|---|---|---|---|---|---|---|
| Juan Manuel Santos Torres | @JuanManuel312 | L | L | | | L | |
| Sebastián Gutarra Velapatiño | @SebastianGutarra | | | | | | |
| Miguel Angel Egocheaga Suyo | @MiguelAngel0107 | | | | | | |

La responsabilidad de validación documental comprende el protocolo de entrevistas y la inspección heurística; no significa que Juan haya realizado entrevistas o pruebas aún no registradas. Las asignaciones operativas se completarán por acuerdo del equipo.

## 5.2.1.3 Sprint Backlog 1

### Historias de usuario

Las historias e IDs se han elaborado para describir el incremento. Sus estimaciones son propuestas y no corresponden a Issues previamente existentes. Se distingue implementación observable de aceptación pendiente.

| ID | Historia de usuario | SP | Evidencia o situación actual |
|---|---|---:|---|
| US-LP-01 | Como visitante, quiero identificar el propósito de CreditFlow y navegar a las secciones para decidir qué información explorar. | 3 | Header y Hero presentes; enlace de login pendiente de corregir. |
| US-LP-02 | Como responsable de cartera, quiero conocer las capacidades y el flujo previsto para evaluar su relación con mi negocio. | 3 | Features, HowItWorks y Stats presentes; afirmaciones por revisar. |
| US-LP-03 | Como visitante, quiero modificar los parámetros de un préstamo para explorar una estimación de cuota. | 5 | Simulador presente; discrepancia entre etiqueta TEA y cálculo. |
| US-LP-04 | Como potencial cliente, quiero comparar planes y períodos para comprender la propuesta comercial. | 3 | Selector y tarjetas presentes; moneda y redondeo por aclarar. |
| US-LP-05 | Como visitante, quiero consultar preguntas frecuentes para resolver dudas iniciales. | 2 | Acordeón implementado. |
| US-LP-06 | Como visitante interesado, quiero explorar una solicitud de acceso con mensajes claros sobre sus límites. | 3 | Validación local presente; confirmación y accesibilidad por mejorar. |
| US-LP-07 | Como visitante, quiero elegir español o inglés y conservar esa selección para leer el contenido. | 3 | Diccionarios y persistencia presentes. |
| US-LP-08 | Como usuario móvil, quiero explorar el contenido y sus controles sin barreras de distribución o navegación. | 5 | CSS responsive presente; verificación visual y de teclado pendiente. |
| US-LP-09 | Como integrante del equipo, quiero documentación trazable para reproducir y revisar la entrega. | 2 | README técnico existente; capítulos y protocolo preparados para incorporar. |
| US-LP-10 | Como evaluador, quiero acceder a una versión publicada para revisar el incremento sin instalarlo. | 5 | Publicación pendiente; configuración propuesta. |
| **Total** | | **34** | **No equivale a velocidad completada.** |

### Criterios de aceptación

**US-LP-01**

- Dada la sección inicial, el visitante encuentra marca, propósito y dos llamadas a la acción.
- Al seleccionar una sección existente desde el encabezado, llega a su destino.
- En móvil, el menú puede abrirse y cerrarse, y se cierra al seleccionar un enlace de sección.
- Ningún acceso presentado como operativo conduce a una sección inexistente. El enlace `#login` impide dar por cumplido este criterio.

**US-LP-02**

- Se presentan seis capacidades y cuatro pasos en un orden comprensible.
- Los textos están disponibles en ambos idiomas.
- Las capacidades futuras se distinguen de las funciones del prototipo.
- Las cifras promocionales se sustentan o se identifican como ilustrativas antes de la evaluación.

**US-LP-03**

- Monto, tasa y plazo permiten seleccionar los rangos definidos por el componente.
- La cuota, total e interés responden a los valores actuales sin recarga.
- Una tasa cero produce cuota igual a monto/plazo e interés total cero.
- La definición de tasa coincide con la transformación aplicada.
- El usuario comprende que es una estimación sin comisiones ni una operación real.

**US-LP-04**

- Se presentan tres planes y se diferencia el destacado.
- El selector actualiza precios y descripción del período.
- El plan corporativo mantiene la indicación de precio personalizado.
- El precio, la moneda y el descuento se comunican sin ambigüedad.
- El CTA conduce al formulario; no se declara una suscripción contratada.

**US-LP-05**

- Se presentan cinco preguntas y una respuesta visible al inicio.
- Pulsar la pregunta abierta la cierra; pulsar otra cambia la respuesta visible.
- `aria-expanded` corresponde al estado.
- El contenido responde sobre la visión del producto sin fingir servicios ya disponibles.

**US-LP-06**

- Nombre y correo son obligatorios; empresa es opcional.
- Una entrada inválida muestra un mensaje comprensible y conserva los datos.
- Los campos cuentan con nombres accesibles y el error puede identificarse.
- La confirmación informa que la interacción es una demostración local.
- El visitante puede corregir los datos sin tener que recargar toda la página. Los tres últimos criterios requieren mejoras.

**US-LP-07**

- Los botones permiten seleccionar ES o EN.
- El contenido y los metadatos básicos se actualizan.
- La selección persiste al recargar en condiciones normales de almacenamiento.
- El comportamiento de moneda se explica como formato de muestra, no conversión.

**US-LP-08**

- Las pruebas propuestas a 360, 768 y 1440 px no presentan solapamiento o desplazamiento horizontal no intencional.
- Los controles se operan mediante teclado y muestran foco.
- Los títulos de las secciones enlazadas no quedan ocultos por el encabezado.
- La lectura y la interacción se mantienen en ambos idiomas.

**US-LP-09**

- El entorno y los scripts coinciden con el manifest y lockfile.
- La documentación separa hechos, propuestas y pendientes.
- Las capturas se relacionan con el repositorio correcto.
- El protocolo no incluye entrevistas ni resultados inventados.

**US-LP-10**

- La compilación de un commit integrado en `main` finaliza correctamente.
- La URL devuelve el contenido y los recursos bajo el subdirectorio del proyecto.
- Se conservan el enlace de ejecución y el commit desplegado.
- La prueba de humo de navegación e interacciones queda registrada.

### Work Items y estimaciones

Los tiempos son una estimación académica reconstruida, no una declaración de dedicación histórica. “Código presente” significa que existe una implementación inspeccionable; no equivale a una tarea aceptada. Las asignaciones de implementación se mantienen vacías hasta que el equipo las confirme.

| Sprint | User Story | Work-Item / Task | Description | Estimation (Hours) | Assigned To | Status |
|---|---|---|---|---:|---|---|
| 1 | US-LP-01 | T-LP-01 | Crear encabezado, marca y enlaces de sección. | 3 | | Código presente; revisión pendiente. |
| 1 | US-LP-01 | T-LP-02 | Construir hero, CTAs y panel ilustrativo. | 2 | | Código presente; revisión pendiente. |
| 1 | US-LP-02 | T-LP-03 | Presentar seis características y cuatro pasos. | 3 | | Código presente. |
| 1 | US-LP-02 | T-LP-04 | Revisar métricas y diferenciar promesas de funciones reales. | 2 | | Pendiente de ajuste. |
| 1 | US-LP-03 | T-LP-05 | Implementar entradas reactivas y resultados del simulador. | 4 | | Código presente. |
| 1 | US-LP-03 | T-LP-06 | Resolver definición de tasa y contrastar casos de cálculo. | 3 | | Pendiente. |
| 1 | US-LP-04 | T-LP-07 | Implementar tarjetas y selector mensual/anual. | 2 | | Código presente. |
| 1 | US-LP-04 | T-LP-08 | Aclarar moneda, descuento y facturación. | 2 | | Pendiente. |
| 1 | US-LP-05 | T-LP-09 | Crear acordeón con estado reactivo y traducciones. | 2 | | Código presente. |
| 1 | US-LP-05 | T-LP-10 | Revisar contenido, teclado y estado accesible del FAQ. | 2 | | Pendiente de verificación. |
| 1 | US-LP-06 | T-LP-11 | Implementar validaciones locales del formulario. | 3 | | Código presente. |
| 1 | US-LP-06 | T-LP-12 | Corregir confirmación, etiquetas, avisos y regreso a edición. | 3 | | Pendiente. |
| 1 | US-LP-07 | T-LP-13 | Implementar diccionarios, selector y persistencia. | 3 | | Código presente. |
| 1 | US-LP-07 | T-LP-14 | Revisar formatos monetarios y completitud ES/EN. | 2 | | Pendiente de verificación. |
| 1 | US-LP-08 | T-LP-15 | Adaptar rejillas, controles y menú a varios anchos. | 4 | | Reglas CSS presentes. |
| 1 | US-LP-08 | T-LP-16 | Ejecutar pruebas responsive, teclado y destinos de enlaces. | 4 | | Pendiente de ejecución. |
| 1 | US-LP-09 | T-LP-17 | Adaptar capítulo I y documentar configuración e implementación. | 6 | Juan Manuel Santos Torres | Contenido preparado para incorporar y revisar. |
| 1 | US-LP-09 | T-LP-18 | Diseñar entrevistas, registrar inspección y organizar evidencias. | 5 | Juan Manuel Santos Torres | Contenido preparado; entrevistas pendientes. |
| 1 | US-LP-10 | T-LP-19 | Preparar configuración de ruta base y workflow de Pages. | 4 | | Propuesta preparada; adopción pendiente. |
| 1 | US-LP-10 | T-LP-20 | Publicar, verificar URL y registrar ejecución. | 2 | | Pendiente. |
| | | **Total** | | **61** | | |

### Dependencias y prioridades

- T-LP-06 debe resolverse antes de considerar correcto el significado del cálculo.
- T-LP-12 debe preceder a una validación donde los participantes puedan interpretar el formulario como un envío real.
- T-LP-16 requiere una versión ejecutable y debe producir evidencia por caso.
- T-LP-20 depende de T-LP-19, de una compilación correcta y de acceso habilitado a Pages.
- El backlog de documentación puede incorporarse sin atribuir a otros integrantes tareas no confirmadas.

Las pruebas y el registro de cierre determinarán qué historias se aceptan. La velocidad se calculará sumando únicamente los SP de historias aceptadas según la Definition of Done.

## 5.2.1.4 Development Evidence for Sprint Review

### Evidencias disponibles

| ID | Evidencia | Qué permite afirmar | Límite |
|---|---|---|---|
| DEV-01 | ZIP de `develop` con comentario SHA `7597586799b350cbdeffec3b9fec4a42b1f55f3d`. | Contenido técnico del incremento inspeccionado. | No contiene el directorio `.git` ni ejecuciones de pruebas. |
| DEV-02 | Captura de commits de la landing, 14/09/2026. | Historial visible de incorporación e integración de secciones. | No demuestra aprobación por PR ni la ejecución correcta. |
| DEV-03 | Captura de ramas del informe. | Existencia y divergencia de las ramas mostradas. | Estado de la captura, no comprobación remota actual. |
| DEV-04 | Captura de commits del informe, 08 y 09/09/2026. | Trabajo documental previo de los usuarios visibles. | No acredita que esos contenidos ya estén alineados a esta versión. |
| DEV-05 | Captura de Pull Requests del informe. | Cero abiertos y cero cerrados mostrados. | No describe el repositorio de la landing. |

![Historial de implementación de la landing](creditflow-documentacion/informe/assets/evidence/landing-commits.png)

### Historial de la landing visible en la captura

Todos los registros de esta tabla aparecen el 14/09/2026 asociados al usuario `MiguelAngel0107`. Se transcriben los mensajes visibles sin inventar PR ni tiempos de trabajo.

| Orden lógico | Mensaje | Relación con el incremento |
|---|---|---|
| 1 | `chore: initialize landing page repository` | Base del repositorio. |
| 2 | `feat: add Vue landing foundation` | Estructura inicial Vue. |
| 3 | `merge: integrate landing foundation` | Integración declarada de la base. |
| 4 | `feat: add navigation and hero section` | Encabezado e inicio. |
| 5 | `merge: integrate navigation and hero section` | Integración declarada de navegación e inicio. |
| 6 | `feat: add product overview sections` | Secciones informativas. |
| 7 | `merge: integrate product overview sections` | Integración declarada de presentación. |
| 8 | `feat: add loan installment simulator` | Simulador de cuotas. |
| 9 | `merge: integrate loan installment simulator` | Integración declarada del simulador. |
| 10 | `feat: add conversion and footer sections` | Conversión y pie de página. |
| 11 | `merge: integrate conversion and footer sections` | Último registro visible, SHA abreviado `7597586`. |

La asociación de usuario en una captura acredita ese registro de GitHub, no permite inferir que una sola persona elaboró todas las líneas del cambio ni reconstruir colaboraciones no registradas.

### Evidencia documental previa

![Historial del informe académico](creditflow-documentacion/informe/assets/evidence/report-commits.png)

La captura muestra commits de `JuanManuel312` sobre startup, perfiles, problemática, Lean UX y segmentos el 8 de septiembre. El 9 de septiembre se observan commits de `SebastianGutarra` sobre diseño, branding e imágenes. Esta evidencia se conserva como antecedente. Los nuevos bloques documentales deben registrarse en la fecha real de su incorporación.

### Evidencias que completarán la revisión

Se deberán añadir enlaces al commit final de cada repositorio, PR si se utilizan, resultado de compilación y capturas de la landing ejecutándose. Cada imagen debe indicar versión, fecha y contexto; una captura del historial no reemplaza una captura funcional.

## 5.2.1.5 Execution Evidence for Sprint Review

La ejecución funcional no está acreditada con resultados de navegador en el material disponible. Se presenta un plan de verificación reproducible. Todos los casos comienzan como **pendientes**; los resultados esperados se derivan del código y de los criterios propuestos.

### Preparación

Registrar commit, fecha, sistema operativo, navegador y versión, viewport y versiones de Node/npm. Ejecutar `npm ci`, `npm run build` y `npm run preview`, conservando el resultado. Utilizar datos ficticios para el formulario.

| ID | Historia | Acción | Resultado esperado o condición a comprobar | Estado |
|---|---|---|---|---|
| TC-LP-01 | US-LP-09 | Instalar desde lockfile y compilar. | Comandos finalizan correctamente y se genera `dist/`. | Pendiente. |
| TC-LP-02 | US-LP-01 | Abrir la página y recorrer anclas. | Cada enlace principal lleva a su sección. | Pendiente. |
| TC-LP-03 | US-LP-01/08 | Abrir menú a 360 px y seleccionar Planes. | Menú visible al abrir; se cierra y llega a Planes. | Pendiente. |
| TC-LP-04 | US-LP-07 | Cambiar ES/EN. | Contenido, título, descripción y `html[lang]` cambian. | Pendiente. |
| TC-LP-05 | US-LP-07 | Elegir idioma y recargar. | Conserva selección si almacenamiento está disponible. | Pendiente. |
| TC-LP-06 | US-LP-03 | Usar 10000, 24% y 12 meses. | Fórmula actual: cuota ≈945.60, total ≈11347.15 e interés ≈1347.15; la etiqueta de tasa sigue siendo un hallazgo. | Pendiente. |
| TC-LP-07 | US-LP-03 | Usar 12000, 0% y 12 meses. | Cuota 1000, total 12000, interés 0. | Pendiente. |
| TC-LP-08 | US-LP-03 | Probar mínimos y máximos permitidos. | Salidas finitas; sin valores inválidos ni desbordamiento de layout. | Pendiente. |
| TC-LP-09 | US-LP-03/07 | Cambiar idioma con monto fijo. | Detectar y documentar cambio de símbolo sin cambio numérico. | Pendiente. |
| TC-LP-10 | US-LP-04 | Alternar mensual/anual. | Código actual muestra 39/89 y 31/71; plan a medida no cambia a número. | Pendiente. |
| TC-LP-11 | US-LP-04 | Pulsar CTA de cada plan. | Navega a `#demo`; no contrata un plan. | Pendiente. |
| TC-LP-12 | US-LP-05 | Abrir y cerrar preguntas. | Una o ninguna respuesta visible; ARIA refleja el estado. | Pendiente. |
| TC-LP-13 | US-LP-06 | Enviar nombre/correo vacíos. | Mensaje de campos obligatorios y conservación del formulario. | Pendiente. |
| TC-LP-14 | US-LP-06 | Usar nombre ficticio y `correo-invalido`. | Mensaje de correo inválido. | Pendiente. |
| TC-LP-15 | US-LP-06 | Usar `Persona Demo` y `demo@example.com`. | Confirmación local; comprobar en red que no exista envío de solicitud. | Pendiente. |
| TC-LP-16 | US-LP-06 | Intentar editar después de confirmar. | Registrar ausencia actual de acción de edición como defecto. | Pendiente. |
| TC-LP-17 | US-LP-08 | Recorrer la página con Tab, Enter y flechas en sliders. | Acciones disponibles y foco visible; registrar cualquier bloqueo. | Pendiente. |
| TC-LP-18 | US-LP-08 | Revisar 360, 768 y 1440 px en ES y EN. | Sin solapamientos ni scroll horizontal no previsto. | Pendiente. |
| TC-LP-19 | US-LP-01 | Probar login y enlaces del footer. | Reproducir destinos inexistentes/provisionales y abrir incidencias. | Pendiente. |
| TC-LP-20 | US-LP-10 | Abrir versión publicada y revisar red. | Documento y recursos disponibles; sin 404 bajo subdirectorio. | Pendiente de publicación. |

TC-LP-06 y TC-LP-10 describen el comportamiento actual, no validan su semántica financiera o comercial. Después de corregir tasa o precios, se actualizarán sus oráculos esperados.

### Registro por ejecución

| Campo | Información a completar |
|---|---|
| Test case ID | TC-LP-xx. |
| Commit y rama | Versión exacta ejecutada. |
| Fecha y ejecutor | Identidad y momento de la prueba. |
| Entorno | Navegador, versión y viewport. |
| Pasos y datos | Entradas utilizadas. |
| Resultado obtenido | Observación factual. |
| Veredicto | Aprobado, fallido o bloqueado. |
| Evidencia | Captura, video o log. |
| Incidencia | Enlace real, si corresponde. |

### Recorrido de Sprint Review propuesto

Demostrar la comprensión del inicio, cambiar idioma, recorrer características, modificar el simulador, comparar planes, abrir preguntas y probar validaciones. Aclarar antes del formulario que la solicitud es local. Cerrar con defectos conocidos, estado del despliegue y decisiones de aceptación. Duración de demostración propuesta: 10–15 minutos dentro de la reunión de revisión.

## 5.2.1.6 Services Documentation Evidence for Sprint Review

La denominación de esta sección se conserva por compatibilidad con la plantilla. En esta entrega no hay servicios HTTP propios implementados, por lo que la evidencia se centra en módulos y contratos locales de interfaz.

| Unidad | Entradas | Salidas/efectos | Dependencias |
|---|---|---|---|
| `src/main.js` | Documento con `#app`. | Montaje de Vue y aplicación del idioma. | Vue, App, CSS e i18n. |
| `setLocale(code)` | Código soportado `es` o `en`. | Actualiza estado, almacenamiento y metadatos básicos; ignora códigos no soportados. | DOM y `localStorage`. |
| `t(path, params)` | Ruta de traducción y parámetros opcionales. | Texto, lista u objeto del diccionario, con fallback. | Diccionario y locale reactivo. |
| `money(value)` | Número. | Moneda formateada; valores no finitos se muestran como cero. | `Intl.NumberFormat`. |
| `LoanSimulator` | Monto, tasa anual, meses. | Cuota, total e interés calculados. | `ref`, `computed`, `money`. |
| `PricingSection` | Estado mensual/anual. | Precio calculado, etiqueta del período y CTA. | Datos locales y traducciones. |
| `FaqSection` | Índice de pregunta pulsada. | Actualización del índice abierto. | `ref` y diccionario. |
| `CtaSection.submit` | Nombre, correo y empresa. | Error local o cambio al estado confirmado. | Estado reactivo y traducciones. |

La persistencia del idioma es compartida por el módulo; los estados del menú, FAQ, precios, formulario y simulador son locales a sus componentes. No existe un contrato de API de solicitudes ni un endpoint que pueda probarse con Swagger o Postman.

### Documentos y referencias técnicas

- `README.md` de la landing: instrucciones de ejecución, estructura, idiomas y nota sobre formulario simulado.
- `package.json` y `package-lock.json`: dependencias y scripts.
- Capítulo V, sección 5.1: configuración y convenciones.
- Sección 5.2: inventario de componentes y comportamiento.
- Esta documentación de sprint: historias, tareas, casos de verificación y evidencia de historial.
- Sección 5.3: protocolo de entrevistas y hallazgos heurísticos.

La mención a una futura integración ASP.NET en el README y un comentario del formulario no acredita backend implementado. No se incorpora como parte de esta entrega ni se redactan endpoints ficticios.

## 5.2.1.7 Software Deployment Evidence for Sprint Review

**Estado actual: pendiente de publicación.** El equipo ha indicado GitHub Pages como alternativa prevista. No se dispone de URL activa verificada, ejecución exitosa de Actions ni evidencia de despliegue.

| Evidencia | Estado al corte | Requisito para completarla |
|---|---|---|
| Configuración de Vite para Pages | Propuesta en 5.1.4. | Incorporar ruta base y revisar compilación. |
| Workflow de publicación | Propuesta entregada. | Incorporar y ejecutar en el repositorio de la landing. |
| Build del commit de entrega | Sin resultado registrado. | Adjuntar log con finalización correcta. |
| URL pública | No disponible. | Registrar la URL devuelta por Pages. |
| Recursos JS/CSS/favicon | No comprobados en hosting. | Verificar solicitudes y ausencia de errores 404. |
| Prueba de humo | Pendiente. | Ejecutar navegación e interacciones. |
| Versión publicada | No registrada. | Identificar SHA y, si se acuerda, etiqueta de entrega. |

### Ficha de despliegue para completar

| Campo | Registro |
|---|---|
| Fecha y hora | Pendiente. |
| Responsable | Pendiente. |
| Rama y SHA | Pendiente. |
| Workflow / ejecución | Pendiente. |
| Resultado de build | Pendiente. |
| URL del sitio | Pendiente. |
| Navegador y viewport de validación | Pendiente. |
| Incidencias y decisión de entrega | Pendiente. |

La dirección esperada por el nombre del repositorio no debe etiquetarse como “sitio publicado” hasta comprobarla. La ejecución local con Vite y la publicación en Pages son evidencias distintas.

## 5.2.1.8 Team Collaboration Insights during Sprint

### Observaciones sustentadas

El proyecto separa implementación e informe en dos repositorios. Las capturas de la landing agrupan cambios por base, navegación, presentación, simulador y conversión. El informe cuenta con ramas dedicadas a capítulos y antecedentes de trabajo documental. Esta organización ofrece puntos concretos para relacionar cambios con entregables.

La captura de ramas del informe muestra divergencia entre `main` y `develop`; por ello es necesario revisar la base de integración antes de abrir nuevas ramas. La captura de PR del informe no acredita revisión por pares. El código contiene comentarios y un README que hacen visible la condición local del formulario, aunque esa limitación todavía no se expresa correctamente al visitante.

### Acuerdos propuestos

| Aspecto | Acción propuesta | Evidencia futura |
|---|---|---|
| Reuniones | Usar Google Meet y conservar un acta breve con decisiones. | Fecha, asistentes, acuerdos y tareas. |
| Seguimiento | Crear Issues por historia, defecto o tarea documental. | Enlaces e IDs reales. |
| Integración | Sincronizar ramas y revisar cambios mediante PR. | Diff, revisión y resultado. |
| Documentación | Mantener separados hechos, propuestas y pruebas pendientes. | Capítulos actualizados. |
| Validación | Registrar cada prueba con versión, entrada y resultado. | Matriz completada. |
| Publicación | Asociar URL, workflow y SHA. | Ficha de despliegue. |

### Fortalezas observables

La separación por componentes facilita localizar responsabilidades técnicas. Los diccionarios concentran contenido bilingüe. Los commits visibles contienen mensajes que permiten relacionar grupos de cambios con secciones de la landing.

### Oportunidades de mejora

Resolver enlaces provisionales, aclarar el estado de demostración, alinear la etiqueta de tasa con el cálculo y formalizar los criterios de aceptación. También se propone registrar versiones locales, completar asignaciones y evitar confundir afirmaciones promocionales con evidencia de resultados.

### Retrospectiva propuesta

Durante la reunión de cierre, cada integrante identificará una práctica que convenga mantener, una dificultad concreta y una acción para el siguiente incremento. La acción deberá tener responsable y evidencia de cumplimiento. No se atribuyen comentarios, consensos o reuniones no realizadas.

### Métricas disponibles y pendientes

Se conoce el alcance propuesto de 34 SP y 61 horas-persona estimadas. No existe velocidad real, tiempo efectivo, tasa de defectos ni porcentaje de pruebas aprobadas medidos. Estas métricas se completarán con el cierre y sus registros.

## 5.3 Validation Interviews

Las entrevistas de validación están **pendientes de realización**. Esta sección define un protocolo para evaluar la landing con potenciales usuarios. No incluye citas, participantes reales ni resultados inventados.

### 5.3.1 Diseño de entrevistas

#### Objetivo general

Evaluar si los segmentos objetivo comprenden la propuesta de CreditFlow y pueden explorar la landing para identificar capacidades relevantes, comprender el simulador, comparar planes, consultar dudas y reconocer la interacción de solicitud demostrativa.

#### Objetivos específicos

| ID | Objetivo | Evidencia buscada |
|---|---|---|
| O01 | Evaluar la comprensión del propósito y destinatario. | Explicación libre tras observar el inicio. |
| O02 | Identificar relación con necesidades del negocio. | Ejemplos concretos y capacidades consideradas útiles. |
| O03 | Observar navegación y localización de información. | Tareas completadas, dudas y recorridos. |
| O04 | Evaluar comprensión de entradas y resultados del simulador. | Manipulación de controles y explicación del resultado. |
| O05 | Evaluar claridad de planes, moneda y período. | Comparación expresada por el participante. |
| O06 | Explorar dudas de confianza y adopción. | Información faltante, barreras y requisitos. |
| O07 | Verificar comprensión del formulario de demostración. | Interpretación de validaciones y confirmación. |

#### Alcance y diseño metodológico

Se propone una entrevista semiestructurada acompañada de tareas moderadas y verbalización del pensamiento. La landing se ejecutará en una versión identificada por commit. Mientras no exista publicación, puede utilizarse una sesión local en un equipo del evaluador; si solo se comparte pantalla, se debe registrar que no se midió interacción directa del participante.

Duración propuesta: 35–40 minutos. Muestra inicial: seis participantes, tres por segmento. Selección intencional por experiencia relevante, sin pretensión estadística. Si hay necesidades o fallas importantes no cubiertas, se planificará una nueva ronda y se registrará su justificación.

#### Segmentos y filtro de selección

| Pregunta de filtro | Criterio |
|---|---|
| ¿Participas en decisiones o actividades de préstamos, ventas a crédito o cobros? | Debe existir participación real en el proceso. |
| ¿Cuál es tu responsabilidad principal? | Clasificar como propietario/responsable o encargado operativo. |
| ¿Cuándo realizaste por última vez una tarea relacionada? | Preferencia por experiencia en los últimos tres meses. |
| ¿Qué herramientas utilizas habitualmente? | Registrar contexto, sin excluir por usar una solución competidora. |
| ¿Puedes participar sin mostrar información confidencial de clientes? | Utilizar ejemplos anónimos o ficticios. |
| ¿Formas parte del equipo que desarrolló esta landing? | Excluir del estudio de usuarios; puede participar en revisión interna separada. |

#### Condiciones previas

Antes de la sesión, registrar los defectos conocidos y corregir o advertir claramente los estados simulados. Mantener constantes la versión, instrucciones y datos de prueba entre participantes de una misma ronda. No modificar la interfaz silenciosamente a mitad de la muestra.

Preparar hoja de observación, cronómetro, datos ficticios, versión de la landing y consentimiento. La grabación es opcional y requiere aceptación independiente. No solicitar DNI, credenciales, información bancaria, datos de deudores ni acceso a sistemas del negocio.

#### Roles y materiales

| Elemento | Responsabilidad o uso |
|---|---|
| Moderador | Presentar el estudio, leer consignas neutrales y pedir aclaraciones. |
| Observador | Registrar tiempos, acciones, dudas y ayudas sin interrumpir. |
| Participante | Explorar y explicar lo que piensa, sin obligación de completar tareas. |
| Google Meet | Entrevista remota y, si se acuerda, compartir pantalla. |
| Hoja de registro | Datos de contexto, resultados de tareas y observaciones. |
| Landing identificada | Mismo commit para la ronda, salvo cambio documentado. |

El responsable de preparación documental es Juan Manuel Santos Torres. La asignación de moderadores y observadores queda por confirmar, conservando vacías las tareas no proporcionadas de otros integrantes.

#### Introducción y consentimiento sugeridos

“Estamos evaluando una página de presentación de CreditFlow para un proyecto académico. Queremos conocer qué entiendes y cómo encuentras la información; no estamos evaluando tus conocimientos. La aplicación completa todavía no está disponible y el formulario de esta versión es una demostración que no envía solicitudes. Utilizaremos datos ficticios. Puedes omitir cualquier pregunta o terminar cuando lo desees. ¿Aceptas participar? Por separado, ¿autorizas que grabemos la sesión para analizarla dentro del equipo?”

Registrar ambas respuestas. Si no acepta grabación, tomar notas con su permiso. Para incluir un fragmento identificable en el informe o compartirlo fuera del equipo, obtener autorización específica; un permiso para analizar internamente no equivale a permiso para publicar.

#### Agenda de sesión

| Tiempo aproximado | Actividad |
|---|---|
| 0–3 min | Presentación y consentimiento. |
| 3–8 min | Contexto del participante y proceso actual. |
| 8–12 min | Primera impresión y comprensión. |
| 12–27 min | Tareas de navegación, simulador, planes y formulario. |
| 27–35 min | Preguntas específicas del segmento. |
| 35–40 min | Barreras, valoración y cierre. |

#### Reglas de moderación

No explicar el propósito de cada sección antes de observar su interpretación. No señalar botones ni anticipar respuestas. Si pide ayuda, primero preguntar qué esperaba encontrar. Cuando sea necesaria una indicación directa, registrarla como asistencia y distinguirla de una tarea completada sin ayuda. Evitar preguntas como “¿Te parece fácil nuestra página?”; preguntar “¿Qué parte te resultó clara o confusa?” y solicitar ejemplos.

#### Guion común: contexto y primera impresión

1. ¿Cuál es tu rol y qué relación tienes con préstamos, ventas a crédito o cobros?
2. Cuéntame la última vez que necesitaste consultar cuánto debía un cliente. ¿Qué hiciste?
3. ¿Dónde registras las condiciones, vencimientos y pagos de una operación?
4. ¿Qué parte de ese proceso requiere más atención o consultas?
5. Al observar el inicio de esta página, ¿qué crees que ofrece CreditFlow?
6. ¿Para quién parece estar pensado? ¿Qué elementos te hacen pensar eso?
7. ¿Qué esperarías poder hacer después de pulsar su llamada principal a la acción?
8. ¿Qué información buscarías primero antes de continuar?

No se presupone que el proceso actual sea deficiente. Si el participante no experimenta el problema planteado, esa respuesta constituye evidencia relevante para revisar las hipótesis.

#### Segmento 1: propietarios y responsables de cartera

1. ¿Cómo revisas actualmente el estado general de los créditos o cuentas por cobrar de tu negocio?
2. ¿Qué información consideras prioritaria al decidir qué cobros atender?
3. ¿En qué situaciones tu herramienta actual te resulta suficiente y en cuáles no?
4. ¿Qué capacidades de las presentadas se relacionan con una tarea que realizas? Describe un caso.
5. ¿Hay alguna característica que no necesites o cuyo significado no esté claro?
6. ¿Qué diferencia encuentras entre este producto y una entidad que presta dinero?
7. ¿Qué información necesitarías para evaluar el uso de CreditFlow en tu negocio?
8. ¿Cómo interpretarías los precios y los períodos de los planes mostrados?
9. ¿Qué factores considerarías antes de pagar por una herramienta de este tipo? No es necesario indicar información financiera privada.
10. ¿Qué dudas te generan las afirmaciones sobre ahorro de tiempo, reducción de mora o disponibilidad?
11. ¿Quién más participaría en la decisión de adoptar una herramienta y qué necesitaría evaluar?
12. Después de explorar la página, ¿cuál sería tu siguiente paso y por qué?

**Profundización neutral:** “¿Puedes darme un ejemplo?”, “¿Qué información te falta?”, “¿Cómo lo haces hoy?”, “¿Qué te haría cambiar de opinión?”. No interpretar disposición verbal como compra confirmada.

#### Segmento 2: administradores de créditos y encargados de cobranzas

1. Describe cómo revisas las cuotas que vencen durante una semana habitual.
2. ¿Qué haces cuando recibes un pago parcial y cómo lo relacionas con la operación?
3. ¿Qué información necesitas antes de contactar a una persona por un pago pendiente?
4. ¿Cómo identificas una diferencia entre lo registrado y lo que comunica un cliente?
5. ¿Qué entiendes por “cartera”, “mora” y “cronograma” en esta página?
6. ¿Los cuatro pasos presentados se parecen al orden de tu trabajo? ¿Qué cambiarías?
7. ¿Qué muestra del panel te resulta útil y qué dato necesitarías además?
8. Al utilizar el simulador, ¿qué interpretas por monto, tasa y plazo?
9. ¿Qué crees que representa la cuota mostrada y qué conceptos podría no incluir?
10. ¿Qué información esperabas encontrar en las preguntas frecuentes y no encontraste?
11. ¿En qué dispositivo revisarías esta información y en qué contexto?
12. ¿Qué necesitarías probar en una versión funcional antes de recomendarla a tu equipo?

Las preguntas sobre pagos y cartera exploran necesidades; no solicitan al participante ejecutar módulos inexistentes.

#### Tareas de usabilidad

| Tarea | Consigna neutral | Observar | Criterio propuesto |
|---|---|---|---|
| U01 | “Explora el inicio y explica con tus palabras qué ofrece esta página”. | Interpretación, destinatario y confusión con otorgamiento de préstamos. | Identifica gestión de crédito/cobranza. |
| U02 | “Busca dos funciones que podrían relacionarse con tu trabajo”. | Recorrido y comprensión de características. | Localiza y explica dos capacidades. |
| U03 | “Encuentra dónde se explica el proceso de uso”. | Acceso a los cuatro pasos. | Llega a la sección sin guía directa. |
| U04 | “Prueba una estimación con monto 10000, tasa 24 y plazo 12; luego cambia el monto a 20000. ¿Qué observas?”. | Manejo de sliders y comprensión del cambio. | Modifica el valor y explica la variación, sin valorar todavía la semántica de TEA. |
| U05 | “Compara el plan Negocio mensual con su opción anual. ¿Cómo entiendes el precio?”. | Moneda, importe por mes y facturación. | Explica la diferencia o identifica una duda concreta. |
| U06 | “Busca una respuesta sobre el uso de información existente en el negocio”. | Localización de FAQ/importación. | Encuentra una pregunta relevante y comprende su respuesta como propuesta del producto. |
| U07 | “Cambia el idioma y vuelve al que prefieras”. | Descubrimiento del selector y cambio de contenido. | Completa ambas acciones. |
| U08 | “En esta demostración, prueba el formulario con Persona Demo y el correo correo-invalido; después corrígelo a demo@example.com”. | Error, corrección y comprensión de confirmación local. | Corrige sin guía y no cree que se enviaron accesos. |
| U09 | “Desde la vista móvil, encuentra los planes”. | Menú, foco y anclas. | Completa sin bloqueo; solo se aplica a la submuestra móvil. |

No se exige completar todas las tareas si la persona decide retirarse. Registrar tareas omitidas y su motivo, sin contarlas como éxitos.

#### Valoración posterior y cierre

Después de las tareas principales: “En una escala de 1 a 5, donde 1 significa muy difícil y 5 muy fácil, ¿cómo describirías esta tarea? ¿Por qué?”. La escala es un instrumento local de esta evaluación; no se presenta como un cuestionario estandarizado.

Preguntas finales: ¿Qué fue lo más claro? ¿Qué generó más dudas? ¿Qué cambiarías primero? ¿Qué información necesitarías para decidir si quieres conocer una aplicación funcional? ¿Hay algo que no hayamos preguntado y consideres importante?

Agradecer la participación, recordar el alcance académico y confirmar cómo se utilizarán las notas o grabación autorizada. No prometer acceso a una aplicación que aún no está disponible.

#### Métricas, análisis y criterios de decisión

| Métrica | Cálculo o registro | Interpretación |
|---|---|---|
| Comprensión de propuesta | Participantes que la describen adecuadamente / quienes respondieron U01. | Claridad del propósito en la muestra. |
| Finalización sin ayuda | Tareas completadas sin indicaciones directas / tareas intentadas. | Facilidad observada. |
| Finalización con ayuda | Tareas terminadas tras indicaciones / tareas intentadas. | Dependencia de asistencia. |
| Tiempo por tarea | Segundos desde la consigna hasta completar o detener. | Dato descriptivo, no umbral universal. |
| Errores y bloqueos | Registro de acciones fallidas y puntos de abandono. | Ubicación de barreras. |
| Facilidad percibida | Respuesta de 1 a 5 y justificación. | Percepción complementaria a observación. |
| Dudas recurrentes | Participantes que expresan un mismo tema, con ejemplos. | Prioridad cualitativa. |
| Interés en siguiente paso | Intención declarada y razones. | Indicio de interés; no conversión real. |

Se informarán numeradores y denominadores, por ejemplo “4 de 6”, evitando porcentajes aislados en una muestra pequeña. La comparación por segmento deberá conservar el contexto de solo tres participantes previstos por grupo. Se usarán medianas y rangos descriptivos para tiempos cuando existan suficientes registros comparables.

**Codificación propuesta:** comprensión, pertinencia, navegación, lenguaje financiero, simulador, precios, confianza, formulario y móvil. Cada observación tendrá identificador, participante anonimizado, tarea, evidencia y posible implicación. Una cita literal solo se registrará si realmente fue pronunciada y puede localizarse en notas o grabación.

**Regla de decisión:** contrastar H01–H07 con los criterios del capítulo I, describiendo casos que los contradigan. Si no se cumple un umbral, proponer un cambio concreto y su forma de comprobación. Si se cumple, registrar apoyo exploratorio, sin afirmar validación definitiva del mercado.

**Prioridad de mejoras:** primero los problemas que inducen interpretaciones falsas o bloquean la tarea; después dificultades frecuentes; finalmente ajustes cosméticos. Frecuencia y gravedad se registrarán por separado.

**Limitaciones previstas:** muestra pequeña, selección por conveniencia o acceso, contexto de demostración, ausencia de operaciones reales y posible influencia del moderador. Ninguna entrevista sobre la landing permite medir reducción de mora, disponibilidad del servicio o rentabilidad del producto.

### 5.3.2 Registro de entrevistas

**Estado: entrevistas no realizadas.** Se han reservado seis códigos para organizar la ronda. No corresponden a personas ya entrevistadas y no se les asignan nombres, edades, ocupaciones específicas ni respuestas.

| Código reservado | Segmento previsto | Fecha | Modalidad | Consentimiento | Evidencia | Estado |
|---|---|---|---|---|---|---|
| VAL-S1-01 | Propietario/responsable de cartera | Por programar | Por confirmar | Pendiente | No disponible | No realizada. |
| VAL-S1-02 | Propietario/responsable de cartera | Por programar | Por confirmar | Pendiente | No disponible | No realizada. |
| VAL-S1-03 | Propietario/responsable de cartera | Por programar | Por confirmar | Pendiente | No disponible | No realizada. |
| VAL-S2-01 | Administrador/encargado de cobranzas | Por programar | Por confirmar | Pendiente | No disponible | No realizada. |
| VAL-S2-02 | Administrador/encargado de cobranzas | Por programar | Por confirmar | Pendiente | No disponible | No realizada. |
| VAL-S2-03 | Administrador/encargado de cobranzas | Por programar | Por confirmar | Pendiente | No disponible | No realizada. |

#### Ficha por participante

| Campo | Contenido a registrar durante la sesión |
|---|---|
| Código y segmento | Identificador anónimo y rol principal. |
| Contexto relevante | Tipo de operación, experiencia y herramienta actual, sin datos de clientes. |
| Fecha, duración y modalidad | Datos reales de ejecución. |
| Moderador/observador | Integrantes presentes. |
| Consentimiento | Participación, grabación y difusión, diferenciados. |
| Versión | SHA, URL o entorno local. |
| Entorno del participante | Dispositivo, navegador, idioma y viewport si es posible. |
| Resultados de tareas | U01–U09: completada sin ayuda, con ayuda, fallida u omitida. |
| Observaciones | Acciones y dudas concretas. |
| Citas | Texto exacto y minuto de referencia, cuando exista. |
| Conclusión de sesión | Aprendizajes e incertidumbres. |
| Evidencia autorizada | Enlace con acceso adecuado o notas anonimizadas. |

#### Plantilla de registro por tarea

| Participante | Tarea | Tiempo | Resultado | Ayuda dada | Observación/cita | Evidencia |
|---|---|---|---|---|---|---|
| Completar tras ejecutar | Uxx | | | | | |

#### Matriz de hallazgos de entrevistas

| ID | Evidencia observada | Participantes | Hipótesis relacionada | Interpretación | Cambio propuesto | Estado |
|---|---|---|---|---|---|---|
| Sin hallazgos todavía | Entrevistas pendientes. | No aplica. | H01–H07 pendientes. | No se emiten conclusiones. | Ejecutar protocolo. | Pendiente. |

Para incorporar evidencia al repositorio, utilizar notas anonimizadas y solo material autorizado. Las grabaciones con información personal no deben añadirse automáticamente a un repositorio o enlace público. Antes de entregar, comprobar que el docente pueda abrir el material permitido sin exponer información adicional.

### 5.3.3 Evaluaciones según heurísticas

#### Método y alcance

Se realizó una **inspección estática del código y los textos de la landing** proporcionada. No se efectuó una prueba de usabilidad con participantes ni una auditoría visual automatizada. Por ello, los resultados se describen como hallazgos de inspección y verificaciones pendientes, sin declarar que la interfaz “cumple” de manera general.

La revisión se organiza mediante las diez heurísticas de Nielsen. Los hallazgos, prioridades y recomendaciones siguientes son específicos del código de CreditFlow; no son resultados publicados por la fuente metodológica. [Referencia de las heurísticas de Nielsen](https://www.nngroup.com/articles/ten-usability-heuristics/).

**Escala operativa de prioridad para esta revisión:**

| Valor | Interpretación |
|---|---|
| 0 | Sin problema identificado dentro del alcance inspeccionado; no demuestra ausencia de problemas. |
| 1 | Ajuste menor de claridad o presentación. |
| 2 | Dificultad que puede afectar una tarea pero permite continuar. |
| 3 | Problema importante de comprensión, accesibilidad o correspondencia entre mensaje y acción. |
| 4 | Bloqueo crítico de una tarea esencial o impacto grave demostrado. |

Las severidades son preliminares y se revisarán con observación de usuarios. No se asigna un 4 sin evidencia suficiente de ese impacto.

#### Resumen de inspección

| Heurística | Estado de inspección | Hallazgos relacionados |
|---|---|---|
| 1. Visibilidad del estado del sistema | Retroalimentación local presente; confirmación engañosa. | HEU-01, HEU-06. |
| 2. Correspondencia con el mundo real | Dominio reconocible; discrepancia de tasa y moneda. | HEU-02, HEU-03. |
| 3. Control y libertad | Controles reversibles en varias secciones; salida del formulario insuficiente. | HEU-07, HEU-04. |
| 4. Consistencia y estándares | Sistema visual común; destinos y precios por revisar. | HEU-03, HEU-04, HEU-05. |
| 5. Prevención de errores | Rangos y validaciones básicas presentes; entradas y accesibilidad por mejorar. | HEU-02, HEU-06. |
| 6. Reconocer en lugar de recordar | Secciones etiquetadas; campos dependen de placeholders. | HEU-06. |
| 7. Flexibilidad y eficiencia | Idiomas y anclas presentes; precisión de sliders por comprobar. | HEU-08. |
| 8. Estética y diseño minimalista | Estructura modular; legibilidad visual sin medir. | HEU-09, HEU-10. |
| 9. Reconocer y recuperarse de errores | Mensajes básicos; ausencia de identificación accesible del error. | HEU-06, HEU-07. |
| 10. Ayuda y documentación | FAQ presente; enlaces de soporte/documentación provisionales. | HEU-04, HEU-09. |

#### 1. Visibilidad del estado del sistema

**Evidencia favorable.** El simulador utiliza propiedades calculadas para actualizar resultados; el selector de planes cambia la clase activa; el FAQ comunica su apertura mediante `aria-expanded`; el formulario muestra mensajes de error.

**Problema.** `CtaSection.vue` cambia `enviado` a verdadero sin realizar una solicitud, pero el diccionario promete enviar accesos por correo. El usuario puede interpretar que el equipo recibió sus datos. Los errores y el éxito tampoco tienen una región viva explícita para tecnologías de asistencia.

**Mejora.** Cambiar la confirmación por “Demostración completada; los datos no se enviaron”, añadir anuncios accesibles y mantener la misma condición en ES/EN. No introducir un estado de envío ficticio.

**Criterio de cierre.** La confirmación describe el efecto real y puede percibirse sin depender exclusivamente de la visión. Hallazgos HEU-01 y HEU-06.

#### 2. Correspondencia entre el sistema y el mundo real

**Evidencia favorable.** La landing utiliza términos de gestión crediticia y presenta un flujo desde registro hasta análisis. Los controles del simulador se acompañan de monto, tasa y plazo.

**Problema.** La tasa se etiqueta TEA y el código aplica una división proporcional entre doce. Además, `money()` conserva el valor pero cambia PEN por USD según idioma. Eso puede interpretarse como una conversión económica que no ocurre. La landing no define con suficiente precisión si el precio `$` corresponde a una moneda concreta.

**Mejora.** Alinear concepto de tasa y fórmula; separar idioma de moneda o identificar los valores como ejemplos independientes; definir la moneda de los planes.

**Criterio de cierre.** Texto, cálculo y unidad monetaria son coherentes y el participante puede explicarlos sin atribuir una conversión inexistente. HEU-02 y HEU-03.

#### 3. Control y libertad del usuario

**Evidencia favorable.** El usuario puede cambiar idioma, alternar períodos, modificar sliders y cerrar preguntas. El menú se cierra al elegir enlaces internos.

**Problema.** Tras confirmar el formulario, `v-if` retira sus campos y no ofrece una acción para volver a editar. Los enlaces de login y footer pueden generar recorridos sin destino útil.

**Mejora.** Incorporar “Editar datos” o “Reiniciar demostración”, conservando o restableciendo el estado de forma explícita. Sustituir destinos provisionales por secciones existentes o indicar indisponibilidad de la función.

**Criterio de cierre.** Puede volver al formulario sin recargar y comprender cualquier función aún no disponible. HEU-07 y HEU-04.

#### 4. Consistencia y estándares

**Evidencia favorable.** Los componentes comparten tokens, botones, tarjetas y jerarquías. La navegación principal utiliza etiquetas relacionadas con sus secciones.

**Problema.** El panel y simulador usan el formateador monetario, mientras Planes utiliza `$` fijo. Se anuncia “−20%”, pero se redondea el importe anual equivalente a un entero. La marca CreditFlow convive con el nombre técnico Creditor del repositorio; debe explicarse documentalmente, aunque no impide la interacción.

**Mejora.** Definir criterios consistentes para moneda y precisión. Mostrar importes con decimales o ajustar el texto comercial al descuento efectivo. Conservar la marca pública de forma uniforme.

**Criterio de cierre.** Los precios expresan la misma unidad y la información de descuento coincide con el cálculo. HEU-03 y HEU-05.

#### 5. Prevención de errores

**Evidencia favorable.** Los sliders limitan valores; el plazo mínimo es tres meses; el cálculo tiene un caso para tasa cero. El formulario rechaza vacíos y un formato de correo básico incorrecto.

**Problema.** Las comprobaciones de vacío usan `trim()`, pero el correo validado y mostrado no se normaliza. Un correo con espacios exteriores puede rechazarse. Los campos no ofrecen etiquetas persistentes y la semántica errónea de tasa puede conducir a una interpretación incorrecta aunque el valor esté dentro del rango.

**Mejora.** Normalizar los datos de texto antes de validar, añadir etiquetas e instrucciones y resolver el significado de tasa antes de invitar a interpretar resultados.

**Criterio de cierre.** Entradas ordinarias con espacios exteriores se manejan coherentemente y las restricciones son comprensibles. HEU-02 y HEU-06.

#### 6. Reconocer en lugar de recordar

**Evidencia favorable.** El menú nombra secciones, las tarjetas explican capacidades y el simulador muestra los valores seleccionados junto a los controles.

**Problema.** Nombre, correo y empresa dependen de placeholders; al escribir, esa indicación deja de verse. No existe una etiqueta asociada que permita identificar permanentemente cada campo.

**Mejora.** Añadir `label` vinculados por `for`/`id`, diferenciar el campo opcional y conservar instrucciones visibles cuando sean necesarias.

**Criterio de cierre.** Cada campo conserva un nombre visible y accesible durante toda la interacción. HEU-06.

#### 7. Flexibilidad y eficiencia de uso

**Evidencia favorable.** Existen anclas, selección de idioma persistida y un menú adaptable. Las funciones demostrativas pueden explorarse sin registro.

**Problema a comprobar.** Los controles de rango no tienen un campo numérico complementario. Seleccionar un valor exacto en móvil puede requerir varios intentos. Las reglas responsive no prueban por sí solas que las tareas sean rápidas o cómodas.

**Mejora.** Evaluar primero con usuarios el ajuste preciso; si se confirma dificultad, añadir una entrada numérica sincronizada, conservando límites y validación.

**Criterio de cierre.** El participante alcanza los valores de la tarea sin ayuda o intentos excesivos. No se exigen atajos complejos propios de una aplicación operativa a una landing. HEU-08.

#### 8. Estética y diseño minimalista

**Evidencia favorable.** La estructura separa inicio, características, proceso, simulación, planes, preguntas y solicitud. Los estilos utilizan una paleta y medidas compartidas.

**Limitaciones y riesgo.** No se midieron contraste, legibilidad, tamaño táctil ni desbordamientos. La franja de métricas y varias promesas pueden competir con información necesaria para comprender el alcance real. El desplazamiento suave global no se condiciona a `prefers-reduced-motion` en el código analizado.

**Mejora.** Verificar visualmente ambos idiomas y los viewports propuestos, mantener solo afirmaciones sustentadas o claramente ilustrativas, y respetar preferencias de movimiento reducido.

**Criterio de cierre.** La revisión visual documenta legibilidad y ausencia de solapamientos; las cifras no se presentan como resultados demostrados. HEU-09 y HEU-10.

#### 9. Ayuda para reconocer, diagnosticar y recuperarse de errores

**Evidencia favorable.** El formulario informa si faltan datos y si el correo es inválido, manteniendo el estado mientras se corrige.

**Problema.** El mensaje es general y no se vincula con `aria-describedby` ni se identifica el campo con `aria-invalid`. No existe manejo de error de envío porque no hay envío; documentarlo como tal sería incorrecto. Después de confirmar tampoco hay recuperación hacia edición.

**Mejora.** Asociar cada error con su entrada, anunciar el aviso y ofrecer regreso a edición. La solución debe mantener el carácter local de la demostración.

**Criterio de cierre.** Un participante puede identificar el campo incorrecto y corregirlo, también mediante teclado y tecnología de asistencia. HEU-06 y HEU-07.

#### 10. Ayuda y documentación

**Evidencia favorable.** El FAQ y los cuatro pasos ofrecen explicaciones visibles. El README documenta el desarrollo, aunque no es ayuda destinada al visitante final.

**Problema.** Los enlaces de documentación, soporte, términos y privacidad apuntan a `#`. El formulario menciona aceptación de una política que no tiene un destino informativo real. Las respuestas del FAQ describen seguridad, portales e importación como capacidades disponibles, sin respaldo funcional en el incremento.

**Mejora.** Presentar ayuda y condiciones reales del prototipo, retirar enlaces sin contenido útil o identificarlos claramente como futuros, y revisar la redacción de las funciones proyectadas.

**Criterio de cierre.** Los enlaces de ayuda abren contenido pertinente y el FAQ diferencia con claridad prototipo y visión. HEU-04 y HEU-09.

#### Registro consolidado de hallazgos

| ID | Hallazgo | Archivo/evidencia | Severidad preliminar | Acción y criterio de comprobación |
|---|---|---|---:|---|
| HEU-01 | Confirmación promete accesos sin envío real. | `CtaSection.vue`, textos `cta.successText`. | 3 | Declarar demostración local y comprobar interpretación del mensaje. |
| HEU-02 | Etiqueta TEA y transformación proporcional no coinciden. | `LoanSimulator.vue`, `simulator.rate`. | 3 | Alinear tasa y fórmula; verificar caso conocido y tasa cero. |
| HEU-03 | Cambio de idioma cambia moneda sin conversión; planes usan símbolo fijo. | `src/i18n.js`, `PricingSection.vue`. | 2 | Separar moneda e idioma o aclarar muestras; nombrar moneda de planes. |
| HEU-04 | Login y enlaces secundarios no tienen destino útil. | `TheHeader.vue`, `TheFooter.vue`. | 2 | Probar todos los enlaces y eliminar destinos ficticios. |
| HEU-05 | Redondeo altera el descuento anunciado. | `Math.round(monthly * 0.8)`. | 2 | Consistencia entre importe mostrado, cálculo y texto. |
| HEU-06 | Campos sin etiquetas persistentes y errores no asociados. | `CtaSection.vue`. | 3 | Etiquetas, relación de errores y anuncios accesibles; revisión de teclado y asistencia. |
| HEU-07 | No se puede editar tras confirmar el formulario. | Estado `enviado` y render condicional. | 2 | Acción de regreso a edición sin recarga. |
| HEU-08 | Selección exacta depende únicamente de sliders. | `LoanSimulator.vue`. | 1 | Observar dificultad antes de decidir incorporar entrada numérica. |
| HEU-09 | Métricas y promesas pueden parecer resultados comprobados. | `StatsBand.vue`, diccionario y FAQ. | 3 | Identificar contenido ilustrativo y diferenciar producto futuro. |
| HEU-10 | Responsive, contraste y movimiento requieren validación adicional. | CSS y ausencia de registros de navegador. | 1 | Ejecutar revisión visual y de movimiento; prioridad sujeta a resultados. |

## 5.2.2. Sprint 2

**Corte de implementación:** 03/10/2026. **Revisión documental remota:** 04/10/2026. El incremento de CREDITOR incorpora consulta de obligaciones, registro de compras, abonos e historial con datos de demostración. Esta revisión utiliza los archivos de `develop`, el registro de ejecución y los commits consultables mediante GitHub.

El informe y sus evidencias ya están disponibles en el repositorio remoto. La implementación nueva de landing y frontend continúa descrita por la evidencia del 03/10 como local: no se encontró un remoto de `creditor-web-app` entre los repositorios accesibles de la organización. Los resultados de pruebas se citan del registro existente; no se han vuelto a ejecutar en esta revisión documental.

## 5.2.2.1 Sprint Planning 2

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

### Alcance y criterios de revisión

- Incluido: US-004–007, ajustes de US-001–003, ES/EN, accesibilidad, reglas de compra/abono, evidencia y documentación.
- Próximo incremento: US-008/009, API propia, autenticación, autorización, transacciones y persistencia de servidor.
- Fechas de inicio/fin, horario, lugar, participantes y capacidad del sprint: el equipo debe confirmarlos; el 03/10 es la fecha de evidencia técnica, no una duración inferida.

### Definition of Done para aceptación del incremento

1. La historia satisface sus criterios del [capítulo III](03-requirements-specification.md).
2. El código y su commit de entrega pueden revisarse y reproducirse.
3. Build y pruebas pertinentes tienen un resultado registrado para la versión evaluada.
4. Monedas, validaciones, errores, navegación e idiomas conservan las reglas del dominio.
5. La documentación diferencia datos de demostración de operaciones de servidor.
6. El equipo registra revisión y aceptación. Si el criterio del hito exige publicación, se añade su URL y evidencia de deployment.

La evidencia técnica disponible permite **To-Review**; no permite declarar velocidad aceptada ni todas las historias Done sin el cierre del equipo.

## 5.2.2.2 Aspect Leaders and Collaborators

La matriz siguiente propone la revisión del incremento a partir de los roles históricos; no acredita una asignación acordada en reunión. Los commits de preparación del informe consultados en GitHub están asociados a @MiguelAngel0107. La propuesta de roles no acredita reuniones ni revisión de los demás integrantes.

| Integrante | GitHub | Producto/investigación | Diseño/revisión visual | Implementación/integración | Estado de acuerdo |
|---|---|---|---|---|---|
| Santos Torres, Juan Manuel | JuanManuel312 | L | C | C | Por confirmar para TB1. |
| Gutarra Velapatiño, Sebastián | SebastianGutarra | C | L | C | Por confirmar para TB1. |
| Egocheaga Suyo, Miguel Angel | MiguelAngel0107 | C | C | L | Autor comprobado de los commits de preparación del informe. |

L = líder propuesto del aspecto. C = colaborador propuesto. Los aportes realizados se comprueban con el historial; el Performance Report los evalúa por separado.

## 5.2.2.3 Sprint Backlog 2

El tablero del curso en Trello/Jira/YouTrack queda pendiente de sincronización. Esta tabla local conserva los work-items textuales para revisión, con estimaciones propuestas en horas; no son horas trabajadas.

| Story | Task | Descripción | Est. h | Assigned to | Estado de aceptación |
|---|---|---|---:|---|---|
| US-004 | T2-01 | Dashboard de saldos separados por moneda y vencimientos. | 4 | Miguel, preparación local | Implementación local; ver evidencia de ejecución. |
| US-004 | T2-02 | Filtros por proveedor/estado/moneda y rutas a detalle. | 3 | Miguel, preparación local | Implementación local; ver evidencia de ejecución. |
| US-005 | T2-03 | Formulario de compra con proveedor, moneda, importe, fecha y comprobante demo. | 5 | Miguel, preparación local | Implementación local; ver evidencia de ejecución. |
| US-005 | T2-04 | Validar campos, tenant de proveedor y manejo de errores. | 3 | Miguel, preparación local | Implementación local; ver evidencia de ejecución. |
| US-006 | T2-05 | Registrar abono y conservar historial/saldo en centavos. | 4 | Miguel, preparación local | Implementación local; ver evidencia de ejecución. |
| US-006 | T2-06 | Rechazar importe superior al saldo y conservar formulario. | 2 | Miguel, preparación local | Implementación local; ver evidencia de ejecución. |
| US-007 | T2-07 | Detalle con total, movimientos, fecha y referencia del voucher. | 3 | Miguel, preparación local | Implementación local; ver evidencia de ejecución. |
| US-001/003 | T2-08 | Landing CREDITOR, CTA por segmento y destinos legales. | 4 | Miguel, preparación local | Implementación local; ver evidencia de ejecución. |
| US-002 | T2-09 | Contacto de demostración honesto, sin prometer envío de email. | 2 | Miguel, preparación local | Contrato ajustado al alcance local. |
| Calidad | T2-10 | Inglés/es419, teclado, responsive y casos automatizados. | 4 | Miguel, preparación local | Verificación técnica local. |
| Report | T2-11 | Investigación, requisitos, modelos y evidencia de Sprint 2. | 5 | Miguel, preparación local | Preparado; fuentes humanas pendientes identificadas. |
| Entrega | T2-12 | Capturas, PDF, Keynote, formato performance y guion. | 4 | Miguel, preparación local | Artefactos locales; revisión del equipo pendiente. |

Total estimado propuesto: 43 horas. Los estados To-do/In-Process/To-Review/Done del tablero académico se confirmarán con el equipo; la entrega local técnica pasa a To-Review con sus resultados de prueba.

### Trazabilidad entre historias y cambios

| Historia / aspecto | Cambios registrados | Evidencia de aceptación disponible |
|---|---|---|
| US-004: obligaciones | `c545241`, dashboard, proveedores y filtros. | Captura dashboard y registro local de pruebas; revisión del equipo pendiente. |
| US-005: compra | `65d32b9`, `c545241`, reglas y formulario. | Pruebas de dominio y escenario de compra de PEN 100. |
| US-006: abono | `ee71505`, regla de saldo. | Abono de PEN 30 y rechazo de PEN 71 frente a saldo 70. |
| US-007: historial | `8f50367`, `799dbe3`. | Detalle, historial y persistencia después de recargar. |
| US-001–003: landing | `8fdd291`, `099ed12`, `ed3f923`. | CTA a aplicación local, contacto de demostración y páginas legales. |
| Calidad | `62eceff`, `c907c5a`, `fa9155c`. | Pruebas registradas y capturas ES/EN, escritorio/móvil. |
| Informe | `b9a2bb4`, `775efaf`, `967ff5f`. | Sprint, criterios y evidencia publicados en el repositorio del report. |

Los SHA de landing/frontend proceden del inventario local y no se presentan como commits remotos comprobados. Los SP y las horas son estimaciones distintas: **26 SP** para cuatro historias de frontend y **43 horas propuestas** para las doce tareas, incluyendo trabajos adicionales.

## 5.2.2.4 Development Evidence for Sprint Review

El inventario de preparación contiene **41 commits: 18 de report, 8 de landing y 15 de frontend**, incluidos merges. Se conserva cada mensaje, autor y fecha del [registro de origen](tb1/commits-locales.md). El 04/10/2026 se comprobaron individualmente los 18 SHA del informe en GitHub y se añadieron sus enlaces. La consulta de los ocho SHA de landing no devolvió commits accesibles; se mantienen como evidencia local registrada. El frontend no dispone de un remoto identificado en la organización consultada.

Este inventario cubre la preparación TB1 descrita por la fuente, no todo el historial de vida del proyecto. Los merges documentan integración y no se cuentan como funcionalidades adicionales. Las evidencias de otros integrantes se conservan en [información del proyecto](00-project-information.md).

### Commits del informe



| SHA | Fecha | Autor y correo | Mensaje | Body |
|---|---|---|---|---|
| [c2b7288](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/c2b72880dfea0d40c54031579d0a2ab8ae0d3d69) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | docs(gitflow): define local TB1 feature and release workflow | Sin body |
| [4bfa283](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/4bfa2839455010109b987127c54aced3c73a7a1a) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | chore(gitflow): integrate local workflow conventions | Sin body |
| [b9a2bb4](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/b9a2bb410d1927b09e2076edea40d5b5442b363f) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | docs(sprint): prepare sprint two and preserve AV1 evidence | Sin body |
| [f16e8bd](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/f16e8bdcc4bb725871d9c8779861b9b825b0140c) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | docs(evidence): define reproducible local TB1 verification | Sin body |
| [6d170fe](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/6d170fe8f97ac0cedfa0a2fbf45c18aa863a89ec) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | chore(gitflow): integrate sprint two preparation | Sin body |
| [d6d1c47](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/d6d1c47064683e42af6b681610be1ba9d152df7a) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | docs(ux): add local purchase and payment wireframes | Sin body |
| [084ad9a](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/084ad9a599cbcdd588c3477105d3c82108f59062) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | docs(research): reconcile Lean UX competitors and interview evidence | Sin body |
| [775efaf](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/775efaf733ddb1e25a51897dd92df2a4d2adbe5e) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | docs(requirements): align epics acceptance rules and TB1 backlog | Sin body |
| [3b5fb45](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/3b5fb452ad1d7970f64ae45882e80ca87950ed4d) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | docs(architecture): align frontend containers classes and database | Sin body |
| [a3afc51](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/a3afc5151398248704cfc70aa535b90da19d26ef) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | docs(design): align TB1 screens flows and local execution captures | Sin body |
| [8154fc5](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/8154fc597d37710e91bb83e5d08b00f95a58a3a7) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | chore(gitflow): integrate local UX corrections | Sin body |
| [1546f42](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/1546f423c93b59b7e5d92da6134363b10bb4a67e) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | chore(gitflow): integrate TB1 research corrections | Sin body |
| [23976e8](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/23976e8862cb42f8b16e830e6b9bd51bd52b0c65) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | chore(gitflow): integrate requirements and model alignment | Sin body |
| [691f63c](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/691f63c8eec11c2ab4bbeb9895cbecbe647d15cf) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | docs(outcome): record verified TB1 contributions and report index | Sin body |
| [2d8dcb2](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/2d8dcb229883adaa142d38bf540b7c8cde820bbe) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | docs(delivery): update TB1 conclusions annexes and submission scope | Sin body |
| [ef18b2b](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/ef18b2b47f4a42f0f57a69f96cac9ead144e339e) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | docs(report): correct profile version table and purchase wireframe | Sin body |
| [967ff5f](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/967ff5f9d66e18cdfacac9cc964af55b16b3cafa) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | docs(evidence): record verified local tests and payment screenshots | Sin body |
| [ca3ee09](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report/commit/ca3ee095fd3c3a736d597b1c32c66892387a8474) | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | build(delivery): add reproducible local TB1 export and packaging tools |



- `feature/tb1-auditoria-prompt 3f8f34d`
- `feature/tb1-delivery ca3ee09`
- `feature/tb1-requirements-design 3b5fb45`
- `feature/tb1-research 084ad9a`
- `feature/tb1-sprint-evidence f16e8bd`
- `feature/tb1-ux-alignment a3afc51`
- `feature/tb1-workflow c2b7288`

### Commits de landing



| SHA | Fecha | Autor y correo | Mensaje | Body |
|---|---|---|---|---|
| 8fdd291 | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | feat: present CREDITOR accounts payable content | Sin body |
| 5bc3d41 | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | merge: integrate CREDITOR landing content | Sin body |
| 099ed12 | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | feat: connect segment calls to action to configurable frontend | Sin body |
| 1ba613b | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | merge: integrate frontend navigation | Sin body |
| ed3f923 | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | feat: make local contact demo and legal pages accessible | Sin body |
| 410b973 | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | merge: integrate accessible local contact and legal pages | Sin body |
| 62eceff | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | fix: validate TB1 loan math and local quality workflow | Sin body |
| cc1b4cf | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | merge: integrate verified local TB1 quality checks |



- `feature/contact-accessibility ed3f923`
- `feature/creditor-content 8fdd291`
- `feature/frontend-navigation 099ed12`
- `feature/tb1-quality-local 62eceff`

### Commits de frontend



| SHA | Fecha | Autor y correo | Mensaje | Body |
|---|---|---|---|---|
| e292287 | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | feat(app): add Vue PrimeVue Material and bilingual application shell | Sin body |
| beeff2a | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | chore(gitflow): integrate application foundation | Sin body |
| 65d32b9 | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | feat(purchases): enforce tenant scoped credit purchase rules and local persistence | Sin body |
| c545241 | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | feat(purchases): add dashboard supplier list filters and purchase registration | Sin body |
| b64c67d | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | chore(gitflow): integrate accounts payable feature | Sin body |
| ee71505 | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | feat(payments): add payment history and enforce remaining balance | Sin body |
| 9625af0 | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | chore(gitflow): integrate purchase payments | Sin body |
| 8f50367 | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | fix(payments): connect history records and translated heading | Sin body |
| c907c5a | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | test(tb1): verify browser payment flow and accessible navigation | Sin body |
| f9cda20 | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | docs(tb1): document local execution contracts and release workflow | Sin body |
| 5895830 | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | chore(gitflow): integrate local quality checks | Sin body |
| fa9155c | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | fix(i18n): preserve UTF-8 Spanish and page metadata | Sin body |
| 1cf715d | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | chore(gitflow): integrate text encoding correction | Sin body |
| 799dbe3 | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | fix(payments): make payment history readable on desktop and mobile | Sin body |
| f4d367f | 2026-10-03 | MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com> | chore(gitflow): integrate payment history layout |



- `feature/accounts-payable c545241`
- `feature/app-foundation e292287`
- `feature/payment-history-layout 799dbe3`
- `feature/purchase-payments ee71505`
- `feature/tb1-copy-encoding fa9155c`
- `feature/tb1-quality-local f9cda20`


## 5.2.2.5 Execution Evidence for Sprint Review

La [evidencia de ejecución](tb1/evidencia-local.md) registra comandos y resultados de build/test y las capturas de escenarios desktop/mobile. Se prueba la regla de saldo, moneda, tenant y validación de formularios. El video de navegación del equipo queda pendiente; las capturas locales no sustituyen ese video.

### Resultados de ejecución registrados el 03/10/2026

| Producto | Versión evaluada | Comando | Resultado consignado |
|---|---|---|---|
| Landing | `cc1b4cf` | `npm test`; `npm run build`; `npm audit --omit=dev` | 12 pruebas aprobadas, build aprobado y 0 vulnerabilidades de producción. |
| Frontend: dominio | `1cf715d` | `npm ci`; `npm test` | Instalación reproducible y 14 pruebas de dominio aprobadas. |
| Frontend: navegador y build final | `f4d367fa18fab41408a37bda873325078618a2d4` | `npm run test:e2e`; `npm run build` | 2 pruebas de navegador y build aprobados después del ajuste del historial. |

Fuente: [evidencia técnica](tb1/evidencia-local.md). Entorno registrado: Windows, Node.js 24.21.0, npm 11.19.0 y Microsoft Edge para Playwright. Estas versiones corresponden al registro recibido, sin comprobación de instalación en esta revisión.

| Escenario | Resultado registrado | Evidencia |
|---|---|---|
| Compra PEN 100 + abono PEN 30 | Saldo PEN 70 y un movimiento; persiste al recargar. | [Saldo](../assets/ux/tb1/frontend-balance-es.png), [historial](../assets/ux/tb1/frontend-history-es.png). |
| Intento de abono PEN 71 con saldo 70 | Rechazo, entrada conservada y sin cambio del saldo/historial. | [Error de abono](../assets/ux/tb1/frontend-payment-error-form.png). |
| Navegación landing → frontend | CTA a dashboard y registro de compra locales. | [Registro JSON](../assets/ux/tb1/execution.json). |
| Formulario de contacto | Errores visibles; confirmación informa que nada fue enviado ni guardado. | [Validación](../assets/ux/tb1/landing-contact-errors.png), [confirmación](../assets/ux/tb1/landing-contact-demo.png). |
| Escritorio/móvil | 1440 × 1000 y 390 × 844; sin desbordamiento en las vistas registradas. | [Dashboard](../assets/ux/tb1/frontend-dashboard-en.png), [móvil](../assets/ux/tb1/frontend-mobile-es.png). |

El JSON registra `2026-10-03T19:37:15.375Z`, saldo PEN 70.00, rechazo de sobreabono, ausencia de desbordamiento en ambas páginas y lista vacía de errores de página. No demuestra por sí solo cobertura de todas las rutas ni una auditoría completa de accesibilidad.

![Dashboard de obligaciones en inglés](../assets/ux/tb1/frontend-dashboard-en.png)

![Detalle de compra y saldo en español](../assets/ux/tb1/frontend-detail-es.png)

![Rechazo de un abono superior al saldo](../assets/ux/tb1/frontend-payment-error-form.png)

## 5.2.2.6 Services Documentation Evidence for Sprint Review

La frontend utiliza un repositorio de datos local de demostración. La separación del adaptador permite integrar la API propia en AV2. Contratos previstos: GET/POST /api/v1/purchases, POST /api/v1/purchases/{purchaseId}/payments y consulta de proveedores. No se anuncia OpenAPI disponible ni respuestas de red ejecutadas de esos servicios. La persistencia local no ofrece autenticación real, almacenamiento privado de comprobantes ni concurrencia multiusuario.

### Contratos previstos para el siguiente incremento

| Operación prevista | Finalidad | Respuestas propuestas | Estado Sprint 2 |
|---|---|---|---|
| GET `/api/v1/purchases` | Consultar obligaciones con filtros y paginación por organización. | 200; 401/403 sin autorización. | Diseño, TS-001 pendiente. |
| POST `/api/v1/purchases` | Registrar compra según R-01–06. | 201; 400/422 para datos inválidos; 401/403. | Diseño, TS-001 pendiente. |
| POST `/api/v1/purchases/{purchaseId}/payments` | Registrar abono y actualizar saldo de forma atómica. | 201; 404 compra inaccesible; 422 sobreabono. | Diseño, TS-002 pendiente. |
| OpenAPI | Describir autenticación, parámetros, schemas y respuestas reales. | Contrato concordante con servicio ejecutado. | TS-003 pendiente. |

Fuente: [Technical Stories](03-requirements-specification.md#331-technical-stories). El proveedor debe pertenecer a la organización; la compra conserva moneda PEN/USD, referencia, descripción, importe y fechas. El abono hereda la moneda y no supera el saldo. Los errores HTTP son objetivos del diseño; las validaciones del navegador no equivalen a respuestas ejecutadas del backend.

## 5.2.2.7 Software Deployment Evidence for Sprint Review

| Producto | Versión observada | Resultado |
|---|---|---|
| Landing AV1 | cf734ff, 18/09/2026 | Publicación histórica en Pages, documentada en capítulo V. |
| Landing TB1 | Nuevos commits locales | Build y previsualización local; sin deployment nuevo. |
| Frontend TB1 | Repositorio local creditor-web-app | Build y previsualización local; sin remoto ni deployment. |

El usuario debe publicar las dos versiones para cumplir el criterio de TB1 del curso. Esa acción fue excluida de la preparación actual y no se presenta como pendiente técnico resuelto.

## 5.2.2.8 Team Collaboration Insights during Sprint

La preparación corrige el dominio de cartera de créditos a cuentas por pagar, reintegra la release anterior y separa implementación, datos locales, pruebas y despliegue. Los commits nuevos usan la cuenta de Miguel. Los insumos de Juan y Sebastián se reconocen en la evidencia histórica del capítulo 00; no se les atribuye el código nuevo sin commits o artefactos propios.

Pendientes del equipo: validar LACX, registrar reuniones/tablero, completar investigación S2/análisis, revisar diseños en herramientas requeridas, grabar navegación/exposición y validar desempeño individual. La revisión técnica local y los límites se detallan en [control TB1](09-tb1-delivery-checklist.md).

### Acuerdos necesarios para cerrar la revisión

| Información | Situación comprobada | Dato que debe proporcionar el equipo |
|---|---|---|
| Planning y cierre | No hay actas en las fuentes consultadas. | Inicio/fin, fecha/hora/lugar, asistentes y acuerdos. |
| Responsabilidades | Autoría de report comprobada; roles de colaboración propuestos. | Líder y colaboradores acordados por aspecto. |
| Tablero y aceptación | Backlog textual disponible. | URL/captura del tablero e historias aceptadas. |
| Aplicación remota | Frontend descrita como repositorio local. | URL del repositorio y rama, si ya se creó. |
| Deployment nuevo | Solo publicación histórica de AV1 referenciada. | URL, SHA, run/fecha y capturas de landing/frontend nuevas, si existen. |
| Colaboración y video | Documentación técnica e historial disponibles. | Reuniones/revisiones reales y enlace de grabación. |

## Conclusiones, Bibliografía y Anexos

El cierre integral del informe se mantiene en [Conclusiones y recomendaciones](06-conclusions-recommendations.md) y [Bibliografía y anexos](07-bibliography-appendices.md). Esas secciones reúnen los resultados del incremento, sus límites, fuentes e inventario de evidencias.
