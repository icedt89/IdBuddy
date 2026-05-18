<template>
  <v-tooltip :text="tooltipText">
    <template #activator="{ props }">
      <dense-icon-button
        color="on-background"
        :class="iconClass"
        v-bind="props"
        :icon="mdiClose"
        @click="$emit('click')"
      />
    </template>
  </v-tooltip>
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

defineEmits<{
  (e: 'click'): void
}>()
</script>
