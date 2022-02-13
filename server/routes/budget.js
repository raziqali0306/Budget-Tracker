const router = require('express').Router();
const Budget = require('../models/budjetModel.js');

/////////////////////////////
//     CRUD OPERATIONS     //
/////////////////////////////

router.post('/add', async (req, res) => {
  try {
    const item = new Budget({
      category: req.body.category,
      amount: req.body.amount,
      desc: req.body.desc,
      username: req.body.username,
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

router.post('/delete', async (req, res) => {
  try {
    const item = await Budget.findByIdAndDelete({
      _id: req.body._id,
    });
    res.status(200).json('deleted successfully!');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/getAll', async (req, res) => {
  try {
    const items = await Budget.find({ username: req.headers.username });
    const response = {
      lenght: items.length,
      items: items,
    };
    res.status(200).json(response);
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
