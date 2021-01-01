var express = require('express');
var router = express.Router();

module.exports = function({speakers}){
  router.get('/', async function(req, res){
    res.render('speakers', {
      pageTitle: 'Speakers',
      pageID: 'speakers',
      speakers: await speakers.getList(),
      artworks: await speakers.getAllArtwork()
    });
  });

  router.get('/:speaker_short_name',async function(req, res){
    res.render('speaker', {
      pageTitle: 'Speakers Info',
      pageID: 'speakerDetail',
      speakerShortList : await speakers.getListShort(),
      speakerDetail : await speakers.getSpeaker(req.params.speaker_short_name),
      speakerArtworks : await speakers.getArtworkForSpeaker(req.params.speaker_short_name)
    });
  });
  return router;
}
