var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next){
  res.render('index', { pagename: "donation" });
});

router.get('/news', function(req, res, next){
  res.render('news', { pagename: 'news' });
});

router.get('/news-form', function(req, res, next){
  res.render('news-form', { pagename: 'news-form' });
});

router.get('/form', function(req, res, next){
  res.render('form', { pagename: 'form' });
});

router.get('/flood-locations', function(req, res, next){
  res.render('flood-locations-map', { pagename: 'flood-locations-map' });
});

router.get('/flood_locations', function(req, res, next){
  res.render('flood-locations-map', { pagename: 'flood-locations-map' });
});

router.get('/campaigns', function(req, res, next){
  res.render('campaigns', { pagename: 'campaigns' });
});

router.get('/about-us', function(req, res, next){
  res.render('about', { pagename: 'about' });
});

module.exports = router;