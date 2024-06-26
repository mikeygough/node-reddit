const { Schema, model } = require('mongoose');
const Populate = require('../util/autopopulate');

const postSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  upVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downVotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  voteScore: { type: Number },
});

postSchema
  .pre('findOne', Populate('author'))
  .pre('find', Populate('author'));

module.exports = model('Post', postSchema);
