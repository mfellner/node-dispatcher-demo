import * as dispatcher from './dispatcher'
import { logger } from './debug'

const log = logger('handlers')

export function init() {
  dispatcher.register('foo', onFoo)
}

async function onFoo(data) {
  // Do something async ...
  log('onFoo called')
  const promise = new Promise((resolve, reject) => {
    const result = `Yes, hello ${data}. This is dog.`
    setTimeout(() => resolve(result), 2000)
  })

  const result = await promise
  log('resolved onFoo')
  return result
}
