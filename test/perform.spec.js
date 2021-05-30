import wrap from '../src/wrap'
import perform from '../src/perform'

describe('perform', () => {
  const examples = [
    /*  0 */ [{}, {}],
    /*  1 */ [{ property: 'value' }, { property: 'value' }],
    /*  2 */ [{ property: 'value' }, { property: 'different value' }],
    /*  3 */ [{ property: 'value' }, {}],
    /*  4 */ [{}, { property: 'value' }],
    /*  5 */ [
      {
        invariant: 'invariant',
        property: 'value',
        otherProperty: 'other value'
      },
      {
        invariant: 'invariant',
        property: 'different value',
        anotherProperty: 'another value'
      }
    ],
    /*  6 */ [[], []],
    /*  7 */ [['value'], ['value']],
    /*  8 */ [['invariant', 'value'], ['invariant', 'different value', 'other value']],
    /*  9 */ [['invariant', 'value', 'other value'], ['invariant', 'different value']],
    /* 10 */ [
      {
        property: 'value',
        otherProperty: {
          property: {
            otherProperty: 'other value'
          }
        }
      },
      {
        property: 'value',
        otherProperty: {
          property: {
            otherProperty: 'other value'
          }
        }
      }
    ],
    /* 11 */ [
      {
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
      {
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
    ],
    /* 12 */ [
      ['value', ['other value', ['another value']]],
      ['value', ['other value', ['another value']]]
    ],
    /* 13 */ [
      ['invariant', ['invariant', 'value', ['another value']]],
      ['invariant', ['invariant', 'different value'], 'another value']
    ],
    /* 14 */ [
      {
        invariant: 'invariant',
        property: ['invariant', ['value', {
          invariant: 'invariant',
          property: 'value',
          otherProperty: 'other value'
        }]]
      },
      {
        invariant: 'invariant',
        property: ['invariant', ['different value', {
          invariant: 'invariant',
          property: 'different value',
          anotherProperty: 'another value'
        }]]
      }
    ],
    /* 15 */ [
      [
        'value',
        {
          invariant: 'invariant',
          property: 'value',
          otherProperty: 'other value'
        },
        'other value'
      ],
      [
        'different value',
        {
          invariant: 'invariant',
          property: 'different value',
          anotherProperty: 'another value'
        }
      ]
    ],
    /* 16 */
    ['value', 'different value'],
    /* 17 */
    ['value', { property: 'value' }],
    /* 18 */
    [{ property: 'value' }, 'value']
  ].map(objects => objects.map(object => wrap(object)))

  const expectations = [
    /*  0 */ [],
    /*  1 */ [],
    /*  2 */ [
      {
        type: 'change',
        path: {
          string: '.property',
          chain: ['property']
        },
        previous: 'value',
        value: 'different value'
      }
    ],
    /*  3 */ [
      {
        type: 'deletion',
        path: {
          string: '.property',
          chain: ['property']
        },
        previous: 'value'
      }
    ],
    /*  4 */ [
      {
        type: 'definition',
        path: {
          string: '.property',
          chain: ['property']
        },
        value: 'value'
      }
    ],
    /*  5 */ [
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
    ],
    /*  6 */ [],
    /*  7 */ [],
    /*  8 */ [
      {
        type: 'change',
        path: {
          string: '[1]',
          chain: [1]
        },
        previous: 'value',
        value: 'different value'
      },
      {
        type: 'definition',
        path: {
          string: '[2]',
          chain: [2]
        },
        value: 'other value'
      }
    ],
    /*  9 */ [
      {
        type: 'change',
        path: {
          string: '[1]',
          chain: [1]
        },
        previous: 'value',
        value: 'different value'
      },
      {
        type: 'deletion',
        path: {
          string: '[2]',
          chain: [2]
        },
        previous: 'other value'
      }
    ],
    /* 10 */ [],
    /* 11 */ [
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
    ],
    /* 12 */ [],
    /* 13 */ [
      {
        type: 'change',
        path: {
          string: '[1][1]',
          chain: [1, 1]
        },
        previous: 'value',
        value: 'different value'
      },
      {
        type: 'deletion',
        path: {
          string: '[1][2]',
          chain: [1, 2]
        },
        previous: ['another value']
      },
      {
        type: 'definition',
        path: {
          string: '[2]',
          chain: [2]
        },
        value: 'another value'
      }
    ],
    /* 14 */ [
      {
        type: 'change',
        path: {
          string: '.property[1][0]',
          chain: ['property', 1, 0]
        },
        previous: 'value',
        value: 'different value'
      },
      {
        type: 'change',
        path: {
          string: '.property[1][1].property',
          chain: ['property', 1, 1, 'property']
        },
        previous: 'value',
        value: 'different value'
      },
      {
        type: 'deletion',
        path: {
          string: '.property[1][1].otherProperty',
          chain: ['property', 1, 1, 'otherProperty']
        },
        previous: 'other value'
      },
      {
        type: 'definition',
        path: {
          string: '.property[1][1].anotherProperty',
          chain: ['property', 1, 1, 'anotherProperty']
        },
        value: 'another value'
      }
    ],
    /* 15 */ [
      {
        type: 'change',
        path: {
          string: '[0]',
          chain: [0]
        },
        previous: 'value',
        value: 'different value'
      },
      {
        type: 'change',
        path: {
          string: '[1].property',
          chain: [1, 'property']
        },
        previous: 'value',
        value: 'different value'
      },
      {
        type: 'deletion',
        path: {
          string: '[1].otherProperty',
          chain: [1, 'otherProperty']
        },
        previous: 'other value'
      },
      {
        type: 'definition',
        path: {
          string: '[1].anotherProperty',
          chain: [1, 'anotherProperty']
        },
        value: 'another value'
      },
      {
        type: 'deletion',
        path: {
          string: '[2]',
          chain: [2]
        },
        previous: 'other value'
      }
    ],
    /* 16 */
    [],
    /* 17 */
    [
      {
        type: 'definition',
        path: {
          string: '.property',
          chain: ['property']
        },
        value: 'value'
      }
    ],
    /* 18 */
    [
      {
        type: 'deletion',
        path: {
          string: '.property',
          chain: ['property']
        },
        previous: 'value'
      }
    ]
  ]

  it('returns a list of differences between two objects', () => {
    examples.forEach((example, i) => {
      expect(perform(...example)).toEqual(expectations[i])
    })
  })
})
