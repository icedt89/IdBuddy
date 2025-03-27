<template>
  <v-expansion-panels>
    <generator-expansion-panel title="ULID" v-model:was-copied="wasCopied" :value-generator="() => ulid(ulidSeedTimeProxy)">
      <template #settings>
        <v-text-field
          variant="solo"
          class="mt-2"
          type="number"
          step="1"
          :min="ulidMinValue"
          :max="ulidMaxValue"
          v-model.number="ulidSeedTimeProxy"
          hide-details
          label="Seed Time (optional)"
          density="compact">
          <template #clear>
            <clear-button @click:reset="() => (ulidSeedTimeProxy = undefined)" />
          </template>
        </v-text-field>
      </template>
      <template #info>
        <v-card-text class="pt-0">
          <small>Seed Time must be a positive integer {{ ulidMinValue }} - {{ ulidMaxValue }})</small>
        </v-card-text>
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { ulid } from "ulidx"
import GeneratorExpansionPanel from "@/components/generators/GeneratorExpansionPanel.vue"
import { computed, ref } from "vue"
import ClearButton from "@/components/ClearButton.vue"

const ulidMinValue = 0
const ulidMaxValue = 281474976710655

const wasCopied = defineModel<boolean>("wasCopied", {
  required: true,
  default: false,
})

const ulidSeedTime = ref<number | string>("")
const ulidSeedTimeProxy = computed({
  get() {
    if (ulidSeedTime.value === "") {
      return undefined
    }

    return +ulidSeedTime.value
  },
  set(newValue: number | string) {
    if (newValue === null || newValue === undefined) {
      newValue = ""
    }

    if (newValue !== "") {
      let asNumber = +newValue
      if (asNumber < ulidMinValue) {
        asNumber = ulidMinValue
      } else if (asNumber > ulidMaxValue) {
        asNumber = ulidMaxValue
      }

      ulidSeedTime.value = Math.trunc(asNumber)

      return
    }

    ulidSeedTime.value = newValue
  },
})
</script>
