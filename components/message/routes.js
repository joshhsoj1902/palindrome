var express = require('express');
var router = express.Router();
var Messages = require('./messages.js');

/**
 * @apiDefine MessageNotFoundError
 * 
 * @apiError MessageNotFound The id of the Message was not found.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Message not found"
 *     }
 */
 
 /**
 * @apiDefine NoMessagesFoundError
 * 
 * @apiError NoMessagesFound No messages were found.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No messages found"
 *     }
 */

/**
 * @apiDefine MessageValidationError
 * 
 * @apiError MessageValidationFailed the message could not be validated.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "message": "Message validation failed",
 *       "error": {
 *         "message": "Message validation failed",
 *         "name": "ValidationError",
 *         "errors": {
 *           "body": {
 *             "message": "Path `body` is required.",
 *             "name": "ValidatorError",
 *             "properties": {
 *               "type": "required",
 *               "message": "Path `{PATH}` is required.",
 *               "path": "body"
 *             },
 *             "kind": "required",
 *             "path": "body"
 *           }
 *         },
 *         "status": 400
 *       }
 *     }
 */

 /**
 * @apiDefine MessagesObjectSuccess
 * 
 * @apiSuccess {Object[]} messages Message's list
 * @apiSuccess {Number} message._id Message id
 * @apiSuccess {String} message.body Message body
 * @apiSuccess {Date} message.updated_at Update's date
 * @apiSuccess {Date} message.created_at Create date
 * @apiSuccess {Boolean} message.isPalindrome Message is a palindrome?
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "_id": "57cd70ce5f491437b8027cb0",
 *      "body": "Apple",
 *      "created_at": "2016-09-05T13:19:10.897Z",
 *      "updated_at": "2016-09-05T13:19:10.897Z",
 *      "isPalindrome": false
 *    }]
 */

/**
 * @apiDefine MessageObjectSuccess
 * 
 * @apiSuccess {Number} _id Message id
 * @apiSuccess {String} body Message body
 * @apiSuccess {Date} updated_at Update's date
 * @apiSuccess {Date} created_at Create date
 * @apiSuccess {Boolean} isPalindrome Message is a palindrome?
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "_id": "57cd70ce5f491437b8027cb0",
 *      "body": "Apple",
 *      "created_at": "2016-09-05T13:19:10.897Z",
 *      "updated_at": "2016-09-05T13:19:10.897Z",
 *      "isPalindrome": false
 *    }
 */




function returnAllMessages(res, next) {
    Messages.getAllMessages(function (err, messages) {
        if (err) {
            return next(err);
        }
        if (messages === undefined || messages === null) {
            //Is a 404 really the best thing to show here?
            res.status(404).send({
                message: "No messages found"
            });
        } else {
            res.json(messages);
        }
    });
}

/**
 * Get Single Messages
 * 
 * @api {get} /api/message/:id Find message
 * @apiGroup Messages
 * @apiParam {id} id Message id
 * 
 * @apiUse MessageObjectSuccess
 *
 * @apiUse MessageNotFoundError
 */
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

/**
 * List All Messages
 * 
 * @api {get} /api/message List all messages
 * @apiGroup Messages
 * 
 * @apiUse MessagesObjectSuccess
 * 
 * @apiUse NoMessagesFoundError
 */
router.get('/message', function (req, res, next) {
    returnAllMessages(res, next);
});


/**
 * Update existing Message
 * 
 * @api {put} /api/message/:id Update existing message
 * @apiGroup Messages
 * @apiParam {id} id Message id
 * @apiParam {String} body Message body
 * @apiParamExample {json} Input
 *    {
 *      "body": "Apple"
 *    }
 * 
 * @apiUse MessagesObjectSuccess
 * 
 * @apiUse MessageNotFoundError
 * 
 * @apiUse MessageValidationError
 * 
 */
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

/**
 * Create New Message
 * 
 * @api {put} /api/message Creates new message
 * @apiGroup Messages
 * @apiParam {String} body Message body
 * @apiParamExample {json} Input
 *    {
 *      "body": "Apple"
 *    }
 * 
 * @apiUse MessagesObjectSuccess
 * 
 * @apiUse MessageNotFoundError
 * 
 * @apiUse MessageValidationError
 * 
 */
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

/**
 * Delete Single Messages
 * 
 * @api {delete} /api/message/:id Delete message
 * @apiGroup Messages
 * @apiParam {id} id Message id
 * 
 * @apiUse MessageObjectSuccess
 *
 */
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