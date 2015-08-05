var express = require("express");
var router = express.Router();

router.get('/', function(req, res, next){
  res.render('index');
});

router.get('/news', function(req, res, next){
  res.render('news');
});

router.get('/news-form', function(req, res, next){
  res.render('news-form');
});

router.get('/form', function(req, res, next){
  res.render('form');
});

router.get('/flood-locations', function(req, res, next){
  res.render('flood-locations-map');
});

router.get('/flood_locations', function(req, res, next){
  res.render('flood-locations-map');
});

router.get('/campaigns', function(req, res, next){
  res.render('campaigns');
});

router.get('/about-us', function(req, res, next){
  res.render('about');
});

module.exports = router;