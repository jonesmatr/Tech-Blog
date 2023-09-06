
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const { Post, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('home', { posts });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this ID' });
            return;
        }

        const post = postData.get({ plain: true });
        console.log('Comments:', post.comments);
        res.render('post', { post });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Routes for signup and login pages
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    try {

        // Check if username already exists
        const existingUser = await User.findOne({ where: { username: req.body.username } });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await User.create({
            username: req.body.username,
            password: hashedPassword,
        });

        // You can also perform additional actions after successful sign-up

        res.redirect('/login'); // Redirect to the login page
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Username already taken' });
        }
        res.status(500).json({ message: 'An error occurred during sign-up.' });
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/api/comments', async (req, res) => {
    try {
        const { postId, text } = req.body;

        // Check if the user is logged in
        if (!req.session.logged_in) {
            res.status(403).json({ message: 'You must be logged in to leave a comment.' });
            return;
        }

        // Create a new Comment
        const newComment = await Comment.create({
            content: text,
            user_id: req.session.user_id,
            post_id: postId,
        });
        res.redirect(`/post/${postId}`);
        // res.status(200).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/logout', (req, res) => {
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
