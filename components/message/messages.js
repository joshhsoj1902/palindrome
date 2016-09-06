var MessageSchema = require('../../models/message');
var Palindrome = require('../palindrome/index.js');

function getAllMessages(callback) {
    MessageSchema.find({}).exec(callback);
}

function getMessage(messageId, callback) {
    MessageSchema.findById(messageId).exec(callback);
}

function updateMessageBody(messageId, messageBody, callback) {
    var currentDate = new Date();

    MessageSchema.findById(messageId,
        function (err, message) {
            if (!err) {
                message.body = messageBody;
                message.updated_at = currentDate;
                message.isPalindrome = Palindrome.isStringPalindrome(messageBody);
                message.save(callback);
            }
        }
    );
}

function createMessage(messageBody, callback) {
    var currentDate = new Date();
    var message = new MessageSchema({
        body: messageBody,
        created_at: currentDate,
        updated_at: currentDate,
        isPalindrome: Palindrome.isStringPalindrome(messageBody)
    });
    message.save(callback);
}

function deleteMessage(messageId, callback) {
    MessageSchema.findByIdAndRemove(messageId).exec(callback);
}

exports.getAllMessages = getAllMessages;
exports.getMessage = getMessage;
exports.updateMessageBody = updateMessageBody;
exports.createMessage = createMessage;
exports.deleteMessage = deleteMessage;