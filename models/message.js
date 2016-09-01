var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    // Mongo has a built in ID, consider hashing it before exposing it:
    //http://stackoverflow.com/questions/16329353/use-the-database-id-as-the-restful-service-id-expose-a-threat
    // id: { type: String, required: true, unique: true },
  body: { type: String, required: true},
  isPalindrome: Boolean,
  created_at: Date,
  updated_at: Date
});

// on every save, add the Date and check if it's a Palindrome
messageSchema.pre('save', function(next) {
  var currentDate = new Date();  
  this.updated_at = currentDate;

  //Only set the created date if it isn't already set (adding)
  if (!this.created_at){
    this.created_at = currentDate;
  }

  this.isPalindrome = isStringPalindrome(this.body);

  next();
});

function isStringPalindrome(string){
    var isPalindrome = true;
    for (i = 0; i < string.length; i++) {
        var j = (string.length-1)-i
        console.log("string: ",string.length," i: ",i," j: ",j);
        console.log(string[i]," ",string[j]);
        
        //Handle middle character
        if (i == j){
            break;
        }

        if (string[i] != string[j]){
            isPalindrome = false;
            break;
        }

        if (i > j){
            break;
        }

        // document.write(word[i],"</br>"); // this will show each letter of the word on a new line
        
    } 
    return isPalindrome
}

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;