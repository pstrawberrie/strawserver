/**
 * Config
 */

module.exports = {
  config: {
    development: {
      isProd: false,
      webPort: 3000,
    },
    production: {
      isProd: true,
      webPort: 3000,
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
