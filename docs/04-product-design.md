# Capítulo IV: Product Design

## 4.1 Style Guidelines

Esta sección establece los lineamientos visuales y comunicacionales que guiarán el diseño de CREDITOR en todos sus entornos.

### 4.1.1 General Style Guidelines

#### a. Branding

El logotipo de Creditor representa la perpetuidad de los flujos de dinero con el símbolo de infinito, además una flecha hacia arriba que da a entender que el dinero del usuario aumentará porque este sacará mejor provecho de sus finanzas, al no olvidar pagar sus deudas a tiempo gracias a nuestra aplicación web.

<div align="center">
  <img src="../assets/branding/creditorlogo.jpg"
       alt="Lean UX Canvas de la aplicación"
       width="600">
</div>

#### b. Tipografía

Primaria: Montserrat - para títulos y subtítulos

Secundaria: Inter - por su legilibilidad para textos explicativos

![Fuentes](../assets/branding/fuentes.png)

#### c. Colores

* Azul: Primario marca #2563eb, hover #1d4ed8, fondo suave de marca #e8efff.
* Verde #10b981: Éxito, pagos al día, pagos completados.
* Amarillo #f59e0b: Alerta, cuota por vencer. 
* Rojo #ef4444: Peligro, mora, vencido.

![Colores](../assets/branding/colores.png)

El azul elegido como primario está reservado solo para acciones y marca. El semáforo verde/ámbar/rojo será usado exclusivamente para estados de deuda, no de forma decorativa.

#### d. Iconografía

* Estilo actual: pictogramas planos monocromos dentro de un contenedor redondeado con fondo --brand-soft.
* Criterio: línea uniforme (~1.5–2px), esquinas redondeadas, metáfora literal y financiera (documento, tarjeta, reloj, campana, recibo, gráfico).
* Tamaño 24px en tarjetas, 20px inline; siempre acompañados de texto.

#### e. Tono de comunicación

El tono elegido para la página es un punto medio entre cercano y profesional; por ejemplo "tutea" al usuario, en frases tales como "controla tus préstamos". 
Así también el lenguaje será claro, al consistir de frases cortas comprensibles para el usuario, y concreto, al estar orientadas a la acción con sus respectivas cifras verificables.
Por último será bilingüe consistente, ya que se implementó el boton de i18n inglés/español, trtando de mantener mismas longitudes de frases para no romper el layout.

### 4.1.2 Web Style Guidelines

Esta sección explica los principios de diseño de CREDITOR en su experiencia web, asegurando que todos los elementos de la interfaz sean consistentes y funcionales. El objetivo es crear un sistema de diseño que facilite el trabajo de los desarrolladores y mantenga una identidad visual coherente.

#### **Diseño Responsive**

Para asegurar que la página se ajuste correctamente a distintos tamaños de pantalla y que el contenido siga siendo comprensible y visualmente atractivo, se empleará CSS junto con media queries. Estas herramientas permitirán definir estilos específicos según la resolución del dispositivo. Elementos fundamentales, como la barra de navegación y el pie de página, se adaptarán automáticamente para garantizar una experiencia óptima en diversos dispositivos. Siguiendo los siguientes breakpoints:

| Dispositivo | Ancho mínimo | Ejemplo de uso           |
| ----------- | ------------ | ------------------------ |
| Mobile      | ≥ 320px      | Teléfonos                |
| Tablet      | ≥ 768px      | iPad / tablets genéricas |
| Laptop      | ≥ 1024px     | Monitores y laptops      |
| Wide Screen | ≥ 1440px     | Pantallas grandes o TV   |

#### Patrón de Diseño para la Landing Page (Patrón Z)
Para el diseño de nuestra página de inicio, se utilizará el Patrón Z. Este es un patrón visual que guía la mirada del usuario de manera intencionada, similar al recorrido de la letra "Z". A continuación, te explico los elementos clave de este patrón que se aplican en tu diseño:

- Punto de partida (Superior Izquierda): La mirada del usuario se posa primero en el logotipo de WARISMART, que está estratégicamente colocado en la esquina superior izquierda. Esto establece inmediatamente la identidad de la marca.

- Movimiento horizontal (Superior Derecha): Desde el logo, el ojo se mueve de forma natural hacia la derecha, donde se encuentran los elementos del menú de navegación (Inicio, Nosotros, Servicios, Contacto). Esta línea horizontal permite que el usuario escanee rápidamente las opciones disponibles.

- Diagonal descendente: La vista desciende en diagonal hacia la sección principal del contenido. En tu landing page, esto se evidencia en el bloque hero-blue y el texto "Impulsa tu negocio con tecnología que entiende el retail", que capta la atención con su mensaje principal y una llamada a la acción.

- Movimiento horizontal final (Inferior): Finalmente, la mirada se mueve a través de la sección inferior, donde se encuentran elementos de prueba social como los testimonios de clientes y los logotipos de los socios. Este punto final refuerza la credibilidad y anima al usuario a tomar una decisión, como el registro o el inicio de sesión.
Este patrón Z es muy efectivo porque respeta el proceso de escaneo natural del ojo y asegura que la información más importante—la marca, la navegación, la propuesta de valor y la prueba social—sea vista en un orden lógico, guiando al usuario de forma clara a través de la página.

Un ejemplo de ello se puede visualizar con la aplicación Evernote:

![Patronzeta](../assets/branding/PATRONZ.jpg)

## 4.2 Information Architecture

### 4.2.1 Organization Systems

CREDITOR organiza su información aplicando sistemas de organización visual y esquemas de categorización:

A) Organización visual del contenido

+ Jerárquica: Menú superior con secciones principales (Inicio, Mis Operaciones, Suscripciones, Mi Cuenta).

+ Secuencial: Procesos guiados paso a paso sobre cómo registrar la operación, datos a rellenar y más.

+ Matriz: Sección de calendario donde observará las fechas de pago, de cobro, entre otros.

B) Esquemas de categorización del contenido

+ Alfabético: Listado de bancos con los que realiza sus respectivas transacciones de dinero o podrá añadir uno de su preferencia.

+ Cronológico: Historial de créditos y préstamos con la fecha en que los registró en la aplicación.

+ Por tipo de datos: Al registrar dicha operación se procede a un ingreso de datos, los cuales pueden ser: monto, tasa, plazo, frecuencia.



### 4.2.2 Labeling Systems

Para evitar la confusión y garantizar que las etiquetas sean claras y concisas, se han definido los siguientes principios basados en la función de cada elemento:

* Etiquetas de Acción (Verbos): Las etiquetas en botones y enlaces clave se basarán en verbos de acción.

* * Ejemplos: "Añadir Operación", "Cambiar Suscripción", "Editar".

* Etiquetas de Contenido (Sustantivos): Las etiquetas que describen secciones o conjuntos de datos serán sustantivos directos.

* * Ejemplos: "Historial", "Suscripciones".

* Etiquetas de Asociación: Se usarán etiquetas mínimas para representar información más compleja. Por ejemplo, en la barra de navegación, la etiqueta "Mis Operaciones" representa en la mente del usuario toda la información y las acciones relacionadas con sus créditos y préstamos.

### 4.2.3 SEO Tags and Meta Tags

Con el objetivo de optimizar la visibilidad de CREDITOR en motores de búsqueda y mejorar la accesibilidad de la información, se han definido los principales SEO Tags y Meta Tags que serán implementados en la Landing Page y la Web Application.

* Landing Page

Title: CREDITOR-Controla tus operaciones financieras

Meta Description: CREDITOR te ofrece plataforma para el registro de todas tus operaciones: créditos, préstamos, deudas.

Meta Keywords: Préstamos, Créditos, Deudas, Operaciones Bancarias, Finanzas.

Meta Author: FullTechs Team


* Web Application

Title: CREDITOR

Meta Description: Contabiliza tus finanzas en una plataforma intuitiva, personalizable y que te servirá como tu asistente.

Meta Keywords: Préstamos, Créditos, Deudas, Operaciones Bancarias, Finanzas.

Meta Author: FullTechs Team

### 4.2.4 Searching Systems

La búsqueda es una herramienta vital para manejar el volumen de información de un negocio. Se ofrecerán múltiples opciones para que el usuario encuentre lo que necesita sin complicaciones, utilizando el patrón de búsqueda con filtros.

* Búsqueda Global: Un campo de búsqueda principal en la Navbar permitirá a los usuarios buscar productos, proveedores o clientes desde cualquier lugar de la aplicación.

* Búsqueda con Filtros: En páginas con listados extensos, como Inventario o Reportes de Ventas, se ofrecerá un sistema de filtros avanzado. Los usuarios podrán filtrar la información por categoría, proveedor, rango de fechas, o estado.

* Búsqueda por Fecha: En el apartado de Operaciones, el usuario podrá ver su historial mediante un calendario que muestra todos los días del mes, cuando haya registrado una operación verá un punto en su respectivo día.

### 4.2.5 Navigation Systems

Organizamos las secciones, permitiendo a los usuarios desplazarse sin dificultad entre distintas funcionalidades. La navegación está basada en una barra de menú principal, accesos rápidos y una estructura jerárquica clara que guía al usuario en su recorrido.

#### **Landing Page Navigation**

La Landing Page de CREDITOR se estructura con un diseño claro y accesible, facilitando la exploración para nuevos usuarios.

##### **Elementos de Navegación en la Landing Page**

- **Menú principal fijo** en la parte superior con accesos rápidos a secciones clave.
- **Botones de acción (CTA - Call to Action)** estratégicamente ubicados para dirigir a los usuarios hacia la Web Application.
- **Enlaces internos** dentro del contenido para conectar secciones relacionadas.
- **Scroll guiado** con transiciones suaves para facilitar la lectura y exploración.

##### **Flujo de Navegación en la Landing Page**

1. **Características** muestra todas las funcionalidades de la página a los nuevos usuarios.
2. **Cómo funciona** explcia brevemente en 4 pasos qué hace la aplicación.
3. **Planes** muestra los 3 planes en los que se puede suscribir el nuevo usuario de la página.
4. **Preguntas** resuelve algunas dudas frecuentes acerca de la página.
5. **Iniciar Sesión/Probar Gratis** para acceder a la aplicación.

#### **Web Application Navigation**

##### **Tipos de Navegación en la Web Application**

- **Menú lateral dinámico** con secciones diferenciadas según el usuario.
- **Búsqueda global** con filtros avanzados para encontrar espacios específicos.
- **Navegación basada en tarjetas** con accesos rápidos a información relevante.
- **Atajos contextuales** que sugieren acciones según el comportamiento del usuario.

#### **Flujo de Navegación en la Web Application**

1. Inician sesión y llegan al **Inicio** con dashboard sobre el resumen de sus finanzas.
2. Se dirigen a **Mis Operaciones** para añadir nuevas operaciones o visualizar las que ya tiene registradas.
3. Si va a **Suscripciones** podrá ver el plan vigente que está pagando o cambiar a otro según le convenga.
4. Por último podrá ver sus datos personales en **Mi Cuenta** e ir a opciones de configuración.


## 4.3 Landing Page UI Design

A continuación presentamos los diseños de wireframes y mock ups de la landing page hechos en Figma, puede visualizarlo mediante este link: https://www.figma.com/design/OQWWAsxRTtOPJcWfFUtCq3/Sin-t%C3%ADtulo?node-id=12-2&t=mUB6VBiUbwbcGxJq-1

### 4.3.1 Landing Page Wireframes

![Wireframe 1](../assets/branding/wiref1.png)
![Wireframe 2](../assets/branding/wiref2.png)
![Wireframe 3](../assets/branding/wiref3.png)

### 4.3.2 Landing Page Mock-ups

![Mockup 1](../assets/branding/mock1.png)
![Mockup 2](../assets/branding/mock2.png)
![Mockup 3](../assets/branding/mock3.png)

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

