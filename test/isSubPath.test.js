import isSubPath from '../src/isSubPath'

describe('isSubPath', () => {
  const examples = [
    {
      paths: ['.property', '.property.otherProperty'],
      result: true
    },
    {
      paths: ['.property[1]', '.property[1].otherProperty'],
      result: true
    },
    {
      paths: ['.property[1].otherProperty', '.property[1].otherProperty'],
      result: true
    },
    {
      paths: [['property'], ['property', 'otherProperty']],
      result: true
    },
    {
      paths: [['property', '1'], ['property', '1', 'otherProperty']],
      result: true
    },
    {
      paths: [['property', '1', 'otherProperty'], ['property', '1', 'otherProperty']],
      result: true
    },
    {
      paths: ['property[1]', ['property', '1', 'otherProperty']],
      result: true
    },
    {
      paths: [['property', '1', 'otherProperty'], 'property[1]otherProperty'],
      result: true
    },
    {
      paths: ['.otherProperty', '.property.otherProperty'],
      result: false
    },
    {
      paths: ['.property[1].otherProperty', '.property[1]'],
      result: false
    },
  ]

  it.each(examples)(
    'returns "true" if the path of the first argument is included in the second',
    ({ paths, result }) => expect(isSubPath(...paths)).toBe(result)
  )
})
