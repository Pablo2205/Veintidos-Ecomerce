# Activar el login (Firebase Authentication + Firestore)

El sitio usa **Firebase** solo para dos cosas puntuales:

1. **Login/registro con email y contraseña** (`Authentication`) — las contraseñas nunca pasan
   por nuestro código ni se guardan en ningún lado que controlemos; las maneja Google del
   otro lado, hasheadas, con toda su infraestructura de seguridad. Es la forma correcta de
   hacer esto — jamás se debe guardar/manejar contraseñas "a mano".
2. **Guardar el carrito de un usuario logueado** (`Firestore`, una base de datos) — si alguien
   agrega una invitación al carrito y no llega a comprar, el carrito queda guardado en su
   cuenta y lo recupera la próxima vez que inicia sesión (desde cualquier dispositivo).

No toca nada del resto del sitio: Google Sheets/Apps Script (pedidos), Mercado Pago y
WhatsApp siguen funcionando exactamente igual que antes.

**Costo:** gratis en el volumen de este negocio — el plan gratuito de Firebase ("Spark")
incluye 50.000 lecturas y 20.000 escrituras de Firestore por día, muy por encima de lo que
un carrito de e-commerce chico necesita.

## 1. Crear el proyecto de Firebase

1. Andá a [console.firebase.google.com](https://console.firebase.google.com) con la misma
   cuenta de Google que ya usás para Sheets/Apps Script (`veintidos.invitaciones@gmail.com`,
   o la que prefieras).
2. **Agregar proyecto** → nombralo, por ejemplo, `veintidos-invitaciones`.
3. Podés dejar Google Analytics desactivado (no hace falta para esto).

## 2. Activar Authentication (email/contraseña)

1. En el menú izquierdo: **Compilación → Authentication → Comenzar**.
2. Pestaña **Sign-in method** → **Correo electrónico/contraseña** → activarlo → Guardar.
3. (Opcional pero recomendado) En **Templates** podés personalizar el mail de verificación y
   el de recuperación de contraseña que le llegan a tus clientes — por defecto salen con
   branding de Firebase, se pueden editar para que digan "veintidós".

## 3. Crear la base de Firestore

1. **Compilación → Firestore Database → Crear base de datos**.
2. Elegí una ubicación (cualquiera de Sudamérica o la más cercana a tus clientes).
3. **Importante:** cuando pregunte el modo de reglas, elegí **modo de producción** (deniega
   todo por default), **no** "modo de prueba" (deja todo abierto a cualquiera por 30 días,
   sin login — un agujero de seguridad real si se llega a desplegar así).
4. Una vez creada, andá a la pestaña **Reglas** y pegá el contenido completo de
   `firestore.rules` (en la raíz de este repo) → **Publicar**.

## 4. Sumar una app web y copiar el config

1. En la página principal del proyecto (ícono de engranaje → **Configuración del proyecto**),
   scrolleá a "Tus apps" → ícono `</>` (Web) → registrá una app (el nombre no importa, ej.
   "veintidós web").
2. Te muestra un objeto `firebaseConfig` con 6 valores. Pegalos en tu `.env` (copiá
   `.env.example` a `.env` si todavía no lo hiciste):

```bash
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=veintidos-invitaciones.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=veintidos-invitaciones
VITE_FIREBASE_STORAGE_BUCKET=veintidos-invitaciones.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

3. **Repetí esto mismo en Vercel** (Project Settings → Environment Variables) con las mismas
   6 claves — si no, el login funciona en tu compu pero no en el sitio publicado.

## 5. Autorizar el dominio de producción

Firebase Authentication solo deja loguearse desde dominios autorizados (por seguridad, para
que nadie clone tu config y arme un login falso en otro dominio):

1. **Authentication → Settings → Authorized domains**.
2. `localhost` ya está por defecto. Agregá el dominio real de producción (el que uses en
   Vercel, ej. `veintidos.ar` o `tu-proyecto.vercel.app`) y cualquier dominio de preview que
   uses seguido.

## 6. Probar

1. `npm run dev`, andá a `/cuenta`, creá una cuenta de prueba con un email real tuyo.
2. Revisá que llegue el mail de verificación.
3. Agregá algo al carrito, cerrá sesión, volvé a iniciar sesión (o abrí el sitio en otro
   navegador) y confirmá que el carrito reaparece.
4. Si algo no anda: **F12 → Console** — Firebase tira errores bastante descriptivos ahí
   (`auth/...`, permisos de Firestore, dominio no autorizado, etc.).

## Notas

- Mientras el `.env` no esté cargado, el sitio **no se rompe** — `/cuenta` se muestra igual
  pero avisa que el login todavía no está activado (ver `firebaseEnabled` en
  `src/lib/firebase.js`). Podés desplegar el resto de los cambios de esta ronda (precios,
  demos nuevas, etc.) sin apurarte a configurar Firebase el mismo día.
- El SDK de Firebase pesa bastante — está separado en su propio "chunk" de JavaScript
  (`vite.config.js`) para no inflar la carga de Home/Catálogo para quien nunca usa el login.
- Si en algún momento se quiere borrar esta funcionalidad, alcanza con sacar `AuthProvider`
  de `main.jsx`, la ruta `/cuenta` de `App.jsx`, y el bloque de persistencia de
  `CartContext.jsx` — el resto del sitio no depende de esto para nada.
