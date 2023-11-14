const mongoose = require('../utils/mongoDB');

const ContractSchema = new mongoose.Schema({
    
   
    status: String,
    departmentID: mongoose.Schema.Types.ObjectId,
    budget: Number,
    description: String
   
});

const Contract = mongoose.model("Contract", ContractSchema);
module.exports = Contract;