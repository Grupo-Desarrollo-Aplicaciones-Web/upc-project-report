# Capítulo III: Requirements Specification

## 3.1 User Stories

Las historias siguientes derivan de los supuestos y del análisis preliminar. Su prioridad y redacción se revisarán cuando se integren los hallazgos de entrevistas. Las historias de landing pertenecen al Sprint 1; las de la aplicación y API están planificadas para iteraciones posteriores.

### 3.1.1 To-Be Scenario Mapping

| Actor | Objetivo | Resultado esperado | Historias relacionadas |
|---|---|---|---|
| Visitor | Comprender la propuesta y solicitar una demostración. | Accede a contenido claro, legal y al canal de contacto. | US-001 a US-003 |
| Business Owner | Revisar obligaciones y tomar decisiones de pago. | Consulta saldos, vencimientos y préstamos. | US-004, US-007 y US-009 |
| Finance Administrator | Registrar operaciones y verificar pagos. | Conserva la trazabilidad entre compra, abono y voucher. | US-005, US-006 y US-008 |
| Developer | Exponer operaciones del dominio de forma consistente. | La aplicación puede consumir una API documentada. | TS-001 a TS-003 |

### 3.1.2 Functional User Stories

| ID | Título | Descripción | Criterios de aceptación | Epic |
|---|---|---|---|---|
| US-001 | Conocer CREDITOR | Como **Visitor**, quiero leer una propuesta clara de CREDITOR para decidir si deseo conocer el producto. | **Dado** que el visitante abre la landing, **cuando** revisa la sección principal, **entonces** visualiza un mensaje alineado a cuentas por pagar de mypes.<br>**Dado** que el visitante navega por beneficios, **cuando** selecciona una sección, **entonces** llega al contenido correspondiente. | E-01 Landing |
| US-002 | Solicitar contacto | Como **Visitor**, quiero enviar una consulta para solicitar información de CREDITOR. | **Dado** que el visitante completa los datos obligatorios, **cuando** envía el formulario, **entonces** recibe una confirmación o un error comprensible.<br>**Dado** que falta un dato obligatorio, **cuando** intenta enviar, **entonces** el formulario identifica el campo a corregir. | E-01 Landing |
| US-003 | Consultar condiciones | Como **Visitor**, quiero acceder a términos y privacidad para entender el uso de mis datos. | **Dado** que el visitante está en el pie de página, **cuando** selecciona términos o privacidad, **entonces** accede al contenido legal correspondiente. | E-01 Landing |
| US-004 | Consultar obligaciones | Como **Business Owner**, quiero visualizar el saldo y vencimiento de mis obligaciones para priorizar una revisión de pagos. | **Dado** que el propietario tiene compras registradas, **cuando** abre el dashboard, **entonces** visualiza saldos y estados separados por moneda.<br>**Dado** que selecciona un proveedor, **cuando** consulta sus compras, **entonces** visualiza las obligaciones relacionadas. | E-02 Accounts Payable |
| US-005 | Registrar compra a crédito | Como **Finance Administrator**, quiero registrar una compra a crédito para conservar la obligación pendiente. | **Dado** que cuenta con los datos mínimos, **cuando** registra la compra, **entonces** el sistema guarda proveedor, importe, moneda y fecha límite.<br>**Dado** que adjunta un comprobante permitido, **cuando** confirma el registro, **entonces** el comprobante queda asociado a la compra. | E-02 Accounts Payable |
| US-006 | Registrar abono | Como **Finance Administrator**, quiero registrar un abono para actualizar el saldo de una compra. | **Dado** que la compra tiene un saldo pendiente, **cuando** registra un abono válido, **entonces** el sistema actualiza el saldo e incorpora el movimiento al historial.<br>**Dado** que adjunta un voucher permitido, **cuando** guarda el abono, **entonces** el voucher queda asociado al movimiento. | E-03 Payments |
| US-007 | Revisar historial de pagos | Como **Business Owner**, quiero consultar los abonos de una compra para verificar cómo se compone su saldo. | **Dado** que la compra tiene abonos, **cuando** abre su detalle, **entonces** visualiza fecha, importe y voucher de cada movimiento. | E-03 Payments |
| US-008 | Exportar reporte de deuda | Como **Finance Administrator**, quiero filtrar obligaciones y exportar un reporte para preparar una revisión contable. | **Dado** que existen obligaciones registradas, **cuando** filtra por fecha, proveedor o moneda, **entonces** visualiza solo los registros coincidentes.<br>**Dado** que el resultado es exportable, **cuando** selecciona un formato disponible, **entonces** recibe el reporte con los filtros aplicados. | E-04 Reporting |
| US-009 | Consultar préstamo | Como **Business Owner**, quiero revisar las cuotas de un préstamo para conocer sus próximos compromisos. | **Dado** que existe un préstamo registrado, **cuando** consulta su detalle, **entonces** visualiza principal, frecuencia, cuotas y próximos vencimientos. | E-05 Loans |

## 3.2 Impact Mapping

### Objetivo medible propuesto

Durante una prueba moderada posterior a la implementación del flujo de consulta de obligaciones, al menos 4 de 5 participantes representativos deberán poder localizar el saldo y la fecha de vencimiento de una compra predefinida sin ayuda. Este es un objetivo de validación, no un resultado alcanzado; se definirá la línea base y el protocolo antes de medirlo.

| Actor | Impacto esperado | Entregable | Historias |
|---|---|---|---|
| Visitor | Comprende qué problema atiende CREDITOR y cómo solicitar información. | Landing coherente, navegación, formulario y páginas legales. | US-001, US-002, US-003 |
| Business Owner | Localiza una obligación y comprende su estado. | Dashboard de deuda, detalle por proveedor y consulta de préstamos. | US-004, US-007, US-009 |
| Finance Administrator | Registra información suficiente para mantener trazabilidad. | Formulario de compras, historial de abonos, comprobantes y reporte. | US-005, US-006, US-008 |
| Developer | Integra una interfaz con servicios documentados. | API REST, contratos y documentación OpenAPI. | TS-001, TS-002, TS-003 |

La versión visual del Impact Map deberá elaborarse en UXPressia y enlazarse o exportarse a `assets/research/impact-map/` cuando cuente con los actores y prioridades validados.

## 3.3 Product Backlog

La prioridad expresa la hipótesis actual de valor y se revisará con la investigación. Los story points usan una escala relativa de Fibonacci: 1, 2, 3, 5 y 8.

| Orden | ID | Título | Prioridad | Story points | Sprint propuesto | Estado |
|---:|---|---|---|---:|---|---|
| 1 | US-001 | Conocer CREDITOR | Must | 3 | Sprint 1 | Pendiente de implementar/revisar en landing |
| 2 | US-002 | Solicitar contacto | Must | 5 | Sprint 1 | Pendiente de integración con servicio aprobado |
| 3 | US-003 | Consultar condiciones | Must | 2 | Sprint 1 | Pendiente de implementar en landing |
| 4 | US-004 | Consultar obligaciones | Must | 8 | Sprint 2 | Planificada |
| 5 | US-005 | Registrar compra a crédito | Must | 8 | Sprint 2 | Planificada |
| 6 | US-006 | Registrar abono | Must | 5 | Sprint 2 | Planificada |
| 7 | US-007 | Revisar historial de pagos | Should | 5 | Sprint 2 | Planificada |
| 8 | US-008 | Exportar reporte de deuda | Should | 5 | Sprint 3 | Planificada |
| 9 | US-009 | Consultar préstamo | Could | 8 | Sprint 3 | Planificada |

La captura del backlog de la herramienta elegida y su URL pública o accesible al docente se incorporarán antes de la entrega.

### 3.3.1 Technical Stories

| ID | Descripción | Criterios de aceptación | Prioridad |
|---|---|---|---|
| TS-001 | Como **Developer**, quiero exponer compras mediante una API REST para que la aplicación consulte y registre obligaciones. | **Dado** que la solicitud `GET /api/v1/purchases` es válida, **cuando** el servicio recibe la petición, **entonces** responde `200 OK` con una colección paginada.<br>**Dado** que la solicitud `POST /api/v1/purchases` contiene datos inválidos, **cuando** el servicio la valida, **entonces** responde `400 Bad Request` con errores de campo. | Must |
| TS-002 | Como **Developer**, quiero exponer abonos asociados a una compra para que la aplicación actualice el saldo. | **Dado** que la compra existe y tiene saldo pendiente, **cuando** el servicio recibe `POST /api/v1/purchases/{purchaseId}/payments`, **entonces** responde `201 Created` con el abono y saldo resultante.<br>**Dado** que el importe excede el saldo permitido, **cuando** valida la solicitud, **entonces** responde `422 Unprocessable Entity` con el motivo. | Must |
| TS-003 | Como **Developer**, quiero publicar contratos OpenAPI para que la integración tenga solicitudes y respuestas documentadas. | **Dado** que el servicio está disponible, **cuando** se accede al documento OpenAPI, **entonces** se describen rutas, esquemas y códigos de respuesta vigentes. | Should |
