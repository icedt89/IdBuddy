<template>
  <v-expansion-panels>
    <generator-expansion-panel title="Current timestamp" v-model:was-copied="wasCopied" :value-generator="() => generate()">
      <template #settings>
        <v-text-field
          variant="solo"
          class="mt-2"
          v-model.trim="formatProxy"
          label="Date-fns format (required)"
          density="compact"
          hide-details>
          <template #clear>
            <clear-button @click:reset="() => (formatProxy = 't')" />
          </template>
        </v-text-field>
      </template>
      <template #info>
        <v-card-text class="pt-0">
          <small>
            List of date-fns format identifiers can be found at
            <a href="https://date-fns.org/v4.1.0/docs/format" target="_blank">https://date-fns.org/v4.1.0/docs/format</a>
          </small>
        </v-card-text>
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<style lang="scss" scoped>
a {
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: #90caf9;
    text-decoration: none;
  }

  &:hover {
    color: #42a5f5;
  }
}
</style>

<script setup lang="ts">
import { formatDate } from "date-fns"
import GeneratorExpansionPanel from "@/components/generators/GeneratorExpansionPanel.vue"
import { computed, ref } from "vue"
import ClearButton from "@/components/ClearButton.vue"

const wasCopied = defineModel<boolean>("wasCopied", {
  required: true,
  default: false,
})

const format = ref<string>("t")
const formatProxy = computed({
  get() {
    if (format.value === "") {
      return "t"
    }

    return format.value
  },
  set(newValue: string) {
    if (!newValue) {
      newValue = "t"
    }

    format.value = newValue
  },
})

function generate(): string {
  return formatDate(new Date(), format.value)
}
</script>
