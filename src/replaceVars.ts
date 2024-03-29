export function replaceVars(input: string, variables: Record<string, any>, enclosures: [string, string] = ['{{', '}}']): string {
  let finalValue = input
  const enclosureA = `\\${enclosures[0].split('').join('\\')}`
  const enclosureB = `\\${enclosures[1].split('').join('\\')}`
  const enclosureRegex = `${enclosureA}((?:(?!${enclosureB})[\\s\\S])*?)${enclosureB}`

  const matches = input.match(new RegExp(enclosureRegex, 'g'))

  if (matches) {
    for (let i = 0; i < matches.length; i++) {
      // Looks like "{{ EXAMPLE }}"
      const currentMatch = matches[i]
      const execResult = new RegExp(enclosureRegex, 'g').exec(currentMatch)
      // Looks like "EXAMPLE"
      const envName = execResult[1].trim()
      const envValue = variables[envName]

      // "this is an {{ EXAMPLE }}" --> "this is an example"
      if (envValue) finalValue = finalValue.replace(currentMatch, envValue)
    }
  }

  return finalValue
}
