# Capítulo V: Product Implementation, Validation & Deployment

## 5.1 Software Configuration Management

### 5.1.1 Software Development Environment Configuration

| Herramienta | Versión conocida | Propósito | Estado |
|---|---|---|---|
| Git | Por verificar en cada equipo | Control de versiones y ramas GitFlow. | En uso en el repositorio. |
| GitHub | Servicio web | Revisión, pull requests y publicación de repositorios. | Repositorio de documentación disponible. |
| Markdown | CommonMark | Documentación del informe. | En uso. |
| Node.js y npm | Por registrar en `package.json` del landing | Instalación y compilación de la landing. | Landing existente compila localmente. |
| Vue y Vite | Por registrar en `package.json` del landing | Implementación actual de la landing. | Requiere validación con docente respecto a la tecnología de landing. |
| Figma / UXPressia / FigJam | Pendiente de selección y enlace | Prototipos, needfinding e Impact Map. | Pendiente de evidencia. |
| ASP.NET Core / EF Core | Pendiente de iniciar | Servicios REST de CREDITOR. | Planificado para una iteración posterior. |
| PostgreSQL o MySQL | Pendiente de decisión | Persistencia del modelo de dominio. | Planificado para una iteración posterior. |

### 5.1.2 Source Code Management

Los repositorios usan GitFlow:

- `main`: versiones estables aprobadas.
- `develop`: integración local y remota de features aprobadas.
- `feature/<alcance>`: cambios acotados de documentación o producto.
- `release/<versión>`: preparación de una entrega evaluable.

Cada feature se revisa antes de integrarse mediante un merge no fast-forward. Los commits usan la forma `type(scope): description`, por ejemplo `docs(research): add interview evidence register`.

### 5.1.3 Source Code Style Guide & Conventions

- Markdown usa títulos jerárquicos, tablas con encabezados y enlaces relativos.
- Los nombres de archivos usan minúsculas, guiones y una responsabilidad clara.
- Las imágenes deben tener texto alternativo, fuente y autorización cuando corresponda.
- Las ramas usan minúsculas y guiones; los commits usan Conventional Commits.
- El código futuro seguirá las convenciones de su tecnología y expondrá contratos de API en OpenAPI.

### 5.1.4 Software Deployment Configuration

La landing deberá desplegarse en un servicio público elegido por el equipo, con URL HTTPS registrada en este informe. Antes de desplegar se verificará: título y metadatos CREDITOR, enlaces legales, idioma base, accesibilidad de formulario, CTA funcional y contenido sin afirmaciones no sustentadas.

No existe una URL de despliegue aprobada todavía.

## 5.2 Landing Page, Services & Applications Implementation

La implementación de AV1 se limita a una primera versión desplegable de la landing. La aplicación web y los servicios REST se mantienen planificados en backlog; no se deben presentar como implementados hasta contar con repositorios, código, pruebas y documentación correspondientes.

La documentación detallada de cada iteración se encuentra en [`docs/sprints`](sprints/README.md).

## 5.3 Validation Interviews

### 5.3.1 Diseño de entrevistas

Las entrevistas de validación se diseñarán cuando exista un flujo navegable. Incluirán tareas, guion, consentimiento, criterios de éxito y relación con las historias de usuario evaluadas.

### 5.3.2 Registro de entrevistas

No se han realizado entrevistas de validación de una implementación. La tabla de registros se incorporará con participantes autorizados, enlace privado y resultado de cada tarea.

### 5.3.3 Evaluaciones según heurísticas

La evaluación heurística se realizará sobre una versión navegable, indicando evaluador, pantalla, heurística, severidad, evidencia y decisión de corrección. No se declaran resultados en ausencia de una evaluación real.

## 5.4 Video About-the-Product

- **URL:** Pendiente de grabación, publicación privada en Microsoft Stream y autorización del equipo.

## 5.5 Video About-the-Team

- **URL:** Pendiente de grabación, publicación privada en Microsoft Stream y autorización del equipo.
