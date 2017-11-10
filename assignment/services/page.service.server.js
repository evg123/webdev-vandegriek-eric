
module.exports = function (app) {

  var PageModel = require("../model/page/page.model.server");

  app.post('/api/website/:websiteId/page', createPage);
  app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
  app.get('/api/page/:pageId', findPageById);
  app.put('/api/page/:pageId', updatePage);
  app.delete('/api/page/:pageId', deletePage);

  function createPage(req, res) {
    const siteId = req.params.websiteId;
    var page = req.body;
    page.websiteId = siteId;
    PageModel.createPage(siteId, page)
      .then(function (data) {
        res.json(data);
      });
  }

  function findAllPagesForWebsite(req, res) {
    const siteId = req.params.websiteId;

    PageModel.findAllPagesForWebsite(siteId)
      .then(function (data) {
        res.json(data);
      });
  }

  function findPageById(req, res) {
    const pageId = req.params.pageId;

    PageModel.findPageById(pageId)
      .then(function (data) {
        res.json(data);
      });
  }

  function updatePage(req, res) {
    const pageId = req.params.pageId;
    var page = req.body;

    PageModel.updatePage(pageId, page)
      .then(function (data) {
        res.json(data);
      });
  }

  function deletePage(req, res) {
    const pageId = req.params.pageId;

    PageModel.deletePage(pageId)
      .then(function (data) {
        res.json(data);
      });
  }
};
