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

Describir la organización de repositorios, ramas y Pull Requests.

### 5.1.3 Source Code Style Guide & Conventions

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

