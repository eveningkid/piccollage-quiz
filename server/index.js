const express = require('express');
const Database = require('./database/client');
const routerWithDatabase = require('./router');
const config = require('../config.json');

const database = new Database(config.database);

// Once we can connect to database, run the server
database
  .tryConnection()
  .then((message) => {
    console.log(message);

    const app = express();
    app.use('/', routerWithDatabase(database));

    app.listen(config.server.PORT, () => {
      console.log(`Express: Server running on port ${config.server.PORT}`);
    });
  })
  .catch((err) => console.error(err));
