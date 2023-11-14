const mongoose = require('../utils/mongoDB');

const ContractSchema = new mongoose.Schema({

    companyID: mongoose.Schema.Types.ObjectId,
    name: String,
    status: String,
    departmentID: mongoose.Schema.Types.ObjectId,
    budget: Number,
    description: String,
    duration: Date,
    supervisor: mongoose.Schema.Types.ObjectId,
});

const Contract = mongoose.model("Contract", ContractSchema);
module.exports = Contract;