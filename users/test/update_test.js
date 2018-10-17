const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;
  beforeEach(done => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save().then(() => done());
  });

  const assertName = (opperation, done) => {
    opperation.then(() => User.find({})).then(users => {
      assert(users.length === 1);
      assert(users[0].name === 'Alex');
      done();
    });
  };

  it('instance update using set and save', done => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('instance update using update', done => {
    assertName(joe.update({ name: 'Alex' }), done);
  });

  it('update a model class', done => {
    assertName(User.updateMany({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('update one record in a model class', done => {
    assertName(User.updateOne({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('update a record in model class by id', done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });

  it('', done => {
    User.update({ name: 'Joe' }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.likes === 1);
        done();
      });
  });

  //it('', done => {done();});
});
