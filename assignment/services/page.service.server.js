
module.exports = function (app) {

  var PAGES = require('./mocks/page.mock');

  app.post('/api/website/:websiteId/page', createPage);
  app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
  app.get('/api/page/:pageId', findPageById);
  app.put('/api/page/:pageId', updatePage);
  app.delete('/api/page/:pageId', deletePage);

  function createPage(req, res) {
    const siteId = req.params.websiteId;
    var page = req.body;
    page._id = Math.floor(Math.random() * 1024).toString();
    page.websiteId = siteId;
    PAGES.push(page);
    res.json(page);
  }

  function findAllPagesForWebsite(req, res) {
    const siteId = req.params.websiteId;

    const userPages = PAGES.filter(function (page) {
      return page.websiteId === siteId;
    });

    res.json(userPages);
  }

  function findPageById(req, res) {
    const pageId = req.params.pageId;

    for (var x = 0; x < PAGES.length; x++) {
      if (PAGES[x]._id === pageId) {
        res.json(PAGES[x]);
        return;
      }
    }

    // not found
    res.json(null);
  }

  function updatePage(req, res) {
    const pageId = req.params.pageId;
    var page = req.body;

    for (var x = 0; x < PAGES.length; x++) {
      if (PAGES[x]._id === pageId) {
        page._id = pageId;
        page.websiteId = PAGES[x].websiteId;
        PAGES[x] = page;
        res.json(PAGES[x]);
        return;
      }
    }

    // not found
    res.json(null);
  }

  function deletePage(req, res) {
    const pageId = req.params.pageId;

    for (var x = 0; x < PAGES.length; x++) {
      if (PAGES[x]._id === pageId) {
        res.json(PAGES[x]);
        PAGES.splice(x, 1);
        return;
      }
    }

    // not found
    res.json(null);
  }
};
