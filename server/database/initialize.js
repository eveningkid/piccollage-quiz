const path = require('path');
const args = require('args-parser')(process.argv);
const Database = require('./client');
const config = require('../../config.json');
const util = require('./util');

const database = new Database(config.database);

(async () => {
  try {
    util.info('Dropping table `restaurants` (if exists)');
    const dropTable = await database.query('DROP TABLE IF EXISTS restaurants');

    util.info('Creating table `restaurants`');
    const createTable = await database.query(`
      CREATE TABLE IF NOT EXISTS restaurants (
        id serial PRIMARY KEY,
        name varchar(50) NOT NULL,
        hours json NOT NULL
      );
    `);

    util.info('Importing sample data');
    const filePath = args.samplePath || path.join(__dirname, './sample.txt');
    const entries = await util.importSample(filePath);

    util.info('Inserting entries');
    entries.forEach(({ name, hours }) => {
        for (let [key, value] of Object.entries(hours)) {
          hours[key] = util.hoursToMinutes(value);
        }

        database.query(
          'INSERT INTO restaurants(name, hours) VALUES ($1, $2)',
          [name, hours]
        );
    });

    util.success('Database successfully bootstrapped!');
  } catch (e) {
    util.error('Error when bootstrapping database');
  }
})();
