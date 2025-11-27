<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      :value-generator="() => nanoid(lengthProxy)"
      has-details
      can-regenerate
    >
      <template #settings>
        <v-number-input
          :min="lengthMinValue"
          :max="lengthMaxValue"
          v-model="lengthProxy"
          label="Length"
          :hint="`Must be a positive integer (1 -
              ${lengthMaxValue})`"
          persistent-hint
        >
          <template #clear>
            <clear-button @click:reset="() => (lengthProxy = undefined)" />
          </template>
        </v-number-input>
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { nanoid } from 'nanoid'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import { computed, ref } from 'vue'
import ClearButton from '@/components/ClearButton.vue'
import type { GeneratorProps } from '@generators/generator-props'

defineProps<GeneratorProps>()

const lengthMinValue = 1
const lengthMaxValue = 65536

const length = ref<number | string>('')
const lengthProxy = computed({
  get() {
    if (length.value === '') {
      return undefined
    }

    return +length.value
  },
  set(newValue: number | string) {
    if (newValue === null || newValue === undefined) {
      newValue = ''
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
</script>
