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
        // prácticamente monocromático. Se probó terracota primero; se
        // reemplazó por este rosa mauve apagado según data real de
        // ui-ux-pro-max/colors.csv: las entradas de Florería (verde +
        // rosa/magenta, "Natural green + floral pink") y Wedding/Event
        // Planning (rosa + dorado, "Romantic pink + elegant gold") son las
        // más cercanas a esta categoría, y ambas usan rosa, no terracota —
        // además el rosa está más lejos del dorado en el círculo cromático
        // (más contraste) que el terracota, que competía con el dorado por
        // el mismo territorio cálido.
        secondary: '#A8677A',
        secondaryContainer: '#F3E1E5',
        secondaryFixed: '#EFD7DC',
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
