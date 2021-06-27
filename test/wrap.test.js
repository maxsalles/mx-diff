import wrap from '../src/wrap'

describe('wrap', () => {
  const value = {}

  it('returns an object with "type", "isArray", "value", and "path" properties', () => {
    expect(wrap(value)).toEqual({
      type: typeof value,
      isArray: false,
      value,
      path: { string: '', chain: [] },
    })
  })

  describe('when "value" is an array', () => {
    const value = []

    it('returns an object with "isArray" worth "true"', () => {
      expect(wrap(value).isArray).toBeTruthy()
    })
  })

  describe('when "wrap" is called with "path"', () => {
    const path = {
      string: 'some.history',
      chain: ['some', 'history']
    }

    it('assigns the property "path" the argument "path"', () => {
      expect(wrap(value, path).path).toEqual(path)
    })
  })
})
