<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      :value="currentValue"
      @click:regenerate="() => generateValue(true)"
    >
      <template #settings>
        <v-number-input
          :min="machineIdMinValue"
          :max="machineIdMaxValue"
          :step="1"
          v-model="machineIdProxy"
          label="Machine ID"
          required
          hide-details
        >
          <template #append-inner>
            <v-icon
              size="small"
              :icon="mdiInformationOutline"
              v-tooltip="
                `Positive integer (${machineIdMinValue} -
              ${machineIdMaxValue})`
              "
            />
          </template>

          <template #clear>
            <clear-btn @click="() => (machineIdProxy = machineIdDefault)" />
          </template>
        </v-number-input>
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { mdiInformationOutline } from '@mdi/js'
import { Snowflake } from '@skorotkiewicz/snowflake-id'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import { computed, ref } from 'vue'
import ClearBtn from '@/components/ClearBtn.vue'
import type { GeneratorProps } from '@generators/generator-props'
import { useValueGenerator } from '@/helper/generator-helper'
import { useGeneratorSettings } from '@/helper/generator-settings-helper'

const props = defineProps<GeneratorProps>()

const machineIdMinValue = 0
const machineIdMaxValue = 1_023
const machineIdDefault = 0

const machineId = ref<number | string>(machineIdDefault)
const machineIdProxy = computed({
  get() {
    if (machineId.value === '') {
      return machineIdMinValue
    }

    return +machineId.value
  },
  set(newValue: number | string) {
    if (newValue !== '') {
      let asNumber = +newValue
      if (asNumber < machineIdMinValue) {
        asNumber = machineIdMinValue
      } else if (asNumber > machineIdMaxValue) {
        asNumber = machineIdMaxValue
      }

      machineId.value = Math.trunc(asNumber)

      return
    }

    machineId.value = machineIdMinValue
  },
})

const settingsObject = computed(() => ({
  machineId: machineIdProxy.value,
}))

const { currentValue, generateValue } = useValueGenerator(
  () => new Snowflake(machineIdProxy.value).generate(),
  [settingsObject]
)

useGeneratorSettings(
  props.identifier,
  settingsObject,
  (so) => so.machineId === machineIdDefault,
  (gs) => {
    machineIdProxy.value = gs.machineId || machineIdDefault
  }
)
</script>
