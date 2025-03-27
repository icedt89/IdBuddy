<template>
  <v-expansion-panels>
    <generator-expansion-panel title="Nano ID" v-model:was-copied="wasCopied" :value-generator="() => nanoid(nanoIdSizeProxy)">
      <template #settings>
        <v-text-field
          variant="solo"
          class="mt-2"
          type="number"
          :min="nanoIdMinValue"
          :max="nanoIdMaxValue"
          v-model.number="nanoIdSizeProxy"
          hide-details
          label="Length"
          density="compact">
          <template #clear>
            <clear-button @click:reset="() => (nanoIdSizeProxy = undefined)" />
          </template>
        </v-text-field>
      </template>
      <template #info>
        <v-card-text class="pt-0">
          <small>Length must be a positive integer (1 - {{ nanoIdMaxValue }})</small>
        </v-card-text>
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { nanoid } from "nanoid"
import GeneratorExpansionPanel from "@/components/generators/GeneratorExpansionPanel.vue"
import { computed, ref } from "vue"
import ClearButton from "@/components/ClearButton.vue"

const nanoIdMinValue = 1
const nanoIdMaxValue = 65536

const wasCopied = defineModel<boolean>("wasCopied", {
  required: true,
  default: false,
})

const nanoIdSize = ref<number | string>("")
const nanoIdSizeProxy = computed({
  get() {
    if (nanoIdSize.value === "") {
      return undefined
    }

    return +nanoIdSize.value
  },
  set(newValue: number | string) {
    if (newValue === null || newValue === undefined) {
      newValue = ""
    }

    if (newValue !== "") {
      let asNumber = +newValue
      if (asNumber < nanoIdMinValue) {
        asNumber = nanoIdMinValue
      } else if (asNumber > nanoIdMaxValue) {
        asNumber = nanoIdMaxValue
      }

      nanoIdSize.value = Math.trunc(asNumber)

      return
    }

    nanoIdSize.value = newValue
  },
})
</script>
