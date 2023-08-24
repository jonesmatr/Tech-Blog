const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const dashboardRoutes = require('./dashboardRoutes'); // Include logoutRoutes here if it's related to user actions
const homeRoutes = require('./homeRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/dashboard', dashboardRoutes); // Include logoutRoutes here
router.use('/', homeRoutes);
