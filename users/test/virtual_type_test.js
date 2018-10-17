const assert = require('assert');
const User = require('../src/user');

describe('Virtual typers', () => {
  it('post counts returns number of posts', done => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'First Post' }]
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.postCount === 1);
        done();
      });
  });
});
