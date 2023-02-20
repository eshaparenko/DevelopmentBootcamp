const express = require("express")
const router = express.Router();
const User = require("../models/User");

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
                if (foundUser.password === password) {
                    res.render("secrets")
                } else {
                    res.render("login", {error: "Password is incorrect"})
                }
            }
        }
    })
});

module.exports = router