import type { GeneratorMetadata } from '@generators/generators'
import Uuid from '@generators/Uuid.vue'

export const uuid: GeneratorMetadata = {
  identifier: 'uuid',
  displayName: 'UUID',
  component: Uuid,
}
