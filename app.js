const express = require('express');
const http = require('http');

const app = express();

const bodyParser = require('body-parser');

const winston = require('winston');

/**
 * Serve the static video player code from public directory
 *
 * This allows us to write simple HTML and JS. We don't really need a
 * template library or any routing.
 */
app.use(express.static('public'));

/**
 * Set up body parser so that we can read POST requests from the client.
 *
 * We assume that the client is sending data as JSON objects.
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Log data with Winston
 */
function logEvent(data) {
  winston.log('info', data);
}

/**
 * Listen for POST data from the client on the event route
 *
 * When data is sent to the event route, log it with Winston
 */
app.post('/event', (req) => {
  logEvent(req.body);
});

/**
 * Set up a log file using Winston
 *
 * Winston allows us to save log data to a file as JSON.
 */
winston.add(
  winston.transports.File, {
    filename: 'event.log',
    level: 'info',
    json: true,
    eol: '\n',
    timestamp: true,
  }
);

/**
 * Serve the entire app on port 3000
 */
http.createServer(app).listen(3000);
