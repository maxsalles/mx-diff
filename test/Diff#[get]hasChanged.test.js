import Diff from '../src/Diff'

describe('Diff#[get]hasChanged', () => {
  const examples = [
    { original: {}, derived: {}, hasChanged: false },
    { original: {}, derived: { attribute: 'value' }, hasChanged: true },
    { original: {}, derived: 'value', hasChanged: true },
    { original: 'value', derived: 'value', hasChanged: false }
  ]

  it.each(examples)(
    'indicates if there was a change between "original" and "derived"',
    ({ original, derived, hasChanged }) => {
      const instace = new Diff(original, derived)

      expect(instace.hasChanged).toBe(hasChanged)
    }
  )
});
