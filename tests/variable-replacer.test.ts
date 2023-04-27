import { cleanOrphanReplaceable, replaceEnv, replaceVars } from '../src'

describe('variable-replacer', (): void => {
  describe('replaceEnv', (): void => {
    it('replaces node env variables into the enclosures', async (): Promise<void> => {
      const string = 'NODE_ENV: {{NODE_ENV}}, TS_JEST: {{TS_JEST}}, JEST_WORKER_ID: {{ JEST_WORKER_ID }}'
      const finalString = replaceEnv(string)

      expect(finalString).toEqual('NODE_ENV: test, TS_JEST: 1, JEST_WORKER_ID: 1')
    })

    it('lets the string as it is if not var is provided', async (): Promise<void> => {
      const string = 'NODE_ENV: {{NODE_ENV}}, TS_JEST: {{TS_JEST}}, NO_IN_ENVS: {{ NO_IN_ENVS }}'
      const finalString = replaceEnv(string)

      expect(finalString).toEqual('NODE_ENV: test, TS_JEST: 1, NO_IN_ENVS: {{ NO_IN_ENVS }}')
    })

    it('lets specify other enclosures', async (): Promise<void> => {
      const string = 'NODE_ENV: <<NODE_ENV>>, TS_JEST: <<TS_JEST>>, JEST_WORKER_ID: {{ JEST_WORKER_ID }}'
      const finalString = replaceEnv(string, ['<<', '>>'])

      expect(finalString).toEqual('NODE_ENV: test, TS_JEST: 1, JEST_WORKER_ID: {{ JEST_WORKER_ID }}')
    })
  })

  describe('replaceVars', (): void => {
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

  describe('cleanOrphanReplaceable', (): void => {
    it('replaces all replaceable with empty string', async (): Promise<void> => {
      const string = 'key: {{ key }}, another: {{another}}'
      const finalString = cleanOrphanReplaceable(string,)

      expect(finalString).toEqual('key: , another: ')
    })

    it('lets specify other enclosures', async (): Promise<void> => {
      const string = 'key: # key #, another: #another#'
      const finalString = cleanOrphanReplaceable(string, ['#', '#'])

      expect(finalString).toEqual('key: , another: ')
    })
  })
})
