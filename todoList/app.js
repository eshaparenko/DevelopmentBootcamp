const express = require("express");
const bodyparser = require("body-parser");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

let items = [];
let workItems = [];

app.get("/", (req, res)=>{
    let today = new Date();
    let currentDay = today.getDay();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let day = today.toLocaleDateString("en-US", options)
    let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayOfTheWeek = weekDays[currentDay];


    res.render("list", {listTitle: day, weekday: dayOfTheWeek, newItems: items});
    });

app.post("/", (req, res) => {
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
})

app.get("/work", (req, res) => {
    app.render("list", {listTitle: "Work List", newListItems: workItems})
})

app.post("/work", (req, res) => {
    app.render("list", {listTitle: "Work List", newListItems: workItems})
})

app.get("/about", (req, res) => {
    app.render("about");
})

app.listen(3000, ()=>{
    console.log("Server started on port 3000")
});
