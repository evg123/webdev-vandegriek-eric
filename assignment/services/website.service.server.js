
module.exports = function (app) {

  var WEBSITES = require('./mocks/website.mock');

  app.post('/api/user/:userId/website', createWebsite);
  app.get('/api/user/:userId/website', findAllWebsitesForUser);
  app.get('/api/website/:websiteId', findWebsiteById);
  app.put('/api/website/:websiteId', updateWebsite);
  app.delete('/api/website/:websiteId', deleteWebsite);

  function createWebsite(req, res) {
    const userId = req.params.userId;
    var website = req.body;
    website._id = Math.floor(Math.random() * 1024).toString();
    website.developerId = userId;
    WEBSITES.push(website);
    res.json(website);
  }

  function findAllWebsitesForUser(req, res) {
    const userId = req.params.userId;

    const userWebsites = WEBSITES.filter(function (site) {
      return site.developerId === userId;
    });

    res.json(userWebsites);
  }

  function findWebsiteById(req, res) {
    const siteId = req.params.websiteId;

    for (var x = 0; x < WEBSITES.length; x++) {
      if (WEBSITES[x]._id === siteId) {
        res.json(WEBSITES[x]);
        return;
      }
    }

    // not found
    res.json(null);
  }

  function updateWebsite(req, res) {
    const siteId = req.params.websiteId;
    var website = req.body;

    for (var x = 0; x < WEBSITES.length; x++) {
      if (WEBSITES[x]._id === siteId) {
        website.developerId = WEBSITES[x].developerId;
        WEBSITES[x] = website;
        res.json(WEBSITES[x]);
        return;
      }
    }

    // not found
    res.json(null);
  }

  function deleteWebsite(req, res) {
    const siteId = req.params.websiteId;

    for (var x = 0; x < WEBSITES.length; x++) {
      if (WEBSITES[x]._id === siteId) {
        res.json(WEBSITES[x]);
        WEBSITES.splice(x, 1);
        return;
      }
    }

    // not found
    res.json(null);
  }
};
