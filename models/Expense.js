const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
  name: String,
  budget: Number,
  spent: Number,
});

module.exports = Expense = mongoose.model("Expense", ExpenseSchema);
