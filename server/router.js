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

  // Allow CORS
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    next();
  });

  // Main route
  const entryFilePath = path.join(__dirname, '../app/build/index.html');
  router.get('/', (req, res) => res.sendFile(entryFilePath));

  // API: get open restaurants
  router.post('/restaurants', jsonParser, async (req, res) => {
    const { day, time } = req.body;

    if (!day || !time) {
      return res.status(400).json({
        error: 'Bad request',
        message: 'Expected a `day` and `minutes` keys (e.g. `mon` and `240`)',
      });
    }

    try {
      const restaurants = await database.getOpenRestaurantsByDate(day, time);
      res.status(200).json(restaurants);
    } catch (message) {
      res.status(400).json({ error: 'Bad request', message });
    }
  });

  return router;
}

module.exports = routerWithDatabase;
