// const router = require('express').Router();
// const userRoutes = require('./api/userRoutes');
// const postRoutes = require('./api/postRoutes');
// const homeRoutes = require('./homeRoutes');
// const dashboardRoutes = require('./api/dashboardRoutes');

// router.use('/api/users', userRoutes);
// router.use('/api/posts', postRoutes);
// router.use('/api/dashboard', dashboardRoutes);
// router.use('/', homeRoutes); 

// module.exports = router;


const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;