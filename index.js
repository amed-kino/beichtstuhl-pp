require ('./src/welcomeMessage.js')

var keypress = require('keypress');
var shell = require('shelljs');
var childProcess = require('child_process')
var terminate = require('terminate');

keypress(process.stdin);

var recording = false
var recordingHandler = null

function closeRecording (handler) {
  terminate(handler.pid, function(err, done){
    if(err) {
      console.log(err.toString().red);
    } else {
      console.log('Done!'.blue);
    }
    console.log('.')
  });
  return null
}

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  // console.log(key);
  if (key) {
    // shell controll keys
    if (key.name == 'return') {console.log('\r')}
    if (key.name == 'escape') {console.log('\u001b')}
    if (key.name == 'y') {console.log('y')}
    if (key.name == 'n') {console.log('n')}
    // Playback keys
    if (key.name == 'space') {
      if (recording) {
        console.log('\u25A3 STOP'.red)
        recordingHandler = closeRecording(recordingHandler)
        recording = false
      } else {
        console.log('\u25C9 RECORDING'.red)
        recordingHandler = childProcess.execFile('sh', ['./scripts/record.sh'], (err, stdout, stderr) => {
          // if (err) console.log(err)
        });
        recordingHandler.on('close', (code) => {
          if (code) { console.log(` ~ Exited with code ${code}`.yellow);}
        })
        recording = true
      }

  }
    if (key.name == 'p') {
      console.log('Play Video')
      playHandler = childProcess.execFile('sh', ['./scripts/play.sh'], (err, stdout, stderr) => {});
    }
    if (key.name == 'h') {
      console.log('Get Help')
    }
    if (key.name == 'a') {
      console.log('Submit')
    }
    if (key.name == 'f') {
      console.log('Filter')
      filterHandler = childProcess.execFile('sh', ['./scripts/filter.sh'], (err, stdout, stderr) => {});
      filterHandler.on('close', () => {console.log('done!')})
    }
    if (key.ctrl && key.name == 'c') {
      console.log('Exit!');
      if (recordingHandler) {
        recordingHandler = closeRecording(recordingHandler)
      }
      process.exit();
    }
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
