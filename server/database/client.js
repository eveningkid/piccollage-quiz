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

  connect(callback) {
    return this.client
      .connect()
      .then(() => {
        console.log('PostgreSQL: Connected to database');
        callback();
      })
      .catch((err) => console.error('PostgreSQL: Connection error'));
  }

  close() {
    this.client.end();
  }

  query(query, params=[]) {
    return this.client
      .query(query, params)
      .catch((err) => {});
  }

  getRestaurants() {
    // TODO
  }
}

module.exports = Database;
