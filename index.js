const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Configuration
app.use(express.json());
app.use(cors());

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Bind mongoDB connection error msg
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Validate the api's password
app.post("/validate", (req, res) => {
  const { password } = req.body;

  if (password == process.env.PASSWORD) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.use("/budget", require("./routes/budget"));
app.use("/bills", require("./routes/bills"));

// Start server
app.listen(process.env.PORT || 5000, () => console.log("Server started."));
