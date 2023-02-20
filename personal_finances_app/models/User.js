const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path: __dirname + "/config.env"})


const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

//Swithcing on the encryption
const secret = process.env.SECRET;

module.exports = mongoose.model("User", userSchema);