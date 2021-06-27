import pathToPropertyChain from './pathToPropertyChain'

export default function isSubPath (subPathString, originalPathString) {
  const subPropertyChain = pathToPropertyChain(subPathString)
  const originalPropertyChain = pathToPropertyChain(originalPathString)

  return subPropertyChain.length <= originalPropertyChain.length &&
    subPropertyChain.every((property, i) => property === originalPropertyChain[i])
}
