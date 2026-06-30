/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Full color ramps ──────────────────────────────────────────
        cream: {
          50:  '#FDFAF6',
          100: '#FAF5EE',
          200: '#F4EBD9',
          300: '#EAD9C0',
          400: '#DBBF9A',
          500: '#C9A378',
          600: '#B08A61',
          700: '#8A6A45',
          800: '#6A4E30',
          900: '#3D2B1F',
        },
        terracotta: {
          50:  '#FDF4F1',
          100: '#FAE4DC',
          200: '#F5C4B2',
          300: '#ED9F86',
          400: '#E07A5F',
          500: '#C4715A',  // brand primary
          600: '#A85B46',
          700: '#8A4535',
          800: '#6B3127',
          900: '#4A1F18',
        },
        sage: {
          50:  '#EEF3F0',
          100: '#D6E4DA',
          200: '#ADCAB4',
          300: '#7EA98A',
          400: '#568A64',
          500: '#3D5A47',  // brand secondary
          600: '#314A3A',
          700: '#263A2D',
          800: '#1C2B22',
          900: '#121C17',
        },
        neutral: {
          50:  '#FAFAF9',
          100: '#F5F4F2',
          200: '#ECEAE6',
          300: '#DDD9D4',
          400: '#C4BEB7',
          500: '#A89E96',
          600: '#8A7E76',
          700: '#6B6059',
          800: '#4A4240',
          900: '#1C1410',  // brand espresso
        },
        success: {
          50:  '#EEFAF3',
          100: '#D0F2DC',
          300: '#5BBF80',
          500: '#2D8A4E',
          700: '#1A5530',
          900: '#0E3020',
        },
        warning: {
          50:  '#FEF9EC',
          100: '#FDF0C6',
          300: '#F5C748',
          500: '#D97B06',
          700: '#9A5203',
          900: '#5C2F00',
        },
        error: {
          50:  '#FEF2F2',
          100: '#FCE4E4',
          300: '#F08080',
          500: '#C43B3B',
          700: '#862222',
          900: '#4D1010',
        },
        // ── Semantic aliases ──────────────────────────────────────────
        nest: {
          espresso:         '#1C1410',
          brown:            '#3D2B1F',
          terracotta:       '#C4715A',
          'terracotta-dark':'#A85B46',
          'terracotta-light':'#E07A5F',
          'terracotta-pale': '#FAE4DC',
          sage:             '#3D5A47',
          'sage-dark':      '#263A2D',
          'sage-light':     '#568A64',
          'sage-pale':      '#D6E4DA',
          sand:             '#A89E96',
          mist:             '#E8E2DC',
          bg:               '#FAF5EE',
          surface:          '#FFFFFF',
        },
      },

      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        // Display
        'display-2xl': ['4.5rem',   { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl':  ['3.75rem',  { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-lg':  ['3rem',     { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '600' }],
        'display-md':  ['2.25rem',  { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-sm':  ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.005em', fontWeight: '600' }],
        // Headings
        'heading-xl':  ['1.5rem',   { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '600' }],
        'heading-lg':  ['1.25rem',  { lineHeight: '1.4', fontWeight: '600' }],
        'heading-md':  ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-sm':  ['1rem',     { lineHeight: '1.5', fontWeight: '600' }],
        // Body
        'body-xl':     ['1.125rem', { lineHeight: '1.75' }],
        'body-lg':     ['1rem',     { lineHeight: '1.75' }],
        'body-md':     ['0.9375rem',{ lineHeight: '1.6' }],
        'body-sm':     ['0.875rem', { lineHeight: '1.6' }],
        'body-xs':     ['0.8125rem',{ lineHeight: '1.5' }],
        // UI
        'label-lg':    ['0.875rem', { lineHeight: '1.25', fontWeight: '500' }],
        'label-md':    ['0.8125rem',{ lineHeight: '1.25', fontWeight: '500' }],
        'label-sm':    ['0.75rem',  { lineHeight: '1.25', fontWeight: '500' }],
        'caption':     ['0.75rem',  { lineHeight: '1.4' }],
        'overline':    ['0.6875rem',{ lineHeight: '1.25', letterSpacing: '0.12em', fontWeight: '600' }],
        'code':        ['0.875rem', { lineHeight: '1.6', fontFamily: '"JetBrains Mono", monospace' }],
      },

      letterSpacing: {
        tighter:    '-0.04em',
        tight:      '-0.02em',
        snug:       '-0.01em',
        normal:     '0em',
        wide:       '0.02em',
        wider:      '0.05em',
        widest:     '0.12em',
        'ultra-wide':'0.2em',
      },

      lineHeight: {
        tighter: '1.1',
        tight:   '1.25',
        snug:    '1.375',
        normal:  '1.5',
        relaxed: '1.75',
        loose:   '2',
      },

      spacing: {
        '0.5': '0.125rem',  //  2px
        '1':   '0.25rem',   //  4px
        '1.5': '0.375rem',  //  6px
        '2':   '0.5rem',    //  8px  — base unit
        '2.5': '0.625rem',  // 10px
        '3':   '0.75rem',   // 12px
        '3.5': '0.875rem',  // 14px
        '4':   '1rem',      // 16px
        '5':   '1.25rem',   // 20px
        '6':   '1.5rem',    // 24px
        '7':   '1.75rem',   // 28px
        '8':   '2rem',      // 32px
        '9':   '2.25rem',   // 36px
        '10':  '2.5rem',    // 40px
        '11':  '2.75rem',   // 44px  — min tap target
        '12':  '3rem',      // 48px
        '14':  '3.5rem',    // 56px
        '16':  '4rem',      // 64px
        '18':  '4.5rem',    // 72px
        '20':  '5rem',      // 80px
        '24':  '6rem',      // 96px
        '28':  '7rem',      // 112px
        '32':  '8rem',      // 128px
        '36':  '9rem',      // 144px
        '40':  '10rem',     // 160px
        '48':  '12rem',     // 192px
        '56':  '14rem',     // 224px
        '64':  '16rem',     // 256px
      },

      borderRadius: {
        'none': '0',
        'xs':   '0.25rem',   //  4px
        'sm':   '0.375rem',  //  6px
        'md':   '0.5rem',    //  8px
        'lg':   '0.75rem',   // 12px
        'xl':   '1rem',      // 16px
        '2xl':  '1.25rem',   // 20px
        '3xl':  '1.5rem',    // 24px
        '4xl':  '2rem',      // 32px
        'full': '9999px',
      },

      boxShadow: {
        'xs':      '0 1px 2px 0 rgba(28,20,16,0.05)',
        'sm':      '0 1px 3px 0 rgba(28,20,16,0.08), 0 1px 2px -1px rgba(28,20,16,0.04)',
        'md':      '0 4px 6px -1px rgba(28,20,16,0.08), 0 2px 4px -2px rgba(28,20,16,0.04)',
        'lg':      '0 10px 15px -3px rgba(28,20,16,0.08), 0 4px 6px -4px rgba(28,20,16,0.04)',
        'xl':      '0 20px 25px -5px rgba(28,20,16,0.08), 0 8px 10px -6px rgba(28,20,16,0.04)',
        '2xl':     '0 25px 50px -12px rgba(28,20,16,0.18)',
        'card':    '0 2px 8px -1px rgba(28,20,16,0.06), 0 0 0 1px rgba(28,20,16,0.04)',
        'card-hover': '0 8px 24px -4px rgba(28,20,16,0.10), 0 0 0 1px rgba(28,20,16,0.04)',
        'modal':   '0 24px 48px -8px rgba(28,20,16,0.22), 0 0 0 1px rgba(28,20,16,0.06)',
        'popover': '0 8px 16px -4px rgba(28,20,16,0.12), 0 0 0 1px rgba(28,20,16,0.06)',
        'float':   '0 32px 64px -12px rgba(28,20,16,0.24)',
        'inner':   'inset 0 2px 4px 0 rgba(28,20,16,0.06)',
        'focus':   '0 0 0 3px rgba(196,113,90,0.35)',
        'focus-sage':'0 0 0 3px rgba(61,90,71,0.3)',
        'none':    'none',
      },

      transitionDuration: {
        '75':  '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '700': '700ms',
      },

      transitionTimingFunction: {
        'spring':    'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth':    'cubic-bezier(0.4, 0, 0.2, 1)',
        'in-back':   'cubic-bezier(0.36, 0, 0.66, -0.56)',
        'out-back':  'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'in-expo':   'cubic-bezier(0.7, 0, 0.84, 0)',
        'out-expo':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },

      animation: {
        'fade-in':        'fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-up':        'fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-down':      'fade-down 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in':       'scale-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-in-right': 'slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-in-left':  'slide-in-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'shimmer':        'shimmer 1.8s linear infinite',
        'pulse-soft':     'pulse-soft 2s ease-in-out infinite',
        'spin-slow':      'spin 3s linear infinite',
        'marquee':        'marquee 28s linear infinite',
        'marquee-slow':   'marquee 48s linear infinite',
      },

      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          '0%':   { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
        'marquee': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },

      screens: {
        'xs':  '375px',
        'sm':  '640px',
        'md':  '768px',
        'lg':  '1024px',
        'xl':  '1280px',
        '2xl': '1440px',
        '3xl': '1680px',
      },

      maxWidth: {
        'xs':   '20rem',
        'sm':   '24rem',
        'md':   '28rem',
        'lg':   '32rem',
        'xl':   '36rem',
        '2xl':  '42rem',
        '3xl':  '48rem',
        '4xl':  '56rem',
        '5xl':  '64rem',
        '6xl':  '72rem',
        '7xl':  '80rem',
        'page': '1200px',
        'full': '100%',
      },

      zIndex: {
        'base':    '0',
        'raised':  '10',
        'dropdown':'20',
        'sticky':  '30',
        'overlay': '40',
        'modal':   '50',
        'popover': '60',
        'toast':   '70',
        'tooltip': '80',
      },
    },
  },
  plugins: [],
};
