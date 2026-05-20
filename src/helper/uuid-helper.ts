export type Casing = 'upper' | 'lower'
export type UuidFormat = 'D' | 'N' | 'B' | 'P'

export function formatUuid(uuid: string, format: UuidFormat) {
  switch (format) {
    case 'N':
      return uuid.replaceAll('-', '')
    case 'B':
      return `{${uuid}}`
    case 'P':
      return `(${uuid})`
    case 'D':
    default:
      return uuid
  }
}

export function applyCasing(uuid: string, casing: Casing) {
  switch (casing) {
    case 'upper':
      return uuid.toUpperCase()
    case 'lower':
    default:
      return uuid.toLowerCase()
  }
}
