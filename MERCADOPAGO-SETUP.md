# Activar el cobro real con la API de Mercado Pago

El sitio ya tiene el código de la integración (`api/mercadopago/*.js`, funciones serverless
de Vercel). Mientras no cargues el Access Token, el Checkout sigue funcionando exactamente
como antes (los links fijos de `MP_LINKS`) — no se rompe nada por tener el código ya puesto.
Esto activa la versión real: monto exacto por el carrito completo (soporta combinar planes
y cantidades, algo que los links fijos no podían) y verificación real del pago antes de
dejar avanzar al formulario, en vez del "honor system" de antes.

## 1. Conseguir el Access Token

1. Entrá a [mercadopago.com.ar/developers/panel](https://www.mercadopago.com.ar/developers/panel)
   con tu cuenta.
2. Creá una aplicación (o usá una que ya tengas) → **Producción** → **Credenciales de
   producción**.
3. Copiá el **Access Token** de producción (empieza con `APP_USR-...`). **Nunca lo pegues acá
   en el chat ni lo subas al repo** — es la clave que le permite a cualquiera cobrar en tu
   nombre si se filtra.

> Mientras probás, podés usar las **credenciales de prueba** (sandbox) de la misma pantalla
> y una tarjeta de test de Mercado Pago para simular un pago completo de punta a punta antes
> de pasar a producción.

## 2. Cargarlo en Vercel (vos, no yo)

Corré esto en tu propia terminal (no me pases el token a mí):

```bash
vercel env add MERCADOPAGO_ACCESS_TOKEN production
# Pega el Access Token cuando te lo pida, para "Production"
vercel env add MERCADOPAGO_ACCESS_TOKEN preview
# Repetí para "Preview" (podés usar el mismo token o uno de test)
```

También podés hacerlo desde el dashboard: **vercel.com → tu proyecto → Settings →
Environment Variables** → `MERCADOPAGO_ACCESS_TOKEN` → pegar el valor → guardar para
Production (y Preview si querés probar en una rama antes).

## 3. Redeploy

Las variables de entorno nuevas no se aplican solas — hace falta un deploy nuevo:

```bash
vercel --prod
```

(o simplemente hacé push a la rama principal, si tenés el deploy automático desde GitHub
configurado).

## 4. (Opcional pero recomendado) Configurar el webhook

En el panel de tu aplicación de Mercado Pago → **Webhooks** → agregá esta URL con el evento
**"Pagos"**:

```
https://veintidos-invitaciones.vercel.app/api/mercadopago/webhook
```

(o tu dominio real, si en algún momento conectás uno propio en vez del `.vercel.app`). Esto
es una red de seguridad extra para el caso de que alguien cierre la pestaña de pago antes de
volver al sitio — no es indispensable para que el flujo funcione, porque el botón "Ya pagué,
continuar" ya verifica el pago en vivo cada vez que se lo toca.

## Qué cambia para vos en la práctica

- **Antes:** el cliente pagaba (o no) y apretaba "Ya pagué, continuar" de buena fe — vos
  tenías que entrar a Mercado Pago a mano y comparar monto + nombre contra la planilla.
- **Ahora:** el botón consulta a Mercado Pago en el momento y solo deja avanzar si el pago
  está realmente aprobado. La planilla sigue recibiendo el mismo pedido que antes (no cambió
  nada del lado de Google Sheets/Apps Script).
- **`MP_LINKS`** (los 3 links fijos de `site.js`) quedan como respaldo automático: si por
  cualquier motivo la API no responde (o el token no está cargado), el sitio los sigue
  usando sin que nadie tenga que tocar código — pero ya no hace falta mantenerlos
  actualizados a mano con cada baja de precio, una vez que el token esté cargado.
