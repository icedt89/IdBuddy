import SnowflakeId from '@generators/SnowflakeId.vue'
import type { GeneratorMetadata } from '@generators/generators'

export const snowflakeId: GeneratorMetadata = {
  identifier: 'snowflake-id',
  displayName: 'Snowflake ID',
  component: SnowflakeId,
}
