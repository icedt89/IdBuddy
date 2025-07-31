<template>
  <v-tooltip v-if="isSupported" text="Copy to clipboard" open-delay="500">
    <template #activator="{ props }">
      <v-btn
        size="small"
        variant="text"
        v-bind="props"
        :icon="mdiContentCopy"
        @click="copyValue"
      />
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { mdiContentCopy } from '@mdi/js'

const props = defineProps<{
  value: string
}>()

const wasCopied = defineModel<boolean>('wasCopied', {
  required: true,
  default: false,
})

const { isSupported, copy } = useClipboard()

function copyValue() {
  copy(props.value)

  wasCopied.value = true
}
</script>
