const tape = require("tape");
const shot = require("shot");
const server = require("../src/index.js");
const converter = require("../src/converter.js");
require('env2')('config.env');

tape('first test', (t) => {
  t.equal(true, true, 'true is equal to true');
  t.end();
})

tape('test get request to the / endpoint', (t) => {
  const options = {
    method: 'GET',
    url: '/',
  };

  server.inject(options, (response) => {
    t.equal(response.statusCode, 200, '/ has status code of 200');
    t.end();
  });
});

tape('test get request to endpoint with more complicated params', (t) => {
  const options = {
    method: 'GET',
    url: '/find/groups?zip=11211&radius=1&category=25&order=members',
  };

  server.inject(options, (response) => {
    t.equal(response.statusCode, 200, 'more complicated request has status code of 200');
    t.end();
  });
});

tape('test that server requests are converted to API queries in the right format', (t) => {
  const query = '/find/groups?id=18356664';
  const apiCall = `https://api.meetup.com/find/groups?id=18356664&key=${process.env.ACCESS_TOKEN}&sign=true`;

  t.equal(converter(query), apiCall, 'converter function correctly converts the query to the meetup format');
  t.end();
});

tape('test that injecting request to server makes correct API call', (t) => {
  const options = {
    method: 'GET',
    url: '/find/groups?id=18356664',
  };

  server.inject(options, (response) => {
    t.equal(JSON.parse(response.result)[0].id, 18356664, 'response has the correct id');
    t.end();
  });
})
