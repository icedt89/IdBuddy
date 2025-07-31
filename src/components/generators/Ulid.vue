<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      v-model:was-copied="wasCopied"
      :value-generator="() => ulid(ulidSeedTimeProxy)"
      has-details
      can-regenerate
    >
      <template #settings>
        <v-number-input
          variant="solo"
          class="mt-2"
          type="number"
          :step="1"
          :min="ulidMinValue"
          :max="ulidMaxValue"
          v-model="ulidSeedTimeProxy"
          control-variant="stacked"
          label="Seed Time"
        >
          <template #clear>
            <clear-button
              @click:reset="() => (ulidSeedTimeProxy = undefined)"
            />
          </template>
          <template #details>
            <small class="opacity-50"
              >Seed Time must be a positive integer ({{ ulidMinValue }} -
              {{ ulidMaxValue }})</small
            >
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

const wasCopied = defineModel<boolean>('wasCopied', {
  required: true,
  default: false,
})

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
