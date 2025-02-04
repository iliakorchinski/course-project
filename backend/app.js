require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 8081;

const sequelize = require('./db.js');

const product = require('./models/product.js');

const cors = require('cors');

const app = express();
app.use(cors());

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(PORT, () => {
      console.log(`running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
