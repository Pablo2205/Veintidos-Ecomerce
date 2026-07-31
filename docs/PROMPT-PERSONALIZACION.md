# Prompt para personalizar una demo con los datos de un cliente

Cuando entra un pedido (llega la fila nueva en la planilla de Google Sheets + el mail de
aviso), usás este prompt en una sesión de Claude Code abierta en la carpeta del proyecto
para que arme la invitación real a partir de los datos que cargó el cliente en
`Personalize.jsx`.

No hace falta escribir el prompt de memoria: copiá el bloque de abajo, completá los
`{{campos}}` con los valores de la fila de la planilla (son los mismos nombres de columna)
y pegalo en el chat.

---

## Prompt base

```
Quiero armar la invitación digital real de un cliente que ya compró y pagó. Los datos
salen de la planilla de pedidos (fila con referencia {{Referencia}}). Guiate por
docs/PLANES-Y-FEATURES.md para saber qué features corresponden al plan comprado, y por
CLAUDE.md sección 7 para las convenciones del sistema de demos.

DATOS DEL PEDIDO
- Referencia: {{Referencia}}
- Plan comprado: {{Plan}}          (Essential / Standard / Premium — define qué secciones van)
- Tipo de evento: {{Tipo de evento}}   (Boda / Cumple XV / Otro)
- Nombres de los anfitriones: {{Nombres}}
- WhatsApp del anfitrión (para el RSVP real): {{WhatsApp}}
- Fecha y hora del evento: {{Fecha del evento}} {{hora si la tenés}}
- Lugar (nombre + dirección): {{Lugar}} — {{Dirección}}
- Link de Maps si lo mandó: {{Maps}}
- Regalos / alias / CBU o lista: {{Regalos}}
- Dress code (si el plan lo incluye): {{Dress code}}
- Música / playlist (si el plan lo incluye): {{Música}}
- Galería de fotos, link a Drive/Fotos (si el plan lo incluye): {{Galería (link)}}
- Video, link a YouTube/Vimeo (solo Premium): {{Video}}
- Personalización avanzada, notas de diseño (solo Premium): {{Personalización}}

REFERENCIA VISUAL
Quiero que el estilo se parezca a la demo "{{slug de la demo más parecida, ej: lucia-juan}}"
que ya está en public/demos/{{boda|xv}}/{{slug}}/ — mismo tipo de layout y técnicas, pero
con paleta/tipografía ajustada si el cliente pidió algo distinto: {{notas de estilo si las
hay, si no borrar esta línea}}.

FOTOS
{{Si ya tenés las fotos: "Las fotos están en <ruta o las adjunto ahora>, nombralas
foto-hero.jpg, foto-1.jpg, foto-2.jpg... según corresponda."}}
{{Si todavía no las tenés: "Todavía no tengo las fotos del cliente — armá la demo con
onerror="this.style.display='none'" en todos los <img> como siempre, para que degrade
prolijo hasta que las suba."}}

QUÉ NECESITO QUE HAGAS
1. Creá la carpeta public/demos/{{boda|xv}}/{{slug-nombre-cliente}}/ con un index.html
   standalone (sin dependencias de React/Tailwind del proyecto), basado en la demo de
   referencia de arriba.
2. Reemplazá todo el contenido de ejemplo por los datos reales de este pedido.
3. Activá solo las secciones que correspondan al plan {{Plan}} (usá planFeatureFlags como
   guía — no muestres dress code/música/galería si es Essential, no muestres video/
   personalización si no es Premium).
4. El RSVP tiene que ser un link real de WhatsApp (wa.me/{{WhatsApp sin + ni espacios}})
   con un mensaje precargado tipo "Hola! Confirmo que voy a {{Nombres}}" — no un botón
   decorativo sin destino.
5. El botón de regalos tiene que copiar el alias/CBU al portapapeles (mismo patrón que
   olivia-ralph, ver docs/PLANES-Y-FEATURES.md).
6. Si el plan incluye "agendar la fecha", generá el botón de descarga .ics con la fecha y
   lugar reales (mismo patrón que olivia-ralph).
7. Cuando esté listo, agregá la entrada correspondiente en el array `products` de
   src/data/site.js (demoUrl, image, style, palette) para que aparezca en el catálogo si
   corresponde, y mostrame un resumen de qué fotos me faltan (con los nombres exactos que
   tienen que tener) para poder mandárselas al cliente que las suba.

No toques nada fuera de public/demos/ y (si corresponde) la entrada nueva en `products` de
site.js. No hace falta correr npm run build para esto — las demos son HTML estático.
```

---

## Notas de uso

- **Elegir la demo de referencia**: mirá las 4 existentes (`lucia-juan` editorial papel
  roto, `olivia-ralph` cortejo completo con galería, `juan-ana` juguetona con foto de
  infancia, `lorena-gustavo` botánico) y elegí la que más se parezca a lo que el cliente
  pidió. Si no pidió nada puntual, `lucia-juan` es la más neutra/elegante para bodas y
  todavía no hay una demo XV — para XV años vas a tener que armar una desde cero la
  primera vez (podés pedirle a Claude que arranque de un layout tipo boda pero con paleta
  y tono más festivo).
- **Confirmación con el cliente antes de entregar**: una vez armada la demo, mandale el
  preview por WhatsApp (el link público, no un adjunto) y pedile el ok antes de marcarla
  como entregada — así evitás rehacer trabajo si algo está mal escrito.
- **Actualizá la planilla**: no hay automatización para esto — cuando la entregues, marcá
  manualmente en Sheets (o en una columna nueva "Estado") que el pedido quedó entregado,
  para no perder el registro de qué está pendiente y qué no.
