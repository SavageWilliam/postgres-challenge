const pg = require('pg');
const Pool = pg.Pool;
const url = require('url');

if (!process.env.DB_URL) {
  throw new Error('Environment variable DB_URL must be set');
}


const params = url.parse(process.env.DB_URL);
// takes info from environment variable
const [username, password] = params.auth.split(':');

// creats options object to hold
const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2
};
// options properties passed to pg in order to create the pool..

if (username) { options.user = username; }
if (password) { options.password = password; }

options.ssl = (options.host !== 'localhost');

module.exports = new Pool(options);

// pools tell pg WHERE the database is.. AND HOW to access it.
