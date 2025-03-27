<template>
  <v-snackbar timeout="2000" v-model="show" color="success">Wurde in die Zwischenablage kopiert</v-snackbar>
</template>

<script setup lang="ts">
const show = defineModel<boolean>("show", {
  required: true,
  default: false,
})
</script>
