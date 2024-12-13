const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    mockIdRef: { type: mongoose.Schema.Types.ObjectId, ref: 'MockInterview', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    longQuestions: [
        {
            questionText: { type: String, required: true },
            userAnswer: { type: String, required: true },
            aiCorrectAnswer: { type: String, required: true },
            aiFeedback: { type: String, required: true },
        },
    ],

    codingQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CodingQuestion' }],

    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Question', QuestionSchema);
