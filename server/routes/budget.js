const router = require('express').Router();
const Budget = require('../models/budjetModel.js');
const jwt = require('jsonwebtoken');

/////////////////////////////
//       JWT VERIFY        //
/////////////////////////////

const verify = (req, res, next) => {
  const accesstoken = req.headers.accesstoken;
  if (accesstoken) {
    jwt.verify(accesstoken, process.env.PAYLOAD, (err, user) => {
      if (err) {
        console.log(err);
        res.status(401).json("You aren't authenticated!");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(403).json('Token is invalid');
  }
};

/////////////////////////////
//     CRUD OPERATIONS     //
/////////////////////////////

router.get('/getAll', verify, async (req, res) => {
  try {
    const items = await Budget.find({ username: req.user.username });
    const response = {
      lenght: items.length,
      items: items,
    };
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/add', verify, async (req, res) => {
  try {
    console.log(req.body.category);
    console.log(req.body.desc);
    console.log(req.body.amount);
    console.log(req.headers.accesstoken);

    const item = new Budget({
      category: req.body.category,
      amount: req.body.amount,
      desc: req.body.desc,
      username: req.user.username,
    });
    item
      .save()
      .then(() => {
        res.status(200).json(item);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/delete', verify, async (req, res) => {
  console.log('im here in delete');
  try {
    console.log(req.headers._id);
    const item = await Budget.findByIdAndDelete({
      _id: req.headers._id,
    });
    res.status(200).json('deleted successfully!');
  } catch (err) {
    res.status(500).json(err);
  }
});

/////////////////////////////
// for populating database //
/////////////////////////////

router.post('/additems', async (req, res) => {
  try {
    const a = [5000, 350, 1250, 1234, 1];
    const cateogry = ['expenses', 'income'];
    for (let i = 0; i < 20; i++) {
      const item = new Budget({
        category: cateogry[i % 2],
        amount: a[Math.floor(Math.random() * (4 - 0 + 1) + 0)].toString(),
        desc:
          i % 2 ? 'income-item' + i.toString() : 'expense-item' + i.toString(),
        username: 'admin',
      });
      await item.save();
    }
    res.status(200).json('uploaded');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/deleteAll', async (req, res) => {
  try {
    await Budget.remove({});
    res.status(200).json('deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
