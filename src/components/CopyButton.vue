<template>
  <v-tooltip v-if="isSupported" text="Copy to clipboard">
    <template #activator="{ props }">
      <dense-icon-button v-bind="props" :icon="icon" @click="copyValue" />
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { mdiContentCopy, mdiCheck } from '@mdi/js'
import { refAutoReset } from '@vueuse/core'

const props = defineProps<{
  value: string
}>()

const icon = refAutoReset(mdiContentCopy, 1500)

const { isSupported, copy } = useClipboard()

function copyValue() {
  copy(props.value)

  icon.value = mdiCheck
}
</script>
