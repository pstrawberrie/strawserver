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
const cron = require('./cron/cron');

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

        // Server Chat Socket
        socket.on('chat', (data) => {
          console.log(chalk.gray(`-> Webserver Received 'chat' socket`, data));
          socket.emit('servers', status());
        });
    });

    // Kick off Cron
    cron(io);

});
