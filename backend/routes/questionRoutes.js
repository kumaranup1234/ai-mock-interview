const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../middlewares/authMiddleware');
const questionController = require('../controllers/QuestionController');

router.post('/create-question', authenticateToken,questionController.createQuestion );


module.exports = router;
