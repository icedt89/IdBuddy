<template>
  <uuid-base
    v-bind="$props"
    :allowed-functions="['NIL', 'MAX']"
    default-function="NIL"
    disable-regenerate
  />
</template>

<script setup lang="ts">
import { type GeneratorProps } from '@generators/generator-props'

defineProps<GeneratorProps>()
</script>
