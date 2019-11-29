/**
 * SWG Info
 */

const config = require('../config').getConfig(process.env.NODE_ENV);
const chalk = require('chalk');
const Net = require('net');
const convert = require('xml-js');

module.exports = () => new Promise((resolve, reject) => {
  const swgClient = new Net.Socket();
  const responseData = {
    name: 'swg',
    data: null
  };

  swgClient.setTimeout(800);
  swgClient.connect({
    host: config.serverIp,
    port: config.swgQueryPort,
  }, () => {
    responseData.data = null;
    //console.log(chalk.yellow('-> SWG TCP Connected'));

    swgClient.on('data', (chunk) => {
      responseData.data = convert.xml2json(chunk.toString(), {compact: true, spaces: 4});
      responseData.data = JSON.parse(responseData.data);
      //console.log(chalk.yellow('Data received from SWG TCP', responseData.data));

      // END connection after data is received
      swgClient.end();
    });
  });

  swgClient.on('end', () => {
    //console.log('SWG TCP connection END');
    return resolve(responseData);
  });

  swgClient.on('timeout', () => {
    //console.log('SWG TCP connection closed TIMEOUT');
    return resolve(responseData);
  });

  swgClient.on('close', () => {
    //console.log('SWG TCP connection closed CLOSE');
    return resolve(responseData);
  });

  swgClient.on('error', (err) => {
    //console.log(chalk.red('GOT AN ERROR FROM SWG TCP:', err));
    return resolve(responseData);
  });
});
