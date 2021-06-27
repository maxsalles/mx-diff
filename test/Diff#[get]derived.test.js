import Diff from '../src/Diff'

describe('Diff#[get]derived', () => {
  it('returns the "derived" argument sent to the constructor', () => {
    const original = {}
    const derived = {}
    const instance = new Diff(original, derived)

    expect(instance.derived).toBe(derived)
  })
});
