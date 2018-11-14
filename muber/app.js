const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(
  'mongodb://mongoDBcourse:Password1@ds115613.mlab.com:15613/mongo-db-course',
  { useNewUrlParser: true }
);

app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
