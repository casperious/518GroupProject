const mongoose = require('../utils/mongoDB');

const MayorSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    stateIdNumber: String,
    emailId: String,
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