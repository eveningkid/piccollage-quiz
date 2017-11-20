const { Router } = require('express');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * Create an Express router without importing the database configuration
 * Use a given database instance instead
 * @param {Database} database
 * @return {express.Router}
 */
function routerWithDatabase(database) {
  const router = Router();

  router.get('/', (req, res) => {
    res.send('Hello World');
  });

  router.post('/restaurants', urlencodedParser, async (req, res) => {
    const results = await database.query('SELECT * FROM restaurants');
    res.json({ restaurants: results.rows });
  });

  return router;
}

module.exports = routerWithDatabase;
