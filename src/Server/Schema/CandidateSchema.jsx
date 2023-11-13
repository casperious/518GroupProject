const mongoose = require('../utils/mongoDB');

const CandidateSchema = new mongoose.Schema({
    userID: mongoose.Schema.Types.ObjectId,
    sponsors: [mongoose.Schema.Types.ObjectId],
    policies: [String],
});

const Candidate = mongoose.model("Candidate", CandidateSchema);
module.exports = Candidate;