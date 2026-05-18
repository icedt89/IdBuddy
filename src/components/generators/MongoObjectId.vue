<template>
  <v-expansion-panels>
    <generator-expansion-panel
      :title="title"
      :value="currentValue"
      @click:regenerate="() => generateValue(true)"
    >
      <template #settings>
        <v-switch
          class="ml-1"
          style="margin-top: -10px"
          label="Format as Base64 instead of Hex"
          v-model="useBase64"
        />
      </template>
    </generator-expansion-panel>
  </v-expansion-panels>
</template>

<script setup lang="ts">
import { ObjectId } from 'bson'
import GeneratorExpansionPanel from '@/components/GeneratorExpansionPanel.vue'
import type { GeneratorProps } from '@generators/generator-props'
import { ref } from 'vue'
import { useValueGenerator } from '@/helper/generator-helper'

defineProps<GeneratorProps>()

const useBase64 = ref<boolean>(false)

const { currentValue, generateValue } = useValueGenerator(
  () => new ObjectId().toString(useBase64.value ? 'base64' : 'hex'),
  [useBase64]
)
</script>
