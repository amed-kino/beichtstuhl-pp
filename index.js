require ('./src/welcomeMessage.js')
var keypress = require('keypress');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  // console.log('got "keypress"', key);
  if (key) {
    if (key.name == 'space') {console.log('Start Recording')}
    if (key.name == 's') {console.log('Stop Recording')}
    if (key.name == 'p') {console.log('Play Video')}
    if (key.name == 'h') {console.log('Get Help')}
    if (key.ctrl && key.name == 'c') {
      console.log('exit')
      process.stdin.pause();
    }
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
