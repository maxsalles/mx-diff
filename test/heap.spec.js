jest.mock('../src/wrap')

import heap from '../src/heap'
import wrap from '../src/wrap'

describe('heap', () => {
  const property = 'property'

  beforeEach(() => wrap.mockClear())

  describe('when "wraped"`s "value" is not an object', () => {
    const wraped = { value: 'some value' }

    it('returns "undefined"', () => {
      expect(heap(wraped, property)).toBeUndefined()
    })
  })

  describe('when "wraped"`s "value" doesn`t own "property"', () => {
    const object = {}
    const wraped = { value: object }

    it('returns "undefined"', () => {
      expect(heap(wraped, property)).toBeUndefined()
    })
  })

  describe('when "wraped"`s "value" owns the "property"', () => {
    const wraped = {
      value: { [property]: 'some value' },
      path: { string: 'some.path', chain: ['some', 'path'] },
      toString: () => 'some.path'
    }

    it('calls "wrap" with the proper arguments and returns the value of this call', () => {
      const wrapReturn = {}

      wrap.mockReturnValue(wrapReturn)

      expect(heap(wraped, property)).toBe(wrapReturn)

      expect(wrap).toBeCalledWith(
        wraped.value[property],
        { string: `${wraped}.${property}`, chain: [...wraped.path.chain, property] }
      )
    })

    describe('when "wraped"`s "value" is an "Array"', () => {
      const property = '0'
      const wraped = {
        value: ['some value'],
        path: { string: 'some.path', chain: ['some', 'path'] },
        toString: () => 'some.path'
      }

      it('calls "wrap" with the proper arguments', () => {
        heap(wraped, property)

        expect(wrap).toBeCalledWith(
          wraped.value[property],
          {
            string: `${wraped}[${property}]`,
            chain: [...wraped.path.chain, parseInt(property)]
          }
        )
      })
    })
  })
})
