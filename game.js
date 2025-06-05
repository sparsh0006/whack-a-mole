// game.js

// Game state and core logic
const gameState = {
  score: 0,
  miss: 0,
  level: 1,
  running: false,
  holes: [],
  maxScore: 10, // Score needed to advance (per level effectively)
  maxMiss: 5,   // Misses allowed before game over
  popupSpeed: 1500, // Base speed in milliseconds
  popupInterval: null,
  dangerProbability: 0.2, // 20% chance of danger character
};

// Sound effects using Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create simple sounds
function createSound(type) {
  return () => {
    if (audioContext.state === 'suspended') { // Ensure context is running before playing sound
      audioContext.resume();
    }
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Configure oscillator based on sound type
    switch (type) {
      case 'hit':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        break;
      case 'miss':
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.7, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        break;
      case 'danger':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(110, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(55, audioContext.currentTime + 0.4);
        gainNode.gain.setValueAtTime(0.8, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.7);
        break;
      case 'levelUp':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.6, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);

        const osc2 = audioContext.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(660, audioContext.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(1320, audioContext.currentTime + 0.2);
        const gain2 = audioContext.createGain();
        gain2.gain.setValueAtTime(0.6, audioContext.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        osc2.start();
        osc2.stop(audioContext.currentTime + 0.6);
        break;
    }

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + (type === 'levelUp' ? 0.8 : 0.4));
  };
}

const sounds = {
  hit: createSound('hit'),
  miss: createSound('miss'),
  danger: createSound('danger'),
  levelUp: createSound('levelUp')
};

// Initialize game
function initGame(holeElements) {
  gameState.holes = Array.from(holeElements).map((el, index) => ({
    element: el,
    index,
    hasCharacter: false,
    characterType: null,
    characterElement: null,
    timeout: null,
    _whackHandler: null, // To store click handler reference
    _touchWhackHandler: null // To store touch handler reference
  }));

  resetGame();
  setupBat();
}

// Setup bat element to follow mouse/touch
function setupBat() {
  const bat = document.getElementById('bat');
  bat.innerHTML = `
    <svg viewBox="0 0 24 84" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,84 L14,84 L18,24 L6,24 Z" fill="var(--bat-handle)"/>
      <ellipse cx="12" cy="12" rx="12" ry="12" fill="var(--bat-head)"/>
    </svg>
  `;

  document.addEventListener('mousemove', (e) => {
    if (!gameState.running) return;
    updateBatPosition(e.clientX, e.clientY);
  });

  document.addEventListener('touchmove', (e) => {
    if (!gameState.running || !e.touches[0]) return;
    e.preventDefault();
    updateBatPosition(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });

  bat.style.transform = 'translate(-100px, -100px)';
}

function updateBatPosition(x, y) {
  const bat = document.getElementById('bat');
  bat.style.transform = `translate(${x - 40}px, ${y - 80}px)`;
}

function animateBatWhack() {
  const bat = document.getElementById('bat');
  bat.classList.remove('bat-animate');
  void bat.offsetWidth;
  bat.classList.add('bat-animate');
}

function resetGame() {
  gameState.score = 0;
  gameState.miss = 0;
  gameState.level = 1;
  gameState.running = false;

  import('main').then(module => {
    module.setStats({
      score: gameState.score,
      miss: gameState.miss,
      level: gameState.level
    });
    module.showOverlay('<div>\ud83c\udfae Tung Tung Sahur \ud83c\udfcf<br><span style="font-size:0.8em; color:#555;">Click to Start!</span></div>');
  });

  if (gameState.popupInterval) {
    clearInterval(gameState.popupInterval);
    gameState.popupInterval = null;
  }

  gameState.holes.forEach(hole => {
    if (hole.timeout) {
      clearTimeout(hole.timeout);
      hole.timeout = null;
    }
    if (hole.characterElement && hole.characterElement.parentNode === hole.element) {
      hole.element.removeChild(hole.characterElement);
    }
    hole.characterElement = null; // Ensure reference is cleared
    hole.hasCharacter = false;
    hole.characterType = null;
  });

  const overlayElement = document.getElementById('game-overlay');
  // This listener is for the "Click to Start!" state, to begin a new game.
  overlayElement.addEventListener('click', startGame, { once: true });
}

function startGame() {
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  gameState.running = true;
  import('main').then(module => {
    module.hideOverlay();
  });

  gameState.popupInterval = setInterval(popupRandomCharacter, calculatePopupSpeed());

  gameState.holes.forEach(hole => {
    // Remove previous listeners before adding new ones to prevent duplicates on restart
    if (hole._whackHandler) {
      hole.element.removeEventListener('click', hole._whackHandler);
    }
    hole._whackHandler = () => whackHole(hole);
    hole.element.addEventListener('click', hole._whackHandler);

    if (hole._touchWhackHandler) {
      hole.element.removeEventListener('touchstart', hole._touchWhackHandler);
    }
    hole._touchWhackHandler = (e) => {
      e.preventDefault();
      whackHole(hole);
    };
    hole.element.addEventListener('touchstart', hole._touchWhackHandler, { passive: false });
  });
}

function calculatePopupSpeed() {
  return Math.max(500, gameState.popupSpeed - (gameState.level - 1) * 150);
}

function popupRandomCharacter() {
  if (!gameState.running) return;

  const emptyHoles = gameState.holes.filter(hole => !hole.hasCharacter);
  if (emptyHoles.length === 0) return;

  const hole = emptyHoles[Math.floor(Math.random() * emptyHoles.length)];
  const isDanger = Math.random() < gameState.dangerProbability;

  import('characters').then(module => {
    const character = isDanger
      ? module.createDangerCharacter()
      : module.createFriendlyCharacter();

    hole.hasCharacter = true;
    hole.characterType = isDanger ? 'danger' : 'friendly';
    hole.characterElement = character;
    hole.element.appendChild(character);

    setTimeout(() => {
      if (character.parentNode) {
        character.classList.add('pop');
      }
    }, 10);

    const stayDuration = calculatePopupSpeed() * 0.8;
    if (hole.timeout) {
      clearTimeout(hole.timeout);
    }
    hole.timeout = setTimeout(() => {
      const characterTypeOfExpired = hole.characterType;
      removeCharacter(hole);

      if (characterTypeOfExpired === 'friendly' && gameState.running) {
        gameState.miss++;
        sounds.miss();

        import('main').then(mainModule => {
          mainModule.setStats({
            score: gameState.score,
            miss: gameState.miss,
            level: gameState.level
          });

          if (gameState.miss >= gameState.maxMiss) {
            gameOver('Too many misses!');
          }
        });
      }
    }, stayDuration);
  });
}

function removeCharacter(hole) {
  if (!hole.hasCharacter) return;

  if (hole.characterElement && hole.characterElement.parentNode === hole.element) {
    hole.characterElement.classList.remove('pop');
    hole.element.removeChild(hole.characterElement);
  }

  hole.characterElement = null; // Ensure reference is cleared
  hole.hasCharacter = false;
  hole.characterType = null;
  if (hole.timeout) {
    clearTimeout(hole.timeout);
    hole.timeout = null;
  }
}

function whackHole(hole) {
  if (!gameState.running || !hole.hasCharacter) return;

  animateBatWhack();

  const whackedCharacterType = hole.characterType;
  const whackedCharacterElement = hole.characterElement;

  // Crucially, clear the timeout for this hole *immediately* upon a successful whack registration.
  // This prevents the miss logic in popupRandomCharacter's setTimeout from firing for this character.
  if (hole.timeout) {
    clearTimeout(hole.timeout);
    hole.timeout = null;
  }

  if (whackedCharacterType === 'danger') {
    sounds.danger();
    if (whackedCharacterElement) whackedCharacterElement.classList.add('squish');
    // Game over takes precedence. Remove character state before calling gameOver.
    // removeCharacter also clears hole.timeout, but we've done it above for safety.
    removeCharacter(hole); // Update hole state
    gameOver('You hit the danger character!');
  } else if (whackedCharacterType === 'friendly') {
    gameState.score++;
    sounds.hit();

    if (whackedCharacterElement) whackedCharacterElement.classList.add('squish');

    setTimeout(() => {
      // Check if the character is still the one we whacked before removing
      if (hole.characterElement === whackedCharacterElement || whackedCharacterElement.parentNode === hole.element) {
        removeCharacter(hole); // This will clear hasCharacter, characterType, characterElement
      }
    }, 230);

    import('main').then(module => {
      module.setStats({
        score: gameState.score,
        miss: gameState.miss,
        level: gameState.level
      });
    });

    if (gameState.score >= (gameState.level * gameState.maxScore)) {
      levelUp();
    }
  } else {
    // If characterType is somehow null here, it means it might have been cleared by a race condition.
    // We already cleared the timeout, so a miss won't be counted. Just ensure visual cleanup if needed.
    if (hole.hasCharacter) { // If it still thinks it has a character, clean up
      removeCharacter(hole);
    }
  }
}

function levelUp() {
  gameState.level++;
  sounds.levelUp();

  clearInterval(gameState.popupInterval);

  import('main').then(module => {
    module.setStats({
      score: gameState.score,
      miss: gameState.miss,
      level: gameState.level
    });
    module.showOverlay(`<div>Level ${gameState.level}!<br><span style="font-size:0.7em; color:#555;">Get ready...</span></div>`);
  });

  setTimeout(() => {
    import('main').then(module => {
      module.hideOverlay();
    });
    if (gameState.running) {
      gameState.popupInterval = setInterval(popupRandomCharacter, calculatePopupSpeed());
    }
  }, 1500);
}

// Game over - FIXED
function gameOver(message) {
  gameState.running = false;

  if (gameState.popupInterval) {
    clearInterval(gameState.popupInterval);
    gameState.popupInterval = null;
  }

  gameState.holes.forEach(hole => {
    if (hole.timeout) {
      clearTimeout(hole.timeout);
      hole.timeout = null;
    }
    if (hole.hasCharacter && hole.characterElement && hole.characterElement.parentNode === hole.element) {
      hole.element.removeChild(hole.characterElement);
    }
    hole.characterElement = null; // Ensure reference is cleared
    hole.hasCharacter = false;
    hole.characterType = null;
  });

  // Get the overlay element. DO NOT replace this element.
  const overlayElement = document.getElementById('game-overlay');

  import('main').then(module => {
    // 1. Show the Game Over message. This uses main.js's showOverlay,
    //    which relies on its cached reference to the #game-overlay element.
    //    By not replacing the element, that reference remains valid.
    module.showOverlay(`<div>Game Over!<br>${message}<br>Score: ${gameState.score} | Level: ${gameState.level}<br><span style="font-size:0.7em; color:#555;">Click to restart</span></div>`);

    // 2. Add the click listener to restart, after a short delay.
    //    The delay prevents the click that *ended* the game from also immediately triggering the restart.
    setTimeout(() => {
      // The listener calls `resetGame` when the overlay is clicked.
      // `{ once: true }` ensures this listener is automatically removed after it fires once.
      overlayElement.addEventListener('click', resetGame, { once: true });
    }, 100); // 100ms delay should be sufficient.
  });
}

export { initGame, resetGame, startGame, gameState };