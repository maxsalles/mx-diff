import diff from '../src/diff'

describe('diff', () => {
  describe('when both parameters are non-objects', () => {
    describe('and are different', () => {
      const original = 'value'
      const derived = 'new value'

      it('returns "hasChanged" as "true" and "details" as empty array', () => {
        const result = diff(original, derived)

        expect(result).toEqual({
          hasChanged: true,
          details: expect.any(Array)
        })

        expect(result.details.length).toBe(0)
      })
    })

    describe('and are equal', () => {
      const original = 'value'
      const derived = original

      it('returns "hasChanged" as "false" and "details" as empty array', () => {
        const result = diff(original, derived)

        expect(result).toEqual({
          hasChanged: false,
          details: expect.any(Array)
        })

        expect(result.details.length).toBe(0)
      })
    })

    describe('when one of the parameters is an object', () => {
      describe('and both are different', () => {
        const original = { attribute: 'value' }
        const derived = { attribute: 'new value' }

        it('returns "hasChanged" as "true" and "details" as non-empty array', () => {
          const result = diff(original, derived)

          expect(result).toEqual({
            hasChanged: true,
            details: expect.any(Array)
          })

          expect(result.details.length).not.toBe(0)
        })
      })

      describe('and both are equal', () => {
        const original = { attribute: 'value' }
        const derived = original

        it('returns "hasChanged" as "false" and "details" as empty array', () => {
          const result = diff(original, derived)

          expect(result).toEqual({
            hasChanged: false,
            details: expect.any(Array)
          })

          expect(result.details.length).toBe(0)
        })
      })
    })
  })
})
