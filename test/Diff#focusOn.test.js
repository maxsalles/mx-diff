import Diff from '../src/Diff'

describe('Diff#focusOn', () => {
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

  const path = '.property.property'
  const instance = (new Diff(original, derived)).focusOn(path)

  it('returns a instance of "Diff" for the values at "path" of "original" and "derived"', () => {
    expect(instance).toBeInstanceOf(Diff)
    expect(instance.original).toBe(original.property.property)
    expect(instance.derived).toBe(derived.property.property)

    expect(instance.details).toEqual([
      {
        type: 'change',
        path: {
          string: '.property',
          chain: ['property']
        },
        previous: 'value',
        value: 'different value'
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
      }
    ])
  })
})
