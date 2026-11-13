# Base de datos vigente y diseño histórico

El proveedor elegido para AV2 es **MySQL 8.4**. La fuente de verdad del esquema es el modelo EF de `creditor-backend` y su cadena de migraciones MySQL. Los diagramas vigentes están en [capítulo IV](../README.md#481-database-diagrams) y sus [fuentes Mermaid](../assets/architecture/av2/).

- `schema.sql` indica la fuente canónica; no mantiene tablas escritas manualmente que puedan divergir del backend.
- `history/schema-postgres-design.sql` conserva exactamente el diseño inicial del report. No corresponde al esquema EF actual ni se debe ejecutar para iniciar MySQL.
- El SQL generado y su procedencia se registran después de verificar la cadena MySQL. No contiene datos reales ni contraseñas.

Las migraciones PostgreSQL anteriores se conservan en el backend para regresión. La cadena MySQL es independiente: elegir MySQL no copia datos desde PostgreSQL/SQLite. Una importación de registros previos y archivos exige un proceso explícito separado. Las pruebas de esta preparación usan datos ficticios.
