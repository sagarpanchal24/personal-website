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

// Photo stack — left/right hover interaction
document.querySelectorAll('.photo-stack').forEach(stack => {
  stack.addEventListener('mousemove', (e) => {
    const rect = stack.getBoundingClientRect();
    const x = e.clientX - rect.left;
    stack.classList.remove('hover-left', 'hover-right');
    stack.classList.add(x < rect.width / 2 ? 'hover-left' : 'hover-right');
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
