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
  cursor.style.color = '#00F0FF';
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

// Smooth scroll for nav links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Fake store cart (client-side only)
let cartCount = 0;

function initStore() {
  const addButtons = document.querySelectorAll('.add-to-cart');
  const countEl = document.getElementById('cart-count');
  const cartBtn = document.getElementById('cart-btn');

  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount++;
      if (countEl) countEl.textContent = cartCount;

      // visual feedback
      const original = btn.textContent;
      btn.textContent = 'Added ✓';
      btn.disabled = true;
      btn.classList.add('!bg-emerald-400', '!text-black');

      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        btn.classList.remove('!bg-emerald-400', '!text-black');
      }, 1100);
    });
  });

  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      if (cartCount === 0) {
        alert('Your cart is empty. Add some items from the store!');
      } else {
        alert(`You have ${cartCount} item(s) in cart.\n\n(This is a demo — in a real store we'd open a checkout.)`);
        // For future: we can open a real modal with items
      }
    });
  }
}

// Scroll spy for active nav (desktop)
function initScrollSpy() {
  const sections = ['about', 'portfolio', 'store', 'contact'];
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

// Keyboard hint
function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === '?' && document.activeElement.tagName === 'BODY') {
      const store = document.getElementById('store');
      if (store) store.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Boot everything
function init() {
  initTailwind();

  // Hero typing
  const typed = document.getElementById('typed');
  if (typed) {
    // start after a short delay so layout settles
    setTimeout(() => {
      typeWriter(typed, 'Design. Code. Motion. Stories.');
    }, 650);
  }

  initMobileMenu();
  initSmoothScroll();
  initStore();
  initScrollSpy();
  initKeyboard();

  // Easter egg: press "a" to highlight accent
  document.addEventListener('keypress', (e) => {
    if (e.key.toLowerCase() === 'a') {
      document.documentElement.style.setProperty('--accent', '#ff00aa');
      setTimeout(() => {
        document.documentElement.style.setProperty('--accent', '#00F0FF');
      }, 800);
    }
  });

  console.log('%c[my-website] Landing ready. Ask the AI to make changes!', 'color:#00F0FF');
}

document.addEventListener('DOMContentLoaded', init);
