<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      {{ title }}
    </v-expansion-panel-title>
    <v-container>
      <generator-input
        :can-regenerate="canRegenerate"
        @generated="(v) => addToHistory(v)"
        :value-generator="valueGenerator"
      />
    </v-container>
    <v-expansion-panel-text v-if="hasDetails">
      <history :items="history.items" />
      <template v-if="$slots['settings']">
        <v-divider class="my-4" />
        <slot name="settings" />
      </template>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { LimitedSizeList } from '@/helper/limited-size-list'
import History from '@/components/History.vue'
import GeneratorInput from '@/components/GeneratorInput.vue'
import { useSettingsStore } from '@/stores/settings-store'
import { storeToRefs } from 'pinia'

const { historySize } = storeToRefs(useSettingsStore())

defineProps<{
  title: string
  valueGenerator: () => string | Promise<string>
  hasDetails: boolean
  canRegenerate: boolean
}>()

const history = ref<LimitedSizeList<string>>(
  new LimitedSizeList<string>(historySize.value)
)
watch(historySize, (v) => history.value.resize(v))

function addToHistory(item: string) {
  if (history.value.includes(item)) {
    return
  }

  history.value.unshift(item)
}
</script>
