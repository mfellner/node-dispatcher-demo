import Koa from 'koa'
import Router from 'koa-router'
import morgan from 'koa-morgan'
import bodyParser from 'koa-bodyparser'

import * as routes from './routes'
import * as handlers from './handlers'
import { logger } from './debug'

const app = new Koa()
const port = 3000
const log = logger('server')

// This is just a fancy way to register multiple routes with koa-router.
const router = [routes.index].reduce((router, route) => route(router), Router())

// We're exporting this function so that we can test 'app' more easily.
export function init() {
  return app.use(morgan('dev'))
            .use(bodyParser())
            .use(router.routes())
            .use(router.allowedMethods())
}

// This function performs some setup and starts the server.
function start() {
  handlers.init()
  init().listen(port)
  log(`listening on port ${port}`)
}

if (require.main === module) {
  start()
}
