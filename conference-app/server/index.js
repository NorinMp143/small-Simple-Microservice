const express = require('express');
const createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser');
const configs = require('./config');
const Speakers = require('./services/Speakers');
const Feedback = require('./services/Feedback');
const routes = require('./routes');
const speakersRoutes = require('./routes/speakers');
const feedbackRoutes = require('./routes/feedback');

const app = express();

const config = configs[app.get('env')];
const speakers = new Speakers(config);
const feedback = new Feedback(config.data.feedback);

if(app.get('env')==='development'){
  app.locals.pretty = true;
}
app.set('views', path.join(__dirname,'views'));
// app.engine('html',require('ejs').renderFile);
app.set('view engine', 'ejs');
app.locals.title = config.sitename;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/favicon.ico',(req,res)=> res.sendStatus(204));

app.use('/',routes({speakers}));
app.use('/speakers',speakersRoutes({speakers}));
app.use('/feedback',feedbackRoutes);

app.use((req, res, next) => next(createError(404, 'File not found')));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  const status = err.status || 500;
  res.locals.status = status;
  res.locals.error= req.app.get('env') === 'development' ? err : {};
  res.status(status);
  return res.render('error');
});

const port = process.env.PORT || 3080;
app.listen(port,()=>{
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;