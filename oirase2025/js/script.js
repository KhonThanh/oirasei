function preventClick(e) {
  e.preventDefault();
  e.stopPropagation();
}

function disableNavLinkClick() {
  const dropdownToggles = document.querySelectorAll('.nav-link.dropdown-toggle');

  dropdownToggles.forEach(link => {
    if (window.innerWidth > 991) {
      link.removeAttribute('data-bs-toggle');
      link.addEventListener('click', preventClick);
    } else {
      link.setAttribute('data-bs-toggle', 'dropdown');
      link.removeEventListener('click', preventClick);
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  let overlay = null;

  function loadCommonParts(callback) {
    $.ajaxSetup({ cache: false });
    const ajaxElements = document.querySelectorAll('.ajax');
    let total = ajaxElements.length;
    let loaded = 0;

    if (total === 0) {
      callback();
      return;
    }

    ajaxElements.forEach(el => {
      const src = el.getAttribute('src');
      if (src) {
        $(el).load(src, function (response, status, xhr) {
          if (status === "error") {
            console.error("Error loading:", src, xhr.status, xhr.statusText);
          }
          loaded++;
          if (loaded === total) {
            callback();
          }
        });
      } else {
        loaded++;
        if (loaded === total) {
          callback();
        }
      }
    });
  }

  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');

    const navbarNav = document.getElementById('navbarNav');
    const toggleIcon = document.getElementById('toggleIcon');


    function createOverlay() {
      overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 999;
        display: none;
      `;
      navbar.insertAdjacentElement('afterend', overlay);

      overlay.addEventListener('click', function (e) {
        if (e.target.classList.contains('overlay')) {
          hideOverlay();
        }
      });
    }

    function showOverlay() {
      if (!overlay) createOverlay();
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }

    function hideOverlay() {
      if (!overlay) return;

      overlay.style.display = 'none';
      document.body.style.overflow = '';

      const collapses = ['#navbarNav', '#navbarLanguage'];

      collapses.forEach(selector => {
        const el = document.querySelector(selector);
        if (el?.classList.contains('show')) {
          const instance = bootstrap.Collapse.getInstance(el);
          if (instance) {
            instance.hide();
          } else {
            el.classList.remove('show');
          }
        }
      });

      const toggleIcon = document.getElementById('toggleIcon');
      if (toggleIcon) {
        toggleIcon.classList.remove('icon-close');
        toggleIcon.classList.add('icon-menu');
      }

      const navbarToggler = document.querySelector('.navbar-toggler');
      if (navbarToggler) {
        navbarToggler.setAttribute('aria-expanded', 'false');
      }

      const langToggle = document.querySelector('.choose-lang');
      if (langToggle) {
        langToggle.setAttribute('aria-expanded', 'false');
      }
    }

    navbarToggler?.addEventListener('click', function () {
      const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        showOverlay();
      } else {
        hideOverlay();
      }
    });

    document.addEventListener('touchmove', function (e) {
      if (overlay && overlay.style.display === 'block') {
        e.preventDefault();
      }
    }, { passive: false });

    const langToggle = document.querySelector('.choose-lang');
    const langToggleIcon = langToggle?.querySelector('.icon-arrow-down');
    const langMenu = document.getElementById('navbarLanguage');

    navbarNav.addEventListener('show.bs.collapse', () => {
      if (langMenu?.classList.contains('show')) {
        langMenu.classList.remove('show');
        langToggle?.setAttribute('aria-expanded', 'false');
        langToggleIcon.classList.remove('icon-arrow-up-green');
        langToggleIcon.classList.add('icon-arrow-down');
      }
      toggleIcon.classList.remove('icon-menu');
      toggleIcon.classList.add('icon-close');
    });

    navbarNav.addEventListener('hide.bs.collapse', () => {
      toggleIcon.classList.remove('icon-close');
      toggleIcon.classList.add('icon-menu');
    });

    langMenu.addEventListener('show.bs.collapse', () => {

      if (navbarNav?.classList.contains('show')) {
        navbarNav.classList.remove('show');
        hideOverlay()
      }

      langToggleIcon.classList.remove('icon-arrow-down');
      langToggleIcon.classList.add('icon-arrow-up-green');
    });

    langMenu.addEventListener('hide.bs.collapse', () => {
      langToggleIcon.classList.remove('icon-arrow-up-green');
      langToggleIcon.classList.add('icon-arrow-down');
    });

    disableNavLinkClick();

    window.addEventListener('resize', function () {
      if (overlay && overlay.style.display === 'block') {
        hideOverlay();
      }
      disableNavLinkClick();
    });
  }

  window.onscroll = function () {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  };

  scrollTopBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  loadCommonParts(initNavbar);
});
