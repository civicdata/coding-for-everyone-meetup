const tape = require('tape');
const server = require('../server.js');
const converter = require('../src/converter.js');
const request = require('request');
require('env2')('config.env');

// This makes sure the testing evironment is set up correctly
tape('first test', (t) => {
  t.equal(true, true, 'true is equal to true');
  t.end();
});

// This test simulates sending a GET request to the '/' endpoint
// This is the most basic initial request the server will receive
// And is the starting point for testing more complicated endpoints
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

// This test simulates a more complicated request and is meant to be a test for the
// Handler function to see if it can parse the querystring
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

// So now we know that our server can accept complicated querystrings but how do we know it
// is converting them into a format that the Meetup API can understand? I created a module
// which converts the querystring into the format we want by adding an environment variable
// PROTIP: You can are not meant to share your private keys on GitHub so I have stored it as
// an environment variable in a non-git-tracked file on my local computer and on the hosting site.
tape('test that server requests are converted to API queries in the right format', (t) => {
  const query = '/find/groups?id=18356664';
  const apiCall = `https://api.meetup.com/find/groups?id=18356664&key=${process.env.ACCESS_TOKEN}&sign=true`;

  t.equal(converter(query), apiCall,
  'converter function correctly converts the query to the meetup format');
  t.end();
});

// This test checks to see if the Meetup API will response with data in the format we expect
// Given a query that we know is valid. It starts introducing external dependencies.
// What would happen to the tests if the Meetup API was down?
tape('test that injecting request to server makes correct API call', (t) => {
  const options = {
    method: 'GET',
    url: '/find/groups?id=18356664',
  };

  server.inject(options, (response) => {
    t.equal(JSON.parse(response.result)[0].id, 18356664, 'response has the correct id');
    t.end();
  });
});

// This is an awful test because it introduces ANOTHER external dependency.
// If heroku is down, the test will fail.
// I have included it here to show the format in which body can be accessed.
tape('test that making request to live heroku site returns correct response', (t) => {
  request('https://cfe-meetup-api.herokuapp.com/find/groups?id=18356664', (error, response, body) => {
    t.equal(JSON.parse(body)[0].id, 18356664, 'response has the correct id');
    t.end();
  });
});
