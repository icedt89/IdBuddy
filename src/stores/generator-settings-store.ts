import { generators } from '@generators/generators'
import { defineStore, type PiniaPluginContext } from 'pinia'
import { ref } from 'vue'

export const useGeneratorSettingsStore = defineStore(
  'generator-settings',
  () => {
    const generatorsSettings = ref<{ [generatorIdentifier: string]: unknown }>(
      {}
    )

    function setGeneratorSettings(
      generatorIdentifier: string,
      settings: unknown | null
    ) {
      if (!settings) {
        delete generatorsSettings.value[generatorIdentifier]

        return
      }

      generatorsSettings.value[generatorIdentifier] = settings
    }

    function getGeneratorSettings<T>(generatorIdentifier: string): T | null {
      return <T>generatorsSettings.value[generatorIdentifier]
    }

    function reset() {
      generatorsSettings.value = {}
    }

    return {
      reset,
      generatorsSettings,
      getGeneratorSettings,
      setGeneratorSettings,
    }
  },
  {
    persist: {
      afterHydrate: afterRestoreGeneratorSettingsStore,
    },
  }
)

function afterRestoreGeneratorSettingsStore(context: PiniaPluginContext) {
  const storeWithGeneratorsSettingsLike = <
    { generatorsSettings: { [generatorIdentifier: string]: unknown } }
  >(<unknown>context.store)

  if (!storeWithGeneratorsSettingsLike.generatorsSettings) {
    return
  }

  // Remove settings of unknown generators
  for (const generatorIdentifier in storeWithGeneratorsSettingsLike.generatorsSettings) {
    if (
      generators.findIndex((g) => g.identifier === generatorIdentifier) !== -1
    ) {
      continue
    }

    delete storeWithGeneratorsSettingsLike.generatorsSettings[
      generatorIdentifier
    ]
  }
}
