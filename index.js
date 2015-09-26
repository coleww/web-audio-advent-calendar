var ac = AudioContext // or whatever

var freqs = []// an array of appropriate frequencies for things to play


var day1 = require('synth')
document.getElementById('day1').addEventListener('click', function () {
  day1.start(freqs[0])
})