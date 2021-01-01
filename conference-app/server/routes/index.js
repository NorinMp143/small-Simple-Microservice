var express = require('express');
var router = express.Router();

module.exports = function({speakers}){
  router.get('/',async function(req, res){
    res.render('index',{
      pageTitle: 'Home',
      speakerShortList : await speakers.getListShort(),
      artworkList: await speakers.getAllArtwork(),
      pageID:'home'
    });
  });
  return router;
}
