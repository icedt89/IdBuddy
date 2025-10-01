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
          v-model.trim="format"
          label="Date-fns format"
          persistent-placeholder
          :placeholder="useIso8601 ? 'ISO 8601' : undefined"
          hint="List of date-fns format identifiers can be found at https://date-fns.org/v4.1.0/docs/format"
          persistent-hint
        >
          <template #clear>
            <clear-button @click:reset="() => (format = defaultFormat)" />
          </template>
        </v-text-field>
        <v-select
          class="mt-2"
          clearable
          hide-details
          label="Date-fns locale"
          v-model="selectedLocale"
          :items="locales"
          item-title="displayName"
          item-value="code"
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
import { formatDate, formatISO, type FormatOptions } from 'date-fns'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import { computed, ref } from 'vue'
import ClearButton from '@/components/ClearButton.vue'
import * as dateFnsLocales from 'date-fns/locale'
import type { Locale } from 'date-fns/locale'
import type { GeneratorProps } from '@generators/generator-props'

interface LocaleWithDisplayName extends Locale {
  displayName: string
}

defineProps<GeneratorProps>()

const defaultFormat = ''

const format = ref<string>(defaultFormat)

const useIso8601 = computed(() => format.value === '')

// Generated via ChatGPT
const localeNames = new Map<string, string>([
  ['af', 'Afrikaans'],
  ['ar', 'Arabic'],
  ['ar-DZ', 'Arabic (Algeria)'],
  ['ar-EG', 'Arabic (Egypt)'],
  ['ar-MA', 'Arabic (Morocco)'],
  ['ar-SA', 'Arabic (Saudi Arabia)'],
  ['ar-TN', 'Arabic (Tunisia)'],
  ['az', 'Azerbaijani'],
  ['be', 'Belarusian'],
  ['be-tarask', 'Belarusian (Taraskievica orthography)'],
  ['bg', 'Bulgarian'],
  ['bn', 'Bengali'],
  ['bs', 'Bosnian'],
  ['ca', 'Catalan'],
  ['ckb', 'Central Kurdish (Sorani)'],
  ['cs', 'Czech'],
  ['cy', 'Welsh'],
  ['da', 'Danish'],
  ['de', 'German'],
  ['de-AT', 'German (Austria)'],
  ['el', 'Greek'],
  ['en-AU', 'English (Australia)'],
  ['en-CA', 'English (Canada)'],
  ['en-GB', 'English (United Kingdom)'],
  ['en-IE', 'English (Ireland)'],
  ['en-IN', 'English (India)'],
  ['en-NZ', 'English (New Zealand)'],
  ['en-US', 'English (United States)'],
  ['en-ZA', 'English (South Africa)'],
  ['eo', 'Esperanto'],
  ['es', 'Spanish'],
  ['et', 'Estonian'],
  ['eu', 'Basque'],
  ['fa-IR', 'Persian (Iran)'],
  ['fi', 'Finnish'],
  ['fr', 'French'],
  ['fr-CA', 'French (Canada)'],
  ['fr-CH', 'French (Switzerland)'],
  ['fy', 'Western Frisian'],
  ['gd', 'Scottish Gaelic'],
  ['gl', 'Galician'],
  ['gu', 'Gujarati'],
  ['he', 'Hebrew'],
  ['hi', 'Hindi'],
  ['hr', 'Croatian'],
  ['ht', 'Haitian Creole'],
  ['hu', 'Hungarian'],
  ['hy', 'Armenian'],
  ['id', 'Indonesian'],
  ['is', 'Icelandic'],
  ['it', 'Italian'],
  ['it-CH', 'Italian (Switzerland)'],
  ['ja', 'Japanese'],
  ['ja-Hira', 'Japanese (Hiragana)'],
  ['ka', 'Georgian'],
  ['kk', 'Kazakh'],
  ['km', 'Khmer'],
  ['kn', 'Kannada'],
  ['ko', 'Korean'],
  ['lb', 'Luxembourgish'],
  ['lt', 'Lithuanian'],
  ['lv', 'Latvian'],
  ['mk', 'Macedonian'],
  ['mn', 'Mongolian'],
  ['ms', 'Malay'],
  ['mt', 'Maltese'],
  ['nb', 'Norwegian Bokmål'],
  ['nl', 'Dutch'],
  ['nl-BE', 'Dutch (Belgium)'],
  ['nn', 'Norwegian Nynorsk'],
  ['oc', 'Occitan'],
  ['pl', 'Polish'],
  ['pt', 'Portuguese'],
  ['pt-BR', 'Portuguese (Brazil)'],
  ['ro', 'Romanian'],
  ['ru', 'Russian'],
  ['se', 'Northern Sami'],
  ['sk', 'Slovak'],
  ['sl', 'Slovenian'],
  ['sq', 'Albanian'],
  ['sr', 'Serbian'],
  ['sr-Latn', 'Serbian (Latin)'],
  ['sv', 'Swedish'],
  ['ta', 'Tamil'],
  ['te', 'Telugu'],
  ['th', 'Thai'],
  ['tr', 'Turkish'],
  ['ug', 'Uyghur'],
  ['uk', 'Ukrainian'],
  ['uz', 'Uzbek'],
  ['uz-Cyrl', 'Uzbek (Cyrillic)'],
  ['vi', 'Vietnamese'],
  ['zh-CN', 'Chinese (Simplified, China)'],
  ['zh-HK', 'Chinese (Traditional, Hong Kong)'],
  ['zh-TW', 'Chinese (Traditional, Taiwan)'],
])
const locales = Object.entries(dateFnsLocales).map(([_, locale]) => {
  let displayName = localeNames.get(locale.code)
  if (!displayName) {
    displayName = locale.code
    console.warn(`'${locale.code}' does not have a valid display name`)
  } else {
    displayName = `${displayName} [${locale.code}]`
  }

  return <LocaleWithDisplayName>{
    ...locale,
    displayName,
  }
})
const localesMap = new Map<string, Locale>(locales.map((l) => [l.code, l]))

const selectedLocale = ref<string>()

function generate(): string {
  const formatOptions: FormatOptions = {
    useAdditionalDayOfYearTokens: true,
    useAdditionalWeekYearTokens: true,
  }
  if (selectedLocale.value) {
    formatOptions.locale = localesMap.get(selectedLocale.value)
  }

  if (useIso8601.value) {
    return formatISO(new Date(), formatOptions)
  }

  return formatDate(new Date(), format.value, formatOptions)
}
</script>
