const converter = require('./converter.js');
const request = require('request');

// eslint-disable-next-line consistent-return
const handler = (req, reply) => {
  if (req.url.path === '/') {
    return reply('Please send me Meetup API requests');
  }
  request(converter(req.url.path), (error, response, body) => {
    console.log(`GET request made to ${converter(req.url.path)}`);
    if (!error && response.statusCode === 200) {
      reply(body);
    } else {
      reply('There was an error with your request');
    }
  });
};

module.exports = handler;
