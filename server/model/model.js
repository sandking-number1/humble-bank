const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  account_balance: { type: Number },
  category: { type: String },
  amount: { type: Number },
  description: { type: String },
  created: { type: Date },
  spending: { type: Boolean },
  addMoney: { type: Boolean },
});

const Transaction = mongoose.model('Budget', transactionSchema);

mongoose.connect(`mongodb://localhost:27017/budget`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = Transaction;
