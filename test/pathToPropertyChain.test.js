import pathToPropertyChain from '../src/pathToPropertyChain'

describe('pathToPropertyChain', () => {
  const examples = [
    {
      path: 'property.otherProperty[0].anotherProperty',
      result: ['property', 'otherProperty', '0', 'anotherProperty']
    },
    {
      path: '.property.otherProperty[0].anotherProperty',
      result: ['property', 'otherProperty', '0', 'anotherProperty']
    },
    {
      path: '[property]otherProperty[0].anotherProperty',
      result: ['property', 'otherProperty', '0', 'anotherProperty']
    },
    {
      path: '[[property]]..otherProperty[0].[anotherProperty]',
      result: ['property', 'otherProperty', '0', 'anotherProperty']
    },
  ]

  it.each(examples)(
    'returns an "Array" with the property chain',
    ({ path, result }) => expect(pathToPropertyChain(path)).toEqual(result)
  )

  describe('when the "path" is an "Array"', () => {
    it('returns the "path"', () => {
      const path = ['property', 'otherProperty']

      expect(pathToPropertyChain(path)).toBe(path)
    })
  })
})
