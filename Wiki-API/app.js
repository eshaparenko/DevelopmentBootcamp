const express = require("express");
const bodyparser = require("body-parser");
const connectDB = require("./config/db");
const Article = require('./models/Article');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
    extended: true
}))

connectDB();

app.route("/articles")

.get((req, res)=>{
    Article.find((err, content)=> {
        if  (err) {
            res.send(err);
        } else {
            res.send(content);
        }
    })
})

.post((req, res) => {
    const article = new Article({title: req.body.title, content: req.body.content});
    article.save((err)=> {
        if(!err) {
            res.send("Successfully added a new article")
        } else {
            res.send(err)
        }
    })
})

.delete((req, res)=> {
    Article.deleteMany((err)=>{
        if(!err) {
            res.send("Successfully deleted all articles")
        }
    })
});

app.route("/articles/:article")

.get((req, res)=> {
    Article.findOne({title: req.params.article}, (err, result) => {
        if(!err) {
            if(result) {
                res.send(result);
            } else {
                res.send("No articles found")
            }
        } else {
            es.send(err);
        }
    })
})

.put((req, res) => {
    Article.updateOne({title: req.params.article},
        {title: req.body.title, content: req.body.content},
        {overwrite: true}, (err)=> {
            if(!err) {
                res.send("Successfully updated")  
            }      
    })
})

.patch((req, res) => {
    Article.updateOne(
        {title: req.params.article},
        {$set: req.body}, (err)=> {
        if(!err) {
            res.send("Successfully updated selected article")
        }
    })
})
.delete((req, res)=> {
    const articleTitle = req.params.article;
    Article.findOne({title: articleTitle}, (err, result) => {
        if (result) {
            Article.deleteOne({title: articleTitle}, (err)=> {
                if(!err) {
                    res.send(`Successfully deleted article with title "${articleTitle}"`)
                } else {err}
            })
        } else {
            res.send("No article found to delete")
        }
    })
})


app.listen(process.env.PORT || 5000, ()=>{
    console.log("Server started on port 3000")
});
