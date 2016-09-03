
function isStringPalindrome(string) {

    var isPalindrome = true;

    if (typeof string == 'undefined' || string == null) {
        var isPalindrome = false;
    }
    else {
        //White space is ignored
        string = string.trim();

        //Only letters are considered
        string = string.replace(/[^a-zA-Z]+/g, '');

        //Doesn't matter what case the text is.
        string = string.toLowerCase();

        if (string.length == 0) {
            var isPalindrome = false;
        }
        for (i = 0; i < string.length; i++) {
            var j = (string.length - 1) - i

            //Handle middle character
            if (i == j) {
                break;
            }

            if (string[i] != string[j]) {
                isPalindrome = false;
                break;
            }

            if (i > j) {
                break;
            }

            // document.write(word[i],"</br>"); // this will show each letter of the word on a new line

        }
    }
    //console.log("Conclusion: [",string,"] is ",isPalindrome,"(length: ",string.length,")")
    return isPalindrome
}

exports.isStringPalindrome = isStringPalindrome;