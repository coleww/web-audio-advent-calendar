window.AudioContext = window.AudioContext || window.webkitAudioContext
var ac = new AudioContext();
var range = require('range-inclusive')
var mainfreqs = [261.63, 246.94, 261.63, 220.00, 261.63, 293.66]
var bassfreqs = [440.00, 392.00, 349.23, 329.63, 440.00, 392.00, 261.63, 246.94]
var counterfreqs = [261.63, 293.66, 261.63, 329.63, 261.63, 293.66, 261.63, 329.63, 293.66, 261.63]

// HACK FOR IOS DEVICES BECAUSE APPLE IS AWFUL
function handleIOS() {
  // create empty buffer
  var buffer = ac.createBuffer(1, 1, 22050)
  var source = ac.createBufferSource()
  source.buffer = buffer
  // connect to output (your speakers)
  source.connect(ac.destination)
  // play the file
  source.noteOn(0)
  window.removeEventListener('touchstart', handleIOS, false)
}
window.addEventListener('touchstart', handleIOS, false)
// END OF AWFUL APPLE HACK




var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    screenx = w.innerWidth || e.clientWidth || g.clientWidth,
    screeny = w.innerHeight|| e.clientHeight|| g.clientHeight;

var dayMap =  range(25).reduce(function (o, i) {
  o['day' + i] = localStorage.getItem('day' + i)
  return o
}, {})

var volume = ac.createGain()
volume.gain.value = 0.4

var pie = require('pie-ano')(ac)
pie.connect(volume)

var Mkas = require('adventure-synth').default
var adventureSynth = new Mkas(ac)
adventureSynth.connect(volume)

volume.connect(ac.destination)

var synths = {
  day1: function () {
    var i = 0
    pie.update({freq: 220}, ac.currentTime)
    pie.nodes().gain.gain.value = 0.4
    window.setInterval(function () {
      pie.update({freq: bassfreqs[i], attack: 0.5, release: 0.25, decay: 0.25, sustain: 0.3}, ac.currentTime)
      pie.start(ac.currentTime)
      if (++i >= bassfreqs.length) i = 0
    }, 975)
  },
  day2: function () {
    var i = 0
    adventureSynth.changeFreq(440)
    adventureSynth.start(ac.currentTime)
    var envelop = adventureSynth.nodes().finalGain
    window.setInterval(function () {
      adventureSynth.changeFreq(bassfreqs[i])
      envelop.gain.linearRampToValueAtTime(0.85, ac.currentTime + 0.75)
      window.setTimeout(function () {
        envelop.gain.linearRampToValueAtTime(0, ac.currentTime + 0.25)
      }, 750)
      if (++i >= bassfreqs.length) i = 0
    }, 1000)
  }
}



Object.keys(dayMap).forEach(function (day) {
  console.log(day)
  if (synths[day]) {
    console.log('doing', day)
    var dayDoor = document.getElementById(day)
    dayDoor.style.borderRadius = '100%'
    if (dayMap[day]) {
      // this door was already opened by the user! *nice*!
      // COPY PASTA WHATEVER DGAF ITS THE SEASON AMIRITE?
      var dayDoor = document.getElementById(day)
      dayDoor.style.opacity = 0
      var elf = document.getElementById(day + 'elf')
      elf.style.opacity = 1
      var rect = dayDoor.getBoundingClientRect()
      elf.style.top = rect.top + 'px'
      elf.style.left = rect.left + 'px'
      elf.style.zIndex = 1000
      window.setInterval(function () {
        console.log('boop')
        console.log(elf.style.top)
        elf.style.top = ~~elf.style.top.replace('px', '') + ~~(Math.random() * 3) + 'px'
        elf.style.left = ~~elf.style.left.replace('px', '') + ~~(Math.random() * 3) + 'px'
        if (elf.style.top < 0) elf.style.top = 0
        if (elf.style.left < 0) elf.style.left = 0
        if (elf.style.top > screeny) elf.style.top = screeny
        if (elf.style.left > screenx) elf.style.left = screenx
      }, 333)
      synths[day]()
    } else {
      dayDoor.addEventListener('click', function (e) {
        console.log(e)
        if (!dayMap[day]) {
          console.log('init')
          localStorage.setItem(day, true)
          document.getElementById(day).style.opacity = 0
          var elf = document.getElementById(day + 'elf')
          elf.style.opacity = 1
          elf.style.top = e.clientY + 'px'
          elf.style.left = e.clientX + 'px'
          elf.style.zIndex = 1000
          window.setInterval(function () {
            console.log('boop')
            console.log(elf.style.top)
            elf.style.top = ~~elf.style.top.replace('px', '') + ~~(Math.random() * 3) + 'px'
            elf.style.left = ~~elf.style.left.replace('px', '') + ~~(Math.random() * 3) + 'px'
            if (elf.style.top < 0) elf.style.top = 0
            if (elf.style.left < 0) elf.style.left = 0
            if (elf.style.top > screeny) elf.style.top = screeny
            if (elf.style.left > screenx) elf.style.left = screenx
          }, 333)
          dayMap[day] = true
          synths[day]()
        }
      })
    }
  }
})
