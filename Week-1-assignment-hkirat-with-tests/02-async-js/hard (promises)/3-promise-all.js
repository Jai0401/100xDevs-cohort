/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */


//Done

function waitOneSecond() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    });
  }
  
  function waitTwoSeconds() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(2);
      }, 2000);
    });
  }
  
  function waitThreeSeconds() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(3);
      }, 3000);
    });
  }
  
  function calculateTime() {
    const startTime = Date.now();
  
    return Promise.all([waitOneSecond(), waitTwoSeconds(), waitThreeSeconds()])
      .then((results) => {
        const endTime = Date.now();
        const totalTime = endTime - startTime;
        console.log(`All promises resolved in ${totalTime} milliseconds`);
        return results;
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }
  
  calculateTime();
  