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
        <v-card>
          <v-card-text>
            <v-row>
              <v-col>
                <uuid-function-selector
                  v-model="uuidFunction"
                  :allowed-functions="allowedFunctions"
                />
              </v-col>
              <v-col>
                <casing-selector v-model="casing" />
              </v-col>
            </v-row>

            <uuid-format-selector v-model="format" />
          </v-card-text>
        </v-card>
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

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
  type UuidFunction,
} from '@/helper/uuid-helper'
import UuidFunctionSelector from '@/components/UuidFunctionSelector.vue'

interface Props extends GeneratorProps {
  allowedFunctions: UuidFunction[]
  defaultFunction: UuidFunction
  disableHistory?: boolean
  disableRegenerate?: boolean
}

const props = defineProps<Props>()

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
