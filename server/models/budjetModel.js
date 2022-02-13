const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Budget = mongoose.model('budget-items', budgetSchema);

module.exports = Budget;
