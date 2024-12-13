const mongoose = require('mongoose');

const CodingQuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    functionSignature: { type: String, default: null },
    userCode: { type: String, default: null },
    aiCorrectCode: { type: String, default: null },
    aiFeedback: { type: String, default: null },

    // Follow-up questions
    followUps: [
        {
            questionText: { type: String, required: true },
            type: { type: String, required: true, enum: ['coding', 'theory'] },
            functionSignature: { type: String, default: null },
            userAnswer: { type: String, default: null }, // theory follow-ups
            userCode: { type: String, default: null },
            aiCorrectCode: { type: String, default: null },
            aiCorrectAnswer: { type: String, default: null }, // theory follow-ups
            aiFeedback: { type: String, default: null },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CodingQuestion', CodingQuestionSchema);
