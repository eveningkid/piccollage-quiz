const { Client } = require('pg');
const util = require('./util');

/**
 * Class representing a Database connection
 * Allows to abstract database interactions
 */
class Database {
  constructor(config) {
    this.config = config;
  }

  // Return a new Client instance using the local configuration
  getClient() {
    const { config } = this;

    return new Client({
      host: config.HOST,
      port: config.PORT,
      user: config.USER,
      password: config.PASSWORD,
      database: config.DATABASE,
    });
  }

  // Check whether we can connect to database
  tryConnection() {
    return new Promise((resolve, reject) => {
      const client = this.getClient();

      client
        .connect()
        .then(() => {
          client.end();
          resolve('PostgreSQL: Connected to database');
        })
        .catch((err) => {
          client.end();
          reject('PostgreSQL: Connection error');
        });
    });
  }

  // Query our database
  query(query, params=[]) {
    return new Promise((resolve, reject) => {
      const client = this.getClient();
      client.connect();

      client.query(query, params, (err, res) => {
        if (err) {
          util.error(err);
          reject();
        }

        client.end();
        resolve(res);
      });
    });
  }

  // Return a restaurants list given a timestamp
  getRestaurants() {
    // TODO
  }
}

module.exports = Database;
