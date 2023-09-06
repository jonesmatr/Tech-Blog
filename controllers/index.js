const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const postRoutes = require('./api/postRoutes');
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');
const dashboardRoutes = require('./api/dashboardRoutes');

router.use('/api/users', userRoutes);
router.use('/api/posts', postRoutes);
router.use('/api/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes); 

module.exports = router;

