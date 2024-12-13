const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {authenticateToken} = require('../middlewares/authMiddleware');

// User Registration
router.post('/signup', authController.register);

// User Login
router.post('/login', authController.login);

router.put('/change-password',authenticateToken,authController.changePassword);

module.exports = router;