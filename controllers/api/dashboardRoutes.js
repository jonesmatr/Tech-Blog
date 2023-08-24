const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    // Handle the request and render a view or return data
    res.render('dashboard');
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.redirect('/');
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
