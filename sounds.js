// ===== SOUND ENGINE (Web Audio API — no external files needed!) =====
const SoundFX = (() => {
  let ctx = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function playTone({ type = 'sine', freq = 440, freq2 = null, duration = 0.3, gain = 0.4, gainEnd = 0, delay = 0, filterFreq = null }) {
    const c = getCtx();
    const osc = c.createOscillator();
    const gainNode = c.createGain();
    const now = c.currentTime + delay;

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (freq2) osc.frequency.exponentialRampToValueAtTime(freq2, now + duration);

    gainNode.gain.setValueAtTime(gain, now);
    gainNode.gain.exponentialRampToValueAtTime(gainEnd || 0.001, now + duration);

    let source = gainNode;
    if (filterFreq) {
      const filter = c.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = filterFreq;
      gainNode.connect(filter);
      filter.connect(c.destination);
      source = gainNode;
    } else {
      gainNode.connect(c.destination);
    }

    osc.connect(gainNode);
    osc.start(now);
    osc.stop(now + duration + 0.01);
  }

  function playNoise(duration = 0.15, gain = 0.3) {
    const c = getCtx();
    const bufferSize = c.sampleRate * duration;
    const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const source = c.createBufferSource();
    source.buffer = buffer;
    const gainNode = c.createGain();
    gainNode.gain.setValueAtTime(gain, c.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    source.connect(gainNode);
    gainNode.connect(c.destination);
    source.start();
  }

  return {
    // Happy pop when clicking a card
    pop() {
      playTone({ type: 'sine', freq: 500, freq2: 800, duration: 0.15, gain: 0.35 });
      playTone({ type: 'sine', freq: 700, freq2: 1000, duration: 0.12, gain: 0.2, delay: 0.05 });
    },

    // Sparkle chime for "learned"
    sparkle() {
      [0, 0.08, 0.16, 0.24].forEach((d, i) => {
        const freqs = [880, 1100, 1320, 1760];
        playTone({ type: 'sine', freq: freqs[i], duration: 0.3, gain: 0.25, delay: d });
      });
    },

    // Fanfare for all parts learned
    fanfare() {
      const notes = [523, 659, 784, 1047];
      notes.forEach((f, i) => {
        playTone({ type: 'sawtooth', freq: f, freq2: f * 1.01, duration: 0.4, gain: 0.2, delay: i * 0.12 });
      });
      playNoise(0.05, 0.1);
    },

    // Whoosh when modal opens
    whoosh() {
      playTone({ type: 'sine', freq: 200, freq2: 800, duration: 0.25, gain: 0.2, filterFreq: 2000 });
    },

    // Click/close sound
    click() {
      playTone({ type: 'square', freq: 300, freq2: 150, duration: 0.08, gain: 0.15 });
    },

    // Each part has a unique themed sound
    partSounds: {
      cpu:       () => { for (let i=0; i<4; i++) playTone({ type:'square', freq:200+i*80, duration:0.05, gain:0.18, delay:i*0.06 }); },
      ram:       () => { playTone({ type:'sine', freq:800, freq2:1200, duration:0.2, gain:0.25 }); playTone({ type:'sine', freq:1200, freq2:800, duration:0.2, gain:0.2, delay:0.15 }); },
      gpu:       () => { [400,600,800,1000,1200].forEach((f,i) => playTone({ type:'sawtooth', freq:f, duration:0.15, gain:0.15, delay:i*0.04 })); },
      hdd:       () => { playNoise(0.3, 0.15); playTone({ type:'sine', freq:80, freq2:60, duration:0.3, gain:0.3 }); },
      ssd:       () => { playTone({ type:'sine', freq:1800, freq2:2200, duration:0.1, gain:0.2 }); playTone({ type:'sine', freq:2200, duration:0.08, gain:0.15, delay:0.09 }); },
      motherboard: () => { [260,330,392,523].forEach((f,i) => playTone({ type:'triangle', freq:f, duration:0.25, gain:0.2, delay:i*0.07 })); },
      psu:       () => { playNoise(0.08, 0.2); playTone({ type:'sawtooth', freq:60, duration:0.4, gain:0.3 }); },
      monitor:   () => { playTone({ type:'sine', freq:1000, freq2:1500, duration:0.2, gain:0.2 }); playTone({ type:'sine', freq:1500, duration:0.15, gain:0.15, delay:0.18 }); },
      keyboard:  () => { for(let i=0;i<5;i++) { playNoise(0.04, 0.12); setTimeout(()=>{},i*60); playTone({ type:'square', freq:300+i*50, duration:0.04, gain:0.12, delay:i*0.06 }); } },
      mouse:     () => { playTone({ type:'square', freq:400, duration:0.06, gain:0.2 }); playTone({ type:'square', freq:400, duration:0.06, gain:0.15, delay:0.15 }); },
      fan:       () => { playNoise(0.5, 0.1); playTone({ type:'sawtooth', freq:150, freq2:200, duration:0.5, gain:0.15 }); },
      webcam:    () => { playTone({ type:'sine', freq:1200, duration:0.05, gain:0.2 }); playNoise(0.03, 0.3); },
    }
  };
})();
