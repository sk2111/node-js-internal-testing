setTimeout(() => {
  console.log('I am setTimeout 1');
}, 0);

setImmediate(() => {
  console.log('I am setImmediate 2');
});

for (let i = 0; i < 1000000000; i++) {}

/*
    The order is consistent her settimeout 1 first and then setImmediate 2 

    Reason:
        1) There is only one thread which takes care of v8 and event loop
        2) first the entire code need to run and then only event loop starts
        3) Event loop starts at timer phase first
        4) When the above for loop removed (mimics length main file) since the code is short
          the v8 main thread will push the callback into timer queue and pushes the immediate callback
          into check queue

        5) Since all this happens very fast when the event loop start at timer phase even though the 
        setTimeout is 0 it may or may not be completed at that time because this file has very few 
        lines of code which is executed very very fast

        6) Thus a race condition happens and we cannot predict which will run first
*/
