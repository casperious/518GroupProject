const mongoose = require('../utils/mongoDB');

const DepartmentSchema = new mongoose.Schema({
    name: String,
    createdBy: mongoose.Schema.Types.ObjectId,
    cityOfficialID: mongoose.Schema.Types.ObjectId,
    budget: Number,
    rules: String,
});

const Department = mongoose.model("Department", DepartmentSchema);
module.exports = Department;