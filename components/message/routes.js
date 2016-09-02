var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Message = require('../../models/message');
var Messages = require('./messages.js');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/palindrome');

// Get single message
router.get('/message/:messageId', function (req, res, next) {
    console.log("Get single message");

    Messages.getMessage(req.params.messageId, function (err, message) {
        if (err) {
            return next(err);
        };
        if (message == undefined){
            res.status(404);
        }else {
            console.log(message);
            // res.send(message);
            res.json(message);
        }
    });
});
// Get all message
router.get('/message', function (req, res, next) {
    console.log("Get all messages");

    returnAllMessages(res, next);
});

function returnAllMessages(res, next) {
    Messages.getAllMessages(function (err, messages) {
        if (err) {
            return next(err);
        };
        if (messages == undefined){
            //Is a 404 really the best thing to show here?
            res.status(404);
        }else {
            // res.send(message);
            res.json(messages);
        }
    });
}

router.put('/message/:messageId', function (req, res, next) {
    console.log("put single message");

    Messages.updateMessageBody(req.params.messageId, req.body.body, function (err, message) {
        if (err) {
            return next(err);
        };
        if (message == undefined){
            //todo: is there a proper "Update failed status I should show here?
            res.status(404);
        }
        returnAllMessages(res,next);

    });

});
router.put('/message', function (req, res,next) {
    console.log("add new message");

    Messages.createMessage(req.body.body,function(err) {
        if (err) {
            return next(err);
        };

        console.log('Message saved successfully!');
        returnAllMessages(res,next);
    })
    // var message = new Message({
    //     body: req.body.body
    // });

    // message.save(function (err) {
    //     if (err) {
    //         res.send(err);
    //         throw err;
    //     };

    //     console.log('Message saved successfully!');
    //     returnAllMessages(res);
    // });

    // update message 
});
router.delete('/message/:messageId', function (req, res, next) {
    console.log("delete single message");
    Messages.deleteMessage(req.params.messageId,function (err) {
        if (err) {
            return next(err);
        };
        //todo: Can I catch if nothing was deleted? does it matter?

        console.log('Message deleted!');
        returnAllMessages(res,next);
    });
});

module.exports = router