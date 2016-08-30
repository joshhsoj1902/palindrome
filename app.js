var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//app.use(router);
//app.use('/api', bodyParser.json());

 app.use('/api',bodyParser.text()); 									// Allows bodyParser to look at raw text
 app.use('/api',bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
 app.use('/api',bodyParser.json());                                     // parse application/json
 app.use('/api',bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use('/api', router);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/palindrome');

var Message = require('./models/message');

// Get single message
router.get('/api/message/:messageId', function (req, res) {
    console.log("Get single message");
    
    Message.findById(req.params.messageId, function(err, message) {
        if (err) throw err;

        console.log(message);
        res.send(message);
    });
});
 // Get all message
router.get('/api/message', function (req, res) {
    console.log("Get all messages");
    Message.find({}, function (err, messages) {
        if (err) throw err;
        console.log(messages);
        res.send(messages);
    });
});
router.put('/api/message/:messageId', function (req, res) {
    console.log("put single message");

    Message.findById(req.params.messageId, function(err, message) {
        if (err) throw err;

        message.body = req.body.body;

         message.save(function(err) {
            if (err) throw err;

            console.log('Message successfully updated!');
        });

    });
    
});
router.put('/message', function (req, res) {
    console.log("add new message");

    var message = new Message({
        body: req.body.body
    });

    message.save(function (err) {
        if (err) throw err;

        console.log('Message saved successfully!');
    });

    // update message 
});
router.delete('/message/:messageId', function (req, res) {
    console.log("delete single message");
    Message.findByIdAndRemove(req.params.messageId, function(err) {
        if (err) throw err;

        console.log('Message deleted!');
    });
});

router.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});