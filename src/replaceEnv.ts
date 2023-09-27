import { replaceVars } from './replaceVars'

export function replaceEnv(input: string, enclosures?: [string, string]): string {
  return replaceVars(input, process.env, enclosures)
}
