import { replaceEnv } from '../src'

describe(replaceEnv, (): void => {
  it('replaces node env variables into the enclosures', async (): Promise<void> => {
    const string = 'NODE_ENV: {{NODE_ENV}}, TS_JEST: {{TS_JEST}}, JEST_WORKER_ID: {{ JEST_WORKER_ID }}'
    const finalString = replaceEnv(string)

    expect(finalString).toEqual(`NODE_ENV: test, TS_JEST: 1, JEST_WORKER_ID: ${process.env.JEST_WORKER_ID}`)
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
