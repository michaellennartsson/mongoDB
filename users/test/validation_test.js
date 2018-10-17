const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requiers a user name', done => {
    const user = new User({ name: undefined });
    const error = user.validateSync();
    const { message } = error.errors.name;
    assert(message === 'Name is required');
    done();
  });

  it('requires a users name longer than two characters', done => {
    const user = new User({ name: 'Al' });
    const error = user.validateSync();
    const { message } = error.errors.name;
    assert(message === 'Name must be longer than 2 characters');
    done();
  });

  it('disallows invalid records from being saved to data base', done => {
    const user = new User({ name: 'Al' });
    user.save().catch(error => {
      const { message } = error.errors.name;
      assert(message === 'Name must be longer than 2 characters');
      done();
    });
  });
});
