<template>
  <v-expansion-panels>
    <generator-expansion-panel
      title="Snowflake ID"
      v-model:was-copied="wasCopied"
      :value-generator="() => new Snowflake(snowflakeIdMachineIdProxy).generate()">
      <template #settings>
        <v-text-field
          variant="solo"
          class="mt-2"
          type="number"
          :min="machineIdMinValue"
          :max="machineIdMaxValue"
          step="1"
          v-model.number="snowflakeIdMachineIdProxy"
          hide-details
          label="Machine ID*"
          required
          density="compact">
          <template #clear>
            <clear-button @click:reset="() => (snowflakeIdMachineIdProxy = machineIdMinValue)" />
          </template>
        </v-text-field>
      </template>
      <template #info>
        <v-card-text class="pt-0">
          <small>Machine ID must be a positive integer ({{ machineIdMinValue }} - {{ machineIdMaxValue }})</small>
        </v-card-text>
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { Snowflake } from "@skorotkiewicz/snowflake-id"
import GeneratorExpansionPanel from "@/components/generators/GeneratorExpansionPanel.vue"
import { computed, ref } from "vue"
import ClearButton from "@/components/ClearButton.vue"

const machineIdMinValue = 0
const machineIdMaxValue = 1023

const wasCopied = defineModel<boolean>("wasCopied", {
  required: true,
  default: false,
})

const snowflakeIdMachineId = ref<number | string>(0)
const snowflakeIdMachineIdProxy = computed({
  get() {
    if (snowflakeIdMachineId.value === "") {
      return machineIdMinValue
    }

    return +snowflakeIdMachineId.value
  },
  set(newValue: number | string) {
    if (newValue !== "") {
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
