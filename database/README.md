# Base de datos vigente y diseño histórico

El motor AV2 es **MySQL 8.4**. La fuente de verdad es el modelo EF y las migraciones de `creditor-backend/src/Creditor.Migrations.MySql`. Proveedor Pomelo.EntityFrameworkCore.MySql 8.0.3, EF Core 8. La primera migración es `20261113220305_InitialMySqlWorkspace`.

## Esquema reproducible

[`schema.sql`](schema.sql) es una **copia exacta del DDL idempotente generado por EF**, proveniente de `creditor-backend/artifacts/mysql/schema.sql` el 13/11/2026. Su procedencia y SHA-256 constan en el [manifiesto de evidencia](../assets/evidence/2026-11-13/manifest.json). Incluye Identity, compras, abonos, archivos, tesorería, préstamos y el historial de migración. No contiene usuarios de acceso ni operaciones reales.

Desde el backend, con la configuración MySQL del entorno de prueba, se genera mediante `dotnet ef migrations script --idempotent --project src/Creditor.Migrations.MySql --startup-project src/Creditor.Api --output artifacts/mysql/schema.sql`. Usa la configuración/proveedor MySql. El SQL usa delimitadores del cliente MySQL para sus rutinas; las pruebas del backend verifican su aplicación y repetición.

Los [diagramas vigentes](../README.md#481-database-diagrams) muestran las entidades relevantes; el SQL es la referencia de tipos físicos, nulabilidad y claves/índices completos. Los importes no usan float. La unicidad de recibo y de voucher debe leerse en los índices/columnas derivados de MySQL, no como los índices parciales del proveedor PostgreSQL.

## Historia y límites de migración

`history/schema-postgres-design.sql` conserva el diseño inicial del report, que no era el modelo EF vigente. Las migraciones PostgreSQL ejecutables reales permanecen en el backend para regresión, separadas de la cadena MySQL. SQLite queda como proveedor auxiliar.

Cambiar el proveedor no copia usuarios, operaciones ni archivos entre motores. Las pruebas usan bases ficticias desechables y verifican cadena completa, reaplicación, reinicio, saldos, documentos, claves y concurrencia. En MySQL, el DDL puede confirmar cambios fuera de una transacción EF: un fallo durante una primera aplicación podría dejar esquema parcial sin su fila de historial. Reaplicar una cadena completada es el caso verificado; no se afirma rollback atómico de cualquier DDL interrumpido. Importar una base previa exige mapeo, respaldo y conciliación explícitos.

## Cadena actual

- `20261113220305_InitialMySqlWorkspace`.
- `20261113221419_PreserveNormalizedReferenceAccents`.

La segunda migración conserva acentos en la comparación de referencias normalizadas mediante collation binaria. No modifica mayúsculas/minúsculas del dato original ni recalcula importes; la normalización de referencia sigue a cargo del dominio.
