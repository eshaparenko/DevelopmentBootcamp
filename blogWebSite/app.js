const express = require("express");
const bodyParser = require("body-parser");
const _ = require('lodash');
// const utils = require(__dirname + "/utils.js");/

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni ";
const contactContent = "dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem";
let posts = [];

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Routes

app.get("/", (req, res)=>{
    res.render("home", {allPosts: posts});
    console.log(posts);
});

app.get("/contact", (req, res)=>{
    res.render("contact", {contactContent: contactContent});
});

app.get("/about", (req, res)=>{
    res.render("about", {aboutContent: aboutContent});
});

app.get("/compose", (req, res)=>{
    res.render("compose");
});

app.post("/compose", (req, res) => {
    let content = new Object();
    content.title = req.body.postTitle;
    content.body = req.body.postBody;
    posts.push(content);
    res.redirect("/")
})

app.get("/posts/:postName", (req, res)=>{
    const postTitle = req.params.postName;
    if (posts.length) {
        posts.forEach(post => {
            if (_.lowerCase(post.title)===(_.lowerCase(postTitle))){
                res.render("post", {p: post});
            } else {
                res.render("post");
            }
        });
    }
});






app.listen(3000, ()=>{
    console.log("Server started on port 3000")
});

