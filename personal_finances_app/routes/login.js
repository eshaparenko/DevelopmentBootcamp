const express = require("express")
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt-nodejs");

router.get("/", function(req, res){
    res.render("login");
});

router.post("/", function(req, res){
    const user = req.body.username;
    const password = req.body.password;
    

    User.findOne({
        email: user
    }, (err, foundUser) => {
        if  (err) {
            console.log(err);
        } else {
            if (foundUser) {
                bcrypt.compare(password, foundUser.password, (err, result) => {
                    if (result === true) {
                        res.render("secrets")
                    } else {
                        res.render("login", {error: "Password is incorrect"})
                    }
                })
            } else {
                res.render("login", {error: "User does not exist"})
            }
        }
    })
});

module.exports = router