export function replaceEnv(input: string, enclosures?: [string, string]): string {
  return replaceVars(input, process.env, enclosures)
}

export function replaceVars(input: string, variables: Record<string, any>, enclosures: [string, string] = ['{{', '}}']): string {
  let finalValue = input
  const enclosureRegex = `${enclosures[0]}\\s*([^\\s${enclosures[0]}${enclosures[1]}]*)\\s*${enclosures[1]}`

  const matches = input.match(new RegExp(enclosureRegex, 'g'))

  if (matches) {
    for (let i = 0; i < matches.length; i++) {
      // Looks like "{{ EXAMPLE }}"
      const currentMatch = matches[i]
      const execResult = new RegExp(enclosureRegex, 'g').exec(currentMatch)
      // Looks like "EXAMPLE"
      const envName = execResult[1]
      const envValue = variables[envName]

      // "this is an {{ EXAMPLE }}" --> "this is an example"
      if (envValue) finalValue = finalValue.replace(currentMatch, envValue)
    }
  }

  return finalValue
}

export function cleanOrphanReplaceable(input: string, enclosures: [string, string] = ['{{', '}}']): string {
  return input.replace(new RegExp(`${enclosures[0]}\\s*([^\\s${enclosures[0]}${enclosures[1]}]*)\\s*${enclosures[1]}`, 'g'), '')
}
