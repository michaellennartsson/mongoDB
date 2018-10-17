const mongoose = require('mongoose');

before(done => {
  mongoose.connect(
    'mongodb://mongoDBcourse:Password1@ds115613.mlab.com:15613/mongo-db-course',
    { useNewUrlParser: true }
  );
  mongoose.connection
    .once('open', () => {})
    .on('error', error => console.warn('Warning', error));

  done();
});

// Runs before each test case
beforeEach(done => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  // Cleans all the users from users collection
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        // Callback for when droping users are done and ready
        // to run next test
        done();
      });
    });
  });
});
