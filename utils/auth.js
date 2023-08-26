// const withAuth = (req, res, next) => {
//   if (!req.session.logged_in) {
//     res.redirect('/login');
//   } else {
//     next();
//   }
// };

// const authenticateUser = async (username, password) => {
//   try {
//     const user = await User.findOne({ where: { username } });
//     if (user && user.validPassword(password)) {
//       return true;
//     }
//     return false;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// };

// module.exports = {
//   withAuth,
//   authenticateUser,
// };


const { User } = require('../models');

const withAuth = async (req, res, next) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/login');
        } else {
            // Check user's credentials using authenticateUser function
            const user = await User.findOne({ where: { id: req.session.user_id } });
            if (!user) {
                res.redirect('/login');
                return;
            }
            req.user = user; // Store the user object in the request for later use
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

module.exports = withAuth;
