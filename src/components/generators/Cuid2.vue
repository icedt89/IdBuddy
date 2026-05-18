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
              @click="() => (lengthProxy = defaultLength)"
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

defineProps<GeneratorProps>()

const lengthMinValue = 2
const { defaultLength, bigLength: lengthMaxValue } = getCuid2Defaults()

const length = ref<number | string>(defaultLength)
const lengthProxy = computed({
  get() {
    if (length.value === '') {
      return defaultLength
    }

    return +length.value
  },
  set(newValue: number | string) {
    if (newValue === null || newValue === undefined) {
      newValue = defaultLength
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

const fingerprint = ref<string>('')

const { currentValue, generateValue } = useValueGenerator(
  initCuid2({
    length: lengthProxy.value,
    fingerprint: fingerprint.value,
  }),
  [lengthProxy, fingerprint]
)
</script>
