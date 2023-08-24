// const express = require('express');
// const router = express.Router();

// // Define the /logout route
// router.post('/logout', (req, res) => {
//     if (req.session.logged_in) {
//         req.session.destroy(() => {
//             res.redirect('/'); // Redirect to the home page
//         });
//     } else {
//         res.status(404).end();
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();

// Define the /logout route handler
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error logging out');
        } else {
            res.redirect('/'); // Redirect to the home page or any other page
        }
    });
});

module.exports = router;
