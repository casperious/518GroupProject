const mongoose = require('../utils/mongoDB');

const MayorVotesSchema = new mongoose.Schema({
    userID: [mongoose.Schema.Types.ObjectId],
    candidateID: [mongoose.Schema.Types.ObjectId],
    yesCount: [Number],
});

const MayorVotes = mongoose.model("MayorVotes", MayorVotesSchema);
module.exports = MayorVotes;