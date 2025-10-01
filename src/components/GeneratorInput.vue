<template>
  <v-text-field readonly :model-value="currentValue" hide-details>
    <template #append-inner>
      <copy-button :value="currentValue" />
      <regenerate-button
        v-if="canRegenerate"
        class="ml-1"
        @click="regenerateValue"
        @regenerate="regenerateValue"
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
import { computed, onMounted, ref, watch } from 'vue'
import CopyButton from '@/components/CopyButton.vue'
import RegenerateButton from '@/components/RegenerateButton.vue'
import { getValue } from '@/helper/common-helper'
import { useSettingsStore } from '@/stores/settings-store'
import { storeToRefs } from 'pinia'
import { useIntervalFn } from '@vueuse/core'

const { autoRegenerateIntervalInSeconds, isAutoRegenerateEnabled } =
  storeToRefs(useSettingsStore())

const props = defineProps<{
  valueGenerator: () => string | Promise<string>
  canRegenerate: boolean
}>()

const emits = defineEmits<{
  (e: 'generated', oldValue: string, newValue: string): void
}>()

const currentValue = ref<string>('')
onMounted(async () => (currentValue.value = await getValueFromGenerator()))

const autoRegenerateIntervalInMilliSeconds = computed(
  () => autoRegenerateIntervalInSeconds.value * 1000
)

const { resume: resumeAutoRegenerate, pause: pauseAutoRegenerate } =
  useIntervalFn(
    async () => await regenerateValue(),
    autoRegenerateIntervalInMilliSeconds,
    {}
  )

watch([isAutoRegenerateEnabled, () => props.canRegenerate], ([iare, cr]) => {
  if (iare && cr) {
    resumeAutoRegenerate()

    return
  }

  pauseAutoRegenerate()
})

async function regenerateValue() {
  const oldValue = currentValue.value

  currentValue.value = await getValueFromGenerator()

  emits('generated', oldValue, currentValue.value)
}

async function getValueFromGenerator() {
  return await getValue(props.valueGenerator)
}
</script>
