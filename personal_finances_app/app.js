const express = require('express');
const bodyparser = require('body-parser');
const connectDB = require("./config/db");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

connectDB();

const initialRouter = require("./routes/initial");
app.use('/initial', initialRouter);
const loginRouter = require("./routes/login");
app.use('/login', loginRouter);
const registerRouter = require("./routes/register");
app.use('/register', registerRouter);
const homeRouter = require("./routes/home");
app.use('/', homeRouter);
const expensesListRouter = require("./routes/expenses-list");
app.use('/expenses-list', expensesListRouter);
const expensesRouter = require("./routes/expenses");
app.use('/expenses', expensesRouter);
const incomeRouter = require("./routes/income");
app.use('/income', incomeRouter);
const reportsRouter = require("./routes/reports");
app.use('/reports', reportsRouter);
const secretsRouter = require("./routes/secrets");
app.use('/secrets', secretsRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});
