<template>
  <v-dialog :max-width="550" :fullscreen="xs" :capture-focus="false">
    <template #default="{ isActive }">
      <v-card title="Settings">
        <v-card-text>
          <v-row density="compact">
            <v-col>
              <v-number-input
                v-model="historySizeProxy"
                required
                label="History size"
                :min="historySizeMinValue"
                hint="Size of the history before items are overwritten"
                :messages="historySizeMessage"
              />
            </v-col>
            <v-col>
              <v-number-input
                v-model="autoRegenerateIntervalInSecondsProxy"
                required
                label="Auto regenerate interval"
                :min="autoRegenerateIntervalInSecondsMinValue"
                hint="Interval in seconds after which all enabled generators generate a new value"
                :messages="autoRegenerateMessage"
              />
            </v-col>
          </v-row>

          <v-switch
            class="my-2"
            v-model="automaticallyCopyToClipboardAfterManualRegenerate"
            label="Automatically copy to clipboard after manual regenerate"
          />

          <v-card>
            <v-card-title class="text-body-large font-weight-light">
              Generators
            </v-card-title>
            <v-card-text>
              <v-row no-gutters>
                <v-col
                  v-for="generator in generators"
                  :key="generator.identifier"
                  :cols="12"
                  :sm="6"
                >
                  <v-switch
                    @update:model-value="
                      (v) =>
                        setGeneratorVisibility(generator.identifier, <boolean>v)
                    "
                    :model-value="isGeneratorVisible(generator.identifier)"
                    :label="generator.displayName"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="isActive.value = false" text="Close" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import {
  historySizeMinValue,
  autoRegenerateIntervalInSecondsMinValue,
  useSettingsStore,
} from '@/stores/settings-store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { generators } from '@generators/generators'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const settingsStore = useSettingsStore()
const {
  historySize,
  isHistoryEnabled,
  autoRegenerateIntervalInSeconds,
  isAutoRegenerateEnabled,
  automaticallyCopyToClipboardAfterManualRegenerate,
} = storeToRefs(settingsStore)
const { isGeneratorVisible, setGeneratorVisibility } = settingsStore

const historySizeMessage = computed(() =>
  !isHistoryEnabled.value ? 'History is disabled' : undefined
)

const autoRegenerateMessage = computed(() =>
  !isAutoRegenerateEnabled.value ? 'Auto regenerate is disabled' : undefined
)

const historySizeProxy = computed({
  get() {
    return historySize.value
  },
  set(newValue: number | string) {
    if (newValue !== '') {
      let asNumber = +newValue
      if (asNumber < historySizeMinValue) {
        asNumber = historySizeMinValue
      }

      historySize.value = Math.trunc(asNumber)

      return
    }

    historySize.value = historySizeMinValue
  },
})

const autoRegenerateIntervalInSecondsProxy = computed({
  get() {
    return autoRegenerateIntervalInSeconds.value
  },
  set(newValue: number | string) {
    if (newValue !== '') {
      let asNumber = +newValue
      if (asNumber < autoRegenerateIntervalInSecondsMinValue) {
        asNumber = autoRegenerateIntervalInSecondsMinValue
      }

      autoRegenerateIntervalInSeconds.value = Math.trunc(asNumber)

      return
    }

    autoRegenerateIntervalInSeconds.value =
      autoRegenerateIntervalInSecondsMinValue
  },
})
</script>
