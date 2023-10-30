const mongoose = require('../utils/mongoDB');

const ContractSchema = new mongoose.Schema({
    companyID: mongoose.Schema.Types.ObjectId,
    name: String,
    status: { Assigned: "Assigned", Pending: "Pending" },
});

const Contract = mongoose.model("Contract", ContractSchema);
module.exports = Contract;