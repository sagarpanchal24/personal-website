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

// ── Photo data by location ──────────────────────────────────────────
// To add a new location: add an entry here + a .location-card in HTML
// To add a photo to existing location: add { src: '...', story: '...' } to the photos array
const photoData = {
  andaman: {
    name: 'Andaman Islands, India',
    photos: [
      { src: 'assets/images/photo_1.jpg',          story: 'Low tide reveals a lone mangrove tree standing in the middle of perfectly clear water. No one else was around. Just the sound of small waves and this quiet, solitary tree — completely unbothered by everything.' },
      { src: 'assets/images/photo_2.jpg',          story: "There's about a 10-minute window each evening when the light turns everything gold. I'd been waiting at this beach for two hours — this was that window. The kind of light that makes you forget you're holding a camera." },
      { src: 'assets/images/photo_3.jpg',          story: "Ranked among Asia's finest beaches, Radhanagar earns it at dusk. The silhouette of a signpost against that burning sky felt like the perfect metaphor — a marker at the edge of somewhere beautiful." },
      { src: 'assets/images/photo_4.jpg',          story: "The British built this prison to isolate freedom fighters — solitary cells, no contact, no hope. Walking through it, you feel the weight of what happened here. History doesn't always sit quietly in museums." },
      { src: 'assets/images/andman/IMG_7597.JPG',  story: 'Add your story for this shot here.' },
    ]
  },
  praha: {
    name: 'Praha, Czech Republic',
    photos: [
      { src: 'assets/images/photo_5.jpg',               story: 'The Orloj has been telling time since 1410. Six centuries of people stopping to look up at it — kings, travellers, tourists. I stood there for a while just thinking about that.' },
      { src: 'assets/images/photo_7.jpg',               story: 'December in Prague hits differently. The whole square transforms — warm lights, mulled wine, Christmas carols echoing off 600-year-old buildings. Tourists everywhere, but somehow it still feels magical.' },
      { src: 'assets/images/Praha/DSCF4039.JPG',        story: 'Add your story for this shot here.' },
      { src: 'assets/images/Praha/DSCF4042.JPG',        story: 'Add your story for this shot here.' },
      { src: 'assets/images/Praha/DSCF4070.JPG',        story: 'Add your story for this shot here.' },
      { src: 'assets/images/Praha/DSCF4141.JPG',        story: 'Add your story for this shot here.' },
      { src: 'assets/images/Praha/DSCF4249-2.JPG',      story: 'Add your story for this shot here.' },
      { src: 'assets/images/Praha/IMG_8722.JPG',        story: 'Add your story for this shot here.' },
      { src: 'assets/images/Praha/IMG_8737.JPG',        story: 'Add your story for this shot here.' },
      { src: 'assets/images/Praha/IMG_8865.JPG',        story: 'Add your story for this shot here.' },
    ]
  },
  konstanz: {
    name: 'Konstanz, Germany',
    photos: [
      { src: 'assets/images/photo_6.jpg', story: 'Lake Constance on a calm afternoon — a single sailboat barely moving, the Alps faint in the distance. I was on a weekend trip from Stuttgart. Some places slow you down without asking.' },
    ]
  },
  mercedes: {
    name: 'Mercedes-Benz Museum, Stuttgart',
    photos: [
      { src: 'assets/images/Mercedece Museum/IMG_0242.JPG', story: 'Add your story for this shot here.' },
    ]
  },
  wuppertal: {
    name: 'Wuppertal, Germany',
    photos: [
      { src: 'assets/images/Wupertal/DSCF3167.JPG', story: 'Add your story for this shot here.' },
    ]
  },
  stuttgart: {
    name: 'Stuttgart, Germany',
    photos: [
      { src: 'assets/images/Sttutgart/DSCF2113.JPG', story: 'Add your story for this shot here.' },
    ]
  }
};

// ── DOM refs ─────────────────────────────────────────────────────────
const galleryOverlay   = document.getElementById('galleryOverlay');
const galleryBackdrop  = document.getElementById('galleryBackdrop');
const galleryClose     = document.getElementById('galleryClose');
const galleryLocName   = document.getElementById('galleryLocName');
const galleryPhotoCount= document.getElementById('galleryPhotoCount');
const galleryGrid      = document.getElementById('galleryGrid');

const lightbox         = document.getElementById('lightbox');
const lightboxImg      = document.getElementById('lightboxImg');
const lightboxClose    = document.getElementById('lightboxClose');
const lightboxPrev     = document.getElementById('lightboxPrev');
const lightboxNext     = document.getElementById('lightboxNext');
const lightboxCounter  = document.getElementById('lightboxCounter');
const lbLocation       = lightbox.querySelector('.location');
const lbStory          = lightbox.querySelector('.story');

let savedScrollY        = 0;
let currentPhotos       = [];
let currentPhotoIndex   = 0;

// ── Gallery ──────────────────────────────────────────────────────────
function openGallery(locKey) {
  const loc = photoData[locKey];
  if (!loc) return;
  currentPhotos = loc.photos;

  galleryLocName.textContent   = loc.name;
  galleryPhotoCount.textContent = `${loc.photos.length} photo${loc.photos.length > 1 ? 's' : ''}`;

  galleryGrid.innerHTML = '';
  loc.photos.forEach((photo, i) => {
    const thumb = document.createElement('div');
    thumb.className = 'gallery-thumb';
    thumb.innerHTML = `<img src="${photo.src}" alt="" loading="lazy" />`;
    thumb.addEventListener('click', () => openLightbox(i));
    galleryGrid.appendChild(thumb);
  });

  savedScrollY = window.scrollY;
  galleryOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  history.pushState({ gallery: true }, '');
}

function closeGallery() {
  galleryOverlay.classList.remove('open');
  document.body.style.overflow = '';
  requestAnimationFrame(() => window.scrollTo({ top: savedScrollY, behavior: 'instant' }));
}

// Location card clicks
document.querySelectorAll('.location-card').forEach(card => {
  card.addEventListener('click', () => openGallery(card.dataset.loc));
});

galleryClose.addEventListener('click', closeGallery);
galleryBackdrop.addEventListener('click', (e) => {
  if (e.target === galleryBackdrop) closeGallery();
});

// ── Lightbox ─────────────────────────────────────────────────────────
function showPhoto(index, animate = true) {
  const photo = currentPhotos[index];

  if (animate) {
    lightboxImg.style.opacity   = '0';
    lightboxImg.style.transform = 'scale(0.94)';
  }

  setTimeout(() => {
    lightboxImg.src        = photo.src;
    lbLocation.textContent = photoData[Object.keys(photoData).find(k => photoData[k].photos.includes(photo))]?.name || '';
    lbStory.textContent    = photo.story;
    lightboxCounter.textContent = `${index + 1} / ${currentPhotos.length}`;

    lightboxPrev.classList.toggle('hidden', index === 0);
    lightboxNext.classList.toggle('hidden', index === currentPhotos.length - 1);

    if (animate) {
      requestAnimationFrame(() => {
        lightboxImg.style.opacity   = '1';
        lightboxImg.style.transform = 'scale(1)';
      });
    }
  }, animate ? 120 : 0);
}

function openLightbox(index) {
  currentPhotoIndex = index;
  lightboxImg.style.transition = 'none';
  lightboxImg.style.opacity    = '0';
  lightboxImg.style.transform  = 'scale(0.88)';

  lightbox.classList.add('open');
  history.pushState({ lightbox: true }, '');

  requestAnimationFrame(() => {
    lightboxImg.style.transition = '';
    showPhoto(currentPhotoIndex, false);
    requestAnimationFrame(() => {
      lightboxImg.style.opacity   = '1';
      lightboxImg.style.transform = 'scale(1)';
    });
  });
}

function closeLightboxToGallery() {
  lightbox.classList.remove('open');
  // Gallery stays open underneath — do NOT close it
}

function goNext() {
  if (currentPhotoIndex < currentPhotos.length - 1) {
    currentPhotoIndex++;
    showPhoto(currentPhotoIndex);
  }
}

function goPrev() {
  if (currentPhotoIndex > 0) {
    currentPhotoIndex--;
    showPhoto(currentPhotoIndex);
  }
}

lightboxClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightboxToGallery(); });
lightboxPrev.addEventListener('click',  (e) => { e.stopPropagation(); goPrev(); });
lightboxNext.addEventListener('click',  (e) => { e.stopPropagation(); goNext(); });

// Keyboard
document.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('open')) {
    if (e.key === 'Escape')     closeLightboxToGallery();
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft')  goPrev();
    return;
  }
  if (galleryOverlay.classList.contains('open') && e.key === 'Escape') closeGallery();
});

// Browser back button
window.addEventListener('popstate', () => {
  if (lightbox.classList.contains('open'))       { closeLightboxToGallery(); return; }
  if (galleryOverlay.classList.contains('open')) { closeGallery(); }
});

// ── Mobile: swipe down in lightbox → back to gallery ─────────────────
let touchStartY = 0;
let touchStartX = 0;

lightboxImg.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
  touchStartX = e.touches[0].clientX;
}, { passive: true });

lightboxImg.addEventListener('touchend', (e) => {
  const dy = e.changedTouches[0].clientY - touchStartY;
  const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
  // Swipe down > 80px and mostly vertical → close to gallery
  if (dy > 80 && dx < 60) closeLightboxToGallery();
}, { passive: true });

// Scroll reveal
const revealEls = document.querySelectorAll('.section-header, .about-grid, .timeline-item, .research-grid, .project-card, .contact-wrap, .focus-card, .location-card');

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
