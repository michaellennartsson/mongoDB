const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const app = require('../../app');

const Driver = mongoose.model('drivers');

describe('Drivers controller', () => {
  // @TODO: Drop all drivers before run test
  /*beforeEach(done => {
    const { drivers } = mongoose.connection.collections;
    drivers
      .drop()
      .then(done => done())
      .catch(done => done());
  }); */

  it('POST to /api/drivers creates a new driver', function(done) {
    Driver.count().then(count => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com ' })
        .end((err, res) => {
          Driver.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  // Remember to manually clear database before testing
  it('Put to /api/drivers/id can update a record', done => {
    const driver = new Driver({ email: 'test_put@test.com', driving: false });
    const updatedParams = { driving: true };
    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send(updatedParams)
        .end(() => {
          Driver.findOne({ email: 'test_put@test.com' }).then(driver => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  // Remember to manually clear database before testing
  it('Delete to /api/drivers/:id can delete a record', done => {
    const driver = new Driver({ email: 'test_delete@test.com' });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: 'test_delete@test.com' }).then(driver => {
            assert(driver === null);
            done();
          });
        });
    });
  });

  it('GET to /api/drivers finds drivers i a certain location', done => {
    const sthlmDriver = new Driver({
      email: 'sthlm@test.com',
      geometry: { type: 'Point', coordinates: [18.06324, 59.334591] }
    });
    const gbgDriver = new Driver({
      email: 'gbg@test.com',
      geometry: { type: 'Point', coordinates: [11.97456, 57.70887] }
    });

    Promise.all([sthlmDriver.save(), gbgDriver.save()]).then(() => {
      request(app)
        .get('/api/drivers?lng=18&lat=59')
        .end((err, response) => {
          assert(response.body.length === 1);
          assert(response.body[0].email === 'sthlm@test.com');
          done();
        });
    });
  });
});
