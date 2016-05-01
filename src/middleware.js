import { logger } from './debug'

const log = logger('middleware')

// Make sure that the request fulfills some basic requirements.
export function validateSchema(ctx, next) {
  const {header, body} = ctx.request

  if (header['content-type'] !== 'application/json' || !body.event || !body.data) {
    log('Bad request: %o', body)
    ctx.throw(400)
  }

  return next()
}
