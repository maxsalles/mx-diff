import getChange from '../src/getChange'

describe('getChanges', () => {
  describe('when one of the arguments is "undefined"', () => {
    const originalWrapped = {}
    const derivedWrapped = undefined

    it('returns "undefined"', () => {
      expect(getChange(originalWrapped, derivedWrapped)).toBeUndefined()
    })
  })

  describe('when the "value" property is the same for both arguments', () => {
    const value = 'some value'
    const originalWrapped = { value }
    const derivedWrapped = { value }

    it('returns "undefined"', () => {
      expect(getChange(originalWrapped, derivedWrapped)).toBeUndefined()
    })
  })

  describe('when arguments have different "value" properties', () => {
    it('returns an object with the change`s description', () => {
      const originalWrapped = {
        value: 'original value',
        path: { string: 'some.path', chain: ['some', 'path'] }
      }

      const derivedWrapped = {
        value: 'derived value'
      }

      expect(getChange(originalWrapped, derivedWrapped)).toEqual({
        type: 'change',
        path: originalWrapped.path,
        previous: originalWrapped.value,
        value: derivedWrapped.value
      })
    })
  })
})
