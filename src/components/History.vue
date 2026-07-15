<template>
  <v-card :class="{ 'opacity-50': !items.length }">
    <v-card-title class="text-body-large font-weight-light">
      <v-row>
        <v-col> History </v-col>
        <v-col class="text-right">
          <clear-btn v-if="items.length" @click="clearHistory" />
          <small v-else>
            <em> Generate something first </em>
          </small>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text v-if="items.length" class="history-item-container">
      <v-text-field
        v-for="item in items"
        :key="item"
        :value="item"
        variant="plain"
        density="compact"
        hide-details
        readonly
      >
        <template #append-inner>
          <copy-btn :value="item" />
        </template>
      </v-text-field>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.history-item-container {
  overflow-y: auto;
  max-height: 176px;

  :deep(.v-text-field .v-field) {
    border: 0 !important;
  }
}
</style>

<script setup lang="ts">
import CopyBtn from '@/components/CopyBtn.vue'
import ClearBtn from '@/components/ClearBtn.vue'

const props = defineProps<{
  items: string[]
}>()

function clearHistory() {
  props.items.splice(0)
}
</script>
