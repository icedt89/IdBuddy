<template>
  <v-expansion-panels
    :hide-actions="isCryptoUnsupported"
    :disabled="isCryptoUnsupported"
  >
    <generator-expansion-panel
      :title="title"
      :value="currentValue"
      @click:regenerate="() => generateValue(true)"
      :disable-regenerate="isCryptoUnsupported"
      :disable-history="isCryptoUnsupported"
    >
      <template v-if="isCryptoUnsupported" #default>
        <v-alert border="start" type="info" variant="plain">
          Your browser does not support crypto features.
        </v-alert>
      </template>
      <template v-else #settings>
        <v-row density="compact">
          <v-col :cols="12" :lg="6">
            <v-text-field v-model="prefix" label="Prefix" hide-details>
              <template #clear>
                <clear-btn
                  tooltip-text="Reset"
                  @click="() => (prefix = prefixDefault)"
                />
              </template>
            </v-text-field>
          </v-col>
          <v-col :cols="12" :lg="6">
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
          </v-col>
        </v-row>
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { mdiInformationOutline } from '@mdi/js'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import { computed, ref } from 'vue'
import ClearBtn from '@/components/ClearBtn.vue'
import type { GeneratorProps } from '@generators/generator-props'
import { useValueGenerator } from '@/helper/generator-helper'
import { useGeneratorSettings } from '@/helper/generator-settings-helper'

const props = defineProps<GeneratorProps>()

const isCryptoUnsupported = computed(() => !crypto?.getRandomValues)

const prefixDefault = ''

const prefix = ref<string>(prefixDefault)

const lengthMinValue = 1
const lengthMaxValue = 65_536
const lengthDefault = 30

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
  prefix: prefix.value,
  length: lengthProxy.value,
}))

const { currentValue, generateValue } = useValueGenerator(() => {
  const prefixLength = prefix.value.length
  const fullLength = prefixLength + lengthProxy.value

  const randomString = generateRandomString(fullLength, 'hex')

  return `${prefix.value}${randomString}`
}, [settingsObject])

useGeneratorSettings(
  props.identifier,
  settingsObject,
  (so) => so.prefix === prefixDefault && so.length === lengthDefault,
  (gs) => {
    prefix.value = gs.prefix || prefixDefault
    lengthProxy.value = gs.length || lengthDefault
  }
)

function generateRandomString(
  length: number,
  outputFormat: 'base64' | 'hex' = 'base64'
): string {
  switch (outputFormat) {
    case 'base64': {
      // Base64 uses ca. 6 bit per char
      const byteLength = Math.ceil((length * 3) / 4)
      const bytes = getRandomBytes(byteLength)

      let binary = ''
      for (const byte of bytes) {
        binary += String.fromCharCode(byte)
      }

      return btoa(binary)
        .replaceAll('+', '-')
        .replaceAll('/', '_')
        .replaceAll('=', '')
        .slice(0, length)
    }

    default:
    case 'hex': {
      // Hex uses 4 bit per char, 2 chars per byte
      const byteLength = Math.ceil(length / 2)
      const bytes = getRandomBytes(byteLength)

      return [...bytes]
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('')
        .slice(0, length)
    }
  }

  function getRandomBytes(length: number): Uint8Array {
    const bytes = new Uint8Array(length)
    const maxChunkSize = 65_536

    for (let offset = 0; offset < length; offset += maxChunkSize) {
      const chunk = bytes.subarray(offset, offset + maxChunkSize)
      crypto.getRandomValues(chunk)
    }

    return bytes
  }
}
</script>
