const express = require('express');
const router = express.Router();
const { Post } = require('../../models');

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
        const post = await Post.findByPk(req.params.id);
        if (post) {
            res.render('post', { post: post.get({ plain: true }) });
        } else {
            res.status(404).send('Post not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
