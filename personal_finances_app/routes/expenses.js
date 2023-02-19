const express = require("express")
const router = express.Router();
const Expense = require("../models/Expenses")

router.get("/", (req, res) => {
    res.render("expenses")
});

router.post('/', async (req, res) => {
    // Get the data from the form
    let errors = [];
    const amount = req.body.amount;
    const category = req.body.category;
    const date = req.body.date;
  
    // Validate the form data
  
    if (!amount) {
        errors.push('Amount is required');
    }
    if (!category) {
        errors.push('Category is required');
    }
    if (!date) {
        errors.push('Date is required');
    }

    if (errors.length > 0) {
        res.status(400).render('expenses', {
        errors: errors,
        amount: amount,
        category: category,
        date: date
        });
        return;
    }
  
    // Save the expense to the database
    try {
      const expense = new Expense({
        amount: amount,
        category: category,
        date: date
      });
  
      await expense.save();
  
      // Redirect to the expenses page
      res.status(201).render('expenses', {successMessage: "Successfully saved to the DB"});
    } catch (error) {
      console.error(error);
      res.status(500).render('expenses', {errorMessage: "Error saving expense"});
    }
  });

module.exports = router