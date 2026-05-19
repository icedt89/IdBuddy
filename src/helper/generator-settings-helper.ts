import { useGeneratorSettingsStore } from '@/stores/generator-settings-store'
import { watchDebounced } from '@vueuse/core'
import { onMounted, toValue, type WatchSource } from 'vue'

export function useGeneratorSettings<TGeneratorSettings>(
  generatorIdentifier: string,
  settingsObject: WatchSource<TGeneratorSettings>,
  isDefault: (settingsObject: TGeneratorSettings) => boolean,
  restoreSettings: (generatorSettings: TGeneratorSettings) => void,
  debounce: number = 500
) {
  const { getGeneratorSettings, setGeneratorSettings } =
    useGeneratorSettingsStore()

  watchDebounced(
    settingsObject,
    (so) => {
      if (isDefault(so)) {
        setGeneratorSettings(generatorIdentifier, null)

        return
      }

      setGeneratorSettings(generatorIdentifier, toValue(settingsObject))
    },
    {
      debounce: debounce,
    }
  )

  onMounted(() => {
    const generatorSettings = <TGeneratorSettings | null>(
      getGeneratorSettings(generatorIdentifier)
    )
    if (generatorSettings) {
      restoreSettings(generatorSettings)
    }
  })
}
