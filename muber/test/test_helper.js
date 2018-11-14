const mongoose = require('mongoose');

// Runs before each test case
beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop(() => {
    drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' });
    done();
  });
});
