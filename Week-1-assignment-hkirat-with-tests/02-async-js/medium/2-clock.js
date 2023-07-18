// Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
// clock that shows you the current machine time?

// Can you make it so that it updates every second, and shows time in the following formats - 

//  - HH:MM::SS (Eg. 13:45:23)

//  - HH:MM::SS AM/PM (Eg 01:45:23 PM)

//Done

 function getTime(){
    let Hours =new Date().getHours();
    let Minutes =new Date().getMinutes();
    let Seconds =new Date().getSeconds();
    let time = `${Hours}:${Minutes}:${Seconds}`
    console.clear();
    console.log(time);
    setTimeout(getTime,1000);

 }

getTime();
