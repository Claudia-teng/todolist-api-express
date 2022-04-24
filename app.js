const express = require('express')
const app = express();
const cors = require('cors');
const api = require('./routes/api');
require('dotenv').config();
require('./service/mongo');

app.use('/', api);

app.use((req, res, next) => {
  res.status(404).json({
    "status": "false",
    "message": "No route"
  });
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    "status": "false",
    "message": "Something went wrong"
  });
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`)
});
