require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 8081;

const sequelize = require('./db.js');

const user = require('./models/user.js');

const cors = require('cors');

const authRouter = require('./routes/authRoutes.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);

sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`running on ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
