const mongoose = require('../utils/mongoDB');

const MayorSchema = new mongoose.Schema({
    stateIdNumber: String,
    departments: [String],
    cityOfficials: [mongoose.Schema.Types.ObjectId],
    laws: [mongoose.Schema.Types.ObjectId],
    sponsors: [String],
    dateAppointed: Date,
    dateEnd: Date,
    budget: Number,
    userId: mongoose.Schema.Types.ObjectId,
});

const Mayor = mongoose.model("Mayor", MayorSchema);
module.exports = Mayor;