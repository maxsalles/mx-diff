export default function wrap (value, path = { string: '', chain: [] }) {
  return {
    type: typeof value,
    isArray: Array.isArray(value),
    value,
    path
  }
}
