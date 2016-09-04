var express = require('express');
var router = express.Router();
var Messages = require('./messages.js');

function returnAllMessages(res, next) {
    Messages.getAllMessages(function (err, messages) {
        if (err) {
            return next(err);
        }
        if (messages === undefined || messages === null) {
            //Is a 404 really the best thing to show here?
            res.status(404).send({
                message: "Message not found"
            });
        } else {
            res.json(messages);
        }
    });
}

// Get single message
router.get('/message/:messageId', function (req, res, next) {
    Messages.getMessage(req.params.messageId, function (err, message) {
        if (err) {
            return next(err);
        }
        if (message === undefined || message === null) {
            res.status(404).send({
                message: "Message not found"
            });
        } else {
            res.json(message);
        }
    });
});

// Get all message
router.get('/message', function (req, res, next) {
    returnAllMessages(res, next);
});



router.put('/message/:messageId', function (req, res, next) {
    Messages.updateMessageBody(req.params.messageId, req.body.body, function (err, message) {
        if (err) {
            if (err.name === "ValidationError") {
                err.status = 400;
            }
            return next(err);
        }
        if (message === undefined) {
            //todo: is there a proper "Update failed status I should show here?
            res.status(404);
        }
        returnAllMessages(res, next);
    });
});

router.put('/message', function (req, res, next) {
    Messages.createMessage(req.body.body, function (err) {
        if (err) {
            if (err.name === "ValidationError") {
                err.status = 400;
            }
            return next(err);
        }
        returnAllMessages(res, next);
    });
});

router.delete('/message/:messageId', function (req, res, next) {
    Messages.deleteMessage(req.params.messageId, function (err) {
        if (err) {
            return next(err);
        }
        //todo: Can I catch if nothing was deleted? does it matter?

        returnAllMessages(res, next);
    });
});

module.exports = router;