const express = require('express');
const app = express();
const Database = require('./database/client');
const config = require('../config.json');

const database = new Database(config.database);

// Once database is connected, we run the server
database.connect(() => {
  app.listen(config.server.PORT, () => {
    console.log(`Express: Server running on port ${config.server.PORT}`);
  });
});
