var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// *** config file *** //
var config = require('./config');

// *** mongoose *** ///
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI[app.settings.env], function (err, res) {
  //mongoose.connect(config.mongoURI[app.settings.env], function (err) {
  if (err) {
    console.log('Error connecting to the database. ' + err);
    console.log(res);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});

app.use(express.static("public"));

app.use('/api', bodyParser.text()); 									// Allows bodyParser to look at raw text
app.use('/api', bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use('/api', bodyParser.json());                                     // parse application/json
app.use('/api', bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use('/api/', require('./components/message/routes.js'));

app.get("*", function (req, res) {
  //load the single view file and angular witll handle the page changes on the front-end.
  res.sendfile('./public/index.html');
});

app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});



// development error handler
// will print stacktrace
//if (app.get('env') === 'development' || app.get('env') === 'test') {
if (app.get('env') === 'development') {

  app.use(function (err, req, res, next) {
    //app.use(function(err, req, res) {
    res.status(err.status || 500)
      .send({
        message: err.message,
        error: err
      });
    //TODO: this is very much a hack to make jshint happy, Is there a case in here that I would want to call next()?
    if (true === false) {
      console.log(next);
    }
  });

}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  //app.use(function(err, req, res) {
  res.status(err.status || 500);
  //TODO: this is very much a hack to make jshint happy, Is there a case in here that I would want to call next()?
  if (true === false) {
    console.log(next);
  }
});

//Needed for mocha tests
module.exports = app;