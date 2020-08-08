// config.js
module.exports = {
  nodeRpc: process.env.NODE_RPC || 'http://localhost:7076',
  authKey: process.env.AUTH_KEY || null,
  points: process.env.POINTS || 500,
  duration: process.env.DURATION || 60 * 60,
  pointsForWork: process.env.POINTS_WORK || 50,
  allowWork: process.env.ALLOW_WORK || true,
  dpowUser: process.env.DPOW_USER || undefined,
  dpowKey: process.env.DPOW_KEY || undefined
}
