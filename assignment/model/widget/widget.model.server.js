var mongoose = require("mongoose");
var WidgetSchema = require("./widget.schema.server");
var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.reorderWidget = reorderWidget;

module.exports = WidgetModel;

function createWidget(pageId, widget) {
  widget._page = pageId;
  return WidgetModel.create(widget);
}

function findAllWidgetsForPage(pageId) {
  return WidgetModel.find({_page: pageId})
    .populate('_page', 'name')
    .exec();
}

function findWidgetById(widgetId) {
  return WidgetModel.findOne({_id: widgetId})
    .populate('_page', 'name')
    .exec();
}

function updateWidget(widgetId, widget) {
  return WidgetModel.update({_id: widgetId}, widget);
}

function deleteWidget(widgetId) {
  return WidgetModel.findByIdAndRemove(widgetId);
}

function reorderWidget(pageId, start, end) {
  //TODO
  return;
}
