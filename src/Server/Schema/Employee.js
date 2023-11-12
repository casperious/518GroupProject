const mongoose = require('../utils/mongoDB');

const EmployeeSchema = new mongoose.Schema({
    dept_id: mongoose.Schema.Types.ObjectId,
    emp_id: mongoose.Schema.Types.ObjectId,
    jobDescription: String,
    
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;