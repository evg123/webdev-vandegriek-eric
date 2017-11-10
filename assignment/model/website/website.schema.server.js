var mongoose = require("mongoose");

var UserModel = require("../user/user.model.server");
var PageModel = require("../page/page.model.server");

var WebsiteSchema = mongoose.Schema({
  _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
  name: String,
  description: String,
  pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}],
  dateCreated: Date
}, {collection: 'website'});

module.exports = WebsiteSchema;
