const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path: __dirname + "/config.env"})
const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(`${uri}/${dbName}`);
        console.log(`MongoDB Connected`);
    } catch(err) {
        console.error(err);
        process.exit(1)
    }
}

module.exports = connectDB