export function cleanOrphanReplaceable(input: string, enclosures: [string, string] = ['{{', '}}']): string {
  return input.replace(new RegExp(`${enclosures[0]}\\s*([^\\s${enclosures[0]}${enclosures[1]}]*)\\s*${enclosures[1]}`, 'g'), '')
}
