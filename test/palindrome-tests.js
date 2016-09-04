/*jshint expr: true*/
//"use strict";

var palindrome = require('../components/palindrome/index.js');

describe('Palindrome', function () {
  it('should detect that "abccba" is a palindrome', function (done) {
    var isPalindrome = palindrome.isStringPalindrome('abccba');
    isPalindrome.should.equal(true);
    done();
  });
  it('should detect that "abcHFcba" is not a palindrome', function (done) {
    var isPalindrome = palindrome.isStringPalindrome('abcHFcba');
    isPalindrome.should.equal(false);
    done();
  });
  it('should ignore anything but letters.', function (done) {
    var isPalindrome = palindrome.isStringPalindrome('abc cba       ');
    isPalindrome.should.equal(true);

    isPalindrome = palindrome.isStringPalindrome('!a$b@c^c&b*a.9');
    isPalindrome.should.equal(true);
    done();
  });
  it('should ignore anything but word casing."abcCBA" is a palindrome', function (done) {
    var isPalindrome = palindrome.isStringPalindrome('abcCBA');
    isPalindrome.should.equal(true);
    done();
  });
  it('should not consider an empty string a palindrome', function (done) {
    var isPalindrome = palindrome.isStringPalindrome('');
    isPalindrome.should.equal(false);
    done();
  });

  //The Shotgun test, if something fails this it was missed by one of the above tests
  it('should properly handle various plaindromes', function (done) {
    var isPalindrome = palindrome.isStringPalindrome('A car, a man, a maraca.');
    isPalindrome.should.equal(true);

    isPalindrome = palindrome.isStringPalindrome('A dog! A panic in a pagoda!');
    isPalindrome.should.equal(true);

    isPalindrome = palindrome.isStringPalindrome('Aibohphobia');
    isPalindrome.should.equal(true);

    isPalindrome = palindrome.isStringPalindrome('A man, a plan, a canal: Panama.');
    isPalindrome.should.equal(true);

    isPalindrome = palindrome.isStringPalindrome('Are we not pure? “No sir!” Panama’s moody Noriega brags. “It is garbage!” Irony dooms a man; a prisoner up to new era.');
    isPalindrome.should.equal(true);

    isPalindrome = palindrome.isStringPalindrome('Amore, Roma.');
    isPalindrome.should.equal(true);

    isPalindrome = palindrome.isStringPalindrome("No ‘x’ in ‘Nixon’");
    isPalindrome.should.equal(true);

    done();
  });
});