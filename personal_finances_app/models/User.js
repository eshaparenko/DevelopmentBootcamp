const mongoose = require("mongoose");
const encrypt = require('mongoose-encryption');
const dotenv = require("dotenv");
dotenv.config({path: __dirname + "/config.env"})


const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

//Swithcing on the encryption
const secret = process.env.SECRET;
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ['password'] });

module.exports = mongoose.model("User", userSchema);