document.addEventListener('DOMContentLoaded', function () {

  // ========== Dark Mode Toggle ==========
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  if (localStorage.getItem('kopikita-dark-mode') === 'true') {
    body.classList.add('dark-mode');
    if (darkModeToggle) {
      darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function () {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      localStorage.setItem('kopikita-dark-mode', isDark);
      darkModeToggle.innerHTML = isDark
        ? '<i class="bi bi-sun-fill"></i>'
        : '<i class="bi bi-moon-fill"></i>';
    });
  }

  // ========== Active Nav Link ==========
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ========== Scroll to Top Button ==========
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== Navbar Shrink on Scroll ==========
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
      } else {
        navbar.style.padding = '0.8rem 0';
      }
    });
  }

  // ========== Fade-in on Scroll (IntersectionObserver) ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // ========== Slide-in Animations (left/right/scale) ==========
  const slideObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('slide-left')) {
          entry.target.classList.add('animate-slideInLeft');
        } else if (entry.target.classList.contains('slide-right')) {
          entry.target.classList.add('animate-slideInRight');
        } else if (entry.target.classList.contains('scale-in')) {
          entry.target.classList.add('animate-scaleIn');
        }
        slideObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.slide-left, .slide-right, .scale-in').forEach(el => {
    slideObserver.observe(el);
  });

  // ========== Animated Counter ==========
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const hasPlus = text.includes('+');
        const hasDot = text.includes('.');
        const target = parseFloat(text.replace(/[^0-9.]/g, ''));

        if (isNaN(target)) return;

        const duration = 2000;
        const startTime = performance.now();

        function animate(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = hasDot
            ? (eased * target).toFixed(1)
            : Math.floor(eased * target);

          el.textContent = current + (hasPlus ? '+' : '') + (text.includes('⭐') ? ' ⭐' : '');

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }

        // Start from 0
        el.textContent = hasDot ? '0.0' : '0';
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    counterObserver.observe(el);
  });

  // ========== Typewriter Effect ==========
  const typewriterEl = document.querySelector('.typewriter');
  if (typewriterEl) {
    const typeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            typewriterEl.classList.add('typing');
          }, 500);
          typeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    typeObserver.observe(typewriterEl);
  }

  // ========== Card 3D Tilt Effect ==========
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // ========== Gallery Lightbox ==========
  const lightboxModal = document.getElementById('lightboxModal');
  if (lightboxModal) {
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    document.querySelectorAll('.gallery-lightbox').forEach(item => {
      item.addEventListener('click', function () {
        const img = this.querySelector('img');
        const caption = this.querySelector('.gallery-overlay p');

        if (lightboxImg && img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
        }
        if (lightboxCaption && caption) {
          lightboxCaption.textContent = caption.textContent;
        }

        const modal = new bootstrap.Modal(lightboxModal);
        modal.show();
      });
    });
  }

  // ========== Floating Particles (Hero) ==========
  const particlesContainer = document.querySelector('.particles-container');
  if (particlesContainer) {
    const emojis = ['☕', '✦', '●', '◆', '✧'];
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('span');
      particle.classList.add('particle');
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = (8 + Math.random() * 12) + 's';
      particle.style.animationDelay = (Math.random() * 8) + 's';
      particle.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
      particlesContainer.appendChild(particle);
    }
  }

});
