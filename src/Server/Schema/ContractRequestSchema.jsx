const mongoose = require('../utils/mongoDB');

const ContractRequestSchema = new mongoose.Schema({
    companyId: mongoose.Schema.Types.ObjectId,
    contractId: mongoose.Schema.Types.ObjectId,
    bid: Number,
});

const ContractRequest = mongoose.model("ContractRequest", ContractRequestSchema);
module.exports = ContractRequest;