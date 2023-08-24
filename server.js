const express = require('express');
const session = require('express-session');
const path = require('path');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const dashboardRoutes = require('./controllers/api/dashboardRoutes');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static directory
app.use(express.static('public'));

const hbs = exphbs.create({ 
  helpers,
  defaultLayout:'main',
  partialsDir: path.join(__dirname, 'views/partials/')
});

// Handlebars setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Session setup
const sess = {
  secret: 'supersecret',  // Normally, this should be a complex string or pulled from .env
  cookie: { maxAge: 7200000 },  // 2 hours
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

// Activate specific routes
app.use('/', dashboardRoutes);

// Activate routes
app.use(routes);

// Error handling middleware (Add this part)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Connect to the database and then start the Express server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
