<template>
  <v-radio-group label="Casing" v-model="model" inline hide-details>
    <v-radio label="Lower" value="lower" />
    <v-radio label="Upper" value="upper" />
  </v-radio-group>
</template>

<script setup lang="ts">
import type { Casing } from '@/helper/uuid-helper'

const model = defineModel<Casing>({
  required: true,
})
</script>
