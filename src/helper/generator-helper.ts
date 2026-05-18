import { useSettingsStore } from '@/stores/settings-store'
import { useClipboard, useIntervalFn, watchDebounced } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { onMounted, readonly, ref, watch, type WatchSource } from 'vue'

export function useValueGenerator(
  valueGenerator: () => string | Promise<string>,
  watchSources: WatchSource | WatchSource[] | undefined = undefined,
  debounce: number = 500
) {
  const {
    autoRegenerateIntervalInSeconds,
    isAutoRegenerateEnabled,
    automaticallyCopyToClipboardAfterManualRegenerate,
  } = storeToRefs(useSettingsStore())

  const { isSupported, copy } = useClipboard()

  const { resume: resumeAutoRegenerate, pause: pauseAutoRegenerate } =
    useIntervalFn(
      async () => generateValue(false),
      () => autoRegenerateIntervalInSeconds.value * 1_000
    )

  watch(isAutoRegenerateEnabled, (iare) => {
    if (iare) {
      resumeAutoRegenerate()

      return
    }

    pauseAutoRegenerate()
  })

  const currentValue = ref('')

  async function generateValue(triggeredManually: boolean) {
    currentValue.value = await Promise.resolve(valueGenerator())

    if (
      triggeredManually &&
      automaticallyCopyToClipboardAfterManualRegenerate.value &&
      isSupported.value
    ) {
      copy(currentValue.value)
    }
  }

  onMounted(generateValue)

  if (watchSources) {
    watchDebounced(watchSources, () => generateValue(false), {
      debounce: debounce,
    })
  }

  return {
    currentValue: readonly(currentValue),
    generateValue,
  }
}
