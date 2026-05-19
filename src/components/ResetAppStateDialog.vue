<template>
  <v-dialog max-width="400" :fullscreen="xs">
    <template #default="{ isActive }">
      <v-card title="Reset App">
        <v-card-text class="pb-0">
          <div class="mb-3">This will reset the App to their defaults.</div>

          <v-row>
            <v-col>
              <v-checkbox label="Settings" v-model="shouldResetSettingsStore" />
            </v-col>
            <v-col>
              <v-checkbox
                label="Generator settings"
                v-model="shouldResetGeneratorSettingsStore"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <close-dialog-button
            text="Reset"
            :disabled="!shouldResetAny"
            @click="resetAppState(isActive)"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { useGeneratorSettingsStore } from '@/stores/generator-settings-store'
import { useSettingsStore } from '@/stores/settings-store'
import { computed, ref, type Ref } from 'vue'
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

const shouldResetSettingsStore = ref(true)
const { reset: resetSettingsStore } = useSettingsStore()

const shouldResetGeneratorSettingsStore = ref(true)
const { reset: resetGeneratorSettingsStore } = useGeneratorSettingsStore()

const shouldResetAny = computed(
  () =>
    shouldResetSettingsStore.value || shouldResetGeneratorSettingsStore.value
)

function resetAppState(isActive: Ref<boolean>) {
  if (shouldResetSettingsStore.value) {
    resetSettingsStore()
  }

  if (shouldResetGeneratorSettingsStore.value) {
    resetGeneratorSettingsStore()
  }

  isActive.value = false
}
</script>
