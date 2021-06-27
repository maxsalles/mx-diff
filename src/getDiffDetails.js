import getChange from './getChange'
import getDefinition from './getDefinition'
import getDeletion from './getDeletion'
import getProperties from './getProperties'
import heap from './heap'
import wrap from './wrap'

export default function getDiffDetails (original, derived) {
  const wrapped = [original, derived].map(item => wrap(item))

  function perform (...wrapped) {
    const properties = getProperties(...wrapped.map(({ value }) => value))

    return properties.reduce((result, property) => {
      const heaped = wrapped.map(item => heap(item, property))

      return [...result, ...(
        heaped.every(item => item && item.type === 'object')
          ? perform(...heaped)
          : [getChange(...heaped) || getDeletion(...heaped) || getDefinition(...heaped)].filter(Boolean)
      )]
    }, [])
  }

  return perform(...wrapped)
}
