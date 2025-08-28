import MongoObjectId from '@generators/MongoObjectId.vue'
import type { GeneratorMetadata } from '@generators/generators'

export const mongoObjectId: GeneratorMetadata = {
  identifier: 'mongo-objectid',
  displayName: 'Mongo ObjectID',
  component: MongoObjectId,
}
