import get from '../src/get'

describe('get', () => {
  const object = {
    property: {
      otherProperty: [{
        anotherProperty: 'value'
      }]
    }
  }

  it('gets the value at "path" of "object"', () => {
    expect(get(object, '.property')).toBe(object.property)
    expect(get(object, '.property.otherProperty')).toBe(object.property.otherProperty)
    expect(get(object, '.property.otherProperty[0]')).toBe(object.property.otherProperty[0])
    expect(get(object, '.property.otherProperty[0].anotherProperty')).toBe(object.property.otherProperty[0].anotherProperty)
  })

  describe('when there is no specified "path" in the "object"', () => {
    it('returns undefined', () => {
      expect(get(object, '.property.otherProperty[1]')).toBeUndefined()
      expect(get(object, '.property.otherProperty[0].noExistentProperty[1]')).toBeUndefined()
    })
  })
})
