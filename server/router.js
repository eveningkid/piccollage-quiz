const { Router } = require('express');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

/**
 * Create an Express router without importing the database configuration
 * Use a given database instance instead
 * @param {Database} database
 * @return {express.Router}
 */
function routerWithDatabase(database) {
  const router = Router();

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    next();
  });

  router.get('/', (req, res) => {
    res.send('Hello World');
  });

  router.post('/restaurants', jsonParser, async (req, res) => {
    const timestamp = req.body.timestamp;

    if (!timestamp) {
      return res.status(400).json({
        error: 'Bad request',
        message: 'Expected a `timestamp` key (e.g. 1511257188893)',
      });
    }

    try {
      const restaurants = await database.getOpenRestaurantsByTimestamp(timestamp);
      res.status(200).json(restaurants);
    } catch (message) {
      res.status(400).json({ error: 'Bad request', message });
    }
  });

  return router;
}

module.exports = routerWithDatabase;
