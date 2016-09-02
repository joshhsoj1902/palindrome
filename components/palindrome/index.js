
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

exports.isStringPalindrome = isStringPalindrome;