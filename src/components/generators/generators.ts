import type { Component } from 'vue'
import { timestamp } from '@generators/timestamp'
import { nanoId } from '@generators/nano-id'
import { snowflakeId } from '@generators/snowflake-id'
import { uuidMax } from '@generators/uuid-max'
import { uuidNil } from '@generators/uuid-nil'
import { uuidv4 } from '@generators/uuid-v4'
import { uuidv7 } from '@generators/uuid-v7'
import { xid } from '@generators/xid'
import { ulid } from '@generators/ulid'
import { cuid2 } from '@generators/cuid2'
import { mongoObjectId } from '@generators/mongo-objectid'

export interface GeneratorMetadata {
  identifier: string
  displayName: string
  component: Component
}

export const generators: { [key: string]: GeneratorMetadata } = {
  uuidNil,
  uuidv4,
  currentTimestamp: timestamp,
  uuidMax,
  uuidv7,
  ulid,
  xid,
  snowflakeId,
  nanoId,
  cuid2,
  mongoObjectId,
}

export const generatorsList = Object.keys(generators).map((m) => generators[m]!)
export const generatorsIdentifiersSet = new Set<string>(
  generatorsList.map((g) => g.identifier)
)
