import { ____MMMEVALUEATE98786875674674 } from './isolatedEval'

export function evaluate(input: string, scope?: Record<string, any>): any {
  const finalScope = scope || {}
  const jsCode = input.trim()
  // If came as "some.deep.value" it will be transformed to "some['deep']['value']"
  const jsCodeWithBracketsSyntax = jsCode.replace(/((?<!['"`])\.(\w|-)*|(['"`]).*?\3)/g, (match) => {
    if (match.startsWith('.')) {
      return `["${match.slice(1)}"]`
    } else {
      return match
    }
  })

  return ____MMMEVALUEATE98786875674674(jsCodeWithBracketsSyntax, finalScope)
}
