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
      { src: 'assets/images/photo_1.jpg',          story: 'Low tide reveals a lone mangrove tree standing in the middle of perfectly clear water. No one else was around. Just the sound of small waves and this quiet, solitary tree which is completely unbothered by everything.' },
      { src: 'assets/images/photo_2.jpg',          story: "There's about a 10 minute window each evening when the light turns everything gold. I'd been waiting at this beach for two hours for that window. The kind of light that makes you forget you're holding a camera." },
      { src: 'assets/images/photo_3.jpg',          story: "Ranked among Asia's finest beaches, Radhanagar earns it at dusk. The silhouette of a signpost against that burning sky felt like the perfect metaphor, a marker at the edge of somewhere beautiful." },
      { src: 'assets/images/photo_4.jpg',          story: "The British built this prison to isolate freedom fighters, solitary cells, no contact, no hope. Walking through it, you feel the weight of what happened here. History doesn't always sit quietly in museums." },
      { src: 'assets/images/Andman/IMG_7597.JPG',  story: 'First image that has been taken on Andman, it is special to see the Sea far from mainland India.' },
    ]
  },
  praha: {
    name: 'Praha, Czech Republic',
    photos: [
      { src: 'assets/images/photo_5.jpg',               story: 'The Orloj has been telling time since 1410. Six centuries of people stopping to look up at it,  kings, travellers, tourists. I stood there for a while just thinking about that.' },
      { src: 'assets/images/photo_7.jpg',               story: 'March  in Prague hits differently. The whole square transforms into warm lights, mulled wine, spring carols echoing off 600-year-old buildings. Tourists everywhere, but somehow it still feels magical.' },
      { src: 'assets/images/Praha/DSCF4039.JPG',        story: 'Back side of the astronomical clock, framed set to with the clouds and giving historical city vibe.' },
      { src: 'assets/images/Praha/DSCF4042.JPG',        story: 'The Church of the Mother of God before Týn, The church once was the center of the German inhabitants of Old Town. it is special church look at the width of the both tower.' },
      { src: 'assets/images/Praha/DSCF4070.JPG',        story: "Behind Prague's Astronomical Clock, a quiet open square becomes an unexpected stage. Two dancers in traditional Bohemian costume spin to the live bow of a double bass, the embroidered skirt catching every turn. No theatre, no tickets just centuries-old folk dance happening in the open air, for anyone who slows down enough to notice." },
      { src: 'assets/images/Praha/DSCF4141.JPG',        story: "Standing on Charles Bridge, history surrounds you from every angle but it is what lies between the towers that stops you. The baroque domes and clock spires of St. Nicholas Church emerge through the gap, framed by centuries of stone on either side. Dark clouds, old arches, and layered rooftops. Prague does not show itself all at once. It reveals itself slowly, one frame at a time." },
      { src: 'assets/images/Praha/DSCF4249-2.JPG',      story: "Tucked inside Prague's old armory museum, warm lights line the dim corridor like a trail leading deeper into history. People shuffle through, curious and unhurried, long after the sun goes down. Prague is not a city that sleeps, there is always another room to wander into, another story waiting in the dark." },
      { src: 'assets/images/Praha/IMG_8722.JPG',        story: "Čekejte means Wait, This worn pedestrian crossing button says it plainly in Czech: wait. Behind it, the city moves anyway. A small detail most visitors walk past, but one that quietly reminds you that you are somewhere with its own language and its own rhythm." },
      { src: 'assets/images/Praha/IMG_8737.JPG',        story: "Even the Ground Has a Coat of Arms. This manhole cover, engraved with the city seal and the words Pražská Kanalizace, sits flush in the cobblestones as if it belongs in a museum. In a city this old, even what lies beneath deserves a crest." },
      { src: 'assets/images/Praha/IMG_8865.JPG',        story: "The Bookstore That Time Forgot, A floral armchair, a vintage typewriter, overflowing shelves, and somehow a bicycle parked among the books. I spent an hour in this Prague basement bookstore and left with both a book and the rare feeling of having found somewhere genuinely unhurried." },
    ]
  },
  konstanz: {
    name: 'Konstanz, Germany',
    photos: [
      { src: 'assets/images/photo_6.jpg', story: 'Lake Constance on a calm afternoon. A single sailboat barely moving, the Alps faint in the distance. I was on a weekend trip from Aalen. Some places slow you down without asking.' },
    ]
  },
  mercedes: {
    name: 'Mercedes-Benz Museum, Stuttgart',
    photos: [
      { src: 'assets/images/Mercedece Museum/IMG_0242.JPG', story: "Inside the Mercedes-Benz Museum, vintage silver racing cars line a darkened track like floor as if the race is about to begin. The curved ceiling pulls everything forward. Nothing is moving but somehow everything looks like it just stopped. This is what engineering looks like when it becomes art."},
    ]
  },
  wuppertal: {
    name: 'Wuppertal, Germany',
    photos: [
      { src: 'assets/images/Wupertal/DSCF3167.JPG', story: "Most cities run their trains on the ground. Wuppertal hung theirs from the sky and has been doing so since 1901. Standing on the platform, all steel and shadow, as the car glides in from above feels less like catching a train and more like stepping into a machine that never stopped running." },
    ]
  },
  stuttgart: {
    name: 'Stuttgart, Germany',
    photos: [
      { src: 'assets/images/Sttutgart/DSCF2113.JPG', story: "Stuttgart's neoclassical colonnades have watched generations walk past, and they are still watching. Two people stroll by without a glance upward, the way locals do with grandeur they have grown used to. The golden light on the stone says everything the city does not need to say out loud." },
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
