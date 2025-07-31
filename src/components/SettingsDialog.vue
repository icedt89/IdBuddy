<template>
  <v-dialog max-width="500">
    <template #default="{ isActive }">
      <v-card title="Settings">
        <v-card-text>
          <v-number-input
            v-model="historySizeProxy"
            validate-on="eager"
            variant="solo-filled"
            required
            label="History size"
            :min="historySizeMinValue"
            type="number"
            control-variant="stacked"
            hint="Size of the history before items get overwritten"
            :messages="historySizeMessage"
          />

          <v-container fluid class="pt-0">
            <v-row dense>
              <v-col
                v-for="generator in generatorsList"
                :key="generator.identifier"
                cols="12"
                sm="6"
                class="pl-0"
              >
                <v-switch
                  @update:model-value="
                    (v) =>
                      setGeneratorVisibility(generator.identifier, <boolean>v)
                  "
                  :model-value="isGeneratorVisible(generator.identifier)"
                  density="compact"
                  hide-details
                  :label="generator.displayName"
                  color="primary"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="ml-auto"
            text="Close"
            variant="tonal"
            rounded="xs"
            color="info"
            @click="isActive.value = false"
          />
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
