<template>
  <v-dialog max-width="700">
    <template #default="{ isActive }">
      <v-card title="About ID Buddy">
        <v-card-text>
          <v-expansion-panels v-model="expanded" multiple>
            <release-notes-item
              is-current
              version="v0.5.0"
              :new-features="['Added locale setting to \'Current timestamp\'-generator', 'Improved responsiveness for small devices']"
              :miscellaneous="[defaultDependenciesUpdatedMessage]" />
            <release-notes-item
              version="v0.4.2"
              :new-features="['Added info section to some generators']"
              :miscellaneous="[defaultDependenciesUpdatedMessage]" />
            <release-notes-item
              version="v0.4.0"
              :new-features="['Added \'Nano ID\'-generator', 'Added \'Snowflake ID\'-generator', 'Added \'Current timestamp\'-generator']"
              :miscellaneous="[defaultDependenciesUpdatedMessage]" />
            <release-notes-item
              version="v0.2.0"
              :new-features="['Added \'ULID\'-generator', 'Added \'XID\'-generator']"
              :miscellaneous="[defaultDependenciesUpdatedMessage]" />
            <release-notes-item
              version="v0.1.0"
              :new-features="['Added \'UUID Empty\'', 'Added \'UUID v4\'-generator', 'Added \'UUID v7\'-generator']"
              :miscellaneous="[defaultDependenciesUpdatedMessage, 'Initial release']" />
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
