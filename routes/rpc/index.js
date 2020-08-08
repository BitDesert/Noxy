'use strict'

const config = require('../../config')
const RateLimiterMemory = require('rate-limiter-flexible').RateLimiterMemory
const axios = require('axios')
const NanoClient = require('nano-node-rpc')
const client = new NanoClient({
  url: config.nodeRpc
})

const opts = {
  points: config.points,
  duration: config.duration // in seconds
}

const rateLimiter = new RateLimiterMemory(opts)

const allowedActions = [
  'account_balance',
  'account_info',
  'account_history',
  'account_key',
  'account_representative',
  'account_weight',
  'accounts_balances',
  'accounts_frontiers',
  'accounts_pending',
  'active_difficulty',
  'available_supply',
  'block_info',
  'block_account',
  'block_create',
  'block_confirm',
  'block_count',
  'block_count_type',
  'blocks_info',
  'chain',
  'confirmation_active',
  'confirmation_history',
  'confirmation_info',
  'confirmation_quorum',
  'frontier_count',
  'process',
  'representatives',
  'representatives_online',
  'successors',
  'version',
  'peers',
  'pending',
  'pending_exists',
  'work_validate',
  'work_generate',
  'key_create',
  'krai_from_raw',
  'krai_to_raw',
  'mrai_from_raw',
  'mrai_to_raw',
  'rai_from_raw',
  'rai_to_raw',
  'validate_account_number'
]

module.exports = async function (fastify, opts) {
  fastify.post('/', async function (request, reply) {
    const action = request.body.action

    if (!action) {
      reply.code(400)
      return {
        message: 'No action provided'
      }
    } else if (!allowedActions.includes(action)) {
      reply.code(400)
      return {
        message: 'Action is not supported'
      }
    }

    const authHeader = request.headers.authorization

    const consumePoints = action === 'work_generate' ? config.pointswork : 1

    if (!authHeader) {
      var rateLimiterRes = await rateLimiter.consume(request.ip, consumePoints)
        .catch((rateLimiterRes) => {
          reply.code(429)
          reply.headers({
            'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
            'X-RateLimit-Reset': (new Date(Date.now() + rateLimiterRes.msBeforeNext))
          })
          return {
            message: 'Too Many Requests'
          }
        })

      reply.headers({
        'X-RateLimit-Remaining': rateLimiterRes.remainingPoints,
        'X-RateLimit-Reset': (new Date(Date.now() + rateLimiterRes.msBeforeNext))
      })
    } else {
      if (config.authkey === null) {
        reply.code(400)
        return {
          message: 'No Authorization key set up!'
        }
      } else if (authHeader !== config.authkey) {
        reply.code(400)
        return {
          message: 'Wrong API key!'
        }
      }
    }

    var params = Object.assign({}, request.body)
    delete params.action

    if (action === 'work_generate') {
      if (config.allowWork !== true) {
        reply.code(400)
        return {
          message: 'Work generation is disabled!'
        }
      }

      if (config.dpowUser && config.dpowKey) {
        var dpowresponse = axios.post('https://dpow.nanocenter.org/service/', {
          hash: params.hash,
          user: config.dpowUser,
          api_key: config.dpowKey
        })

        return { work: dpowresponse.data.work }
      }
    }

    var noderesponse = await client._send(action, params)

    return noderesponse
  })
}
