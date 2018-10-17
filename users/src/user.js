const mongoose = require('mongoose');
const PostSchema = require('./post');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters'
    },
    required: [true, 'Name is required']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blogPost'
    }
  ]
});

UserSchema.virtual('postCount').get(function() {
  // Not use fat arrow function due to using 'this' keyword
  return this.posts.length;
});

// Middleware to be executed before all remove
UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost');

  // this === user, e.g. Joe
  BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
