# Estado de implementación AV2

Corte documental: **13/11/2026**. Repositorios locales bajo `Documents/GitHub/Grupo-Desarrollo-Aplicaciones-Web`. Los resultados se atribuyen al código ejecutado y al motor indicado. Preparación local, sin push ni release. La revisión de enlaces locales no verifica disponibilidad de servicios externos.

## Correspondencia funcional

| Función visible o requerida | Frontend conectado | Backend | Límite |
|---|---|---|---|
| Registro de negocio/login | Identity; formulario conserva shell original. | Identity/JWT, contraseñas hash, límites de autenticación. | Token en memoria; recargar exige login. |
| Proveedores | Alta con nombre/email/RUC o identificador/telefono. | Supplier y consultas por negocio. | No consulta pública RUC ni validación SUNAT. |
| Compras | Alta, listado, detalle y resumen. | Purchase, FK por negocio y referencia normalizada única. | No factura tributaria ni inventario. |
| Abonos | Alta sucesiva, historial y saldo. | Payment dentro de Purchase; inserción explícita y concurrencia. | No pasarela ni movimiento automático de caja. |
| Comprobante/voucher | Adjuntar y descargar. | Metadata y archivo privado, autorización, tamaño/tipo. | No OCR ni verificación fiscal. |
| Filtros/CSV | Lista, resumen y export usan criterios aplicados. | Queries filtra negocio/texto/proveedor/moneda/estado/vencimiento. | No XLSX ni reporte PDF en servidor. |
| Préstamos | Lista/alta/detalle de cuotas acordadas. | Loan/LoanInstallment con importes explícitos. | Sin amortización automática, desembolso, pagos o estado de cuota. |
| Tesorería | Personas, proyectos, cuentas, movimientos y asignación. | CashAccount y repositorio, requestId idempotente. | Registro manual; sin banco real. |
| Estado de cuenta | Reports lee movimientos/asignaciones. | Rutas de tesorería; la UI compone el reporte. | No confundir con CSV de obligaciones ni estado bancario oficial. |
| Gestión de miembros | No hay formulario específico conectado. | POST /users, solo Owner. | Operable por API/Scalar. |
| Cotización externa | No hay vista específica conectada. | BCRPData/SBS y contrato de cotización. | No convierte operaciones ni mezcla monedas. |
| Cobros a clientes/facturas/promesas | Solo práctica. | Sin casos de uso equivalentes. | No se presentan como completados por la API. |
| Transferencias/reversos/conciliación | Solo práctica. | Sin casos de uso equivalentes. | Cambiar un tipo de movimiento no implementa esas transacciones compuestas. |

## Trazabilidad del código

| Área | Fuente inspeccionada en su repositorio |
|---|---|
| Saldo y abonos | `creditor-backend/src/Creditor.Domain/AccountsPayable/Purchase.cs`; `AccountsPayableService`; `EfAccountsPayableRepository`. |
| Filtros/lista/resumen/CSV | `AccountsPayableQueries.cs`; `creditor-web-app/src/contexts/accounts-payable/{infrastructure,application,presentation}`. |
| Préstamos | `Creditor.Domain/Loans/Loan.cs`, `Creditor.Application/Loans/LoanService.cs`, `LoansController`, adaptador y vista `contexts/loans`. |
| Base de datos | `CreditorDbContext`, configuraciones de Infrastructure y migraciones del proveedor. |
| Identidad | `Program.cs`, `CurrentUser`, `IdentityService` y `contexts/identity/application/session.js`. |
| Tesorería | `Creditor.Domain/Treasury`, `TreasuryService`, `EfTreasuryRepository`, contexto frontend treasury. |
| Documentos | `AttachmentService`, `AttachmentConfiguration`, `AttachmentsController`, `AttachmentPanel.vue`. |
| Externo | `BcrpExchangeRateService`, `ExchangeRateOptions`, `ExchangeRatesController`. |
| Interfaz original | `src/App.vue`, `src/finance`, `src/styles.css`, `src/router.js`. |

## Verificación observada

Los resultados finales se incorporan en este apartado después de ejecutar las suites. Cada fila señala el proveedor: pasar una prueba SQLite no acredita MySQL. El registro final debe incluir código, comando, cantidad, resultado y archivo de evidencia. Los artefactos históricos del 02/11 se mantienen en su carpeta original sin reutilizar su fecha para esta auditoría.

Baseline previo al cambio de motor, comunicado y respaldado por el repositorio backend: **33 pruebas de dominio, 113 pruebas de API con SQLite y 17 escenarios PostgreSQL aprobados**. Incluye abonos secuenciales/concurrentes y préstamos. El artefacto PostgreSQL es `artifacts/verification/postgres-baseline.trx` del backend; su copia y hash se incorporan al cerrar la verificación.

## Cambio de motor y documentación

MySQL 8.4 es el motor elegido. Se conserva PostgreSQL como regresión y no se eliminan sus migraciones. La migración de esquema MySQL usa su propia cadena; no convierte automáticamente los registros de PostgreSQL/SQLite. Scalar presenta el OpenAPI generado. La URL, versión y pruebas definitivas se registrarán tras verificar el proceso final.

## Límites que permanecen abiertos

1. Aceptación del sprint, revisión por pares, tablero y datos de desempeño del equipo.
2. Dos entrevistas S2 adicionales según el corte documentado, revisión de registros existentes y validación de usabilidad por segmento.
3. Sincronización/verificación de prototipos en herramientas requeridas y videos vigentes de producto/equipo.
4. Despliegue nuevo y prueba HTTPS; el usuario pidió mantener el trabajo local.
5. Conversión explícita de datos anteriores entre motores si se necesita conservarlos en MySQL; no se presume hecha por cambiar la configuración.
6. Decidir el backlog de las capacidades demo sin API y de las APIs sin pantalla. Las pruebas del incremento no acreditan cobertura funcional total de la demo.
