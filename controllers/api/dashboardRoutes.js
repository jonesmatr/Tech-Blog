const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    // Handle the request and render a view or return data
    res.render('dashboard');
});

module.exports = router;
