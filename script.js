// === Hero Section Slideshow ===
let heroImages = [
  "images/hero1.jpeg",
  "images/hero2.jpeg",
  "images/hero3.jpeg"
];

let hero = document.querySelector(".hero");
if (hero) {
  let bg1 = document.createElement("div");
  let bg2 = document.createElement("div");
  bg1.classList.add("hero-bg", "show");
  bg2.classList.add("hero-bg", "hide");
  hero.prepend(bg2);
  hero.prepend(bg1);

  let index = 0;
  bg1.style.backgroundImage = `url(${heroImages[index]})`;

  setInterval(() => {
    index = (index + 1) % heroImages.length;
    if (bg1.classList.contains("show")) {
      bg2.style.backgroundImage = `url(${heroImages[index]})`;
      bg2.classList.replace("hide", "show");
      bg1.classList.replace("show", "hide");
    } else {
      bg1.style.backgroundImage = `url(${heroImages[index]})`;
      bg1.classList.replace("hide", "show");
      bg2.classList.replace("show", "hide");
    }
  }, 5000);
}

// === Efek Cahaya pada Floating Logo ===
(function(){
  const floating = document.querySelector('.floating-logo');
  if (!floating) return;

  const backLight = document.createElement('div');
  backLight.className = 'floating-backlight';
  Object.assign(backLight.style, {
    position: 'fixed',
    left: 'calc(100% - 88px)',
    bottom: '18px',
    width: '260px',
    height: '260px',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: '9995',
    mixBlendMode: 'screen',
    filter: 'blur(28px)',
    background: 'radial-gradient(circle at center, rgba(255,245,140,0.94) 0%, rgba(255,160,60,0.55) 45%, rgba(196,30,22,0.30) 75%, rgba(0,0,0,0) 92%)',
    opacity: '0.62',
    transform: 'translate(-50%,0)',
    transition: 'opacity .22s ease, transform .22s ease, left .18s ease, bottom .18s ease'
  });
  document.body.appendChild(backLight);

  function syncPosition(){
    const rect = floating.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    backLight.style.left = cx + 'px';
    backLight.style.top = cy + 'px';
  }
  syncPosition();
  window.addEventListener('resize', syncPosition, {passive:true});
  window.addEventListener('scroll', syncPosition, {passive:true});

  function setIntensity(strength){
    const op = 0.45 + (0.5 * Math.min(Math.max(strength,0),1));
    const scale = 1 + (0.12 * Math.min(Math.max(strength,0),1));
    backLight.style.opacity = op;
    backLight.style.transform = `translate(-50%,-50%) scale(${scale})`;
  }

  function onMove(e){
    const rect = floating.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const px = e.clientX ?? (e.touches && e.touches[0].clientX);
    const py = e.clientY ?? (e.touches && e.touches[0].clientY);
    if (px == null || py == null) return;
    const dx = px - cx;
    const dy = py - cy;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const max = Math.max(window.innerWidth, window.innerHeight) * 0.35;
    const strength = Math.max(0, 1 - (dist / max));
    setIntensity(strength);
  }

  function reset(){ setIntensity(0); }

  document.addEventListener('mousemove', onMove, {passive:true});
  document.addEventListener('touchstart', onMove, {passive:true});
  document.addEventListener('touchmove', onMove, {passive:true});
  document.addEventListener('mouseleave', reset);
  document.addEventListener('touchend', reset);

  floating.addEventListener('mouseenter', ()=> setIntensity(1));
  floating.addEventListener('mouseleave', reset);
})();

// === Dropdown Menu Khas Nusantara ===
(function(){
  const btn = document.getElementById('dd-khas');
  if (!btn) return;
  const menu = btn.nextElementSibling;

  function toggle(open) {
    const willOpen = typeof open === 'boolean' ? open : !menu.classList.contains('show');
    if (willOpen) {
      menu.classList.add('show');
      btn.setAttribute('aria-expanded', 'true');
      const first = menu.querySelector('a');
      if (first) first.focus();
    } else {
      menu.classList.remove('show');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }
  }

  btn.addEventListener('click', function(e){
    e.stopPropagation();
    toggle();
  });

  btn.addEventListener('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      toggle(true);
    } else if (e.key === 'Escape') {
      toggle(false);
    }
  });

  document.addEventListener('click', function(e){
    if (!menu.contains(e.target) && e.target !== btn) toggle(false);
  });

  menu.addEventListener('keydown', function(e){
    if (e.key === 'Escape') toggle(false);
  });

  const items = Array.from(menu.querySelectorAll('a'));
  menu.addEventListener('keydown', function(e){
    const idx = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = items[(idx + 1) % items.length];
      next.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = items[(idx - 1 + items.length) % items.length];
      prev.focus();
    }
  });
})();

// === Slider Makanan Khas Nusantara (versi bersih) ===
const sliderWrapper = document.querySelector('.slider-wrapper');
const btnPrev = document.querySelector('.slide-btn.prev');
const btnNext = document.querySelector('.slide-btn.next');

if (sliderWrapper && btnPrev && btnNext) {
  // pastikan tombol tidak memicu scroll halaman
  [btnPrev, btnNext].forEach(btn => {
    btn.type = 'button';
    btn.addEventListener('click', e => e.preventDefault());
  });

  // geser halus horizontal
  btnNext.addEventListener('click', () => {
    sliderWrapper.scrollBy({ left: 300, behavior: 'smooth' });
  });
  btnPrev.addEventListener('click', () => {
    sliderWrapper.scrollBy({ left: -300, behavior: 'smooth' });
  });
}

const hamb = document.getElementById("hamburger-btn");
const nav = document.getElementById("nav-menu");

if (hamb && nav) {
  hamb.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}

