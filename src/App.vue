<template>
  <reset-app-state-dialog v-model="isResetAppStateDialogOpen" />
  <settings-dialog v-model="isSettingsDialogOpen" />
  <about-dialog v-model="isAboutDialogOpen" />

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
              <v-list-item
                :prepend-icon="mdiCog"
                title="Settings"
                @click="isSettingsDialogOpen = true"
              />
              <switch-theme-list-item />
              <v-divider />
              <v-list-item
                title="Reset App"
                @click="isResetAppStateDialogOpen = true"
              >
                <template #prepend>
                  <!-- Reserve space for item without icon -->
                  <div style="width: 44px"></div>
                </template>
              </v-list-item>
              <v-divider />
              <v-list-item
                :prepend-icon="mdiInformationOutline"
                title="About"
                @click="isAboutDialogOpen = true"
              />
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

        <v-row v-if="visibleGenerators.length">
          <template v-for="(generator, generatorIndex) in visibleGenerators">
            <v-col
              cols="12"
              :sm="computeSmColumnsCount(generatorIndex)"
              :md="computeMdColumnsCount(generatorIndex)"
            >
              <Component
                :is="generator.component"
                :title="generator.displayName"
                :identifier="generator.identifier"
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
import AboutDialog from '@/components/AboutDialog.vue'
import SettingsDialog from '@/components/SettingsDialog.vue'
import { useSettingsStore } from '@/stores/settings-store'
import { storeToRefs } from 'pinia'
import ResetAppStateDialog from '@/components/ResetAppStateDialog.vue'
import SwitchThemeListItem from '@/components/SwitchThemeListItem.vue'
import { ref } from 'vue'

const settingsStore = useSettingsStore()
const { areAllGeneratorsHidden, visibleGenerators } = storeToRefs(settingsStore)
const { unhideAllGenerators } = settingsStore

const isResetAppStateDialogOpen = ref(false)
const isSettingsDialogOpen = ref(false)
const isAboutDialogOpen = ref(false)

function computeSmColumnsCount(generatorIndex: number) {
  const visibleGeneratorsLength = visibleGenerators.value.length
  const rest = visibleGeneratorsLength % 2
  if (rest === 1 && generatorIndex === visibleGeneratorsLength - 1) {
    return 12
  }

  return 6
}

function computeMdColumnsCount(generatorIndex: number) {
  const visibleGeneratorsLength = visibleGenerators.value.length
  const rest = visibleGeneratorsLength % 3
  if (rest === 2 && generatorIndex >= visibleGeneratorsLength - 2) {
    return 6
  }

  if (rest === 1 && generatorIndex === visibleGeneratorsLength - 1) {
    return 12
  }

  return 4
}
</script>
