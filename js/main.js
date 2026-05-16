// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// Lightbox
const lightbox       = document.getElementById('lightbox');
const lightboxImg    = document.getElementById('lightboxImg');
const lightboxClose  = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const lbLocation     = lightbox.querySelector('.location');
const lbStory        = lightbox.querySelector('.story');
let savedScrollY     = 0;

function openLightbox(img, card) {
  savedScrollY = window.scrollY;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;

  const info = card.querySelector('.photo-info');
  lbLocation.textContent = info ? info.querySelector('.location')?.textContent : '';
  lbStory.textContent    = info ? info.querySelector('.story')?.textContent    : '';

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Push state so browser back button closes the lightbox
  history.pushState({ lightboxOpen: true }, '');
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  // Restore exact scroll position
  requestAnimationFrame(() => window.scrollTo({ top: savedScrollY, behavior: 'instant' }));
}

// Click on any photo card opens lightbox
document.querySelectorAll('.photo-card').forEach(card => {
  card.style.cursor = 'zoom-in';
  card.addEventListener('click', (e) => {
    e.stopPropagation();
    openLightbox(card.querySelector('img'), card);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);

// Escape key closes
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

// Browser back button closes lightbox instead of leaving page
window.addEventListener('popstate', () => {
  if (lightbox.classList.contains('open')) closeLightbox();
});

// Photo stack — left/right hover interaction
document.querySelectorAll('.photo-stack').forEach(stack => {
  stack.addEventListener('mousemove', (e) => {
    const rect = stack.getBoundingClientRect();
    const x = e.clientX - rect.left;
    stack.classList.remove('hover-left', 'hover-right');
    // Front card occupies left 68%, back card right 68% — use 62% as divider
    stack.classList.add(x < rect.width * 0.62 ? 'hover-left' : 'hover-right');
  });
  stack.addEventListener('mouseleave', () => {
    stack.classList.remove('hover-left', 'hover-right');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.section-header, .about-grid, .timeline-item, .research-grid, .project-card, .contact-wrap, .focus-card, .photo-stack');

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));
