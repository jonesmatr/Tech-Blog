const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await User.create({ username, password });

        // Store the user's ID and logged-in status in the session
        req.session.user_id = newUser.id;
        req.session.logged_in = true;

        // Redirect to the dashboard
        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username, // Use username instead of email
            },
        });

        if (!user) {
            res.status(400).json({ message: 'Incorrect username or password!' }); // Updated message
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password!' }); // Updated message
            return;
        }

        req.session.user_id = user.id;
        req.session.logged_in = true;

        res.json({ user: user, message: 'You are now logged in!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
