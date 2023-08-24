const express = require('express');
const router = express.Router();
const logoutRoutes = require('./logoutRoutes');

// Route for rendering the dashboard
router.get('/dashboard', (req, res) => {
  // Handle the request and render a view or return data
  res.render('dashboard');
});

// Route for handling logout
router.post('/api/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.sendStatus(204); // Send a success status with no content
    });
  } else {
    res.status(404).end();
  }
});

router.use('/logout', logoutRoutes);

module.exports = router;
