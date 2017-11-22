const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

/**
 * Create an Express router without importing the database configuration
 * Use a given database instance instead
 * @param {Database} database
 * @return {express.Router}
 */
function routerWithDatabase(database) {
  const router = express.Router();

  // Setup static files folder
  const staticPath = path.join(__dirname, '../app/build');
  router.use(express.static(staticPath));

  // Main route
  const entryFilePath = path.join(__dirname, '../app/build/index.html');
  router.get('/', (req, res) => res.sendFile(entryFilePath));

  // API: get open restaurants
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
