# Guía de colaboración

## Ramas

- `main`: versión estable y lista para entrega.
- `develop`: integración del contenido de la siguiente entrega.
- `docs/<capitulo>-<tema>`: documentación nueva o ampliada.
- `fix/<descripcion>`: correcciones puntuales.

Ejemplos:

```text
docs/capitulo-2-entrevistas
docs/sprint-1-evidencias
fix/enlaces-arquitectura
```

## Flujo de trabajo

1. Actualiza `develop`.
2. Crea una rama específica para tu tarea.
3. Realiza commits pequeños y descriptivos.
4. Abre un Pull Request hacia `develop`.
5. Solicita al menos una revisión antes de fusionar.
6. Fusiona `develop` en `main` únicamente para una entrega estable.

## Convención de commits

```text
docs: agrega análisis de entrevistas
fix: corrige enlaces de diagramas C4
chore: reorganiza evidencias del sprint 2
```

## Imágenes y evidencias

- Guarda cada recurso en la carpeta correspondiente dentro de `assets/`.
- Usa nombres descriptivos en minúsculas y con guiones.
- Evita nombres como `imagen1.png`, `final-final.png` o `captura.png`.
- Incluye texto alternativo en cada imagen Markdown.

