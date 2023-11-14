const mongoose = require('../utils/mongoDB');

const CompanySignup = new mongoose.Schema({
    id : mongoose.Schema.Types.ObjectId,
    name: String,
    email : String,
    password :String,
   
});

const Company = mongoose.model("Company", CompanySignup);
module.exports = Company
;