<template>
  <v-card>
    <v-card-text>
      <div class="d-flex">
        <div class="me-auto">History</div>
        <clear-button v-if="items.length" tooltip-text="Clear history" @click:reset="clearHistory" />
      </div>
      <div v-if="!items.length">
        <small>
          <em>Generate something first</em>
        </small>
      </div>
      <template v-else>
        <v-text-field readonly hide-details density="compact" variant="plain" :model-value="item" v-for="item in items" :key="item">
          <template #append-inner>
            <copy-button v-model:was-copied="wasCopied" :value="item" />
          </template>
        </v-text-field>
      </template>
    </v-card-text>
  </v-card>
</template>

<style type="scss" scoped>
:deep(.v-field__append-inner) {
  padding-top: 0 !important;
}
</style>

<script setup lang="ts">
import CopyButton from "@/components/CopyButton.vue"
import ClearButton from "@/components/ClearButton.vue"

const props = defineProps<{
  items: string[]
}>()

const wasCopied = defineModel<boolean>("wasCopied", {
  required: true,
  default: false,
})

function clearHistory() {
  props.items.splice(0)
}
</script>
