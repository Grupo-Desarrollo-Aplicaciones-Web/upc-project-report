> Vista sincronizada del [informe canónico](../README.md), corte AV2 13/11/2026. Para editar contenido, modificar README y ejecutar `python tools/report/sync_chapters.py`.

# Capítulo III: Requirements Specification

Los requisitos conservan las historias US-001–009. El alcance técnico se contrasta con los repositorios de frontend y backend; la aceptación del equipo y la validación de valor se registran por separado. Los segmentos S1/S2 no son permisos: los roles de API son `Owner`, `FinanceAdmin` y `Viewer`.

## 3.1 User Stories

### 3.1.1 Epics y To-Be Scenario Mapping

| Epic | Objetivo | Historias y contexto ejecutable |
|---|---|---|
| E-01 Landing | Comprender propuesta, condiciones y contacto demo. | US-001–003; repositorio landing independiente. |
| E-02 Accounts Payable | Registrar proveedores/compras y consultar obligaciones. | US-004–005; Supplier y Purchase. |
| E-03 Payments | Registrar abonos y reconstruir saldo. | US-006–007; Payment dentro del agregado Purchase. |
| E-04 Reporting | Exportar la misma selección revisada en pantalla. | US-008; consultas de Accounts Payable y adaptador HTTP. |
| E-05 Loans | Conservar principal y compromisos mensuales pactados. | US-009; Loan y LoanInstallment. |
| E-06 Service Integration | Autenticación, persistencia, contratos y servicio externo. | TS-001–003; Identity, EF Core, Scalar y BCRPData. |
| Treasury, extensión AV2 | Distinguir saldo de caja y propiedad económica. | Cuentas, movimientos, proyectos y asignaciones. No redefine US-006 como transferencia. |

### 3.1.2 Functional User Stories

| ID | Historia | Comportamiento actual y límite |
|---|---|---|
| US-001 | Como visitante quiero conocer CREDITOR. | Landing con propuesta y CTA; su despliegue actual no se revalida en esta auditoría. |
| US-002 | Como visitante quiero revisar el contacto. | Formulario demo; no hay envío de email/solicitud real ni cobro de suscripción. |
| US-003 | Como visitante quiero consultar condiciones. | Vistas de términos/privacidad; el texto no acredita cumplimiento legal certificado. |
| US-004 | Como dueño quiero consultar obligaciones. | API, listado y resumen por negocio; totales PEN/USD separados, estados derivados del saldo/fecha. |
| US-005 | Como administrador quiero registrar compra a crédito. | Proveedor, referencia, descripción, moneda, importe, fechas y comprobante opcional por API protegida. |
| US-006 | Como administrador quiero registrar abonos. | Abonos sucesivos válidos guardan filas distintas; importe máximo igual al saldo. Sin movimiento automático de tesorería. |
| US-007 | Como dueño quiero revisar historial. | Consulta de compra y abonos persistidos con saldo derivado; voucher privado si se adjuntó. |
| US-008 | Como administrador quiero exportar obligaciones filtradas. | Mismos criterios aplicados para listado, resumen y CSV: proveedor, moneda, estado, texto y vencimiento. Cambiar el formulario exige aplicar antes de descargar. |
| US-009 | Como dueño quiero consultar préstamos y cuotas. | Registro por Owner/FinanceAdmin; lectura por cualquier miembro del negocio. Principal, moneda, tasa informativa opcional y cuotas mensuales explícitas. No calcula amortización ni registra pagos de cuotas. |

### 3.1.3 Reglas observables del incremento AV2

| ID | Regla | Implementación y límite |
|---|---|---|
| R-01 | Pertenencia | BusinessId sale del principal JWT; FK compuestas y consultas por negocio. Referencias ajenas devuelven 404 o validación sin acceso al dato. |
| R-02 | Importe | 0.01–9,999,999.99, hasta dos decimales. Purchase/Payment usan decimal; Treasury/Loans persisten centavos enteros. |
| R-03 | Moneda | PEN/USD; cada transacción conserva moneda y los resúmenes no las suman entre sí. |
| R-04 | Compra | Referencia 2–80, descripción 3–200, unicidad de referencia normalizada por proveedor. |
| R-05 | Fechas | Compra desde 2000-01-01 hasta hoy de negocio; vencimiento no anterior, hasta 2100-12-31. Calendario America/Lima. |
| R-06 | Archivos | PDF/PNG/JPEG hasta 2 MiB; metadatos en BD y contenido en almacenamiento privado. La descarga exige acceso a la compra/abono. |
| R-07 | Abono | Positivo, moneda de compra y no mayor al saldo; cada abono nuevo se inserta explícitamente. |
| R-08 | Fecha de abono | No anterior a compra ni futura; nota opcional hasta 200 caracteres. |
| R-09 | Saldo/concurrencia | Amount − suma Payments.Amount. Guardar nuevo Payment y versión Purchase en una transacción; conflicto concurrente no deja abonos parciales. |
| R-10 | Fallos | Error HTTP no se presenta como guardado; consulta fallida se distingue de lista vacía. |
| R-11 | Reporte | Lista, summary y export usan filtros iguales. Exportar no altera saldos; CSV conserva moneda y protege texto interpretable como fórmula. |
| R-12 | Préstamo | Nombre 2–120, principal positivo, 1–60 importes de cuota positivos, suma al menos igual al principal; tasa anual opcional 0–100 con hasta dos decimales. |
| R-13 | Cronograma | Cada vencimiento es firstDueOn.AddMonths(n), anclado a la primera fecha. Próximo vencimiento = primera fecha desde hoy; no significa cuota impaga ni pagada. |
| R-14 | Permisos | Owner administra usuarios. Owner/FinanceAdmin registran operaciones. Viewer consulta; ocultar botones complementa la autorización del servidor. |

### 3.1.4 Acceptance Criteria

```gherkin
Feature: Sequential purchase payments (US-006 and US-007)
  Scenario: Record two valid partial payments
    Given a purchase of PEN 800 belongs to the authenticated business
    When the administrator records PEN 300 and then PEN 50
    Then two distinct payment records are persisted
    And paid amount is PEN 350 and balance is PEN 450
    And another session can read the same history

  Scenario: Concurrent payments cannot exceed the obligation
    Given the purchase balance is PEN 100
    When two requests attempt PEN 70 concurrently
    Then at most one request succeeds
    And the balance and persisted history remain consistent

Feature: Filtered obligation export (US-008)
  Scenario: Same criteria for list, totals and CSV
    Given PEN and USD purchases exist in the authenticated business
    When the user applies supplier, PEN, status and inclusive due-date filters
    Then the list and summary refer to the same selection
    And the downloaded CSV contains only that selection
    And changed but unapplied criteria disable download

Feature: Agreed loan schedule (US-009)
  Scenario: Keep the original monthly anchor and persisted amounts
    Given the owner records a loan with the first due date on January 31
    And explicit monthly amounts cover the principal
    When the agreement is saved and read in a new session
    Then February uses its last valid day and March uses March 31
    And the exact agreed amounts are returned without interest recalculation

  Scenario: Protect access and validate the whole schedule
    Given a Viewer or a user of another business
    When they try to create or access an unauthorized loan
    Then the API rejects the operation
    And invalid amounts, count or dates create no partial loan
```

Los escenarios son criterios; los comandos ejecutados y resultados se registran en [evidencia AV2](../docs/av2/estado-implementacion.md). Las pruebas automáticas no sustituyen aceptación del equipo ni entrevistas de validación. Los casos históricos de navegador TB1 conservan su adaptador y fecha.

## 3.2 Impact Mapping

### 3.2.1 Objetivos SMART propuestos

Se mantiene la propuesta de prueba moderada con cinco participantes: cuatro deberían localizar saldo y vencimiento sin ayuda en dos minutos. No se dispone de línea base ni resultado medido. Para compra, abono, exportación y cronograma se medirá completitud, errores y recuperación con tareas acordadas antes de la sesión.

| Actor | Impacto propuesto | Entregable actual | Validación pendiente |
|---|---|---|---|
| S1 / Rosa provisional | Entender compromisos sin reconstruir registros. | Resumen, historial y cronograma. | Comprensión de saldo vs efectivo y cuota vs pago. |
| S2 / Diego provisional | Registrar y preparar revisión contable. | Compra, abonos, adjuntos y CSV filtrado. | Completar tarea, encontrar errores y comprender filtros. |
| Ambos | Distinguir efectivo propio y de terceros. | Tesorería y asignaciones por propietario. | Verificar vocabulario con usuarios del segmento. |
| Visitante | Identificar alcance y llegar a la aplicación. | Landing y CTA. | Comprensión y accesibilidad de recorrido. |

[Impact Map histórico editable](../assets/research/tb1/impact-map-local.mmd). La sincronización en UXPressia y el acuerdo sobre la extensión Treasury permanecen pendientes; la implementación no prueba demanda.

## 3.3 Product Backlog

Story points son estimaciones relativas históricas, no horas trabajadas. To-Review describe código local que requiere aceptación académica y no equivale a deployment.

| ID | Prioridad / SP históricos | Estado técnico AV2 | Aceptación pendiente |
|---|---|---|---|
| US-001–003 | Must / 3,5,2 | Landing existente; contacto demo. | Revisión/publicación del corte que se entregue. |
| US-004–005 | Must / 8,8 | UI conectada y API para consulta/registro. | Validación con usuarios y revisión de equipo. |
| US-006–007 | Must/Should / 5,5 | Historial y abonos sucesivos persistidos. | Aceptación del flujo y límites de tesorería. |
| US-008 | Should / 5 | Filtros y CSV conectado. | Revisión de archivo por el usuario objetivo. |
| US-009 | Could / 8 | Acuerdos y cuotas explícitas persistidos. | Aceptar alcance sin amortización/pago de cuotas. |

El [Sprint 3](../docs/sprints/sprint-03.md) organiza los incrementos locales AV2. El equipo debe vincularlos al tablero real y confirmar responsabilidades; no se reconstruyen reuniones ni horas consumidas.

### 3.3.1 Technical Stories

| ID | Contrato implementado | Alcance verificable |
|---|---|---|
| TS-001 | GET/POST `/api/v1/suppliers` y `/api/v1/purchases`; detalle y resumen. | Autenticación, paginación, filtros, validaciones y negocio aislado. |
| TS-002 | GET/POST `/api/v1/purchases/{id}/payments`. | Historial, abonos sucesivos y concurrencia de agregado. |
| TS-003 | OpenAPI y Scalar; rutas documentadas y modelos. | La UI de docs consume el contrato generado del backend. Evidencia final en capítulo V. |
| Extensión persistencia | MySQL 8.4, migraciones EF, pruebas con datos ficticios. | Cambio de proveedor y cadena propia; no es conversión automática de archivos SQLite o base PostgreSQL existente. |
| Extensión externa | GET `/api/v1/exchange-rates/reference`. | Cotización referencial BCRPData/SBS; timeout/caché/errores sin tasas inventadas. La UI no consume hoy esta ruta. |
