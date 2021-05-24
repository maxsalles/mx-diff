import perform from './perform'
import wrap from './wrap'

export default function diff (original, derived) {
  return perform(wrap(original), wrap(derived))
}
