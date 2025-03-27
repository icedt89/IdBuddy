<template>
  <v-tooltip :text="tooltipText" open-delay="500">
    <template #activator="{ props }">
      <v-btn size="x-small" color="default" variant="text" v-bind="props" :icon="mdiClose" @click="$emit('click:reset')" />
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { mdiClose } from "@mdi/js"

withDefaults(
  defineProps<{
    tooltipText?: string
  }>(),
  {
    tooltipText: "Reset",
  }
)

defineEmits<{
  (e: "click:reset"): void
}>()
</script>
