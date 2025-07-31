import { generatorsIdentifiersSet } from '@generators/generators'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const defaultHistorySize = 10
export const historySizeMinValue = 0

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const historySize = ref(defaultHistorySize)
    const isHistoryEnabled = computed(() => !!historySize.value)

    const hiddenGenerators = ref<string[]>([])
    const hiddenGeneratorsSet = computed(
      () => new Set<string>(hiddenGenerators.value)
    )

    const areAllGeneratorsHidden = computed(() =>
      setsAreEqual(generatorsIdentifiersSet, hiddenGeneratorsSet.value)
    )

    function isGeneratorVisible(generatorIdentifier: string) {
      return !hiddenGeneratorsSet.value.has(generatorIdentifier)
    }

    function unhideAllGenerators() {
      hiddenGenerators.value = []
    }

    function setGeneratorVisibility(
      generatorIdentifier: string,
      value: boolean
    ) {
      const generatorIdentifierIndex =
        hiddenGenerators.value.indexOf(generatorIdentifier)
      if (value) {
        if (generatorIdentifierIndex !== -1) {
          hiddenGenerators.value.splice(generatorIdentifierIndex, 1)
        }

        return
      }

      if (generatorIdentifierIndex === -1) {
        hiddenGenerators.value.push(generatorIdentifier)
      }
    }

    function reset() {
      historySize.value = defaultHistorySize

      unhideAllGenerators()
    }

    function setsAreEqual<T>(a: Set<T>, b: Set<T>): boolean {
      if (a.size !== b.size) {
        return false
      }

      for (const item of a) {
        if (!b.has(item)) {
          return false
        }
      }

      return true
    }

    return {
      historySize,
      isHistoryEnabled,
      hiddenGenerators,
      hiddenGeneratorsSet,
      areAllGeneratorsHidden,
      reset,
      isGeneratorVisible,
      setGeneratorVisibility,
      unhideAllGenerators,
    }
  },
  {
    persist: true,
  }
)
