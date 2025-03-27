<template>
  <v-expansion-panel>
    <v-expansion-panel-title class="pl-4">
      {{ title }}
    </v-expansion-panel-title>
    <v-container>
      <generator-input v-model:was-copied="wasCopied" @generated="(v) => addToHistory(v)" :value-generator="valueGenerator" />
    </v-container>
    <v-expansion-panel-text v-if="isFunction(valueGenerator)" class="mt-1">
      <v-divider class="mb-4" />
      <v-card class="mb-1" density="compact" v-if="$slots['settings']">
        <v-card-text class="pb-0">Settings</v-card-text>
        <slot name="settings" />
      </v-card>
      <history
        class="mb-1"
        :class="{ 'opacity-20': !history.items.length }"
        :items="history.items"
        v-model:was-copied="wasCopied"
        density="compact" />
      <v-card density="compact" v-if="$slots['info']" class="opacity-20">
        <v-card-text class="pb-0">Info</v-card-text>
        <slot name="info" />
      </v-card>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { LimitedSizeList } from "@/helper/limited-size-list"
import History from "@/components/History.vue"
import GeneratorInput from "@/components/generators/GeneratorInput.vue"
import { isFunction } from "@/helper/common-helper"

defineProps<{
  title: string
  valueGenerator: (() => string) | string | Promise<string>
}>()

const wasCopied = defineModel<boolean>("wasCopied", {
  required: true,
  default: false,
})

const history = ref<LimitedSizeList<string>>(new LimitedSizeList<string>())

function addToHistory(item: string) {
  if (history.value.includes(item)) {
    return
  }

  history.value.unshift(item)
}
</script>
