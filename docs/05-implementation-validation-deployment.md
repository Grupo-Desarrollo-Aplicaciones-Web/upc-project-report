# Capítulo V: Product Implementation, Validation & Deployment

Este capítulo documenta la primera entrega de **CreditFlow**, limitada a su landing page. La referencia técnica es el archivo `creditor-landing-page-develop.zip`, asociado por su comentario de archivo al commit `chore: initialize landing page repository`, junto con las capturas de GitHub proporcionadas por el equipo. Fecha de corte documental: **16 de septiembre de 2026**.

Se diferencian tres estados: **verificado por inspección**, para hechos visibles en código o capturas; **propuesto**, para acuerdos y planificación elaborados para esta entrega; y **pendiente de ejecución**, para publicación, entrevistas y pruebas que aún no cuentan con evidencia. La existencia de código no equivale a una prueba aprobada.

## 5.1 Software Configuration Management

La gestión de configuración organiza los archivos de la landing, sus dependencias, las convenciones de colaboración y la preparación de un despliegue reproducible. También conserva la relación entre el producto y su documentación académica.

### 5.1.1 Software Development Environment Configuration
#### Herramientas y versiones

| Herramienta | Versión o referencia | Propósito y evidencia |
|---|---|---|
| Vue.js | 3.5.42 en lockfile; rango `^3.5.41` en manifest | Construcción de los componentes reactivos de la landing. |
| Vite | 7.1.9 en lockfile; rango `^7.1.9` | Servidor de desarrollo y compilación de recursos para publicación. |
| `@vitejs/plugin-vue` | 6.0.1; rango `^6.0.1` | Procesamiento de componentes `.vue` mediante Vite. |
| JavaScript | Módulos ECMAScript; sin edición anual fijada | Lógica de interacción y traducciones. `package.json` declara `type: module`. |
| HTML | HTML5 | Documento inicial, metadatos y contenedor de montaje. |
| CSS | CSS estándar con variables, Grid, Flexbox y media queries | Estilos globales y estilos encapsulados por componente. |
| Node.js | Requisito de dependencias: `^20.19.0 || >=22.12.0` | Ejecutar las herramientas de desarrollo. Se propone Node 22.x, desde 22.12.0, para el entorno acordado. Versión instalada del equipo no registrada. |
| npm | Versión instalada por registrar; `lockfileVersion: 3` | Instalación reproducible y ejecución de scripts. La versión del lockfile no es la versión de npm. |
| WebStorm | Confirmado por el equipo; número de versión por registrar | Edición, navegación del proyecto, terminal y operaciones Git. |
| Git | Versión local por registrar | Control de cambios y ramas. |
| GitHub | Servicio web, sin versión local aplicable | Alojamiento de los dos repositorios y evidencia de commits. |
| Google Meet | Servicio web | Medio de reunión confirmado para la planificación. |
| GitHub Issues y Projects | Propuestos; sin tablero acreditado | Seguimiento de historias, incidencias y criterios de aceptación. |
| Herramientas de desarrollo del navegador | Versión vinculada al navegador de prueba | Inspección propuesta de consola, red, almacenamiento y diseño responsive. |
| GitHub Actions y Pages | Configuración propuesta | Compilar y publicar la landing en un sitio estático. |

No se asignan versiones ficticias a los equipos. Para completar el registro se ejecutarán `node -v`, `npm -v` y `git --version`, y se copiará la versión que WebStorm muestra en **Help → About**. No se incluye React en el stack de esta landing.

#### Configuración del entorno local

1. Clonar el repositorio de la landing con una cuenta que tenga acceso.
2. Abrir su carpeta raíz en WebStorm.
3. Seleccionar un intérprete de Node que cumpla el requisito de las dependencias.
4. Usar la rama del incremento que se desea revisar; el ZIP analizado corresponde a `develop`.
5. Instalar a partir del lockfile y ejecutar los scripts existentes.

```bash
git clone https://github.com/Grupo-Desarrollo-Aplicaciones-Web/creditor-landing-page.git
cd creditor-landing-page
git switch develop
node -v
npm -v
npm ci
npm run dev
```

`npm ci` utiliza el lockfile y permite detectar diferencias con `package.json`. Una discrepancia debe revisarse, no solucionarse eliminando el lockfile sin analizar la causa. El servidor de desarrollo normalmente anuncia un acceso local en el puerto 5173; debe utilizarse la dirección que muestre la terminal.

| Script existente | Comando asociado | Uso |
|---|---|---|
| `dev` | `vite` | Desarrollo local. |
| `build` | `vite build` | Generación de archivos en `dist/`. |
| `preview` | `vite preview` | Inspección local del resultado compilado. |

```bash
npm run build
npm run preview
```

La previsualización no constituye una publicación. La revisión documental actual se basa en inspección de archivos; no se adjunta una ejecución exitosa de estos comandos por el equipo.

#### Estructura técnica

| Ruta | Responsabilidad |
|---|---|
| `package.json` | Nombre interno `creditflow-landing`, versión `0.0.0`, dependencias y scripts. |
| `package-lock.json` | Versiones resueltas de dependencias directas y transitivas. |
| `vite.config.js` | Registro del plugin de Vue; aún sin `base` para el subdirectorio de Pages. |
| `index.html` | Título, descripción, Open Graph, fuente Inter, favicon y elemento `#app`. |
| `src/main.js` | Importa estilos, inicializa idioma y monta la aplicación. |
| `src/App.vue` | Compone las diez secciones/componentes principales. |
| `src/i18n.js` | Diccionarios español/inglés, traducción, formato monetario y persistencia de idioma. |
| `src/style.css` | Tokens visuales y clases compartidas. |
| `src/components/` | Diez componentes de presentación e interacción. |
| `public/` | Recursos públicos, incluidos `favicon.svg` e `icons.svg`. |
| `src/assets/` | Recursos de plantilla Vue/Vite; su presencia no demuestra que se rendericen. |
| `.gitignore` | Excluye dependencias instaladas, compilados, logs y archivos locales de editor. |
| `.vscode/extensions.json` | Recomienda `Vue.volar`; no acredita que VS Code sea el IDE utilizado. |

#### Dependencias y configuración

Vue es la única dependencia directa de ejecución declarada. No se incluyen Vue Router, Pinia, Axios, Tailwind, Bootstrap ni `vue-i18n`. La internacionalización y los estilos están implementados en archivos propios. El código analizado no necesita variables de entorno para funcionar como demostración local.

La tipografía Inter se solicita a Google Fonts y dispone de fuentes de sistema como alternativa. Las métricas, nombres y valores de cartera del panel provienen de datos locales. La única persistencia observada es la preferencia de idioma mediante la clave `creditflow-locale` de `localStorage`.

### 5.1.2 Source Code Management
#### Organización de repositorios

| Repositorio | Propósito | Contenido |
|---|---|---|
| [creditor-landing-page](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/creditor-landing-page) | Código de la presentación pública de CreditFlow. | Vue, estilos, traducciones, recursos y configuración de compilación. |
| [upc-project-report](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report) | Informe académico y evidencias. | Capítulos, documentación de sprint, investigación y capturas. |

El nombre técnico del repositorio `creditor-landing-page` se conserva, aunque la marca del producto sea CreditFlow. Esta diferencia no requiere renombrar el repositorio para redactar o publicar la documentación.

#### Estado observado en GitHub

La captura del informe muestra `main` como rama predeterminada, `develop` y las ramas `feature/cap4` y `feature/capitulo-2-competidores-entrevistas`. En esa captura, `develop` aparece 16 commits detrás de `main`; `feature/cap4`, 16 detrás y 6 por delante; y `feature/capitulo-2-competidores-entrevistas`, 0 detrás y 5 por delante. Son valores de ese momento, no un estado actualizado consultado en línea.

La captura del historial de la landing muestra la rama `develop` y commits del 14 de septiembre de 2026 con mensajes de incorporación e integración de funcionalidades. Los mensajes `merge:` evidencian la intención declarada de integrar cambios; sin inspeccionar los padres de cada commit no bastan para demostrar la topología de las fusiones.

La captura de Pull Requests corresponde al **repositorio del informe** y muestra cero abiertos y cero cerrados. No se cuenta con evidencia de revisiones por PR realizadas en la landing. Por tanto, se documenta la estrategia siguiente como una práctica a formalizar, no como una revisión por pares ya completada.

![Ramas del repositorio del informe](creditflow-documentacion/informe/assets/evidence/report-branches.png)

![Pull Requests del repositorio del informe](creditflow-documentacion/informe/assets/evidence/report-pull-requests.png)

#### Estrategia de ramas propuesta

Se propone un flujo ligero de integración con `main`, `develop` y ramas de trabajo. No se afirma la adopción completa de GitFlow, puesto que no se acreditan ramas `release/` o `hotfix/` ni el proceso completo asociado.

| Rama | Función propuesta | Regla de integración |
|---|---|---|
| `main` | Referencia estable y futura fuente de publicación. | Recibir un incremento revisado y compilable. |
| `develop` | Integración de los cambios de la siguiente entrega. | Recibir cambios pequeños desde ramas de trabajo. |
| `feature/<objetivo>` | Trabajo aislado sobre funcionalidad o un capítulo. | Abrir PR hacia `develop` cuando sea revisable. |
| `fix/<problema>` | Corrección identificable. | Documentar comportamiento anterior y corrección. |

Para el informe se proponen `feature/chapter-1-creditflow` y `feature/chapter-5-landing`. Para la preparación de despliegue, `feature/github-pages`. Estos nombres son ejemplos a crear, no ramas verificadas.

Antes de crear una rama desde `develop`, se debe revisar la divergencia observada y sincronizarla mediante una integración revisada de `main`. No se recomienda reemplazar su historial ni forzar un push para ocultar las diferencias.

#### Flujo de trabajo propuesto

1. Definir una tarea con alcance y criterio de aceptación.
2. Actualizar referencias remotas y revisar las diferencias entre ramas.
3. Crear la rama de trabajo desde la base acordada y sincronizada.
4. Realizar un cambio coherente y comprobar el diff.
5. Registrar un commit que describa el cambio real.
6. Publicar la rama y abrir un PR hacia `develop`.
7. Solicitar una revisión, atender observaciones y conservar evidencia.
8. Integrar el incremento revisado de `develop` hacia `main` al preparar la entrega.

```bash
git fetch origin
git switch develop
git pull --ff-only origin develop
git switch -c feature/chapter-5-landing
# Editar únicamente los archivos correspondientes a la tarea.
git diff
# Agregar rutas concretas; evitar incorporar archivos ajenos.
git add docs/chapter-v.md
git commit -m "docs: document landing development environment"
git push -u origin feature/chapter-5-landing
```

Los comandos suponen que `develop` ya fue sincronizada cuando correspondía y que la ruta del informe existe. Si el archivo del capítulo tiene otro nombre, debe utilizarse su ruta real.

#### Contenido de un Pull Request

| Campo | Contenido requerido |
|---|---|
| Título | Cambio principal en una frase. |
| Motivo | Problema que resuelve o sección que completa. |
| Alcance | Archivos y funciones modificados. |
| Verificación | Comandos ejecutados, revisión de enlaces o pruebas, con resultado real. |
| Evidencia | Captura, commit o enlace a ejecución cuando corresponda. |
| Limitaciones | Elementos pendientes y decisiones por confirmar. |

Como regla propuesta, el autor no debe contabilizar una aprobación propia como revisión de otro integrante. La existencia de un commit de documentación demuestra la incorporación de ese contenido en esa fecha; no demuestra que una entrevista, reunión o prueba descrita haya ocurrido.

#### Trazabilidad

Cada historia tendrá un ID `US-LP-xx`, cada tarea `T-LP-xx`, cada prueba `TC-LP-xx` y cada hallazgo heurístico `HEU-xx`. El sprint relacionará estas referencias con componentes y capturas. Una vez creados los Issues y PR, se añadirán sus enlaces reales; no se generan números ficticios.

### 5.1.3 Source Code Style Guide & Conventions
La guía distingue las convenciones observadas de los acuerdos propuestos para mantener la consistencia en siguientes cambios.

#### Vue y organización de componentes

Los diez componentes utilizan archivos `.vue` y `<script setup>`. La estructura habitual organiza lógica, plantilla y `<style scoped>`. `App.vue` funciona como composición de secciones y evita concentrar en un único archivo toda la presentación.

| Elemento | Convención observada | Ejemplo |
|---|---|---|
| Archivos y componentes | PascalCase | `LoanSimulator.vue`, `TheHeader.vue`. |
| Estado simple | `ref` | `menuOpen`, `anual`, `meses`. |
| Formulario | Objeto `reactive` | `form` con nombre, correo y empresa. |
| Valores derivados | `computed` | Cuota, interés total, tarjetas y etiquetas. |
| Iteración de listas | `v-for` con `:key` | Características, preguntas y planes. |
| Formularios | `v-model` y `@submit.prevent` | Captura local sin recarga. |
| Eventos globales | Alta y baja en ciclo de vida | Listener de scroll en el encabezado. |
| Encapsulación visual | `<style scoped>` | Reglas de cada sección. |

Los componentes no exponen contratos propios de `props` o `emits` en la versión revisada. Consumen directamente el composable de traducción y mantienen estado local cuando lo requieren. No se documentan stores o servicios inexistentes.

#### JavaScript

Se observan imports ES Modules, preferencia por `const`, funciones flecha, comillas simples y omisión de punto y coma. Las variables usan camelCase. El código combina nombres en inglés y español: `menuOpen`, `totalPagar`, `enviado`, `tasaAnual`.

Para nuevos cambios se propone mantener el estilo del archivo y usar nombres descriptivos. Una unificación de idioma deberá realizarse en un refactor separado para facilitar revisión. Los cálculos derivados deben permanecer en funciones o propiedades calculadas; no deben duplicarse en plantillas.

La lógica numérica debe distinguir datos de entrada, transformación de tasas y presentación. El formato monetario no debe reemplazar el valor numérico utilizado en el cálculo. Las condiciones especiales, como tasa cero, deben tener una salida definida.

#### HTML y accesibilidad

La estructura utiliza `header`, `nav`, `main`, `section`, `article` y `footer`. El inicio contiene el título principal y las secciones cuentan con encabezados. Hay atributos `aria-expanded` en el menú y FAQ y `aria-pressed` en el selector de idioma.

Para siguientes cambios se establecen como criterios: etiquetas visibles asociadas a campos, mensajes de error relacionados con el campo correspondiente, foco visible, botones con nombre accesible y navegación con teclado. Estas condiciones no se presentan como totalmente cumplidas: el formulario de solicitud utiliza placeholders sin etiquetas y los avisos no tienen una región viva explícita.

#### CSS y diseño

Los estilos siguen una nomenclatura similar a BEM, con bloques, elementos y modificadores: `hero__title`, `btn--primary`, `header--scrolled`. Las utilidades compartidas se definen en `src/style.css`; las reglas de cada sección se mantienen en su componente.

| Token o regla | Valor encontrado | Uso |
|---|---|---|
| `--brand` | `#2563eb` | Color principal. |
| `--brand-dark` | `#1d4ed8` | Variación de énfasis. |
| `--surface` | `#ffffff` | Superficies principales. |
| `--text` | `#101828` | Texto principal. |
| `--text-soft` | `#5a6478` | Texto secundario. |
| `--radius` / `--radius-sm` | 16 px / 10 px | Bordes redondeados. |
| `--max-width` | 1140 px | Ancho máximo del contenedor. |
| Tipografía | Inter con alternativas del sistema | Identidad visual y fallback. |
| Ancho mínimo del documento | 320 px | Límite base definido en `body`. |

Se emplean Grid, Flexbox y tamaños con `clamp()`. Los breakpoints varían según componente, incluidos 520, 560, 640, 720, 860, 900 y 960 px. Su presencia no sustituye la comprobación visual en navegador.

#### Internacionalización

Los textos se centralizan en diccionarios `es` y `en`. `t('ruta.clave')` resuelve valores y permite interpolar parámetros. El idioma se detecta primero desde almacenamiento y luego desde el navegador. Al cambiarlo se actualizan `html[lang]`, el título y la descripción meta.

Se propone que cualquier nuevo texto tenga ambas traducciones. Las claves deben expresar propósito, no posición visual. Los metadatos Open Graph no se actualizan con `setLocale` en la versión inspeccionada. Cambiar de idioma también cambia la moneda formateada en el panel y simulador, pero no convierte importes mediante un tipo de cambio.

#### Convenciones de commits

Formato propuesto: `tipo: descripción breve en inglés` o `tipo(alcance): descripción`.

| Tipo | Uso |
|---|---|
| `feat` | Nueva funcionalidad de la landing. |
| `fix` | Corrección de comportamiento o presentación incorrectos. |
| `docs` | Capítulos, guías, entrevistas, canvas y evidencias documentales. |
| `style` | Formato del código sin cambio de comportamiento. |
| `refactor` | Reorganización interna conservando comportamiento. |
| `test` | Incorporación o modificación de pruebas. |
| `ci` | Automatización en GitHub Actions. |
| `chore` | Mantenimiento y configuración auxiliar. |

Ejemplos propuestos: `docs: add CreditFlow Lean UX Canvas`, `fix: clarify demo form confirmation`, `ci: add GitHub Pages deployment workflow`. La convención documental usa `docs` aunque algunos commits históricos del informe utilicen `feat`.

No existen configuraciones de ESLint o Prettier en el ZIP ni scripts de lint o test. Su adopción puede planificarse posteriormente; no se presentan como controles automáticos existentes.
### 5.1.4 Software Deployment Configuration

## 5.2 Landing Page, Services & Applications Implementation

La documentación detallada de cada iteración se encuentra en [`docs/sprints`](sprints/README.md).

## 5.3 Validation Interviews

### 5.3.1 Diseño de entrevistas

### 5.3.2 Registro de entrevistas

### 5.3.3 Evaluaciones según heurísticas

## 5.4 Video About-the-Product

- **URL:** [Pendiente]

## 5.5 Video About-the-Team

- **URL:** [Pendiente]

