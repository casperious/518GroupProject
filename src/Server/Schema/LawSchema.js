const mongoose = require('../utils/mongoDB');

const LawSchema = new mongoose.Schema({
    passedBy: mongoose.Schema.Types.ObjectId,
    description: String,
    title: String,
    state: { Active: "Active", Pending: "Pending", Rejected: "Rejected" },
    departmentId: mongoose.Schema.Types.ObjectId,
});

const Law = mongoose.model("Law", LawSchema);
module.exports = Law;