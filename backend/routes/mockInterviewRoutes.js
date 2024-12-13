const express = require('express');
const mockInterviewController = require("../controllers/mockInterviewController");
const {authenticateToken} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/create-mock',authenticateToken, mockInterviewController.createMock);

router.delete('/delete-mock/:mockId',authenticateToken, mockInterviewController.deleteMock);

router.get('/get-all',authenticateToken, mockInterviewController.getMock);

module.exports = router;