document.addEventListener('DOMContentLoaded', function () {

  // --- Mobile Menu ---
  var menuToggle = document.getElementById('menuToggle');
  var navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- Hero Carousel ---
  var heroSlides = document.querySelectorAll('.hero-slide');
  var heroDots = document.querySelectorAll('.hero-dot');
  var heroPrev = document.querySelector('.hero-prev');
  var heroNext = document.querySelector('.hero-next');
  var heroCurrentSlide = 0;
  var heroAutoplay = null;

  function goToSlide(index) {
    if (!heroSlides.length) return;
    heroSlides[heroCurrentSlide].classList.remove('active');
    if (heroDots[heroCurrentSlide]) heroDots[heroCurrentSlide].classList.remove('active');
    heroCurrentSlide = (index + heroSlides.length) % heroSlides.length;
    heroSlides[heroCurrentSlide].classList.add('active');
    if (heroDots[heroCurrentSlide]) heroDots[heroCurrentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide(heroCurrentSlide + 1); }
  function prevSlide() { goToSlide(heroCurrentSlide - 1); }

  function startAutoplay() {
    stopAutoplay();
    heroAutoplay = setInterval(nextSlide, 6000);
  }

  function stopAutoplay() {
    if (heroAutoplay) clearInterval(heroAutoplay);
  }

  if (heroSlides.length > 1) {
    if (heroNext) heroNext.addEventListener('click', function () { nextSlide(); startAutoplay(); });
    if (heroPrev) heroPrev.addEventListener('click', function () { prevSlide(); startAutoplay(); });

    heroDots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goToSlide(parseInt(dot.getAttribute('data-slide'), 10));
        startAutoplay();
      });
    });

    startAutoplay();
  }

  // --- Header Scroll ---
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- Scroll Animations ---
  var fadeElements = document.querySelectorAll('.fade-in');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // --- Counter Animation ---
  var counterElements = document.querySelectorAll('.counter-number[data-target]');

  if (counterElements.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 2000;
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.innerHTML = current.toLocaleString('pt-BR') + '<span>+</span>';
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // --- Gallery Lightbox ---
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var galleryItems = document.querySelectorAll('.gallery-item');
  var currentIndex = 0;
  var images = [];

  galleryItems.forEach(function (item, i) {
    var img = item.querySelector('img');
    if (img) {
      images.push(img.src);
      item.addEventListener('click', function () {
        currentIndex = i;
        openLightbox(images[currentIndex]);
      });
    }
  });

  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightbox) {
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
      });
    }

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
      if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    });
  }

});
