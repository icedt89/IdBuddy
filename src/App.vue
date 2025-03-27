<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <v-avatar variant="text" border size="44" class="mr-2">
          <v-icon :icon="mdiIdentifier" size="40" />
        </v-avatar>
        ID Buddy
        <span class="text-disabled font-italic text-caption opacity-50">by Jan Hafner</span>
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
              <v-list-item value="1" :prepend-icon="mdiInformationOutline" title="About ID Buddy">
                <about-dialog activator="parent" />
              </v-list-item>
            </v-list>
          </template>
        </v-menu>
      </template>
    </v-app-bar>

    <v-main>
      <v-container class="ma-0" fluid>
        <v-row>
          <v-col>
            <v-alert density="compact" variant="tonal" closable type="info" color="#fff" class="opacity-50">
              ID Buddy lets you generate various identifiers primarily used by database engines
            </v-alert>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <uuid-empty v-model:was-copied="wasCopied" />
          </v-col>
          <v-col>
            <uuid-v4 v-model:was-copied="wasCopied" />
          </v-col>
          <v-col>
            <current-timestamp v-model:was-copied="wasCopied" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-divider class="my-3" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <uuid-v7 v-model:was-copied="wasCopied" />
          </v-col>
          <v-col>
            <ulid v-model:was-copied="wasCopied" />
          </v-col>
          <v-col>
            <xid v-model:was-copied="wasCopied" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <snowflake-id v-model:was-copied="wasCopied" />
          </v-col>
          <v-col>
            <nano-id v-model:was-copied="wasCopied" />
          </v-col>
          <v-col />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  <copy-success-snackbar v-model:show="wasCopied" />
</template>

<script setup lang="ts">
import { mdiIdentifier, mdiDotsVertical, mdiInformationOutline } from "@mdi/js"
import { ref } from "vue"
import CopySuccessSnackbar from "@/components/CopySuccessSnackbar.vue"
import AboutDialog from "@/components/AboutDialog.vue"
import UuidEmpty from "@/components/generators/UuidEmpty.vue"
import UuidV4 from "@/components/generators/UuidV4.vue"
import UuidV7 from "@/components/generators/UuidV7.vue"
import Ulid from "@/components/generators/Ulid.vue"
import Xid from "@/components/generators/Xid.vue"
import SnowflakeId from "@/components/generators/SnowflakeId.vue"
import NanoId from "@/components/generators/NanoId.vue"
import CurrentTimestamp from "@/components/generators/CurrentTimestamp.vue"

const wasCopied = ref(false)
</script>
