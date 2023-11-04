import { replaceVars } from '../src'

describe(replaceVars, (): void => {
  it('replaces provided variables into the enclosures', async (): Promise<void> => {
    const string = 'key: {{ key }}, another: {{another}}'
    const finalString = replaceVars(string, { key: 'key', another: 'value' })

    expect(finalString).toEqual('key: key, another: value')
  })

  it('lets the string as it is if not var is provided', async (): Promise<void> => {
    const string = 'key: {{ key }}, not_in_there: {{not_in_there}}'
    const finalString = replaceVars(string, { key: 'key' })

    expect(finalString).toEqual('key: key, not_in_there: {{not_in_there}}')
  })

  it('lets specify other enclosures', async (): Promise<void> => {
    const string = 'key: # key #, another: #another#'
    const finalString = replaceVars(string, { key: 'key', another: 'value' }, ['#', '#'])

    expect(finalString).toEqual('key: key, another: value')
  })
})
