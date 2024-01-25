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
      const jsCode = execResult[1].trim()
      // If came as "some.deep.value" it will be transformed to "some['deep']['value']"
      const jsCodeWithBracketsSyntax = transformToBracketsSyntax(jsCode)

      const evaluation = ____MMMEVALUEATE98786875674674(jsCodeWithBracketsSyntax, finalOptions.scope)

      // "result is << 1 + 1 >>" --> "result is 2"
      finalValue = finalValue.replace(currentMatch, evaluation)
    }
  }

  return finalValue
}

function transformToBracketsSyntax(inputString: string): string {
  const parts = inputString.split('.')

  const transformedString = parts
    .map((part, index) => {
      if (index === 0) {
        // The first part does not need extra brackets or quotes
        return part
      } else if (part.includes('[')) {
        // Handle the case where square brackets are already present
        const nestedParts = part.split(/\[['"]?(.*?)['"]?\]/).filter(Boolean)
        const nestedString = nestedParts.map((p) => "['" + p + "']").join('')
        return nestedString
      } else if (part.includes('(') && part.includes(')')) {
        // Handle function calls
        const functionName = part.substring(0, part.indexOf('('))
        const argumentsString = part.substring(part.indexOf('('))
        return "['" + functionName + "']" + argumentsString
      } else {
        return "['" + part + "']"
      }
    })
    .join('')

  return transformedString
}
