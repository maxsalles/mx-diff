import pathToPropertyChain from './pathToPropertyChain'

export default function get (object, path) {
  const propertyChain = pathToPropertyChain(path)

  return propertyChain.reduce(
    (value, property) => value == null ? undefined : value[property],
    object
  )
}
