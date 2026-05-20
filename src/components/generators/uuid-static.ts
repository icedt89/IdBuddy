import type { GeneratorMetadata } from '@generators/generators'
import UuidStatic from '@/components/generators/UuidStatic.vue'

export const uuidStatic: GeneratorMetadata = {
  identifier: 'uuid-static',
  displayName: 'UUID static',
  component: UuidStatic,
}
