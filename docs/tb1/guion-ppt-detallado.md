# Guion de PPT y sustentación TB1 de CREDITOR

Preparado el 04/10/2026 a partir del informe local al corte del 03/10/2026. La numeración coincide con [el prompt de creación del PPT](prompt-crear-ppt.md): 36 diapositivas de exposición y cuatro de consulta. Este documento es una propuesta para ensayar; no acredita una grabación, reunión o aceptación del equipo.

## Cómo usarlo

Para ensayar individualmente, usar los [guiones separados de Juan, Sebastián y Miguel](expositores/README.md), disponibles también en Word y PDF. Cada uno contiene solo sus turnos y las acciones que le corresponden.

Hay dos versiones: video completo de **27:30** y sustentación de **12:00**. Para el video se usa la sección «Guion completo»; para clase se usa únicamente «Guion breve», que selecciona 22 diapositivas del mismo PPT. No se leen ambas versiones consecutivamente.

Los intervalos son objetivos de ensayo, incluyen transiciones y acciones de pantalla y deben comprobarse con cronómetro. El video tiene 2:30 de margen frente al límite de 30 minutos; la sustentación se ensaya sin exceder los 12 minutos. Hablar con naturalidad y usar las notas como apoyo; no leer las tablas completas.

| Formato | Juan | Sebastián | Miguel | Total |
|---|---:|---:|---:|---:|
| Video completo, reparto propuesto | 7:30 | 7:40 | 12:20 | 27:30 |
| Clase, reparto propuesto | 2:15 | 4:30 | 5:15 | 12:00 |

Miguel dispone de más tiempo en la versión amplia por las acciones de la aplicación. La asignación de una diapositiva no atribuye a quien habla la elaboración de todos sus artefactos. Los tiempos individuales incluyen las presentaciones de la diapositiva 2 y las intervenciones de la diapositiva 33.

## Guion completo para el video

### 01. CREDITOR: TB1 Stage Review

**Juan · 00:00–00:15 · 15 s.**

> Buenos días. Presentamos CREDITOR, proyecto del Grupo 2 de Aplicaciones Web. En TB1 mostramos la evolución del informe y una aplicación local para organizar compras a crédito, abonos y saldos de una mype.

**Mostrar:** portada y marca. No anunciar una release estable ni una versión TB1 publicada.

### 02. Equipo y recorrido

**Los tres · 00:15–00:45 · 30 s; 10 s por integrante.**

> **Juan:** Soy Juan Manuel Santos Torres, estudiante de Ingeniería de Software. Presentaré el problema y el enfoque de investigación.
>
> **Sebastián:** Soy Sebastián Gutarra Velapatiño, estudiante de Ingeniería de Software. Explicaré requisitos y diseño.
>
> **Miguel:** Soy Miguel Angel Egocheaga Suyo, estudiante de Ingeniería de Software. Mostraré el funcionamiento y las verificaciones del incremento local.

**Mostrar:** cada integrante ante cámara, sincronizado con su fotografía, nombre y código. Confirmar previamente el uso de las fotos. Los tres participarán también en colaboración y cierre.

### 03. Problema, solución y alcance

**Juan · 00:45–01:20 · 35 s.**

> Partimos de una posible dificultad: reconstruir cuánto debe un negocio a un proveedor, qué abonos registró y cuándo vence la obligación. CREDITOR propone relacionar proveedor, compra, comprobante y abonos. El propietario revisa obligaciones; el administrador registra y concilia. TB1 comprende dashboard, compras, abonos e historial. Reportes, préstamos y servicios propios se mantienen en iteraciones posteriores.

**Mostrar:** recorrido proveedor–compra–abono–saldo; límites TB1/futuro. Presentar la dificultad como hipótesis, sin atribuirla a todas las entrevistas.

### 04. Mejoras posteriores a AV1

**Juan · 01:20–01:45 · 25 s.**

> La retroalimentación señaló investigación incompleta, falta de vistas móviles, alternativas de flujo parciales y problemas de presentación. Actualizamos benchmark y trazabilidad, añadimos wireframes móviles y escenarios de error, y reorganizamos las tareas del sprint. La corrección documental no cierra automáticamente entrevistas, validación, publicación ni grabación.

**Mostrar:** tabla observación/cambio/estado; señalar una corrección visible y una evidencia abierta.

### 05. 5W2H y Problem Statement

**Juan · 01:45–02:15 · 30 s.**

> El 5W2H ubica a dueños y administradores en momentos de compra, abono y revisión de vencimientos. Aún no tenemos una línea base del costo del problema. Como ya existen soluciones contables, investigamos si un recorrido más acotado encaja mejor con estas tareas. El piloto de cinco negocios y sus metas de consulta y recurrencia son propuestas, todavía no resultados.

**Mostrar:** síntesis de las siete preguntas y los cuatro elementos del Problem Statement: mercado, oportunidad, usuario y señal de éxito. No sumar el piloto con la prueba de usabilidad como si fueran un mismo experimento.

### 06. Supuestos e hipótesis

**Juan · 02:15–02:45 · 30 s.**

> Cada hipótesis relaciona un resultado de negocio, un usuario, un beneficio y una función. H-01 propone revisión recurrente mediante el dashboard; H-02, registros completos mediante el formulario; H-03, verificación del saldo mediante el historial. H-04 y H-05 tratan préstamos y reportes futuros. Esta cadena orienta qué preguntar y medir; no demuestra que el beneficio ya ocurrió.

**Mostrar:** ejemplo H-03 → historial → US-006/007. No leer todos los supuestos.

### 07. Lean UX Canvas

**Juan · 02:45–03:05 · 20 s.**

> El Canvas reúne problema, usuarios, beneficios y solución. Nos ayuda a conservar el foco en cuentas por pagar y a identificar incertidumbres antes de ampliar funciones. Es una representación local provisional: su contenido deberá ajustarse con el análisis de entrevistas y la evaluación de uso.

**Mostrar:** Canvas vigente y ampliar problema/usuarios/beneficio; no usar el JPG histórico como versión TB1.

### 08. Segmentos y contexto

**Juan · 03:05–03:25 · 20 s.**

> S1 participa en decisiones o revisión de compras y pagos; S2 registra y concilia. Una persona puede asumir ambas responsabilidades. El criterio de selección es experiencia reciente en estas tareas. El contexto de Mipyme formales no representa nuestro mercado potencial ni una medición de demanda.

**Mostrar:** dos tarjetas de tarea y criterio de inclusión. La estadística oficial es opcional; si aparece, mantener universo, año y fuente.

### 09. Benchmark

**Juan · 03:25–03:55 · 30 s.**

> Comparamos documentación de Alegra, Odoo y Zoho Books. Estas alternativas ya contemplan compras, pagos o reportes, con alcances distintos. Por eso no afirmamos que CREDITOR inventa esas funciones. Nuestra propuesta es comprobar el encaje de una experiencia centrada en compra, abono y saldo. Una capacidad no verificada en la revisión no significa que el competidor no la tenga.

**Mostrar:** tabla funcional compacta y fuentes del corte. Evitar comparar precios de mercados y planes distintos como si fueran cotizaciones equivalentes.

### 10. Estrategia y tácticas

**Juan · 03:55–04:15 · 20 s.**

> Priorizamos un flujo acotado, formularios guiados y relación entre abono y comprobante. Proponemos probarlo con pocas operaciones antes de pedir una migración completa. El riesgo principal es que la herramienta duplique trabajo o que una alternativa existente resuelva mejor la tarea. Estas decisiones se revisarán con evidencia.

**Mostrar:** cuatro tácticas y un riesgo; no declarar campañas ejecutadas ni superioridad comercial.

### 11. Diseño de entrevistas

**Juan · 04:15–04:45 · 30 s.**

> El guion comienza con un episodio reciente, antes de presentar la solución. Preguntamos qué datos necesitan cuando falta un comprobante y qué ocurre si duplican una compra o registran un importe incorrecto. Así relacionamos H-02 con datos y excepciones de US-005. La meta mínima es tres entrevistas por segmento, con consentimiento y evidencia revisable.

**Mostrar:** H-02 → A-01/A-02 → información buscada → US-005. Las preguntas provienen del informe; no incluir respuestas creadas para la exposición.

### 12. Registros y análisis pendiente

**Juan · 04:45–05:15 · 30 s.**

> Tenemos cuatro registros: tres de S1 y uno de S2. Faltan dos administradores para la meta mínima y el análisis verificable de todos los registros. La cadena será participante, pregunta, cita con minuto, variable, necesidad y Persona. Mientras no completemos esa evidencia, no atribuimos hallazgos, porcentajes o comportamientos a los participantes.

**Mostrar:** cobertura 3/1 y matriz de revisión. **Transición:** «Sebastián explicará cómo estas propuestas se conectan con tareas, requisitos y diseño».

### 13. Personas y Task Matrix

**Sebastián · 05:15–05:40 · 25 s.**

> Rosa representa provisionalmente la tarea de revisar obligaciones y priorizar pagos. Diego representa registrar y conciliar operaciones. La Task Matrix permite comparar consulta, compra, abono e historial. No atribuimos edades, frecuencia de uso ni frases a personas investigadas: las fichas deberán actualizarse con respuestas rastreables.

**Mostrar:** dos fichas provisionales y cuatro tareas, con etiqueta visible de estado.

### 14. Journey y Empathy Maps

**Sebastián · 05:40–06:05 · 25 s.**

> El Journey ubica los pasos desde reconocer una obligación hasta revisar el saldo después de pagar. El Empathy Map propone preguntas sobre información, dificultades y expectativas en cada momento. Sirven para discutir el recorrido, pero las fricciones y emociones todavía son hipótesis. Los contrastaremos con los relatos y futuras pruebas.

**Mostrar:** un paso equivalente de cada Journey y su incertidumbre; evitar leer cuatro mapas completos.

### 15. EventStorming y lenguaje del dominio

**Sebastián · 06:05–06:35 · 30 s.**

> El modelo de negocio distingue acciones de eventos. Registrar una compra produce una obligación; registrar un abono válido actualiza el saldo y puede saldar la compra. Usamos proveedor, compra, abono, saldo pendiente y vencimiento de forma consistente. La mype paga obligaciones. El diagrama es un modelo local, no evidencia de un taller ejecutado con usuarios.

**Mostrar:** recorrido TB1 del EventStorming y resaltar comando/evento/política; abrir las partes ampliadas si se necesita.

### 16. Epics, historias y criterios

**Sebastián · 06:35–07:10 · 35 s.**

> E-02 agrupa obligaciones y compras; E-03, abonos e historial. Cada historia expresa persona, acción y beneficio, con criterios observables. Por ejemplo, dada una compra de 100 y un abono de 30, esperamos saldo 70. Si intentamos registrar 71, esperamos rechazo y ningún movimiento nuevo. Las reglas también cubren moneda, fechas, referencia por proveedor y conservación de datos ante errores.

**Mostrar:** un escenario Given–When–Then y R-09; datos demo. No leer las nueve historias completas.

### 17. Impact Mapping y backlog

**Sebastián · 07:10–07:35 · 25 s.**

> El Impact Map conecta localizar obligaciones con dashboard y detalle, y registrar movimientos con los formularios. Sprint 2 contempla US-004 y US-005 de 8 puntos, y US-006 y US-007 de 5 puntos: 26 en total. To-Review significa que la implementación local está disponible para revisión; no que fue aceptada o desplegada. Préstamos, reportes y servicios se mantienen para después.

**Mostrar:** tabla 8+8+5+5 y mapa de impacto; no convertir SP a horas.

### 18. Estilos, información y responsive

**Sebastián · 07:35–08:10 · 35 s.**

> El diseño prioriza saldo y vencimiento, acciones claras y estados acompañados por texto. La arquitectura de información separa dashboard, compras, proveedores y abonos. Incorporamos vistas móviles del dashboard y registro, además de la landing. Los wireframes son fuentes locales; las capturas muestran ejecución. Falta trasladar y revisar los artefactos en las herramientas exigidas cuando corresponda.

**Mostrar:** comparación desktop/móvil legible; señalar un campo o una acción que se conserva al cambiar el ancho.

### 19. Wireflow y alternativas

**Sebastián · 08:10–08:50 · 40 s.**

> Revisamos tres objetivos: consultar una obligación, registrar una compra y registrar un abono. El diseño reúne 17 caminos: 5 de compra, 7 de abono y 5 de consulta. Incluye validación, cancelación, vacío y fallos, además del éxito. Ante un error se conserva información y se indica cómo corregir o volver. Son caminos de diseño; la evidencia de pruebas ejecutadas se presenta por separado.

**Mostrar:** una cancelación y un error ampliados, indicando punto de retorno. No afirmar que se probaron los 17 caminos.

### 20. Arquitectura de dominio y C4

**Sebastián · 08:50–09:25 · 35 s.**

> El contexto identifica visitante, propietario y administrador. La versión actual usa Vue con PrimeVue, un store, validadores y un adaptador local. Separamos las reglas y los datos para sustituir ese adaptador por HTTP. ASP.NET Core, EF Core y PostgreSQL forman el diseño previsto para AV2. Los trazos distinguen lo implementado del servicio futuro.

**Mostrar:** componentes web locales; después, ruta futura hacia API y base. No describir endpoints como operativos.

### 21. Clases y base de datos

**Sebastián · 09:25–10:00 · 35 s.**

> El modelo relaciona Business, Supplier, Purchase y Payment. Una compra pertenece a un negocio y proveedor, y puede tener varios abonos. El saldo se obtiene del total menos esos movimientos en la misma moneda. Llaves y relaciones mantienen el contexto de la obligación. El ER y el SQL son diseño objetivo; la demo todavía no está conectada a PostgreSQL.

**Mostrar:** ER de cuentas por pagar con cardinalidades y moneda. **Transición:** «Miguel mostrará este recorrido en la aplicación local».

### 22. Demostración de la landing

**Miguel · 10:00–11:30 · 90 s, acciones incluidas.**

> La landing explica el propósito, el proceso y el alcance de demostración. Desde el objetivo de propietario accedemos al dashboard; desde administrador, al registro de compra. Estos enlaces eligen un destino, no otorgan permisos. También hay términos y privacidad. El formulario de contacto valida un ejemplo: su confirmación aclara que nada se envió ni guardó.

**Acciones:** abrir landing, señalar propuesta y proceso, recorrer footer/legal, mostrar aviso de contacto y activar un CTA. Mostrar el segundo destino sin duplicar todo el recorrido. Terminar en frontend. Identificar siempre «entorno local».

### 23. Dashboard, filtros y monedas

**Miguel · 11:30–12:50 · 80 s.**

> El dashboard permite revisar obligaciones y vencimientos de la organización ficticia. Los saldos PEN y USD están separados porque no existe conversión automática. En la lista podemos filtrar y abrir el detalle de una compra. Cambiar un filtro no modifica operaciones. Antes del ejemplo limpio la selección para mantener un recorrido reproducible.

**Acciones:** señalar totales por moneda, aplicar un filtro de lista, mostrar acceso al detalle y limpiar filtros. No presentar datos demo como métricas de un negocio real.

### 24. Registrar compra 100

**Miguel · 12:50–14:50 · 120 s.**

> Voy a registrar una compra ficticia de PEN 100 con un proveedor existente, referencia nueva, descripción y fechas válidas. Revisamos los datos antes de confirmar. La referencia se controla por proveedor y el importe debe ser positivo. El comprobante es opcional; en este ejemplo evitamos datos reales. Al confirmar, el detalle debe mostrar la obligación por 100.

**Acciones:** abrir Nueva compra, ingresar `TB1-EXPO-100` después de restablecer demo, descripción y 100.00, seleccionar PEN, usar fecha real no futura y vencimiento coherente. Revisar/confirmar. Si el registro ya existe, restablecer solo demo o usar referencia nueva; no cambiar reglas para hacerlo pasar.

### 25. Detalle inicial

**Miguel · 14:50–15:40 · 50 s.**

> Ahora vemos la compra recién creada: total 100, sin abonos, saldo 100. Proveedor, moneda y vencimiento mantienen el contexto. La relación que verificamos es total de compra menos suma de abonos válidos. Al conservar el historial podemos explicar de dónde proviene el saldo, en lugar de editarlo como un valor independiente.

**Acciones:** señalar datos y estado inicial en el detalle vivo. Las capturas de respaldo pueden reflejar un estado posterior; no describirlas como estado inicial si muestran 30/70.

### 26. Abono 30, saldo 70 e historial

**Miguel · 15:40–17:55 · 135 s.**

> Registramos PEN 30 con fecha válida. El abono hereda la moneda de la compra. Tras confirmar, el historial contiene un movimiento y el saldo baja a PEN 70. Recargamos y comprobamos que ese estado se conserva. Esta persistencia pertenece al navegador y a datos ficticios; no representa almacenamiento centralizado ni usuarios concurrentes.

**Acciones:** abrir formulario de abono, ingresar 30 y fecha no anterior a compra ni futura, confirmar, mostrar fecha/importe, total 100/abonos 30/saldo 70. Recargar y volver al detalle, verificando un movimiento. Voucher opcional; no simular subida remota.

### 27. Rechazo del sobreabono

**Miguel · 17:55–19:25 · 90 s.**

> El saldo disponible es 70. Intentamos 71 y el formulario lo rechaza indicando el motivo. El dato se conserva para corregirlo y el historial no registra un segundo movimiento. El saldo continúa en 70. Este escenario comprueba que una operación inválida no se anuncia como exitosa ni altera la composición de la obligación.

**Acciones:** ingresar 71, activar revisión/registro, señalar error y campo conservado. Cancelar o volver para comprobar el historial. Mostrar exactamente un abono 30 y saldo 70; no confirmar una operación inválida para continuar.

### 28. Idiomas, móvil y accesibilidad

**Miguel · 19:25–21:00 · 95 s.**

> La interfaz inicia en inglés y permite español latinoamericano. Cambiar idioma modifica textos y formato; la compra sigue siendo PEN y su saldo 70. Revisamos también un ancho móvil, etiquetas de campos, foco visible y navegación por teclado. Son comprobaciones concretas del incremento, no una certificación completa de accesibilidad.

**Acciones:** cambiar idioma sin restablecer datos, señalar PEN 70, mostrar 390 px aproximadamente, recorrer controles por teclado y un error asociado. Restaurar escritorio y volver al PPT. **Transición:** «Juan continuará con planificación y evidencias del sprint».

### 29. Sprint 2 y sus ocho apartados

**Juan · 21:00–21:50 · 50 s.**

> El objetivo propuesto es que el propietario consulte saldo y vencimiento por moneda, y el administrador registre compra y abono con trazabilidad. El informe organiza Sprint 2 en planning, líderes y colaboradores, backlog, desarrollo, ejecución, documentación de servicios, deployment y colaboración. Tenemos artefactos técnicos preparados. Acta, LACX, tablero y aceptación todavía requieren confirmación y evidencia del equipo.

**Mostrar:** ocho apartados 5.2.2.1–8, diferenciando evidencia técnica y acuerdos. No describir una reunión que no se documentó.

### 30. Backlog y tareas del sprint

**Sebastián · 21:50–22:40 · 50 s.**

> Las cuatro historias de frontend suman 26 puntos relativos. Su descomposición y el trabajo complementario de landing, report y entrega se agrupan en siete tareas principales, cada una entre 4 y 8 horas. El total es 43 horas estimadas propuestas. No lo interpretamos como horas ejecutadas ni como conversión de story points. La implementación local está en revisión; el compromiso del equipo debe confirmarse.

**Mostrar:** tareas 7, 8, 6, 7, 6, 5, 4 y suma 43; relación con historias. No usar burndown o velocidad reconstruidos.

### 31. Desarrollo, ejecución y calidad

**Miguel · 22:40–23:30 · 50 s.**

> La evidencia del corte registra 12 pruebas de landing, 14 unitarias de frontend, 2 de navegador y compilaciones aprobadas. La prueba de navegador verifica 100, 30, 70 y rechazo 71, además de otras comprobaciones documentadas. Estos resultados respaldan reglas y navegación local. No sustituyen entrevistas, aceptación del equipo o validación con usuarios. Las capturas y SHA históricos identifican el estado realmente comprobado entonces.

**Mostrar:** tabla de resultados del corte y ruta al registro real. Si se muestran pruebas nuevas, ejecutarlas y registrar su resultado, sin editar salidas para aparentarlo.

### 32. Configuración y GitFlow

**Sebastián · 23:30–24:20 · 50 s.**

> Report, landing y aplicación tienen repositorios separados. Los cambios se preparan en features desde develop y se integran con merge sin fast-forward después de checks. Los mensajes siguen Conventional Commits. Main conserva el estado estable o la inicialización correspondiente hasta una release revisada. El incremento permanece local; no se hizo push ni release TB1. El historial permite revisar qué se integró y conservar las ramas.

**Mostrar:** graph real con feature y merge hacia develop. Para frontend, main solo contiene inicialización; para report, no afirmar que su main es la inicialización porque contiene la entrega histórica.

### 33. Aportes y Student Outcome 5

**Los tres · 24:20–25:20 · 60 s; 20 s por integrante.**

> **Juan:** Mis aportes históricos incluyen problemática, Lean UX y planificación de Sprint 1. Esos artefactos sirven como base de revisión. Mi siguiente propuesta es contrastar hipótesis y revisar objetivos; todavía debemos registrar el acuerdo del equipo.
>
> **Sebastián:** Aporté identidad visual, bocetos y actualización de registros. La siguiente revisión propuesta es contrastar las pantallas actuales y conservar evidencia en las herramientas del curso. Presentar el diseño no significa que esa revisión ya se haya realizado.
>
> **Miguel:** Preparé el código y las comprobaciones del incremento local. La planificación del aplicativo fue compartida. El reparto local de Author reconoce ese crédito; no reparte trabajo técnico realizado. Necesitamos revisión cruzada y aceptación documentadas para completar la evidencia de colaboración.

**Mostrar:** aporte/artefacto/evidencia/próxima revisión; Student Outcome 5 liderazgo e inclusión/metas/cumplimiento. Esta reflexión requiere que cada integrante la revise para expresar su experiencia real, sin añadir acuerdos o actividades no comprobados.

### 34. Servicios y deployment

**Juan · 25:20–26:20 · 60 s.**

> La documentación de servicios conserva contratos previstos para compras y pagos. La API propia deberá resolver autorización, transacciones y concurrencia en AV2. Actualmente la frontend utiliza el adaptador local. TB1 exige una nueva landing y la primera frontend desplegadas; esos dos criterios siguen pendientes. La publicación histórica de AV1 y un build local no acreditan el nuevo deployment. Después de autorización habrá que verificar HTTPS, rutas, CTA y la versión publicada.

**Mostrar:** tres estados: actual local/histórico AV1/futuro. No anunciar Swagger operativo ni presentar la preparación sin deployment como cambio del requisito del curso.

### 35. Entregables y cierre de brechas

**Sebastián · 26:20–27:05 · 45 s.**

> La entrega reúne report PDF, presentación PPTX y PDF, Performance DOCX/PDF, ZIP complementario y exposición MP4 con enlace Stream. Falta completar investigación S2 y análisis, evidencias de herramientas, acuerdos y evaluación del equipo, publicación y grabación. El líder valida desempeño y calificaciones. Los videos About-the-Product y About-the-Team corresponden a AV2. La fecha exacta depende del horario del curso.

**Mostrar:** checklist con acciones reales por brecha y responsabilidades futuras por confirmar. No declarar que esta nueva presentación o video ya existe solo por disponer del guion.

### 36. Conclusiones

**Juan · 27:05–27:30 · 25 s.**

> CREDITOR mantiene el foco en obligaciones del negocio, con compra, abono e historial locales. El informe conecta requisitos, diseño y evidencia técnica. El siguiente paso es revisar con el equipo y cerrar investigación, publicación y evidencias humanas antes de declarar TB1 completo. Gracias; los diagramas y fuentes quedan disponibles para preguntas.

**Mostrar:** tres conclusiones y vínculo a consulta 37–40. Fin del recorrido grabado; no añadir automáticamente la lectura de anexos.

## Guion breve de 12 minutos para clase

El enunciado exige introducción ≤ 10 %, revisión previa ≤ 30 %, demo ≥ 40 % y colaboración ≥ 20 %. Esta ruta utiliza 60 s, 180 s, 300 s y 180 s, respectivamente. La exposición de pruebas detalladas queda en la diapositiva 31 para preguntas; la demo abreviada no elimina esos resultados del PPT.

### Bloque 1: introducción · 00:00–01:00 · Juan

| Slide | Intervalo | Qué decir y mostrar |
|---|---|---|
| 01 | 00:00–00:20 | «Presentamos CREDITOR, Grupo 2 de Aplicaciones Web. Mostraremos el incremento TB1 de compras, abonos y saldos de una mype y su relación con el informe». Mostrar portada. |
| 02 | 00:20–00:40 | «Somos Juan Manuel Santos Torres, Sebastián Gutarra Velapatiño y Miguel Angel Egocheaga Suyo, de Ingeniería de Software. Presentaremos enfoque, diseño, demostración y colaboración». Mostrar fotos/códigos; no repetir las tres presentaciones largas del video. |
| 03 | 00:40–01:00 | «Investigamos la dificultad de reconstruir obligaciones y pagos. Proponemos relación proveedor–compra–abono–saldo. TB1 local cubre dashboard, registro e historial; API, reportes y préstamos continúan en la siguiente iteración». |

### Bloque 2: correcciones y diseño · 01:00–04:00 · Sebastián

| Slide | Intervalo | Qué decir y mostrar |
|---|---|---|
| 04 | 01:00–01:20 | «Corregimos benchmark/trazabilidad, añadimos móviles y alternativas, y agrupamos tareas de 4–8 h. Investigación, herramientas, publicación y video continúan abiertos». Mostrar comparación observación/cambio/estado. |
| 06 | 01:20–01:45 | «Dashboard, compra e historial se conectan con revisión recurrente, registro completo y verificación del saldo. Son hipótesis con usuarios y beneficios definidos, no resultados de adopción». Resaltar H-01–03 y relación a US. |
| 09 | 01:45–02:10 | «Alegra, Odoo y Zoho ya ofrecen capacidades equivalentes. Investigamos el encaje de un flujo más acotado. No verificamos superioridad comercial ni confundimos no revisado con no existente». Mostrar tabla funcional. |
| 12 | 02:10–02:35 | «Hay tres registros S1 y uno S2. Faltan dos S2 y analizar respuestas con citas/minutos. Por eso las Personas y mapas son provisionales. La matriz conecta participante, necesidad e historia cuando exista evidencia». |
| 16 | 02:35–03:00 | «US-004–007 cubren obligación, compra, abono e historial. La regla verificable es 100−30=70 y rechazo 71 sin movimiento nuevo. Moneda, referencia y fechas permiten criterios de aceptación observables». Mostrar Given–When–Then. |
| 19 | 03:00–03:30 | «El diseño contiene 17 caminos: 5 de compra, 7 de abono, 5 de consulta. Además del éxito, define validación, cancelación, vacío y fallo, con retorno y datos conservados. Cobertura de diseño no equivale a pruebas ejecutadas». Mostrar una rama alternativa. |
| 21 | 03:30–04:00 | «Business, Supplier, Purchase y Payment mantienen organización, proveedor y movimientos. El saldo se deriva de compra y abonos. La implementación utiliza adaptador local; API ASP.NET y PostgreSQL son diseño AV2. Miguel demostrará el recorrido». Mostrar ER legible. |

### Bloque 3: demo · 04:00–09:00 · Miguel

Los tiempos incluyen operar el navegador. Ensayar con una base demo conocida y datos listos para ingresar; no avanzar pantallas de respaldo automáticamente para aparentar una ejecución.

| Slide | Intervalo | Guion y acción |
|---|---|---|
| 22 | 04:00–04:45 | «La nueva landing explica obligaciones y alcance. Propietario llega al dashboard y administrador a nueva compra; los CTA no otorgan permisos. Contacto es un ejemplo sin envío». Mostrar landing/CTA y entrar al aplicativo. |
| 23 | 04:45–05:20 | «Dashboard y lista separan PEN/USD y permiten consultar vencimientos y detalle». Señalar totales, aplicar/limpiar un filtro y abrir nueva compra. |
| 24 | 05:20–06:10 | «Registro una compra ficticia de PEN 100 con proveedor, referencia nueva y fechas coherentes. Revisamos antes de confirmar». Ingresar campos preparados, revisar y confirmar; evitar tipear textos largos. |
| 25 | 06:10–06:30 | «Total 100, sin abonos, saldo 100. El detalle permite reconstruir la obligación». Señalar estado inicial en pantalla. |
| 26 | 06:30–07:30 | «Registramos 30. El historial queda con un movimiento y saldo 70; recargamos para comprobar persistencia local». Registrar, confirmar, mostrar 100/30/70 y recargar. |
| 27 | 07:30–08:20 | «Intento 71 frente a saldo 70. Se rechaza, conserva el campo y no añade otro abono». Mostrar error, volver al historial y comprobar un movimiento. |
| 28 | 08:20–09:00 | «Cambiar idioma no convierte la moneda. Seguimos en PEN 70. Revisamos móvil, etiquetas y foco. El almacenamiento es del navegador, sin autenticación ni sistema multiusuario». Cambiar idioma/ancho, mostrar teclado y volver al PPT. |

### Bloque 4: implementación y colaboración · 09:00–12:00 · los tres

| Slide | Intervalo | Integrante | Guion |
|---|---|---|---|
| 29 | 09:00–09:35 | Juan | «Sprint 2 conecta consulta y registro con ocho apartados: planning, líderes, backlog, desarrollo, ejecución, servicios, deployment y colaboración. El informe ofrece artefactos revisables; acta, LACX, tablero y aceptación requieren acuerdo real del equipo». |
| 30 | 09:35–10:10 | Sebastián | «US-004–007 suman 26 SP. Siete tareas de 4–8 h suman 43 h propuestas para frontend y trabajo complementario. Son estimaciones, no horas ejecutadas. Permiten discutir alcance y responsabilidades antes de confirmar compromiso». |
| 32 | 10:10–10:45 | Sebastián | «Las features parten de develop y vuelven con merge --no-ff, commits convencionales y checks. Conservamos trazabilidad del report, landing y app. Main no recibe este incremento sin una release revisada; el trabajo TB1 permanece local, sin push». Mostrar log real. |
| 33 | 10:45–11:40 | Los tres | **Juan 20 s:** «Mis artefactos históricos de problema, Lean UX y Sprint 1 orientan la revisión. La planificación del aplicativo fue compartida. Debemos registrar acuerdos y revisión cruzada». **Sebastián 20 s:** «La marca, bocetos y registros históricos son mis aportes verificables. La revisión de pantallas y herramientas es el siguiente paso propuesto, pendiente de evidencia». **Miguel 15 s:** «Yo escribí el código y realicé los checks. El reparto de Author reconoce planificación, no código igualitario. Pruebas técnicas y aceptación del equipo se documentan por separado». |
| 36 | 11:40–12:00 | Juan | «Demostramos compra, abono, saldo e historial locales. Restan investigación, herramientas, publicación, evaluación y grabación. La nueva landing y frontend aún deben desplegarse para cumplir TB1. Gracias». |

**Fin a 12:00.** Las preguntas posteriores son sustentación, no tiempo adicional de exposición libre. Todos deben poder explicar las decisiones fuera de su bloque.

## Preparación de la demo y respaldo

1. Verificar los servidores correctos en 5173/5174 y sus URLs, sin cerrar procesos desconocidos. La frontend usa hash routes; la base de landing se consulta en su README. No cambiar puertos o configuración durante la exposición sin necesidad.
2. Restablecer solamente los datos ficticios con el control de la aplicación. Tener proveedor seleccionado y referencia nueva; probar el recorrido antes de la grabación.
3. Usar una compra 100 y un único abono 30. Fecha de compra y abono no futura; vencimiento no anterior a compra. El día de grabación determina fechas válidas, no el corte de este documento.
4. Abrir las capturas del informe como respaldo. Si falla el servidor, decir: «Mostramos la evidencia local registrada en el corte del informe». Explicar los resultados sin llamarlos una ejecución en vivo. Esto no reemplaza el criterio académico de entorno desplegado.
5. Tener a mano el ER de cuentas por pagar, C4 web, flujos por partes, backlog textual y registro de pruebas. No mostrar código minúsculo o diagrama completo ilegible.
6. No ejecutar `npm ci`, rebuilds o restauraciones de Git durante el bloque de 12 min. Preparar el entorno antes. Los tests registrados se presentan con fecha/estado; si se decide repetirlos, hacerlo antes y conservar la salida real.
7. Si cambió el estado antes de presentar, actualizar PPT y guion desde evidencia auténtica: URL/fecha/SHA de deployment, nuevas entrevistas con análisis y acuerdos confirmados. No tachar pendientes por conveniencia de exposición.
8. Grabar un único MP4 con los tres ante cámara al inicio y artefactos legibles, máximo 30 min. La carga a Stream y su permiso docente deben comprobarse; incluir el enlace real en «Videos de Exposiciones» del report solamente cuando exista.

## Preguntas probables y respuestas sustentables

### 1. ¿Qué entrevistas sustentan las Personas?

> Tenemos cuatro registros, tres S1 y uno S2. El análisis completo con citas y minutos sigue pendiente; por eso Rosa y Diego son propuestas provisionales. Falta completar dos S2, revisar evidencia y derivar las fichas desde las respuestas.

Mostrar 2.2.2–2.3 y matriz de evidencia. No atribuir frases a participantes sin fuente.

### 2. ¿Cuál es la diferencia frente a Alegra, Odoo o Zoho?

> Ya ofrecen capacidades equivalentes. Proponemos comprobar si un recorrido centrado en obligación, abono y saldo encaja con estas tareas. La diferencia de enfoque es una hipótesis; no tenemos evidencia para afirmar superioridad, menor precio o adopción.

Mostrar benchmark y criterio de revisión de estrategia.

### 3. ¿Por qué el problema sigue siendo una hipótesis?

> Porque no hemos cerrado la codificación y contraste de los registros. Implementar reglas propuestas y comprobar comportamiento técnico no demuestra necesidad o frecuencia del problema. La investigación permitirá confirmar, refutar o cambiar prioridades.

### 4. ¿Las métricas ya se cumplieron?

> No. El piloto de 30 días con cinco negocios y la prueba moderada antes de Sprint 3 son experimentos propuestos distintos. La meta de consulta es cuatro de cinco participantes sin ayuda en dos minutos. Falta protocolo, línea base, consentimiento y ejecución.

Mostrar consulta 37 y capítulos 1.2.2/3.2.1. No mezclar negocios, participantes ni resultados.

### 5. ¿Qué implementaron exactamente en Vue?

> Dashboard y listado de obligaciones, registro de compra, detalle, abono e historial de US-004–007. Utilizamos Vue y PrimeVue con tema Material, rutas y adaptador local separable. Los datos son de una organización ficticia; préstamos, reportes y servicios aún son roadmap.

Mostrar aplicación y C4 web. El catálogo de proveedores soporta el recorrido; no convertirlo en una historia aceptada adicional.

### 6. ¿Cómo calculan el saldo y evitan errores decimales?

> Los importes se validan y calculan en centavos enteros. El saldo es total menos suma de abonos válidos de la misma compra y moneda. El abono debe ser positivo y no superar el saldo. El ejemplo 100−30=70 y rechazo de 71 está registrado en las pruebas.

Mostrar R-02/R-07/R-09. Las reglas del navegador no resuelven concurrencia de producción.

### 7. ¿Por qué no suman PEN y USD?

> Son obligaciones en monedas distintas y no tenemos conversión ni tipo de cambio aplicado. Se consultan por separado. El idioma cambia textos y formato, no la moneda del dato.

### 8. ¿Qué sucede con duplicados, cancelación o guardado fallido?

> La referencia se controla por proveedor sin distinguir mayúsculas. Ante validación se muestra el motivo y se conservan entradas; cancelar no registra una operación; un fallo de guardado no se anuncia como éxito. Los flujos identifican retorno y recuperación, y las pruebas comprueban escenarios concretos documentados.

Mostrar flujo ampliado y R-04/R-10. Cobertura de diseño no prueba ejecución de todos los caminos.

### 9. ¿Están probados los 17 caminos?

> Los 17 identifican cobertura de diseño de consulta, compra y abono. La ejecución técnica registrada consta de 14 unitarias y dos pruebas de navegador, con escenarios especificados. No presentamos los 17 como 17 pruebas ejecutadas ni aceptación del equipo.

### 10. ¿Dónde está la base de datos?

> El ER y SQL describen el diseño objetivo de PostgreSQL, con Business, Supplier, Purchase y Payment y extensión de préstamos. La frontend actual usa almacenamiento del navegador. No hay una base de producción conectada en este incremento.

Mostrar ER simplificado y SQL. No anunciar migraciones o transacciones ejecutadas en un servicio inexistente.

### 11. ¿Cómo reemplazarán el adaptador local?

> Las vistas utilizan store y acceso a datos separados de las reglas. La evolución contempla adaptador HTTP hacia ASP.NET Core/EF Core. El servidor deberá implementar autorización por organización, validación, transacciones y control de concurrencia; después se comprobarán respuestas reales contra OpenAPI.

Mostrar C4 y TS-001–003. No afirmar que cambiar una URL basta para hacer la producción segura.

### 12. ¿La demo tiene autenticación y roles?

> No. Propietario y administrador son segmentos y objetivos de uso. La organización ficticia fija y los CTA no implementan autorización. El contexto local no acredita aislamiento de seguridad, almacenamiento privado ni uso multiusuario.

### 13. ¿Se ha validado en Figma o con usuarios?

> Las fuentes actuales de wireframes son locales y las capturas muestran implementación. Falta el traslado y registro de revisión en las herramientas exigidas y las sesiones con usuarios. No confundimos estos artefactos con un prototipo validado.

### 14. ¿Dónde están los deployments TB1?

> La nueva landing y primera frontend permanecen locales por el alcance autorizado de preparación. El enunciado exige publicarlas para la entrega; ese criterio está pendiente. La landing histórica AV1 no acredita TB1. Habrá que registrar URL HTTPS, SHA, fecha y recorrido público comprobado.

### 15. ¿El formulario de contacto envía algo?

> No. Valida un ejemplo y lo informa claramente; no envía correo ni conserva una solicitud. El canal real es una evolución pendiente, con proveedor y tratamiento de datos por definir.

### 16. ¿26 SP equivalen a 43 horas?

> No. 26 SP son estimación relativa de cuatro historias frontend. 43 h son la estimación propuesta de siete tareas del incremento, con report y landing incluidos. No son medición de tiempo ejecutado ni una velocidad confirmada.

### 17. ¿Quién hizo el código si hay tres autores en Git?

> Miguel escribió el código y realizó comprobaciones e integración. Los tres participaron en planificación, confirmada por Miguel. El reparto local de Author reconoce ese crédito; los mensajes y registro aclaran el trabajo técnico. Además, el report conserva aportes históricos propios de Juan y Sebastián. Un conteo de commits no prueba un porcentaje de código u horas.

Mostrar registro de autoría del frontend y capítulo 00; evitar atribuir revisiones o ejecución a otro integrante sin evidencia.

### 18. ¿Qué falta para declarar Student Outcome o TB1 completo?

> Disponemos de artefactos e implementación revisables. Falta completar investigación, herramientas y validación, acuerdos del equipo, deployment, videos y desempeño validado por el líder. Para Student Outcome necesitamos acciones y reflexiones auténticas sobre liderazgo, inclusión, metas y cumplimiento, con evidencia por integrante.

## Comprobación del ensayo

- Los nombres, códigos y fuentes coinciden con el informe; cada integrante comprende su tema y las reglas del producto.
- Video 1–36: 27:30 como objetivo; consulta 37–40 fuera del recorrido automático.
- Clase: 22 diapositivas, 12:00; introducción 1:00, correcciones 3:00, demo 5:00, colaboración 3:00.
- Tres integrantes ante cámara al iniciar el video; todos participan en colaboración y pueden responder preguntas.
- Diagramas legibles y por partes; ER presente; PPTX y PDF sin letras cortadas.
- Compra 100/abono 30/saldo 70/rechazo 71 reproducibles, sin datos reales ni procesos externos simulados.
- Cada afirmación distingue hipótesis, diseño, ejecución, aceptación y publicación.
- Si falla una acción o prerrequisito, se informa y se usa evidencia de respaldo identificada; no se inventa un resultado exitoso.

## Fuentes de preparación

El guion utiliza [Introducción](../01-introduction.md), [Elicitación y análisis](../02-requirements-elicitation-analysis.md), [Requisitos](../03-requirements-specification.md), [Diseño](../04-product-design.md), [Implementación](../05-implementation-validation-deployment.md), [Sprint 2](../sprints/sprint-02.md), [Información y aportes](../00-project-information.md), [Student Outcome](../00-student-outcome.md), [Conclusiones](../06-conclusions-recommendations.md), [Bibliografía y anexos](../07-bibliography-appendices.md), [Feedback](feedback-resolution.md), [Evidencia local](evidencia-local.md) y [Control TB1](../09-tb1-delivery-checklist.md).

El enunciado 1ASI0730, pp. 3–4 y 31–32, fija formatos y alcance TB1. Las observaciones pegadas por el usuario aportan focos de mejora del trabajo previo. El registro de autoría del frontend delimita el crédito de planificación posterior al corte del report.
