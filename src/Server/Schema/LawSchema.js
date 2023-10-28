const mongoose = require('../utils/mongoDB');

const LawSchema = new mongoose.Schema({
    passed_by: mongoose.Schema.Types.ObjectId,
    description: String,
    title: String,
});

const Law = mongoose.model("Law", LawSchema);
module.exports = Law;