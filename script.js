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

  function resetLayerAnimations(slide) {
    var layers = slide.querySelectorAll('.hero-layer');
    layers.forEach(function (el) {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    });
  }

  function goToSlide(index) {
    if (!heroSlides.length) return;
    heroSlides[heroCurrentSlide].classList.remove('active');
    if (heroDots[heroCurrentSlide]) heroDots[heroCurrentSlide].classList.remove('active');
    heroCurrentSlide = (index + heroSlides.length) % heroSlides.length;
    resetLayerAnimations(heroSlides[heroCurrentSlide]);
    heroSlides[heroCurrentSlide].classList.add('active');
    if (heroDots[heroCurrentSlide]) heroDots[heroCurrentSlide].classList.add('active');
  }

  function nextSlide() { goToSlide(heroCurrentSlide + 1); }
  function prevSlide() { goToSlide(heroCurrentSlide - 1); }

  function startAutoplay() {
    stopAutoplay();
    heroAutoplay = setInterval(nextSlide, 8000);
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

  // --- Gallery Carousel ---
  var galleryCarousel = document.querySelector('.gallery-carousel');
  var galleryTrack = document.getElementById('galleryTrack');

  if (galleryCarousel && galleryTrack) {
    var originalSlides = Array.prototype.slice.call(galleryTrack.children);
    var realCount = originalSlides.length;
    var cloneCount = Math.min(4, realCount);

    for (var ci = 0; ci < cloneCount; ci++) {
      var cloneEnd = originalSlides[ci].cloneNode(true);
      cloneEnd.classList.add('clone');
      galleryTrack.appendChild(cloneEnd);
      var cloneStart = originalSlides[realCount - 1 - ci].cloneNode(true);
      cloneStart.classList.add('clone');
      galleryTrack.insertBefore(cloneStart, galleryTrack.firstChild);
    }

    var gallerySlides = Array.prototype.slice.call(galleryTrack.children);
    var galleryCurrent = cloneCount;
    var galleryAutoplayTimer = null;

    var updateGallery = function (animate) {
      // Normaliza o índice caso esteja fora da faixa de slides existentes
      if (!gallerySlides[galleryCurrent]) {
        galleryCurrent = ((galleryCurrent - cloneCount) % realCount + realCount) % realCount + cloneCount;
        animate = false;
      }
      var slide = gallerySlides[galleryCurrent];
      var offset = slide.offsetLeft - (galleryCarousel.clientWidth - slide.offsetWidth) / 2;
      if (!animate) galleryTrack.classList.add('no-anim');
      galleryTrack.style.transform = 'translateX(' + (-offset) + 'px)';
      gallerySlides.forEach(function (s) { s.classList.remove('active'); });
      slide.classList.add('active');
      if (!animate) {
        void galleryTrack.offsetWidth;
        galleryTrack.classList.remove('no-anim');
      }
    };

    // Ao alcançar os clones das pontas, salta (sem animação) para o slide real
    // equivalente — o visual é idêntico, o loop é infinito
    var normalizeGallery = function () {
      if (galleryCurrent >= cloneCount + realCount || galleryCurrent < cloneCount) {
        galleryCurrent = ((galleryCurrent - cloneCount) % realCount + realCount) % realCount + cloneCount;
        updateGallery(false);
      }
    };

    var galleryStep = function (dir) {
      normalizeGallery();
      galleryCurrent += dir;
      updateGallery(true);
    };

    var stopGalleryAutoplay = function () {
      if (galleryAutoplayTimer) clearInterval(galleryAutoplayTimer);
      galleryAutoplayTimer = null;
    };

    var startGalleryAutoplay = function () {
      stopGalleryAutoplay();
      galleryAutoplayTimer = setInterval(function () { galleryStep(1); }, 3500);
    };

    // --- Setas ---
    var galleryPrevBtn = document.querySelector('.gallery-prev');
    var galleryNextBtn = document.querySelector('.gallery-next');

    if (galleryPrevBtn) {
      galleryPrevBtn.addEventListener('click', function () {
        galleryStep(-1);
        startGalleryAutoplay();
      });
    }
    if (galleryNextBtn) {
      galleryNextBtn.addEventListener('click', function () {
        galleryStep(1);
        startGalleryAutoplay();
      });
    }

    // --- Arrastar (mouse e touch) ---
    var galleryDragging = false;
    var galleryDragMoved = false;
    var dragStartX = 0;
    var dragBaseOffset = 0;

    galleryTrack.addEventListener('dragstart', function (e) { e.preventDefault(); });

    galleryTrack.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      stopGalleryAutoplay();
      normalizeGallery();
      var slide = gallerySlides[galleryCurrent];
      dragBaseOffset = slide.offsetLeft - (galleryCarousel.clientWidth - slide.offsetWidth) / 2;
      dragStartX = e.clientX;
      galleryDragging = true;
      galleryDragMoved = false;
    });

    galleryTrack.addEventListener('pointermove', function (e) {
      if (!galleryDragging) return;
      var dx = e.clientX - dragStartX;
      // Só entra em modo arrasto (e captura o ponteiro) após mover 5px —
      // capturar no pointerdown desviaria o clique e quebraria o lightbox
      if (!galleryDragMoved && Math.abs(dx) > 5) {
        galleryDragMoved = true;
        galleryTrack.classList.add('no-anim');
        galleryTrack.classList.add('dragging');
        if (galleryTrack.setPointerCapture) galleryTrack.setPointerCapture(e.pointerId);
      }
      if (galleryDragMoved) {
        galleryTrack.style.transform = 'translateX(' + (-dragBaseOffset + dx) + 'px)';
      }
    });

    var endGalleryDrag = function (e) {
      if (!galleryDragging) return;
      galleryDragging = false;
      if (!galleryDragMoved) {
        startGalleryAutoplay();
        return;
      }
      galleryTrack.classList.remove('no-anim');
      galleryTrack.classList.remove('dragging');
      var dx = e.clientX - dragStartX;
      var slide = gallerySlides[galleryCurrent];
      var moved = Math.round(-dx / (slide.offsetWidth + 2));
      if (moved === 0 && Math.abs(dx) > 50) moved = dx < 0 ? 1 : -1;
      if (moved > cloneCount) moved = cloneCount;
      if (moved < -cloneCount) moved = -cloneCount;
      galleryCurrent += moved;
      updateGallery(true);
      startGalleryAutoplay();
    };

    galleryTrack.addEventListener('pointerup', endGalleryDrag);
    galleryTrack.addEventListener('pointercancel', endGalleryDrag);

    // Suprime o clique (lightbox) quando houve arrasto
    galleryTrack.addEventListener('click', function (e) {
      if (galleryDragMoved) {
        e.stopPropagation();
        e.preventDefault();
        galleryDragMoved = false;
      }
    }, true);

    galleryCarousel.addEventListener('mouseenter', stopGalleryAutoplay);
    galleryCarousel.addEventListener('mouseleave', function () {
      if (!galleryDragging) startGalleryAutoplay();
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        stopGalleryAutoplay();
      } else {
        updateGallery(false);
        startGalleryAutoplay();
      }
    });

    window.addEventListener('resize', function () { updateGallery(false); });

    updateGallery(false);
    startGalleryAutoplay();
  }

  // --- Gallery Lightbox ---
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var galleryItems = document.querySelectorAll('.gallery-slide, .gallery-item');
  var currentIndex = 0;
  var images = [];

  galleryItems.forEach(function (item) {
    var img = item.querySelector('img');
    var idx = parseInt(item.getAttribute('data-index'), 10);
    if (img && !isNaN(idx) && !item.classList.contains('clone')) {
      images[idx] = img.src;
    }
  });

  galleryItems.forEach(function (item) {
    var idx = parseInt(item.getAttribute('data-index'), 10);
    if (isNaN(idx)) return;
    item.addEventListener('click', function () {
      currentIndex = idx;
      openLightbox(images[currentIndex]);
    });
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
