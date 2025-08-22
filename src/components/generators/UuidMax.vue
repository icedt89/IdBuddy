<template>
  <v-expansion-panels hide-actions readonly>
    <generator-expansion-panel
      :title="title"
      :value-generator="() => MAX"
      :has-details="false"
      :can-regenerate="false"
    />
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { MAX } from 'uuid'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import type { GeneratorProps } from '@generators/generator-props'

defineProps<GeneratorProps>()
</script>
