const express = require('express');
const { register, login, getAllUsers, getUserById } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/users', authenticateToken, getAllUsers);
router.get('/users/:id', authenticateToken, getUserById);

module.exports = router;
