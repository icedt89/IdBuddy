<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      :value-generator="() => ulid(seedTimeProxy)"
      has-details
      can-regenerate
    >
      <template #settings>
        <v-number-input
          :step="1"
          :min="seedTimeMinValue"
          :max="seedTimeMaxValue"
          label="Seed Time"
          v-model="seedTimeProxy"
          :hint="`Must be a positive integer (${seedTimeMinValue} -
              ${seedTimeMaxValue})`"
          persistent-hint
        >
          <template #clear>
            <clear-button @click:reset="() => (seedTimeProxy = undefined)" />
          </template>
        </v-number-input>
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { ulid } from 'ulidx'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import { computed, ref } from 'vue'
import ClearButton from '@/components/ClearButton.vue'
import type { GeneratorProps } from '@generators/generator-props'

defineProps<GeneratorProps>()

const seedTimeMinValue = 0
const seedTimeMaxValue = 2048

const seedTime = ref<number | string>('')
const seedTimeProxy = computed({
  get() {
    if (seedTime.value === '') {
      return undefined
    }

    return +seedTime.value
  },
  set(newValue: number | string) {
    if (newValue === null || newValue === undefined) {
      newValue = ''
    }

    if (newValue !== '') {
      let asNumber = +newValue
      if (asNumber < seedTimeMinValue) {
        asNumber = seedTimeMinValue
      } else if (asNumber > seedTimeMaxValue) {
        asNumber = seedTimeMaxValue
      }

      seedTime.value = Math.trunc(asNumber)

      return
    }

    seedTime.value = newValue
  },
})
</script>
