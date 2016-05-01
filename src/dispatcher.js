import { logger } from './debug'

const log = logger('dispatcher')
const registry = {}

// The registry can hold multiple callbacks (event handlers) for the same event.
export function register(event, callback) {
  log('register %o on "%s"', callback, event)
  registry[event] = (registry[event] || []).concat(callback)
}

export async function dispatch(payload) {
  const {event, data} = payload

  if (event in registry) {
    log('dispatching event "%s"', event)
    // We're dispatching (emitting) the event to all the registered handlers.
    // For returning a result there are several options:
    // > Promise.all: collect the results of *all* handlers.
    // > Promise.race: return the first result that was resolved
    // > callback() without 'await': don't collect any results and return immediately
    const result = await Promise.all(registry[event].map(callback => callback(data)))
    log('collected %d result(s) for event "%s"', result.length, event)
  } else {
    throw new Error(`No such event: "${event}"`)
  }
}
