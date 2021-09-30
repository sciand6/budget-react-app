const Expense = require("../models/Expense");
const express = require("express");
const router = express.Router();
mongo = require("mongodb");
const authenticate = require("../middleware/authenticate");

// ** CRUD BUDGET EXPENSES **

// Get expenses
router.get("/getExpenses", authenticate, (req, res) => {
  Expense.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      return res.status(400).json({ msg: err });
    });
});

// Create expense
router.post("/createExpense", authenticate, (req, res) => {
  let { name, budget, spent } = req.body;

  const expense = new Expense({
    name,
    budget,
    spent,
  });

  expense
    .save()
    .then(() => {
      res.json({ success: "Expense saved successfully." });
    })
    .catch((err) => {
      return res.status(400).json({ msg: err });
    });
});

// Edit expense spent
router.put("/editExpenseSpent/:id", authenticate, (req, res) => {
  let { spent } = req.body;

  Expense.findById(req.params.id, (err, expense) => {
    if (err) {
      return res.status(400).json({ msg: err });
    } else {
      expense.spent = spent;

      expense
        .save()
        .then((expense) => {
          return res.json(expense);
        })
        .catch((err) => {
          return res.status(400).json({ msg: err });
        });
    }
  });
});

// Edit expense name
router.put("/editExpenseName/:id", authenticate, (req, res) => {
  let { name } = req.body;

  Expense.findById(req.params.id, (err, expense) => {
    if (err) {
      return res.status(400).json({ msg: "Error getting the expense." });
    } else {
      expense.name = name;

      expense
        .save()
        .then((expense) => {
          return res.json(expense);
        })
        .catch((err) => {
          return res
            .status(400)
            .json({ msg: "Error saving the expense name." });
        });
    }
  });
});

// Delete expense
router.delete("/deleteExpense/:id", authenticate, (req, res) => {
  Expense.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      res
        .status(400)
        .json({ msg: "There was a problem deleting the expense." });
    }

    res.json({ success: "Expense deleted successfully. " + result });
  });
});

// Set spent for expenses to 0
router.get("/resetExpenses", authenticate, async (req, res) => {
  const update = {
    $set: {
      spent: 0,
    },
  };

  const result = await Expense.updateMany({}, update);
});

module.exports = router;
