# Capítulo IV: Product Design

## 4.1 Style Guidelines

Esta sección establece los lineamientos visuales y comunicacionales que guiarán el diseño de CREDITOR en todos sus entornos.

### 4.1.1 General Style Guidelines

a. Branding

El logotipo de Creditor representa la perpetuidad de los flujos de dinero con el símbolo de infinito, además una flecha hacia arriba que da a entender que el dinero del usuario aumentará porque este sacará mejor provecho de sus finanzas, al no olvidar pagar sus deudas a tiempo gracias a nuestra aplicación web.

<div align="center">
  <img src="../assets/branding/creditorlogo.jpg"
       alt="Lean UX Canvas de la aplicación"
       width="700">
</div>

b. Tipografía

* Familia única: Inter (Google Fonts), con fallback system-ui, -apple-system, Segoe UI, Roboto, sans-serif. Sans-serif geométrica, neutral y de alta legibilidad en cifras — clave para montos y tasas.

* Jerarquía:
H1 / hero: 800, tamaño fluido clamp(2.2rem, 5vw, 3.4rem), letter-spacing: -0.02em.
H2 / secciones: 800, clamp(1.75rem, 3.2vw, 2.5rem), tracking negativo.
H3 / tarjetas: 700, ~1.05–1.15rem.
Cuerpo: 400–500, 1rem–1.05rem, line-height ~1.6, color atenuado.
Etiquetas/eyebrow: 700, 0.78rem, MAYÚSCULAS con letter-spacing: 0.08em.
Botones: 600, 0.95rem.

* Regla: títulos compactos (tracking negativo) + párrafos aireados (line-height alto).

c. Colores

* Primario marca: #2563eb (azul confianza), hover #1d4ed8, fondo suave de marca #e8efff.
* Éxito: #10b981 (verde: "al día", pagos completados).
* Alerta: #f59e0b (cuotas por vencer) · Peligro: #ef4444 (mora/vencido).
* Neutros: texto #101828, texto secundario #5a6478, borde #e3e8f2, superficie #ffffff, superficie suave #f5f7fb.
* Oscuros (footer/bandas): #0b1020 y #121a33, con texto #eef2ff.

El azul elegido como primario está reservado solo para acciones y marca. El semáforo verde/ámbar/rojo será usado exclusivamente para estados de deuda, no de forma decorativa.

d. Iconografía

* Estilo actual: pictogramas planos monocromos dentro de un contenedor redondeado con fondo --brand-soft.
* Criterio: línea uniforme (~1.5–2px), esquinas redondeadas, metáfora literal y financiera (documento, tarjeta, reloj, campana, recibo, gráfico).
* Tamaño 24px en tarjetas, 20px inline; siempre acompañados de texto.

e. Tono de comunicación

El tono elegido para la página es un punto medio entre cercano y profesional; por ejemplo "tutea" al usuario, en frases tales como "controla tus préstamos". 
Así también el lenguaje será claro, al consistir de frases cortas comprensibles para el usuario, y concreto, al estar orientadas a la acción con sus respectivas cifras verificables.
Por último será bilingüe consistente, ya que se implementó el boton de i18n inglés/español, trtando de mantener mismas longitudes de frases para no romper el layout.

### 4.1.2 Web Style Guidelines

## 4.2 Information Architecture

### 4.2.1 Organization Systems

### 4.2.2 Labeling Systems

### 4.2.3 SEO Tags and Meta Tags

### 4.2.4 Searching Systems

### 4.2.5 Navigation Systems

## 4.3 Landing Page UI Design

### 4.3.1 Landing Page Wireframes

### 4.3.2 Landing Page Mock-ups

## 4.4 Web Applications UX/UI Design

### 4.4.1 Web Application Wireframes

### 4.4.2 Web Application Wireflow Diagrams

### 4.4.3 Web Application Mock-ups

### 4.4.4 Web Application User Flow Diagrams

## 4.5 Web Applications Prototyping

## 4.6 Domain-Driven Software Architecture

### 4.6.1 Design-Level Event Storming

### 4.6.2 Software Architecture Context Diagram

### 4.6.3 Software Architecture Container Diagram

### 4.6.4 Software Architecture Component Diagrams

## 4.7 Software Object-Oriented Design

### 4.7.1 Class Diagrams

## 4.8 Database Design

### 4.8.1 Database Diagrams

El esquema ejecutable se mantiene en [`database/schema.sql`](../database/schema.sql).

