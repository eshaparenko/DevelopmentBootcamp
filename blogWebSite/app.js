const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectDB = require("./config/db")
const dotenv = require("dotenv");
const _ = require('lodash');
dotenv.config({path: __dirname + "/config/config.env"})
const Post = require('./models/Post');
const Content = require('./models/Content');

const homeStartingContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutContent = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni ";
const contactContent = "dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// Logging
if  (process.env.NODE_ENV === "dev") {
    app.use(morgan('dev'));
}

connectDB();

const about = new Content({
    title: "About",
    content: aboutContent
})

const contact = new Content({
    title: "Contact",
    content: contactContent
})

const defaultPost = new Post({
    title: "Welcome to the blog!",
    body: homeStartingContent
})


//Routes
app.get("/", (req, res)=>{
    Post.find((err, foundPosts)=> {
        if(foundPosts.length === 0) {
            Post.create(defaultPost, (err) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log("Successfully saved default item to the db");
                }
            })

            res.redirect("/");
        } else {
            res.render("home", {allPosts: foundPosts});
        };
    })
});

app.get("/contact", (req, res)=>{
    Content.countDocuments({title: "Contact"}, (err, count)=> {
        if  (count === 0) {
            const contact = Content.create({
                title: "Contact",
                content: contactContent
            })
            res.render("contact", {contactContent: contact.content});
        } else {
            Content.findOne({title: "Contact"}, (err, content)=> {
                res.render("contact", {contactContent: content.content});
            })
        }
    })
});

app.get("/about", (req, res)=>{
    Content.countDocuments({title: "About"}, (err, count)=> {
        if  (count === 0) {
            const about = Content.create({
                title: "About",
                content: aboutContent
            })
            res.render("about", {aboutContent: about.content});
        } else {
            Content.findOne({title: "About"}, (err, content)=> {
                res.render("contact", {contactContent: content.content});
            })
        }
    })
});

app.get("/compose", (req, res)=>{
    res.render("compose");
});

app.post("/compose", (req, res) => {
    const title = req.body.postTitle;
    const body = req.body.postBody;
    const newPost = new Post({
        title: title,
        body: body
    })
    newPost.save();
    res.redirect("/")
})

app.get("/posts/:postId", (req, res)=>{
    const postId = req.params.postId;
        Post.findOne({_id: postId}, (err, foundPost)=> {
            res.render("post", {post: foundPost});      
        }) 
    
});

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server started on port 3000")
});

