<template>
  <v-text-field readonly :value="value">
    <template #append-inner>
      <copy-btn :value="value" />
      <regenerate-btn
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
import CopyBtn from '@/components/CopyBtn.vue'
import RegenerateBtn from '@/components/RegenerateBtn.vue'

const props = defineProps<{
  value: string
  disableRegenerate?: boolean
}>()

const emits = defineEmits<{
  (e: 'click:regenerate'): void
}>()
</script>
