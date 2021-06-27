import Diff from '../src/Diff'

describe('Diff#[get]details', () => {
  const examples = [
    {
      original: {},
      derived: {},
      details: []
    },
    {
      original: { property: 'value' },
      derived: { property: 'value' },
      details: []
    },
    {
      original: { property: 'value' },
      derived: { property: 'different value' },
      details: [
        {
          type: 'change',
          path: {
            string: '.property',
            chain: ['property']
          },
          previous: 'value',
          value: 'different value'
        }
      ]
    },
    {
      original: { property: 'value' },
      derived: {},
      details: [
        {
          type: 'deletion',
          path: {
            string: '.property',
            chain: ['property']
          },
          previous: 'value'
        }
      ]
    },
    {
      original: {},
      derived: { property: 'value' },
      details: [
        {
          type: 'definition',
          path: {
            string: '.property',
            chain: ['property']
          },
          value: 'value'
        }
      ]
    },
    {
      original: {
        invariant: 'invariant',
        property: 'value',
        otherProperty: 'other value'
      },
      derived: {
        invariant: 'invariant',
        property: 'different value',
        anotherProperty: 'another value'
      },
      details: [
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
      ]
    },
    {
      original: [],
      derived: [],
      details: []
    },
    {
      original: ['value'],
      derived: ['value'],
      details: []
    },
    {
      original: ['invariant', 'value'],
      derived: ['invariant', 'different value', 'other value'],
      details: [
        {
          type: 'change',
          path: {
            string: '[1]',
            chain: ['1']
          },
          previous: 'value',
          value: 'different value'
        },
        {
          type: 'definition',
          path: {
            string: '[2]',
            chain: ['2']
          },
          value: 'other value'
        }
      ]
    },
    {
      original: ['invariant', 'value', 'other value'],
      derived: ['invariant', 'different value'],
      details: [
        {
          type: 'change',
          path: {
            string: '[1]',
            chain: ['1']
          },
          previous: 'value',
          value: 'different value'
        },
        {
          type: 'deletion',
          path: {
            string: '[2]',
            chain: ['2']
          },
          previous: 'other value'
        }
      ]
    },
    {
      original: {
        property: 'value',
        otherProperty: {
          property: {
            otherProperty: 'other value'
          }
        }
      },
      derived: {
        property: 'value',
        otherProperty: {
          property: {
            otherProperty: 'other value'
          }
        }
      },
      details: []
    },
    {
      original: {
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
      },
      derived: {
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
      },
      details: [
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
      original: ['value', ['other value', ['another value']]],
      derived: ['value', ['other value', ['another value']]],
      details: []
    },
    {
      original: ['invariant', ['invariant', 'value', ['another value']]],
      derived: ['invariant', ['invariant', 'different value'], 'another value'],
      details: [
        {
          type: 'change',
          path: {
            string: '[1][1]',
            chain: ['1', '1']
          },
          previous: 'value',
          value: 'different value'
        },
        {
          type: 'deletion',
          path: {
            string: '[1][2]',
            chain: ['1', '2']
          },
          previous: ['another value']
        },
        {
          type: 'definition',
          path: {
            string: '[2]',
            chain: ['2']
          },
          value: 'another value'
        }
      ]
    },
    {
      original: {
        invariant: 'invariant',
        property: ['invariant', ['value', {
          invariant: 'invariant',
          property: 'value',
          otherProperty: 'other value'
        }]]
      },
      derived: {
        invariant: 'invariant',
        property: ['invariant', ['different value', {
          invariant: 'invariant',
          property: 'different value',
          anotherProperty: 'another value'
        }]]
      },
      details: [
        {
          type: 'change',
          path: {
            string: '.property[1][0]',
            chain: ['property', '1', '0']
          },
          previous: 'value',
          value: 'different value'
        },
        {
          type: 'change',
          path: {
            string: '.property[1][1].property',
            chain: ['property', '1', '1', 'property']
          },
          previous: 'value',
          value: 'different value'
        },
        {
          type: 'deletion',
          path: {
            string: '.property[1][1].otherProperty',
            chain: ['property', '1', '1', 'otherProperty']
          },
          previous: 'other value'
        },
        {
          type: 'definition',
          path: {
            string: '.property[1][1].anotherProperty',
            chain: ['property', '1', '1', 'anotherProperty']
          },
          value: 'another value'
        }
      ]
    },
    {
      original: [
        'value',
        {
          invariant: 'invariant',
          property: 'value',
          otherProperty: 'other value'
        },
        'other value'
      ],
      derived: [
        'different value',
        {
          invariant: 'invariant',
          property: 'different value',
          anotherProperty: 'another value'
        }
      ],
      details: [
        {
          type: 'change',
          path: {
            string: '[0]',
            chain: ['0']
          },
          previous: 'value',
          value: 'different value'
        },
        {
          type: 'change',
          path: {
            string: '[1].property',
            chain: ['1', 'property']
          },
          previous: 'value',
          value: 'different value'
        },
        {
          type: 'deletion',
          path: {
            string: '[1].otherProperty',
            chain: ['1', 'otherProperty']
          },
          previous: 'other value'
        },
        {
          type: 'definition',
          path: {
            string: '[1].anotherProperty',
            chain: ['1', 'anotherProperty']
          },
          value: 'another value'
        },
        {
          type: 'deletion',
          path: {
            string: '[2]',
            chain: ['2']
          },
          previous: 'other value'
        }
      ]
    },
    {
      original: 'value',
      derived: 'different value',
      details: []
    },
    {
      original: 'value',
      derived: { property: 'value' },
      details: [
        {
          type: 'definition',
          path: {
            string: '.property',
            chain: ['property']
          },
          value: 'value'
        }
      ]
    },
    {
      original: { property: 'value' },
      derived: 'value',
      details: [
        {
          type: 'deletion',
          path: {
            string: '.property',
            chain: ['property']
          },
          previous: 'value'
        }
      ]
    },
  ]

  it.each(examples)(
    'returns a list of differences between "original" and "derived"',
    ({ original, derived, details }) => {
    const instance = new Diff(original, derived)

    expect(instance.details).toEqual(details)
    }
  )
});
