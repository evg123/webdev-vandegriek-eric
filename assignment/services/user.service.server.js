
module.exports = function (app) {

  var USERS = require('./mocks/user.mock');

  app.post('/api/user', createUser);
  app.get('/api/user', findUserCredRouter);
  app.get('/api/user/:userId', findUserById);
  app.put('/api/user/:userId', updateUser);
  app.delete('/api/user/:userId', deleteUser);

  function createUser(req, res) {
    var user = req.body;
    user._id = Math.floor(Math.random() * 1024).toString();
    USERS.push(user);
    res.json(user);
  }

  function findUserCredRouter(req, res) {
    if (req.query.password) {
      return findUserByCredentials(req, res);
    }
    return findUserByUsername(req, res);
  }

  function findUserByUsername(req, res) {
    const username = req.query.username;

    for (var x = 0; x < USERS.length; x++) {
      if (USERS[x].username === username) {
        res.json(USERS[x]);
        return;
      }
    }

    // not found
    res.json(null);
  }

  function findUserByCredentials(req, res) {
    const username = req.query.username;
    const password = req.query.password;

    for (var x = 0; x < USERS.length; x++) {
      if (USERS[x].username === username && USERS[x].password === password) {
        res.json(USERS[x]);
        return;
      }
    }

    // not found
    res.json(null);
  }

  function findUserById(req, res) {
    const userId = req.query.userId;

    for (var x = 0; x < USERS.length; x++) {
      if (USERS[x]._id === userId) {
        res.json(USERS[x]);
        return;
      }
    }

    // not found
    res.json(null);
  }

  function updateUser(req, res) {
    const userId = req.query.userId;
    var user = req.body;

    for (var x = 0; x < USERS.length; x++) {
      if (USERS[x]._id === userId) {
        user._id = userId;
        USERS[x] = user;
        res.json(USERS[x]);
        return;
      }
    }

    // not found
    res.json(null);
  }

  function deleteUser(req, res) {
    const userId = req.query.userId;

    for (var x = 0; x < USERS.length; x++) {
      if (USERS[x]._id === userId) {
        res.json(USERS[x]);
        USERS.splice(x, 1);
        return;
      }
    }

    // not found
    res.json(null);
  }
};
