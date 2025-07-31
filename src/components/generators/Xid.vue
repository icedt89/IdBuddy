<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      v-model:was-copied="wasCopied"
      :value-generator="() => new Xid().toString()"
      has-details
      can-regenerate
    />
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { Xid } from 'xid-ts'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import type { GeneratorProps } from '@generators/generator-props'

defineProps<GeneratorProps>()

const wasCopied = defineModel<boolean>('wasCopied', {
  required: true,
  default: false,
})
</script>
