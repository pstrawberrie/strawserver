/**
 * Mumble Info
 */

const config = require('../config').getConfig(process.env.NODE_ENV);
const gamedig = require('gamedig');

module.exports = () => new Promise((resolve, reject) => {
  const serverObj = {
    name: 'mumble',
    data: null
  };

  gamedig.query({
    type: 'mumble',
    host: config.serverIp
  })
  .then(response => {
    serverObj.data = response;
  })
  .catch(err => {
    console.log(err);
    serverObj.data = null;
  })
  .finally(() => {
    return resolve(serverObj);
  });
});

