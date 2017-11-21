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
    const timestamp = req.body.timestamp;

    if (!timestamp) {
      res.status(400).json({
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
