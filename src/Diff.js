import get from './get'
import getDiffDetails from './getDiffDetails'
import isSubPath from './isSubPath'
import { PRIVATE } from './constants'

export default class Diff {
  constructor (original, derived) {
    const details = getDiffDetails(original, derived)

    const hasChanged = !!details.length || (
      (typeof original !== 'object' || typeof derived !== 'object') &&
      original !== derived
    )

    Object.defineProperty(this, PRIVATE, {
      writable: true,
      value: { original, derived, details, hasChanged }
    })
  }

  get original () {
    return this[PRIVATE].original
  }

  get derived () {
    return this[PRIVATE].derived
  }

  get details () {
    return this[PRIVATE].details
  }

  get hasChanged () {
    return this[PRIVATE].hasChanged
  }

  filter (path) {
    return this.details.filter(detail => isSubPath(path, detail.path.chain))
  }

  focusOn (path) {
    const original = get(this.original, path)
    const derived = get(this.derived, path)

    return new Diff(original, derived)
  }
}
