import { EvaluateAndReplaceOptions } from './evaluateAndReplace.types'
import { ____MMMEVALUEATE98786875674674 } from './isolatedEval'

export function evaluateAndReplace(input: string, options?: EvaluateAndReplaceOptions): string {
  const finalOptions: EvaluateAndReplaceOptions = { scope: {}, enclosures: ['<%', '%>'], ...options }

  let finalValue = input
  const enclosureA = `\\${finalOptions.enclosures[0].split('').join('\\')}`
  const enclosureB = `\\${finalOptions.enclosures[1].split('').join('\\')}`
  const enclosureRegex = `${enclosureA}((?:(?!${enclosureB})[\\s\\S])*?)${enclosureB}`

  const matches = input.match(new RegExp(enclosureRegex, 'g'))

  if (matches) {
    for (let i = 0; i < matches.length; i++) {
      // Looks like "<< 1 + 1 >>"
      const currentMatch = matches[i]
      const execResult = new RegExp(enclosureRegex, 'g').exec(currentMatch)
      // Looks like "1 + 1"
      const jsCode = execResult[1]
      const evaluation = ____MMMEVALUEATE98786875674674(jsCode, finalOptions.scope)

      // "result is << 1 + 1 >>" --> "result is 2"
      finalValue = finalValue.replace(currentMatch, evaluation)
    }
  }

  return finalValue
}
