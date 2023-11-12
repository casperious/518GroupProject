const mongoose = require('../utils/mongoDB');

const ComplaintSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    departmentId: mongoose.Schema.Types.ObjectId,
    complaint: String,
});

const Complaint = mongoose.model("Complaint", ComplaintSchema);
module.exports = Complaint;