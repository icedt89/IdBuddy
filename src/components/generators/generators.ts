import type { Component } from 'vue'
import { timestamp } from '@generators/timestamp'
import { nanoId } from '@generators/nano-id'
import { snowflakeId } from '@generators/snowflake-id'
import { xid } from '@generators/xid'
import { ulid } from '@generators/ulid'
import { cuid2 } from '@generators/cuid2'
import { mongoObjectId } from '@generators/mongo-objectid'
import { uuid } from '@generators/uuid'
import { uuidStatic } from '@generators/uuid-static'

export interface GeneratorMetadata {
  identifier: string
  displayName: string
  component: Component
}

export const generators = [
  uuidStatic,
  uuid,
  timestamp,
  ulid,
  xid,
  snowflakeId,
  nanoId,
  cuid2,
  mongoObjectId,
]
