const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    title: String,
    body: String
})

module.exports = mongoose.model("Post", postsSchema);