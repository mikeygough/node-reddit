// dotenv
require('dotenv').config();

// cookieParser
const cookieParser = require('cookie-parser');

// custom middleware
const checkAuth = require('./middleware/checkAuth');

// express ----------------------------------
const express = require('express');
const app = express();
app.use(cookieParser());
app.use(checkAuth);
app.use(express.static('public'));

// handlebars ----------------------------------
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      ifEquals: function (arg1, arg2, options) {
        return arg1 === arg2
          ? options.fn(this)
          : options.inverse(this);
      },
    },
  })
);
app.set('view engine', 'handlebars');

// mongoose & database ----------------------------------
require('./data/reddit-db');

// body-parser ----------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// method-override ----------------------------------
const methodOverride = require('method-override');
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

// routes ----------------------------------
// refactored into controllers
require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);

// server ----------------------------------
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

module.exports = app;
