/**
 * Index Controller
 */

const gamedig = require('gamedig');

// GET index
exports.index = async (req, res) => {

  const mumble = await gamedig.query({
    type: 'mumble',
    host: '192.168.1.217'
  })
  .then(response => response)
  .catch(err => null);

  console.log(mumble);

  res.render('index', {
    title: 'Status',
    servers: [
      {
        name: 'mumble',
        data: mumble
      }
    ]
  });

}
