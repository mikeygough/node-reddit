/* Mongoose Connection */
const mongoose = require('mongoose');
assert = require('assert');

const url = 'mongodb://localhost/reddit-db';
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected successfully to database');
    // turn on for testing
    // db.close();
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection Error:', error);
});

mongoose.set('debug', true);

module.exports = mongoose.connection;
