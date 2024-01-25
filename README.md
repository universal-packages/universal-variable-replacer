# Variable Replacer

[![npm version](https://badge.fury.io/js/@universal-packages%2Fvariable-replacer.svg)](https://www.npmjs.com/package/@universal-packages/variable-replacer)
[![Testing](https://github.com/universal-packages/universal-variable-replacer/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-variable-replacer/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-variable-replacer/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-variable-replacer)

Easily inject environment variables or provided variables to compose richer strings.

## Install

```shell
npm install @universal-packages/variable-replacer
```

## Global methods

#### **`replaceEnv(input: string, [enclosures: [string, string]])`**

Replace matches in the string with node env variables.

```js
import { replaceEnv } from '@universal-packages/variable-replacer'

const string = 'NODE_ENV: {{NODE_ENV}}, TS_JEST: {{TS_JEST}}, JEST_WORKER_ID: {{ JEST_WORKER_ID }}'
const finalString = replaceEnv(string)

console.log(finalString)

// > 'NODE_ENV: test, TS_JEST: 1, JEST_WORKER_ID: 1'
```

#### Enclosures

You can provide your own enclosure characters to match for replacements.

```js
import { replaceEnv } from '@universal-packages/variable-replacer'

const string = 'NODE_ENV: <<NODE_ENV>>, TS_JEST: <<TS_JEST>>, JEST_WORKER_ID: {{ JEST_WORKER_ID }}'
const finalString = replaceEnv(string, ['<<', '>>'])

console.log(finalString)

// > 'NODE_ENV: test, TS_JEST: 1, JEST_WORKER_ID: {{ JEST_WORKER_ID }}'
```

#### **`replaceVars(input: string, variables: Object, [enclosures: [string, string]])`**

Replace matches in the string with values provided in an object form.

```js
import { replaceVars } from '@universal-packages/variable-replacer'

const string = 'key: {{ key }}, another: {{another}}'
const finalString = replaceVars(string, { key: 'key', another: 'value' })

console.log(finalString)

// > 'key: key, another: value'
```

#### Enclosures

Same as with env you can provide your own enclosure characters to match for replacements.

```js
import { replaceVars } from '@universal-packages/variable-replacer'

const string = 'key: # key #, another: #another#'
const finalString = replaceVars(string, { key: 'key', another: 'value' }, ['#', '#'])

console.log(finalString)

// > 'key: key, another: value'
```

#### **`evaluateAndReplace(input: string, [options: Object])`**

Captures what is between the enclosures and evaluates it as a JS expression. The result is then used to replace the match in the string.

```js
import { evaluateAndReplace } from '@universal-packages/variable-replacer'

const string = 'key: <% 1 + 1 %>, another: <% 2 + 2 %>'
const finalString = evaluateAndReplace(string)

console.log(finalString)

// > 'key: 2, another: 4'
```

#### Options

- **`scope`** `Object`
  You can provide your own scope to use in your expression.

  ```js
  import { evaluateAndReplace } from '@universal-packages/variable-replacer'

  const string = 'key: <% cpusCount / 2 %>, another: <% mem / 2 %>'
  const finalString = evaluateAndReplace(string, { cpusCount: 4, mem: 16 })

  console.log(finalString)

  // > 'key: 2, another: 8'
  ```

- **`enclosures`** `[string, string]`
  You can provide your own enclosure characters to match for replacements.

  ```js
  import { evaluateAndReplace } from '@universal-packages/variable-replacer'

  const string = 'key: ${ 1 + 1 }$ , another: ${2+2}$'
  const finalString = evaluateAndReplace(string, ['${', '}$'])

  console.log(finalString)

  // > 'key: 2, another: 4'
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

#### **`cleanOrphanReplaceable(input: string, [enclosures: [string, string]])`**

Cleans the string from orphan replaceable enclosures. Useful in case the variables are not provided and you don;t want the value `{{ value}}` as teh actual value and instead an empty value is more suitable.

```js
import { cleanOrphanReplaceable } from '@universal-packages/variable-replacer'

const string = 'key: {{ key }}, another: {{another}}'
const finalString = cleanOrphanReplaceable(string)

console.log(finalString)

// > 'key: , another: '
```

#### Enclosures

You can provide your own enclosure characters to match for replacements.

```js
import { replaceVars } from '@universal-packages/variable-replacer'

const string = 'key: # key #, another: #another#'
const finalString = replaceVars(string, { key: 'key', another: 'value' }, ['#', '#'])

console.log(finalString)

// > 'key: "", another: ""'
```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
