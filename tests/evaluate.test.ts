import { evaluate } from '../src'

describe(evaluate, (): void => {
  it('evaluates all the string as a JS expression', async (): Promise<void> => {
    const string = '1 + 1'
    const finalString = evaluate(string)

    expect(finalString).toEqual(2)
  })

  it('uses the scope to evaluate the code', async (): Promise<void> => {
    let string = '1 + 1'
    let finalString = evaluate(string)

    expect(finalString).toEqual(2)

    string = 'a * 9'
    finalString = evaluate(string, { a: 9 })

    expect(finalString).toEqual(81)

    string = 'object.things'
    finalString = evaluate(string, { object: { things: 'value' } })

    expect(finalString).toEqual('value')

    string = 'object.things.deep'
    finalString = evaluate(string, { object: { things: { deep: 'value' } } })

    expect(finalString).toEqual('value')

    string = 'object.callable().things'
    finalString = evaluate(string, { object: { callable: () => ({ things: 'value' }) } })

    expect(finalString).toEqual('value')

    string = 'object.callable(argument)'
    finalString = evaluate(string, { object: { callable: (argument: any) => argument }, argument: 8 })

    expect(finalString).toEqual(8)

    string = 'object.callable(argument).deep'
    finalString = evaluate(string, { object: { callable: (argument: any) => ({ deep: argument }) }, argument: 8 })

    expect(finalString).toEqual(8)

    string = 'object.callable().things / object.value'
    finalString = evaluate(string, { object: { callable: () => ({ things: 8 }), value: 2 } })

    expect(finalString).toEqual(4)

    string = 'object["callable"]().things'
    finalString = evaluate(string, { object: { callable: () => ({ things: 8 }) } })

    expect(finalString).toEqual(8)

    string = 'object.some-value.things["deep"] * 35'
    finalString = evaluate(string, { object: { 'some-value': { things: { deep: 8 } } } })

    expect(finalString).toEqual(280)

    string = 'object.some-value.things["deep"] * object.deep.value'
    finalString = evaluate(string, { object: { 'some-value': { things: { deep: 8 } }, deep: { value: 35 } } })

    expect(finalString).toEqual(280)

    string = 'const variable = object.things; variable'
    finalString = evaluate(string, { object: { things: 8 } })

    expect(finalString).toEqual(8)

    string = 'variable.things += object.value'
    finalString = evaluate(string, { variable: { things: 8 }, object: { value: 35 } })

    expect(finalString).toEqual(43)

    string = 'if(value.object && object.value) { object.callable() }'
    finalString = evaluate(string, { value: { object: true }, object: { value: 35, callable: () => 'called' } })

    expect(finalString).toEqual('called')

    string = 'if(value.object && object.value) { object.callable() }'
    finalString = evaluate(string, { value: { object: false }, object: { value: 35, callable: () => 'called' } })

    expect(finalString).toEqual(undefined)
  })

  it('handle undefined and null and nan values', async (): Promise<void> => {
    let string = 'undefinedValue'
    let finalString = evaluate(string, { undefinedValue: undefined })

    expect(finalString).toEqual(undefined)

    string = 'nullValue'
    finalString = evaluate(string, { nullValue: null })

    expect(finalString).toEqual(null)

    string = 'nanValue'
    finalString = evaluate(string, { nanValue: NaN })

    expect(finalString).toEqual(NaN)

    string = 'undefined'
    finalString = evaluate(string)

    expect(finalString).toEqual(undefined)

    string = 'null'
    finalString = evaluate(string)

    expect(finalString).toEqual(null)

    string = 'NaN'
    finalString = evaluate(string)

    expect(finalString).toEqual(NaN)
  })
})
