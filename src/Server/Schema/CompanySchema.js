const mongoose = require('../utils/mongoDB');

const CompanySchema = new mongoose.Schema({
    sponsoring: mongoose.Schema.Types.ObjectId,
    name: String,
    title: String,
});

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;