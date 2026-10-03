# Guion de exposición TB1

## Sustentación de 12 minutos

| Tiempo | Integrante propuesto | Contenido y demostración |
|---|---|---|
| 00:00–01:00 | Juan | Equipo, problema, segmentos y objetivo del incremento. |
| 01:00–04:00 | Sebastián | Correcciones AV1: marca/dominio, hipótesis, investigación, pantallas y modelos; indicar pendientes con precisión. |
| 04:00–09:00 | Miguel | Demo local: landing CTA propietario, dashboard por moneda, nueva compra PEN100, detalle, abono30/saldo70, rechazo71 e inglés/español. |
| 09:00–12:00 | Los tres | Features/commits, pruebas, división histórica y trabajo local, límites de datos demo, pendientes de publicación y evidencia del equipo. |

Distribución: introducción 8.3%, mejoras 25%, demo 41.7%, colaboración 25%. La asignación de exposición es una propuesta que debe ensayar y aprobar el equipo.

## Preparación de grabación

El video pregrabado del curso tiene máximo 30 minutos. Presentar cada integrante ante cámara, sincronizar explicación con PPT y demostración, mostrar artefactos legibles y conservar un único MP4. Publicar en Stream y añadir enlace privado con permisos docentes es una tarea posterior del equipo. No existe grabación creada en esta preparación.

## Escenario reproducible de demostración

1. Ejecutar frontend en puerto5174 y landing en5173.
2. Restablecer datos demo desde el control de la aplicación para obtener una base conocida.
3. Abrir landing e identificar propietario/administrador y el destino de cada CTA.
4. Mostrar saldos PEN/USD separados y filtros de obligaciones.
5. Registrar una compra con datos válidos y comprobar importe/moneda/vencimiento.
6. Registrar abono30 en compra100; confirmar el historial y saldo70.
7. Intentar71 para comprobar rechazo y preservación de datos.
8. Cambiar idioma sin cambiar moneda; demostrar navegación de teclado y viewport móvil.
9. Mostrar tests/build e historial de branches locales, diferenciando lo preparado de lo publicado.

Preguntas a preparar: cálculo del saldo en centavos, límites de localStorage, aislamiento demo por organización, diferencia idioma/moneda, reemplazo del adaptador por API, uso de PrimeVue y reglas GitFlow.
