<template>
  <v-expansion-panels>
    <generator-expansion-panel title="UUID v4" v-model:was-copied="wasCopied" :value-generator="() => v4()" />
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { v4 } from "uuid"
import GeneratorExpansionPanel from "@/components/generators/GeneratorExpansionPanel.vue"

const wasCopied = defineModel<boolean>("wasCopied", {
  required: true,
  default: false,
})
</script>
