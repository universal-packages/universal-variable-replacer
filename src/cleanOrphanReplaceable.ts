export function cleanOrphanReplaceable(input: string, enclosures: [string, string] = ['{{', '}}']): string {
  const enclosureA = `\\${enclosures[0].split('').join('\\')}`
  const enclosureB = `\\${enclosures[1].split('').join('\\')}`
  const enclosureRegex = `${enclosureA}((?:(?!${enclosureB})[\\s\\S])*?)${enclosureB}`

  return input.replace(new RegExp(enclosureRegex, 'g'), '')
}
