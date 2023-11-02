const mongoose = require('../utils/mongoDB');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    emailId: String,

});

const User = mongoose.model("User", UserSchema);
module.exports = User;