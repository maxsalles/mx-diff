import Diff from '../src/Diff'

describe('Diff#[get]original', () => {
  it('returns the "original" argument sent to the constructor', () => {
    const original = {}
    const derived = {}
    const instance = new Diff(original, derived)

    expect(instance.original).toBe(original)
  })
});
