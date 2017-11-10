var mongoose = require("mongoose");

var PageModel = require("../website/website.model.server");

var WidgetSchema = mongoose.Schema({
  _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
  widgetType: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
  name: String,
  text: String,
  placeholder: String,
  description: String,
  url: String,
  width: String,
  height: String,
  rows: Number,
  size: Number,
  class: String,
  icon: String,
  deleteable: Boolean,
  formatted: Boolean,
  dateCreated: Date
}, {collection: 'widget'});

module.exports = WidgetSchema;
