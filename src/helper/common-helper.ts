export function getValue<T>(factory: () => T | Promise<T>): Promise<T> {
  return Promise.resolve(factory())
}
