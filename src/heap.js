import wrap from './wrap'

export default function heap ({ value, type, isArray, path }, property) {
  if (type !== 'object' || !(property in value)) return

  return wrap(
    value[property],
    {
      string: `${path.string}${isArray ? `[${property}]` : `.${property}`}`,
      chain: [...path.chain, property]
    }
  )
}
