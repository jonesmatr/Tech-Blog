const express = require('express');
const router = express.Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');




router.post('/create', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id  // Assuming the user ID is stored in session
        });

        res.redirect('/dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/edit/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });

        if (!updatedPost) {
            res.status(404).json({ message: 'No post found with this ID!' });
            return;
        }

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    console.log("Inside /edit/:id", req.params.id);
    try {
      const postData = await Post.findByPk(req.params.id);
  
      if (postData) {
        const post = postData.get({ plain: true });
        res.render('edit-post', { post, loggedIn: req.session.loggedIn });
      } else {
        res.status(404).json({ message: 'No post found with this ID!' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

router.delete('/delete/:id', withAuth, async (req, res) => {
    try {
        const postToDelete = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });

        if (!postToDelete) {
            res.status(404).json({ message: 'No post found with this ID!' });
            return;
        }

        res.status(200).json(postToDelete);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        if (postData) {
            const post = postData.get({ plain: true });
            res.status(200).json(post); // Respond with JSON
        } else {
            res.status(404).json({ message: 'No post found with this ID!' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/:id/comment', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,  // Assuming the user ID is stored in session
            post_id: req.params.id
        });

        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;


//Edit button is still not working in the dashboard