const express = require("express")
const bcrypt = require("bcrypt-nodejs");
const router = express.Router();
const User = require("../models/User");
const saltRounds = 10;

router.get("/", function(req, res){
    res.render("register");
});

router.post("/", function(req, res){
    bcrypt.hash(req.body.password, null, null, (err, hash) => {
        const newUser = new User({
            email: req.body.username,
            password: hash
        })
        newUser.save((err) => {
            if  (err) {
                console.log(err)
            } else {
                res.render("secrets")
            }
        });  
    })
});

module.exports = router