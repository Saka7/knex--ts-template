import * as knex from 'knex';

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];

export default knex(config);
