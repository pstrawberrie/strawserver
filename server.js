/**
 * Node Server
 */
const config = require('./config').getConfig(process.env.NODE_ENV);
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const Net = require('net');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {serveClient: false});
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes');

const moment = require('moment');
const errorHandlers = require('./handlers/errorHandlers.js');
const siteLocals = require('./locals.js');
const status = require('./status.js');

// Middlewares
app.use(helmet());
app.use(compression({}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Locals
app.use((req, res, next) => {
    res.locals.site = siteLocals;
    res.locals.m = moment;
    next();
});

// Configured Routes
app.use('/', routes);

// Error Handling Routes
app.use(errorHandlers.notFound);

if (app.get('env') === 'development') {
    app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

// Start Web Server
server.listen(config.webPort, () => {
    console.log(chalk.yellow(`+++ Web Server Started on localhost:${config.webPort} +++`));

    io.on('connection', function (socket) {
        console.log(chalk.gray('-> Client Connected to Webserver Socket'));

        // Server Status Sockets
        socket.on('servers', (data) => {
            console.log(chalk.gray(`-> Webserver Received 'servers' socket`));
            socket.emit('servers', status());
        });
    });

});

// Start SWG TCP Listener
// @TODO: Move this service into a cron file along with mumble/gamedig
const swgClient = new Net.Socket();
swgClient.connect({
  host: config.serverIp,
  port: config.swgQueryPort,
  fd: 99999,
}, () => console.log(chalk.yellow('-> SWG TCP Connected')));

swgClient.on('data', (chunk) => {
  console.log(chalk.yellow(`Data received from SWG TCP: ${chunk.toString()}.`));

  // Request an end to the connection after the data has been received.
  swgClient.end();
});

swgClient.on('end', (closed) => {
  console.log('SWG TCP connection closed (end)', closed);
});

swgClient.on('error', (err) => {
  console.log(chalk.red('GOT AN ERROR FROM SWG TCP:', err));
})
