'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return {
      message: 'Welcome to Noxy',
      url: 'https://github.com/BitDesert/Noxy'
    }
  })
}
