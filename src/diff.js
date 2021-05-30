import getDetails from './getDetails'
import wrap from './wrap'

export default function diff (original, derived) {
  const details = getDetails(wrap(original), wrap(derived))

  return {
    hasChanged: !!details.length || (
      typeof original !== 'object' && typeof derived !== 'object' && original !== derived
    ),
    details
  }
}
