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
})
