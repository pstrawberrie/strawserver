/**
 * Server Status Functions
 */

const os = require('os');
const { formatBytes, formatUptime } = require('../util');

module.exports = () => new Promise((resolve, reject) => {
  const infoObj = {
    name: 'status',
    data: {
      freemem: formatBytes(os.freemem()),
      totalmem: formatBytes(os.totalmem()),
      uptime: formatUptime(os.uptime()),
    }
  };

  return resolve(infoObj);
});
