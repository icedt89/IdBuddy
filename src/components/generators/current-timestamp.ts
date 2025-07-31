import CurrentTimestamp from '@generators/CurrentTimestamp.vue'
import type { GeneratorMetadata } from '@generators/generators'

export const currentTimestamp: GeneratorMetadata = {
  identifier: 'currentTimestamp',
  displayName: 'Current timestamp',
  component: CurrentTimestamp,
}
