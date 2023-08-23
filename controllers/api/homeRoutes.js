// const express = require('express');
// const router = express.Router();
// const { Post } = require('../../models');

// router.get('/', (req, res) => {
//     if (req.session.logged_in) {
//         res.redirect('/dashboard');
//         return;
//     }
//     res.render('login', { layout: 'main', logged_in: req.session.logged_in });
// });

// router.get('/', async (req, res) => {
//     try {
//         const postData = await Post.findAll();
//         const posts = postData.map(post => post.get({ plain: true }));
//         res.render('home', { posts });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });

// router.get('/post/:id', async (req, res) => {
//     try {
//         const post = await Post.findByPk(req.params.id);
//         if (post) {
//             res.render('post', { post: post.get({ plain: true }) });
//         } else {
//             res.status(404).send('Post not found');
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });

// module.exports = router;
const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
    });

    const users = userData.map((user) => user.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  // If the user is not logged in, it renders the login page
  res.render('login');
});

module.exports = router;
