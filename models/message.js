var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var palindrome = require('../components/palindrome/index.js');

var messageSchema = new Schema({
    // Mongo has a built in ID, consider hashing it before exposing it:
    //http://stackoverflow.com/questions/16329353/use-the-database-id-as-the-restful-service-id-expose-a-threat
    // id: { type: String, required: true, unique: true },
  body: { type: String, required: true},
  isPalindrome: { type: Boolean,required:true},
  created_at: Date,
  updated_at: Date
});

// on every save, add the Date and check if it's a Palindrome
// messageSchema.pre('save', function(next) {
//   var currentDate = new Date();  
//   this.updated_at = currentDate;

//   //Only set the created date if it isn't already set (adding)
//   if (!this.created_at){
//     this.created_at = currentDate;
//   }

//   this.isPalindrome = palindrome.isStringPalindrome(this.body);

//   next();
// });

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;