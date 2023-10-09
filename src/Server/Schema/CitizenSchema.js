const mongoose = require('../utils/mongoDB');

const CitizenSchema = new mongoose.Schema({
    userId : String,
    password : String,
    firstName : String,
    lastName : String,
    lawsVoted : [mongoose.Schema.Types.ObjectId],
    MayerVoted : mongoose.Schema.Types.ObjectId,
    Feedback : [String],
    stateID :  Number,
    emailID : String,
});

const Citizens = mongoose.model("Citizens", CitizenSchema);
module.exports = Citizens;