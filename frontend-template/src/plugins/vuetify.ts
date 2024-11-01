/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

import type { DefaultsInstance } from 'vuetify/lib/framework.mjs'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

const defaults: DefaultsInstance = {
  VTextField: {
    variant: 'solo-filled',
    density: 'comfortable',
    color: 'primary',
    rounded: 'lg',
  },

  VBtn: {
    variant: 'flat',
    density: 'comfortable',
    color: 'primary',
    rounded: 'lg',
    elevation: 2,
  },

  VCard: {
    // variant: '',
    rounded: 'lg',
    elevation: 4,
    density: 'comfortable',
  },

  VAppBar: {
    flat: true,
    color: 'transparent',
  },

  VContainer: {
    fluid: true,
    'max-width': '1200px',
  },

  VTooltip: {
    location: 'top',
    rounded: 'xl',
    color: 'primary',
  },

  VListItem: {
    rounded: 'sm',
    density: 'compact',
  },

  VAlert: {
    border: 'start',
    elevation: 2,
    rounded: 'lg',
  },

  VChip: {
    variant: 'outlined',
    rounded: 'full',
    color: 'primary',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'light', // Definir o tema padrão como Light ou Dark
    themes: {
      light: {
        colors: {
          primary: '#3F51B5', // Azul real para modo claro
          secondary: '#FF4081', // Rosa vibrante para destaques
          accent: '#82B1FF',   // Azul claro para destaques menores
          background: '#F5F7FA', // Cinza claro para o fundo
          surface: '#FFFFFF', // Branco para os cards e superfícies
          text: '#333333',    // Texto principal escuro
          textSecondary: '#666666', // Texto secundário
        },
      },
      dark: {
        colors: {
          primary: '#3F51B5', // Azul claro e vibrante para modo escuro
          secondary: '#FF4081', // Rosa vibrante para destaques
          accent: '#82B1FF',   // Azul claro para destaques menores no modo escuro
          background: '#181818', // Preto profundo para o fundo
          surface: '#FFFFFF',   // Um cinza escuro suave para os cards
          text: '#E0E0E0',     // Texto principal claro
          textSecondary: '#B0B0B0', // Texto secundário claro
        },
      },
    },
  },
  defaults,
})