// Main interactivity for the landing page

// Tailwind script config (also in HTML)
function initTailwind() {
  if (typeof tailwind !== 'undefined') {
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: '#0B132B',
            slate: '#3A506B',
            accent: '#5C7A9E'
          }
        }
      }
    };
  }
}

// Simple typewriter for hero
function typeWriter(element, text, speed = 70) {
  let i = 0;
  element.textContent = '';
  const cursor = document.createElement('span');
  cursor.textContent = '|';
  cursor.style.color = '#5C7A9E';
  element.appendChild(cursor);

  const interval = setInterval(() => {
    if (i < text.length) {
      cursor.before(document.createTextNode(text.charAt(i)));
      i++;
    } else {
      clearInterval(interval);
      // keep blinking cursor for a bit then remove
      setTimeout(() => {
        if (cursor && cursor.parentNode) cursor.parentNode.removeChild(cursor);
      }, 1200);
    }
  }, speed);
}

// Mobile menu
function initMobileMenu() {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // close when clicking a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => menu.classList.add('hidden'));
  });
}


// Keyboard easter egg (press "a")
function initKeyboard() {
  document.addEventListener('keypress', (e) => {
    if (e.key.toLowerCase() === 'a') {
      document.documentElement.style.setProperty('--accent', '#ff00aa');
      setTimeout(() => {
        document.documentElement.style.setProperty('--accent', '#5C7A9E');
      }, 900);
    }
  });
}

// Boot everything
function init() {
  initTailwind();

  // Hero typing (only on landing)
  const typed = document.getElementById('typed');
  if (typed) {
    setTimeout(() => {
      typeWriter(typed, 'Design. Code. Motion. Stories.');
    }, 650);
  }

  initMobileMenu();
  initKeyboard();
}

document.addEventListener('DOMContentLoaded', init);
