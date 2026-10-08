import { SELF } from 'cloudflare:test'
import { describe, expect, it } from 'vitest'

describe('GET /hello', () => {
  it('returns the hello payload', async () => {
    const response = await SELF.fetch('https://example.com/hello')
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ message: 'Hello from baka-wme' })
  })
})
