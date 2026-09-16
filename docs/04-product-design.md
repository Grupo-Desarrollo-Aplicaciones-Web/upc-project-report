# Capítulo IV: Product Design

## 4.1 Style Guidelines

### 4.1.1 General Style Guidelines

#### Branding

CREDITOR comunica control de obligaciones y claridad operativa. El símbolo de infinito y la flecha ascendente del logotipo representan continuidad de la información financiera y mejora en la toma de decisiones; no representan una promesa de rentabilidad.

<div align="center">
  <img src="../assets/branding/creditorlogo.jpg" alt="Logotipo de CREDITOR" width="420">
</div>

#### Tipografía

| Uso | Familia | Regla |
|---|---|---|
| Títulos | Montserrat | Usar pesos semibold o bold y una jerarquía semántica de encabezados. |
| Texto y controles | Inter | Mantener tamaño legible, alto contraste y oraciones breves. |

#### Colores

| Token | Valor | Uso |
|---|---|---|
| `brand-primary` | `#2563EB` | Marca, acciones principales y enlaces activos. |
| `brand-primary-hover` | `#1D4ED8` | Estado hover o activo de acción primaria. |
| `brand-soft` | `#E8EFFF` | Fondo de marca de baja intensidad. |
| `success` | `#10B981` | Pago al día o operación completada. |
| `warning` | `#F59E0B` | Vencimiento cercano o acción que requiere revisión. |
| `danger` | `#EF4444` | Obligación vencida o error que requiere corrección. |
| `text-primary` | `#111827` | Texto principal. |
| `surface` | `#FFFFFF` | Fondo de tarjetas y formularios. |

Los estados no dependen únicamente del color: se acompañan de etiqueta, icono o texto equivalente.

#### Iconografía y tono

Los iconos usan metáforas claras —documento, proveedor, calendario, recibo y reporte— y siempre incluyen una etiqueta accesible cuando no son decorativos. El tono es profesional, directo y comprensible: explica acciones y estados sin usar promesas financieras sin sustento.

### 4.1.2 Web Style Guidelines

- Usar una cuadrícula responsive, espaciado basado en múltiplos de 4 px y objetivos táctiles adecuados.
- Asociar cada campo de formulario con una etiqueta visible; los placeholders no reemplazan labels.
- Mantener contraste suficiente, foco visible, navegación por teclado y atributos ARIA cuando el control lo requiera.
- La interfaz y mensajes de API usarán inglés como idioma base (`en_US`) y español latinoamericano como alternativa (`es_419`).
- Las cifras comerciales o métricas de beneficio deberán indicar su fuente; de lo contrario se eliminan del contenido público.

## 4.2 Information Architecture

### 4.2.1 Organization Systems

| Área | Contenido | Usuarios |
|---|---|---|
| Landing | Propuesta, beneficios, contacto y contenido legal. | Visitor |
| Dashboard | Resumen de saldos, vencimientos y estados. | Business Owner, Finance Administrator |
| Purchases | Compras a crédito, proveedor, vencimiento y comprobantes. | Finance Administrator |
| Payments | Abonos, vouchers e historial de movimientos. | Finance Administrator, Business Owner |
| Loans | Préstamos y cuotas. | Business Owner |
| Reports | Filtros y exportaciones de obligaciones. | Finance Administrator |

### 4.2.2 Labeling Systems

Los rótulos privilegian términos de negocio consistentes: **Purchases**, **Suppliers**, **Payments**, **Outstanding Balance**, **Due Date**, **Loans** y **Reports**. La interfaz en español debe mantener equivalencias estables con el Ubiquitous Language del capítulo II.

### 4.2.3 SEO Tags and Meta Tags

| Etiqueta | Valor inicial propuesto |
|---|---|
| `title` | CREDITOR \| Control de cuentas por pagar para mypes |
| `description` | Centraliza compras a crédito, abonos y obligaciones de tu mype. |
| `keywords` | cuentas por pagar, compras a crédito, proveedores, mypes, CREDITOR |
| `author` | Equipo CREDITOR |
| `lang` | `en-US` o `es-419` según la versión renderizada |

### 4.2.4 Searching Systems

La primera versión prioriza filtros por proveedor, rango de fechas, moneda y estado antes que una búsqueda global. Las entrevistas definirán si una búsqueda textual aporta valor al flujo cotidiano.

### 4.2.5 Navigation Systems

La landing usa navegación por secciones y CTA hacia contacto o la futura aplicación. La aplicación usa navegación lateral para módulos de dominio, migas de pan en vistas de detalle y enlaces explícitos para regresar a una lista.
