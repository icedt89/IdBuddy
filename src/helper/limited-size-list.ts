export class LimitedSizeList<T> {
  private readonly _items = new Array<T>(0)

  private readonly maxSize: number

  constructor(maxSize: number = 10) {
    if (maxSize <= 0) {
      throw new Error("maxSize must be greater than 0")
    }

    this.maxSize = maxSize
  }

  public unshift(value: T): void {
    this._items.unshift(value)

    if (this._items.length > this.maxSize) {
      this._items.pop()
    }
  }

  public includes(value: T): boolean {
    return this._items.includes(value)
  }

  public get length(): number {
    return this._items.length
  }

  public get items(): T[] {
    return this._items
  }
}
