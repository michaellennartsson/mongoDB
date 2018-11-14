const assert = require('assert');
const request = require('supertest');

const app = require('../app');

describe('The Express application', () => {
  it('handles a GET request to /api', function(done) {
    request(app)
      .get('/api')
      .end((err, res) => {
        assert(res.body.hi === 'there');
        done();
      });
  });
});
