<template>
  <v-text-field readonly :model-value="value" hide-details>
    <template #append-inner>
      <copy-button :value="value" />
      <regenerate-button
        v-if="!disableRegenerate"
        class="ml-1"
        @click="$emit('click:regenerate')"
      />
    </template>
  </v-text-field>
</template>

<style lang="scss" scoped>
:deep(.v-field--variant-solo-filled:hover .v-field__overlay),
:deep(.v-field--variant-solo-filled.v-field--focused .v-field__overlay) {
  opacity: 0.04;
}
</style>

<script setup lang="ts">
import CopyButton from '@/components/CopyButton.vue'
import RegenerateButton from '@/components/RegenerateButton.vue'

const props = defineProps<{
  value: string
  disableRegenerate?: boolean
}>()

const emits = defineEmits<{
  (e: 'click:regenerate'): void
}>()
</script>
