const mongoose = require('../utils/mongoDB');

const LawSchema = new mongoose.Schema({
    passedBy: mongoose.Schema.Types.ObjectId,
    description: String,
    title: String,
    state: String,
    departmentId: mongoose.Schema.Types.ObjectId,
});

const Law = mongoose.model("Law", LawSchema);
module.exports = Law;