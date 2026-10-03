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

Los resultados y SHA de implementación se incorporarán después de ejecutar las comprobaciones. Un comando propuesto o una casilla pendiente no representa una prueba aprobada.

## Límites de la demostración

- El adaptador del frontend usa datos de demostración y almacenamiento en el navegador. No acredita autenticación, API REST ni seguridad multiusuario.
- La separación por organización en el adaptador permite comprobar reglas de dominio. La autorización del servidor corresponde al backend futuro.
- Los adjuntos de demostración no acreditan almacenamiento privado remoto de comprobantes.
- El formulario de contacto debe informar si su confirmación es exclusivamente local.
- El despliegue histórico de la landing del 18/09/2026 no prueba la publicación de los cambios TB1.

## Evidencia humana pendiente

Se requiere confirmar planning y LACX con el equipo, completar dos entrevistas del segmento S2 y analizar los relatos con citas y minutos, validar los artefactos en las herramientas exigidas, registrar la aceptación de las historias y la evaluación del Team Leader, y grabar la exposición. Estas actividades no se sustituyen con commits o capturas de ejecución local.
