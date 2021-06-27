export default function getProperties (...objects) {
  return [...new Set(
    objects.filter(
      object => ['object', 'function'].includes(typeof object)
    ).map(Object.keys).flat())
  ]
}
