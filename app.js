const logger = require("./helpers/logger").logger.createLogger('app.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var dataStore = require('./router/data_store');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  logger.info("Sending basic info of usage");
  res.send({
    description: "Basic express app to store/return data",
    Usage: [
      {POST: "Store data in the app. Overwrites existing data with the same name"},
      {GET: "Retrieve data stored by the given key"}]
  })
});

app.use('/storage', dataStore);

app.listen(3000);
