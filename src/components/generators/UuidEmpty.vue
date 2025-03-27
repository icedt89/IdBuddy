<template>
  <!-- <v-card title="UUID Empty">
    <v-card-text>
      <generator-input v-model:was-copied="wasCopied" :value-generator="NIL" />
    </v-card-text>
  </v-card> -->

  <v-expansion-panels hide-actions readonly>
    <generator-expansion-panel title="UUID Empty" v-model:was-copied="wasCopied" :value-generator="NIL" />
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { NIL } from "uuid"
import GeneratorExpansionPanel from "@/components/generators/GeneratorExpansionPanel.vue"

const wasCopied = defineModel<boolean>("wasCopied", {
  required: true,
  default: false,
})
</script>
