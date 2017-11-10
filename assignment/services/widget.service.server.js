
module.exports = function (app) {

  var WidgetModel = require("../model/widget/widget.model.server");
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
    widget.pageId = pageId;
    WidgetModel.createWidget(pageId, widget)
      .then(function (data) {
        res.json(data);
      });
  }

  function findAllWidgetsForPage(req, res) {
    const pageId = req.params.pageId;
    WidgetModel.findAllWidgetsForPage(pageId)
      .then(function (data) {
        res.json(data);
      });
  }

  function findWidgetById(req, res) {
    const widgetId = req.params.widgetId;
    WidgetModel.findWidgetById(widgetId)
      .then(function (data) {
        res.json(data);
      });
  }

  function updateWidget(req, res) {
    const widgetId = req.params.widgetId;
    var widget = req.body;

    WidgetModel.updateWidget(widgetId, widget)
      .then(function (data) {
        res.json(data);
      });
  }

  function deleteWidget(req, res) {
    const widgetId = req.params.widgetId;

    WidgetModel.deleteWidget(widgetId)
      .then(function (data) {
        res.json(data);
      });
  }

  function updateWidgetIndex(req, res) {
    //TODO
    /*
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
  */
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

    WidgetModel.findWidgetById(widgetId)
      .then(function (data) {
        const widget = data;

        widget.url = '/src/assets/uploads/' + filename;

        var callbackUrl = "http://" + host + ":" + port +
                          "/user/" + userId +
                          "/website/" + websiteId +
                          "/page/" + pageId +
                          "/widget/" + widgetId;

        res.redirect(callbackUrl);
      });
  }

};
