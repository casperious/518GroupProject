const mongoose = require('mongoose');

const CityofficialsSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    stateIdNumber: String,
    emailId: String,
    department: String,
    budget: Number,
    employees: [mongoose.Schema.Types.ObjectId],
    laws: [mongoose.Schema.Types.ObjectId],
    contracts: [String],
    feedback: String,
    dateAppointed: Date,
    dateEnd: Date,
    userId: mongoose.Schema.Types.ObjectId,
});

const Cityofficials = mongoose.model("Cityofficials", CityofficialsSchema);
module.exports = Cityofficials;