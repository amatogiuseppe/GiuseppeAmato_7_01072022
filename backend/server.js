//================================================================================
//  Development Server
//================================================================================

// Required modules
const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');

//Configuring Dotenv
dotenv.config();

// The normalizePort function returns a valid port, whether supplied as a number or a string
const normalizePort = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

// The errorHandler function searches for various errors and handles them appropriately
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Declaring the development server
const server = http.createServer(app);

// An event listener that logs the port or named channel on which the server is running in the console
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);