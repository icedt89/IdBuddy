<template>
  <v-card>
    <v-card-text class="pt-0" :class="{ 'opacity-50': !items.length }">
      <div class="d-flex">
        <div class="me-auto">History</div>
        <clear-button
          v-if="items.length"
          tooltip-text="Clear history"
          class="mr-1"
          @click:reset="clearHistory"
        />
      </div>
      <small>
        <template v-if="!isHistoryEnabled">
          <em>History is disabled</em>
        </template>
        <template v-else-if="!items.length">
          <em>Generate something first</em>
        </template>
      </small>
      <template v-if="!!items.length">
        <v-text-field
          readonly
          hide-details
          density="compact"
          variant="plain"
          :model-value="item"
          v-for="item in items"
          :key="item"
        >
          <template #append-inner>
            <copy-button v-model:was-copied="wasCopied" :value="item" />
          </template>
        </v-text-field>
      </template>
    </v-card-text>
  </v-card>
</template>

<style type="scss" scoped>
:deep(.v-field__append-inner) {
  padding-top: 0 !important;
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

const wasCopied = defineModel<boolean>('wasCopied', {
  required: true,
  default: false,
})

function clearHistory() {
  props.items.splice(0)
}
</script>
