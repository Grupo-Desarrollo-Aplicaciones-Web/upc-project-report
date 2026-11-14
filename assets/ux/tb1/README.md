# Diseño local para TB1

- `wireframes.html`: fuente editable de cinco pantallas y estados alternativos para US-004–007, escritorio/móvil.
- `wireflow.html`: recorrido local por pantallas de compra y abono con alternativas.
- `landing-wireframes.html`: estructura vigente de landing en escritorio/móvil; exportaciones `wireframe-landing-*-desktop.png` y `wireframe-landing-*-mobile.png`.
- `wireframe-*-mobile.png`: cinco pantallas de la aplicación a 390 px, con información y estados alternativos.
- `design-execution.json`: fecha/viewports de estas exportaciones y del contacto móvil de la landing; `capture_designs.cjs` conserva la fuente reproducible.
- Las capturas `frontend-*.png` y `landing-*.png` proceden de ejecución local, no de Figma.
- El prototipo funcional es `creditor-web-app`, ejecutado en el puerto 5174 con adaptador de demostración.

Las imágenes de AV1 se conservan en `assets/branding/` como referencias históricas. Estos archivos corrigen el alcance hacia cuentas por pagar. La copia a Figma y la revisión del prototipo en la herramienta exigida por el curso quedan pendientes; no se realizaron escrituras remotas durante la preparación.

Datos de ejemplo: proveedor de demostración, compra PEN 100, abono 30, saldo 70. No son resultados de entrevistas ni datos de un negocio real.

Los flows de consulta, compra y abono identifican caminos COMP-01–05, ABO-01–07 y CON-01–05. El capítulo IV relaciona cada camino con el resultado y retorno previsto. Los errores de almacenamiento, la cancelación de diálogo y las validaciones no se confunden con el éxito. La matriz de diseño no representa una prueba de aceptación del equipo.
