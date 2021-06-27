import Diff from '../src/Diff'

describe('Diff#filter', () => {
  const original = {
    invariant: 'invariant',
    property: {
      invariant: 'invariant',
      property: {
        invariant: 'invariant',
        property: 'value',
        otherProperty: 'other value'
      },
      otherProperty: 'other value'
    },
    otherProperty: 'other value'
  }

  const derived = {
    invariant: 'invariant',
    property: {
      invariant: 'invariant',
      property: {
        invariant: 'invariant',
        property: 'different value',
        anotherProperty: 'another value'
      },
      anotherProperty: 'another value'
    },
    anotherProperty: 'another value'
  }

  const examples = [
    {
      path: {
        string: '.property.property',
        chain: ['property', 'property']
      },
      result: [
        {
          type: 'change',
          path: {
            string: '.property.property.property',
            chain: ['property', 'property', 'property']
          },
          previous: 'value',
          value: 'different value'
        },
        {
          type: 'deletion',
          path: {
            string: '.property.property.otherProperty',
            chain: ['property', 'property', 'otherProperty']
          },
          previous: 'other value'
        },
        {
          type: 'definition',
          path: {
            string: '.property.property.anotherProperty',
            chain: ['property', 'property', 'anotherProperty']
          },
          value: 'another value'
        }
      ]
    },
    {
      path: {
        string: '',
        chain: [],
      },
      result: [
        {
          type: 'change',
          path: {
            string: '.property.property.property',
            chain: ['property', 'property', 'property']
          },
          previous: 'value',
          value: 'different value'
        },
        {
          type: 'deletion',
          path: {
            string: '.property.property.otherProperty',
            chain: ['property', 'property', 'otherProperty']
          },
          previous: 'other value'
        },
        {
          type: 'definition',
          path: {
            string: '.property.property.anotherProperty',
            chain: ['property', 'property', 'anotherProperty']
          },
          value: 'another value'
        },
        {
          type: 'deletion',
          path: {
            string: '.property.otherProperty',
            chain: ['property', 'otherProperty']
          },
          previous: 'other value'
        },
        {
          type: 'definition',
          path: {
            string: '.property.anotherProperty',
            chain: ['property', 'anotherProperty']
          },
          value: 'another value'
        },
        {
          type: 'deletion',
          path: {
            string: '.otherProperty',
            chain: ['otherProperty']
          },
          previous: 'other value'
        },
        {
          type: 'definition',
          path: {
            string: '.anotherProperty',
            chain: ['anotherProperty']
          },
          value: 'another value'
        },
      ]
    },
    {
      path: {
        string: '.property.nonExistentProperty',
        chain: ['property', 'nonExistentProperty']
      },
      result: []
    }
  ]

  it.each(examples)(
    'filters out those difference "details" that match the "path"',
    ({ path, result }) => {
      Object.values(path).forEach(path => {
        const instance = new Diff(original, derived)

        expect(instance.filter(path)).toEqual(result)
      })
    }
  )
});
