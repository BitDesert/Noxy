// config.js
module.exports = {
  nodeRpc: process.env.NODE_RPC || 'http://localhost:7076',
  authkey: process.env.AUTH_KEY || null,
  points: process.env.POINTS || 500,
  duration: process.env.DURATION || 60 * 60,
  pointswork: process.env.POINTS_WORK || 50,
}
