import getDeletion from '../src/getDeletion'

describe('getDeletion', () => {
  describe('when "originalWrapped" is "undefined" or "derivedWrapped" isn`t "undefined"', () => {
    it('returns "undefined"', () => {
      expect(getDeletion(undefined, {})).toBeUndefined()
      expect(getDeletion({}, {})).toBeUndefined()
      expect(getDeletion(undefined, undefined)).toBeUndefined()
    })
  })

  describe('when "originalWrapped" isn`t "undefined" and "derivedWrapped" is', () => {
    it('returns an object with the deletion`s description', () => {
      const originalWrapped = {
        value: 'value',
        path: { string: 'some.path', chain: ['some', 'path'] }
      }

      const derivedWrapped = undefined

      expect(getDeletion(originalWrapped, derivedWrapped)).toEqual({
        type: 'deletion',
        path: originalWrapped.path,
        previous: originalWrapped.value
      })
    })
  })
})
