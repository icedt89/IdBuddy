<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      :value="currentValue"
      @click:regenerate="() => generateValue(true)"
    >
      <template #settings>
        <v-number-input
          :min="lengthMinValue"
          :max="lengthMaxValue"
          v-model="lengthProxy"
          label="Length"
          hide-details
        >
          <template #append-inner>
            <v-icon
              size="small"
              :icon="mdiInformationOutline"
              v-tooltip="
                `Positive integer (1 -
              ${lengthMaxValue})`
              "
            />
          </template>

          <template #clear>
            <clear-btn @click="() => (lengthProxy = lengthDefault)" />
          </template>
        </v-number-input>
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { mdiInformationOutline } from '@mdi/js'
import { nanoid } from 'nanoid'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import { computed, ref } from 'vue'
import ClearBtn from '@/components/ClearBtn.vue'
import type { GeneratorProps } from '@generators/generator-props'
import { useValueGenerator } from '@/helper/generator-helper'
import { useGeneratorSettings } from '@/helper/generator-settings-helper'

const props = defineProps<GeneratorProps>()

const lengthMinValue = 1
const lengthMaxValue = 65_536
const lengthDefault = 21

const length = ref<number | string>(lengthDefault)
const lengthProxy = computed({
  get() {
    if (length.value === '') {
      return lengthDefault
    }

    return +length.value
  },
  set(newValue: number | string) {
    if (newValue === null || newValue === undefined) {
      newValue = lengthDefault
    }

    if (newValue !== '') {
      let asNumber = +newValue
      if (asNumber < lengthMinValue) {
        asNumber = lengthMinValue
      } else if (asNumber > lengthMaxValue) {
        asNumber = lengthMaxValue
      }

      length.value = Math.trunc(asNumber)

      return
    }

    length.value = newValue
  },
})

const settingsObject = computed(() => ({
  length: lengthProxy.value,
}))

const { currentValue, generateValue } = useValueGenerator(
  () => nanoid(lengthProxy.value),
  [settingsObject]
)

useGeneratorSettings(
  props.identifier,
  settingsObject,
  (so) => so.length === lengthDefault,
  (gs) => {
    lengthProxy.value = gs.length || lengthDefault
  }
)
</script>
