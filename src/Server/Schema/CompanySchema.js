const mongoose = require('../utils/mongoDB');

const CompanySchema = new mongoose.Schema({
    candidatesSponsored: [mongoose.Schema.Types.ObjectId],
    name: String,
});

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;