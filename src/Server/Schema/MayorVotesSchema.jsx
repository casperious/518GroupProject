const mongoose = require('../utils/mongoDB');

const YesVoteSchema = new mongoose.Schema({
    candidateId: mongoose.Schema.Types.ObjectId,
    votes: Number,
})

const MayorVotesSchema = new mongoose.Schema({
    userID: [mongoose.Schema.Types.ObjectId],
    candidateID: [mongoose.Schema.Types.ObjectId],
    yesCount: [{ candidateId: mongoose.Schema.Types.ObjectId, votes: Number }],
    startDate: Date,
    endDate: Date,
});

const MayorVotes = mongoose.model("MayorVotes", MayorVotesSchema);
module.exports = MayorVotes;