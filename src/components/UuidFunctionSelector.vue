<template>
  <v-radio-group label="Function" v-model="model" inline hide-details>
    <v-radio label="v7" value="v7" v-if="isFunctionAllowed('v7')" />
    <v-radio label="NIL" value="NIL" v-if="isFunctionAllowed('NIL')" />
    <v-radio label="v4" value="v4" v-if="isFunctionAllowed('v4')" />
    <v-radio label="MAX" value="MAX" v-if="isFunctionAllowed('MAX')" />
  </v-radio-group>
</template>

<script setup lang="ts">
import type { UuidFunction } from '@/helper/uuid-helper'
import { computed } from 'vue'

interface Props {
  allowedFunctions: UuidFunction[]
}

const props = defineProps<Props>()

const allowedFunctionsSet = computed(
  () => new Set<UuidFunction>(props.allowedFunctions)
)

const model = defineModel<UuidFunction>({
  required: true,
})

function isFunctionAllowed(uuidFunction: UuidFunction) {
  return allowedFunctionsSet.value.has(uuidFunction)
}
</script>
