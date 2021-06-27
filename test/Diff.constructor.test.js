import Diff from '../src/Diff'

describe('Diff.constructor', () => {
  it('instantiates the object properly', () => {
    const original = {}
    const derived = {}
    const instance = new Diff(original, derived)

    expect(instance).toBeInstanceOf(Diff)
  })
});
