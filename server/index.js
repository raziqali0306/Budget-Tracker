const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.js');
const budgetRouter = require('./routes/budget.js');

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);
app.use('/budget', budgetRouter);

app.listen(process.env.PORT, () => {
  console.log(`Started listening at port ${process.env.PORT}`);
});
