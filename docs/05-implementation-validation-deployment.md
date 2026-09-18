# Capítulo V: Product Implementation, Validation & Deployment

Este capítulo documenta la primera entrega de **CREDITOR**, limitada a su landing page. La referencia técnica es el archivo `creditor-landing-page-develop.zip`, asociado por su comentario de archivo al commit `chore: initialize landing page repository`, junto con las capturas de GitHub proporcionadas por el equipo. Fecha de corte documental: **16 de septiembre de 2026**.

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
| `package.json` | Nombre interno `creditor-landing`, versión `0.0.0`, dependencias y scripts. |
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

La tipografía Inter se solicita a Google Fonts y dispone de fuentes de sistema como alternativa. Las métricas, nombres y valores de cartera del panel provienen de datos locales. La única persistencia observada es la preferencia de idioma mediante la clave `creditor-locale` de `localStorage`.

### 5.1.2 Source Code Management
#### Organización de repositorios

| Repositorio | Propósito | Contenido |
|---|---|---|
| [creditor-landing-page](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/creditor-landing-page) | Código de la presentación pública de CREDITOR. | Vue, estilos, traducciones, recursos y configuración de compilación. |
| [upc-project-report](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report) | Informe académico y evidencias. | Capítulos, documentación de sprint, investigación y capturas. |

El nombre técnico del repositorio `creditor-landing-page` se conserva, aunque la marca del producto sea CREDITOR. Esta diferencia no requiere renombrar el repositorio para redactar o publicar la documentación.

#### Estado observado en GitHub

La captura del informe muestra `main` como rama predeterminada, `develop` y las ramas `feature/cap4` y `feature/capitulo-2-competidores-entrevistas`. En esa captura, `develop` aparece 16 commits detrás de `main`; `feature/cap4`, 16 detrás y 6 por delante; y `feature/capitulo-2-competidores-entrevistas`, 0 detrás y 5 por delante. Son valores de ese momento, no un estado actualizado consultado en línea.

La captura del historial de la landing muestra la rama `develop` y commits del 14 de septiembre de 2026 con mensajes de incorporación e integración de funcionalidades. Los mensajes `merge:` evidencian la intención declarada de integrar cambios; sin inspeccionar los padres de cada commit no bastan para demostrar la topología de las fusiones.

La captura de Pull Requests corresponde al **repositorio del informe** y muestra cero abiertos y cero cerrados. No se cuenta con evidencia de revisiones por PR realizadas en la landing. Por tanto, se documenta la estrategia siguiente como una práctica a formalizar, no como una revisión por pares ya completada.

![Ramas del repositorio del informe](creditor-documentacion/informe/assets/evidence/report-branches.png)

![Pull Requests del repositorio del informe](creditor-documentacion/informe/assets/evidence/report-pull-requests.png)

#### Estrategia de ramas propuesta

Se propone un flujo ligero de integración con `main`, `develop` y ramas de trabajo. No se afirma la adopción completa de GitFlow, puesto que no se acreditan ramas `release/` o `hotfix/` ni el proceso completo asociado.

| Rama | Función propuesta | Regla de integración |
|---|---|---|
| `main` | Referencia estable y futura fuente de publicación. | Recibir un incremento revisado y compilable. |
| `develop` | Integración de los cambios de la siguiente entrega. | Recibir cambios pequeños desde ramas de trabajo. |
| `feature/<objetivo>` | Trabajo aislado sobre funcionalidad o un capítulo. | Abrir PR hacia `develop` cuando sea revisable. |
| `fix/<problema>` | Corrección identificable. | Documentar comportamiento anterior y corrección. |

Para el informe se proponen `feature/chapter-1-creditor` y `feature/chapter-5-landing`. Para la preparación de despliegue, `feature/github-pages`. Estos nombres son ejemplos a crear, no ramas verificadas.

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

Ejemplos propuestos: `docs: add CREDITOR Lean UX Canvas`, `fix: clarify demo form confirmation`, `ci: add GitHub Pages deployment workflow`. La convención documental usa `docs` aunque algunos commits históricos del informe utilicen `feat`.

No existen configuraciones de ESLint o Prettier en el ZIP ni scripts de lint o test. Su adopción puede planificarse posteriormente; no se presentan como controles automáticos existentes.
### 5.1.4 Software Deployment Configuration
#### Estado y plataforma prevista

La landing **todavía no está publicada**. Se plantea GitHub Pages porque el incremento puede entregarse como HTML, CSS y JavaScript compilados. No requiere un servidor de aplicación para ejecutar sus interacciones locales.

Las capturas muestran un icono de repositorio privado. Antes de configurar Pages, el equipo debe verificar que el plan de la organización permita Pages para ese repositorio; no se debe asumir disponibilidad ni cambiar su visibilidad automáticamente. [Disponibilidad de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

| Parámetro | Valor propuesto para CREDITOR |
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
name: Deploy CREDITOR landing
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
concurrency:
  group: creditor-pages
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

La documentación detallada de la primera iteración se encuentra en [`docs/sprints`](creditor-documentacion/informe/docs/sprints/README.md), específicamente en [Sprint 1](creditor-documentacion/informe/docs/sprints/sprint-1.md). No se documentan iteraciones posteriores inexistentes.

### Alcance de implementación

El incremento presenta CREDITOR y permite explorar interacciones de una landing. La página se monta desde `src/main.js` sobre `#app`, aplica el idioma inicial y renderiza los componentes importados por `App.vue`.

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


## 5.4 Video About-the-Product

- **URL:** [Pendiente]

## 5.5 Video About-the-Team

- **URL:** [Pendiente]
