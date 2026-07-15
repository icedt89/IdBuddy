<template>
  <v-btn
    color="on-background"
    :class="iconClass"
    :icon="mdiClose"
    v-tooltip="tooltipText"
    density="compact"
    variant="text"
    size="small"
  />
</template>

<script setup lang="ts">
import { mdiClose } from '@mdi/js'

withDefaults(
  defineProps<{
    tooltipText?: string
    iconClass?: string
  }>(),
  {
    tooltipText: 'Clear',
  }
)
</script>
