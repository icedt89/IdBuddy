<template>
  <v-btn
    v-if="isSupported"
    v-tooltip="'Copy to clipboard'"
    :icon="icon"
    @click="copyValue"
    color="primary"
    density="compact"
    variant="text"
    size="small"
  />
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { mdiContentCopy, mdiCheck } from '@mdi/js'
import { refAutoReset } from '@vueuse/core'

const props = defineProps<{
  value: string
}>()

const icon = refAutoReset(mdiContentCopy, 1_500)

const { isSupported, copy } = useClipboard()

function copyValue() {
  if (!isSupported.value) {
    return
  }

  copy(props.value)

  icon.value = mdiCheck
}
</script>
