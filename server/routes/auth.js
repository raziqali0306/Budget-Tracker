const router = require('express').Router();
const argon = require('argon2');
const User = require('../models/userModel.js');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const hashedPass = await argon.hash(req.body.password);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    user
      .save()
      .then(() => {
        res.status(200).json(user);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      if (await argon.verify(user.password, req.body.password)) {
        const { password, ...others } = user._doc;
        res.status(200).json(others);
      } else {
        res.status(400).json('Wrong Credentials');
      }
    } else {
      res.status(404).json('user not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
