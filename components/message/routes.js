var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//var Message = require('../../models/message');
var Messages = require('./messages.js');

// Get single message
router.get('/message/:messageId', function (req, res, next) {
    Messages.getMessage(req.params.messageId, function (err, message) {
        if (err) {
            return next(err);
        };
        if (message == undefined){
            res.status(404);
        }else {
            res.json(message);
        }
    });
});

// Get all message
router.get('/message', function (req, res, next) {
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
            res.json(messages);
        }
    });
}

router.put('/message/:messageId', function (req, res, next) {
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
    Messages.createMessage(req.body.body,function(err) {
        if (err) {
            return next(err);
        };
        returnAllMessages(res,next);
    })
});

router.delete('/message/:messageId', function (req, res, next) {
    Messages.deleteMessage(req.params.messageId,function (err) {
        if (err) {
            return next(err);
        };
        //todo: Can I catch if nothing was deleted? does it matter?

        returnAllMessages(res,next);
    });
});

module.exports = router