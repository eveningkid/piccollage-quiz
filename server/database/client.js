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

  // Return a list of open restaurants given a day and time
  getOpenRestaurantsByDate(day, time) {
    return new Promise((resolve, reject) => {
      const minutes = util.hoursToMinutes(time);

      this
        .query(`
          SELECT *
          FROM restaurants
          WHERE CAST(hours ->> '${day}_1_open' AS INTEGER) <= $1
          AND   CAST(hours ->> '${day}_1_close' AS INTEGER) >= $1
          `,
          [minutes],
        )
        .then((results) => {
          results.rows.forEach((row, index) => {
            for (let [key, value] of Object.entries(row.hours)) {
              results.rows[index].hours[key] = util.minutesToString(value);
            }
          });

          resolve({
            onDay: day,
            restaurants: results.rows,
          });
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  }
}

module.exports = Database;
