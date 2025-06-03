document.addEventListener('DOMContentLoaded', function() {
  // Navigation dynamic loader
  const navLinks = document.querySelectorAll('.nav-link');
  const mainContent = document.getElementById('main-content');
  const carousel = document.getElementById('carousel-container');

  function loadPage(page, showCarousel) {
    fetch(page)
      .then(res => res.text())
      .then(html => {
        mainContent.innerHTML = html;
        if (carousel) {
          carousel.style.display = showCarousel ? '' : 'none';
        }
        // Accessibility: focus main content
        mainContent.setAttribute('tabindex', '-1');
        mainContent.focus();
      });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      const page = this.getAttribute('data-page');
      loadPage(page, page === 'home.html');
    });
  });

  // Load home by default
  loadPage('home.html', true);
});