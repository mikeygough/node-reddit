const Post = require('../models/post');

module.exports = (app) => {
  // INDEX
  app.get('/', (req, res) => {
    Post.find({})
      .lean()
      .then((posts) => res.render('posts-index', { posts }))
      .catch((err) => {
        console.log(err.message);
      });
  });

  // NEW
  app.get('/posts/new', (req, res) => {
    res.render('posts-new');
  });

  // SHOW
  app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id)
      .lean()
      .populate('comments')
      .then((post) => res.render('posts-show', { post }))
      .catch((err) => {
        console.log(err.message);
      });
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

  // SUBREDDIT SHOW
  app.get('/n/:subreddit', (req, res) => {
    Post.find({ subreddit: req.params.subreddit })
      .lean()
      .then((posts) => res.render('posts-index', { posts }))
      .catch((err) => {
        console.log(err);
      });
  });
};
