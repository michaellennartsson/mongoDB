const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostScheam = new Schema({
  title: String,
  content: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ]
});

const BlogPost = mongoose.model('blogPost', BlogPostScheam);

module.exports = BlogPost;
