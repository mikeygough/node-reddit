const Post = require('../models/post');

module.exports = (app) => {
  // NEW
  app.get('/posts/new', (req, res) => {
    res.render('posts-new');
  });

  // CREATE
  app.post('/posts/new', async (req, res) => {
    try {
      // create post
      const post = new Post(req.body);
      // save post
      await post.save();
      res.redirect('/');
    } catch (error) {
      console.error('Error saving post:', error);
      // handle error appropriately
      res.status(500).send('Error saving post');
    }
  });
};
