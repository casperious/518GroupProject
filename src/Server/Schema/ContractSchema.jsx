const mongoose = require('../utils/mongoDB');

const ContractSchema = new mongoose.Schema({
<<<<<<< HEAD
    
   
    status: String,
    departmentID: mongoose.Schema.Types.ObjectId,
    budget: Number,
    description: String
   
=======
    companyID: mongoose.Schema.Types.ObjectId,
    name: String,
    status: { Assigned: "Assigned", Pending: "Pending" },
    departmentID: mongoose.Schema.Types.ObjectId,
    budget: Number,
    description: String,
    duration: Date,
    supervisor: mongoose.Schema.Types.ObjectId,
>>>>>>> 4dae6b3699fd74b3a06395bbeeb1fdfb3fc11a55
});

const Contract = mongoose.model("Contract", ContractSchema);
module.exports = Contract;