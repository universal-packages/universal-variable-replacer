import { evaluateAndReplace } from '../src'

describe(evaluateAndReplace, (): void => {
  it('evaluates code inside string that matches enclosures', async (): Promise<void> => {
    const string = 'This is a value: <% 1 +1 %>'
    const finalString = evaluateAndReplace(string)

    expect(finalString).toEqual('This is a value: 2')
  })

  it('uses the scope to evaluate the code', async (): Promise<void> => {
    let string = 'This is a value: <% a + 1 %>'
    let finalString = evaluateAndReplace(string, { a: 1 })

    expect(finalString).toEqual('This is a value: 2')

    string = 'This is a value: <% stringValue %>'
    finalString = evaluateAndReplace(string, { stringValue: 'hello' })

    expect(finalString).toEqual('This is a value: hello')

    string = 'This is a value: <% objectValue.a %>'
    finalString = evaluateAndReplace(string, { objectValue: { a: 'hello' } })

    expect(finalString).toEqual('This is a value: hello')

    string = 'This is a value: <% arrayValue[0] %>'
    finalString = evaluateAndReplace(string, { arrayValue: ['hello'] })

    expect(finalString).toEqual('This is a value: hello')

    string = 'This is a value: <% arrayValue[0].a %>'
    finalString = evaluateAndReplace(string, { arrayValue: [{ a: 'hello' }] })

    expect(finalString).toEqual('This is a value: hello')
  })

  it('handle undefined and null and nan values', async (): Promise<void> => {
    let string = 'This is a value: <% undefinedValue %>'
    let finalString = evaluateAndReplace(string, { undefinedValue: undefined })

    expect(finalString).toEqual('This is a value: undefined')

    string = 'This is a value: <% nullValue %>'
    finalString = evaluateAndReplace(string, { nullValue: null })

    expect(finalString).toEqual('This is a value: null')

    string = 'This is a value: <% nanValue %>'
    finalString = evaluateAndReplace(string, { nanValue: NaN })

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
    const finalString = evaluateAndReplace(string, {}, ['~~', '~~'])

    expect(finalString).toEqual('This is a value: 2')
  })

  it('does not evaluate code that does not match enclosures', async (): Promise<void> => {
    const string = 'This is a value: 1 + 1'
    const finalString = evaluateAndReplace(string)

    expect(finalString).toEqual('This is a value: 1 + 1')
  })
})
