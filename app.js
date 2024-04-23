// express ----------------------------------
const express = require('express');
const app = express();

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

// routes ----------------------------------
app.get('/', (req, res) => {
  res.render('home');
});

// server ----------------------------------
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

module.exports = app;
