<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      v-model:was-copied="wasCopied"
      :value-generator="
        () => new Snowflake(snowflakeIdMachineIdProxy).generate()
      "
      has-details
      can-regenerate
    >
      <template #settings>
        <v-number-input
          variant="solo"
          class="mt-2"
          type="number"
          :min="machineIdMinValue"
          :max="machineIdMaxValue"
          :step="1"
          control-variant="stacked"
          v-model="snowflakeIdMachineIdProxy"
          label="Machine ID"
          required
        >
          <template #clear>
            <clear-button
              @click:reset="
                () => (snowflakeIdMachineIdProxy = machineIdMinValue)
              "
            />
          </template>
          <template #details>
            <small class="opacity-50"
              >Machine ID must be a positive integer ({{ machineIdMinValue }} -
              {{ machineIdMaxValue }})</small
            >
          </template>
        </v-number-input>
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { Snowflake } from '@skorotkiewicz/snowflake-id'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import { computed, ref } from 'vue'
import ClearButton from '@/components/ClearButton.vue'
import type { GeneratorProps } from '@generators/generator-props'

defineProps<GeneratorProps>()

const machineIdMinValue = 0
const machineIdMaxValue = 1023

const wasCopied = defineModel<boolean>('wasCopied', {
  required: true,
  default: false,
})

const snowflakeIdMachineId = ref<number | string>(0)
const snowflakeIdMachineIdProxy = computed({
  get() {
    if (snowflakeIdMachineId.value === '') {
      return machineIdMinValue
    }

    return +snowflakeIdMachineId.value
  },
  set(newValue: number | string) {
    if (newValue !== '') {
      let asNumber = +newValue
      if (asNumber < machineIdMinValue) {
        asNumber = machineIdMinValue
      } else if (asNumber > machineIdMaxValue) {
        asNumber = machineIdMaxValue
      }

      snowflakeIdMachineId.value = Math.trunc(asNumber)

      return
    }

    snowflakeIdMachineId.value = machineIdMinValue
  },
})
</script>
