<template>
  <v-dialog max-width="600">
    <template #default="{ isActive }">
      <v-card title="About ID Buddy">
        <v-card-text class="pb-0">
          <div class="mb-3">
            ID Buddy lets you generate various identifiers primarily used by
            database engines.
          </div>

          <v-expansion-panels v-model="expanded">
            <release-notes-item
              is-current
              version="v0.6.0"
              :new-features="['Custom theme (Github like)']"
            />
            <release-notes-item
              version="v0.5.5"
              :new-features="['Minor UI changes']"
            />
            <release-notes-item
              version="v0.5.4"
              :new-features="['Added dialog for resetting the App to defaults']"
            />
            <release-notes-item
              version="v0.5.3"
              :new-features="[
                'Made history size configurable',
                'Made visible generators configurable',
                'Updated number input component',
                'Added \'UUID Max\'',
                'Renamed \'UUID Empty\' to \'UUID Nil\'',
              ]"
            />
            <release-notes-item
              version="v0.5.1 - v0.5.2"
              :miscellaneous="[defaultDependenciesUpdatedMessage]"
            />
            <release-notes-item
              version="v0.5.0"
              :new-features="[
                'Added locale setting to \'Current timestamp\'-generator',
                'Improved responsiveness for small devices',
              ]"
            />
            <release-notes-item
              version="v0.4.2"
              :new-features="['Added info section to some generators']"
            />
            <release-notes-item
              version="v0.4.0"
              :new-features="[
                'Added \'Nano ID\'-generator',
                'Added \'Snowflake ID\'-generator',
                'Added \'Current timestamp\'-generator',
              ]"
            />
            <release-notes-item
              version="v0.2.0"
              :new-features="[
                'Added \'ULID\'-generator',
                'Added \'XID\'-generator',
              ]"
            />
            <release-notes-item
              version="v0.1.0"
              :new-features="[
                'Added \'UUID Empty\'',
                'Added \'UUID v4\'-generator',
                'Added \'UUID v7\'-generator',
              ]"
              :miscellaneous="['Initial release']"
            />
          </v-expansion-panels>

          <div class="mt-3 text-center opacity-50">
            Made with <span class="heart-red">❤</span> by
            <a href="https://jan-hafner.de" target="_blank">Jan Hafner</a>
          </div>
        </v-card-text>
        <v-card-actions>
          <close-dialog-button @click="isActive.value = false" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import ReleaseNotesItem from '@/components/ReleaseNotesItem.vue'
import { ref } from 'vue'

const defaultDependenciesUpdatedMessage = 'Updated dependencies'

const expanded = ref<number | null>(0)
</script>
