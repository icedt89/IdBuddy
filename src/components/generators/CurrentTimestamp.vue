<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      :value-generator="() => generate()"
      has-details
      can-regenerate
    >
      <template #settings>
        <v-text-field
          v-model.trim="formatProxy"
          label="Date-fns format"
          hint="List of date-fns format identifiers can be found at https://date-fns.org/v4.1.0/docs/format"
          persistent-hint
        >
          <template #clear>
            <clear-button @click:reset="() => (formatProxy = defaultFormat)" />
          </template>
        </v-text-field>
        <v-select
          class="mt-2"
          clearable
          hide-details
          label="Date-fns locale"
          v-model="selectedLocale"
          :items="selectableLocales"
        >
          <template #clear>
            <clear-button @click:reset="() => (selectedLocale = undefined)" />
          </template>
        </v-select>
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { formatDate, type FormatOptions } from 'date-fns'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import { computed, ref } from 'vue'
import ClearButton from '@/components/ClearButton.vue'
import * as dateFnsLocales from 'date-fns/locale'
import type { Locale } from 'date-fns/locale'
import type { GeneratorProps } from '@generators/generator-props'

defineProps<GeneratorProps>()

const defaultFormat = 't'

const format = ref<string>(defaultFormat)
const formatProxy = computed({
  get() {
    if (format.value === '') {
      return defaultFormat
    }

    return format.value
  },
  set(newValue: string) {
    if (!newValue) {
      newValue = defaultFormat
    }

    format.value = newValue
  },
})

const locales = Object.entries(dateFnsLocales).reduce(
  (a, c) => {
    a[c[1].code] = c[1]

    return a
  },
  <{ [key: string]: Locale }>{}
)

const selectableLocales = Object.keys(locales)
const selectedLocale = ref<string>()

function generate(): string {
  let formatOptions: FormatOptions | undefined = undefined
  if (selectedLocale.value) {
    formatOptions = {
      locale: locales[selectedLocale.value],
    }
  }

  return formatDate(new Date(), format.value, formatOptions)
}
</script>
