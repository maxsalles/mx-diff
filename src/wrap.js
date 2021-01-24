export default function wrap (object, path = { string: '', chain: [] }) {
  return {
    type: typeof object,
    value: object,
    path: path,
    toString: () => path.string
  }
}
