
module.exports = function (app) {

  var WIDGETS = require('./mocks/widget.mock');
  var multer = require('multer');
  var upload = multer({ dest: __dirname + '/../../src/assets/uploads' });

  app.post('/api/page/:pageId/widget', createWidget);
  app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
  app.put('/api/page/:pageId/widget', updateWidgetIndex);
  app.get('/api/widget/:widgetId', findWidgetById);
  app.put('/api/widget/:widgetId', updateWidget);
  app.delete('/api/widget/:widgetId', deleteWidget);
  app.post('/api/upload', upload.single('myFile'), uploadImage);

  function createWidget(req, res) {
    const pageId = req.params.pageId;
    var widget = req.body;
    widget._id = Math.floor(Math.random() * 1024).toString();
    widget.pageId = pageId;
    widget.index = getAllWidgetsForPage(pageId).length;
    WIDGETS.push(widget);
    res.json(widget);
  }

  function getWidgetById(widgetId) {
    for (var x = 0; x < WIDGETS.length; x++) {
      if (WIDGETS[x]._id === widgetId) {
        return WIDGETS[x];
      }
    }

    // not found
    return null;
  }

  function getAllWidgetsForPage(pageId) {
    const pageWidgets = WIDGETS.filter(function (widget) {
      return widget.pageId === pageId;
    });

    // sort the array based on each widget's index
    pageWidgets.sort(function(a, b) {
      return a.index - b.index;
    });

    return pageWidgets;
  }

  function findAllWidgetsForPage(req, res) {
    const pageId = req.params.pageId;
    pageWidgets = getAllWidgetsForPage(pageId);

    res.json(pageWidgets);
  }

  function findWidgetById(req, res) {
    const widgetId = req.params.widgetId;
    res.json(getWidgetById(widgetId));
  }

  function updateWidget(req, res) {
    const widgetId = req.params.widgetId;
    var widget = req.body;

    for (var x = 0; x < WIDGETS.length; x++) {
      if (WIDGETS[x]._id === widgetId) {
        widget._id = widgetId;
        widget.pageId = WIDGETS[x].pageId;
        widget.widgetType = WIDGETS[x].widgetType;
        widget.index = WIDGETS[x].index;
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

  function updateWidgetIndex(req, res) {
    //TODO instead of having an index, just sort the master widget list
    const pageId = req.params.pageId;
    const startIdx = parseInt(req.query.initial);
    const endIdx = parseInt(req.query.final);

    // this will be either 1, -1, or 0 and will be applied
    // to indexes that fall between the start and end
    modifier = Math.sign(startIdx - endIdx);

    pageWidgets = getAllWidgetsForPage(pageId);

    for (var x = 0; x < pageWidgets.length; x++) {
      if (pageWidgets[x].pageId === pageId) {
        const curIdx = pageWidgets[x].index;
        if (curIdx == startIdx) {
          pageWidgets[x].index = endIdx;
        }
        else if (curIdx >= Math.min(startIdx, endIdx) && curIdx <= Math.max(startIdx, endIdx)) {
          pageWidgets[x].index += modifier;
        }
      }
    }

  }

  function uploadImage(req, res) {
    const widgetId = req.body.widgetId;
    const width = req.body.width;
    const userId = req.body.userId;
    const websiteId = req.body.websiteId;
    const pageId = req.body.pageId;
    const myFile = req.file;

    const originalname = myFile.originalname; // file name on user's computer
    const filename = myFile.filename; // new file name in upload folder
    const path = myFile.path; // full path of uploaded file
    const destination = myFile.destination; // folder where file is saved to
    const size = myFile.size;
    const mimetype = myFile.mimetype;

    const widget = getWidgetById(widgetId);
    widget.url = '/src/assets/uploads/' + filename;

    var callbackUrl = "http://" + host + ":" + port +
                      "/user/" + userId +
                      "/website/" + websiteId +
                      "/page/" + pageId +
                      "/widget/" + widgetId;

    res.redirect(callbackUrl);
  }

};
