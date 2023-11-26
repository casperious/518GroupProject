const mongoose = require('../utils/mongoDB');

const AlertSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    departmentId: mongoose.Schema.Types.ObjectId,
    Announcement: String,
});

const Alert = mongoose.model("alert", AlertSchema);
module.exports = Alert;