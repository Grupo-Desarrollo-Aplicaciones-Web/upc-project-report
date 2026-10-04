# Capítulo V: Product Implementation, Validation & Deployment

Este capítulo registra la preparación local de TB1 al **3 de octubre de 2026**. El incremento reúne una landing orientada a cuentas por pagar y la primera frontend para consultar obligaciones, registrar compras y abonos. La API propia y la persistencia centralizada se mantienen en el diseño de AV2. El trabajo solicitado no incluye publicación ni despliegue.

## 5.1 Software Configuration Management

### 5.1.1 Software Development Environment Configuration

| Producto o herramienta | Uso | Referencia |
|---|---|---|
| Vue y Vite | Componentes reactivos, desarrollo y compilación de ambos productos web. | Manifests y lockfiles de landing/frontend. |
| PrimeVue | Controles de la frontend con etiquetas y estados accesibles. | Dependencias y componentes de la frontend. |
| Node.js y npm | Instalación reproducible, pruebas y build local. | Versiones registradas en la evidencia de ejecución. |
| Git | Features, integración local y trazabilidad. | Historial de cada repositorio y CONTRIBUTING. |
| GitHub | Historial remoto de AV1, conservado como referencia. | Organización Grupo-Desarrollo-Aplicaciones-Web. |
| Figma y UXPressia | Herramientas requeridas para diseño e investigación del curso. | La sincronización de los artefactos locales a estas herramientas queda pendiente. |
| Trello/Jira/YouTrack | Tablero de sprint del curso. | Se prepara una tabla local; su tablero externo queda pendiente. |
| ASP.NET Core, EF Core y PostgreSQL | Arquitectura de servicios y persistencia del producto completo. | Diseño del capítulo IV; implementación prevista para AV2. |

Las instalaciones se realizan desde el lockfile. Las pruebas locales usan datos de demostración y no requieren credenciales de producción.

```bash
npm ci
npm test
npm run build
```

Para la revisión conjunta se reservan los puertos 5173 para landing y 5174 para frontend. La URL de la frontend se configura en el entorno de la landing; no se incorpora como una dirección de producción.

### 5.1.2 Source Code Management

| Repositorio | Alcance | Estado TB1 |
|---|---|---|
| [upc-project-report](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/upc-project-report) | Informe, fuentes de diagramas, pruebas y paquete documental. | Nuevos commits locales, sin push. |
| [creditor-landing-page](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/creditor-landing-page) | Presentación pública y acceso por segmento. | Nueva versión preparada localmente. |
| `creditor-web-app` | Dashboard, proveedores, compras, detalle y abonos. | Repositorio local; no se ha creado un remoto. |

GitFlow utiliza main para entregas estables, develop para integración y una feature por bloque. La preparación reintegra primero las correcciones de main a develop, conserva el historial anterior y hace merges locales con --no-ff. Las releases usan SemVer y los hotfix vuelven a main/develop. La guía completa está en [CONTRIBUTING](../CONTRIBUTING.md).

Los cambios de TB1 se atribuyen a la identidad que los registra: `MIguelAngelES7 <95198651+MiguelAngel0107@users.noreply.github.com>`. Los commits de integrantes anteriores se conservan. Las ramas de trabajo se mantienen para revisión antes de publicar.

### 5.1.3 Source Code Style Guide & Conventions

Se aplican módulos JavaScript, nombres de código en inglés, componentes Vue con responsabilidad delimitada y estilos responsive. Las reglas de compra y abono se separan de la presentación y del adaptador de almacenamiento para facilitar la futura integración HTTP.

| Aspecto | Convención |
|---|---|
| Dinero | Cálculos de compras/abonos en centavos enteros; totales separados por moneda. |
| Idiomas | Inglés por defecto y español latinoamericano alternativo; la moneda pertenece a la operación. |
| Formularios | Etiquetas persistentes, errores asociados y datos conservados ante corrección. |
| Navegación | Destinos explícitos, foco visible y operación por teclado. |
| Datos locales | Se identifican como demostración; no equivalen a autenticación o persistencia de servidor. |
| Commits | tipo(alcance): descripción, con cambios lógicos y autor personal. |
| Evidencias | Producto, commit, fecha, comando o escenario y resultado observado. |

### 5.1.4 Software Deployment Configuration

La compilación local produce dist. Las configuraciones de CI preparadas verifican build/tests y no publican durante esta etapa. La aplicación usa navegación compatible con acceso directo y refresco; landing recibe su destino mediante VITE_APP_URL.

Se conserva la publicación histórica de AV1 en [GitHub Pages](https://grupo-desarrollo-aplicaciones-web.github.io/creditor-landing-page/), asociada al commit cf734ff y al [run 35305597000](https://github.com/Grupo-Desarrollo-Aplicaciones-Web/creditor-landing-page/actions/runs/35305597000), exitoso el 18/09/2026. Esa publicación corresponde a la versión anterior. Las nuevas versiones de TB1 permanecen locales por indicación del usuario.

## 5.2 Landing Page, Services & Applications Implementation

La nueva landing comunica obligaciones de la mype y dirige al propietario hacia el resumen de cuentas por pagar y al administrador hacia nueva compra. La frontend implementa US-004 a US-007 mediante un adaptador local intercambiable. US-008/US-009 y TS-001 a TS-003 permanecen en el roadmap de servicios y módulos posteriores.

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
| Sebastián Gutarra Velapatiño | @SebastianGutarra | | | | | | |
| Miguel Angel Egocheaga Suyo | @MiguelAngel0107 | | | | | | |

La responsabilidad de validación documental comprende el protocolo de entrevistas y la inspección heurística; no significa que Juan haya realizado entrevistas o pruebas aún no registradas. Las asignaciones operativas se completarán por acuerdo del equipo.




### 5.2.2 Sprint 2

El documento canónico de esta iteración es [Sprint 2](sprints/sprint-02.md). La preparación local cubre las ocho secciones del índice. Los acuerdos de reunión, tablero externo y evidencias humanas se registran como pendientes cuando no se han proporcionado.

#### 5.2.2.1 Sprint Planning 2

El objetivo de la preparación es permitir consultar obligaciones y registrar compra/abono sin mezclar monedas ni perder la composición del saldo. La tabla de planificación distingue esta preparación técnica de los acuerdos del equipo y evita reconstruir reuniones o velocidad histórica.

#### 5.2.2.2 Aspect Leaders and Collaborators

La matriz LACX diferencia roles históricos comprobados, propuesta de colaboración para TB1 y autoría efectiva del incremento local. Juan mantiene insumos de producto/validación, Sebastián de identidad visual y Miguel registra los cambios solicitados de implementación e integración. El equipo debe confirmar su distribución de revisión y exposición.

#### 5.2.2.3 Sprint Backlog 2

El backlog textual descompone US-004–007, la corrección de landing y el control documental en tareas. Cada estado de implementación se relaciona con commits y pruebas; las asignaciones propuestas no se presentan como aportes ya realizados por un integrante.

#### 5.2.2.4 Development Evidence for Sprint Review

La evidencia de desarrollo se genera desde los historiales locales de report, landing y frontend. Contiene repositorio, feature, hash, mensaje, cuerpo, fecha y autor; los hashes locales no se enlazan como si ya existieran en GitHub.

#### 5.2.2.5 Execution Evidence for Sprint Review

Se registran build y pruebas automatizadas y se incorporan capturas locales de las vistas principales en escritorio/móvil. Los escenarios incluyen moneda, saldo, formulario inválido, filtros, persistencia de demostración y navegación por teclado. El video de navegación del equipo queda pendiente de grabación.

#### 5.2.2.6 Services Documentation Evidence for Sprint Review

No se ejecuta una API propia en esta preparación. El adaptador local representa el contrato de compras/abonos y permite reemplazar el almacenamiento por un cliente HTTP. El diseño de AV2 prevé GET/POST /api/v1/purchases y POST /api/v1/purchases/{purchaseId}/payments. Estas rutas son contratos previstos, no endpoints disponibles. OpenAPI desplegado y pruebas de autorización/transacciones corresponden al incremento de servicios.

#### 5.2.2.7 Software Deployment Evidence for Sprint Review

Estado: **sin nuevo despliegue por alcance de trabajo local**. Build y previsualización no se contabilizan como publicación. La ficha distingue el deployment histórico de landing AV1 de las dos versiones locales TB1. Para cerrar el criterio del curso, el usuario deberá publicar las versiones y registrar URL HTTPS, commit, run, fecha y captura.

#### 5.2.2.8 Team Collaboration Insights during Sprint

La evidencia histórica del informe conserva aportes de los tres integrantes. La nueva preparación técnica se registra con la identidad de Miguel. Las decisiones propuestas de revisión, tareas de entrevistas, grabación y desempeño se mantienen pendientes de validación del equipo; no se reconstruyen horas trabajadas ni aprobaciones.
