'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('RPC GET is disabled', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/rpc'
  })
  t.strictEqual(res.statusCode, 404, 'returns a status code of 404')
})
