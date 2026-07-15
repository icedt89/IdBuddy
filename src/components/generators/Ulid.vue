<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      :value="currentValue"
      @click:regenerate="() => generateValue(true)"
    >
      <template #settings>
        <v-number-input
          :step="1"
          :min="seedTimeMinValue"
          :max="seedTimeMaxValue"
          label="Seed Time"
          v-model="seedTimeProxy"
          hide-details
        >
          <template #append-inner>
            <v-icon
              size="small"
              :icon="mdiInformationOutline"
              v-tooltip="
                `Positive integer (${seedTimeMinValue} -
              ${seedTimeMaxValue})`
              "
            />
          </template>

          <template #clear>
            <clear-btn @click="() => (seedTimeProxy = seedTimeDefault)" />
          </template>
        </v-number-input>
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { mdiInformationOutline } from '@mdi/js'
import { ulid } from 'ulidx'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import { computed, ref } from 'vue'
import ClearBtn from '@/components/ClearBtn.vue'
import type { GeneratorProps } from '@generators/generator-props'
import { useValueGenerator } from '@/helper/generator-helper'
import { useGeneratorSettings } from '@/helper/generator-settings-helper'

const props = defineProps<GeneratorProps>()

const seedTimeMinValue = 0
const seedTimeMaxValue = 281_474_976_710_655
const seedTimeDefault = undefined

const seedTime = ref<number | string>('')
const seedTimeProxy = computed({
  get() {
    if (seedTime.value === '') {
      return seedTimeDefault
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

const settingsObject = computed(() => ({
  seedTime: seedTimeProxy.value,
}))

const { currentValue, generateValue } = useValueGenerator(
  () => ulid(seedTimeProxy.value),
  [settingsObject]
)

useGeneratorSettings(
  props.identifier,
  settingsObject,
  (so) => so.seedTime === seedTimeDefault,
  (gs) => {
    seedTimeProxy.value = gs.seedTime || 0
  }
)
</script>
