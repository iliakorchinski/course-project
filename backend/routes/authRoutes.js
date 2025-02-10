require('dotenv').config();

const express = require('express');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require('../models/user.js');
const { where } = require('sequelize');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      username,
      email,
      password: hashedPassword,
    };

    const existingUser = await User.findAll({
      where: {
        username: username,
        email: email,
      },
    });

    if (existingUser) {
      res.status(409).json({ message: 'such user is already exists' });
    }

    const newUser = await User.create(user);
    res
      .status(200)
      .json({ message: 'You have succesfully created an account' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findAll({ where: { email: email } });
    // console.log(user);
    if (user.length === 0) {
      res.status(404).json({ message: 'user is not existed' });
    }
    const isValidPassword = await bcrypt.compare(password, user[0].password);
    // console.log(isValidPassword);
    if (!isValidPassword) {
      res.status(404).json({ message: 'Wrong password!' });
    }

    const token = jwt.sign({ id: user[0].id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });
    console.log(token);

    res.status(201).json({ token: token });
  } catch (err) {
    res.status(500).json(err);
  }
});

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'No token' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(500).json({ message: 'server error' });
  }
};

router.get('/home', verifyToken, async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        id: req.userId,
      },
    });
    if (user.length === 0) {
      return res.status(404).json('user does not exist');
    }
    console.log(user);
    return res.status(201).json({ user: user[0] });
  } catch (err) {
    return res.status(500).json({ message: 'could not get...' });
  }
});

module.exports = router;
