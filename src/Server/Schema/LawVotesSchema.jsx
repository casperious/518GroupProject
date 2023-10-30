const mongoose = require('../utils/mongoDB');

const LawVotesSchema = new mongoose.Schema({
    userID: [mongoose.Schema.Types.ObjectId],
    lawID: mongoose.Schema.Types.ObjectId,
    yesCount: Number,
    noCount: Number,
});

const LawVotes = mongoose.model("LawVotes", LawVotesSchema);
module.exports = LawVotes;