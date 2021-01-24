export default function getChange (originalWrapped, derivedWrapped) {
  if ([originalWrapped, derivedWrapped].includes(undefined)) return
  if (originalWrapped.value === derivedWrapped.value) return

  return {
    type: 'change',
    path: originalWrapped.path,
    previous: originalWrapped.value,
    value: derivedWrapped.value
  }
}
