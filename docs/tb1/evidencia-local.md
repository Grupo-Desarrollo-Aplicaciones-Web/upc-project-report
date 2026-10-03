# Evidencia técnica local de TB1

## Alcance y reproducibilidad

Corte: **03 de octubre de 2026**. Esta preparación conserva los cambios en el equipo de Miguel. No se ha realizado push, creado un repositorio remoto para la aplicación, cambiado la visibilidad del report ni desplegado la nueva versión.

| Producto | Carpeta local | Rama de integración | Ejecución de desarrollo |
|---|---|---|---|
| Informe | `upc-project-report` | `develop` | Leer `README.md` y los capítulos de `docs/`. |
| Landing | `creditor-landing-page` | `develop` | `npm ci`, `npm run dev -- --host 127.0.0.1 --port 5173` |
| Frontend | `creditor-web-app` | `develop` | `npm ci`, `npm run dev -- --host 127.0.0.1 --port 5174` |

Las carpetas están en `C:\Users\migue\Documents\GitHub\Grupo-Desarrollo-Aplicaciones-Web`. La landing apunta por defecto a la aplicación local. Antes de una futura publicación deben configurarse el destino público y la base del sitio, compilar y verificar las rutas resultantes.

## Registro de ejecución

Las comprobaciones siguientes se ejecutaron el **03/10/2026** sobre el incremento local. El historial del informe se conserva en [commits locales](commits-locales.md); los SHA siguientes identifican el código usado para las capturas y los builds.

| Producto | SHA de código verificado | Comprobación | Resultado observado |
|---|---|---|---|
| Landing | `cc1b4cf` | `npm test`, `npm run build`, `npm audit --omit=dev` | 12 pruebas aprobadas, compilación aprobada, 0 vulnerabilidades en dependencias de producción. |
| Frontend | `f4d367fa18fab41408a37bda873325078618a2d4` | `npm ci`, `npm test`, `npm run test:e2e`, `npm run build` | Instalación reproducible y 14 pruebas de dominio aprobadas en `1cf715d`; después del ajuste CSS del historial, las 2 pruebas de navegador y el build volvieron a pasar en este SHA. La instalación informó 0 vulnerabilidades. |
| Informe | Corte documentado en el historial local y el manifiesto | `python tools/tb1/record_evidence.py` | Referencias locales del Markdown e imágenes resueltas. |

Entorno de código: Windows, Node.js 24.21.0 y npm 11.19.0. Landing: Vue 3.5 y Vite 7.3.6. Frontend: Vue 3.5.43, PrimeVue 4.5.5 con tema Material, Vue Router 4.6.4, Vite 8.3.2 y Vitest 4.1.11. Los `package-lock.json` fijan las dependencias. Playwright 1.63.0 usa Microsoft Edge instalado para las pruebas de navegador.

### Escenario de compra y abono

La prueba de navegador crea una compra ficticia de **PEN 100.00**, registra un abono de **PEN 30.00** y comprueba el saldo **PEN 70.00**. El intento de abonar **PEN 71.00** muestra “El abono no puede superar el saldo pendiente”, conserva el valor del formulario, enfoca el campo y no agrega un movimiento. Después de recargar se conserva el historial y el saldo. La segunda prueba comprueba el detalle inexistente y el acceso directo a las páginas legales.

Las pruebas de dominio cubren importes positivos, PEN/USD por separado, pertenencia del proveedor a la organización, referencias y fechas válidas, restricciones de adjuntos y fallas del almacenamiento. Una prueba aprobada demuestra ese comportamiento en el adaptador local; no demuestra aceptación por usuarios ni autorización del backend.

### Capturas y recorrido integrado

[`assets/ux/tb1/execution.json`](../../assets/ux/tb1/execution.json) registra la fecha y hora UTC de la ejecución real del **03/10/2026**. Las capturas usan escritorio **1440 × 1000** y móvil **390 × 844**, inglés por defecto y español latinoamericano. Los wireframes se capturan desde su fuente HTML local.

| Recorrido | Evidencia | Resultado |
|---|---|---|
| Landing → aplicativo | [Landing](../../assets/ux/tb1/landing-desktop-en.png), destinos registrados en JSON | Los CTA abren `http://localhost:5174/#/dashboard` y `#/purchases/new`; ambas vistas cargaron. |
| Compra → abono → detalle | [Detalle](../../assets/ux/tb1/frontend-detail-es.png), [saldo](../../assets/ux/tb1/frontend-balance-es.png), [historial](../../assets/ux/tb1/frontend-history-es.png) | Saldo PEN 70.00, después de compra de 100 y abono de 30. |
| Intento de sobreabono | [Formulario con error](../../assets/ux/tb1/frontend-payment-error-form.png), [vista completa](../../assets/ux/tb1/frontend-overpayment-es.png) | Mismo escenario: abono 71 rechazado frente a saldo 70. |
| Formulario de contacto | [Validación](../../assets/ux/tb1/landing-contact-errors.png), [confirmación](../../assets/ux/tb1/landing-contact-demo.png) | Valida el ejemplo ficticio, informa que no envió ni guardó datos y limpia los campos. |
| Vista móvil | [Frontend](../../assets/ux/tb1/frontend-mobile-es.png), [landing](../../assets/ux/tb1/landing-mobile-es.png) | Sin desbordamiento horizontal en las vistas capturadas. |

No se observaron errores JavaScript de página en este recorrido. `tools/tb1/capture.cjs` permite repetirlo con ambos servidores locales activos y un perfil temporal de navegador; no captura información personal operativa.

### Revisión de las observaciones recibidas

La [matriz de retroalimentación](feedback-resolution.md) relaciona cada observación con su corrección y la evidencia que permanece pendiente. El 03/10/2026 se capturaron cinco wireframes móviles de la aplicación, cuatro vistas de wireframes de la landing (dos escritorio y dos móvil) y el contacto móvil de la landing ejecutada localmente. El [registro de diseño](../../assets/ux/tb1/design-execution.json) identifica los tamaños de captura y registra ausencia de errores de página y desbordamiento horizontal de la landing. El servidor temporal iniciado por el capturador se detuvo al terminar.

Los diagramas de compra, abono y consulta incluyen 17 caminos identificados y se regeneran desde Mermaid. La matriz del capítulo IV diferencia los caminos documentados de los comprobados por las pruebas ya registradas; estas correcciones de diseño no declaran una nueva ejecución de pruebas del producto.

El exportador del informe comprueba imágenes, enlaces internos y desbordamiento al ancho imprimible de A4. Cada sección numerada inicia una página; si un título padre no tiene contenido propio, comparte el inicio con su primera subsección. El índice enlaza al encabezado correspondiente. El PDF actualizado se revisa visualmente y sus sumas de comprobación se conservan en el manifiesto del paquete.

### Archivos de la entrega local

El paquete de [`deliverables/tb1`](../../deliverables/tb1/README.md) reúne Report PDF, Keynote PPTX/PDF, Performance DOCX/PDF y Supporting ZIP, con fuentes de generación en `tools/tb1/`. Las tablas y diagramas de la presentación son editables. Su comprobación incluye integridad del paquete, geometría, fuente Arial, tablas nativas, suma de los 26 story points y reimportación mediante el generador. Se revisan visualmente las 22 diapositivas y las páginas exportadas.

El formato de desempeño contiene tres páginas, una por integrante, y deja la evaluación al líder. El PDF se exporta desde el DOCX mediante la interfaz Office-compatible disponible en este equipo (WPS Writer). El renderizador canónico de documentos no pudo ejecutarse por ausencia de `soffice.exe`; se revisó visualmente el PDF exportado. No se declara validación en PowerPoint o Microsoft Word ni una calificación emitida.

## Límites de la demostración

- El adaptador del frontend usa datos de demostración y almacenamiento en el navegador. No acredita autenticación, API REST ni seguridad multiusuario.
- El contexto de uso es una organización ficticia fija. La separación de entidades en el adaptador permite comprobar reglas de dominio; la autorización del servidor corresponde al backend futuro.
- Los adjuntos de demostración no acreditan almacenamiento privado remoto de comprobantes.
- El formulario de contacto informa explícitamente que su confirmación es local y que no envió ni guardó datos.
- El despliegue histórico de la landing del 18/09/2026 no prueba la publicación de los cambios TB1.

## Evidencia humana pendiente

Se requiere confirmar planning y LACX con el equipo, completar dos entrevistas del segmento S2 y analizar los relatos con citas y minutos, validar los artefactos en las herramientas exigidas, registrar la aceptación de las historias y la evaluación del Team Leader, y grabar la exposición. Estas actividades no se sustituyen con commits o capturas de ejecución local.
