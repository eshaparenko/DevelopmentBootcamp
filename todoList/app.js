const express = require("express");
const bodyparser = require("body-parser");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

// Connection URI
// const uri = "mongodb://localhost:27017";
const uri = "mongodb+srv://eugene_sh:NNsskSDKH2L8zPDP@cluster0.m6scc8y.mongodb.net";

const dbName = "todolistDB";
mongoose.set('strictQuery', false);
mongoose.connect(`${uri}/${dbName}`);

let foundItems = [];

const itemsSchema = new mongoose.Schema({
    name: String
})

const Item = mongoose.model("Item", itemsSchema);

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
});

const List = mongoose.model("List", listSchema)

const item1 = new Item({
    name: "Welcome to your todo list!"
})

const item2 = new Item({
    name: "Hit the + button to add new item."
})

const item3 = new Item({
    name: "Hit this to delete this item item."
})

const defaultItems = [item1, item2, item3];

app.get("/", (req, res)=>{
    Item.find((err, foundItems)=> {
            if(foundItems.length === 0) {
                Item.insertMany(defaultItems, (err)=> {
                    if  (err) {
                        console.log(err)
                    } else {
                        console.log("Successfully saved default item to the db");
                    }
                })
                res.redirect("/")
                
            } else {
                res.render("list", {listTitle: "Today",newListItems: foundItems});
            };
    })
})

app.post("/", (req, res) => {
    let itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        name: itemName
    })

    if (listName === "Today") {
        item.save();
        res.redirect("/"); 
    } else {
        List.findOne({name: listName}, (err, foundList)=> {
            if(!err) {
                foundList.items.push(item);
                foundList.save();
                res.redirect("/" + listName);
            }
        })  
    }
    
})

app.post("/delete", (req, res)=>{
    const checkedItem = req.body.checkbox;
    const listName = req.body.listName;

    if  (listName === "Today") {
        Item.findByIdAndRemove(checkedItem, (err)=> {
            if(err) {
                console.log(err)
            } else {
                console.log("Successfully deleted " + checkedItem)
            }
        })
        res.redirect("/");
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItem}}}, (err, foundList) => {
            if  (!err) {
                res.redirect("/" + listName)
            }
        })
    }
})

app.get("/:customListName", (req, res) => {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}, (err, foundList)=> {
        if(!err) {
            if(!foundList) {
                const list = new List({
                    name: customListName,
                    items: defaultItems
                })
            
                list.save();
                res.redirect("/" + customListName)
            } else{
                res.render("list", {listTitle: customListName, newListItems: foundList.items})
            }
        }
    })
})  

app.get("/about", (req, res) => {
    res.render("about");
})

let port = process.env.PORT;
if  (port === null || port === "" || port === undefined) {
    port = 3000;
}

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
});
