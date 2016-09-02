var mongoose = require('mongoose');

var Message = require('../../models/message');

//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/palindrome');

function getAllMessages(callback) {
    Message.find({}).exec(callback);
};

function getMessage(messageId, callback) {
    Message.findById(messageId).exec(callback);
};

function updateMessageBody(messageId, messageBody, callback) {
    Message.findByIdAndUpdate(messageId, { $set: { body: messageBody } }).exec(callback);
}

function createMessage(messageBody,callback){
    var message = new Message({
        body: messageBody
    });

    message.save().exec(callback);
    //     function (err) {
    //     if (err) {
    //         res.send(err);
    //         throw err;
    //     };

    //     console.log('Message saved successfully!');
    //     returnAllMessages(res);
    // });
}

function deleteMessage(messageId,callback){
    Message.findByIdAndRemove(messageId).exec(callback);
    //     , function (err) {
    //     if (err) {
    //         res.send(err);
    //         throw err;
    //     };

    //     console.log('Message deleted!');
    //     returnAllMessages(res);
    // });
};

exports.getAllMessages = getAllMessages;
exports.getMessage = getMessage;
exports.updateMessageBody = updateMessageBody;
exports.createMessage = createMessage;
exports.deleteMessage = deleteMessage;