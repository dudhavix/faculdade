require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.ATLAS_URI).catch(error => {
    console.log(error);
});
mongoose.Promise = global.Promise;

module.exports = mongoose;