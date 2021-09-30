const Bill = require("../models/Bill");
const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

// Get bills
router.get("/getBills", authenticate, (req, res) => {
  Bill.find({})
    .then((data) => res.json(data))
    .catch((err) => {
      return res.status(400).json({ msg: "Couldn't get bills." });
    });
});

// Create bill
router.post("/createBill", authenticate, (req, res) => {
  let { name, lastPaid } = req.body;

  const bill = new Bill({
    name,
    lastPaid,
  });

  bill
    .save()
    .then(() => {
      res.json({ success: "Bill created successfully." });
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Error creating the bill." });
    });
});

// Edit bill
router.put("/editBill/:id", authenticate, (req, res) => {
  let { name, lastPaid } = req.body;

  Bill.findById(req.params.id, (err, bill) => {
    if (err) {
      return res.status(400).json({ msg: "Error getting the bill." });
    } else {
      if (name) bill.name = name;
      if (lastPaid) bill.lastPaid = lastPaid;

      bill
        .save()
        .then(() => {
          res.json({ success: "Bill changed successfully." });
        })
        .catch((err) => {
          return res
            .status(400)
            .json({ msg: "There was a problem saving the bill." });
        });
    }
  });
});

// Delete bill
router.delete("/deleteBill/:id", authenticate, (req, res) => {
  Bill.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.status(400).json({ msg: "There was a problem deleting the bill." });
    }

    res.json({ success: "Bill deleted successfully. " + result });
  });
});

module.exports = router;
