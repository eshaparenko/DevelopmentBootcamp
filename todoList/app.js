const express = require("express");
const bodyparser = require("body-parser");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

let items = [];
let workItems = [];

app.get("/", (req, res)=>{
    let day = date.getDate();
    let weekDay = date.getWeekDay();
    res.render("list", {listTitle: day, weekday: weekDay, newListItems: items});
    });

app.post("/", (req, res) => {
    let item = req.body.newItem;
    if (item !== '') {
        if (req.body.list === "Work") {
            workItems.push(item)
            console.log(workItems)
            res.redirect("/work");
        } else {
            items.push(item)
            res.redirect("/");
        }
    }
})

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", newListItems: workItems})
})  

app.post("/work", (req, res) => {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about", (req, res) => {
    res.render("about");
})

app.listen(3000, ()=>{
    console.log("Server started on port 3000")
});
