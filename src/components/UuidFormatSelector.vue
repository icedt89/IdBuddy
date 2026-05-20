<template>
  <v-radio-group label="Format" v-model="model" inline hide-details>
    <v-radio label="D = ide-nti-fier" value="D" />
    <v-radio label="N = identifier" value="N" />
    <v-radio label="B = {ide-nti-fier}" value="B" />
    <v-radio label="P = (ide-nti-fier)" value="P" />
  </v-radio-group>
</template>

<script setup lang="ts">
import type { UuidFormat } from '@/helper/uuid-helper'

const model = defineModel<UuidFormat>({
  required: true,
})
</script>
