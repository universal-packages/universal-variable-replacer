import { evaluateAndReplace } from '../src'

describe(evaluateAndReplace, (): void => {
  it('evaluates code inside string that matches enclosures', async (): Promise<void> => {
    const string = 'This is a value: <% 1 + 1 %>'
    const finalString = evaluateAndReplace(string)

    expect(finalString).toEqual('This is a value: 2')
  })

  it.only('uses the scope to evaluate the code', async (): Promise<void> => {
    let string = 'This is a value: <% 1 + 1 %>'
    let finalString = evaluateAndReplace(string)

    expect(finalString).toEqual('This is a value: 2')

    string = 'This is a value: <% a * 9 %>'
    finalString = evaluateAndReplace(string, { scope: { a: 9 } })

    expect(finalString).toEqual('This is a value: 81')

    string = 'This is a value: <% object.things %>'
    finalString = evaluateAndReplace(string, { scope: { object: { things: 'value' } } })

    expect(finalString).toEqual('This is a value: value')

    string = 'This is a value: <% object.things.deep %>'
    finalString = evaluateAndReplace(string, { scope: { object: { things: { deep: 'value' } } } })

    expect(finalString).toEqual('This is a value: value')

    string = 'This is a value: <% object.callable().things %>'
    finalString = evaluateAndReplace(string, { scope: { object: { callable: () => ({ things: 'value' }) } } })

    string = 'This is a value: <% object.callable(argument) %>'
    finalString = evaluateAndReplace(string, { scope: { object: { callable: (argument: any) => argument }, argument: 8 } })

    expect(finalString).toEqual('This is a value: 8')

    string = 'This is a value: <% object.callable(argument).deep %>'
    finalString = evaluateAndReplace(string, { scope: { object: { callable: (argument: any) => ({ deep: argument }) }, argument: 8 } })

    expect(finalString).toEqual('This is a value: 8')

    string = 'This is a value: <% object.callable().things / object.value %>'
    finalString = evaluateAndReplace(string, { scope: { object: { callable: () => ({ things: 8 }), value: 2 } } })

    expect(finalString).toEqual('This is a value: 4')

    string = 'This is a value: <% object["callable"]().things %>'
    finalString = evaluateAndReplace(string, { scope: { object: { callable: () => ({ things: 8 }) } } })

    expect(finalString).toEqual('This is a value: 8')

    string = 'This is a value: <% object.some-value.things["deep"] * 35 %>'
    finalString = evaluateAndReplace(string, { scope: { object: { 'some-value': { things: { deep: 8 } } } } })

    expect(finalString).toEqual('This is a value: 280')

    string = 'This is a value: <% object.some-value.things["deep"] * object.deep.value %>'
    finalString = evaluateAndReplace(string, { scope: { object: { 'some-value': { things: { deep: 8 } }, deep: { value: 35 } } } })

    expect(finalString).toEqual('This is a value: 280')

    string = 'This is a value: <% const variable = object.things; variable %>'
    finalString = evaluateAndReplace(string, { scope: { object: { things: 8 } } })

    expect(finalString).toEqual('This is a value: 8')

    string = 'This is a value: <% variable.things += object.value %>'
    finalString = evaluateAndReplace(string, { scope: { variable: { things: 8 }, object: { value: 35 } } })

    expect(finalString).toEqual('This is a value: 43')

    string = 'This is a value: <% if(value.object && object.value) { object.callable() } %>'
    finalString = evaluateAndReplace(string, { scope: { value: { object: true }, object: { value: 35, callable: () => 'called' } } })

    expect(finalString).toEqual('This is a value: called')

    string = 'This is a value: <% if(value.object && object.value) { object.callable() } %>'
    finalString = evaluateAndReplace(string, { scope: { value: { object: false }, object: { value: 35, callable: () => 'called' } } })

    expect(finalString).toEqual('This is a value: undefined')
  })

  it('handle undefined and null and nan values', async (): Promise<void> => {
    let string = 'This is a value: <% undefinedValue %>'
    let finalString = evaluateAndReplace(string, { scope: { undefinedValue: undefined } })

    expect(finalString).toEqual('This is a value: undefined')

    string = 'This is a value: <% nullValue %>'
    finalString = evaluateAndReplace(string, { scope: { nullValue: null } })

    expect(finalString).toEqual('This is a value: null')

    string = 'This is a value: <% nanValue %>'
    finalString = evaluateAndReplace(string, { scope: { nanValue: NaN } })

    expect(finalString).toEqual('This is a value: null')

    string = 'This is a value: <% undefined %>'
    finalString = evaluateAndReplace(string)

    expect(finalString).toEqual('This is a value: undefined')

    string = 'This is a value: <% null %>'
    finalString = evaluateAndReplace(string)

    expect(finalString).toEqual('This is a value: null')

    string = 'This is a value: <% NaN %>'
    finalString = evaluateAndReplace(string)

    expect(finalString).toEqual('This is a value: NaN')
  })

  it('lets specify other enclosures', async (): Promise<void> => {
    const string = 'This is a value: ~~ 1 + 1 ~~'
    const finalString = evaluateAndReplace(string, { enclosures: ['~~', '~~'] })

    expect(finalString).toEqual('This is a value: 2')
  })

  it('does not evaluate code that does not match enclosures', async (): Promise<void> => {
    const string = 'This is a value: 1 + 1'
    const finalString = evaluateAndReplace(string)

    expect(finalString).toEqual('This is a value: 1 + 1')
  })
})
