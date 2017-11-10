var mongoose = require('mongoose');

var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
if (process.env.MLAB_USERNAME_WEBDEV) {
  // running remotely
  var username = process.env.MLAB_USERNAME_WEBDEV;
  var password = process.env.MLAB_PASSWORD_WEBDEV;
  connectionString = 'mongodb://' + username + ':' + password;
  connectionString += '@ds129344.mlab.com:29344/heroku_wc0fsz0r';
}

var db = mongoose.connect(connectionString);

module.exports = db;
