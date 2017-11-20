const { database } = require('../../config.json');
const { Client } = require('pg');

class Database {
  constructor(config) {
    this.client = new Client({
      host: config.HOST,
      port: config.PORT,
      user: config.USER,
      password: config.PASSWORD,
      database: config.DATABASE,
    });
  }

  connect() {
    return this.client
      .connect()
      .catch((err) => console.error('PostgreSQL: Connection error'));
  }

  query(...query) {
    return this.client.query(...query);
  }

  getRestaurants() {
    // TODO
  }
}

module.exports = new Database(database);
