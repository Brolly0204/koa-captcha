const Redis = require('ioredis')

const getRedis = (config) => {
  return new Redis(config)
}
module.exports = {
  getRedis
}
