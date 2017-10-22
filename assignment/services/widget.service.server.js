
module.exports = function (app) {

  var WIDGETS = require('./mocks/widget.mock');

  app.post('/api/page/:pageId/widget', createWidget);
  app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
  app.get('/api/widget/:widgetId', findWidgetById);
  app.put('/api/widget/:widgetId', updateWidget);
  app.delete('/api/widget/:widgetId', deleteWidget);

  function createWidget(req, res) {
    const pageId = req.params.pageId;
    var widget = req.body;
    widget._id = Math.floor(Math.random() * 1024).toString();
    widget.pageId = pageId;
    WIDGETS.push(widget);
    res.json(widget);
  }

  function findAllWidgetsForPage(req, res) {
    const pageId = req.params.pageId;

    const userWidgets = WIDGETS.filter(function (widget) {
      return widget.pageId === pageId;
    });

    res.json(userWidgets);
  }

  function findWidgetById(req, res) {
    const widgetId = req.params.widgetId;

    for (var x = 0; x < WIDGETS.length; x++) {
      if (WIDGETS[x]._id === widgetId) {
        res.json(WIDGETS[x]);
        return;
      }
    }

    // not found
    res.json(null);
  }

  function updateWidget(req, res) {
    const widgetId = req.params.widgetId;
    var widget = req.body;

    for (var x = 0; x < WIDGETS.length; x++) {
      if (WIDGETS[x]._id === widgetId) {
        widget._id = widgetId;
        WIDGETS[x] = widget;
        res.json(WIDGETS[x]);
        return;
      }
    }

    // not found
    res.json(null);
  }

  function deleteWidget(req, res) {
    const widgetId = req.params.widgetId;

    for (var x = 0; x < WIDGETS.length; x++) {
      if (WIDGETS[x]._id === widgetId) {
        res.json(WIDGETS[x]);
        WIDGETS.splice(x, 1);
        return;
      }
    }

    // not found
    res.json(null);
  }
};
