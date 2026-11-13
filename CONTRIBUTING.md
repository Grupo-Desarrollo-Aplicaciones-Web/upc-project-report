# Guía de colaboración

## GitFlow

| Rama | Origen | Propósito | Integración |
|---|---|---|---|
| `main` | Inicialización | Entrega estable revisada. | Recibe una release aprobada o hotfix. |
| `develop` | `main` | Integra el siguiente incremento. | Recibe features y los cambios de cada release/hotfix. |
| `feature/<tema>` | `develop` | Un bloque de contenido o funcionalidad. | Merge `--no-ff` a `develop` después de revisión y checks. |
| `release/<major.minor.patch>` | `develop` | Correcciones finales y versión de entrega. | Merge a `main`, tag SemVer y reintegración a `develop`. |
| `hotfix/<tema>` | `main` | Corrección urgente de una versión estable. | Merge a `main` y `develop`, o a la release activa. |

Las correcciones del próximo incremento pueden vivir en `feature/<tema>`. Los nombres históricos `docs/*` y `fix/*` se conservan. Una feature dependiente identifica su base y se integra después de ella.

## Preparación local de TB1 y AV2

El trabajo actual permanece en local y no ejecuta publicación ni despliegue. No se hace push ni se crean PR remotos.

1. Revisar status, identidad, ramas y diferencias antes de editar.
2. Crear una feature desde develop actualizado, preservando archivos previos.
3. Hacer commits por cambios lógicos y agregar rutas concretas.
4. Ejecutar checks de enlaces, diagramas, formato y ejecución pertinentes.
5. Revisar el diff y registrar la revisión local antes de integrar.
6. Integrar con --no-ff a develop y conservar las features para revisión del usuario.
7. Preparar una release cuando los criterios del hito estén completos y revisados.

No usar reset --hard, git clean, force push ni reescritura de autores para resolver diferencias. Las correcciones de una release vuelven a develop para conservarlas en la siguiente entrega.

## Commits e identidad

Formato: `tipo(alcance): descripción breve`. Tipos: docs, feat, fix, test, ci, chore.

```text
docs(research): align interview records and hypotheses
docs(sprint): record local Sprint 2 execution
fix(design): align purchase flows with domain rules
chore(gitflow): integrate reviewed research feature
```

Cada integrante usa su identidad personal. Los commits solicitados por Miguel en esta preparación local usan `MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com>`. Se conservan las identidades anteriores y se atribuyen aportes de otros integrantes solo con evidencia.

## Versionado y evidencias

SemVer: cambio incompatible incrementa major, funcionalidad compatible incrementa minor y corrección incrementa patch. El registro documental indica qué versión de cada producto acompaña una entrega.

Guardar recursos en assets con nombres descriptivos y texto alternativo. Conservar fuentes Mermaid y exportaciones sincronizadas. Cada captura indica fecha, producto, commit, escenario y ancho.

Planificación, implementación, prueba y publicación son estados distintos. Un formulario o plantilla no acredita una actividad realizada. Los datos de demostración se identifican como tales. El líder valida el Performance Report y sus calificaciones.


## Fuente canónica y revisión documental AV2

Editar el informe completo en README.md. Los nueve archivos de capítulos en docs son vistas sincronizadas, no fuentes independientes. Después de un cambio:

```powershell
python tools/tb1/update_index.py
python tools/report/sync_chapters.py
python tools/report/validate_report.py
python tools/report/validate_av2.py
```

El último validador comprueba cobertura del barrido de apartados, enlaces locales, fuentes/SVG y coincidencia del SQL con su snapshot. Las URLs externas y evidencia humana requieren revisión aparte. Mantener los hashes y bytes de assets/evidence y assets/history; no actualizar una evidencia antigua para hacerla pasar por un nuevo resultado. El workflow Word compila únicamente README para evitar duplicar capítulos.
