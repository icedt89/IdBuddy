<template>
  <v-dialog max-width="700">
    <template #default="{ isActive }">
      <v-card title="About ID Buddy">
        <v-card-text>
          <v-expansion-panels v-model="expanded" multiple>
            <release-notes-item
              is-current
              version="v0.4.2"
              :new-features="['Added info section to some generators']"
              :miscellaneous="[defaultDependenciesUpdatedMessage]" />
            <release-notes-item
              version="v0.4.0"
              :new-features="['Added Nano ID', 'Added Snowflake ID', 'Added Timestamp']"
              :miscellaneous="[defaultDependenciesUpdatedMessage]" />
            <release-notes-item
              version="v0.3.0"
              :new-features="['Added ULID', 'Added XID']"
              :miscellaneous="[defaultDependenciesUpdatedMessage]" />
            <release-notes-item
              version="v0.2.0"
              :new-features="['Added UUID Empty', 'Added UUID v4', 'Added UUID v7']"
              :miscellaneous="[defaultDependenciesUpdatedMessage]" />
            <release-notes-item version="v0.1.0" :miscellaneous="['Initial release']" />
          </v-expansion-panels>
        </v-card-text>
        <v-card-actions>
          <v-btn class="ml-auto" text="Close" variant="tonal" rounded="xs" color="info" @click="isActive.value = false" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import ReleaseNotesItem from "@/components/ReleaseNotesItem.vue"
import { ref } from "vue"

const defaultDependenciesUpdatedMessage = "Updated dependencies"

const expanded = ref<number | null>(0)
</script>
