<template>
  <uuid-base
    v-bind="$props"
    :allowed-functions="['v7', 'v4']"
    default-function="v7"
  />
</template>

<script setup lang="ts">
import { type GeneratorProps } from '@generators/generator-props'

defineProps<GeneratorProps>()
</script>
