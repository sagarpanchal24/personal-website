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
const lightbox         = document.getElementById('lightbox');
const lightboxImg      = document.getElementById('lightboxImg');
const lightboxClose    = document.getElementById('lightboxClose');
const lightboxBackdrop = document.getElementById('lightboxBackdrop');
const lightboxPrev     = document.getElementById('lightboxPrev');
const lightboxNext     = document.getElementById('lightboxNext');
const lightboxCounter  = document.getElementById('lightboxCounter');
const lbLocation       = lightbox.querySelector('.location');
const lbStory          = lightbox.querySelector('.story');

// Collect all photo cards in order
const allCards  = Array.from(document.querySelectorAll('.photo-card'));
let currentIndex = 0;
let savedScrollY = 0;

function showCard(index, animate = true) {
  const card = allCards[index];
  const img  = card.querySelector('img');
  const info = card.querySelector('.photo-info');

  if (animate) {
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.94)';
  }

  setTimeout(() => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lbLocation.textContent = info ? (info.querySelector('.location')?.textContent || '') : '';
    lbStory.textContent    = info ? (info.querySelector('.story')?.textContent    || '') : '';
    lightboxCounter.textContent = `${index + 1} / ${allCards.length}`;

    if (animate) {
      requestAnimationFrame(() => {
        lightboxImg.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
      });
    }
  }, animate ? 120 : 0);

  // Show/hide prev-next arrows at edges
  lightboxPrev.classList.toggle('hidden', index === 0);
  lightboxNext.classList.toggle('hidden', index === allCards.length - 1);
}

function openLightbox(card) {
  savedScrollY  = window.scrollY;
  currentIndex  = allCards.indexOf(card);

  lightboxImg.style.transition = 'none';
  lightboxImg.style.opacity    = '0';
  lightboxImg.style.transform  = 'scale(0.88)';

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  history.pushState({ lightboxOpen: true }, '');

  requestAnimationFrame(() => {
    lightboxImg.style.transition = '';
    showCard(currentIndex, false);
    requestAnimationFrame(() => {
      lightboxImg.style.opacity   = '1';
      lightboxImg.style.transform = 'scale(1)';
    });
  });
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  requestAnimationFrame(() => window.scrollTo({ top: savedScrollY, behavior: 'instant' }));
}

function goNext() {
  if (currentIndex < allCards.length - 1) { currentIndex++; showCard(currentIndex); }
}

function goPrev() {
  if (currentIndex > 0) { currentIndex--; showCard(currentIndex); }
}

// Click on any photo card opens lightbox
document.querySelectorAll('.photo-card').forEach(card => {
  card.style.cursor = 'zoom-in';
  card.addEventListener('click', (e) => { e.stopPropagation(); openLightbox(card); });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); goNext(); });
lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); goPrev(); });

// Keyboard: Escape closes, arrows navigate
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') goNext();
  if (e.key === 'ArrowLeft')  goPrev();
});

// Browser back button closes lightbox
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
