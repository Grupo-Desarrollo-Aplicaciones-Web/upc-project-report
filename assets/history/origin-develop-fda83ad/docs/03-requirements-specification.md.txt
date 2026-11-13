# Capítulo III: Requirements Specification

Los requisitos expresan el alcance propuesto de CREDITOR. US-004–007 están implementadas como demostración local TB1 y requieren aceptación del equipo. La investigación todavía no valida sus prioridades. Owner/Administrator son segmentos y objetivos de uso, no roles de autorización implementados.

## 3.1 User Stories

### 3.1.1 Epics y To-Be Scenario Mapping

| Epic | Descripción de negocio | Actor | Historias |
|---|---|---|---|
| E-01 Landing | Explicar cuentas por pagar, alcance, contacto y condiciones. | Visitor | US-001–003 |
| E-02 Accounts Payable | Centralizar obligaciones con proveedores y vencimientos por moneda. | Business Owner, Finance Administrator | US-004–005 |
| E-03 Payments | Conservar movimientos para reconstruir el saldo de una compra. | Ambos segmentos | US-006–007 |
| E-04 Reporting | Preparar revisión contable con filtros y exportación. | Finance Administrator | US-008 |
| E-05 Loans | Consultar préstamos tomados por la mype y sus cuotas. | Business Owner | US-009 |
| E-06 Service Integration | Conectar la interfaz con autorización, persistencia y contratos HTTP. | Developer | TS-001–003 |

### 3.1.2 Functional User Stories

| ID | Título | Descripción | Epic | Criterio asociado |
|---|---|---|---|---|
| US-001 | Conocer CREDITOR | Como Visitor quiero comprender la propuesta para decidir si explorar el producto. | E-01 | Propuesta sobre obligaciones con proveedores, navegación y CTA por segmento. |
| US-002 | Revisar contacto de demostración | Como Visitor quiero revisar el formulario y su alcance para comprender qué datos ingresaría. | E-01 | Validación accesible y confirmación explícita local, sin email o solicitud enviada. Contacto real queda como evolución. |
| US-003 | Consultar condiciones | Como Visitor quiero leer términos y privacidad para comprender uso y límites de los datos. | E-01 | Ambas vistas accesibles desde formulario y footer. |
| US-004 | Consultar obligaciones | Como Business Owner quiero visualizar saldos y vencimientos para priorizar pagos. | E-02 | Totales PEN/USD separados y consulta por proveedor, fechas y estado. |
| US-005 | Registrar compra a crédito | Como Finance Administrator quiero registrar una compra para conservar una obligación. | E-02 | Proveedor, referencia, descripción, moneda, importe y fechas con reglas R-01–06. |
| US-006 | Registrar abono | Como Finance Administrator quiero registrar un abono para reducir el saldo con trazabilidad. | E-03 | Movimiento y saldo consistente, reglas R-07–10. |
| US-007 | Revisar historial | Como Business Owner quiero revisar los movimientos para reconstruir cuánto falta pagar. | E-03 | Total, suma de abonos y saldo, fecha e importe de cada movimiento. |
| US-008 | Exportar deuda | Como Finance Administrator quiero filtrar y exportar obligaciones para revisión contable. | E-04 | Propuesto: exportación CSV con moneda, proveedor, fechas y filtros identificados. |
| US-009 | Consultar préstamo | Como Business Owner quiero revisar cuotas de un préstamo para conocer compromisos futuros. | E-05 | Propuesto: principal, TEA, frecuencia MONTHLY y cronograma. |

### 3.1.3 Reglas observables del incremento TB1

| ID | Regla | Comportamiento y límite |
|---|---|---|
| R-01 | Contexto de proveedor | Debe pertenecer a la organización de la compra. La demo fija `demo-market-sol`; no es autenticación. |
| R-02 | Importe | 0.01–9,999,999.99, hasta dos decimales, calculado en centavos enteros. Rechazar cero, negativos, exceso y texto inválido. |
| R-03 | Moneda | Solo PEN o USD; no convertir ni sumar monedas distintas. |
| R-04 | Datos de compra | Referencia de 2–80 caracteres, única por proveedor sin distinguir mayúsculas. Descripción de 3–200 caracteres. |
| R-05 | Fechas | Compra válida entre 2000-01-01 y hoy. Vencimiento no anterior a compra, máximo 2100-12-31. |
| R-06 | Comprobante | Opcional PDF/PNG/JPEG hasta 2 MB. La demo conserva contenido dataURL en navegador; no acredita almacenamiento privado. |
| R-07 | Abono | Positivo y hasta saldo pendiente. Hereda moneda de compra, misma organización. |
| R-08 | Fecha de abono | Válida, no anterior a compra ni futura. Nota opcional hasta 200 caracteres. Voucher según R-06. |
| R-09 | Saldo | Importe de compra menos suma de abonos. Compra 100, abono 30, saldo 70. Rechazo 71 no cambia historial ni saldo. |
| R-10 | Fallo/vacío | Guardado fallido no se anuncia exitoso. Conservar entradas, foco en error y opción de recuperación. Vacío distinto de fallo. |

### 3.1.4 Acceptance Criteria

```gherkin
Feature: Credit purchase registration (US-005)
  Scenario: Register a valid PEN purchase
    Given a supplier belongs to demo-market-sol
    And a new reference, description, purchase date and due date satisfy R-04 and R-05
    When the administrator reviews and confirms a purchase of PEN 100.00
    Then the detail shows total PEN 100.00 and balance PEN 100.00
    And the payment history is empty

  Scenario Outline: Correct invalid purchase data
    Given the purchase form contains <invalid>
    When the user reviews the purchase
    Then no purchase is stored
    And the corresponding field has a linked error and receives focus
    And the remaining entered values are preserved
    Examples:
      | invalid |
      | missing supplier |
      | supplier from another organization |
      | zero, negative or more than two decimal places |
      | repeated reference for the same supplier |
      | due date before purchase date |
      | unsupported or oversized attachment |

Feature: Purchase payments (US-006 and US-007)
  Scenario: Compose the remaining balance
    Given a PEN purchase of 100.00 with no payments
    When the user confirms a payment of 30.00 with a valid date
    Then the history contains exactly one payment of PEN 30.00
    And the remaining balance is PEN 70.00
    And reloading the local detail preserves that result

  Scenario: Reject an overpayment
    Given the purchase balance is PEN 70.00
    When the user reviews a payment of PEN 71.00
    Then the form explains that the payment exceeds the balance
    And it keeps the entered amount 71.00
    And no payment or balance change is stored

  Scenario: Purchase currency is preserved
    Given the purchase is denominated in PEN
    When the user changes the interface to English or Spanish
    Then its currency remains PEN
    And dashboard USD obligations have a separate total

Feature: Obligation review (US-004)
  Scenario: No matching obligations
    Given filters exclude every registered purchase
    When the user views the list
    Then the interface explains there are no matches and offers clearing filters
    And it preserves the selected filters

  Scenario: Browser storage is unavailable
    Given the local adapter cannot read or write browser storage
    When the user attempts an operation
    Then the interface displays a recoverable error
    And it does not announce a successful save or a known zero balance
```

US-001–003 se comprueban con contenido/navegación de landing y sus pruebas de validación, URLs, idioma y TEA. La historia US-002 se acota a demostración durante TB1; enviar una consulta real requiere proveedor, contrato y consentimiento definidos. Los escenarios propuestos se distinguen de los resultados efectivamente ejecutados en [Evidencia local](tb1/evidencia-local.md).

## 3.2 Impact Mapping

### 3.2.1 Objetivos SMART propuestos

Antes de cerrar Sprint 3, realizar una prueba moderada con cinco participantes y comprobar que cuatro localicen saldo y vencimiento de una compra sin ayuda en dos minutos. Línea base y protocolo pendientes. Para registro, medir completitud de compra/abono y tasa de errores con los mismos escenarios, sin declarar una mejora porcentual antes de medir.

| Actor/Persona provisional | Impacto esperado | Entregable | Historias | Medición futura |
|---|---|---|---|---|
| Propietaria Rosa | Localiza compromisos por moneda/proveedor. | Dashboard y detalle. | US-004/007 | Éxito sin ayuda, tiempo y explicación del saldo. |
| Administrador Diego | Registra obligación y abono con datos completos. | Formularios, confirmación e historial. | US-005/006 | Tarea completa, errores y recuperación. |
| Ambos segmentos | Preparan revisión de deuda y cuotas. | Reportes y préstamos futuros. | US-008/009 | Protocolo se definirá antes de implementación. |
| Visitor | Comprende el alcance y llega al objetivo adecuado. | Landing y CTA diferenciados. | US-001–003 | Destino correcto y comprensión del modo demo. |

[Impact Map local editable](../assets/research/tb1/impact-map-local.mmd). Su sincronización en UXPressia y validación de actores permanece pendiente. No se presenta como hallazgo de entrevistas.

## 3.3 Product Backlog

Prioridad como hipótesis de valor. Story points relativos Fibonacci, sin equivalencia a horas. Sprint 2 suma **26 SP** (8+8+5+5); estimación y asignación necesitan confirmación del equipo. To-Review indica implementación local revisable, no aceptación ni despliegue.

| Orden | ID | Título | Prioridad | SP | Sprint | Estado al corte |
|---:|---|---|---|---:|---|---|
| 1 | US-001 | Conocer CREDITOR | Must | 3 | 1, corrección 2 | To-Review, landing local. |
| 2 | US-002 | Contacto de demostración | Must | 5 | 1, corrección 2 | To-Review demo; canal real pendiente. |
| 3 | US-003 | Condiciones | Must | 2 | 1, corrección 2 | To-Review, legales locales. |
| 4 | US-004 | Obligaciones | Must | 8 | 2 | To-Review, adaptador local. |
| 5 | US-005 | Compra a crédito | Must | 8 | 2 | To-Review, adaptador local. |
| 6 | US-006 | Abono | Must | 5 | 2 | To-Review, adaptador local. |
| 7 | US-007 | Historial | Should | 5 | 2 | To-Review, adaptador local. |
| 8 | US-008 | Reporte de deuda | Should | 5 | 3 | To-do. |
| 9 | US-009 | Préstamo | Could | 8 | 3 | To-do. |

El [Sprint Backlog 2 textual](sprints/sprint-02.md) es la fuente local de tareas. La URL y captura de Trello/Jira/YouTrack necesitan creación y acuerdo del equipo; no se afirma que esta tabla sustituya ese criterio.

### 3.3.1 Technical Stories

| ID/Epic | Descripción | Criterios de aceptación previstos AV2 | Prioridad/SP | Estado |
|---|---|---|---|---|
| TS-001 / E-06 | Como Developer quiero exponer proveedores/compras para integrar el frontend. | GET `/api/v1/purchases` 200 paginado y filtrado por tenant; POST 201 o 400/422 con errores R-01–06; 401/403 sin autorización. | Must/8 | To-do, Sprint 3. |
| TS-002 / E-06 | Como Developer quiero registrar abonos para actualizar obligaciones de forma atómica. | POST `/api/v1/purchases/{id}/payments` 201 con movimiento/saldo; 404 compra inaccesible, 422 sobreabono; transacción/concurrencia sin saldo negativo. | Must/8 | To-do, Sprint 3. |
| TS-003 / E-06 | Como Developer quiero un contrato OpenAPI para revisar solicitudes/respuestas. | Documento describe auth, parámetros, paginación, schemas, ejemplos y respuestas reales del servicio; coincide con endpoint ejecutado. | Should/3 | To-do, Sprint 3. |

Los endpoints son diseños. El adaptador del navegador no responde HTTP y no acredita cumplimiento de estas historias técnicas.
