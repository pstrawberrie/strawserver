/**
 * Config
 */

module.exports = {
  config: {
    development: {
      isProd: false,
      serverIp: '192.168.1.217',
      webPort: 3000,
      swgQueryPort: 44455,
      cronStatusTimer: 1500,
    },
    production: {
      isProd: true,
      serverIp: '192.168.1.217',
      webPort: 3000,
      swgQueryPort: 44455,
      cronStatusTimer: 3000,
    },
  },

  getConfig(env) {
    if (env == undefined || env.toLowerCase() === 'development') {
      return this.config.development
    } else if (env.toLowerCase() === 'production') {
      return this.config.production
    } else {
      return this.config.development
    }
  }

}
