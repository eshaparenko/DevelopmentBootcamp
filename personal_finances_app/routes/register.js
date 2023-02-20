const express = require("express")
const md5 = require("md5");
const router = express.Router();
const User = require("../models/User");

router.get("/", function(req, res){
    res.render("register");
});

router.post("/", function(req, res){
    const newUser = new User({
        email: req.body.username,
        password: md5(req.body.password)
    })
    newUser.save((err) => {
        if  (err) {
            console.log(err)
        } else {
            res.render("secrets")
        }
    });  
});

module.exports = router