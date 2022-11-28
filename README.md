# Variable Replacer

[![npm version](https://badge.fury.io/js/@universal-packages%2Fvariable-replacer.svg)](https://www.npmjs.com/package/@universal-packages/variable-replacer)
[![Testing](https://github.com/universal-packages/universal-variable-replacer/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-variable-replacer/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-variable-replacer/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-variable-replacer)

Easily inject environment variables or provided variables to compose richer strings.

## Install

```shell
npm install @universal-packages/variable-replacer
```

## replaceEnv()

Replace matches in the string with node env variables.

```js
import { replaceEnv } from '@universal-packages/variable-replacer'

const string = 'NODE_ENV: {{NODE_ENV}}, TS_JEST: {{TS_JEST}}, JEST_WORKER_ID: {{ JEST_WORKER_ID }}'
const finalString = replaceEnv(string)

console.log(finalString)

// > 'NODE_ENV: test, TS_JEST: 1, JEST_WORKER_ID: 1'
```

### Enclosures

You can provide your own enclosure characters to match for replacements.

```js
import { replaceEnv } from '@universal-packages/variable-replacer'

const string = 'NODE_ENV: <<NODE_ENV>>, TS_JEST: <<TS_JEST>>, JEST_WORKER_ID: {{ JEST_WORKER_ID }}'
const finalString = replaceEnv(string, ['<<', '>>'])

console.log(finalString)

// > 'NODE_ENV: test, TS_JEST: 1, JEST_WORKER_ID: {{ JEST_WORKER_ID }}'
```

## replaceVars()

Replace matches in the string with values provided in an object form.

```js
import { replaceVars } from '@universal-packages/variable-replacer'

const string = 'key: {{ key }}, another: {{another}}'
const finalString = replaceVars(string, { key: 'key', another: 'value' })

console.log(finalString)

// > 'key: key, another: value'
```

### Enclosures

Same as with env you can provide your own enclosure characters to match for replacements.

```js
import { replaceVars } from '@universal-packages/variable-replacer'

const string = 'key: # key #, another: #another#'
const finalString = replaceVars(string, { key: 'key', another: 'value' }, ['#', '#'])

console.log(finalString)

// > 'key: key, another: value'
```

## Combine replacements

You can pass your string through both function to get a final string

```js
import { replaceEnv, replaceVars } from '@universal-packages/variable-replacer'

const string = 'NODE_ENV: <<NODE_ENV>>, TS_JEST: <<TS_JEST>>, key: {{ key }}'
let finalString = replaceEnv(string, ['<<', '>>'])

console.log(finalString)

// > 'NODE_ENV: test, TS_JEST: 1, key: {{ key }}'

finalString = replaceVars(string, { key: 'value' })

console.log(finalString)

// > 'NODE_ENV: test, TS_JEST: 1, key: value'
```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
