
module.exports = function (app) {

  var UserModel = require("../model/user/user.model.server");

  app.post('/api/user', createUser);
  app.get('/api/user', findUserCredRouter);
  app.get('/api/user/:userId', findUserById);
  app.put('/api/user/:userId', updateUser);
  app.delete('/api/user/:userId', deleteUser);

  function createUser(req, res) {
    var user = req.body;
    UserModel.createUser(user)
      .then(function (data) {
        res.json(data);
      });
  }

  function findUserCredRouter(req, res) {
    if (req.query.password) {
      return findUserByCredentials(req, res);
    }
    return findUserByUsername(req, res);
  }

  function findUserByUsername(req, res) {
    const username = req.query.username;
    UserModel.findUserByUsername(username)
      .then(function (data) {
        res.json(data);
    });
  }

  function findUserByCredentials(req, res) {
    const username = req.query.username;
    const password = req.query.password;

    UserModel.findUserByCredentials(username, password)
      .then(function (data) {
        res.json(data);
      });
  }

  function findUserById(req, res) {
    const userId = req.params.userId;

    UserModel.findUserById(userId)
      .then(function (data) {
        res.json(data);
      });
  }

  function updateUser(req, res) {
    const userId = req.params.userId;
    var user = req.body;

    UserModel.updateUser(userId, user)
      .then(function (data) {
        res.json(data);
      });
  }

  function deleteUser(req, res) {
    const userId = req.params.userId;

    UserModel.deleteUser(userId)
      .then(function (data) {
        res.json(data);
      });
  }
};
