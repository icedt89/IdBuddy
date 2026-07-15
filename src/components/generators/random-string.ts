import RandomString from '@generators/RandomString.vue'
import type { GeneratorMetadata } from '@generators/generators'

export const randomString: GeneratorMetadata = {
  identifier: 'random-string',
  displayName: 'Random string',
  component: RandomString,
}
