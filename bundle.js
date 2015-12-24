(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var warlock = require('warlock-bass')(ac)
warlock.connect(volume)

var tomTom = require('tom-from-space')(ac)
tomTom.connect(volume)

var whiner = require('a-whining-capitalist')(ac)
whiner.connect(volume)

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
  day9: function() {
    window.setInterval(function() {
      var clapNode = clap()
      var clapGain = ac.createGain()
      clapGain.gain.value = 0.12
      clapNode.connect(clapGain)
      clapGain.connect(volume)
      clapNode.start(ac.currentTime)
    }, 1150 * 4)
  },
  day10: function () {
    window.setInterval(function () {
      tomTom.update({freq: [150, 125, 250, 200][~~(Math.random() * 4)], endFreq: [135, 225, 175][~~(Math.random() * 3)]})
      tomTom.start(ac.currentTime)
    }, 1700)
  },
  day11: function () {
    var m = 0
    window.setInterval(function () {
      whiner.update({freq: counterfreqs[counterfreqs.length - m - 1]}, ac.currentTime)
      whiner.start(ac.currentTime)
      m++
      if (++m >= counterfreqs.length) m = 0
    }, 1050)
  },
  day12: function () {
    var l = 0
    window.setInterval(function () {
      warlock.update({freq: bassfreqs[bassfreqs.length - l - 1]}, ac.currentTime)
      warlock.start(ac.currentTime)
      l++
      if (++l >= bassfreqs.length) l = 0
    }, 1050)
  }
  // day13: function () {
  //   window.setInterval(function () {
    //   hat.start(ac.currentTime)
    // }, 1300)
  // },
  // day14: function () {
  //   window.setInterval(function () {
    //   hat.start(ac.currentTime)
    // }, 1300)
  // },


  // day16: function () {
  //   window.setInterval(function () {
    //   hat.start(ac.currentTime)
    // }, 1300)
  // },

  // day17: function () {
  //   window.setInterval(function () {
    //   hat.start(ac.currentTime)
    // }, 1300)
  // },

  // day18: function () {
  //   window.setInterval(function () {
    //   hat.start(ac.currentTime)
    // }, 1300)
  // },

  // day19: function () {
  //   window.setInterval(function () {
    //   hat.start(ac.currentTime)
    // }, 1300)
  // },

  // day20: function () {
  //   window.setInterval(function () {
    //   hat.start(ac.currentTime)
    // }, 1300)
  // },

  // day21: function () {
  //   window.setInterval(function () {
    //   hat.start(ac.currentTime)
    // }, 1300)
  // },

  // day22: function () {
  //   window.setInterval(function () {
    //   hat.start(ac.currentTime)
    // }, 1300)
  // },

  // day23: function () {
  //   window.setInterval(function () {
    //   hat.start(ac.currentTime)
    // }, 1300)
  // },

  // day24: function () {
  //   window.setInterval(function () {
    //   hat.start(ac.currentTime)
    // }, 1300)
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

},{"a-d-s-r":2,"a-whining-capitalist":3,"adventure-synth":4,"bubble-bass":5,"clappy":6,"dj-snazzy-snare":7,"pie-ano":12,"range-inclusive":14,"really-hi-hat":15,"sparkle-motion":16,"tom-from-space":18,"touch-down-dance":19,"tri-tri":20,"warlock-bass":21,"web-audio-ios":22}],2:[function(require,module,exports){
module.exports = function (gainNode, when, adsr) {
  gainNode.gain.exponentialRampToValueAtTime(adsr.peak, when + adsr.attack)
  gainNode.gain.exponentialRampToValueAtTime(adsr.mid, when + adsr.attack + adsr.decay)
  gainNode.gain.setValueAtTime(adsr.mid, when + adsr.sustain + adsr.attack + adsr.decay)
  gainNode.gain.exponentialRampToValueAtTime(adsr.end, when + adsr.sustain + adsr.attack + adsr.decay + adsr.release)
}

},{}],3:[function(require,module,exports){
var makeDistortionCurve = require('make-distortion-curve')
var MIDIUtils = require('midiutils')
var adsr = require('a-d-s-r')
// yr function should accept an audioContext, and optional params/opts
module.exports = function (ac, opts) {
  // make some audioNodes, connect them, store them on the object
  var audioNodes = {}

  var oscillator1 = ac.createOscillator(ac)
  oscillator1.type = 'triangle'
  oscillator1.detune.value = Math.random()
  var oscillator2 = ac.createOscillator(ac)
  oscillator2.type = 'square'
  oscillator2.detune.value = Math.random()
  var oscillator3 = ac.createOscillator(ac)
  oscillator3.type = 'sawtooth'
  oscillator3.detune.value = Math.random()
  var oscillator4 = ac.createOscillator(ac)
  oscillator4.type = 'sine'
  oscillator4.detune.value = Math.random()

  var oscillator5 = ac.createOscillator(ac)
  oscillator5.type = 'sawtooth'
  oscillator5.detune.value = Math.random()
  var oscillator6 = ac.createOscillator(ac)
  oscillator6.type = 'triangle'
  oscillator6.detune.value = Math.random()

  var delayA = ac.createDelay(0.2322)
  var delayB = ac.createDelay(0.252752313103222)
  var delayC = ac.createDelay(0.27222)

  var filterA = ac.createBiquadFilter()
  filterA.Q.value = 12
  filterA.type = 'peaking'
  filterA.detune.value = Math.random()


  // that one distortion curve that everyone copy pastes from stack overflow anyways

  // make a distortion pedal! yay!
  var distortionA = ac.createWaveShaper()
  distortionA.curve = makeDistortionCurve(800)

  var filterB = ac.createBiquadFilter()
  filterB.Q.value = 12
  filterB.type = 'bandpass'
  filterB.detune.value = Math.random()

  // that one distortion curve that everyone copy pastes from stack overflow anyways

  // make a distortion pedal! yay!
  var distortionB = ac.createWaveShaper()
  distortionB.curve = makeDistortionCurve(100)

  var filterC = ac.createBiquadFilter()
  filterC.Q.value = 7
  filterC.type = 'lowpass'
  filterC.detune.value = Math.random()

  // that one distortion curve that everyone copy pastes from stack overflow anyways

  // make a distortion pedal! yay!
  var distortionC = ac.createWaveShaper()
  distortionC.curve = makeDistortionCurve(1000)



  var gainA = ac.createGain()
  gainA.gain.value = 0.333333333333333
  var gainB = ac.createGain()
  gainB.gain.value = 0.333333333333333
  var gainC = ac.createGain()
  gainC.gain.value = 0.333333333333333
  var gainZ = ac.createGain()
  gainZ.gain.value = 0.5



  var filterZ = ac.createBiquadFilter()
  filterZ.Q.value = 12
  filterZ.type = 'highshelf'
  filterZ.detune.value = Math.random()

  // that one distortion curve that everyone copy pastes from stack overflow anyways

  var delayZ = ac.createDelay(0.222)

  // make a distortion pedal! yay!
  var distortionZ = ac.createWaveShaper()
  distortionZ.curve = makeDistortionCurve(750)
  distortionZ.oversample = '4x'


  var volume = ac.createGain()
  volume.gain.setValueAtTime(0, ac.currentTime)

  //  START OF CHAIN (NOT MARKOV)

  oscillator1.connect(delayA)

  oscillator5.connect(filterA.frequency)
  oscillator5.connect(gainZ.gain)
  oscillator5.frequency.value = 0.133

  oscillator4.connect(delayB)
  oscillator6.connect(filterB.frequency)
  oscillator6.connect(gainC.gain)
  oscillator6.frequency.value = 0.273

  oscillator2.connect(delayC)
  oscillator3.connect(delayC)

  delayA.connect(filterA)
  delayB.connect(filterB)
  delayC.connect(filterC)

  filterA.connect(gainA)
  filterB.connect(gainB)
  filterC.connect(gainC)

  oscillator1.connect(gainA)
  oscillator5.connect(gainA)

  oscillator4.connect(gainB)
  oscillator6.connect(gainB)

  oscillator2.connect(gainC)
  oscillator3.connect(gainC)

  gainA.connect(distortionA)
  gainB.connect(distortionB)
  gainC.connect(distortionC)

  distortionC.connect(delayZ)
  delayZ.connect(filterZ)
  distortionC.connect(gainZ)
  filterZ.connect(gainZ)
  gainZ.connect(distortionZ)

  distortionA.connect(volume)
  distortionB.connect(volume)
  distortionZ.connect(volume)
  // END OF CHAIN

  audioNodes.oscillator1 = oscillator1
  audioNodes.oscillator2 = oscillator2
  audioNodes.oscillator3 = oscillator3
  audioNodes.oscillator4 = oscillator4
  audioNodes.oscillator5 = oscillator5
  audioNodes.oscillator6 = oscillator6
  audioNodes.delayA = delayA
  audioNodes.delayB = delayB
  audioNodes.delayC = delayC
  audioNodes.delayZ = delayZ
  audioNodes.gainA = gainA
  audioNodes.gainB = gainB
  audioNodes.gainC = gainC
  audioNodes.filterA = filterA
  audioNodes.filterB = filterB
  audioNodes.filterC = filterC
  audioNodes.filterZ = filterZ
  audioNodes.distortionA = distortionA
  audioNodes.distortionB = distortionB
  audioNodes.distortionC = distortionC
  audioNodes.distortionZ = distortionZ
  audioNodes.volume = volume
  audioNodes.settings = {
    attack: 0.01,
    decay: 0.05,
    sustain: 0.4,
    release: 0.1,
    peak: 0.3,
    mid: 0.1,
    end: 0.00000000000001 // lol idk wtf
  }

  // bzzzzz
  oscillator1.start(ac.currentTime)
  oscillator2.start(ac.currentTime)
  oscillator3.start(ac.currentTime)
  oscillator4.start(ac.currentTime)
  oscillator5.start(ac.currentTime)
  oscillator6.start(ac.currentTime)

  return {
    connect: function (input) {
      audioNodes.volume.connect(input)
    },
    start: function (when) {
      adsr(audioNodes.volume, when, audioNodes.settings)
    },
    stop: function (when) {
      console.log('SOMETIMES I DOUBT YR COMMITMENT 2 THE PARTY\np.s. yr oscillators are destroyed, make a new synth plz')
      oscillator1.stop(when)
      oscillator2.stop(when)
      oscillator3.stop(when)
      oscillator4.stop(when)
      oscillator5.stop(when)
      oscillator6.stop(when)
    },
    update: function (opts, when) {
      // available opts:
      // {midiNote: 62, lfoL: , lfoR: , freq, attack: , decay: , sustain: , release: , peak: , mid:}
      Object.keys(opts).forEach(function (k) {
        var v = opts[k]
        if (k == 'midiNote' || k == 'freq') {
          var freq = k == 'midiNote' ? MIDIUtils.noteNumberToFrequency(v) : v

          audioNodes.oscillator1.frequency.setValueAtTime(freq * 2.0, when)
          audioNodes.oscillator2.frequency.setValueAtTime(freq * 2.0, when)
          audioNodes.oscillator3.frequency.setValueAtTime(freq * 8.0, when)
          audioNodes.oscillator4.frequency.setValueAtTime(freq * 4.0, when)
          audioNodes.oscillator5.frequency.setValueAtTime(freq * 2.0, when)
          audioNodes.oscillator6.frequency.setValueAtTime(freq * 4.0, when)

          filterA.frequency.setValueAtTime(freq / (2 + Math.random()), when)
          filterB.frequency.setValueAtTime(freq * (2 + Math.random()), when)
          filterC.frequency.setValueAtTime(freq / (Math.random()), when)
          filterZ.frequency.setValueAtTime(freq * (1.5 + Math.random()), when)

        } else if (k == 'lfoL' || k == 'lfoR') {
          var node = k == 'lfoL' ? audioNodes.oscillator5 : audioNodes.oscillator6
          node.frequency.setValueAtTime(v, when)
        } else {
          // just an ADSR value
          audioNodes.settings[k] = v
        }
      })
    },
    nodes: function () {
      // returns an object of `{stringKey: audioNode}` for raw manipulation
      return audioNodes
    }
  }
}
},{"a-d-s-r":2,"make-distortion-curve":9,"midiutils":10}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*global AudioContext:false, webkitAudioContext:false*/

function buildLowshelf(context) {
  var lowshelf = context.createBiquadFilter();

  lowshelf.type = 'lowshelf';
  lowshelf.frequency.value = 750;
  lowshelf.Q.value = 100;
  lowshelf.gain.value = 30;

  return lowshelf;
}

function buildNotch(context) {
  var notch = context.createBiquadFilter();

  notch.type = 'notch';
  notch.frequency.value = 2000;

  return notch;
}

function buildOscillators(context, connectionNode) {
  var initialFreq = arguments.length <= 2 || arguments[2] === undefined ? 40 : arguments[2];

  return oscSettings.map(function (settings) {
    var osc = context.createOscillator();

    osc.type = settings.type;
    osc.frequency.value = initialFreq;
    osc.detune.value = settings.detune;

    osc.connect(connectionNode);

    return osc;
  });
}

function isAudioContext(context) {
  return context instanceof AudioContext || context instanceof webkitAudioContext;
}

var oscSettings = [{ type: 'sawtooth', detune: -10 }, { type: 'sawtooth', detune: -12 }, { type: 'sawtooth', detune: 0 }, { type: 'sawtooth', detune: 15 }, { type: 'triangle', detune: 10 }];

var AdventureSynth = (function () {
  function AdventureSynth(context) {
    var initialFreq = arguments.length <= 1 || arguments[1] === undefined ? 40 : arguments[1];

    _classCallCheck(this, AdventureSynth);

    if (!isAudioContext(context)) {
      throw Error('Must provide AudioContext');
    }

    this.context = context;

    var notch = buildNotch(context);
    var lowshelf = buildLowshelf(context);

    var gain = context.createGain();
    gain.gain.setValueAtTime(0.10, context.currentTime);

    var finalGain = context.createGain();
    finalGain.gain.setValueAtTime(0.9, context.currentTime);

    var compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -45;
    compressor.knee.value = 40;
    compressor.attack.value = 0.15;
    compressor.release.value = 0.45;
    compressor.ratio.value = 16;
    compressor.reduction.value = -80;

    notch.connect(lowshelf);
    lowshelf.connect(gain);
    gain.connect(compressor);
    compressor.connect(finalGain);

    var oscillators = buildOscillators(context, notch, initialFreq);

    this.changeFreq = this.changeFreq.bind(this);

    this.audioNodes = {
      oscillators: oscillators,
      notch: notch,
      lowshelf: lowshelf,
      gain: gain,
      finalGain: finalGain
    };
  }

  _createClass(AdventureSynth, [{
    key: 'nodes',
    value: function nodes() {
      return this.audioNodes;
    }
  }, {
    key: 'connect',
    value: function connect(node) {
      var finalGain = this.audioNodes.finalGain;

      finalGain.connect(node);

      return this;
    }
  }, {
    key: 'start',
    value: function start(time) {
      var oscillators = this.audioNodes.oscillators;
      var context = this.context;

      var startTime = time || context.currentTime;

      oscillators.forEach(function (osc) {
        return osc.start(startTime);
      });

      return this;
    }
  }, {
    key: 'stop',
    value: function stop(time) {
      var oscillators = this.audioNodes.oscillators;
      var context = this.context;

      var stopTime = time || context.currentTime;

      oscillators.forEach(function (osc) {
        return osc.stop(stopTime);
      });

      return this;
    }
  }, {
    key: 'changeFreq',
    value: function changeFreq(freq) {
      var oscillators = this.audioNodes.oscillators;
      var context = this.context;

      oscillators.forEach(function (osc) {
        return osc.frequency.setValueAtTime(freq, context.currentTime);
      });

      return this;
    }
  }, {
    key: 'changeGain',
    value: function changeGain(gain) {
      var finalGain = this.audioNodes.finalGain;
      var context = this.context;

      finalGain.gain.setValueAtTime(gain, context.currentTime);

      return this;
    }
  }]);

  return AdventureSynth;
})();

exports.default = AdventureSynth;
},{}],5:[function(require,module,exports){
var makeDistortionCurve = require('make-distortion-curve')
var MIDIUtils = require('midiutils')
var adsr = require('a-d-s-r')
// yr function should accept an audioContext, and optional params/opts
module.exports = function (ac, opts) {
  // make some audioNodes, connect them, store them on the object
  var audioNodes = {}

  var osc1 = ac.createOscillator()
  var osc2 = ac.createOscillator()
  osc1.type = 'square'
  osc2.type = 'square'

  // add some funk to that
  osc1.detune.setValueAtTime(-Math.random(), ac.currentTime)
  osc2.detune.setValueAtTime(Math.random(), ac.currentTime)

  var ldistortion = ac.createWaveShaper()
  ldistortion.curve = makeDistortionCurve(850 + ~~(Math.random() * 450))
  ldistortion.oversample = '4x'

  var rdistortion = ac.createWaveShaper()
  rdistortion.curve = makeDistortionCurve(850 + ~~(Math.random() * 450))
  rdistortion.oversample = '4x'

  var leftfilter = ac.createBiquadFilter()
  leftfilter.type = 'lowpass'
  leftfilter.Q.value = 15
  leftfilter.frequency.setValueAtTime(500, ac.currentTime)

  var rightfilter = ac.createBiquadFilter()
  rightfilter.type = 'lowpass'
  rightfilter.Q.value = 15
  rightfilter.frequency.setValueAtTime(500, ac.currentTime)

  var compressor = ac.createDynamicsCompressor()
  compressor.threshold.value = -50
  compressor.knee.value = 50
  compressor.ratio.value = 18
  compressor.reduction.value = -5
  compressor.attack.value = 0.05
  compressor.release.value = 0.05

  var pregain = ac.createGain()
  pregain.gain.setValueAtTime(0.7, ac.currentTime)
//
  var oscsine = ac.createOscillator()
  oscsine.type = 'sine'
  var delay = ac.createDelay(0.1)
  var sinedist = ac.createWaveShaper()
  sinedist.curve = makeDistortionCurve(1000)
  var delay2 = ac.createDelay(0.13)
  var sinegain = ac.createGain()
  sinegain.gain.setValueAtTime(0.25, ac.currentTime)
//
  var mainfilter = ac.createBiquadFilter()
  mainfilter.type = 'lowshelf'
  mainfilter.Q.value = 20
  mainfilter.frequency.setValueAtTime(500, ac.currentTime)

  var finaldist = ac.createWaveShaper()
  finaldist.curve = makeDistortionCurve(1000)
  finaldist.oversample = '4x'
  var delay2 = ac.createDelay(0.23)

  var maingain = ac.createGain()
  maingain.gain.setValueAtTime(0, ac.currentTime)



//
  osc1.connect(ldistortion)
  ldistortion.connect(leftfilter)
  leftfilter.connect(compressor)
//
  osc2.connect(rdistortion)
  rdistortion.connect(rightfilter)
  rightfilter.connect(compressor)
//
  compressor.connect(pregain)
//
  oscsine.connect(delay)
  delay.connect(sinedist)
  oscsine.connect(sinedist)
  sinedist.connect(delay2)
  delay2.connect(sinegain)
  sinedist.connect(sinegain)
//
  pregain.connect(mainfilter)
  sinegain.connect(mainfilter)
  mainfilter.connect(maingain)

  audioNodes.osc1 = osc1
  audioNodes.osc2 = osc2
  audioNodes.oscsine = oscsine
  audioNodes.ldistortion = ldistortion
  audioNodes.rdistortion = rdistortion
  audioNodes.leftfilter = leftfilter
  audioNodes.rightfilter = rightfilter
  audioNodes.mainfilter = mainfilter
  audioNodes.maingain = maingain
  audioNodes.pregain = pregain
  audioNodes.sinegain = sinegain
  audioNodes.delay = delay
  audioNodes.delay2 = delay2
  audioNodes.sinedist = sinedist
  audioNodes.compressor = compressor

  // gosh i wish there was an audioNode that just did this...
  audioNodes.settings = {
    attack: 0.1,
    decay: 0.05,
    sustain: 0.3,
    release: 0.1,
    peak: 0.5,
    mid: 0.3,
    end: 0.0000000001,
    detune: 1,
    chord: false // TODO: build chords instead of playing huge notes as an option?
  }

  return {
    connect: function (input) {
      // // this function should call `connect` on yr output nodes with `input` as the arg
      audioNodes.maingain.connect(input)

      // just let them buzz forever, deal with "notes" via adsr tricks
      audioNodes.osc1.start(ac.currentTime)
      audioNodes.osc2.start(ac.currentTime)
      audioNodes.oscsine.start(ac.currentTime)
    },
    start: function (when) {
      adsr(audioNodes.maingain, when, audioNodes.settings)
    },
    stop: function (when) {
      audioNodes.osc1.stop(when)
      audioNodes.osc2.stop(when)
      audioNodes.oscsine.stop(when)
      console.log('whyd u let the bass go? gotta catch a new one now!!!!')
    },
    update: function (opts, when) {
      // available opts:
      // {midiNote: 62, attack: , decay: , sustain: , release: }
      Object.keys(opts).forEach(function (k) {
        var v = opts[k]
        if (k == 'midiNote' || k == 'freq') {
          var freq = k == 'midiNote' ? MIDIUtils.noteNumberToFrequency(v) : v
          audioNodes.leftfilter.frequency.linearRampToValueAtTime(freq + (freq / (2 + Math.random())), when + Math.random())
          audioNodes.rightfilter.frequency.linearRampToValueAtTime(freq + (freq / (2 + Math.random())), when + Math.random())
          audioNodes.mainfilter.frequency.linearRampToValueAtTime(freq - (freq / (1.5 + Math.random())), when + Math.random())

          audioNodes.osc1.frequency.setValueAtTime(freq / 4.0, when)
          audioNodes.osc2.frequency.setValueAtTime(freq / 4.0, when)
          audioNodes.oscsine.frequency.setValueAtTime(freq / 4.0, when)
          // add some funk to that
          audioNodes.osc1.detune.setValueAtTime(audioNodes.settings.detune * -Math.random(), when)
          audioNodes.osc2.detune.setValueAtTime(audioNodes.settings.detune * Math.random(), when)
        } else {
          // just an ADSR value
          audioNodes.settings[k] = v
        }
      })
    },
    nodes: function () {
      // returns an object of `{stringKey: audioNode}` for raw manipulation
      return audioNodes
    }
  }
}
},{"a-d-s-r":2,"make-distortion-curve":9,"midiutils":10}],6:[function(require,module,exports){
var NoiseBuffer = require('noise-buffer');

module.exports = function(context) {

  return function() {

    /*
      All this does is feed white noise
      through two paths: one short burst
      that goes through an envelope mod-
      ified by an LFO at 80hz, simulat-
      ing a few rapid claps, and a long-
      er burst that simulates the rever-
      beration of the claps through the
      room.
    */

    var duration = 1.2;
    var cycles = 3;
    var clapFrequency = 80;
    var clapLength = cycles / clapFrequency;

    var audioNode = context.createGain();

    var noise = context.createBufferSource();
    noise.buffer = NoiseBuffer(duration);

    var clapDryEnvelope = context.createGain();

    var clapDecayEnvelope = context.createGain();

    var lfoCarrier = context.createGain();
    var lfo  = context.createOscillator();
    lfo.type = "sawtooth";
    lfo.frequency.value = -clapFrequency;
    lfo.connect(lfoCarrier.gain);


    var bandpass = context.createBiquadFilter();
    bandpass.type = "bandpass";
    var highpass = context.createBiquadFilter();
    highpass.type = "highpass";
    bandpass.frequency.value = 800;
    bandpass.Q.value = 0.7;
    highpass.frequency.value = 600;

    noise.connect(clapDryEnvelope);
    clapDryEnvelope.connect(lfoCarrier);
    lfoCarrier.connect(bandpass);

    noise.connect(clapDecayEnvelope);
    clapDecayEnvelope.connect(bandpass);

    bandpass.connect(highpass);
    highpass.connect(audioNode);

    audioNode.start = function(when) {

      clapDryEnvelope.gain.setValueAtTime(0.0001, when);
      clapDryEnvelope.gain.exponentialRampToValueAtTime(1, when + 0.001);
      clapDryEnvelope.gain.linearRampToValueAtTime(1, when + clapLength);
      clapDryEnvelope.gain.exponentialRampToValueAtTime(0.0001, when + clapLength + 0.01);

      clapDecayEnvelope.gain.setValueAtTime(0.0001, when);
      clapDecayEnvelope.gain.setValueAtTime(0.0001, when + clapLength);
      clapDecayEnvelope.gain.exponentialRampToValueAtTime(1, when + clapLength + 0.001);
      clapDecayEnvelope.gain.exponentialRampToValueAtTime(0.2, when + 0.1);
      clapDecayEnvelope.gain.exponentialRampToValueAtTime(0.0001, when + duration);

      lfo.start(when);
      noise.start(when);

      audioNode.stop(when + duration);
    };

    audioNode.stop = function(when) {

      lfo.stop(when);
      noise.stop(when);
    };

    return audioNode;
  };
};

},{"noise-buffer":11}],7:[function(require,module,exports){
var makeDistortionCurve = require('make-distortion-curve')
var adsr = require('a-d-s-r')
// yr function should accept an audioContext, and optional params/opts
module.exports = function (ac, opts) {
  // make some audioNodes, connect them, store them on the object
  var audioNodes = {
    noiseBuffer: ac.createBuffer(1, ac.sampleRate, ac.sampleRate),
    noiseFilter: ac.createBiquadFilter(),
    noiseEnvelope: ac.createGain(),
    osc: ac.createOscillator(),
    oscdistortion: ac.createWaveShaper(),
    oscEnvelope: ac.createGain(),
    compressor: ac.createDynamicsCompressor(),
    distortion: ac.createWaveShaper(),
    mainFilter: ac.createBiquadFilter(),
    highFilter: ac.createBiquadFilter(),
    volume: ac.createGain(),
    settings: {
      freq: 200,
      noiseattack: 0.000001,
      noisedecay: 0.000001,
      noisesustain: 0.1175,
      noiserelease: 0.125,
      noisepeak: 0.425,
      noisemid: 0.41215,
      noiseend: 0.000001,
      triattack: 0.0000001,
      tridecay: 0.00000001,
      trisustain: 0.1175,
      trirelease: 0.125,
      tripeak: 0.87,
      trimid: 0.75,
      triend: 0.000001
    }
  }
// set all the things
  var output = audioNodes.noiseBuffer.getChannelData(0)
  for (var i = 0; i < ac.sampleRate; i++) {
    output[i] = Math.random() * 2 - 1
  }

  audioNodes.noiseFilter.type = 'highpass'
  audioNodes.noiseFilter.frequency.setValueAtTime(1000, ac.currentTime)

  audioNodes.noiseEnvelope.gain.setValueAtTime(0.00001, ac.currentTime)

  audioNodes.osc.type = 'triangle'
  audioNodes.oscdistortion.curve = makeDistortionCurve(1000)
  audioNodes.oscdistortion.oversample = '4x'

  audioNodes.oscEnvelope.gain.setValueAtTime(0.00001, ac.currentTime)

  audioNodes.compressor.threshold.value = -15
  audioNodes.compressor.knee.value = 33
  audioNodes.compressor.ratio.value = 5
  audioNodes.compressor.reduction.value = -10
  audioNodes.compressor.attack.value = 0.005
  audioNodes.compressor.release.value = 0.150

  audioNodes.distortion.curve = makeDistortionCurve(222)
  audioNodes.distortion.oversample = '2x'

  audioNodes.mainFilter.type = 'peaking'
  audioNodes.mainFilter.frequency.value = 250
  audioNodes.mainFilter.gain.value = 1.5
  audioNodes.mainFilter.Q.value = 25

  audioNodes.highFilter.type = 'peaking'
  audioNodes.highFilter.frequency.value = 9000
  audioNodes.highFilter.Q.value = 25
// connect the graph
  audioNodes.noiseFilter.connect(audioNodes.noiseEnvelope)
  audioNodes.osc.connect(audioNodes.oscdistortion)
  audioNodes.oscdistortion.connect(audioNodes.oscEnvelope)
  audioNodes.noiseEnvelope.connect(audioNodes.compressor)
  audioNodes.oscEnvelope.connect(audioNodes.compressor)
  audioNodes.compressor.connect(audioNodes.distortion)
  audioNodes.distortion.connect(audioNodes.mainFilter)
  audioNodes.mainFilter.connect(audioNodes.highFilter)
  audioNodes.highFilter.connect(audioNodes.volume)
// start it up
  audioNodes.volume.gain.setValueAtTime(0.5, ac.currentTime)
  audioNodes.osc.start(ac.currentTime)
// READY 2 return THIS THING B) *NICE*
  return {
    connect: function (input) {
      audioNodes.volume.connect(input)
    },
    start: function (when) {
      var noise = ac.createBufferSource()
      noise.buffer = audioNodes.noiseBuffer
      noise.connect(audioNodes.noiseFilter)
      noise.start(when)
      adsr(audioNodes.noiseEnvelope, when, makeADSR('noise', audioNodes.settings))
      adsr(audioNodes.oscEnvelope, when, makeADSR('tri', audioNodes.settings))
      audioNodes.osc.frequency.setValueAtTime(audioNodes.settings.freq, when)
    },
    stop: function (when) {
      audioNodes.osc.stop(when)
    },
    update: function (opts) {
      Object.keys(opts).forEach(function (k) {
        audioNodes.settings[k] = opts[k]
      })
    },
    nodes: function () {
      return audioNodes
    }
  }
}

function makeADSR (type, settings) {
  return Object.keys(settings).filter(function (k) {
    return !!k.match(type)
  }).map(function (k) {
    return k.replace(type, '')
  }).reduce(function (o, k) {
    o[k] = settings[type + k]
    return o
  }, {})
}

},{"a-d-s-r":2,"make-distortion-curve":9}],8:[function(require,module,exports){
var scales = {
  major: [2, 2, 1, 2, 2, 2, 1],
  minor: [2, 1, 2, 2, 1, 2, 2],
  pentMaj: [2, 2, 3, 2, 3],
  pentMin: [3, 2, 2, 3, 2],
  blues: [3, 2, 1, 1, 3, 2]
}

var str2freq = {
  'A0': 27.5000, 'A#0': 29.1352, 'B0': 30.8677, 'C1': 32.7032, 'C#1': 34.6478,
  'D1': 36.7081, 'D#1': 38.8909, 'E1': 41.2034, 'F1': 43.6535, 'F#1': 46.2493,
  'G1': 48.9994, 'G#1': 51.9131, 'A1': 55.0000, 'A#1': 58.2705, 'B1': 61.7354,
  'C2': 65.4064, 'C#2': 69.2957, 'D2': 73.4162, 'D#2': 77.7817, 'E2': 82.4069,
  'F2': 87.3071, 'F#2': 92.4986, 'G2': 97.9989, 'G#2': 103.826, 'A2': 110.000,
  'A#2': 116.541, 'B2': 123.471, 'C3': 130.813, 'C#3': 138.591, 'D3': 146.832,
  'D#3': 155.563, 'E3': 164.814, 'F3': 174.614, 'F#3': 184.997, 'G3': 195.998,
  'G#3': 207.652, 'A3': 220.000, 'A#3': 233.082, 'B3': 246.942, 'C4': 261.626,
  'C#4': 277.183, 'D4': 293.665, 'D#4': 311.127, 'E4': 329.628, 'F4': 349.228,
  'F#4': 369.994, 'G4': 391.995, 'G#4': 415.305, 'A4': 440.000, 'A#4': 466.164,
  'B4': 493.883, 'C5': 523.251, 'C#5': 554.365, 'D5': 587.330, 'D#5': 622.254,
  'E5': 659.255, 'F5': 698.456, 'F#5': 739.989, 'G5': 783.991, 'G#5': 830.609,
  'A5': 880.000, 'A#5': 932.328, 'B5': 987.767, 'C6': 1046.50, 'C#6': 1108.73,
  'D6': 1174.66, 'D#6': 1244.51, 'E6': 1318.51, 'F6': 1396.91, 'F#6': 1479.98,
  'G6': 1567.98, 'G#6': 1661.22, 'A6': 1760.00, 'A#6': 1864.66, 'B6': 1975.53,
  'C7': 2093.00, 'C#7': 2217.46, 'D7': 2349.32, 'D#7': 2489.02, 'E7': 2637.02,
  'F7': 2793.83, 'F#7': 2959.96, 'G7': 3135.96, 'G#7': 3322.44, 'A7': 3520.00,
  'A#7': 3729.31, 'B7': 3951.07, 'C8': 4186.01
}

var notes = Object.keys(str2freq)

function int2freq(intNote, options){
  var index, scale;
  if((index = notes.indexOf(options.tonic)) === -1) throw 'what is up with that tonic?'
  if(!(scale = scales[options.scale])) throw 'what is up with that scale?'
  while (Math.abs(intNote) > scale.length) scale = scale.concat(scale)
  if(intNote >= 0) for (var i = 0; i < intNote; index += scale[i], i+= 1 ){}
  else for (var j = -1; j >= intNote; index -= scale[scale.length + j], j-= 1){}
  return str2freq[notes[index]]
}

module.exports = int2freq
module.exports.scales = Object.keys(scales)
module.exports.notes = Object.keys(notes)
},{}],9:[function(require,module,exports){
module.exports = function(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
}

},{}],10:[function(require,module,exports){
(function() {

	var noteMap = {};
	var noteNumberMap = [];
	var notes = [ "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B" ];


	for(var i = 0; i < 127; i++) {

		var index = i,
			key = notes[index % 12],
			octave = ((index / 12) | 0) - 1; // MIDI scale starts at octave = -1

		if(key.length === 1) {
			key = key + '-';
		}

		key += octave;

		noteMap[key] = i;
		noteNumberMap[i] = key;

	}


	function getBaseLog(value, base) {
		return Math.log(value) / Math.log(base);
	}


	var MIDIUtils = {

		noteNameToNoteNumber: function(name) {
			return noteMap[name];
		},

		noteNumberToFrequency: function(note) {
			return 440.0 * Math.pow(2, (note - 69.0) / 12.0);
		},

		noteNumberToName: function(note) {
			return noteNumberMap[note];
		},

		frequencyToNoteNumber: function(f) {
			return Math.round(12.0 * getBaseLog(f / 440.0, 2) + 69);
		}

	};


	// Make it compatible for require.js/AMD loader(s)
	if(typeof define === 'function' && define.amd) {
		define(function() { return MIDIUtils; });
	} else if(typeof module !== 'undefined' && module.exports) {
		// And for npm/node.js
		module.exports = MIDIUtils;
	} else {
		this.MIDIUtils = MIDIUtils;
	}


}).call(this);


},{}],11:[function(require,module,exports){
// courtesy of http://noisehack.com/generate-noise-web-audio-api/
module.exports = function(length) {
  var sampleRate = 44100;
  var samples = length * sampleRate;
  var context = new OfflineAudioContext(1, samples, sampleRate);
  var noiseBuffer = context.createBuffer(1, samples, sampleRate);

  var output = noiseBuffer.getChannelData(0);
  for (var i = 0; i < samples; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
};

},{}],12:[function(require,module,exports){
var makeDistortionCurve = require('make-distortion-curve')
var MIDIUtils = require('midiutils')
var adsr = require('a-d-s-r')

// yr function should accept an audioContext, and optional params/opts
module.exports = function (ac, opts) {
  // make some audioNodes, connect them, store them on the object
  var audioNodes = {}

  var osc1 = ac.createOscillator()
  var osc2 = ac.createOscillator()
  var osc3 = ac.createOscillator()
  var oscnoise = ac.createOscillator()
  osc1.type = 'triangle'
  osc2.type = 'triangle'
  osc3.type = 'sine'
  oscnoise.type = 'sawtooth'

  // are these tooooo small?
  osc1.detune.value = 0.75 * ((Math.random() * 2) - 1)
  osc2.detune.value = 0.75 * ((Math.random() * 2) - 1)
  osc3.detune.value = 0.3 * ((Math.random() * 2) - 1)

  var leftfilter = ac.createBiquadFilter()
  leftfilter.type = 'lowpass'
  leftfilter.Q.value = 7
  leftfilter.detune.value = 0.75 * ((Math.random() * 2) - 1)
  leftfilter.frequency.setValueAtTime(500, ac.currentTime)

  var rightfilter = ac.createBiquadFilter()
  rightfilter.type = 'lowpass'
  rightfilter.Q.value = 7
  rightfilter.detune.value = 0.75 * ((Math.random() * 2) - 1)
  rightfilter.frequency.setValueAtTime(500, ac.currentTime)


  var noisegain = ac.createGain()
  noisegain.gain.setValueAtTime(0, ac.currentTime)

  var delay = ac.createDelay(0.35)

  var compressor = ac.createDynamicsCompressor()
  compressor.threshold.value = -30
  compressor.knee.value = 33
  compressor.ratio.value = 9
  compressor.reduction.value = -10
  compressor.attack.value = 0.15
  compressor.release.value = 0.35

  var gain = ac.createGain()
  gain.gain.setValueAtTime(0, ac.currentTime)


  var distortion = ac.createWaveShaper()
  distortion.curve = makeDistortionCurve(75)

  var mainfilter = ac.createBiquadFilter()
  mainfilter.type = 'lowpass'
  mainfilter.frequency.setValueAtTime(500, ac.currentTime)

  oscnoise.connect(noisegain)
  osc1.connect(leftfilter)
  osc2.connect(rightfilter)
  leftfilter.connect(compressor)
  rightfilter.connect(compressor)
  osc3.connect(compressor)
  noisegain.connect(delay)
  noisegain.connect(distortion)
  delay.connect(compressor)
  compressor.connect(gain)
  gain.connect(distortion)
  distortion.connect(mainfilter)

  // gotta be a better way to do this... oh well
  audioNodes.oscnoise = oscnoise
  audioNodes.noisegain = noisegain
  audioNodes.osc1 = osc1
  audioNodes.osc2 = osc2
  audioNodes.osc3 = osc3
  audioNodes.leftfilter = leftfilter
  audioNodes.rightfilter = rightfilter
  audioNodes.mainfilter = mainfilter
  audioNodes.gain = gain
  audioNodes.delay = delay
  audioNodes.distortion = distortion
  audioNodes.compressor = compressor

  // gosh i wish there was an audioNode that just did this...
  audioNodes.settings = {
    attack: 0.1,
    decay: 0.05,
    sustain: 0.3,
    release: 0.1,
    peak: 0.5,
    mid: 0.3,
    end: 0.000001
  }

  return {
    connect: function (input) {
      // // this function should call `connect` on yr output nodes with `input` as the arg
      audioNodes.mainfilter.connect(input)

      // just let them buzz forever, deal with "notes" via adsr tricks
      audioNodes.oscnoise.start(ac.currentTime)
      audioNodes.osc1.start(ac.currentTime)
      audioNodes.osc2.start(ac.currentTime)
      audioNodes.osc3.start(ac.currentTime)
    },
    start: function (when) {
      console.log('start', audioNodes.settings)

      adsr(audioNodes.gain, when, audioNodes.settings)
      console.log('one')
      var cloned = JSON.parse(JSON.stringify(audioNodes.settings))
      cloned.peak /= 2.0
      cloned.mid /= 2.0
      console.log('didit', cloned)
      adsr(audioNodes.noisegain, when, cloned)
    },
    stop: function (when) {
      audioNodes.oscnoise.stop(when)
      audioNodes.osc1.stop(when)
      audioNodes.osc2.stop(when)
      audioNodes.osc3.stop(when)
      console.log('whyd u push the piano off the building? not it is broken, forever. gotta make a new one!')
    },
    update: function (opts, when) {
      // available opts:
      // {midiNote: 62, attack: , decay: , sustain: , release: }
      Object.keys(opts).forEach(function (k) {
        var v = opts[k]
        if (k == 'midiNote' || k == 'freq') {
          var freq = k == 'midiNote' ? MIDIUtils.noteNumberToFrequency(v) : v
          audioNodes.leftfilter.frequency.setValueAtTime(freq + (Math.random() * (freq / 2.5)), when)
          audioNodes.rightfilter.frequency.setValueAtTime(freq + (Math.random() * (freq / 2.5)), when)
          audioNodes.mainfilter.frequency.setValueAtTime(freq + (Math.random() * (freq / 3.5)), when)
          audioNodes.oscnoise.frequency.setValueAtTime(freq, when)
          audioNodes.osc1.frequency.setValueAtTime(freq, when)
          audioNodes.osc2.frequency.setValueAtTime(freq, when)
          audioNodes.osc3.frequency.setValueAtTime(freq / 2.0, when)
        } else {
          // just an ADSR value
          audioNodes.settings[k] = v
        }
      })
    },
    nodes: function () {
      // returns an object of `{stringKey: audioNode}` for raw manipulation
      return audioNodes
    }
  }
}
},{"a-d-s-r":13,"make-distortion-curve":9,"midiutils":10}],13:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],14:[function(require,module,exports){
module.exports = function rangeInclusive (start, stop, stepSize) {
  if (stop == null) {
    stop = start
    start = 1
  }
  if (stepSize == null) stepSize = 1

  var steps = (stop - start) / stepSize

  var set = []
  for (var step = 0; step <= steps; step++) set.push(start + step * stepSize)

  return set
}

},{}],15:[function(require,module,exports){
var makeDistortionCurve = require('make-distortion-curve')
var adsr = require('a-d-s-r')
// yr function should accept an audioContext, and optional params/opts
module.exports = function (ac, opts) {
  // make some audioNodes, connect them, store them on the object
  var audioNodes = {
    one: ac.createOscillator(),
    two: ac.createOscillator(),
    three: ac.createOscillator(),
    four: ac.createOscillator(),
    five: ac.createOscillator(),
    six: ac.createOscillator(),
    maingain: ac.createGain(),
    distortion: ac.createWaveShaper(),
    bandfilter: ac.createBiquadFilter(),
    highfilter: ac.createBiquadFilter(),
    delay: ac.createDelay(0.05),
    dgain: ac.createGain(),
    envelope: ac.createGain(),
    settings: {
      attack: 0.02,
      decay: 0.03,
      sustain: 0.000001,
      release: 0.3,
      peak: 0.7,
      mid: 0.25,
      end: 0.00001
    }
  }

  audioNodes.one.type = 'square'
  audioNodes.one.frequency.setValueAtTime(80, ac.currentTime)
  audioNodes.two.type = 'square'
  audioNodes.two.frequency.setValueAtTime(115, ac.currentTime)
  audioNodes.three.type = 'square'
  audioNodes.three.frequency.setValueAtTime(165, ac.currentTime)
  audioNodes.four.type = 'square'
  audioNodes.four.frequency.setValueAtTime(250, ac.currentTime)
  audioNodes.five.type = 'square'
  audioNodes.five.frequency.setValueAtTime(340, ac.currentTime)
  audioNodes.six.type = 'square'
  audioNodes.six.frequency.setValueAtTime(420, ac.currentTime)

  audioNodes.maingain.gain.value = 0.75 / 6.0

  audioNodes.distortion.curve = makeDistortionCurve(333)

  audioNodes.bandfilter.type = 'bandpass'
  audioNodes.bandfilter.frequency.setValueAtTime(10420, ac.currentTime)

  audioNodes.highfilter.type = 'highpass'
  audioNodes.highfilter.frequency.setValueAtTime(6660, ac.currentTime)

  audioNodes.dgain.gain.value = 0.5

  audioNodes.envelope.gain.setValueAtTime(0, ac.currentTime)

  audioNodes.one.connect(audioNodes.maingain)
  audioNodes.two.connect(audioNodes.maingain)
  audioNodes.three.connect(audioNodes.maingain)
  audioNodes.four.connect(audioNodes.maingain)
  audioNodes.five.connect(audioNodes.maingain)
  audioNodes.six.connect(audioNodes.maingain)
  audioNodes.maingain.connect(audioNodes.distortion)
  audioNodes.distortion.connect(audioNodes.bandfilter)
  audioNodes.bandfilter.connect(audioNodes.highfilter)
  audioNodes.highfilter.connect(audioNodes.delay)
  audioNodes.delay.connect(audioNodes.dgain)
  audioNodes.dgain.connect(audioNodes.envelope)

  audioNodes.one.start(ac.currentTime)
  audioNodes.two.start(ac.currentTime)
  audioNodes.three.start(ac.currentTime)
  audioNodes.four.start(ac.currentTime)
  audioNodes.five.start(ac.currentTime)
  audioNodes.six.start(ac.currentTime)
  return {
    connect: function (input) {
      audioNodes.envelope.connect(input)
    },
    start: function (when) {
      // //this function should call `start(when)` on yr source nodes. Probably oscillators/samplers i guess, and any LFO too!
      adsr(audioNodes.envelope, when, audioNodes.settings)
    },
    stop: function (when) {
      // // same thing as start but with `stop(when)`
      audioNodes.source.stop(when)
      audioNodes.source.stop(when)
      audioNodes.source.stop(when)
      audioNodes.source.stop(when)
      audioNodes.source.stop(when)
      audioNodes.source.stop(when)
    },
    update: function (opts) {
      // optional: for performing high-level updates on the instrument.
      Object.keys(opts).forEach(function (k) {
        var v = opts[k]
        // ????
      })
    },
    nodes: function () {
      // returns an object of `{stringKey: audioNode}` for raw manipulation
      return audioNodes
    }
  }
}
},{"a-d-s-r":2,"make-distortion-curve":9}],16:[function(require,module,exports){
var makeDistortionCurve = require('make-distortion-curve')
var MIDIUtils = require('midiutils')
var adsr = require('a-d-s-r')
// yr function should accept an audioContext, and optional params/opts
module.exports = function (ac, opts) {
  // make some audioNodes, connect them, store them on the object
  var audioNodes = {}

  var oscillator1 = ac.createOscillator(ac)
  oscillator1.type = 'triangle'
  oscillator1.detune.value = Math.random()
  var oscillator2 = ac.createOscillator(ac)
  oscillator2.type = 'triangle'
  oscillator2.detune.value = Math.random()
  var oscillator3 = ac.createOscillator(ac)
  oscillator3.type = 'sawtooth'
  oscillator3.detune.value = Math.random()
  var oscillator4 = ac.createOscillator(ac)
  oscillator4.type = 'triangle'
  oscillator4.detune.value = Math.random()

  var oscillator5 = ac.createOscillator(ac)
  oscillator5.type = 'sine'
  oscillator5.detune.value = Math.random()
  var oscillator6 = ac.createOscillator(ac)
  oscillator6.type = 'sine'
  oscillator6.detune.value = Math.random()


  var delayA = ac.createDelay(0.01322)

  var delayB = ac.createDelay(0.0152752313103222)


  var delayC = ac.createDelay(0.017222)

var filterA = ac.createBiquadFilter()
filterA.Q.value = 12
filterA.type = 'highpass'
filterA.detune.value = Math.random()


// that one distortion curve that everyone copy pastes from stack overflow anyways

// make a distortion pedal! yay!
var distortionA = ac.createWaveShaper()
distortionA.curve = makeDistortionCurve(100)

var filterB = ac.createBiquadFilter()
filterB.Q.value = 12
filterB.type = 'highpass'
filterB.detune.value = Math.random()

// that one distortion curve that everyone copy pastes from stack overflow anyways

// make a distortion pedal! yay!
var distortionB = ac.createWaveShaper()
distortionB.curve = makeDistortionCurve(100)

var filterC = ac.createBiquadFilter()
filterC.Q.value = 7
filterC.type = 'lowpass'
filterC.detune.value = Math.random()

// that one distortion curve that everyone copy pastes from stack overflow anyways

// make a distortion pedal! yay!
var distortionC = ac.createWaveShaper()
distortionC.curve = makeDistortionCurve(100)



var gainA = ac.createGain()
gainA.gain.value = 0.333333333333333
var gainB = ac.createGain()
gainB.gain.value = 0.333333333333333
var gainC = ac.createGain()
gainC.gain.value = 0.333333333333333
var gainZ = ac.createGain()
gainZ.gain.value = 0.5



var filterZ = ac.createBiquadFilter()
filterZ.Q.value = 12
filterZ.type = 'highshelf'
filterZ.detune.value = Math.random()

// that one distortion curve that everyone copy pastes from stack overflow anyways

var delayZ = ac.createDelay(0.0122)

// make a distortion pedal! yay!
var distortionZ = ac.createWaveShaper()
distortionZ.curve = makeDistortionCurve(100)


  var volume = ac.createGain()
  volume.gain.setValueAtTime(0, ac.currentTime)

  //  START OF CHAIN (NOT MARKOV)

  oscillator1.connect(delayA)

  oscillator5.connect(filterA.frequency)
  oscillator5.connect(gainZ.gain)
  oscillator5.frequency.value = 0.133

  oscillator4.connect(delayB)
  oscillator6.connect(filterB.frequency)
  oscillator6.connect(gainC.gain)
  oscillator6.frequency.value = 0.273

  oscillator2.connect(delayC)
  oscillator3.connect(delayC)

  delayA.connect(filterA)
  delayB.connect(filterB)
  delayC.connect(filterC)

  filterA.connect(gainA)
  filterB.connect(gainB)
  filterC.connect(gainC)

  oscillator1.connect(gainA)
  oscillator5.connect(gainA)

  oscillator4.connect(gainB)
  oscillator6.connect(gainB)

  oscillator2.connect(gainC)
  oscillator3.connect(gainC)

  gainA.connect(distortionA)
  gainB.connect(distortionB)
  gainC.connect(distortionC)

  distortionC.connect(delayZ)
  delayZ.connect(filterZ)
  distortionC.connect(gainZ)
  filterZ.connect(gainZ)
  gainZ.connect(distortionZ)

  distortionA.connect(volume)
  distortionB.connect(volume)
  distortionZ.connect(volume)
  // END OF CHAIN

  audioNodes.oscillator1 = oscillator1
  audioNodes.oscillator2 = oscillator2
  audioNodes.oscillator3 = oscillator3
  audioNodes.oscillator4 = oscillator4
  audioNodes.oscillator5 = oscillator5
  audioNodes.oscillator6 = oscillator6
  audioNodes.delayA = delayA
  audioNodes.delayB = delayB
  audioNodes.delayC = delayC
  audioNodes.delayZ = delayZ
  audioNodes.gainA = gainA
  audioNodes.gainB = gainB
  audioNodes.gainC = gainC
  audioNodes.filterA = filterA
  audioNodes.filterB = filterB
  audioNodes.filterC = filterC
  audioNodes.filterZ = filterZ
  audioNodes.distortionA = distortionA
  audioNodes.distortionB = distortionB
  audioNodes.distortionC = distortionC
  audioNodes.distortionZ = distortionZ
  audioNodes.volume = volume
  audioNodes.settings = {
    attack: 0.01,
    decay: 0.05,
    sustain: 0.4,
    release: 0.1,
    peak: 0.3,
    mid: 0.1,
    end: 0.00000000000001 // lol idk wtf
  }

  // bzzzzz
  oscillator1.start(ac.currentTime)
  oscillator2.start(ac.currentTime)
  oscillator3.start(ac.currentTime)
  oscillator4.start(ac.currentTime)
  oscillator5.start(ac.currentTime)
  oscillator6.start(ac.currentTime)

  return {
    connect: function (input) {
      audioNodes.volume.connect(input)
    },
    start: function (when) {
      adsr(audioNodes.volume, when, audioNodes.settings)
    },
    stop: function (when) {
      console.log('SOMETIMES I DOUBT YR COMMITMENT 2 SPARKLE MOTION\np.s. yr oscillators are destroyed, make a new synth plz')
      oscillator1.stop(when)
      oscillator2.stop(when)
      oscillator3.stop(when)
      oscillator4.stop(when)
      oscillator5.stop(when)
      oscillator6.stop(when)
    },
    update: function (opts, when) {
      // available opts:
      // {midiNote: 62, lfoL: , lfoR: , freq, attack: , decay: , sustain: , release: , peak: , mid:}
      Object.keys(opts).forEach(function (k) {
        var v = opts[k]
        if (k == 'midiNote' || k == 'freq') {
          var freq = k == 'midiNote' ? MIDIUtils.noteNumberToFrequency(v) : v

          audioNodes.oscillator1.frequency.setValueAtTime(freq, when)
          audioNodes.oscillator2.frequency.setValueAtTime(freq, when)
          audioNodes.oscillator3.frequency.setValueAtTime(freq, when)
          audioNodes.oscillator4.frequency.setValueAtTime(freq, when)

          filterA.frequency.setValueAtTime(freq / (2 + Math.random()), when)
          filterB.frequency.setValueAtTime(freq / (2 + Math.random()), when)
          filterC.frequency.setValueAtTime(freq / (Math.random()), when)
          filterZ.frequency.setValueAtTime(freq / (1.5 + Math.random()), when)

        } else if (k == 'lfoL' || k == 'lfoR') {
          var node = k == 'lfoL' ? audioNodes.oscillator5 : audioNodes.oscillator6
          node.frequency.setValueAtTime(v, when)
        } else {
          // just an ADSR value
          audioNodes.settings[k] = v
        }
      })
    },
    nodes: function () {
      // returns an object of `{stringKey: audioNode}` for raw manipulation
      return audioNodes
    }
  }
}
},{"a-d-s-r":17,"make-distortion-curve":9,"midiutils":10}],17:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],18:[function(require,module,exports){
var adsr = require('a-d-s-r')
var makeDistortionCurve = require('make-distortion-curve')
// On the kick drum play around with the waveform and decay speed to make cheesy sounding synth tom drums.
// To make gabber kick drums, slow the decay and set it to a sawtooth and add some valve distortion.
// Set the modulation decay on the snare drum to full to make 808 tom sounds like mount kimbie.
// Play around with different noise types on the hi-hats to get different textures.
// For Trap Hi hats, clone Oscillator 2 into Oscillator 3 and hard pan Oscillators 2 and 3 left and right. de-tune one of them. You can do the same with the Snare.
module.exports = function (ac, opts) {
  var audioNodes = {
    osc: ac.createOscillator(),
    gain: ac.createGain(),
    dist: ac.createWaveShaper(),
    filter: ac.createBiquadFilter(),
    settings: {
      freq: 150,
      endFreq: 75,
      attack: 0.1,
      decay: 0.1,
      sustain: 0.012,
      release: 0.013,
      peak: 0.5,
      mid: 0.35,
      end: 0.000000000000000000001
    }
  }
  audioNodes.osc.type = 'sawtooth'
  audioNodes.osc.frequency.setValueAtTime(0.00000001, ac.currentTime)
  audioNodes.osc.start(ac.currentTime)

  audioNodes.gain.gain.setValueAtTime(0.00000001, ac.currentTime)

  audioNodes.dist.curve = makeDistortionCurve(1000)

  audioNodes.filter.type = 'lowpass'
  audioNodes.filter.frequency.setValueAtTime(audioNodes.settings.freq * 3.5, ac.currentTime)

  audioNodes.osc.connect(audioNodes.gain)
  audioNodes.gain.connect(audioNodes.dist)
  audioNodes.dist.connect(audioNodes.filter)

  return {
    connect: function (input) {
      audioNodes.filter.connect(input)
    },
    start: function (when) {
      audioNodes.osc.frequency.setValueAtTime(audioNodes.settings.freq, when)
      audioNodes.osc.frequency.exponentialRampToValueAtTime(audioNodes.settings.endFreq, when + audioNodes.settings.attack + audioNodes.settings.decay + audioNodes.settings.sustain + audioNodes.settings.release)
      adsr(audioNodes.gain, when, audioNodes.settings)
    },
    stop: function (when) {
      audioNodes.source.stop(when)
    },
    update: function (opts) {
      Object.keys(opts).forEach(function (k) {
        audioNodes.settings[k] = opts[k]
      })
    },
    nodes: function () {
      return audioNodes
    }
  }
}
},{"a-d-s-r":2,"make-distortion-curve":9}],19:[function(require,module,exports){
var adsr = require('a-d-s-r')
var makeDistortionCurve = require('make-distortion-curve')
module.exports = function (ac, opts) {
  var audioNodes = {
    osc: ac.createOscillator(),
    gain: ac.createGain(),
    dist: ac.createWaveShaper(),
    filter: ac.createBiquadFilter(),
    settings: {
      freq: 250,
      endFreq: 0.000000000000000000001,
      attack: 0.000000000000000000001,
      decay: 0.000000000000000000001,
      sustain: 0.12,
      release: 0.13,
      peak: 0.5,
      mid: 0.35,
      end: 0.000000000000000000001
    }
  }

  audioNodes.osc.frequency.setValueAtTime(0.00000001, ac.currentTime)
  audioNodes.osc.start(ac.currentTime)

  audioNodes.gain.gain.setValueAtTime(0.00000001, ac.currentTime)

  audioNodes.dist.curve = makeDistortionCurve(25)

  audioNodes.filter.type = 'lowpass'
  audioNodes.filter.frequency.setValueAtTime(audioNodes.settings.freq * 3.5, ac.currentTime)

  audioNodes.osc.connect(audioNodes.gain)
  audioNodes.gain.connect(audioNodes.dist)
  audioNodes.dist.connect(audioNodes.filter)

  return {
    connect: function (input) {
      audioNodes.filter.connect(input)
    },
    start: function (when) {
      audioNodes.osc.frequency.setValueAtTime(audioNodes.settings.freq, when)
      audioNodes.osc.frequency.exponentialRampToValueAtTime(audioNodes.settings.endFreq, when + audioNodes.settings.attack + audioNodes.settings.decay + audioNodes.settings.sustain + audioNodes.settings.release)
      adsr(audioNodes.gain, when, audioNodes.settings)
    },
    stop: function (when) {
      audioNodes.source.stop(when)
    },
    update: function (opts) {
      Object.keys(opts).forEach(function (k) {
        audioNodes.settings[k] = opts[k]
      })
    },
    nodes: function () {
      return audioNodes
    }
  }
}
},{"a-d-s-r":2,"make-distortion-curve":9}],20:[function(require,module,exports){
var makeDistortionCurve = require('make-distortion-curve')
var int2freq = require('int2freq')

// ADD SP<E DE:LAY
// MAKE IT WEIRDER, YEAH?

module.exports = function (context, data) {
  var nodes={}
  nodes.root = context.createOscillator()
  nodes.third = context.createOscillator()
  nodes.fifth = context.createOscillator()

  nodes.pregain = context.createGain()
  nodes.filter = context.createBiquadFilter()
  nodes.analyser = context.createAnalyser()
  nodes.delay = context.createDelay(15.0)
  nodes.distortion = context.createWaveShaper()

  nodes.lowFilter = context.createBiquadFilter()
  nodes.volume = context.createGain()

  nodes.root.connect(nodes.pregain)
  nodes.fifth.connect(nodes.pregain)
  nodes.third.connect(nodes.pregain)
  nodes.pregain.connect(nodes.filter)
  nodes.filter.connect(nodes.analyser)
  nodes.analyser.connect(nodes.delay)
  nodes.analyser.connect(nodes.lowFilter)
  nodes.delay.connect(nodes.distortion)
  nodes.distortion.connect(nodes.lowFilter)
  nodes.lowFilter.connect(nodes.volume)

  nodes.note = 'E4'

  nodes.updateNote = function (note, scaale){
    var scale = scaale !== undefined ? scaale : 'major'
    this.note = note
    this.root.frequency.setValueAtTime(int2freq(0, {tonic: this.note, scale: scale}), context.currentTime)
    this.third.frequency.setValueAtTime(int2freq(2, {tonic: this.note, scale: scale}), context.currentTime)
    this.fifth.frequency.setValueAtTime(int2freq(4, {tonic: this.note, scale: scale}), context.currentTime)
  }

  nodes.import = function (data) {
    data = data || {}
    data.root = data.root || {}
    data.third = data.third || {}
    data.fifth = data.fifth || {}
    data.delay = data.delay || {}
    data.distortion = data.distortion || {}
    data.filter = data.filter || {}
    data.lowFilter = data.lowFilter || {}
    data.volume = data.volume || {}
    data.pregain = data.pregain || {}

    this.root.type = data.root.type || 'triangle'
    this.root.frequency.value = data.root.frequency || int2freq(0, {tonic: this.note, scale: 'major'})
    this.root.detune.value = data.root.detune || 0

    this.third.type = data.third.type || 'triangle'
    this.third.frequency.value = data.third.frequency || int2freq(2, {tonic: this.note, scale: 'major'})
    this.third.detune.value = data.third.detune || 0

    this.fifth.type = data.fifth.type || 'triangle'
    this.fifth.frequency.value = data.fifth.frequency || int2freq(4, {tonic: this.note, scale: 'major'})
    this.fifth.detune.value = data.fifth.detune || 0

    this.pregain.gain.value = data.pregain.gain || 0.3
    this.delay.delayTime.value = data.delay.delayTime || 2.5

    this.distortion.curve = data.distortion.curve || makeDistortionCurve(400)

    this.filter.Q.value = data.filter.Q || 25
    this.filter.frequency.value = data.filter.frequency || 400
    this.filter.type = data.filter.type || 'lowshelf'
    this.filter.detune = data.filter.detune || 0

    this.lowFilter.Q.value = data.lowFilter.Q || 25
    this.lowFilter.frequency.value = data.lowFilter.frequency || 300
    this.lowFilter.type = data.lowFilter.type || 'lowpass'
    this.lowFilter.detune = data.lowFilter.detune || 0

    this.volume.gain.value = data.volume.gain || 0.3
  }

  nodes.export = function(){
    return {
      root: {
        type: this.root.type,
        frequency: this.root.frequency.value,
        detune: this.root.detune.value
      },
      third: {
        type: this.third.type,
        frequency: this.third.frequency.value,
        detune: this.third.detune.value
      },
      fifth: {
        type: this.fifth.type,
        frequency: this.fifth.frequency.value,
        detune: this.fifth.detune.value
      },
      pregain: {
        gain: this.pregain.gain.value
      },
      filter: {
        Q: this.filter.q.value,
        frequency: this.filter.frequency.value,
        type: this.filter.type,
        detune: this.filter.detune.value
      },
      delay: {
        delayTime: this.delay.delayTime.value
      },
      distortion: {
        curve: this.distortion.curve
      },
      lowFilter: {
        Q: this.lowFilter.q.value,
        frequency: this.lowFilter.frequency.value,
        type: this.lowFilter.type,
        detune: this.lowFilter.detune.value
      },
      volume: {
        gain: this.volume.gain.value
      },
      note: this.note
    }
  }

  nodes.connect = function(destination){
    this.volume.connect(destination)
  }

  nodes.start = function(){
    this.root.start()
    this.third.start()
    this.fifth.start()
  }

  nodes.keys = function(){
    return Object.keys(this).filter(function(k){
      return ['import', 'export', 'connect', 'start', 'keys', 'updateNote'].indexOf(k) === -1
    })
  }

  nodes.import(data)

  return nodes
}
},{"int2freq":8,"make-distortion-curve":9}],21:[function(require,module,exports){
var adsr = require('a-d-s-r')
var makeDistortionCurve = require('make-distortion-curve')

// yr function should accept an audioContext, and optional params/opts
module.exports = function (ac, opts) {
  // make some audioNodes, connect them, store them on the object
  var audioNodes = {
    one:  ac.createOscillator(),
    two:  ac.createOscillator(),
    three:  ac.createOscillator(),
    four:  ac.createOscillator(),
    lfo: ac.createOscillator(),
    filterlfogain: ac.createGain(),
    postfilterlfogain: ac.createGain(),
    pregain: ac.createGain(),
    postGain: ac.createGain(),
    filter: ac.createBiquadFilter(),
    delay: ac.createDelay(0.075),
    distortion: ac.createWaveShaper(),
    postFilter: ac.createBiquadFilter(),
    envelope: ac.createGain(),
    settings: {
      freq: 440,
      attack: 0.051,
      decay: 0.05,
      sustain: 0.21,
      release: 0.25,
      detune: 5,
      peak: 0.5,
      mid: 0.3,
      end: 0.000001
    }
  }

  audioNodes.one.type = 'square'
  audioNodes.two.type = 'sawtooth'
  audioNodes.three.type = 'sine'
  audioNodes.four.type = 'sawtooth'

  audioNodes.one.detune.setValueAtTime((((Math.random() * 2) - 1) * 1), ac.currentTime)
  audioNodes.two.detune.setValueAtTime((((Math.random() * 2) - 1) * 2), ac.currentTime)
  audioNodes.three.detune.setValueAtTime((((Math.random() * 2) - 1) * 3), ac.currentTime)
  audioNodes.four.detune.setValueAtTime((((Math.random() * 2) - 1) * 3), ac.currentTime)

  audioNodes.filter.type = 'lowpass'
  audioNodes.postFilter.type = 'peaking'

  audioNodes.filterlfogain.gain.value = 15050
  audioNodes.postfilterlfogain.gain.value = 10000

  audioNodes.lfo.connect(audioNodes.filterlfogain)
  audioNodes.lfo.connect(audioNodes.postfilterlfogain)
  audioNodes.filterlfogain.connect(audioNodes.filter.frequency)
  audioNodes.postfilterlfogain.connect(audioNodes.postFilter.frequency)

  audioNodes.distortion.curve = makeDistortionCurve(750)


  audioNodes.one.connect(audioNodes.pregain)
  audioNodes.two.connect(audioNodes.pregain)
  audioNodes.three.connect(audioNodes.pregain)
  audioNodes.four.connect(audioNodes.pregain)
  audioNodes.pregain.connect(audioNodes.filter)
  audioNodes.filter.connect(audioNodes.delay)
  audioNodes.delay.connect(audioNodes.postGain)
  audioNodes.filter.connect(audioNodes.distortion)
  audioNodes.distortion.connect(audioNodes.postGain)
  audioNodes.postGain.connect(audioNodes.postFilter)
  audioNodes.postFilter.connect(audioNodes.envelope)


  audioNodes.pregain.gain.setValueAtTime(1.0 / 3.0, ac.currentTime)
  audioNodes.postGain.gain.setValueAtTime(0.5, ac.currentTime)
  audioNodes.envelope.gain.setValueAtTime(0, ac.currentTime)
  audioNodes.lfo.frequency.setValueAtTime(1, ac.currentTime)

  audioNodes.one.start(ac.currentTime)
  audioNodes.two.start(ac.currentTime)
  audioNodes.three.start(ac.currentTime)
  audioNodes.four.start(ac.currentTime)
  audioNodes.lfo.start(ac.currentTime)

  return {
    connect: function (input) {
      audioNodes.envelope.connect(input)
    },
    start: function (when) {
      // //this function should call `start(when)` on yr source nodes. Probably oscillators/samplers i guess, and any LFO too!
      adsr(audioNodes.envelope, when, audioNodes.settings)
    },
    stop: function (when) {
      audioNodes.one.stop(when)
      audioNodes.two.stop(when)
      audioNodes.three.stop(when)
    },
    update: function (opts, when) {
      Object.keys(opts).forEach(function (k) {
        var v = opts[k]
        if (k == 'midiNote' || k == 'freq') {
          var freq = k == 'midiNote' ? MIDIUtils.noteNumberToFrequency(v) : v
          audioNodes.one.frequency.setValueAtTime(freq / 4.0, when)
          audioNodes.two.frequency.setValueAtTime(freq / 2.0, when)
          audioNodes.three.frequency.setValueAtTime(freq / 8.0, when)
          audioNodes.four.frequency.setValueAtTime(freq / 4.0, when)
        } else {
          // just an ADSR value
          audioNodes.settings[k] = v
        }
      })

    },
    nodes: function () {
      // returns an object of `{stringKey: audioNode}` for raw manipulation
      return audioNodes
    }
  }
}
},{"a-d-s-r":2,"make-distortion-curve":9}],22:[function(require,module,exports){
module.exports = function (el, ac, cb) {
  function handleIOS(e) {
    var buffer = ac.createBuffer(1, 1, 22050)
    var source = ac.createBufferSource()
    source.buffer = buffer
    source.connect(ac.destination)
    source.start(ac.currentTime)
    setTimeout(function() {
      el.removeEventListener('mousedown', handleIOS, false)
      el.removeEventListener('touchend', handleIOS, false)
      cb(source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)
    }, 1)
  }
  el.addEventListener('mousedown', handleIOS, false)
  el.addEventListener('touchend', handleIOS, false)
}

},{}]},{},[1]);
