<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      :value="currentValue"
      @click:regenerate="() => generateValue(true)"
    >
      <template #settings>
        <v-text-field v-model="fingerprint" label="Fingerprint">
          <template #clear>
            <clear-button
              tooltip-text="Reset"
              @click="() => (fingerprint = '')"
            />
          </template>
        </v-text-field>

        <v-number-input
          v-model="lengthProxy"
          :min="lengthMinValue"
          :max="lengthMaxValue"
          label="Length"
          :hint="`Must be a positive integer (${lengthMinValue} -
              ${lengthMaxValue})`"
          persistent-hint
        >
          <template #clear>
            <clear-button
              tooltip-text="Reset"
              @click="() => (lengthProxy = lengthDefault)"
            />
          </template>
        </v-number-input>
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import {
  init as initCuid2,
  getConstants as getCuid2Defaults,
} from '@paralleldrive/cuid2'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import { computed, ref } from 'vue'
import ClearButton from '@/components/ClearButton.vue'
import type { GeneratorProps } from '@generators/generator-props'
import { useValueGenerator } from '@/helper/generator-helper'
import { useGeneratorSettings } from '@/helper/generator-settings-helper'

const props = defineProps<GeneratorProps>()

const lengthMinValue = 2
const { defaultLength: lengthDefault, bigLength: lengthMaxValue } =
  getCuid2Defaults()
const fingerprintDefault = ''

const fingerprint = ref<string>(fingerprintDefault)

const length = ref<number | string>(lengthDefault)
const lengthProxy = computed({
  get() {
    if (length.value === '') {
      return lengthDefault
    }

    return +length.value
  },
  set(newValue: number | string) {
    if (newValue === null || newValue === undefined) {
      newValue = lengthDefault
    }

    if (newValue !== '') {
      let asNumber = +newValue
      if (asNumber < lengthMinValue) {
        asNumber = lengthMinValue
      } else if (asNumber > lengthMaxValue) {
        asNumber = lengthMaxValue
      }

      length.value = Math.trunc(asNumber)

      return
    }

    length.value = newValue
  },
})

const settingsObject = computed(() => ({
  fingerprint: fingerprint.value,
  length: lengthProxy.value,
}))

const { currentValue, generateValue } = useValueGenerator(
  initCuid2({
    fingerprint: fingerprint.value,
    length: lengthProxy.value,
  }),
  [settingsObject]
)

useGeneratorSettings(
  props.identifier,
  settingsObject,
  (so) => so.fingerprint === fingerprintDefault && so.length === lengthDefault,
  (gs) => {
    fingerprint.value = gs.fingerprint || fingerprintDefault
    lengthProxy.value = gs.length || lengthDefault
  }
)
</script>
