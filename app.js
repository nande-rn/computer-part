// ===== COMPUTER PARTS DATA =====
const PARTS = [
  {
    id: 'cpu',
    name: 'CPU',
    fullName: 'Central Processing Unit',
    emoji: '🧠',
    color: '#ff6bdb',
    hint: 'The Brain!',
    fact: '⚡ A modern CPU can do BILLIONS of things every single second!',
    desc: 'The CPU is the brain of the computer. It thinks about everything — playing games, drawing pictures, playing music. Without it, the computer would just be a fancy box!'
  },
  {
    id: 'ram',
    name: 'RAM',
    fullName: 'Random Access Memory',
    emoji: '💾',
    color: '#6bffda',
    hint: 'Short-term Memory!',
    fact: '🧩 RAM forgets everything when you turn off the computer — like a whiteboard that gets erased!',
    desc: 'RAM is like your computer\'s short-term memory. When you open a game or a video, it goes into RAM so the computer can use it super fast. More RAM = more things open at once!'
  },
  {
    id: 'gpu',
    name: 'GPU',
    fullName: 'Graphics Processing Unit',
    emoji: '🎮',
    color: '#a46bff',
    hint: 'Makes things look cool!',
    fact: '🖼️ GPUs can handle thousands of calculations at the same time to make amazing 3D games!',
    desc: 'The GPU is the artist of the computer! It draws all the beautiful pictures, games, and videos you see on screen. It works super fast to make everything smooth and colorful!'
  },
  {
    id: 'motherboard',
    name: 'Motherboard',
    fullName: 'Motherboard / Main Board',
    emoji: '🗺️',
    color: '#ffe06b',
    hint: 'The connector!',
    fact: '🔌 Everything in a computer plugs into the motherboard — it\'s like the city that connects everyone!',
    desc: 'The motherboard is like a big city map for the computer. All the other parts plug into it so they can talk to each other. No motherboard means no teamwork!'
  },
  {
    id: 'hdd',
    name: 'Hard Drive',
    fullName: 'Hard Disk Drive (HDD)',
    emoji: '💽',
    color: '#6bbfff',
    hint: 'Saves your stuff!',
    fact: '💿 Hard drives spin like a tiny CD thousands of times every minute to read your files!',
    desc: 'A hard drive is where the computer remembers things even when it\'s turned off — like photos, games, and videos. It has tiny spinning discs inside that read and write your data!'
  },
  {
    id: 'ssd',
    name: 'SSD',
    fullName: 'Solid State Drive',
    emoji: '⚡',
    color: '#ff9a6b',
    hint: 'Super fast storage!',
    fact: '🚀 SSDs have no moving parts — they\'re up to 10x faster than old hard drives!',
    desc: 'An SSD is like a hard drive but MUCH faster and has no moving parts inside. It\'s why new computers start up in just a few seconds! It works like a giant USB stick.'
  },
  {
    id: 'psu',
    name: 'Power Supply',
    fullName: 'Power Supply Unit (PSU)',
    emoji: '🔋',
    color: '#ff6b6b',
    hint: 'Gives power!',
    fact: '⚡ The power supply converts electricity from the wall into safe power for all the parts!',
    desc: 'The power supply is like the heart of the computer — it pumps electricity to all the other parts! Without it, nothing would work. It makes sure each part gets exactly the right amount of power.'
  },
  {
    id: 'monitor',
    name: 'Monitor',
    fullName: 'Computer Monitor / Display',
    emoji: '🖥️',
    color: '#6bff9a',
    hint: 'The screen!',
    fact: '👁️ Monitors display millions of tiny colored dots called pixels to make every picture!',
    desc: 'The monitor is your window into the computer world! It shows you everything — websites, games, and videos. Each picture is made of millions of tiny dots called pixels working together!'
  },
  {
    id: 'keyboard',
    name: 'Keyboard',
    fullName: 'Computer Keyboard',
    emoji: '⌨️',
    color: '#ff6bdb',
    hint: 'Type type type!',
    fact: '⌨️ A keyboard has around 104 keys — that\'s a LOT of buttons to press!',
    desc: 'The keyboard lets you talk to the computer by typing! Every key you press sends a signal. You can write stories, search the internet, and control games all with your fingers!'
  },
  {
    id: 'mouse',
    name: 'Mouse',
    fullName: 'Computer Mouse',
    emoji: '🖱️',
    color: '#ffe06b',
    hint: 'Click and move!',
    fact: '🖱️ Computer mice were invented in 1964 — before the internet existed!',
    desc: 'The mouse helps you point and click on things on the screen. You move it around and the arrow on screen follows! It has buttons to click and a scroll wheel to move up and down pages.'
  },
  {
    id: 'fan',
    name: 'Cooling Fan',
    fullName: 'CPU / Case Cooling Fan',
    emoji: '🌀',
    color: '#6bffda',
    hint: 'Keeps things cool!',
    fact: '🌡️ Without cooling fans, a CPU would get so hot it would stop working in seconds!',
    desc: 'Fans keep the computer from getting too hot! When parts work hard, they make heat — just like you get warm when you run. The fans blow cool air over everything to keep the computer happy!'
  },
  {
    id: 'webcam',
    name: 'Webcam',
    fullName: 'Web Camera',
    emoji: '📷',
    color: '#a46bff',
    hint: 'See your face!',
    fact: '📸 Webcams can take millions of photos every second to make smooth video calls!',
    desc: 'A webcam is a little camera that lets people see you during video calls! You can wave hi to grandma or join an online class. It takes many photos per second to create smooth video!'
  }
];

// ===== STATE =====
let learned = new Set();

// ===== INIT =====
function init() {
  createStars();
  renderCards();
  setupModal();
  document.getElementById('total').textContent = PARTS.length;
}

// ===== STARS =====
function createStars() {
  const container = document.getElementById('stars');
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      top:${Math.random()*100}%;
      --dur:${2 + Math.random()*4}s;
      animation-delay:${Math.random()*4}s;
    `;
    container.appendChild(star);
  }
}

// ===== RENDER CARDS =====
function renderCards() {
  const grid = document.getElementById('partsGrid');
  grid.innerHTML = '';
  PARTS.forEach(part => {
    const card = document.createElement('div');
    card.className = 'part-card' + (learned.has(part.id) ? ' learned' : '');
    card.style.borderColor = part.color + '44';
    card.style.background = `linear-gradient(145deg, #1a1a4e, ${part.color}18)`;
    card.innerHTML = `
      <span class="card-emoji">${part.emoji}</span>
      <div class="card-name" style="color:${part.color}">${part.name}</div>
      <div class="card-hint">${part.hint}</div>
    `;
    card.addEventListener('click', () => openPart(part, card));
    grid.appendChild(card);
  });
}

// ===== OPEN PART MODAL =====
function openPart(part, cardEl) {
  // Play card sound
  SoundFX.pop();
  setTimeout(() => {
    const sfn = SoundFX.partSounds[part.id];
    if (sfn) sfn();
  }, 120);

  // Bounce animation
  cardEl.classList.add('bouncing');
  setTimeout(() => cardEl.classList.remove('bouncing'), 450);

  // Mark learned
  const wasLearned = learned.has(part.id);
  learned.add(part.id);
  if (!wasLearned) {
    setTimeout(() => SoundFX.sparkle(), 300);
    cardEl.classList.add('learned');
    updateScore();
    if (learned.size === PARTS.length) {
      setTimeout(showCelebration, 800);
    }
  }

  // Fill modal
  document.getElementById('modalEmoji').textContent = part.emoji;
  document.getElementById('modalTitle').textContent = `${part.name} — ${part.fullName}`;
  document.getElementById('modalTitle').style.color = part.color;
  document.getElementById('modalFact').textContent = part.fact;
  document.getElementById('modalDesc').textContent = part.desc;

  // Open modal
  SoundFX.whoosh();
  document.getElementById('modalOverlay').classList.add('active');
}

// ===== SETUP MODAL CLOSE =====
function setupModal() {
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');

  closeBtn.addEventListener('click', () => {
    SoundFX.click();
    overlay.classList.remove('active');
  });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      SoundFX.click();
      overlay.classList.remove('active');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      SoundFX.click();
      overlay.classList.remove('active');
    }
  });
}

// ===== UPDATE SCORE =====
function updateScore() {
  document.getElementById('score').textContent = learned.size;
}

// ===== CELEBRATION =====
function showCelebration() {
  SoundFX.fanfare();
  launchConfetti();
  const el = document.getElementById('celebration');
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 4000);
}

function launchConfetti() {
  const colors = ['#ff6bdb','#6bffda','#ffe06b','#6bbfff','#ff9a6b','#a46bff','#6bff9a'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.cssText = `
      left:${Math.random()*100}%;
      top:-10px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      --dur:${1.5+Math.random()*2}s;
      --delay:${Math.random()*1}s;
      --x:${(Math.random()-0.5)*300}px;
      transform:rotate(${Math.random()*360}deg);
    `;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}

// ===== START =====
document.addEventListener('DOMContentLoaded', init);
