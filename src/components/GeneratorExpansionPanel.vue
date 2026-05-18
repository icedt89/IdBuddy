<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      {{ title }}
    </v-expansion-panel-title>
    <v-container>
      <generator-input
        :disable-regenerate="disableRegenerate"
        @click:regenerate="$emit('click:regenerate')"
        :value="value"
      />
    </v-container>
    <v-expansion-panel-text v-if="!disableHistory || $slots['settings']">
      <history v-if="!disableHistory" :items="history.items" />
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

const props = defineProps<{
  title: string
  value: string
  disableHistory?: boolean
  disableRegenerate?: boolean
}>()

const emits = defineEmits<{
  (e: 'click:regenerate'): void
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

watch(
  () => props.value,
  (_, ov) => {
    if (!ov) {
      return
    }

    addToHistory(ov)
  }
)
</script>
