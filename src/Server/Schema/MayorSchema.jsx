const mongoose = require('../utils/mongoDB');

const MayorSchema = new mongoose.Schema({
    dateAppointed: Date,
    endDate: Date,
    budget: Number,
    userId: mongoose.Schema.Types.ObjectId,
    sponsors: [mongoose.Schema.Types.ObjectId],
});

const Mayor = mongoose.model("Mayor", MayorSchema);
module.exports = Mayor;