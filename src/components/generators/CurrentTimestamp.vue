<template>
  <v-expansion-panels>
    <generator-expansion-panel title="Current timestamp" v-model:was-copied="wasCopied" :value-generator="() => generate()">
      <template #settings>
        <v-text-field
          variant="solo"
          class="mt-2"
          v-model.trim="formatProxy"
          label="Date-fns format*"
          required
          density="compact"
          hide-details>
          <template #clear>
            <clear-button @click:reset="() => (formatProxy = 't')" />
          </template>
        </v-text-field>
        <v-select
          hide-details
          class="mt-2"
          density="compact"
          variant="solo"
          clearable
          label="Date-fns locale"
          v-model="selectedLocale"
          :items="selectableLocales">
          <template #clear>
            <clear-button @click:reset="() => (selectedLocale = undefined)" />
          </template>
        </v-select>
      </template>
      <template #info>
        <v-card-text class="pt-0">
          <small>
            List of date-fns format identifiers can be found at
            <a href="https://date-fns.org/v4.1.0/docs/format" target="_blank">https://date-fns.org/v4.1.0/docs/format</a>
          </small>
        </v-card-text>
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<style lang="scss" scoped>
a {
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: #90caf9;
    text-decoration: none;
  }

  &:hover {
    color: #42a5f5;
  }
}
</style>

<script setup lang="ts">
import { formatDate, type FormatOptions } from "date-fns"
import GeneratorExpansionPanel from "@/components/generators/GeneratorExpansionPanel.vue"
import { computed, ref } from "vue"
import ClearButton from "@/components/ClearButton.vue"
import * as dateFnsLocales from "date-fns/locale"
import { type Locale } from "date-fns/locale"

const wasCopied = defineModel<boolean>("wasCopied", {
  required: true,
  default: false,
})

const format = ref<string>("t")
const formatProxy = computed({
  get() {
    if (format.value === "") {
      return "t"
    }

    return format.value
  },
  set(newValue: string) {
    if (!newValue) {
      newValue = "t"
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
