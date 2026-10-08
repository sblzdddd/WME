/// <reference types="@cloudflare/workers-types" />
/// <reference path="../worker-configuration.d.ts" />
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.use('*', cors())

const routes = app
  .get('/', (c) => {
    return c.text('Hello Hono!')
  })
  .get('/hello', (c) => {
    return c.json({ message: 'Hello from baka-wme' })
  })

export type AppType = typeof routes

export default app
