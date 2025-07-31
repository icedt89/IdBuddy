<template>
  <v-text-field
    variant="solo-filled"
    readonly
    :model-value="currentValue"
    hide-details
  >
    <template #append-inner>
      <copy-button :value="currentValue" v-model:was-copied="wasCopied" />
      <regenerate-button
        v-if="canRegenerate"
        @click="regenerateValue"
        @regenerate="regenerateValue"
      />
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CopyButton from '@/components/CopyButton.vue'
import RegenerateButton from '@/components/RegenerateButton.vue'
import { getValue } from '@/helper/common-helper'

const props = defineProps<{
  valueGenerator: () => string | Promise<string>
  canRegenerate: boolean
}>()

const wasCopied = defineModel<boolean>('wasCopied', {
  required: true,
  default: false,
})

const emits = defineEmits<{
  (e: 'generated', oldValue: string, newValue: string): void
}>()

const currentValue = ref<string>('')
onMounted(async () => (currentValue.value = await getValueFromGenerator()))

async function regenerateValue() {
  const oldValue = currentValue.value

  currentValue.value = await getValueFromGenerator()

  emits('generated', oldValue, currentValue.value)
}

async function getValueFromGenerator() {
  return await getValue(props.valueGenerator)
}
</script>
