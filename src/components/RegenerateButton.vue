<template>
  <v-tooltip text="Regenerate">
    <template #activator="{ props }">
      <dense-icon-button
        :class="class"
        v-bind="props"
        :icon="mdiRefresh"
        @click="$emit('regenerate')"
      />
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { mdiRefresh } from '@mdi/js'

defineProps<{
  class?: string
}>()

defineEmits<{
  (e: 'regenerate'): void
}>()
</script>
