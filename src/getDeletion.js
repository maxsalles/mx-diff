export default function getDeletion (originalWrapped, derivedWrapped) {
  if (originalWrapped === undefined || derivedWrapped !== undefined) return

  return {
    type: 'deletion',
    path: originalWrapped.path,
    previous: originalWrapped.value
  }
}
