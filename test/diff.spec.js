jest.mock('../src/perform')
jest.mock('../src/wrap')

import diff from '../src/diff'
import perform from '../src/perform'
import wrap from '../src/wrap'

describe('diff', () => {
  afterEach(() => {
    wrap.mockClear()
    perform.mockClear()
  })

  it('returns the result of calling "perform"', () => {
    const original = {}
    const derived = {}
    const originalWrapped = {}
    const derivedWrapped = {}
    const result = []

    wrap
      .mockReturnValueOnce(originalWrapped)
      .mockReturnValueOnce(derivedWrapped)

    perform.mockReturnValue(result)

    expect(diff(original, derived)).toBe(result)
    expect(wrap.mock.calls).toEqual([[original], [derived]])
    expect(perform).toBeCalledWith(originalWrapped, derivedWrapped)
  })

  describe('when "original" isn`t bject', () => {
    it('calls the respective "wrap" with an empty object', () => {
      const original = 'original'
      const derived = {}

      diff(original, derived)

      expect(wrap.mock.calls).toEqual([[{}], [derived]])
    })
  })

  describe('when "derived" isn`t bject', () => {
    it('calls the respective "wrap" with an empty object', () => {
      const original = {}
      const derived = 'derived'

      diff(original, derived)

      expect(wrap.mock.calls).toEqual([[original], [{}]])
    })
  })
})
