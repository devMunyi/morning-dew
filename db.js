require("dotenv").config();

const mongoose = require("mongoose");

var mongoURL = process.env.mongoURL;


mongoose.connect(mongoURL, {});


var connection = mongoose.connection;

connection.on('error', ()=> {
    console.log("MongoDB Connection Failed!");
})

connection.on('connected', ()=> {
    console.log("MongoDb connection successful");
})

module.exports = mongoose;