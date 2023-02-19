const express = require("express")
const router = express.Router();
const Expense = require("../models/Expenses")

router.get('/', async (req, res) => {
    try {
      Expense.find({}, (err, expenses) => {
        res.render('expenses-list', { expenses });
      });
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = router