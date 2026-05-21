<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      :value="currentValue"
      :disable-history="disableHistory"
      :disable-regenerate="disableRegenerate"
      @click:regenerate="() => generateValue(true)"
    >
      <template #settings>
        <v-row>
          <v-col>
            <v-radio-group
              label="Function"
              v-model="uuidFunction"
              inline
              hide-details
            >
              <v-radio label="v7" value="v7" v-if="isFunctionAllowed('v7')" />
              <v-radio
                label="NIL"
                value="NIL"
                v-if="isFunctionAllowed('NIL')"
              />
              <v-radio label="v4" value="v4" v-if="isFunctionAllowed('v4')" />
              <v-radio
                label="MAX"
                value="MAX"
                v-if="isFunctionAllowed('MAX')"
              />
            </v-radio-group>
          </v-col>
          <v-col>
            <casing-selector v-model="casing" />
          </v-col>
        </v-row>

        <uuid-format-selector v-model="format" />
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<style lang="scss" scoped>
:deep(.v-label) {
  margin-inline-start: 0;
}

:deep(
  .v-radio-group > .v-input__control > .v-label + .v-selection-control-group
) {
  margin-top: 0;
  padding-inline-start: 0;
}
</style>

<script setup lang="ts">
import { v4, v7, NIL, MAX } from 'uuid'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import type { GeneratorProps } from '@generators/generator-props'
import { computed, ref } from 'vue'
import { useValueGenerator } from '@/helper/generator-helper'
import { useGeneratorSettings } from '@/helper/generator-settings-helper'
import {
  applyCasing,
  formatUuid,
  type Casing,
  type UuidFormat,
} from '@/helper/uuid-helper'

type UuidFunction = 'v4' | 'v7' | 'NIL' | 'MAX'

interface Props extends GeneratorProps {
  allowedFunctions: UuidFunction[]
  defaultFunction: UuidFunction
  disableHistory?: boolean
  disableRegenerate?: boolean
}

const props = defineProps<Props>()

const allowedFunctions = computed(
  () => new Set<UuidFunction>(props.allowedFunctions)
)

const casingDefault: Casing = 'lower'
const formatDefault: UuidFormat = 'D'

const casing = ref<Casing>(casingDefault)
const format = ref<UuidFormat>(formatDefault)
const uuidFunction = ref<UuidFunction>(props.defaultFunction)

const settingsObject = computed(() => ({
  format: format.value,
  uuidFunction: uuidFunction.value,
  casing: casing.value,
}))

function isFunctionAllowed(uuidFunction: UuidFunction) {
  return allowedFunctions.value.has(uuidFunction)
}

function generateUuid() {
  switch (uuidFunction.value) {
    case 'NIL':
      return NIL
    case 'MAX':
      return MAX
    case 'v4':
      return v4()
    case 'v7':
    default:
      return v7()
  }
}

const { currentValue, generateValue } = useValueGenerator(
  () => formatUuid(applyCasing(generateUuid(), casing.value), format.value),
  [settingsObject],
  props.disableRegenerate
)

useGeneratorSettings(
  props.identifier,
  settingsObject,
  (so) =>
    so.format === formatDefault &&
    so.uuidFunction === props.defaultFunction &&
    so.casing === casingDefault,
  (gs) => {
    format.value = gs.format || formatDefault
    uuidFunction.value = gs.uuidFunction || props.defaultFunction
    casing.value = gs.casing || casingDefault
  }
)
</script>
