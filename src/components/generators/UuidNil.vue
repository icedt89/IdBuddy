<template>
  <v-expansion-panels hide-actions readonly>
    <generator-expansion-panel
      :title="title"
      :value="NIL"
      disable-history
      disable-regenerate
    />
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { NIL } from 'uuid'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import type { GeneratorProps } from '@generators/generator-props'

defineProps<GeneratorProps>()
</script>
