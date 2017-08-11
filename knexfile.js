'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/project_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/project_test'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
