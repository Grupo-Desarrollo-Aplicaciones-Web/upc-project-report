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
#### Estado y plataforma prevista

La landing **todavía no está publicada**. Se plantea GitHub Pages porque el incremento puede entregarse como HTML, CSS y JavaScript compilados. No requiere un servidor de aplicación para ejecutar sus interacciones locales.

Las capturas muestran un icono de repositorio privado. Antes de configurar Pages, el equipo debe verificar que el plan de la organización permita Pages para ese repositorio; no se debe asumir disponibilidad ni cambiar su visibilidad automáticamente. [Disponibilidad de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

| Parámetro | Valor propuesto para CreditFlow |
|---|---|
| Repositorio | `Grupo-Desarrollo-Aplicaciones-Web/creditor-landing-page`. |
| Rama de publicación | `main`, después de integrar el incremento revisado. |
| Fuente en Settings → Pages | GitHub Actions. |
| Runtime de compilación | Node 22.x, compatible con el requisito desde 22.12.0. |
| Instalación | `npm ci`. |
| Build | `npm run build`. |
| Artefacto | Contenido de `dist/`. |
| Base | `/creditor-landing-page/`. |
| URL esperada, aún no publicada | `https://grupo-desarrollo-aplicaciones-web.github.io/creditor-landing-page/`. |
| Dominio propio | No definido. |
| Credenciales adicionales de aplicación | No requeridas para esta demostración. |

#### Ajuste de Vite

El archivo actual contiene únicamente el plugin de Vue. Para alojar este repositorio bajo su subdirectorio se propone reemplazarlo por:

```js
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  base: '/creditor-landing-page/',
})
```

La ruta base evita que los recursos compilados se busquen en la raíz de la organización. Si el nombre del repositorio o el dominio cambian, se debe revisar este valor. Vite documenta el uso de `base` para sitios de proyecto y la publicación del resultado compilado mediante Actions. [Guía oficial de despliegue de Vite](https://vite.dev/guide/static-deploy.html).

Para el favicon se propone una ruta explícitamente ligada a Vite en `index.html`:

```html
<link rel="icon" type="image/svg+xml" href="%BASE_URL%favicon.svg" />
```

#### Automatización propuesta

Agregar `.github/workflows/deploy.yml` al repositorio de la landing, no al informe. El workflow separa compilación y publicación, usa el lockfile y restringe el job de despliegue a `main`. Los SHA de las acciones corresponden a referencias publicadas en la guía de Vite consultada; su adopción no prueba una ejecución exitosa en este repositorio.

```yaml
name: Deploy CreditFlow landing
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
concurrency:
  group: creditflow-pages
  cancel-in-progress: false
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1
      - uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020
        with:
          node-version: '22'
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@fc324d3547104276b827a68afc52ff2a11cc49c9
        with:
          path: dist
  deploy:
    if: github.ref == 'refs/heads/main'
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.publish.outputs.page_url }}
    steps:
      - name: Publish compiled landing
        id: publish
        uses: actions/deploy-pages@368f82528645a54fb793d4d04e342629a3f51346

```

#### Procedimiento de activación

1. Comprobar acceso a Settings, Actions y Pages y compatibilidad del plan de la organización.
2. Crear una rama para preparar `vite.config.js`, favicon y workflow.
3. Ejecutar instalación, compilación y previsualización; revisar consola y recursos.
4. Abrir un PR para revisar los cambios e integrarlos en la rama acordada.
5. Seleccionar GitHub Actions como fuente de Pages.
6. Integrar el incremento listo en `main` y revisar el resultado del workflow.
7. Utilizar la URL que devuelva la ejecución, verificarla y registrarla como evidencia.

#### Verificación posterior y recuperación

Se debe comprobar que el documento, JavaScript, CSS y favicon carguen sin errores 404; que las anclas, idiomas, simulador, FAQ y formulario mantengan su comportamiento; y que no se interprete la confirmación local como un envío real. Registrar fecha, commit publicado, URL del workflow, resultado y captura.

Si una publicación introduce un problema, preparar un commit de reversión del cambio causante y revisar la nueva compilación. Una reversión de un merge exige identificar correctamente su padre principal; no debe ejecutarse a ciegas. Los commits y ejecuciones anteriores se conservan para trazabilidad.

No se incorpora un mecanismo de rutas SPA porque esta landing navega mediante anclas, sin Vue Router. `dist/` y `node_modules/` permanecen excluidos por `.gitignore`; el workflow transfiere el artefacto compilado.

## 5.2 Landing Page, Services & Applications Implementation

La documentación detallada de la primera iteración se encuentra en [`docs/sprints`](creditflow-documentacion/informe/docs/sprints/README.md), específicamente en [Sprint 1](creditflow-documentacion/informe/docs/sprints/sprint-1.md). No se documentan iteraciones posteriores inexistentes.

### Alcance de implementación

El incremento presenta CreditFlow y permite explorar interacciones de una landing. La página se monta desde `src/main.js` sobre `#app`, aplica el idioma inicial y renderiza los componentes importados por `App.vue`.

| Orden | Componente | Función y comportamiento observado |
|---|---|---|
| 1 | `TheHeader.vue` | Marca, navegación sticky, botones ES/EN, menú móvil y accesos comerciales. El estado de scroll cambia a partir de 12 px; el menú se cierra al seleccionar una sección. |
| 2 | `HeroSection.vue` | Título principal, CTAs y panel ilustrativo. Muestra cartera 486230, crecimiento 12.4%, porcentajes 78/14/8 y tres próximas cuotas fijas. |
| 3 | `FeaturesSection.vue` | Seis tarjetas derivadas del diccionario: préstamos, líneas de crédito, deudas, recordatorios, pagos y reportes. |
| 4 | `HowItWorks.vue` | Cuatro pasos numerados: cliente, crédito, cobranza y análisis. Son explicación del flujo previsto. |
| 5 | `StatsBand.vue` | Franja de cifras promocionales obtenidas del diccionario. Sin fuente de medición implementada. |
| 6 | `LoanSimulator.vue` | Tres controles de rango y cálculo reactivo de cuota, total e interés. |
| 7 | `PricingSection.vue` | Tres planes y alternancia mensual/anual. Los dos primeros tienen precios numéricos; el tercero es personalizado. |
| 8 | `FaqSection.vue` | Cinco preguntas. La primera está abierta inicialmente; pulsarla la cierra y abrir otra cierra la anterior. |
| 9 | `CtaSection.vue` | Nombre, correo y empresa opcional. Valida localmente y sustituye el formulario por una confirmación. |
| 10 | `TheFooter.vue` | Marca, grupos de enlaces, año actual y referencias legales. Los enlaces secundarios son placeholders `#`. |

### Navegación y presentación

Las secciones enlazables son `#inicio`, `#caracteristicas`, `#como-funciona`, `#simulador`, `#planes`, `#faq` y `#demo`. Los CTAs principales y los planes conducen a `#demo`. El enlace `#login` del encabezado carece de destino implementado y debe corregirse o identificarse como una función futura.

El diseño usa superficies claras, azul como color principal, gradientes de énfasis y tarjetas. La navegación cambia a menú colapsado en anchos de hasta 900 px. Las columnas se reducen según el componente; la adaptación está definida en CSS, pendiente de pruebas visuales registradas.

### Internacionalización y formato monetario

`useI18n()` expone `locale`, `t`, `money`, `setLocale`, `toggleLocale` y `otherLocale`. El diccionario contiene objetos y listas que los componentes consumen de forma reactiva. La búsqueda de una traducción intenta primero el idioma seleccionado y después español; si falta la clave, devuelve su ruta.

La selección persiste en `localStorage`. `setLocale` actualiza el atributo de idioma del documento y sus metadatos básicos. El formato monetario se obtiene con `Intl.NumberFormat`: español usa `es-PE/PEN` e inglés usa `en-US/USD`. No existe una operación de cambio de divisa: el valor numérico se conserva.

### Simulador: entradas, cálculo y límites

| Entrada | Inicial | Mínimo | Máximo | Incremento |
|---|---:|---:|---:|---:|
| Monto | 10000 | 500 | 100000 | 500 |
| Tasa anual porcentual | 24 | 0 | 80 | 0.5 |
| Plazo en meses | 12 | 3 | 60 | 1 |

El código calcula `i = tasaAnual / 100 / 12` y, para `i ≠ 0`, utiliza:

```text
cuota = monto × i / (1 − (1 + i)^(−meses))
totalPagar = cuota × meses
totalInteres = totalPagar − monto
```

Si la tasa es cero, la cuota es `monto / meses`. El redondeo de presentación lo realiza el formateador monetario; no se construye una tabla de amortización con ajuste de última cuota.

**Hallazgo de coherencia matemática.** La etiqueta española dice “Tasa anual (TEA)”, pero la transformación implementada divide entre doce. Si la entrada representa una tasa efectiva anual, la tasa mensual equivalente se obtiene como `(1 + tasaAnual / 100) ** (1 / 12) - 1`. El equipo debe decidir entre corregir la transformación o renombrar y explicar la tasa utilizada. La evaluación no considera resuelto ese hallazgo.

Con los valores iniciales y la fórmula actual, el resultado de referencia es aproximadamente 945.60 por mes, 11347.15 de total y 1347.15 de interés. Son valores calculados para contrastar el algoritmo, no evidencia de una prueba visual aprobada ni de una oferta de crédito.

### Planes y formulario

Los precios mensuales definidos son 39 y 89; la vista anual aplica `Math.round(precio × 0.8)`, por lo que muestra 31 y 71 como importe mensual facturado anualmente. El símbolo `$` está fijo en este componente y no utiliza `money()`. El redondeo hace que el descuento mostrado no sea exactamente 20% en ambos casos; se propone ajustar el mensaje o conservar decimales. No se procesa contratación ni cobro.

El formulario usa `novalidate` y validaciones propias. Exige nombre y correo no vacíos tras comprobar `trim()`, y valida el correo con una expresión regular. La empresa es opcional. Al superar esas comprobaciones cambia `enviado` a verdadero y muestra nombre y correo en el mensaje de éxito.

No hay llamada HTTP, persistencia ni notificación. El mensaje de que se enviarán accesos no se corresponde con una operación real. Se propone identificar explícitamente la demostración y permitir editar los datos después de la confirmación.

### Límites de esta entrega

No existen registro de clientes, CRUD de créditos, autenticación, exportación, recordatorios automáticos ni consulta remota de cartera. Su presencia en los textos representa la visión comercial. Las afirmaciones sobre seguridad, respaldos y disponibilidad también requieren implementación y evidencia futuras.

La revisión actual es estática. Se dispone de código y capturas de historial; permanecen pendientes la ejecución documentada de pruebas en navegador, la publicación y las entrevistas con usuarios.

## 5.3 Validation Interviews

Las entrevistas de validación están **pendientes de realización**. Esta sección define un protocolo para evaluar la landing con potenciales usuarios. No incluye citas, participantes reales ni resultados inventados.

### 5.3.1 Diseño de entrevistas

#### Objetivo general

Evaluar si los segmentos objetivo comprenden la propuesta de CreditFlow y pueden explorar la landing para identificar capacidades relevantes, comprender el simulador, comparar planes, consultar dudas y reconocer la interacción de solicitud demostrativa.

#### Objetivos específicos

| ID | Objetivo | Evidencia buscada |
|---|---|---|
| O01 | Evaluar la comprensión del propósito y destinatario. | Explicación libre tras observar el inicio. |
| O02 | Identificar relación con necesidades del negocio. | Ejemplos concretos y capacidades consideradas útiles. |
| O03 | Observar navegación y localización de información. | Tareas completadas, dudas y recorridos. |
| O04 | Evaluar comprensión de entradas y resultados del simulador. | Manipulación de controles y explicación del resultado. |
| O05 | Evaluar claridad de planes, moneda y período. | Comparación expresada por el participante. |
| O06 | Explorar dudas de confianza y adopción. | Información faltante, barreras y requisitos. |
| O07 | Verificar comprensión del formulario de demostración. | Interpretación de validaciones y confirmación. |

#### Alcance y diseño metodológico

Se propone una entrevista semiestructurada acompañada de tareas moderadas y verbalización del pensamiento. La landing se ejecutará en una versión identificada por commit. Mientras no exista publicación, puede utilizarse una sesión local en un equipo del evaluador; si solo se comparte pantalla, se debe registrar que no se midió interacción directa del participante.

Duración propuesta: 35–40 minutos. Muestra inicial: seis participantes, tres por segmento. Selección intencional por experiencia relevante, sin pretensión estadística. Si hay necesidades o fallas importantes no cubiertas, se planificará una nueva ronda y se registrará su justificación.

#### Segmentos y filtro de selección

| Pregunta de filtro | Criterio |
|---|---|
| ¿Participas en decisiones o actividades de préstamos, ventas a crédito o cobros? | Debe existir participación real en el proceso. |
| ¿Cuál es tu responsabilidad principal? | Clasificar como propietario/responsable o encargado operativo. |
| ¿Cuándo realizaste por última vez una tarea relacionada? | Preferencia por experiencia en los últimos tres meses. |
| ¿Qué herramientas utilizas habitualmente? | Registrar contexto, sin excluir por usar una solución competidora. |
| ¿Puedes participar sin mostrar información confidencial de clientes? | Utilizar ejemplos anónimos o ficticios. |
| ¿Formas parte del equipo que desarrolló esta landing? | Excluir del estudio de usuarios; puede participar en revisión interna separada. |

#### Condiciones previas

Antes de la sesión, registrar los defectos conocidos y corregir o advertir claramente los estados simulados. Mantener constantes la versión, instrucciones y datos de prueba entre participantes de una misma ronda. No modificar la interfaz silenciosamente a mitad de la muestra.

Preparar hoja de observación, cronómetro, datos ficticios, versión de la landing y consentimiento. La grabación es opcional y requiere aceptación independiente. No solicitar DNI, credenciales, información bancaria, datos de deudores ni acceso a sistemas del negocio.

#### Roles y materiales

| Elemento | Responsabilidad o uso |
|---|---|
| Moderador | Presentar el estudio, leer consignas neutrales y pedir aclaraciones. |
| Observador | Registrar tiempos, acciones, dudas y ayudas sin interrumpir. |
| Participante | Explorar y explicar lo que piensa, sin obligación de completar tareas. |
| Google Meet | Entrevista remota y, si se acuerda, compartir pantalla. |
| Hoja de registro | Datos de contexto, resultados de tareas y observaciones. |
| Landing identificada | Mismo commit para la ronda, salvo cambio documentado. |

El responsable de preparación documental es Juan Manuel Santos Torres. La asignación de moderadores y observadores queda por confirmar, conservando vacías las tareas no proporcionadas de otros integrantes.

#### Introducción y consentimiento sugeridos

“Estamos evaluando una página de presentación de CreditFlow para un proyecto académico. Queremos conocer qué entiendes y cómo encuentras la información; no estamos evaluando tus conocimientos. La aplicación completa todavía no está disponible y el formulario de esta versión es una demostración que no envía solicitudes. Utilizaremos datos ficticios. Puedes omitir cualquier pregunta o terminar cuando lo desees. ¿Aceptas participar? Por separado, ¿autorizas que grabemos la sesión para analizarla dentro del equipo?”

Registrar ambas respuestas. Si no acepta grabación, tomar notas con su permiso. Para incluir un fragmento identificable en el informe o compartirlo fuera del equipo, obtener autorización específica; un permiso para analizar internamente no equivale a permiso para publicar.

#### Agenda de sesión

| Tiempo aproximado | Actividad |
|---|---|
| 0–3 min | Presentación y consentimiento. |
| 3–8 min | Contexto del participante y proceso actual. |
| 8–12 min | Primera impresión y comprensión. |
| 12–27 min | Tareas de navegación, simulador, planes y formulario. |
| 27–35 min | Preguntas específicas del segmento. |
| 35–40 min | Barreras, valoración y cierre. |

#### Reglas de moderación

No explicar el propósito de cada sección antes de observar su interpretación. No señalar botones ni anticipar respuestas. Si pide ayuda, primero preguntar qué esperaba encontrar. Cuando sea necesaria una indicación directa, registrarla como asistencia y distinguirla de una tarea completada sin ayuda. Evitar preguntas como “¿Te parece fácil nuestra página?”; preguntar “¿Qué parte te resultó clara o confusa?” y solicitar ejemplos.

#### Guion común: contexto y primera impresión

1. ¿Cuál es tu rol y qué relación tienes con préstamos, ventas a crédito o cobros?
2. Cuéntame la última vez que necesitaste consultar cuánto debía un cliente. ¿Qué hiciste?
3. ¿Dónde registras las condiciones, vencimientos y pagos de una operación?
4. ¿Qué parte de ese proceso requiere más atención o consultas?
5. Al observar el inicio de esta página, ¿qué crees que ofrece CreditFlow?
6. ¿Para quién parece estar pensado? ¿Qué elementos te hacen pensar eso?
7. ¿Qué esperarías poder hacer después de pulsar su llamada principal a la acción?
8. ¿Qué información buscarías primero antes de continuar?

No se presupone que el proceso actual sea deficiente. Si el participante no experimenta el problema planteado, esa respuesta constituye evidencia relevante para revisar las hipótesis.

#### Segmento 1: propietarios y responsables de cartera

1. ¿Cómo revisas actualmente el estado general de los créditos o cuentas por cobrar de tu negocio?
2. ¿Qué información consideras prioritaria al decidir qué cobros atender?
3. ¿En qué situaciones tu herramienta actual te resulta suficiente y en cuáles no?
4. ¿Qué capacidades de las presentadas se relacionan con una tarea que realizas? Describe un caso.
5. ¿Hay alguna característica que no necesites o cuyo significado no esté claro?
6. ¿Qué diferencia encuentras entre este producto y una entidad que presta dinero?
7. ¿Qué información necesitarías para evaluar el uso de CreditFlow en tu negocio?
8. ¿Cómo interpretarías los precios y los períodos de los planes mostrados?
9. ¿Qué factores considerarías antes de pagar por una herramienta de este tipo? No es necesario indicar información financiera privada.
10. ¿Qué dudas te generan las afirmaciones sobre ahorro de tiempo, reducción de mora o disponibilidad?
11. ¿Quién más participaría en la decisión de adoptar una herramienta y qué necesitaría evaluar?
12. Después de explorar la página, ¿cuál sería tu siguiente paso y por qué?

**Profundización neutral:** “¿Puedes darme un ejemplo?”, “¿Qué información te falta?”, “¿Cómo lo haces hoy?”, “¿Qué te haría cambiar de opinión?”. No interpretar disposición verbal como compra confirmada.

#### Segmento 2: administradores de créditos y encargados de cobranzas

1. Describe cómo revisas las cuotas que vencen durante una semana habitual.
2. ¿Qué haces cuando recibes un pago parcial y cómo lo relacionas con la operación?
3. ¿Qué información necesitas antes de contactar a una persona por un pago pendiente?
4. ¿Cómo identificas una diferencia entre lo registrado y lo que comunica un cliente?
5. ¿Qué entiendes por “cartera”, “mora” y “cronograma” en esta página?
6. ¿Los cuatro pasos presentados se parecen al orden de tu trabajo? ¿Qué cambiarías?
7. ¿Qué muestra del panel te resulta útil y qué dato necesitarías además?
8. Al utilizar el simulador, ¿qué interpretas por monto, tasa y plazo?
9. ¿Qué crees que representa la cuota mostrada y qué conceptos podría no incluir?
10. ¿Qué información esperabas encontrar en las preguntas frecuentes y no encontraste?
11. ¿En qué dispositivo revisarías esta información y en qué contexto?
12. ¿Qué necesitarías probar en una versión funcional antes de recomendarla a tu equipo?

Las preguntas sobre pagos y cartera exploran necesidades; no solicitan al participante ejecutar módulos inexistentes.

#### Tareas de usabilidad

| Tarea | Consigna neutral | Observar | Criterio propuesto |
|---|---|---|---|
| U01 | “Explora el inicio y explica con tus palabras qué ofrece esta página”. | Interpretación, destinatario y confusión con otorgamiento de préstamos. | Identifica gestión de crédito/cobranza. |
| U02 | “Busca dos funciones que podrían relacionarse con tu trabajo”. | Recorrido y comprensión de características. | Localiza y explica dos capacidades. |
| U03 | “Encuentra dónde se explica el proceso de uso”. | Acceso a los cuatro pasos. | Llega a la sección sin guía directa. |
| U04 | “Prueba una estimación con monto 10000, tasa 24 y plazo 12; luego cambia el monto a 20000. ¿Qué observas?”. | Manejo de sliders y comprensión del cambio. | Modifica el valor y explica la variación, sin valorar todavía la semántica de TEA. |
| U05 | “Compara el plan Negocio mensual con su opción anual. ¿Cómo entiendes el precio?”. | Moneda, importe por mes y facturación. | Explica la diferencia o identifica una duda concreta. |
| U06 | “Busca una respuesta sobre el uso de información existente en el negocio”. | Localización de FAQ/importación. | Encuentra una pregunta relevante y comprende su respuesta como propuesta del producto. |
| U07 | “Cambia el idioma y vuelve al que prefieras”. | Descubrimiento del selector y cambio de contenido. | Completa ambas acciones. |
| U08 | “En esta demostración, prueba el formulario con Persona Demo y el correo correo-invalido; después corrígelo a demo@example.com”. | Error, corrección y comprensión de confirmación local. | Corrige sin guía y no cree que se enviaron accesos. |
| U09 | “Desde la vista móvil, encuentra los planes”. | Menú, foco y anclas. | Completa sin bloqueo; solo se aplica a la submuestra móvil. |

No se exige completar todas las tareas si la persona decide retirarse. Registrar tareas omitidas y su motivo, sin contarlas como éxitos.

#### Valoración posterior y cierre

Después de las tareas principales: “En una escala de 1 a 5, donde 1 significa muy difícil y 5 muy fácil, ¿cómo describirías esta tarea? ¿Por qué?”. La escala es un instrumento local de esta evaluación; no se presenta como un cuestionario estandarizado.

Preguntas finales: ¿Qué fue lo más claro? ¿Qué generó más dudas? ¿Qué cambiarías primero? ¿Qué información necesitarías para decidir si quieres conocer una aplicación funcional? ¿Hay algo que no hayamos preguntado y consideres importante?

Agradecer la participación, recordar el alcance académico y confirmar cómo se utilizarán las notas o grabación autorizada. No prometer acceso a una aplicación que aún no está disponible.

#### Métricas, análisis y criterios de decisión

| Métrica | Cálculo o registro | Interpretación |
|---|---|---|
| Comprensión de propuesta | Participantes que la describen adecuadamente / quienes respondieron U01. | Claridad del propósito en la muestra. |
| Finalización sin ayuda | Tareas completadas sin indicaciones directas / tareas intentadas. | Facilidad observada. |
| Finalización con ayuda | Tareas terminadas tras indicaciones / tareas intentadas. | Dependencia de asistencia. |
| Tiempo por tarea | Segundos desde la consigna hasta completar o detener. | Dato descriptivo, no umbral universal. |
| Errores y bloqueos | Registro de acciones fallidas y puntos de abandono. | Ubicación de barreras. |
| Facilidad percibida | Respuesta de 1 a 5 y justificación. | Percepción complementaria a observación. |
| Dudas recurrentes | Participantes que expresan un mismo tema, con ejemplos. | Prioridad cualitativa. |
| Interés en siguiente paso | Intención declarada y razones. | Indicio de interés; no conversión real. |

Se informarán numeradores y denominadores, por ejemplo “4 de 6”, evitando porcentajes aislados en una muestra pequeña. La comparación por segmento deberá conservar el contexto de solo tres participantes previstos por grupo. Se usarán medianas y rangos descriptivos para tiempos cuando existan suficientes registros comparables.

**Codificación propuesta:** comprensión, pertinencia, navegación, lenguaje financiero, simulador, precios, confianza, formulario y móvil. Cada observación tendrá identificador, participante anonimizado, tarea, evidencia y posible implicación. Una cita literal solo se registrará si realmente fue pronunciada y puede localizarse en notas o grabación.

**Regla de decisión:** contrastar H01–H07 con los criterios del capítulo I, describiendo casos que los contradigan. Si no se cumple un umbral, proponer un cambio concreto y su forma de comprobación. Si se cumple, registrar apoyo exploratorio, sin afirmar validación definitiva del mercado.

**Prioridad de mejoras:** primero los problemas que inducen interpretaciones falsas o bloquean la tarea; después dificultades frecuentes; finalmente ajustes cosméticos. Frecuencia y gravedad se registrarán por separado.

**Limitaciones previstas:** muestra pequeña, selección por conveniencia o acceso, contexto de demostración, ausencia de operaciones reales y posible influencia del moderador. Ninguna entrevista sobre la landing permite medir reducción de mora, disponibilidad del servicio o rentabilidad del producto.

### 5.3.2 Registro de entrevistas

**Estado: entrevistas no realizadas.** Se han reservado seis códigos para organizar la ronda. No corresponden a personas ya entrevistadas y no se les asignan nombres, edades, ocupaciones específicas ni respuestas.

| Código reservado | Segmento previsto | Fecha | Modalidad | Consentimiento | Evidencia | Estado |
|---|---|---|---|---|---|---|
| VAL-S1-01 | Propietario/responsable de cartera | Por programar | Por confirmar | Pendiente | No disponible | No realizada. |
| VAL-S1-02 | Propietario/responsable de cartera | Por programar | Por confirmar | Pendiente | No disponible | No realizada. |
| VAL-S1-03 | Propietario/responsable de cartera | Por programar | Por confirmar | Pendiente | No disponible | No realizada. |
| VAL-S2-01 | Administrador/encargado de cobranzas | Por programar | Por confirmar | Pendiente | No disponible | No realizada. |
| VAL-S2-02 | Administrador/encargado de cobranzas | Por programar | Por confirmar | Pendiente | No disponible | No realizada. |
| VAL-S2-03 | Administrador/encargado de cobranzas | Por programar | Por confirmar | Pendiente | No disponible | No realizada. |

#### Ficha por participante

| Campo | Contenido a registrar durante la sesión |
|---|---|
| Código y segmento | Identificador anónimo y rol principal. |
| Contexto relevante | Tipo de operación, experiencia y herramienta actual, sin datos de clientes. |
| Fecha, duración y modalidad | Datos reales de ejecución. |
| Moderador/observador | Integrantes presentes. |
| Consentimiento | Participación, grabación y difusión, diferenciados. |
| Versión | SHA, URL o entorno local. |
| Entorno del participante | Dispositivo, navegador, idioma y viewport si es posible. |
| Resultados de tareas | U01–U09: completada sin ayuda, con ayuda, fallida u omitida. |
| Observaciones | Acciones y dudas concretas. |
| Citas | Texto exacto y minuto de referencia, cuando exista. |
| Conclusión de sesión | Aprendizajes e incertidumbres. |
| Evidencia autorizada | Enlace con acceso adecuado o notas anonimizadas. |

#### Plantilla de registro por tarea

| Participante | Tarea | Tiempo | Resultado | Ayuda dada | Observación/cita | Evidencia |
|---|---|---|---|---|---|---|
| Completar tras ejecutar | Uxx | | | | | |

#### Matriz de hallazgos de entrevistas

| ID | Evidencia observada | Participantes | Hipótesis relacionada | Interpretación | Cambio propuesto | Estado |
|---|---|---|---|---|---|---|
| Sin hallazgos todavía | Entrevistas pendientes. | No aplica. | H01–H07 pendientes. | No se emiten conclusiones. | Ejecutar protocolo. | Pendiente. |

Para incorporar evidencia al repositorio, utilizar notas anonimizadas y solo material autorizado. Las grabaciones con información personal no deben añadirse automáticamente a un repositorio o enlace público. Antes de entregar, comprobar que el docente pueda abrir el material permitido sin exponer información adicional.

### 5.3.3 Evaluaciones según heurísticas
#### Método y alcance

Se realizó una **inspección estática del código y los textos de la landing** proporcionada. No se efectuó una prueba de usabilidad con participantes ni una auditoría visual automatizada. Por ello, los resultados se describen como hallazgos de inspección y verificaciones pendientes, sin declarar que la interfaz “cumple” de manera general.

La revisión se organiza mediante las diez heurísticas de Nielsen. Los hallazgos, prioridades y recomendaciones siguientes son específicos del código de CreditFlow; no son resultados publicados por la fuente metodológica. [Referencia de las heurísticas de Nielsen](https://www.nngroup.com/articles/ten-usability-heuristics/).

**Escala operativa de prioridad para esta revisión:**

| Valor | Interpretación |
|---|---|
| 0 | Sin problema identificado dentro del alcance inspeccionado; no demuestra ausencia de problemas. |
| 1 | Ajuste menor de claridad o presentación. |
| 2 | Dificultad que puede afectar una tarea pero permite continuar. |
| 3 | Problema importante de comprensión, accesibilidad o correspondencia entre mensaje y acción. |
| 4 | Bloqueo crítico de una tarea esencial o impacto grave demostrado. |

Las severidades son preliminares y se revisarán con observación de usuarios. No se asigna un 4 sin evidencia suficiente de ese impacto.

#### Resumen de inspección

| Heurística | Estado de inspección | Hallazgos relacionados |
|---|---|---|
| 1. Visibilidad del estado del sistema | Retroalimentación local presente; confirmación engañosa. | HEU-01, HEU-06. |
| 2. Correspondencia con el mundo real | Dominio reconocible; discrepancia de tasa y moneda. | HEU-02, HEU-03. |
| 3. Control y libertad | Controles reversibles en varias secciones; salida del formulario insuficiente. | HEU-07, HEU-04. |
| 4. Consistencia y estándares | Sistema visual común; destinos y precios por revisar. | HEU-03, HEU-04, HEU-05. |
| 5. Prevención de errores | Rangos y validaciones básicas presentes; entradas y accesibilidad por mejorar. | HEU-02, HEU-06. |
| 6. Reconocer en lugar de recordar | Secciones etiquetadas; campos dependen de placeholders. | HEU-06. |
| 7. Flexibilidad y eficiencia | Idiomas y anclas presentes; precisión de sliders por comprobar. | HEU-08. |
| 8. Estética y diseño minimalista | Estructura modular; legibilidad visual sin medir. | HEU-09, HEU-10. |
| 9. Reconocer y recuperarse de errores | Mensajes básicos; ausencia de identificación accesible del error. | HEU-06, HEU-07. |
| 10. Ayuda y documentación | FAQ presente; enlaces de soporte/documentación provisionales. | HEU-04, HEU-09. |

#### 1. Visibilidad del estado del sistema

**Evidencia favorable.** El simulador utiliza propiedades calculadas para actualizar resultados; el selector de planes cambia la clase activa; el FAQ comunica su apertura mediante `aria-expanded`; el formulario muestra mensajes de error.

**Problema.** `CtaSection.vue` cambia `enviado` a verdadero sin realizar una solicitud, pero el diccionario promete enviar accesos por correo. El usuario puede interpretar que el equipo recibió sus datos. Los errores y el éxito tampoco tienen una región viva explícita para tecnologías de asistencia.

**Mejora.** Cambiar la confirmación por “Demostración completada; los datos no se enviaron”, añadir anuncios accesibles y mantener la misma condición en ES/EN. No introducir un estado de envío ficticio.

**Criterio de cierre.** La confirmación describe el efecto real y puede percibirse sin depender exclusivamente de la visión. Hallazgos HEU-01 y HEU-06.

#### 2. Correspondencia entre el sistema y el mundo real

**Evidencia favorable.** La landing utiliza términos de gestión crediticia y presenta un flujo desde registro hasta análisis. Los controles del simulador se acompañan de monto, tasa y plazo.

**Problema.** La tasa se etiqueta TEA y el código aplica una división proporcional entre doce. Además, `money()` conserva el valor pero cambia PEN por USD según idioma. Eso puede interpretarse como una conversión económica que no ocurre. La landing no define con suficiente precisión si el precio `$` corresponde a una moneda concreta.

**Mejora.** Alinear concepto de tasa y fórmula; separar idioma de moneda o identificar los valores como ejemplos independientes; definir la moneda de los planes.

**Criterio de cierre.** Texto, cálculo y unidad monetaria son coherentes y el participante puede explicarlos sin atribuir una conversión inexistente. HEU-02 y HEU-03.

#### 3. Control y libertad del usuario

**Evidencia favorable.** El usuario puede cambiar idioma, alternar períodos, modificar sliders y cerrar preguntas. El menú se cierra al elegir enlaces internos.

**Problema.** Tras confirmar el formulario, `v-if` retira sus campos y no ofrece una acción para volver a editar. Los enlaces de login y footer pueden generar recorridos sin destino útil.

**Mejora.** Incorporar “Editar datos” o “Reiniciar demostración”, conservando o restableciendo el estado de forma explícita. Sustituir destinos provisionales por secciones existentes o indicar indisponibilidad de la función.

**Criterio de cierre.** Puede volver al formulario sin recargar y comprender cualquier función aún no disponible. HEU-07 y HEU-04.

#### 4. Consistencia y estándares

**Evidencia favorable.** Los componentes comparten tokens, botones, tarjetas y jerarquías. La navegación principal utiliza etiquetas relacionadas con sus secciones.

**Problema.** El panel y simulador usan el formateador monetario, mientras Planes utiliza `$` fijo. Se anuncia “−20%”, pero se redondea el importe anual equivalente a un entero. La marca CreditFlow convive con el nombre técnico Creditor del repositorio; debe explicarse documentalmente, aunque no impide la interacción.

**Mejora.** Definir criterios consistentes para moneda y precisión. Mostrar importes con decimales o ajustar el texto comercial al descuento efectivo. Conservar la marca pública de forma uniforme.

**Criterio de cierre.** Los precios expresan la misma unidad y la información de descuento coincide con el cálculo. HEU-03 y HEU-05.

#### 5. Prevención de errores

**Evidencia favorable.** Los sliders limitan valores; el plazo mínimo es tres meses; el cálculo tiene un caso para tasa cero. El formulario rechaza vacíos y un formato de correo básico incorrecto.

**Problema.** Las comprobaciones de vacío usan `trim()`, pero el correo validado y mostrado no se normaliza. Un correo con espacios exteriores puede rechazarse. Los campos no ofrecen etiquetas persistentes y la semántica errónea de tasa puede conducir a una interpretación incorrecta aunque el valor esté dentro del rango.

**Mejora.** Normalizar los datos de texto antes de validar, añadir etiquetas e instrucciones y resolver el significado de tasa antes de invitar a interpretar resultados.

**Criterio de cierre.** Entradas ordinarias con espacios exteriores se manejan coherentemente y las restricciones son comprensibles. HEU-02 y HEU-06.

#### 6. Reconocer en lugar de recordar

**Evidencia favorable.** El menú nombra secciones, las tarjetas explican capacidades y el simulador muestra los valores seleccionados junto a los controles.

**Problema.** Nombre, correo y empresa dependen de placeholders; al escribir, esa indicación deja de verse. No existe una etiqueta asociada que permita identificar permanentemente cada campo.

**Mejora.** Añadir `label` vinculados por `for`/`id`, diferenciar el campo opcional y conservar instrucciones visibles cuando sean necesarias.

**Criterio de cierre.** Cada campo conserva un nombre visible y accesible durante toda la interacción. HEU-06.

#### 7. Flexibilidad y eficiencia de uso

**Evidencia favorable.** Existen anclas, selección de idioma persistida y un menú adaptable. Las funciones demostrativas pueden explorarse sin registro.

**Problema a comprobar.** Los controles de rango no tienen un campo numérico complementario. Seleccionar un valor exacto en móvil puede requerir varios intentos. Las reglas responsive no prueban por sí solas que las tareas sean rápidas o cómodas.

**Mejora.** Evaluar primero con usuarios el ajuste preciso; si se confirma dificultad, añadir una entrada numérica sincronizada, conservando límites y validación.

**Criterio de cierre.** El participante alcanza los valores de la tarea sin ayuda o intentos excesivos. No se exigen atajos complejos propios de una aplicación operativa a una landing. HEU-08.

#### 8. Estética y diseño minimalista

**Evidencia favorable.** La estructura separa inicio, características, proceso, simulación, planes, preguntas y solicitud. Los estilos utilizan una paleta y medidas compartidas.

**Limitaciones y riesgo.** No se midieron contraste, legibilidad, tamaño táctil ni desbordamientos. La franja de métricas y varias promesas pueden competir con información necesaria para comprender el alcance real. El desplazamiento suave global no se condiciona a `prefers-reduced-motion` en el código analizado.

**Mejora.** Verificar visualmente ambos idiomas y los viewports propuestos, mantener solo afirmaciones sustentadas o claramente ilustrativas, y respetar preferencias de movimiento reducido.

**Criterio de cierre.** La revisión visual documenta legibilidad y ausencia de solapamientos; las cifras no se presentan como resultados demostrados. HEU-09 y HEU-10.

#### 9. Ayuda para reconocer, diagnosticar y recuperarse de errores

**Evidencia favorable.** El formulario informa si faltan datos y si el correo es inválido, manteniendo el estado mientras se corrige.

**Problema.** El mensaje es general y no se vincula con `aria-describedby` ni se identifica el campo con `aria-invalid`. No existe manejo de error de envío porque no hay envío; documentarlo como tal sería incorrecto. Después de confirmar tampoco hay recuperación hacia edición.

**Mejora.** Asociar cada error con su entrada, anunciar el aviso y ofrecer regreso a edición. La solución debe mantener el carácter local de la demostración.

**Criterio de cierre.** Un participante puede identificar el campo incorrecto y corregirlo, también mediante teclado y tecnología de asistencia. HEU-06 y HEU-07.

#### 10. Ayuda y documentación

**Evidencia favorable.** El FAQ y los cuatro pasos ofrecen explicaciones visibles. El README documenta el desarrollo, aunque no es ayuda destinada al visitante final.

**Problema.** Los enlaces de documentación, soporte, términos y privacidad apuntan a `#`. El formulario menciona aceptación de una política que no tiene un destino informativo real. Las respuestas del FAQ describen seguridad, portales e importación como capacidades disponibles, sin respaldo funcional en el incremento.

**Mejora.** Presentar ayuda y condiciones reales del prototipo, retirar enlaces sin contenido útil o identificarlos claramente como futuros, y revisar la redacción de las funciones proyectadas.

**Criterio de cierre.** Los enlaces de ayuda abren contenido pertinente y el FAQ diferencia con claridad prototipo y visión. HEU-04 y HEU-09.

#### Registro consolidado de hallazgos

| ID | Hallazgo | Archivo/evidencia | Severidad preliminar | Acción y criterio de comprobación |
|---|---|---|---:|---|
| HEU-01 | Confirmación promete accesos sin envío real. | `CtaSection.vue`, textos `cta.successText`. | 3 | Declarar demostración local y comprobar interpretación del mensaje. |
| HEU-02 | Etiqueta TEA y transformación proporcional no coinciden. | `LoanSimulator.vue`, `simulator.rate`. | 3 | Alinear tasa y fórmula; verificar caso conocido y tasa cero. |
| HEU-03 | Cambio de idioma cambia moneda sin conversión; planes usan símbolo fijo. | `src/i18n.js`, `PricingSection.vue`. | 2 | Separar moneda e idioma o aclarar muestras; nombrar moneda de planes. |
| HEU-04 | Login y enlaces secundarios no tienen destino útil. | `TheHeader.vue`, `TheFooter.vue`. | 2 | Probar todos los enlaces y eliminar destinos ficticios. |
| HEU-05 | Redondeo altera el descuento anunciado. | `Math.round(monthly * 0.8)`. | 2 | Consistencia entre importe mostrado, cálculo y texto. |
| HEU-06 | Campos sin etiquetas persistentes y errores no asociados. | `CtaSection.vue`. | 3 | Etiquetas, relación de errores y anuncios accesibles; revisión de teclado y asistencia. |
| HEU-07 | No se puede editar tras confirmar el formulario. | Estado `enviado` y render condicional. | 2 | Acción de regreso a edición sin recarga. |
| HEU-08 | Selección exacta depende únicamente de sliders. | `LoanSimulator.vue`. | 1 | Observar dificultad antes de decidir incorporar entrada numérica. |
| HEU-09 | Métricas y promesas pueden parecer resultados comprobados. | `StatsBand.vue`, diccionario y FAQ. | 3 | Identificar contenido ilustrativo y diferenciar producto futuro. |
| HEU-10 | Responsive, contraste y movimiento requieren validación adicional. | CSS y ausencia de registros de navegador. | 1 | Ejecutar revisión visual y de movimiento; prioridad sujeta a resultados. |

HEU-10 es una necesidad de verificación y mejora, no una afirmación de que el contraste o el responsive fallen. Los diez registros permanecen abiertos; no se documentan correcciones aplicadas al código.

#### Priorización propuesta

Atender primero HEU-01, HEU-02, HEU-06 y HEU-09 porque afectan la comprensión del efecto real, del cálculo o de la interacción. Después resolver enlaces, precios y regreso a edición. Evaluar HEU-08 y HEU-10 con pruebas de interacción y visuales antes de decidir su alcance final.

#### Reevaluación

Cada corrección debe incluir commit, descripción, caso de verificación y evidencia. Repetir las tareas afectadas y revisar ambos idiomas. Un hallazgo se cierra cuando se cumple su criterio y existe evidencia; agregarlo al backlog no lo resuelve.

#### Estado de los videos de la entrega

No se incorporan enlaces ni contenido ficticio para las secciones 5.4 Video About-the-Product y 5.5 Video About-the-Team. Ambos materiales quedan fuera de este documento hasta que el equipo disponga de videos reales. Si la plantilla del curso exige mantener los encabezados, conservar únicamente su estado pendiente.

#### Referencias y evidencia utilizada

- Código entregado: `creditor-landing-page-develop.zip`, referencia `7597586799b350cbdeffec3b9fec4a42b1f55f3d`.
- Capturas proporcionadas: ramas, Pull Requests e historial del informe; historial de la landing.
- [Repositorio de la landing](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/creditor-landing-page). Su contenido fue inspeccionado desde el ZIP; no se verificó acceso remoto autenticado.
- [Repositorio del informe](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report). Historial y ramas documentados desde las capturas.
- [Vite: despliegue estático](https://vite.dev/guide/static-deploy.html).
- [GitHub: disponibilidad y funcionamiento de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).
- [Nielsen Norman Group: diez heurísticas de usabilidad](https://www.nngroup.com/articles/ten-usability-heuristics/).
## 5.4 Video About-the-Product

- **URL:** [Pendiente]

## 5.5 Video About-the-Team

- **URL:** [Pendiente]

