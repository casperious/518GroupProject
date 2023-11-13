const mongoose = require('../utils/mongoDB');

const EmployeeSchema = new mongoose.Schema({
    dept_id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
    jobDescription: String,
    contract_id: mongoose.Schema.Types.ObjectId,
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;