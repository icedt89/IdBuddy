<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <v-avatar variant="text" border size="44" class="mr-2">
          <v-icon :icon="mdiIdentifier" size="40" />
        </v-avatar>
        ID Buddy
        <span class="text-disabled font-italic text-caption opacity-50">
          by
          <a href="https://jan-hafner.de" target="_blank">Jan Hafner</a>
        </span>
      </v-app-bar-title>
      <template #append>
        <v-menu>
          <template #activator="{ props }">
            <v-btn :icon="mdiDotsVertical" v-bind="props" />
          </template>

          <template #default>
            <v-list>
              <!-- Setting just "value" will enable clickability on the list item -->
              <!-- value must get a distinct value to get rid of vuetify warnings -->
              <v-list-item value="1" :prepend-icon="mdiCog" title="Settings">
                <settings-dialog activator="parent" />
              </v-list-item>
              <v-divider />
              <v-list-item
                value="2"
                :prepend-icon="mdiDeleteOutline"
                title="Reset App State"
              >
                <reset-app-state-dialog activator="parent" />
              </v-list-item>
              <v-divider />
              <v-list-item
                value="3"
                :prepend-icon="mdiInformationOutline"
                title="About ID Buddy"
              >
                <about-dialog activator="parent" />
              </v-list-item>
            </v-list>
          </template>
        </v-menu>
      </template>
    </v-app-bar>

    <v-main>
      <v-container class="ma-0" fluid>
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
              md="4"
              v-if="isGeneratorVisible(generator.identifier)"
            >
              <Component
                :is="generator.component"
                v-model:was-copied="wasCopied"
                :title="generator.displayName"
              />
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  <copy-success-snackbar v-model:show="wasCopied" />
</template>

<script setup lang="ts">
import {
  mdiIdentifier,
  mdiDotsVertical,
  mdiInformationOutline,
  mdiCog,
  mdiDeleteOutline,
} from '@mdi/js'
import { ref } from 'vue'
import CopySuccessSnackbar from '@/components/CopySuccessSnackbar.vue'
import AboutDialog from '@/components/AboutDialog.vue'
import SettingsDialog from '@/components/SettingsDialog.vue'
import { useSettingsStore } from '@/stores/settings-store'
import { generatorsList } from '@generators/generators'
import { storeToRefs } from 'pinia'
import ResetAppStateDialog from '@/components/ResetAppStateDialog.vue'

const settingsStore = useSettingsStore()
const { areAllGeneratorsHidden } = storeToRefs(settingsStore)
const { isGeneratorVisible, unhideAllGenerators } = settingsStore

const wasCopied = ref(false)
</script>
