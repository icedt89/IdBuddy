export function getValue<T>(factory: (() => T) | T | Promise<T>): Promise<T> {
  if (isFunction(factory)) {
    return Promise.resolve((factory as () => T)())
  }

  if (isPromise(factory)) {
    return factory
  }

  return Promise.resolve(factory)
}

export function isFunction<T>(factory: (() => T) | T | Promise<T>): factory is () => T {
  return factory instanceof Function
}

function isPromise<T>(factory: (() => T) | T | Promise<T>): factory is Promise<T> {
  return factory instanceof Promise
}
