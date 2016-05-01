import * as dispatcher from './dispatcher'
import { validateSchema } from './middleware'

export function index(router) {
  return router
  .get('/', ctx => {
    ctx.body = `usage: curl -H "Content-Type: application/json"`
      + ` -X POST -d '{"event":"foo","data":"bar"}'`
      + ` http://localhost:3000/`
  })
  // This is the 'events' endpoint. It expects event payloads.
  .post('/', validateSchema, async(ctx) => {
    try {
      const {body} = ctx.request
      // We're dispatching or 'emitting' raw events to the dispatcher.
      // In this example the dispatcher is set up to collect results from
      // all the registered handlers and then return it in the body, causing
      // the HTTP request to block.
      ctx.body = await dispatcher.dispatch(body)
    } catch (e) {
      ctx.throw(e, 404)
    }
  })
}
