const mongoose = require('../utils/mongoDB');

const ContractRequests= new mongoose.Schema({
    companyId: mongoose.Schema.Types.ObjectId,
    contractId: mongoose.Schema.Types.ObjectId ,
    bid: Number,
});

const ContractRequest = mongoose.model("ContractRequest", ContractRequests);
module.exports = ContractRequest;
