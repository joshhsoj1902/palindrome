var Message = require('../../models/message');
var palindrome = require('../palindrome/index.js');

function getAllMessages(callback) {
    Message.find({}).exec(callback);
};

function getMessage(messageId, callback) {
    Message.findById(messageId).exec(callback);
};

function updateMessageBody(messageId, messageBody, callback) {
    var currentDate = new Date();
    Message.findByIdAndUpdate(messageId, 
        { $set: 
            { 
                body: messageBody,
                updated_at: currentDate,
                isPalindrome:palindrome.isStringPalindrome(messageBody)
            } 
        }).exec(callback);
}

function createMessage(messageBody,callback){
    var currentDate = new Date();
    var message = new Message({
        body: messageBody,
        created_at: currentDate,
        updated_at: currentDate,
        isPalindrome:palindrome.isStringPalindrome(messageBody)
    });
    message.save(callback);
}

function deleteMessage(messageId,callback){
    Message.findByIdAndRemove(messageId).exec(callback);
};

exports.getAllMessages = getAllMessages;
exports.getMessage = getMessage;
exports.updateMessageBody = updateMessageBody;
exports.createMessage = createMessage;
exports.deleteMessage = deleteMessage;