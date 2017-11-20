const express = require('express');
const Database = require('./database/client');
const router = require('./router');
const config = require('../config.json');

const database = new Database(config.database);

const app = express();
app.use('/', router);

// Once database is connected, we run the server
database.connect(() => {
  app.listen(config.server.PORT, () => {
    console.log(`Express: Server running on port ${config.server.PORT}`);
  });
});
