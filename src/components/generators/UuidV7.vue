<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      :value="currentValue"
      @click:regenerate="() => generateValue(true)"
    />
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { v7 } from 'uuid'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import type { GeneratorProps } from '@generators/generator-props'
import { useValueGenerator } from '@/helper/generator-helper'

defineProps<GeneratorProps>()

const { currentValue, generateValue } = useValueGenerator(v7)
</script>
