// ## Reading the contents of a file

// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output. 

//Done

const fs = require('fs');

function readTextFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    console.log(data);
  });
}

// Usage
const filePath = '02-async-js/easy/text.txt';
readTextFile(filePath);

console.log("hello");
for(let i=0; i<=10000000000; i++){
  if(i==10000000000){
    console.log("Loop is complited");
  }
}