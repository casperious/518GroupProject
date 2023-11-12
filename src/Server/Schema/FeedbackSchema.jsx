const mongoose = require('../utils/mongoDB');

const FeedbackSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    departmentId: mongoose.Schema.Types.ObjectId,
    feedback: String,
});

const Feedback = mongoose.model("feedback", FeedbackSchema);
module.exports = Feedback;