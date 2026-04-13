// ============================================
// KopiKita.id — Main JavaScript
// Shared functionality: Dark Mode, Navbar, Scroll to Top
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Dark Mode Toggle ----------
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // Load saved preference
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

  // ---------- Active Navbar Link ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ---------- Scroll to Top Button ----------
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

  // ---------- Navbar scroll effect ----------
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

  // ---------- Fade-in animation on scroll ----------
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
});
