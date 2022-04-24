const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.MONGO_URL;

mongoose
  .connect(DB)
  .then(() => console.log('MongoDB is ready!'))