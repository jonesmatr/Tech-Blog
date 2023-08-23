const router = require('express').Router();

const userRoutes = require('./api/userRoutes');
const postRoutes = require('./api/postRoutes');
const homeRoutes = require('./api/homeRoutes'); 

router.use('/api/users', userRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/comments', homeRoutes); 

module.exports = router;
