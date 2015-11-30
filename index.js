window.AudioContext = window.AudioContext || window.webkitAudioContext;
var ac = new AudioContext();
var range = require('range-inclusive')
var freqs = [440, 880, 660, 220, 440]// an array of appropriate frequencies for things to play

var hamming = false
var ham = document.querySelector('.hamburglar')
document.getElementById('intro').addEventListener('click', function () {
  ham.style.display = hamming ? 'block' : 'none'
  hamming = !hamming
})

var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    screenx = w.innerWidth || e.clientWidth || g.clientWidth,
    screeny = w.innerHeight|| e.clientHeight|| g.clientHeight;

var dayMap =  range(25).reduce(function (o, i) {
  o['day' + i] = false//localStorage.getItem('day' + i)
  return o
}, {})

var tri = require('tri-tri')(ac)
tri.connect(ac.destination)
var synths = {
  day1: function () {
    var i = 0
    tri.volume.gain.value = 0.6
    tri.root.frequency.setValueAtTime(freqs[i], ac.currentTime)
    tri.third.frequency.setValueAtTime(freqs[i], ac.currentTime)
    tri.fifth.frequency.setValueAtTime(freqs[i], ac.currentTime)
    tri.start(ac.currentTime)
    window.setInterval(function () {
      i++
      if (i >= freqs.length) i = 0
      tri.root.frequency.setValueAtTime(freqs[i], ac.currentTime)
      tri.third.frequency.setValueAtTime(freqs[i], ac.currentTime)
      tri.fifth.frequency.setValueAtTime(freqs[i], ac.currentTime)
    }, 1000)
  }
}

Object.keys(dayMap).forEach(function (day) {
  console.log(day)
  if (synths[day]) {
    console.log('doing', day)
    var dayDoor = document.getElementById(day)
    dayDoor.style.borderRadius = '100%'
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
})
