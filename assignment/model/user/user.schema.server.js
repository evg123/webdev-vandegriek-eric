var mongoose = require("mongoose");

var WebsiteModel = require("../website/website.model.server");

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
  facebook: {
    id:    String,
    token: String
  },
  dateCreated: Date
}, {collection: 'user'});

module.exports = UserSchema;
