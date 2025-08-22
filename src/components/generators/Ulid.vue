<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      :value-generator="() => ulid(ulidSeedTimeProxy)"
      has-details
      can-regenerate
    >
      <template #settings>
        <v-number-input
          :step="1"
          :min="ulidMinValue"
          :max="ulidMaxValue"
          label="Seed Time"
          :hint="`Must be a positive integer (${ulidMinValue} -
              ${ulidMaxValue})`"
          persistent-hint
        >
          <template #clear>
            <clear-button
              @click:reset="() => (ulidSeedTimeProxy = undefined)"
            />
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

const ulidMinValue = 0
const ulidMaxValue = 281474976710655

const ulidSeedTime = ref<number | string>('')
const ulidSeedTimeProxy = computed({
  get() {
    if (ulidSeedTime.value === '') {
      return undefined
    }

    return +ulidSeedTime.value
  },
  set(newValue: number | string) {
    if (newValue === null || newValue === undefined) {
      newValue = ''
    }

    if (newValue !== '') {
      let asNumber = +newValue
      if (asNumber < ulidMinValue) {
        asNumber = ulidMinValue
      } else if (asNumber > ulidMaxValue) {
        asNumber = ulidMaxValue
      }

      ulidSeedTime.value = Math.trunc(asNumber)

      return
    }

    ulidSeedTime.value = newValue
  },
})
</script>
