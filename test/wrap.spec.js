import wrap from '../src/wrap'

describe('wrap', () => {
  const object = {}

  it('returns an object with "value", "path", and "type" properties, and "toString" method', () => {
    expect(wrap(object)).toEqual({
      type: typeof object,
      value: object,
      path: { string: '', chain: [] },
      toString: expect.any(Function)
    })
  })

  describe('"toString" method', () => {
    it('returns an empty "string"', () => {
      expect(wrap(object).toString()).toBe('')
    })
  })

  describe('when "wrap" is called with "path"', () => {
    const path = {
      string: 'some.history',
      chain: ['some', 'history']
    }

    it('assigns the property "path" the argument "path"', () => {
      expect(wrap(object, path).path).toEqual(path)
    })

    describe('"toString" method', () => {
      it('returns "path.string"', () => {
        expect(wrap(object, path).toString()).toBe(path.string)
      })
    })
  })
})
