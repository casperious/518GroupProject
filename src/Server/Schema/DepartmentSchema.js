const mongoose = require('../utils/mongoDB');

const DepartmentSchema = new mongoose.Schema({
    department_name: String,
    created_by: mongoose.Schema.Types.ObjectId,
    city_officials: [mongoose.Schema.Types.ObjectId],
    budget: Number,
    rules: String,
});

const Department = mongoose.model("Department", DepartmentSchema);
module.exports = Department;