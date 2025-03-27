<template>
  <v-tooltip text="Regenerate" open-delay="500">
    <template #activator="{ props }">
      <v-btn size="small" variant="text" v-bind="props" :icon="mdiRefresh" @click="$emit('regenerate')" />
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { mdiRefresh } from "@mdi/js"

defineEmits<{
  (e: "regenerate"): void
}>()
</script>
