// const express = require('express');
// const router = express.Router();
// const { Post, User, Comment } = require('../../models');

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
//             res.render('post', { post });
//         } else {
//             res.status(404).send('Post not found');
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });

// const { Post, User, Comment } = require('../../models');

// router.get('/post/:id', async (req, res) => {
//     try {
//         const postData = await Post.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username']
//                 },
//                 {
//                     model: Comment,
//                     include: {
//                         model: User,
//                         attributes: ['username']
//                     }
//                 }
//             ]
//         });

//         if (!postData) {
//             res.status(404).json({ message: 'No post found with this ID' });
//             return;
//         }

//         const post = postData.get({ plain: true });
//         res.render('postDetails', { post });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });


// // Add the routes for signup and login pages
// router.get('/signup', (req, res) => {
//     res.render('signup');
// });

// router.get('/login', (req, res) => {
//     res.render('login');
// });

// module.exports = router;


const express = require('express');
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
        console.log('Date:', post.date_created);
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

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;
