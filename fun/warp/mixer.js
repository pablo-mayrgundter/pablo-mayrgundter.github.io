// Periodically trigger a function that causes the scope area to shake.
const synthConfig = {
  synthDef: {
    ugen: 'flock.ugen.out',
    sources: []
  }
}
let numFreqs = 3;
for (let i = 0; i < numFreqs; i++) {
  synthConfig.synthDef.sources.push({
    id: 'tone' + i,
        ugen: 'flock.ugen.sinOsc',
        freq: 440
        });
}
let synth;
let environment;
let soundRunning = false;
function toggleSound() {
  if (soundRunning) {
    stopSound();
  } else {
    startSound();
  }
}
function startSound() {
  if (!environment) {
    environment = flock.init();
    synth = flock.synth(synthConfig);
  }
  soundRunning = true;
  environment.start();
  return false;
}
function stopSound() {
  if (environment) {
    environment.stop();
  }
  soundRunning = false;
}

