> Vista sincronizada del [informe canónico](../README.md), corte AV2 13/11/2026. Para editar contenido, modificar README y ejecutar `python tools/report/sync_chapters.py`.

# Conclusiones y recomendaciones

## Conclusiones

1. El núcleo CREDITOR conserva el objetivo de cuentas por pagar: proveedores, compras, abonos, saldo, documentos y exportación por negocio/moneda. Las rutas conectadas usan la API ASP.NET Core y el diseño visual existente.
2. Los abonos sucesivos se persisten como entidades nuevas. Los filtros de lista, resumen y CSV comparten criterios aplicados. Loans guarda cuotas mensuales acordadas; la tasa no activa una fórmula de amortización ni pago de cuotas.
3. El proveedor actual es MySQL. PostgreSQL conserva regresión histórica y SQLite un uso auxiliar. Las pruebas documentadas permiten revisar migraciones y datos ficticios; no demuestran transferencia de datos de motores anteriores ni garantizan casos no ejecutados.
4. DDD se refleja en capas, agregados y puertos. Payments pertenece a Purchase, Reporting es lectura y Treasury es otro contexto. Un abono no se convierte automáticamente en salida de efectivo.
5. La demo del navegador tiene funciones más amplias que la API. Facturas, cobros, promesas, transferencias, reversos y conciliación no se anuncian como backend terminado. La administración de usuarios y cotización externa tienen API, pero no pantalla conectada específica.
6. Investigación, pruebas de usabilidad, evidencia de colaboración y deployment tienen pendientes explícitos. La preparación técnica local y el informe coherente no sustituyen esas evidencias de AV2.

## Recomendaciones

1. Revisar los resultados y commits locales de develop, aceptar el alcance y probar la aplicación con el equipo antes de preparar una release.
2. Confirmar con el curso el uso de MySQL en lugar del diseño PostgreSQL anterior. Si se requieren datos previos, planificar una importación explícita y respaldos; cambiar la conexión no migra registros.
3. Completar las entrevistas y la validación por segmento, incluyendo comprensión de cuota/saldo/efectivo y filtros de exportación.
4. Registrar reuniones, tablero, revisión por pares y aportes con evidencia real. Los formatos preparados no sustituyen un Performance Report evaluado por el líder.
5. Decidir por backlog qué funciones de la demo pasarán al servidor; no sumar sus capacidades a las del workspace conectado en una exposición.
6. Publicar únicamente con autorización, documentando SHA, HTTPS, migraciones, salud, CORS y archivos privados. Los binarios PDF/PPTX anteriores conservan contenido histórico y deben regenerarse tras la revisión final si se usarán para AV2.

## Video About-the-Team

**Estado: enlace histórico aportado en main, pendiente de verificación y correspondencia con AV2.** Se conserva [Video About-the-Team](https://youtu.be/RItoiUdxaiA), registrado por Juan; no se comprobó aquí su disponibilidad, duración ni contenido. Debe mostrar sesiones reales, colaboración y testimonio de cada integrante. El Anexo C sugiere cinco minutos de retrospectiva más un minuto por integrante. Completar resumen, pauta de secuencias hh:mm:ss, captura, enlaces Stream/YouTube e incorporación en landing. La mera existencia del enlace no acredita que sea la versión final requerida; los guiones de exposición no reemplazan su revisión.
