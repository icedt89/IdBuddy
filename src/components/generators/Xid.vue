<template>
  <v-expansion-panels>
    <generator-expansion-panel title="XID" v-model:was-copied="wasCopied" :value-generator="() => new Xid().toString()" />
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { Xid } from "xid-ts"
import GeneratorExpansionPanel from "@/components/generators/GeneratorExpansionPanel.vue"

const wasCopied = defineModel<boolean>("wasCopied", {
  required: true,
  default: false,
})
</script>
