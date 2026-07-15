<template>
  <v-btn
    :class="class"
    :icon="mdiRefresh"
    v-tooltip="'Regenerate'"
    color="primary"
    density="compact"
    variant="text"
    size="small"
  />
</template>

<script setup lang="ts">
import { mdiRefresh } from '@mdi/js'

defineProps<{
  class?: string
}>()
</script>
