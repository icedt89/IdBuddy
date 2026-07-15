<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      :value="currentValue"
      @click:regenerate="() => generateValue(true)"
    >
      <template #settings>
        <v-row density="compact">
          <v-col :cols="12" :lg="6">
            <v-text-field
              v-model.trim="format"
              label="Date-fns format"
              persistent-placeholder
              :placeholder="useIso8601 ? 'ISO 8601' : undefined"
              hint="Leave this text and persistent-hint so #message template gets rendered"
              persistent-hint
            >
              <template #message>
                <a
                  href="https://date-fns.org/v4.4.0/docs/format"
                  target="_other"
                  >https://date-fns.org/v4.4.0/docs/format</a
                >
              </template>

              <template #clear>
                <clear-btn @click="() => (format = formatDefault)" />
              </template>
            </v-text-field>
          </v-col>
          <v-col :cols="12" :lg="6">
            <v-select
              clearable
              label="Date-fns locale"
              v-model="selectedLocale"
              :items="locales"
              item-title="displayName"
              item-value="code"
              hide-details
              variant="solo-filled"
            >
              <template #clear>
                <clear-btn @click="() => (selectedLocale = localeDefault)" />
              </template>
            </v-select>
          </v-col>
        </v-row>
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { formatDate, formatISO, type FormatOptions } from 'date-fns'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import { computed, ref } from 'vue'
import ClearBtn from '@/components/ClearBtn.vue'
import * as dateFnsLocales from 'date-fns/locale'
import type { Locale } from 'date-fns/locale'
import type { GeneratorProps } from '@generators/generator-props'
import { useValueGenerator } from '@/helper/generator-helper'
import { useGeneratorSettings } from '@/helper/generator-settings-helper'

interface LocaleWithDisplayName extends Locale {
  displayName: string
}

const props = defineProps<GeneratorProps>()

const formatDefault = ''
const localeDefault = undefined

const format = ref<string>(formatDefault)
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

const selectedLocale = ref<string | undefined>(localeDefault)

const settingsObject = computed(() => ({
  format: format.value,
  locale: selectedLocale.value,
}))

const { currentValue, generateValue } = useValueGenerator(() => {
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
}, [settingsObject])

useGeneratorSettings(
  props.identifier,
  settingsObject,
  (so) => so.format === formatDefault && so.locale === localeDefault,
  (gs) => {
    format.value = gs.format || formatDefault
    selectedLocale.value = gs.locale || localeDefault
  }
)
</script>
