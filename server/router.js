const { Router } = require('express');
const bodyParser = require('body-parser');

const router = Router();
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
  res.send('Hello World');
});


router.get('/restaurants', jsonParser, (req, res) => {
  res.send({ restaurants: [] });
});

module.exports = router;
