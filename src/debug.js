import debug from 'debug'

export function logger(name) {
  return debug(`node-dispatcher-demo:${name}`)
}
