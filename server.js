const hapi = require('hapi');
const server = new hapi.Server();
const plugins = [];
const handler = require("src/handler.js");

const routes = [{
  path: '/{param*}',
  method: 'GET',
  handler,
}];

server.connection({
  port: process.env.PORT || 4000,
  host: 'localhost'
});

server.register(plugins, (err) => {
  if (err) throw err;
  server.route(routes);
});

server.start(() => {
  console.log(`Server is currently running on: ${server.info.uri}`);
});

module.exports = server;
