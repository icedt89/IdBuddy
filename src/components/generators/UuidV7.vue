<template>
  <v-expansion-panels>
    <generator-expansion-panel title="UUID v7" v-model:was-copied="wasCopied" :value-generator="() => v7()" />
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { v7 } from "uuid"
import GeneratorExpansionPanel from "@/components/generators/GeneratorExpansionPanel.vue"

const wasCopied = defineModel<boolean>("wasCopied", {
  required: true,
  default: false,
})
</script>
