const knex = require('knex');
const dbConfig = require('./knexfile');  // path to your knex configuration file

const db = knex(dbConfig.development);

module.exports = db;
