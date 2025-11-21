/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { md3 } from 'vuetify/blueprints'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { en } from 'vuetify/locale'
import { softDark } from './soft-dark-theme'
import { light } from './light-theme'
import { VBtn, VAvatar, VList, VTextField } from 'vuetify/components'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'softDark',
    themes: {
      softDark,
      light,
    },
  },
  blueprint: md3,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  locale: {
    locale: 'en',
    messages: { en },
  },
  aliases: {
    CloseDialogButton: VBtn,
    AppIconAvatar: VAvatar,
    AppMainMenu: VList,
    DenseIconButton: VBtn,
    HistoryItem: VTextField,
  },
  defaults: {
    CloseDialogButton: {
      text: 'Close',
      color: 'on-background',
      variant: 'text',
    },
    AppIconAvatar: {
      border: true,
      variant: 'text',
      size: 44,
      class: 'mr-1',
    },
    AppMainMenu: {
      border: true,
      activatable: true,
      density: 'compact',
      slim: true,
      style: {
        'background-color': 'rgb(var(--v-theme-background))',
        padding: 0,
      },
    },
    DenseIconButton: {
      density: 'compact',
      variant: 'text',
      size: 'small',
      color: 'primary',
    },
    HistoryItem: {
      variant: 'plain',
      density: 'compact',
      readonly: true,
      hideDetails: true,
    },

    VTooltip: {
      openDelay: 500,
    },
    VAppBar: {
      border: 'b-sm',
    },
    VRow: {
      dense: true,
    },
    VBtn: {
      rounded: 'xs',
    },
    VContainer: {
      fluid: true,
    },
    VCard: {
      border: true,
      color: 'rgb(var(--v-theme-background))',
      rounded: 'xs',
    },
    VExpansionPanels: {
      static: true,
      multiple: true,
    },
    VExpansionPanel: {
      style: {
        'background-color': 'rgb(var(--v-theme-background))',
        border: '1px solid rgb(var(--v-border-color), var(--v-border-opacity))',
      },
    },
    VSwitch: {
      color: 'primary',
      hideDetails: true,
      density: 'comfortable',
    },
    VCheckbox: {
      color: 'primary',
      hideDetails: true,
      density: 'comfortable',
    },
    VNumberInput: {
      variant: 'solo-filled',
      controlVariant: 'stacked',
      type: 'number',
      validateOn: 'eager',
    },
    VSelect: {
      variant: 'solo-filled',
      validateOn: 'eager',
    },
    VTextField: {
      bgColor: 'rgb(var(--v-theme-background))',
      variant: 'solo-filled',
      validateOn: 'eager',

      VField: {
        style: {
          border:
            '1px solid rgb(var(--v-border-color), var(--v-border-opacity))',
        },
      },
    },
  },
})
