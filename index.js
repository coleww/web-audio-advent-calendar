window.AudioContext = window.AudioContext || window.webkitAudioContext
var ac = new AudioContext();
var range = require('range-inclusive')
var adsr = require('a-d-s-r')
var mainfreqs = [261.63, 246.94, 261.63, 220.00, 261.63, 293.66]
var bassfreqs = [440.00, 392.00, 349.23, 329.63, 440.00, 392.00, 261.63, 246.94]
var counterfreqs = [261.63, 293.66, 261.63, 329.63, 261.63, 293.66, 261.63, 329.63, 293.66, 261.63]
var wai = require('web-audio-ios')

wai(document.body, ac, function (unlocked) {
  console.log('boop\'d yah')
})

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
volume.gain.setValueAtTime(0, ac.currentTime)

var pie = require('pie-ano')(ac)
pie.connect(volume)

var Mkas = require('adventure-synth').default
var adventureSynth = new Mkas(ac)
adventureSynth.connect(volume)

var bass = require('bubble-bass')(ac)
bass.connect(volume)

var sparkleMotion = require('sparkle-motion')(ac)
sparkleMotion.connect(volume)

var triTri = require('tri-tri')(ac)
triTri.volume.gain.setValueAtTime(0, ac.currentTime)
triTri.start()
triTri.connect(volume)

var kicker = require('touch-down-dance')(ac)
kicker.connect(volume)

var snare = require('dj-snazzy-snare')(ac)
var snaregain = ac.createGain()
snaregain.gain.value = 0.13
snare.connect(snaregain)
snaregain.connect(volume)

var hat = require('really-hi-hat')(ac)
hat.connect(volume)




var clap = require('clappy')(ac)

volume.connect(ac.destination)

var synths = {
  day1: function () {
    var i = 0
    pie.update({freq: 220}, ac.currentTime)
    window.setInterval(function () {
      pie.update({freq: bassfreqs[i] / 2, attack: 0.1235, release: 0.125, decay: 0.25, sustain: 0.2375, peak: 0.09, mid: 0.05715, end: 0.0000001}, ac.currentTime)
      pie.start(ac.currentTime)
      if (++i >= bassfreqs.length) i = 0
    }, 1325)
  },
  day2: function () {
    var j = 0
    var envelop = adventureSynth.nodes().finalGain
    envelop.gain.setValueAtTime(0, ac.currentTime)
    adventureSynth.changeFreq(440)
    adventureSynth.start(ac.currentTime)
    window.setInterval(function () {
      adventureSynth.changeFreq(mainfreqs[mainfreqs.length - j - 1])
      adsr(envelop, ac.currentTime, {attack: 0.3, release: 0.15, decay: 0.15, sustain: 0.1, peak: 0.23, mid: 0.2, end: 0.0000001})
      if (++j >= mainfreqs.length) j = 0
    }, 1570)
  },
  day3: function () {
    var k = 0
    bass.update({freq: 220}, ac.currentTime)
    window.setInterval(function () {
      bass.update({freq: bassfreqs[bassfreqs.length - k - 1], attack: 0.1375, release: 0.115, decay: 0.0115, sustain: 0.123, peak: 0.09, mid: 0.12, end: 0.0000001}, ac.currentTime)
      bass.start(ac.currentTime)
      k++
      if (++k >= bassfreqs.length) k = 0
    }, 1205)
  },
  day4: function () {
    var l = 0
    sparkleMotion.update({freq: 220}, ac.currentTime)
    window.setInterval(function () {
      sparkleMotion.update({freq: counterfreqs[l], attack: 0.12375175, release: 0.3120001, decay: 0.120001, sustain: 0.15, peak: 0.067, mid: 0.0135, end: 0.00000001}, ac.currentTime)
      sparkleMotion.start(ac.currentTime)
      if (++l >= counterfreqs.length) l = 0
    }, 1175)
  },
  day5: function () {
    var m = 0
    window.setInterval(function () {
      triTri.root.frequency.setValueAtTime(mainfreqs[m] * 4, ac.currentTime)
      triTri.third.frequency.setValueAtTime(mainfreqs[mainfreqs.length - m - 1] * 2, ac.currentTime)
      triTri.fifth.frequency.setValueAtTime(mainfreqs[m] * 2, ac.currentTime)
      adsr(triTri.volume, ac.currentTime, {freq: bassfreqs[m] / 2, attack: 0.13, release: 0.15, decay: 0.21, sustain: 0.23, peak: 0.09, mid: 0.05715, end: 0.0000001})
      if (++m >= mainfreqs.length) m = 0
    }, 1395)
  },
  day6: function () {
    var n = 0
    window.setInterval(function () {
      kicker.update({peak: 0.7625, mid: 0.624698})
      kicker.start(ac.currentTime)
      if (++n >= mainfreqs.length) n = 0
    }, 1405)

    window.setInterval(function () {
      kicker.update({peak: 0.625, mid: 0.524698})
      kicker.start(ac.currentTime)
    }, 875)
  },
  day7: function () {
    window.setInterval(function () {
      snare.start(ac.currentTime)
    }, 1150)
  },
  day8: function () {
    window.setInterval(function () {
      hat.start(ac.currentTime)
    }, 1300)
  },
  day9: function () {
    // LOL NOTHING TAKE THAT!
  },
  day15: function() {
    window.setInterval(function() {
      var clapNode = clap()
      var clapGain = ac.createGain()
      clapGain.gain.value = 0.12
      clapNode.connect(clapGain)
      clapGain.connect(volume)
      clapNode.start(ac.currentTime)
    }, 1150 * 4)
  }





  // function () {
  //   drone-e-o
  // }
  // function () {
  //   run samples thru wobbler?
  // }
  // function () {
  //   wai? hmmm....well, verify it works first. maybe a vocal sample? PHASING YEAH COOL
  // }



}



Object.keys(dayMap).forEach(function (day) {
  if (synths[day]) {
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
        if (Math.random() < 0.2) elf.style.top = ~~elf.style.top.replace('px', '') + (5 * (~~(Math.random() * 2) - 0.7) ) + 'px'
        if (Math.random() < 0.2) elf.style.left = ~~elf.style.left.replace('px', '') + (5 * (~~(Math.random() * 2) - 0.7) ) + 'px'
        if (elf.style.top < 0) elf.style.top = 0
        if (elf.style.left < 0) elf.style.left = 0
        if (elf.style.bottom > screeny) elf.style.top = screeny
        if (elf.style.right > screenx) elf.style.left = screenx
      }, 333)
      synths[day]()
    } else {
      dayDoor.addEventListener('click', function (e) {
        if (!dayMap[day]) {
          localStorage.setItem(day, true)
          document.getElementById(day).style.opacity = 0
          var elf = document.getElementById(day + 'elf')
          elf.style.opacity = 1
          elf.style.top = e.clientY + 'px'
          elf.style.left = e.clientX + 'px'
          elf.style.zIndex = 1000
          window.setInterval(function () {
            if (Math.random() < 0.2) elf.style.top = ~~elf.style.top.replace('px', '') + (5 * (~~(Math.random() * 2) - 0.7) ) + 'px'
            if (Math.random() < 0.2) elf.style.left = ~~elf.style.left.replace('px', '') + (5 * (~~(Math.random() * 2) - 0.7) ) + 'px'
            if (elf.style.top < 0) elf.style.top = 0
            if (elf.style.left < 0) elf.style.left = 0
            if (elf.style.bottom > screeny) elf.style.top = screeny
            if (elf.style.right > screenx) elf.style.left = screenx
          }, 333)
          dayMap[day] = true
          synths[day]()
        }
      })
    }
  }
})

volume.gain.linearRampToValueAtTime(0.6, ac.currentTime + 7.5)
