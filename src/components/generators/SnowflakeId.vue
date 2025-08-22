<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      :value-generator="
        () => new Snowflake(snowflakeIdMachineIdProxy).generate()
      "
      has-details
      can-regenerate
    >
      <template #settings>
        <v-number-input
          :min="machineIdMinValue"
          :max="machineIdMaxValue"
          :step="1"
          v-model="snowflakeIdMachineIdProxy"
          label="Machine ID"
          required
          :hint="`Must be a positive integer (${machineIdMinValue} -
              ${machineIdMaxValue})`"
          persistent-hint
        >
          <template #clear>
            <clear-button
              @click:reset="
                () => (snowflakeIdMachineIdProxy = machineIdMinValue)
              "
            />
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
