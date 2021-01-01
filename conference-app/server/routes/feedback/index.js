var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
  res.render('feedback',{
    pageTitle: 'Feedback',
    pageID:'feedback'
  });
});

module.exports = router;