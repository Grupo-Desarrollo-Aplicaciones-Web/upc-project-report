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

# 5.2.1 Sprint 1: Landing Page de CreditFlow

## 5.2.1.1 Sprint Planning 1

**Naturaleza del registro.** Las fechas, horas, estimaciones y actividades de planificación siguientes se proponen para la semana del 14 al 20 de septiembre de 2026. No existe acta que acredite que la reunión ya ocurrió. La implementación visible tiene commits del 14 de septiembre; el plan organiza su documentación, revisión y preparación de entrega, además de reconstruir el backlog del incremento.

| Sprint # | Sprint 1 |
|---|---|
| Sprint Planning Background | Primera entrega de la landing y organización de la evidencia técnica. |
| Inicio propuesto | Lunes 14/09/2026. |
| Fin propuesto | Domingo 20/09/2026. |
| Planificación propuesta | Lunes 14/09/2026, de 19:00 a 20:00, hora de Lima (UTC−5). |
| Location | Google Meet. |
| Prepared By | Juan Manuel Santos Torres. |
| Attendees previstos | Juan Manuel Santos Torres, Sebastián Gutarra Velapatiño y Miguel Angel Egocheaga Suyo. |
| Sprint n−1 Review Summary | No se dispone de un sprint previo documentado para esta entrega. |
| Sprint n−1 Retrospective Summary | No aplica como reunión previa; se propone iniciar con acuerdos sobre alcance y evidencia. |
| Sprint Goal | Consolidar la landing bilingüe de CreditFlow, documentar sus componentes e interacciones, definir su validación y preparar una configuración de publicación estática. |
| Sprint 1 Velocity | No disponible: no existe una medición de historias aceptadas al cierre. |
| Sum of Story Points propuestos | 34 SP. |
| Esfuerzo de tareas estimado | 61 horas-persona; estimación reconstruida, no horas trabajadas acreditadas. |
| Sprint Review propuesta | Domingo 20/09/2026, 19:00–19:40, Google Meet. |
| Retrospectiva propuesta | Domingo 20/09/2026, 19:40–20:00, Google Meet. |

### Agenda de planificación propuesta

| Tiempo | Actividad | Salida esperada |
|---|---|---|
| 10 min | Revisar visión y alcance. | Distinguir landing y aplicación futura. |
| 15 min | Revisar código y funcionalidades. | Inventario del incremento disponible. |
| 15 min | Definir historias y criterios. | Backlog y condiciones de aceptación. |
| 10 min | Revisar riesgos y dependencias. | Lista de defectos y publicación pendiente. |
| 10 min | Acordar evidencias y próximos pasos. | Responsables por confirmar y calendario aceptado. |

### Criterios de entrada propuestos

Cada historia deberá especificar usuario, necesidad, alcance y evidencia esperada. Las tareas de corrección deberán referir el componente afectado. Ninguna tarea de backend o persistencia forma parte de este sprint.

### Definition of Done propuesta

1. La funcionalidad prevista está implementada dentro del alcance de la landing.
2. Los criterios de aceptación cuentan con una verificación registrada.
3. La compilación finaliza correctamente para el commit de entrega.
4. Los cambios no introducen errores de navegación, recursos faltantes ni regresiones conocidas.
5. Los textos ES/EN y los estados de demostración son coherentes.
6. La documentación identifica archivo, commit y limitaciones.
7. Los defectos críticos de honestidad de la interacción y comprensión del cálculo están corregidos o la entrega queda explícitamente condicionada.

La existencia de un componente no permite asignar automáticamente `Done` a la historia. A fecha de corte, no hay cierre ni velocidad medida.

## 5.2.1.2 Aspect Leaders and Collaborators

Los aspectos de esta entrega son documentación de producto, documentación técnica, interfaces de la landing, internacionalización e interacciones, validación y preparación de despliegue.

**L:** responsable principal confirmado. **C:** colaborador confirmado. Una celda vacía indica que el equipo no ha proporcionado una asignación formal. Se mantienen vacías las tareas de Sebastián y Miguel según lo solicitado.

| Team Member | GitHub Username | Capítulo I | Capítulo V | Implementación Vue/CSS | Idiomas e interacciones | Validación documental | Despliegue |
|---|---|---|---|---|---|---|---|
| Juan Manuel Santos Torres | @JuanManuel312 | L | L | | | L | |
| Sebastián Gutarra Velapatiño | @SebastianGutarra |  | | | | | |
| Miguel Angel Egocheaga Suyo | @MiguelAngel0107 | | | | | | |

La responsabilidad de validación documental comprende el protocolo de entrevistas y la inspección heurística; no significa que Juan haya realizado entrevistas o pruebas aún no registradas. Las asignaciones operativas se completarán por acuerdo del equipo.

## 5.2.1.3 Sprint Backlog 1

### Historias de usuario

Las historias e IDs se han elaborado para describir el incremento. Sus estimaciones son propuestas y no corresponden a Issues previamente existentes. Se distingue implementación observable de aceptación pendiente.

| ID | Historia de usuario | SP | Evidencia o situación actual |
|---|---|---:|---|
| US-LP-01 | Como visitante, quiero identificar el propósito de CreditFlow y navegar a las secciones para decidir qué información explorar. | 3 | Header y Hero presentes; enlace de login pendiente de corregir. |
| US-LP-02 | Como responsable de cartera, quiero conocer las capacidades y el flujo previsto para evaluar su relación con mi negocio. | 3 | Features, HowItWorks y Stats presentes; afirmaciones por revisar. |
| US-LP-03 | Como visitante, quiero modificar los parámetros de un préstamo para explorar una estimación de cuota. | 5 | Simulador presente; discrepancia entre etiqueta TEA y cálculo. |
| US-LP-04 | Como potencial cliente, quiero comparar planes y períodos para comprender la propuesta comercial. | 3 | Selector y tarjetas presentes; moneda y redondeo por aclarar. |
| US-LP-05 | Como visitante, quiero consultar preguntas frecuentes para resolver dudas iniciales. | 2 | Acordeón implementado. |
| US-LP-06 | Como visitante interesado, quiero explorar una solicitud de acceso con mensajes claros sobre sus límites. | 3 | Validación local presente; confirmación y accesibilidad por mejorar. |
| US-LP-07 | Como visitante, quiero elegir español o inglés y conservar esa selección para leer el contenido. | 3 | Diccionarios y persistencia presentes. |
| US-LP-08 | Como usuario móvil, quiero explorar el contenido y sus controles sin barreras de distribución o navegación. | 5 | CSS responsive presente; verificación visual y de teclado pendiente. |
| US-LP-09 | Como integrante del equipo, quiero documentación trazable para reproducir y revisar la entrega. | 2 | README técnico existente; capítulos y protocolo preparados para incorporar. |
| US-LP-10 | Como evaluador, quiero acceder a una versión publicada para revisar el incremento sin instalarlo. | 5 | Publicación pendiente; configuración propuesta. |
| **Total** | | **34** | **No equivale a velocidad completada.** |

### Criterios de aceptación

**US-LP-01**

- Dada la sección inicial, el visitante encuentra marca, propósito y dos llamadas a la acción.
- Al seleccionar una sección existente desde el encabezado, llega a su destino.
- En móvil, el menú puede abrirse y cerrarse, y se cierra al seleccionar un enlace de sección.
- Ningún acceso presentado como operativo conduce a una sección inexistente. El enlace `#login` impide dar por cumplido este criterio.

**US-LP-02**

- Se presentan seis capacidades y cuatro pasos en un orden comprensible.
- Los textos están disponibles en ambos idiomas.
- Las capacidades futuras se distinguen de las funciones del prototipo.
- Las cifras promocionales se sustentan o se identifican como ilustrativas antes de la evaluación.

**US-LP-03**

- Monto, tasa y plazo permiten seleccionar los rangos definidos por el componente.
- La cuota, total e interés responden a los valores actuales sin recarga.
- Una tasa cero produce cuota igual a monto/plazo e interés total cero.
- La definición de tasa coincide con la transformación aplicada.
- El usuario comprende que es una estimación sin comisiones ni una operación real.

**US-LP-04**

- Se presentan tres planes y se diferencia el destacado.
- El selector actualiza precios y descripción del período.
- El plan corporativo mantiene la indicación de precio personalizado.
- El precio, la moneda y el descuento se comunican sin ambigüedad.
- El CTA conduce al formulario; no se declara una suscripción contratada.

**US-LP-05**

- Se presentan cinco preguntas y una respuesta visible al inicio.
- Pulsar la pregunta abierta la cierra; pulsar otra cambia la respuesta visible.
- `aria-expanded` corresponde al estado.
- El contenido responde sobre la visión del producto sin fingir servicios ya disponibles.

**US-LP-06**

- Nombre y correo son obligatorios; empresa es opcional.
- Una entrada inválida muestra un mensaje comprensible y conserva los datos.
- Los campos cuentan con nombres accesibles y el error puede identificarse.
- La confirmación informa que la interacción es una demostración local.
- El visitante puede corregir los datos sin tener que recargar toda la página. Los tres últimos criterios requieren mejoras.

**US-LP-07**

- Los botones permiten seleccionar ES o EN.
- El contenido y los metadatos básicos se actualizan.
- La selección persiste al recargar en condiciones normales de almacenamiento.
- El comportamiento de moneda se explica como formato de muestra, no conversión.

**US-LP-08**

- Las pruebas propuestas a 360, 768 y 1440 px no presentan solapamiento o desplazamiento horizontal no intencional.
- Los controles se operan mediante teclado y muestran foco.
- Los títulos de las secciones enlazadas no quedan ocultos por el encabezado.
- La lectura y la interacción se mantienen en ambos idiomas.

**US-LP-09**

- El entorno y los scripts coinciden con el manifest y lockfile.
- La documentación separa hechos, propuestas y pendientes.
- Las capturas se relacionan con el repositorio correcto.
- El protocolo no incluye entrevistas ni resultados inventados.

**US-LP-10**

- La compilación de un commit integrado en `main` finaliza correctamente.
- La URL devuelve el contenido y los recursos bajo el subdirectorio del proyecto.
- Se conservan el enlace de ejecución y el commit desplegado.
- La prueba de humo de navegación e interacciones queda registrada.

### Work Items y estimaciones

Los tiempos son una estimación académica reconstruida, no una declaración de dedicación histórica. “Código presente” significa que existe una implementación inspeccionable; no equivale a una tarea aceptada. Las asignaciones de implementación se mantienen vacías hasta que el equipo las confirme.

| Sprint | User Story | Work-Item / Task | Description | Estimation (Hours) | Assigned To | Status |
|---|---|---|---|---:|---|---|
| 1 | US-LP-01 | T-LP-01 | Crear encabezado, marca y enlaces de sección. | 3 | | Código presente; revisión pendiente. |
| 1 | US-LP-01 | T-LP-02 | Construir hero, CTAs y panel ilustrativo. | 2 | | Código presente; revisión pendiente. |
| 1 | US-LP-02 | T-LP-03 | Presentar seis características y cuatro pasos. | 3 | | Código presente. |
| 1 | US-LP-02 | T-LP-04 | Revisar métricas y diferenciar promesas de funciones reales. | 2 | | Pendiente de ajuste. |
| 1 | US-LP-03 | T-LP-05 | Implementar entradas reactivas y resultados del simulador. | 4 | | Código presente. |
| 1 | US-LP-03 | T-LP-06 | Resolver definición de tasa y contrastar casos de cálculo. | 3 | | Pendiente. |
| 1 | US-LP-04 | T-LP-07 | Implementar tarjetas y selector mensual/anual. | 2 | | Código presente. |
| 1 | US-LP-04 | T-LP-08 | Aclarar moneda, descuento y facturación. | 2 | | Pendiente. |
| 1 | US-LP-05 | T-LP-09 | Crear acordeón con estado reactivo y traducciones. | 2 | | Código presente. |
| 1 | US-LP-05 | T-LP-10 | Revisar contenido, teclado y estado accesible del FAQ. | 2 | | Pendiente de verificación. |
| 1 | US-LP-06 | T-LP-11 | Implementar validaciones locales del formulario. | 3 | | Código presente. |
| 1 | US-LP-06 | T-LP-12 | Corregir confirmación, etiquetas, avisos y regreso a edición. | 3 | | Pendiente. |
| 1 | US-LP-07 | T-LP-13 | Implementar diccionarios, selector y persistencia. | 3 | | Código presente. |
| 1 | US-LP-07 | T-LP-14 | Revisar formatos monetarios y completitud ES/EN. | 2 | | Pendiente de verificación. |
| 1 | US-LP-08 | T-LP-15 | Adaptar rejillas, controles y menú a varios anchos. | 4 | | Reglas CSS presentes. |
| 1 | US-LP-08 | T-LP-16 | Ejecutar pruebas responsive, teclado y destinos de enlaces. | 4 | | Pendiente de ejecución. |
| 1 | US-LP-09 | T-LP-17 | Adaptar capítulo I y documentar configuración e implementación. | 6 | Juan Manuel Santos Torres | Contenido preparado para incorporar y revisar. |
| 1 | US-LP-09 | T-LP-18 | Diseñar entrevistas, registrar inspección y organizar evidencias. | 5 | Juan Manuel Santos Torres | Contenido preparado; entrevistas pendientes. |
| 1 | US-LP-10 | T-LP-19 | Preparar configuración de ruta base y workflow de Pages. | 4 | | Propuesta preparada; adopción pendiente. |
| 1 | US-LP-10 | T-LP-20 | Publicar, verificar URL y registrar ejecución. | 2 | | Pendiente. |
| | | **Total** | | **61** | | |

### Dependencias y prioridades

- T-LP-06 debe resolverse antes de considerar correcto el significado del cálculo.
- T-LP-12 debe preceder a una validación donde los participantes puedan interpretar el formulario como un envío real.
- T-LP-16 requiere una versión ejecutable y debe producir evidencia por caso.
- T-LP-20 depende de T-LP-19, de una compilación correcta y de acceso habilitado a Pages.
- El backlog de documentación puede incorporarse sin atribuir a otros integrantes tareas no confirmadas.

Las pruebas y el registro de cierre determinarán qué historias se aceptan. La velocidad se calculará sumando únicamente los SP de historias aceptadas según la Definition of Done.

## 5.2.1.4 Development Evidence for Sprint Review

### Evidencias disponibles

| ID | Evidencia | Qué permite afirmar | Límite |
|---|---|---|---|
| DEV-01 | ZIP de `develop` con comentario SHA `7597586799b350cbdeffec3b9fec4a42b1f55f3d`. | Contenido técnico del incremento inspeccionado. | No contiene el directorio `.git` ni ejecuciones de pruebas. |
| DEV-02 | Captura de commits de la landing, 14/09/2026. | Historial visible de incorporación e integración de secciones. | No demuestra aprobación por PR ni la ejecución correcta. |
| DEV-03 | Captura de ramas del informe. | Existencia y divergencia de las ramas mostradas. | Estado de la captura, no comprobación remota actual. |
| DEV-04 | Captura de commits del informe, 08 y 09/09/2026. | Trabajo documental previo de los usuarios visibles. | No acredita que esos contenidos ya estén alineados a esta versión. |
| DEV-05 | Captura de Pull Requests del informe. | Cero abiertos y cero cerrados mostrados. | No describe el repositorio de la landing. |

![Historial de implementación de la landing](creditflow-documentacion/informe/assets/evidence/landing-commits.png)

### Historial de la landing visible en la captura

Todos los registros de esta tabla aparecen el 14/09/2026 asociados al usuario `MiguelAngel0107`. Se transcriben los mensajes visibles sin inventar PR ni tiempos de trabajo.

| Orden lógico | Mensaje | Relación con el incremento |
|---|---|---|
| 1 | `chore: initialize landing page repository` | Base del repositorio. |
| 2 | `feat: add Vue landing foundation` | Estructura inicial Vue. |
| 3 | `merge: integrate landing foundation` | Integración declarada de la base. |
| 4 | `feat: add navigation and hero section` | Encabezado e inicio. |
| 5 | `merge: integrate navigation and hero section` | Integración declarada de navegación e inicio. |
| 6 | `feat: add product overview sections` | Secciones informativas. |
| 7 | `merge: integrate product overview sections` | Integración declarada de presentación. |
| 8 | `feat: add loan installment simulator` | Simulador de cuotas. |
| 9 | `merge: integrate loan installment simulator` | Integración declarada del simulador. |
| 10 | `feat: add conversion and footer sections` | Conversión y pie de página. |
| 11 | `merge: integrate conversion and footer sections` | Último registro visible, SHA abreviado `7597586`. |

La asociación de usuario en una captura acredita ese registro de GitHub, no permite inferir que una sola persona elaboró todas las líneas del cambio ni reconstruir colaboraciones no registradas.

### Evidencia documental previa

![Historial del informe académico](creditflow-documentacion/informe/assets/evidence/report-commits.png)

La captura muestra commits de `JuanManuel312` sobre startup, perfiles, problemática, Lean UX y segmentos el 8 de septiembre. El 9 de septiembre se observan commits de `SebastianGutarra` sobre diseño, branding e imágenes. Esta evidencia se conserva como antecedente. Los nuevos bloques documentales deben registrarse en la fecha real de su incorporación.

### Evidencias que completarán la revisión

Se deberán añadir enlaces al commit final de cada repositorio, PR si se utilizan, resultado de compilación y capturas de la landing ejecutándose. Cada imagen debe indicar versión, fecha y contexto; una captura del historial no reemplaza una captura funcional.

## 5.2.1.5 Execution Evidence for Sprint Review

La ejecución funcional no está acreditada con resultados de navegador en el material disponible. Se presenta un plan de verificación reproducible. Todos los casos comienzan como **pendientes**; los resultados esperados se derivan del código y de los criterios propuestos.

### Preparación

Registrar commit, fecha, sistema operativo, navegador y versión, viewport y versiones de Node/npm. Ejecutar `npm ci`, `npm run build` y `npm run preview`, conservando el resultado. Utilizar datos ficticios para el formulario.

| ID | Historia | Acción | Resultado esperado o condición a comprobar | Estado |
|---|---|---|---|---|
| TC-LP-01 | US-LP-09 | Instalar desde lockfile y compilar. | Comandos finalizan correctamente y se genera `dist/`. | Pendiente. |
| TC-LP-02 | US-LP-01 | Abrir la página y recorrer anclas. | Cada enlace principal lleva a su sección. | Pendiente. |
| TC-LP-03 | US-LP-01/08 | Abrir menú a 360 px y seleccionar Planes. | Menú visible al abrir; se cierra y llega a Planes. | Pendiente. |
| TC-LP-04 | US-LP-07 | Cambiar ES/EN. | Contenido, título, descripción y `html[lang]` cambian. | Pendiente. |
| TC-LP-05 | US-LP-07 | Elegir idioma y recargar. | Conserva selección si almacenamiento está disponible. | Pendiente. |
| TC-LP-06 | US-LP-03 | Usar 10000, 24% y 12 meses. | Fórmula actual: cuota ≈945.60, total ≈11347.15 e interés ≈1347.15; la etiqueta de tasa sigue siendo un hallazgo. | Pendiente. |
| TC-LP-07 | US-LP-03 | Usar 12000, 0% y 12 meses. | Cuota 1000, total 12000, interés 0. | Pendiente. |
| TC-LP-08 | US-LP-03 | Probar mínimos y máximos permitidos. | Salidas finitas; sin valores inválidos ni desbordamiento de layout. | Pendiente. |
| TC-LP-09 | US-LP-03/07 | Cambiar idioma con monto fijo. | Detectar y documentar cambio de símbolo sin cambio numérico. | Pendiente. |
| TC-LP-10 | US-LP-04 | Alternar mensual/anual. | Código actual muestra 39/89 y 31/71; plan a medida no cambia a número. | Pendiente. |
| TC-LP-11 | US-LP-04 | Pulsar CTA de cada plan. | Navega a `#demo`; no contrata un plan. | Pendiente. |
| TC-LP-12 | US-LP-05 | Abrir y cerrar preguntas. | Una o ninguna respuesta visible; ARIA refleja el estado. | Pendiente. |
| TC-LP-13 | US-LP-06 | Enviar nombre/correo vacíos. | Mensaje de campos obligatorios y conservación del formulario. | Pendiente. |
| TC-LP-14 | US-LP-06 | Usar nombre ficticio y `correo-invalido`. | Mensaje de correo inválido. | Pendiente. |
| TC-LP-15 | US-LP-06 | Usar `Persona Demo` y `demo@example.com`. | Confirmación local; comprobar en red que no exista envío de solicitud. | Pendiente. |
| TC-LP-16 | US-LP-06 | Intentar editar después de confirmar. | Registrar ausencia actual de acción de edición como defecto. | Pendiente. |
| TC-LP-17 | US-LP-08 | Recorrer la página con Tab, Enter y flechas en sliders. | Acciones disponibles y foco visible; registrar cualquier bloqueo. | Pendiente. |
| TC-LP-18 | US-LP-08 | Revisar 360, 768 y 1440 px en ES y EN. | Sin solapamientos ni scroll horizontal no previsto. | Pendiente. |
| TC-LP-19 | US-LP-01 | Probar login y enlaces del footer. | Reproducir destinos inexistentes/provisionales y abrir incidencias. | Pendiente. |
| TC-LP-20 | US-LP-10 | Abrir versión publicada y revisar red. | Documento y recursos disponibles; sin 404 bajo subdirectorio. | Pendiente de publicación. |

TC-LP-06 y TC-LP-10 describen el comportamiento actual, no validan su semántica financiera o comercial. Después de corregir tasa o precios, se actualizarán sus oráculos esperados.

### Registro por ejecución

| Campo | Información a completar |
|---|---|
| Test case ID | TC-LP-xx. |
| Commit y rama | Versión exacta ejecutada. |
| Fecha y ejecutor | Identidad y momento de la prueba. |
| Entorno | Navegador, versión y viewport. |
| Pasos y datos | Entradas utilizadas. |
| Resultado obtenido | Observación factual. |
| Veredicto | Aprobado, fallido o bloqueado. |
| Evidencia | Captura, video o log. |
| Incidencia | Enlace real, si corresponde. |

### Recorrido de Sprint Review propuesto

Demostrar la comprensión del inicio, cambiar idioma, recorrer características, modificar el simulador, comparar planes, abrir preguntas y probar validaciones. Aclarar antes del formulario que la solicitud es local. Cerrar con defectos conocidos, estado del despliegue y decisiones de aceptación. Duración de demostración propuesta: 10–15 minutos dentro de la reunión de revisión.

## 5.2.1.6 Services Documentation Evidence for Sprint Review

La denominación de esta sección se conserva por compatibilidad con la plantilla. En esta entrega no hay servicios HTTP propios implementados, por lo que la evidencia se centra en módulos y contratos locales de interfaz.

| Unidad | Entradas | Salidas/efectos | Dependencias |
|---|---|---|---|
| `src/main.js` | Documento con `#app`. | Montaje de Vue y aplicación del idioma. | Vue, App, CSS e i18n. |
| `setLocale(code)` | Código soportado `es` o `en`. | Actualiza estado, almacenamiento y metadatos básicos; ignora códigos no soportados. | DOM y `localStorage`. |
| `t(path, params)` | Ruta de traducción y parámetros opcionales. | Texto, lista u objeto del diccionario, con fallback. | Diccionario y locale reactivo. |
| `money(value)` | Número. | Moneda formateada; valores no finitos se muestran como cero. | `Intl.NumberFormat`. |
| `LoanSimulator` | Monto, tasa anual, meses. | Cuota, total e interés calculados. | `ref`, `computed`, `money`. |
| `PricingSection` | Estado mensual/anual. | Precio calculado, etiqueta del período y CTA. | Datos locales y traducciones. |
| `FaqSection` | Índice de pregunta pulsada. | Actualización del índice abierto. | `ref` y diccionario. |
| `CtaSection.submit` | Nombre, correo y empresa. | Error local o cambio al estado confirmado. | Estado reactivo y traducciones. |

La persistencia del idioma es compartida por el módulo; los estados del menú, FAQ, precios, formulario y simulador son locales a sus componentes. No existe un contrato de API de solicitudes ni un endpoint que pueda probarse con Swagger o Postman.

### Documentos y referencias técnicas

- `README.md` de la landing: instrucciones de ejecución, estructura, idiomas y nota sobre formulario simulado.
- `package.json` y `package-lock.json`: dependencias y scripts.
- Capítulo V, sección 5.1: configuración y convenciones.
- Sección 5.2: inventario de componentes y comportamiento.
- Esta documentación de sprint: historias, tareas, casos de verificación y evidencia de historial.
- Sección 5.3: protocolo de entrevistas y hallazgos heurísticos.

La mención a una futura integración ASP.NET en el README y un comentario del formulario no acredita backend implementado. No se incorpora como parte de esta entrega ni se redactan endpoints ficticios.

## 5.2.1.7 Software Deployment Evidence for Sprint Review

**Estado actual: pendiente de publicación.** El equipo ha indicado GitHub Pages como alternativa prevista. No se dispone de URL activa verificada, ejecución exitosa de Actions ni evidencia de despliegue.

| Evidencia | Estado al corte | Requisito para completarla |
|---|---|---|
| Configuración de Vite para Pages | Propuesta en 5.1.4. | Incorporar ruta base y revisar compilación. |
| Workflow de publicación | Propuesta entregada. | Incorporar y ejecutar en el repositorio de la landing. |
| Build del commit de entrega | Sin resultado registrado. | Adjuntar log con finalización correcta. |
| URL pública | No disponible. | Registrar la URL devuelta por Pages. |
| Recursos JS/CSS/favicon | No comprobados en hosting. | Verificar solicitudes y ausencia de errores 404. |
| Prueba de humo | Pendiente. | Ejecutar navegación e interacciones. |
| Versión publicada | No registrada. | Identificar SHA y, si se acuerda, etiqueta de entrega. |

### Ficha de despliegue para completar

| Campo | Registro |
|---|---|
| Fecha y hora | Pendiente. |
| Responsable | Pendiente. |
| Rama y SHA | Pendiente. |
| Workflow / ejecución | Pendiente. |
| Resultado de build | Pendiente. |
| URL del sitio | Pendiente. |
| Navegador y viewport de validación | Pendiente. |
| Incidencias y decisión de entrega | Pendiente. |

La dirección esperada por el nombre del repositorio no debe etiquetarse como “sitio publicado” hasta comprobarla. La ejecución local con Vite y la publicación en Pages son evidencias distintas.
## 5.2.1.8 Team Collaboration Insights during Sprint

### Observaciones sustentadas

El proyecto separa implementación e informe en dos repositorios. Las capturas de la landing agrupan cambios por base, navegación, presentación, simulador y conversión. El informe cuenta con ramas dedicadas a capítulos y antecedentes de trabajo documental. Esta organización ofrece puntos concretos para relacionar cambios con entregables.

La captura de ramas del informe muestra divergencia entre `main` y `develop`; por ello es necesario revisar la base de integración antes de abrir nuevas ramas. La captura de PR del informe no acredita revisión por pares. El código contiene comentarios y un README que hacen visible la condición local del formulario, aunque esa limitación todavía no se expresa correctamente al visitante.

### Acuerdos propuestos

| Aspecto | Acción propuesta | Evidencia futura |
|---|---|---|
| Reuniones | Usar Google Meet y conservar un acta breve con decisiones. | Fecha, asistentes, acuerdos y tareas. |
| Seguimiento | Crear Issues por historia, defecto o tarea documental. | Enlaces e IDs reales. |
| Integración | Sincronizar ramas y revisar cambios mediante PR. | Diff, revisión y resultado. |
| Documentación | Mantener separados hechos, propuestas y pruebas pendientes. | Capítulos actualizados. |
| Validación | Registrar cada prueba con versión, entrada y resultado. | Matriz completada. |
| Publicación | Asociar URL, workflow y SHA. | Ficha de despliegue. |

### Fortalezas observables

La separación por componentes facilita localizar responsabilidades técnicas. Los diccionarios concentran contenido bilingüe. Los commits visibles contienen mensajes que permiten relacionar grupos de cambios con secciones de la landing.

### Oportunidades de mejora

Resolver enlaces provisionales, aclarar el estado de demostración, alinear la etiqueta de tasa con el cálculo y formalizar los criterios de aceptación. También se propone registrar versiones locales, completar asignaciones y evitar confundir afirmaciones promocionales con evidencia de resultados.

### Retrospectiva propuesta

Durante la reunión de cierre, cada integrante identificará una práctica que convenga mantener, una dificultad concreta y una acción para el siguiente incremento. La acción deberá tener responsable y evidencia de cumplimiento. No se atribuyen comentarios, consensos o reuniones no realizadas.

### Métricas disponibles y pendientes

Se conoce el alcance propuesto de 34 SP y 61 horas-persona estimadas. No existe velocidad real, tiempo efectivo, tasa de defectos ni porcentaje de pruebas aprobadas medidos. Estas métricas se completarán con el cierre y sus registros.
## 5.4 Video About-the-Product

- **URL:** [Pendiente]

## 5.5 Video About-the-Team

- **URL:** [Pendiente]
