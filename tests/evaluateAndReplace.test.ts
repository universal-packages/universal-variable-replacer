import { evaluateAndReplace } from '../src'

describe(evaluateAndReplace, (): void => {
  it('evaluates code inside string that matches enclosures', async (): Promise<void> => {
    const string = 'This is a value: <% 1 + 1 %>'
    const finalString = evaluateAndReplace(string)

    expect(finalString).toEqual('This is a value: 2')
  })

  it('lets specify other enclosures', async (): Promise<void> => {
    const string = 'This is a value: ~~ 1 + 1 ~~'
    const finalString = evaluateAndReplace(string, ['~~', '~~'])

    expect(finalString).toEqual('This is a value: 2')
  })
})
