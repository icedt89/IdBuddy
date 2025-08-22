<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <app-icon-avatar>
          <v-icon :icon="mdiIdentifier" size="40" />
        </app-icon-avatar>
        ID Buddy
      </v-app-bar-title>
      <template #append>
        <v-menu>
          <template #activator="{ props }">
            <v-btn :icon="mdiDotsVertical" v-bind="props" />
          </template>

          <template #default>
            <app-main-menu>
              <v-list-item :prepend-icon="mdiCog" title="Settings">
                <settings-dialog activator="parent" />
              </v-list-item>
              <v-divider />
              <v-list-item title="Reset App">
                <reset-app-state-dialog activator="parent" />

                <template #prepend>
                  <div style="width: 44px"></div>
                </template>
              </v-list-item>
              <v-divider />
              <v-list-item :prepend-icon="mdiInformationOutline" title="About">
                <about-dialog activator="parent" />
              </v-list-item>
            </app-main-menu>
          </template>
        </v-menu>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-alert
          v-if="areAllGeneratorsHidden"
          border="start"
          type="info"
          variant="tonal"
        >
          All generators are hidden
          <v-btn
            text="Show all"
            class="ml-2"
            size="small"
            variant="tonal"
            @click="unhideAllGenerators()"
          />
        </v-alert>

        <v-row v-if="generatorsList.length">
          <template v-for="generator in generatorsList">
            <v-col
              cols="12"
              sm="6"
              md="4"
              v-if="isGeneratorVisible(generator.identifier)"
            >
              <Component
                :is="generator.component"
                :title="generator.displayName"
              />
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {
  mdiIdentifier,
  mdiDotsVertical,
  mdiInformationOutline,
  mdiCog,
} from '@mdi/js'
import { ref } from 'vue'
import AboutDialog from '@/components/AboutDialog.vue'
import SettingsDialog from '@/components/SettingsDialog.vue'
import { useSettingsStore } from '@/stores/settings-store'
import { generatorsList } from '@generators/generators'
import { storeToRefs } from 'pinia'
import ResetAppStateDialog from '@/components/ResetAppStateDialog.vue'

const settingsStore = useSettingsStore()
const { areAllGeneratorsHidden } = storeToRefs(settingsStore)
const { isGeneratorVisible, unhideAllGenerators } = settingsStore
</script>
