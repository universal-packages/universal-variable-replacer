import { cleanOrphanReplaceable } from '../src'

describe(cleanOrphanReplaceable, (): void => {
  it('replaces all replaceable with empty string', async (): Promise<void> => {
    const string = 'key: {{ key }}, another: {{another}}'
    const finalString = cleanOrphanReplaceable(string)

    expect(finalString).toEqual('key: , another: ')
  })

  it('lets specify other enclosures', async (): Promise<void> => {
    const string = 'key: # key #, another: #another#'
    const finalString = cleanOrphanReplaceable(string, ['#', '#'])

    expect(finalString).toEqual('key: , another: ')
  })
})
