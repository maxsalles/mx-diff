jest.mock('../src/wrap')

import heap from '../src/heap'
import wrap from '../src/wrap'

describe('heap', () => {
  const property = 'property'

  beforeEach(() => wrap.mockClear())

  describe('when "wrapped"`s "value" is not an object', () => {
    const wrapped = { value: 'some value' }

    it('returns "undefined"', () => {
      expect(heap(wrapped, property)).toBeUndefined()
    })
  })

  describe('when "wrapped"`s "value" doesn`t own "property"', () => {
    const wrapped = { value: {} }

    it('returns "undefined"', () => {
      expect(heap(wrapped, property)).toBeUndefined()
    })
  })

  describe('when "wrapped"`s "value" owns the "property"', () => {
    const wrapped = {
      type: 'object',
      isArray: false,
      value: { [property]: 'some value' },
      path: { string: 'some.path', chain: ['some', 'path'] },
    }

    it('calls "wrap" with the proper arguments and returns the value of this call', () => {
      const wrapReturn = {}

      wrap.mockReturnValue(wrapReturn)

      expect(heap(wrapped, property)).toBe(wrapReturn)

      expect(wrap).toBeCalledWith(
        wrapped.value[property],
        {
          string: `${wrapped.path.string}.${property}`,
          chain: [...wrapped.path.chain, property]
        }
      )
    })

    describe('when "wrapped"`s "value" is an "Array"', () => {
      const property = '0'
      const wrapped = {
        type: 'object',
        isArray: true,
        value: ['some value'],
        path: { string: 'some.path', chain: ['some', 'path'] },
      }

      it('calls "wrap" with the proper arguments', () => {
        heap(wrapped, property)

        expect(wrap).toBeCalledWith(
          wrapped.value[property],
          {
            string: `${wrapped.path.string}[${property}]`,
            chain: [...wrapped.path.chain, property]
          }
        )
      })
    })
  })
})
