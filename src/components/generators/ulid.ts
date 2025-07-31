import Ulid from '@generators/Ulid.vue'
import type { GeneratorMetadata } from '@generators/generators'

export const ulid: GeneratorMetadata = {
  identifier: 'ulid',
  displayName: 'ULID',
  component: Ulid,
}
