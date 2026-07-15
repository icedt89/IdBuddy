import { generators } from '@generators/generators'
import { defineStore, type PiniaPluginContext } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useTheme } from 'vuetify'

export const defaultHistorySize = 5
export const historySizeMinValue = 0

export const autoRegenerateIntervalInSecondsMinValue = 0

export type KnownTheme = 'light' | 'softDark'

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const { change: changeTheme } = useTheme()

    const currentTheme = ref<KnownTheme>('softDark')
    watch(currentTheme, (v) => changeTheme(v, false))

    const historySize = ref(defaultHistorySize)
    const isHistoryEnabled = computed(() => !!historySize.value)

    const generatorsIdentifiersSet = computed(
      () => new Set<string>(generators.map((g) => g.identifier))
    )

    const hiddenGeneratorsIdentifiers = ref<string[]>([])
    const hiddenGeneratorsIdentifiersSet = computed(
      () => new Set<string>(hiddenGeneratorsIdentifiers.value)
    )

    const visibleGenerators = computed(() =>
      generators.filter(
        (g) => !hiddenGeneratorsIdentifiersSet.value.has(g.identifier)
      )
    )

    const automaticallyCopyToClipboardAfterManualRegenerate = ref(false)

    const autoRegenerateIntervalInSeconds = ref(
      autoRegenerateIntervalInSecondsMinValue
    )
    const isAutoRegenerateEnabled = computed(
      () => autoRegenerateIntervalInSeconds.value > 0
    )

    const areAllGeneratorsHidden = computed(
      () =>
        generatorsIdentifiersSet.value.isSubsetOf(
          hiddenGeneratorsIdentifiersSet.value
        ) &&
        hiddenGeneratorsIdentifiersSet.value.isSubsetOf(
          generatorsIdentifiersSet.value
        ) &&
        visibleGenerators.value.length === 0
    )

    function isGeneratorVisible(generatorIdentifier: string) {
      return !hiddenGeneratorsIdentifiersSet.value.has(generatorIdentifier)
    }

    function unhideAllGenerators() {
      hiddenGeneratorsIdentifiers.value = []
    }

    function setGeneratorVisibility(
      generatorIdentifier: string,
      value: boolean
    ) {
      const generatorIdentifierIndex =
        hiddenGeneratorsIdentifiers.value.indexOf(generatorIdentifier)
      if (value) {
        if (generatorIdentifierIndex !== -1) {
          hiddenGeneratorsIdentifiers.value.splice(generatorIdentifierIndex, 1)
        }

        return
      }

      if (generatorIdentifierIndex === -1) {
        hiddenGeneratorsIdentifiers.value.push(generatorIdentifier)
      }
    }

    function reset() {
      historySize.value = defaultHistorySize
      currentTheme.value = 'softDark'

      unhideAllGenerators()
    }

    return {
      historySize,
      isHistoryEnabled,
      hiddenGeneratorsIdentifiers,
      visibleGenerators,
      areAllGeneratorsHidden,
      autoRegenerateIntervalInSeconds,
      isAutoRegenerateEnabled,
      currentTheme,
      automaticallyCopyToClipboardAfterManualRegenerate,
      reset,
      isGeneratorVisible,
      setGeneratorVisibility,
      unhideAllGenerators,
    }
  },
  {
    persist: {
      afterHydrate: afterRestoreSettingsStore,
    },
  }
)

function afterRestoreSettingsStore(context: PiniaPluginContext) {
  const storeWithHiddenGeneratorsLike = <
    { hiddenGeneratorsIdentifiers: string[] }
  >(<unknown>context.store)

  if (!storeWithHiddenGeneratorsLike.hiddenGeneratorsIdentifiers) {
    return
  }

  // Remove unknown hidden generators
  for (const hiddenGeneratorIdentifier of storeWithHiddenGeneratorsLike.hiddenGeneratorsIdentifiers) {
    if (
      generators.findIndex(
        (g) => g.identifier === hiddenGeneratorIdentifier
      ) !== -1
    ) {
      continue
    }

    const hiddenGeneratorKeyIndex =
      storeWithHiddenGeneratorsLike.hiddenGeneratorsIdentifiers.indexOf(
        hiddenGeneratorIdentifier
      )

    storeWithHiddenGeneratorsLike.hiddenGeneratorsIdentifiers.splice(
      hiddenGeneratorKeyIndex,
      1
    )
  }
}
