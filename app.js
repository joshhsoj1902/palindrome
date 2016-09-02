var express = require('express');
var app = express();
//var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//app.use(router);
//app.use('/api', bodyParser.json());

// *** config file *** //
var config = require('./config');

// *** mongoose *** ///
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI[app.settings.env], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
  }
});

app.use(express.static("public"));

app.use('/api',bodyParser.text()); 									// Allows bodyParser to look at raw text
app.use('/api',bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use('/api',bodyParser.json());                                     // parse application/json
app.use('/api',bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use('/api/', require('./components/message/routes.js'))
//app.use('/api', router);

 


// router.get('/', function (req, res) {
//     res.send('Hello World!');
// });

app.get("*", function(req,res) {
    //load the single view file and angular witll handle the page changes on the front-end.
    res.sendfile('./public/index.html');
  });

app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});



// development error handler
// will print stacktrace
if (app.get('env') === 'development' ||app.get('env') === 'test') {

  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .send({
        message: err.message,
        error: err
    });
    // res.send('error', {
    //     message: err.message,
    //     error: err
    // });
  });

}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    //res.send('error', {
    //    message: err.message,
    //    error: {}
    //});
});

// app.use(function(err, req, res, next) {
//   if (res.headersSent) {
//     return next(err);
//   }
//   res.status(500);
//   res.render('error', { error: err });
// });

//Needed for mocha tests
module.exports = app;