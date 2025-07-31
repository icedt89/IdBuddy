<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      v-model:was-copied="wasCopied"
      :value-generator="() => nanoid(nanoIdSizeProxy)"
      has-details
      can-regenerate
    >
      <template #settings>
        <v-number-input
          variant="solo"
          class="mt-2"
          type="number"
          :min="nanoIdMinValue"
          :max="nanoIdMaxValue"
          control-variant="stacked"
          v-model="nanoIdSizeProxy"
          label="Length"
        >
          <template #clear>
            <clear-button @click:reset="() => (nanoIdSizeProxy = undefined)" />
          </template>
          <template #details>
            <small class="opacity-50"
              >Length must be a positive integer (1 -
              {{ nanoIdMaxValue }})</small
            >
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

const nanoIdMinValue = 1
const nanoIdMaxValue = 65536

const wasCopied = defineModel<boolean>('wasCopied', {
  required: true,
  default: false,
})

const nanoIdSize = ref<number | string>('')
const nanoIdSizeProxy = computed({
  get() {
    if (nanoIdSize.value === '') {
      return undefined
    }

    return +nanoIdSize.value
  },
  set(newValue: number | string) {
    if (newValue === null || newValue === undefined) {
      newValue = ''
    }

    if (newValue !== '') {
      let asNumber = +newValue
      if (asNumber < nanoIdMinValue) {
        asNumber = nanoIdMinValue
      } else if (asNumber > nanoIdMaxValue) {
        asNumber = nanoIdMaxValue
      }

      nanoIdSize.value = Math.trunc(asNumber)

      return
    }

    nanoIdSize.value = newValue
  },
})
</script>
