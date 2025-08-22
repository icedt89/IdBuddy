<template>
  <v-dialog max-width="500">
    <template #default="{ isActive }">
      <v-card title="Settings">
        <v-card-text class="pb-0">
          <v-number-input
            v-model="historySizeProxy"
            required
            label="History size"
            :min="historySizeMinValue"
            hint="Size of the history before items get overwritten"
            :messages="historySizeMessage"
          />

          <v-card>
            <v-card-title class="pb-0 text-body-1 font-weight-light">
              Generators
            </v-card-title>
            <v-card-text class="pb-0">
              <v-row no-gutters>
                <v-col
                  v-for="generator in generatorsList"
                  :key="generator.identifier"
                  cols="12"
                  sm="6"
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
          <close-dialog-button @click="isActive.value = false" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { historySizeMinValue, useSettingsStore } from '@/stores/settings-store'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { generatorsList } from '@generators/generators'

const settingsStore = useSettingsStore()
const { historySize, isHistoryEnabled } = storeToRefs(settingsStore)
const { isGeneratorVisible, setGeneratorVisibility } = settingsStore

const historySizeMessage = computed(() =>
  !isHistoryEnabled.value ? 'History is disabled' : undefined
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
</script>
