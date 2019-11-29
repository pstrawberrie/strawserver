/**
 * Run Cron Functions
 */

const chalk = require('chalk');
const config = require('../config').getConfig(process.env.NODE_ENV);
const timer = config.cronStatusTimer;

const serverInfo = require('./serverInfo');
const mumbleInfo = require('./mumbleInfo');
const swgInfo = require('./swgInfo');

module.exports = (socket) => {

  async function runCron() {
    console.log(chalk.gray('--> RUNNING CRON'));
    const serversArr = [];

    const status = await serverInfo(); serversArr.push(status);
    const mumble = await mumbleInfo(); serversArr.push(mumble);
    const swg = await swgInfo(); serversArr.push(swg);

    socket.emit('servers', serversArr);
    setTimeout(() => {runCron(socket)}, timer);
  }

  runCron();
}
