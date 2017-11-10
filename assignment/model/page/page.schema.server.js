var mongoose = require("mongoose");

var WebsiteModel = require("../page/page.model.server");
var WidgetModel = require("../widget/widget.model.server");

var PageSchema = mongoose.Schema({
  _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
  name: String,
  title: String,
  description: String,
  widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
  dateCreated: Date
}, {collection: 'page'});

module.exports = PageSchema;
