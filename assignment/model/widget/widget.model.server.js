var mongoose = require("mongoose");
var WidgetSchema = require("./widget.schema.server");
var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

const INDEX_INCR = 100;

WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.reorderWidget = reorderWidget;

module.exports = WidgetModel;

function createWidget(pageId, widget) {
  widget._page = pageId;
  return WidgetModel.findOne({_page: pageId})
    .sort('-index')
    .then(function (maxWidget) {
      var newIdx;
      if (maxWidget === null) {
        newIdx = INDEX_INCR;
      } else {
        newIdx = maxWidget.index + INDEX_INCR;
      }
      widget.index = newIdx;
    }).then(function () {
      return WidgetModel.create(widget);
    });
}

function findAllWidgetsForPage(pageId) {
  return WidgetModel.find({_page: pageId})
    .sort('index')
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
  return WidgetModel.find({_page: pageId})
    .sort('index')
    .then(function (pageWidgets) {
      var beforeIdx;
      var afterIdx;

      if (start > end) {
        // moving towards the front of the list, no replacement
        if (end === 0) {
          // front of the list
          beforeIdx = 0
        } else {
          beforeIdx = pageWidgets[end - 1].index;
        }
        afterIdx = pageWidgets[end].index;
      } else {
        // moving further to the back, need to account for the shift
        beforeIdx = pageWidgets[end].index;
        if (end >= pageWidgets.length - 1) {
          // back of the list
          afterIdx = pageWidgets[pageWidgets.length - 1].index + INDEX_INCR;
        } else {
          afterIdx = pageWidgets[end + 1].index;
        }
      }

      const newIdx = beforeIdx + ((afterIdx - beforeIdx) / 2.0);
      const upWidget = pageWidgets[start];
      upWidget.index = newIdx;
      return upWidget;
    }).then(function (widget) {
      return updateWidget(widget._id, widget);
    });
}
