
module.exports = function (app) {

  var WebsiteModel = require("../model/website/website.model.server");

  app.post('/api/user/:userId/website', createWebsite);
  app.get('/api/user/:userId/website', findAllWebsitesForUser);
  app.get('/api/website/:websiteId', findWebsiteById);
  app.put('/api/website/:websiteId', updateWebsite);
  app.delete('/api/website/:websiteId', deleteWebsite);

  function createWebsite(req, res) {
    const userId = req.params.userId;
    var website = req.body;
    website.developerId = userId;
    WebsiteModel.createWebsiteForUser(userId, website)
      .then(function (data) {
        res.json(data);
      });
  }

  function findAllWebsitesForUser(req, res) {
    const userId = req.params.userId;

    WebsiteModel.findAllWebsitesForUser(userId)
      .then(function (data) {
        res.json(data);
      });
  }

  function findWebsiteById(req, res) {
    const siteId = req.params.websiteId;

    WebsiteModel.findWebsiteById(siteId)
      .then(function (data) {
        res.json(data);
      });
  }

  function updateWebsite(req, res) {
    const siteId = req.params.websiteId;
    var website = req.body;

    WebsiteModel.updateWebsite(siteId, website)
      .then(function (data) {
        res.json(data);
      });
  }

  function deleteWebsite(req, res) {
    const siteId = req.params.websiteId;

    WebsiteModel.deleteWebsite(siteId)
      .then(function (data) {
        res.json(data);
      });
  }
};
