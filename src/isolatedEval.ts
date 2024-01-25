export function ____MMMEVALUEATE98786875674674(____YYYEXPRESSION324234324: string, __XXXSCOPE836478623846?: Record<string, any>): any {
  const __XXXSCOPE836478623846Keys = Object.keys(__XXXSCOPE836478623846 || {})

  for (let i = 0; i < __XXXSCOPE836478623846Keys.length; i++) {
    const key = __XXXSCOPE836478623846Keys[i]
    const value = __XXXSCOPE836478623846[key]

    ____YYYEXPRESSION324234324 = `const ${key} = ${JSON.stringify(value)}; ${____YYYEXPRESSION324234324}`
  }

  return eval(____YYYEXPRESSION324234324)
}
