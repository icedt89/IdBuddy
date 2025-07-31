import { describe, expect, test } from 'vitest'
import { LimitedSizeList } from '@/helper/limited-size-list'

describe('length', () => {
  test('Returns as expected', () => {
    // Arrange
    const list = new LimitedSizeList<string>()
    list.unshift('biz')
    list.unshift('fooo')

    // Act, Assert
    expect(list.length).toBe(2)
  })
})

describe('resize', () => {
  test('Does nothing if newMaxSize is large than or equal to current maxSize', () => {
    // Arrange
    const maxSize = 2
    const list = new LimitedSizeList<string>(maxSize)
    list.unshift('biz')
    list.unshift('fooo')

    const newMaxSize = 3
    list.resize(newMaxSize)

    // Act, Assert
    expect(list.length).toBe(2)
  })

  test('Removes exceeding elements if newMaxSize is smaller than current maxSize', () => {
    // Arrange
    const maxSize = 2
    const list = new LimitedSizeList<string>(maxSize)
    list.unshift('biz')
    list.unshift('fooo')

    const newMaxSize = 1
    list.resize(newMaxSize)

    // Act, Assert
    expect(list.length).toBe(1)
    expect(list.items[0]).toBe('fooo')
  })
})

describe('includes', () => {
  test("Returns 'true' as expected", () => {
    // Arrange
    const list = new LimitedSizeList<string>()
    list.unshift('biz')

    // Act
    const result = list.includes('biz')

    // Assert
    expect(result).toBeTruthy()
  })

  test("Returns 'false' as expected", () => {
    // Arrange
    const list = new LimitedSizeList<string>()
    list.unshift('foo')

    // Act
    const result = list.includes('biz')

    // Assert
    expect(result).toBeFalsy()
  })
})

describe('items', () => {
  test('Returns as expected', () => {
    // Arrange
    const list = new LimitedSizeList<string>()
    list.unshift('biz')

    // Act
    const result = list.items

    // Assert
    expect(result).toContain('biz')
  })

  test("Returns 'false' as expected", () => {
    // Arrange
    const list = new LimitedSizeList<string>()
    list.unshift('foo')

    // Act
    const result = list.includes('biz')

    // Assert
    expect(result).toBeFalsy()
  })
})

describe('constructor', () => {
  test('Throws exception if maxSize is below 0', () => {
    // Act, Assert
    expect(() => new LimitedSizeList<string>(-1)).toThrow()
  })
})

describe('unshift', () => {
  test('Never exceeds maxSize and removes oldest item', () => {
    // Arrange
    const list = new LimitedSizeList<string>(3)
    list.unshift('biz')
    list.unshift('fooo')
    list.unshift('bar')

    // Act
    list.unshift('hoof')

    // Assert
    expect(list.length).toBe(3)
    expect(list.items[0]).toBe('hoof')
    expect(list.items[2]).toBe('fooo')
  })
})
