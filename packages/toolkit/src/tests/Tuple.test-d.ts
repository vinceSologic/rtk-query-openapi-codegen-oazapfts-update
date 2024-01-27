import { Tuple } from '@reduxjs/toolkit'

describe('type tests', () => {
  test('compatibility is checked between described types', () => {
    const stringTuple = new Tuple('')

    expectTypeOf(stringTuple).toEqualTypeOf<Tuple<[string]>>()

    expectTypeOf(stringTuple).toMatchTypeOf<Tuple<string[]>>()

    expectTypeOf(stringTuple).not.toEqualTypeOf<Tuple<string[]>>()

    expectTypeOf(stringTuple).not.toEqualTypeOf<Tuple<[string, string]>>()

    const numberTuple = new Tuple(0, 1)

    expectTypeOf(numberTuple).not.toEqualTypeOf<Tuple<string[]>>()
  })

  test('concat is inferred properly', () => {
    const singleString = new Tuple('')

    expectTypeOf(singleString).toEqualTypeOf<Tuple<[string]>>()

    expectTypeOf(singleString.concat('')).toEqualTypeOf<
      Tuple<[string, string]>
    >()

    expectTypeOf(singleString.concat([''])).not.toMatchTypeOf<
      Tuple<[string, string]>
    >()

    assertType<Tuple<[string, string]>>(singleString.concat(['']))

    expectTypeOf(singleString.concat([''])).not.toEqualTypeOf<
      Tuple<[string, string]>
    >()
  })

  test('prepend is inferred properly', () => {
    const singleString = new Tuple('')

    expectTypeOf(singleString).toEqualTypeOf<Tuple<[string]>>()

    expectTypeOf(singleString.prepend('')).toEqualTypeOf<
      Tuple<[string, string]>
    >()

    expectTypeOf(singleString.prepend([''])).not.toMatchTypeOf<
      Tuple<[string, string]>
    >()

    assertType<Tuple<[string, string]>>(singleString.prepend(['']))

    expectTypeOf(singleString.prepend([''])).not.toEqualTypeOf<
      Tuple<[string, string]>
    >()
  })

  test('push must match existing items', () => {
    const stringTuple = new Tuple('')

    expectTypeOf(stringTuple.push).toBeCallableWith('')

    expectTypeOf(stringTuple.push).parameter(0).not.toBeNumber()
  })

  test('Tuples can be combined', () => {
    const stringTuple = new Tuple('')

    const numberTuple = new Tuple(0, 1)

    expectTypeOf(stringTuple.concat(numberTuple)).toEqualTypeOf<
      Tuple<[string, number, number]>
    >()

    expectTypeOf(stringTuple.prepend(numberTuple)).toEqualTypeOf<
      Tuple<[number, number, string]>
    >()

    expectTypeOf(numberTuple.concat(stringTuple)).toEqualTypeOf<
      Tuple<[number, number, string]>
    >()

    expectTypeOf(numberTuple.prepend(stringTuple)).toEqualTypeOf<
      Tuple<[string, number, number]>
    >()

    expectTypeOf(stringTuple.prepend(numberTuple)).not.toEqualTypeOf<
      Tuple<[string, number, number]>
    >()

    expectTypeOf(stringTuple.prepend(numberTuple)).not.toMatchTypeOf<
      Tuple<[string, number, number]>
    >()

    expectTypeOf(stringTuple.concat(numberTuple)).not.toMatchTypeOf<
      Tuple<[number, number, string]>
    >()

    expectTypeOf(stringTuple.concat(numberTuple)).not.toEqualTypeOf<
      Tuple<[number, number, string]>
    >()
  })
})
