<template>
  <v-card :class="{ 'opacity-50': !items.length }">
    <v-card-title class="pb-0">
      <v-row>
        <v-col
          cols="auto"
          align-self="center"
          class="text-body-1 font-weight-light"
          >History</v-col
        >
        <v-col align="right" align-self="center"
          ><clear-button
            class="mb-1"
            v-if="items.length"
            tooltip-text="Clear history"
            @click:reset="clearHistory"
        /></v-col>
      </v-row>
    </v-card-title>
    <v-card-text :class="{ 'pb-2': !items.length }">
      <small>
        <em>
          <template v-if="!isHistoryEnabled"> History is disabled </template>
          <template v-else-if="!items.length">
            Generate something first
          </template>
        </em>
      </small>
      <template v-if="!!items.length">
        <v-row v-for="item in items" :key="item" no-gutters>
          <v-col>
            <history-item :model-value="item">
              <template #append-inner>
                <copy-button :value="item" />
              </template>
            </history-item>
          </v-col>
        </v-row>
      </template>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
:deep(.v-text-field input) {
  font-size: 14px;
}
</style>

<script setup lang="ts">
import CopyButton from '@/components/CopyButton.vue'
import ClearButton from '@/components/ClearButton.vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/stores/settings-store'

const { isHistoryEnabled } = storeToRefs(useSettingsStore())

const props = defineProps<{
  items: string[]
}>()

function clearHistory() {
  props.items.splice(0)
}
</script>
