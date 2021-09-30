const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillSchema = new Schema({
  name: String,
  lastPaid: String,
});

module.exports = Bill = mongoose.model("Bill", BillSchema);
