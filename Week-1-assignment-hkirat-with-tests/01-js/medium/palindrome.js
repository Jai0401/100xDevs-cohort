/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/


//Done

function isPalindrome(str) {
  let str1=str.split('');
  str1=str1.filter((str => str !== ' ') && (char => /[a-zA-Z0-9]/.test(char)));
  console.log(str1);
  let str2 = [];
  for(let i=0; i<str1.length; i++){
    str2[i] = str1[str1.length-i-1];
  }
  str1 = str1.join('');
  str2 = str2.join('');
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  console.log(str1);
  console.log(str2);
  if (str1 === str2){
    return true;
  }else{
    return false;
  }
}

module.exports = isPalindrome;
