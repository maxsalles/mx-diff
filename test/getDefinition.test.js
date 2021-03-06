import getDefinition from '../src/getDefinition'

describe('getDefinition', () => {
  describe('when "originalWrapped" isn`t "undefined" or "derivedWrapped" is "undefined"', () => {
    it('returns "undefined"', () => {
      expect(getDefinition({}, undefined)).toBeUndefined()
      expect(getDefinition({}, {})).toBeUndefined()
      expect(getDefinition(undefined, undefined)).toBeUndefined()
    })
  })

  describe('when "originalWrapped" is "undefined" and "derivedWrapped" isn`t', () => {
    it('returns an object with the definition`s description', () => {
      const originalWrapped = undefined

      const derivedWrapped = {
        value: 'value',
        path: { string: 'some.path', chain: ['some', 'path'] }
      }

      expect(getDefinition(originalWrapped, derivedWrapped)).toEqual({
        type: 'definition',
        path: derivedWrapped.path,
        value: derivedWrapped.value
      })
    })
  })
})
