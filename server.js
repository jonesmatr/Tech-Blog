const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const dashboardRoutes = require('./controllers/api/dashboardRoutes');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const logoutRoutes = require('./controllers/api/logoutRoutes');
const postRoutes = require('./controllers/api/postRoutes');
const helpers = require('./utils/helpers');
const { format_date } = require('./utils/helpers');



const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static directory
app.use(express.static('public'));

// Session setup
const sess = {
  secret: 'supersecret',
  cookie: { maxAge: 7200000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({ db: sequelize }),
};
app.use(session(sess));

// Handlebars setup
const hbs = exphbs.create({ 
  helpers: {
    format_date
  },
  defaultLayout:'main',
  partialsDir: path.join(__dirname, 'views/partials/')
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use the logoutRoutes router
app.use(logoutRoutes);

// Activate specific routes
app.use('/', dashboardRoutes);

// Activate postRoutes
app.use('/api/posts', postRoutes);

// Activate commentsRoutes
const Comment = require('./models/Comment'); // Make sure to import your Comment model

app.post('/api/comments', async (req, res) => {
  const { postId, text } = req.body; // Destructure postId and text from req.body
  
  if (!postId || !text) {
    return res.status(400).json({ error: 'Post ID and text are required' });
  }
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'You must be logged in to comment' });
  }
  try {
    // Create the comment
    const newComment = await Comment.create({
      post_id: postId, // Note: the key should match your database schema
      content: text,  // Note: the key should match your database schema
      user_id: req.session.userId // Assumes you have user ID stored in session
    });

    res.status(201).json(newComment); // Respond with the newly created comment
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});



// Activate routes
app.use(routes);

// Error handling middleware (Add this part)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Define the /api/logout route
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error logging out');
    } else {
      res.sendStatus(204); // Send a success status with no content
    }
  });
});

// Connect to the database and then start the Express server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
