import type { Component } from 'vue'
import { currentTimestamp } from '@generators/current-timestamp'
import { nanoId } from '@generators/nano-id'
import { snowflakeId } from '@generators/snowflake-id'
import { uuidMax } from '@generators/uuid-max'
import { uuidNil } from '@generators/uuid-nil'
import { uuidv4 } from '@generators/uuid-v4'
import { uuidv7 } from '@generators/uuid-v7'
import { xid } from '@generators/xid'
import { ulid } from '@generators/ulid'

export interface GeneratorMetadata {
  identifier: string
  displayName: string
  component: Component
}

export const generators: { [key: string]: GeneratorMetadata } = {
  uuidNil: uuidNil,
  uuidv4: uuidv4,
  currentTimestamp: currentTimestamp,
  uuidMax: uuidMax,
  uuidv7: uuidv7,
  ulid: ulid,
  xid: xid,
  snowflakeId: snowflakeId,
  nanoId: nanoId,
}

export const generatorsList = Object.keys(generators).map((m) => generators[m])
export const generatorsIdentifiersSet = new Set<string>(
  generatorsList.map((g) => g.identifier)
)
