const { Router } = require('express');
const bodyParser = require('body-parser');

const router = Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.post('/restaurants', urlencodedParser, (req, res) => {
  res.json({ restaurants: [] });
});

module.exports = router;
