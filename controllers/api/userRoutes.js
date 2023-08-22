const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/signup', async (req, res) => {
    // Signup logic here
    // ... 
});

router.post('/login', async (req, res) => {
    // Login logic here
    // ...
});

router.post('/logout', (req, res) => {
    // Logout logic here
    // ...
});

module.exports = router;
