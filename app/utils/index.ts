export function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(' ')
}

export function isProduction() {
  return process.env.NODE_ENV === 'production'
}
