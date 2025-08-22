<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      :value-generator="() => v7()"
      has-details
      can-regenerate
    />
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { v7 } from 'uuid'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import type { GeneratorProps } from '@generators/generator-props'

defineProps<GeneratorProps>()
</script>
