/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

//Done

function wait(n) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(n);
      }, n * 1000);
    });
  }
  
  wait(5).then((value) => {
    console.log(`Promise resolved after ${value} seconds`);
  });