const mongoose = require('mongoose');

const MockInterviewSchema = new mongoose.Schema({
    jobPosition: { type: String, required: true },
    jobDesc: { type: String, required: true },
    jobExperience: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } ,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MockInterview', MockInterviewSchema);
