# Guiones individuales de CREDITOR para TB1

Preparados el 04/10/2026 para ensayar con la presentación ampliada. Cada archivo contiene únicamente los parlamentos del integrante, con tiempos globales y acciones de pantalla. Primero aparece la ruta de clase de 12:00 y después la de video de 27:30.

| Expositor | Word editable | PDF para lectura | Tiempo clase / video |
|---|---|---|---|
| Juan Manuel Santos Torres | [Word](creditor-tb1-guion-juan-manuel.docx) | [PDF](creditor-tb1-guion-juan-manuel.pdf) | 2:15 / 7:30 |
| Sebastián Gutarra Velapatiño | [Word](creditor-tb1-guion-sebastian.docx) | [PDF](creditor-tb1-guion-sebastian.pdf) | 4:30 / 7:40 |
| Miguel Angel Egocheaga Suyo | [Word](creditor-tb1-guion-miguel-angel.docx) | [PDF](creditor-tb1-guion-miguel-angel.pdf) | 5:15 / 12:20 |

Ensayar una sola versión por presentación. El reparto suma 12:00 en clase y 27:30 en video, con las diapositivas compartidas divididas entre los tres. Los tiempos incluyen las acciones de la demo; deben comprobarse con cronómetro. Las diapositivas 37–40 quedan para consulta.

Ver el [orden de los turnos y las fuentes Markdown](../../../docs/tb1/expositores/README.md), la [presentación](../keynote-expanded/README.md) y las [preguntas de sustentación](../../../docs/tb1/guion-ppt-detallado.md).

## Reproducción y revisión

`tools/tb1/build_speaker_scripts.py` produce Word desde las tres fuentes Markdown con Python y python-docx del runtime empaquetado. `tools/tb1/export_speaker_scripts.ps1` exporta los tres PDF mediante instancias nuevas de Microsoft Word, ocultas, sin acceder a documentos del usuario.

Los DOCX se comprobaron estructuralmente y sus PDF se renderizaron con Poppler para revisar todas las páginas. El renderer empaquetado de DOCX no pudo convertir porque LibreOffice no está disponible en este runtime de Windows; se utilizó la exportación nativa de Word para verificar su paginación. La continuidad y suma de los intervalos se comprobaron con los tres guiones juntos.

La feature `feature/tb1-speaker-scripts` se integra en `develop` mediante merge sin fast-forward. Esta preparación es local, sin push, release, despliegue o grabación.
