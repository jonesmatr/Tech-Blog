const express = require('express');
const router = express.Router();
const logoutRoutes = require('./logoutRoutes');
const { User } = require('../../models');
const withAuth = require('../../utils/auth');
const { Post } = require('../../models');


// Route for rendering the dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    try {
  // Handle the request and render a view or return data
  res.render('dashboard');
} catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Function to handle new post submission
router.post('/api/posts', withAuth, async (req, res) => {
  try {
    const { title, content } = req.body;

    // Create a new post
    const newPost = await Post.create({
      title,
      content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
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
