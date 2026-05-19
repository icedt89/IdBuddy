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
          label="Format as Base64"
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
import { computed, ref } from 'vue'
import { useValueGenerator } from '@/helper/generator-helper'
import { useGeneratorSettings } from '@/helper/generator-settings-helper'

const props = defineProps<GeneratorProps>()

const useBase64Default = false

const useBase64 = ref<boolean>(useBase64Default)

const settingsObject = computed(() => ({
  useBase64: useBase64.value,
}))

const { currentValue, generateValue } = useValueGenerator(
  () => new ObjectId().toString(useBase64.value ? 'base64' : 'hex'),
  [settingsObject]
)

useGeneratorSettings(
  props.identifier,
  settingsObject,
  (so) => so.useBase64 === useBase64Default,
  (gs) => {
    useBase64.value = gs.useBase64 || useBase64Default
  }
)
</script>
