<template>
  <v-tooltip :text="tooltipText">
    <template #activator="{ props }">
      <dense-icon-button
        color="on-background"
        :class="class"
        v-bind="props"
        :icon="mdiClose"
        @click="$emit('click:reset')"
      />
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { mdiClose } from '@mdi/js'

withDefaults(
  defineProps<{
    tooltipText?: string
    class?: string
  }>(),
  {
    tooltipText: 'Reset',
  }
)

defineEmits<{
  (e: 'click:reset'): void
}>()
</script>
