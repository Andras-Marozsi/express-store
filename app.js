const logger = require("./helpers/logger").logger.createLogger('app.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serverPort = process.env.SERVER_PORT || 3000;
var dataStore = require('./router/data_store');
var logs = [];

logger.stream({start: -1}).on('log', function (log) {
  logs.unshift(log.timestamp + ' - ' + log.level + ' - [' + log.label + '] - ' + log.message.toString());
});

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

app.get('/logs', (req, res) => {
  logger.info("Sending logs");

  res.send({
    logs: logs
  })
});

app.use('/storage', dataStore);

app.listen(serverPort);
