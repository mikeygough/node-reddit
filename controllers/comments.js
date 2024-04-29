const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = (app) => {
  // CREATE
  app.post('/posts/:postId/comments', (req, res) => {
    if (req.user) {
      const userId = req.user._id;
      const comment = new Comment(req.body);
      comment.author = userId;

      comment
        .save()
        .then(() => Post.findById(req.params.postId))
        .then((post) => {
          post.comments.unshift(comment);
          return post.save();
        })
        .then(() => res.redirect('/'))
        .catch((err) => {
          console.log(err);
        });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });
};
