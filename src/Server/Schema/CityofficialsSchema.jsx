const mongoose = require('mongoose');

const CityofficialsSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    dateAppointed: Date,
    endDate: Date,
    departmentID: mongoose.Schema.Types.ObjectId,
});

const Cityofficials = mongoose.model("Cityofficials", CityofficialsSchema);
module.exports = Cityofficials;