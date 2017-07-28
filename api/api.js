var router = require('express').Router();
var async = require('async');
var Category = require('../models/category');
var Product = require('../models/product');

//This is for instant search.-> next product-main.ejs has code for frontend
// router.post('/search', function(req, res, next) {
//   console.log(req.body.search_term);
//   Product.search({
//     query_string: { query: req.body.search_term }
//   }, function(err, results) {
//     if (err) return next(err);
//     res.json(results);
//   });
// });

router.get('/:name', function(req, res, next) {
    async.waterfall([
      function(callback) {
        Category.findOne({ name: req.params.name }, function(err, category) {
          if (err) return next(err);
          callback(null, category);
        });
      },

      function(category, callback) {
        for (var i = 0; i < 30; i++) {
          var product = new Product();
          product.name = req.body.name;
          product.price = req.body.price;
          product.category = req.body.category._id;
          product.spec = req.body.spec;
          product.uses = req.body.uses;
          product.image = req.body.image;
          product.option1=req.body.option1;
          product.option2=req.body.option2;
          product.option3=req.body.option3;
          product.bis=req.body.bis;

          product.save();
        }
      }
    ]);
    res.json({ message: 'Success' });
});

module.exports = router;
