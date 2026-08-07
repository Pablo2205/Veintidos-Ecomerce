/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // primary y promoGold quedan anclados al logo real (PNG fijo con esos
        // hex exactos, ver CLAUDE.md sección 2) — cambiarlos generaría un
        // choque de color entre el isotipo y el resto del sitio.
        primary: '#182317',
        primaryContainer: '#2d392b',
        primaryFixed: '#d9e7d2',
        onPrimary: '#ffffff',
        // `secondary` sí es libre (no depende de ningún asset fijo) — antes
        // era un oliva casi igual al verde primario, dejando el sitio
        // prácticamente monocromático. Se probó terracota, después un rosa
        // mauve (mejor validado por ui-ux-pro-max/colors.csv, pero a Pablo
        // no le gustó ese rosa puntual) — vuelta a terracota, que no tuvo
        // objeciones. Gusto > data cuando compiten.
        secondary: '#A3634F',
        secondaryContainer: '#F1DED4',
        secondaryFixed: '#EDD9CD',
        tertiary: '#152419',
        tertiaryContainer: '#2a392e',
        background: '#fbf9f4',
        creamSurface: '#F2EFE9',
        surface: '#fbf9f4',
        surfaceContainer: '#f0eee9',
        surfaceContainerLow: '#f5f3ee',
        surfaceContainerHigh: '#eae8e3',
        surfaceContainerHighest: '#e4e2dd',
        surfaceVariant: '#e4e2dd',
        onSurface: '#1b1c19',
        onSurfaceVariant: '#444842',
        outline: '#747871',
        outlineVariant: '#c4c8bf',
        promoGold: '#C5A059',
        whatsapp: '#25D366',
        error: '#ba1a1a',
        // Verde vivo dedicado a precios/descuentos/ahorro (carrito, checkout,
        // "-X%", "ahorrás $X") — a propósito distinto de `whatsapp` (más
        // teal/celeste) para que nunca se confunda con un CTA de WhatsApp en
        // la misma pantalla, y distinto de `primary` (verde muy oscuro de
        // marca) porque para esto se buscó algo más llamativo/vivo, no el
        // verde bosque apagado.
        discount: '#16A34A',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Archivo', 'sans-serif'],
      },
      spacing: {
        gutter: '24px',
        mobile: '16px',
        section: '80px',
      },
      maxWidth: {
        container: '1200px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        // 50% porque el contenido está duplicado una vez (ver Marquee.jsx) —
        // recorrer la mitad del ancho total = un loop perfecto sin salto.
        marquee: 'marquee 28s linear infinite',
      },
      fontSize: {
        'display-mobile': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
        display: ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg-mobile': ['28px', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-lg': ['40px', { lineHeight: '1.2', fontWeight: '600' }],
        'headline-md': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        label: ['12px', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '600' }],
      },
    },
  },
  plugins: [],
}
