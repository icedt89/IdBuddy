<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      :value-generator="() => nanoid(sizeProxy)"
      has-details
      can-regenerate
    >
      <template #settings>
        <v-number-input
          :min="sizeMinValue"
          :max="sizeMaxValue"
          v-model="sizeProxy"
          label="Size"
          :hint="`Must be a positive integer (1 -
              ${sizeMaxValue})`"
          persistent-hint
        >
          <template #clear>
            <clear-button @click:reset="() => (sizeProxy = undefined)" />
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

const sizeMinValue = 1
const sizeMaxValue = 65536

const size = ref<number | string>('')
const sizeProxy = computed({
  get() {
    if (size.value === '') {
      return undefined
    }

    return +size.value
  },
  set(newValue: number | string) {
    if (newValue === null || newValue === undefined) {
      newValue = ''
    }

    if (newValue !== '') {
      let asNumber = +newValue
      if (asNumber < sizeMinValue) {
        asNumber = sizeMinValue
      } else if (asNumber > sizeMaxValue) {
        asNumber = sizeMaxValue
      }

      size.value = Math.trunc(asNumber)

      return
    }

    size.value = newValue
  },
})
</script>
