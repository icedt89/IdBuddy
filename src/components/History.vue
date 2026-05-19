<template>
  <v-card :class="{ 'opacity-50': !items.length }">
    <v-card-title class="pb-0">
      <v-row>
        <v-col
          :class="{
            'text-body-large': isHistoryEnabled,
            'font-weight-light': isHistoryEnabled,
            'text-body-medium': !isHistoryEnabled,
            'font-weight-thin': !isHistoryEnabled,
          }"
        >
          History
          <template v-if="!isHistoryEnabled"> is disabled </template>
        </v-col>
        <v-col align="right"
          ><clear-button class="mb-1" v-if="items.length" @click="clearHistory"
        /></v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="pb-2">
      <small v-if="isHistoryEnabled && !items.length" class="font-weight-light">
        <em> Generate something first </em>
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
