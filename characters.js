// Character creation and rendering using SVG
const COLORS = {
  MOUSE: {
    body: '#A8A8A8',
    ear: '#8E8E8E',
    eye: '#000000',
    nose: '#E77B7E',
    tail: '#9C9C9C'
  },
  BUNNY: {
    body: '#F5E0DC',
    ear: '#E6C8C3',
    eye: '#000000',
    nose: '#F28B82'
  },
  TUNG: {
    body: '#FFD166',
    eye: '#000000',
    mouth: '#EF476F',
    hair: '#4D908E'
  },
  DANGER: {
    body: '#EF476F',
    eye: '#000000',
    teeth: '#FFFFFF',
    horn: '#851D41'
  }
};

// Array of friendly character types
const FRIENDLY_TYPES = ['mouse', 'bunny', 'tung'];

// Create a friendly character element
function createFriendlyCharacter() {
  const type = FRIENDLY_TYPES[Math.floor(Math.random() * FRIENDLY_TYPES.length)];
  const characterElement = document.createElement('div');
  characterElement.classList.add('character');
  
  // Set SVG based on type
  switch (type) {
    case 'mouse':
      characterElement.innerHTML = createMouseSVG();
      break;
    case 'bunny':
      characterElement.innerHTML = createBunnySVG();
      break;
    case 'tung':
      characterElement.innerHTML = createTungSVG();
      break;
  }
  
  return characterElement;
}

// Create danger character element
function createDangerCharacter() {
  const characterElement = document.createElement('div');
  characterElement.classList.add('character', 'danger');
  characterElement.innerHTML = createDangerSVG();
  return characterElement;
}

// Create SVG for mouse character
function createMouseSVG() {
  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <ellipse cx="50" cy="60" rx="28" ry="25" fill="${COLORS.MOUSE.body}"/>
      
      <!-- Ears -->
      <circle cx="35" cy="35" r="10" fill="${COLORS.MOUSE.ear}"/>
      <circle cx="65" cy="35" r="10" fill="${COLORS.MOUSE.ear}"/>
      
      <!-- Eyes -->
      <circle cx="40" cy="55" r="4" fill="${COLORS.MOUSE.eye}"/>
      <circle cx="60" cy="55" r="4" fill="${COLORS.MOUSE.eye}"/>
      <circle cx="40" cy="54" r="1" fill="white"/>
      <circle cx="60" cy="54" r="1" fill="white"/>
      
      <!-- Nose -->
      <ellipse cx="50" cy="65" rx="5" ry="3" fill="${COLORS.MOUSE.nose}"/>
      
      <!-- Whiskers -->
      <line x1="30" y1="65" x2="15" y2="60" stroke="black" stroke-width="1"/>
      <line x1="30" y1="65" x2="15" y2="65" stroke="black" stroke-width="1"/>
      <line x1="30" y1="65" x2="15" y2="70" stroke="black" stroke-width="1"/>
      <line x1="70" y1="65" x2="85" y2="60" stroke="black" stroke-width="1"/>
      <line x1="70" y1="65" x2="85" y2="65" stroke="black" stroke-width="1"/>
      <line x1="70" y1="65" x2="85" y2="70" stroke="black" stroke-width="1"/>
      
      <!-- Tail -->
      <path d="M30,75 Q10,90 20,95" fill="none" stroke="${COLORS.MOUSE.tail}" stroke-width="5" stroke-linecap="round"/>
    </svg>
  `;
}

// Create SVG for bunny character
function createBunnySVG() {
  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <ellipse cx="50" cy="65" rx="25" ry="23" fill="${COLORS.BUNNY.body}"/>
      
      <!-- Ears -->
      <path d="M35,45 Q25,15 30,5 Q35,15 40,45" fill="${COLORS.BUNNY.ear}"/>
      <path d="M65,45 Q75,15 70,5 Q65,15 60,45" fill="${COLORS.BUNNY.ear}"/>
      <path d="M35,45 Q30,20 33,12 Q36,20 40,45" fill="#FFE6E2" opacity="0.6"/>
      <path d="M65,45 Q70,20 67,12 Q64,20 60,45" fill="#FFE6E2" opacity="0.6"/>
      
      <!-- Eyes -->
      <ellipse cx="40" cy="60" rx="5" ry="6" fill="${COLORS.BUNNY.eye}"/>
      <ellipse cx="60" cy="60" rx="5" ry="6" fill="${COLORS.BUNNY.eye}"/>
      <circle cx="38" cy="58" r="2" fill="white"/>
      <circle cx="58" cy="58" r="2" fill="white"/>
      
      <!-- Nose -->
      <path d="M47,70 Q50,72 53,70 Q51,75 47,70" fill="${COLORS.BUNNY.nose}"/>
      
      <!-- Mouth -->
      <path d="M47,75 Q50,79 53,75" fill="none" stroke="#333" stroke-width="1"/>
      
      <!-- Cheeks -->
      <circle cx="32" cy="70" r="5" fill="#FFD9D5" opacity="0.6"/>
      <circle cx="68" cy="70" r="5" fill="#FFD9D5" opacity="0.6"/>
    </svg>
  `;
}

// Create SVG for Tung Tung Sahur character
function createTungSVG() {
  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <circle cx="50" cy="55" r="30" fill="${COLORS.TUNG.body}"/>
      
      <!-- Hair tufts -->
      <path d="M40,30 Q50,15 60,30" fill="${COLORS.TUNG.hair}" stroke="${COLORS.TUNG.hair}" stroke-width="5"/>
      <path d="M35,35 Q30,22 40,30" fill="${COLORS.TUNG.hair}" stroke="${COLORS.TUNG.hair}" stroke-width="4"/>
      <path d="M65,35 Q70,22 60,30" fill="${COLORS.TUNG.hair}" stroke="${COLORS.TUNG.hair}" stroke-width="4"/>
      
      <!-- Eyes -->
      <ellipse cx="40" cy="50" rx="6" ry="8" fill="white"/>
      <ellipse cx="60" cy="50" rx="6" ry="8" fill="white"/>
      <circle cx="40" cy="52" r="3" fill="${COLORS.TUNG.eye}"/>
      <circle cx="60" cy="52" r="3" fill="${COLORS.TUNG.eye}"/>
      <circle cx="41" cy="50" r="1" fill="white"/>
      <circle cx="61" cy="50" r="1" fill="white"/>
      
      <!-- Eyebrows -->
      <path d="M32,40 Q40,38 45,40" fill="none" stroke="#333" stroke-width="2"/>
      <path d="M68,40 Q60,38 55,40" fill="none" stroke="#333" stroke-width="2"/>
      
      <!-- Mouth -->
      <path d="M40,70 Q50,80 60,70" fill="${COLORS.TUNG.mouth}" stroke="#000" stroke-width="1"/>
      <path d="M40,70 Q50,75 60,70" fill="${COLORS.TUNG.mouth}"/>
      
      <!-- Cheeks -->
      <circle cx="30" cy="60" r="7" fill="#FFB5A9" opacity="0.5"/>
      <circle cx="70" cy="60" r="7" fill="#FFB5A9" opacity="0.5"/>
      
      <!-- Blush -->
      <line x1="43" y1="65" x2="46" y2="63" stroke="#F07167" stroke-width="2" stroke-linecap="round"/>
      <line x1="54" y1="65" x2="57" y2="63" stroke="#F07167" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
}

// Create SVG for danger character
function createDangerSVG() {
  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <circle cx="50" cy="55" r="32" fill="${COLORS.DANGER.body}"/>
      
      <!-- Horns -->
      <path d="M35,30 L25,10 L40,25" fill="${COLORS.DANGER.horn}"/>
      <path d="M65,30 L75,10 L60,25" fill="${COLORS.DANGER.horn}"/>
      
      <!-- Eyes -->
      <path d="M35,50 L45,45 L45,55 Z" fill="${COLORS.DANGER.eye}"/>
      <path d="M65,50 L55,45 L55,55 Z" fill="${COLORS.DANGER.eye}"/>
      
      <!-- Mouth -->
      <path d="M30,65 Q50,85 70,65" fill="#641220"/>
      <path d="M35,70 L35,75" fill="none" stroke="${COLORS.DANGER.teeth}" stroke-width="3"/>
      <path d="M45,74 L45,80" fill="none" stroke="${COLORS.DANGER.teeth}" stroke-width="3"/>
      <path d="M55,74 L55,80" fill="none" stroke="${COLORS.DANGER.teeth}" stroke-width="3"/>
      <path d="M65,70 L65,75" fill="none" stroke="${COLORS.DANGER.teeth}" stroke-width="3"/>
      
      <!-- Brows -->
      <path d="M30,40 L45,45" fill="none" stroke="#000" stroke-width="3"/>
      <path d="M70,40 L55,45" fill="none" stroke="#000" stroke-width="3"/>
    </svg>
  `;
}

export { createFriendlyCharacter, createDangerCharacter };