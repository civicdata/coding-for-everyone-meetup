require('env2')('config.env');

const converter = (querystring) => {
  return `https://api.meetup.com${querystring}&key=${process.env.ACCESS_TOKEN}&sign=true`
}

module.exports = converter;
