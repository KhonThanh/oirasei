// js phần component
document.addEventListener("DOMContentLoaded", () => {
  const includeElements = document.querySelectorAll("[data-include]");

  includeElements.forEach(async el => {
    const file = el.getAttribute("data-include");
    if (!file) return;

    try {
      const response = await fetch(`${file}?v=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`Không tìm thấy file: ${file}`);

      const text = await response.text();
      el.innerHTML = text;

      if (typeof initResponsive === "function") {
        initResponsive(el);
      }

    } catch (err) {
      el.innerHTML = `
        <div style="color: red; padding: 1rem; background: #fff0f0; border: 1px solid red;">
          ⚠ Không tải được component: <strong>${file}</strong>
        </div>
      `;
      console.error("Lỗi khi fetch:", file, err);
    }
  });
});

// js thêm width và height vào bất kì thẻ img
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }
    if (img.complete) {
      setDimensions(img);
    } else {
      img.addEventListener("load", function () {
        setDimensions(img);
      });
    }
  });

  function setDimensions(img) {
    if (!img.hasAttribute("width")) {
      img.setAttribute("width", img.naturalWidth);
    }
    if (!img.hasAttribute("height")) {
      img.setAttribute("height", img.naturalHeight);
    }
  }
});

// js banner homepage
$(document).ready(function () {
  const $banner = $(".slidebox");

  if ($banner.length) {
    const $images = $banner.children("div");
    const currentCount = $images.length;

    if (currentCount < 2) {
      const clonesNeeded = 3 - currentCount;

      for (let i = 0; i < clonesNeeded; i++) {
        const $clone = $images.eq(0).clone();
        $banner.append($clone);
      }
    }
    $banner.slick({
      infinite: true,
      speed: 2000,
      dots: false,
      autoplay: true,
      arrows: false,
      touchMove: false,
      fade: true,
    });
  } else {
    console.log("can't find .slidebox.");
  }
});

// js banner adv
$(document).ready(function () {
  const $banner = $(".slide-adv");

  if ($banner.length) {
    const $images = $banner.children("div");
    const currentCount = $images.length;

    if (currentCount < 2) {
      const clonesNeeded = 3 - currentCount;

      for (let i = 0; i < clonesNeeded; i++) {
        const $clone = $images.eq(0).clone();
        $banner.append($clone);
      }
    }
    $banner.slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      speed: 2000,
      dots: false,
      autoplay: true,
      arrows: false,
      touchMove: false,
      responsive: [
        {
          breakpoint: 800, // từ 800px trở xuống
          settings: {
            slidesToShow: 2.5,
            slidesToScroll: 2.5,
          }
        }
      ]
    });
  } else {
    console.log("can't find .slide-adv");
  }
});


//js icon bars

$(document).ready(function () {
  const $iconBar = $('.icon-bar');
  const $nth1 = $iconBar.find('.nth-1');
  const $nth2 = $iconBar.find('.nth-2');
  const $nth3 = $iconBar.find('.nth-3');
  const $closeX = $iconBar.find('.disp_n');

  let isActive = false;

  $iconBar.on('click', function () {
    if (!isActive) {
      $iconBar.addClass('animate');

      setTimeout(() => {
        $nth1.hide();
        $nth2.hide();
        $nth3.hide();

        $closeX.css({
          display: 'block',
          opacity: 0
        });

        setTimeout(() => {
          $closeX.css('opacity', 1);
        }, 10);

        isActive = true;
      }, 600);
    } else {
      $iconBar.removeClass('animate');

      $closeX.css({
        opacity: 0
      });

      setTimeout(() => {
        $closeX.css('display', 'none');

        $nth1.show();
        $nth2.show();
        $nth3.show();

        isActive = false;
      }, 300);
    }
  });
});

// js fade animation
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section, footer");
  if (!sections.length) return;

  sections.forEach(sec => sec.classList.add("hidden-section"));

  let revealIndex = 0;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        el.style.transitionDelay = `${revealIndex * 50}ms`;
        revealIndex++;

        el.classList.add("show-up");

        // Chỉ unobserve nếu toàn bộ phần tử đã nằm trong viewport
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight * 1.1) {
          observer.unobserve(el);
        }
      }
    });
  }, {
    threshold: 0.15, // thấp hơn để dễ trigger phần đầu dài
    rootMargin: "0px 0px -10% 0px" // giảm margin đáy
  });

  sections.forEach(sec => observer.observe(sec));

  // Reveal phần đầu nếu đã nằm trên viewport
  const firstVisible = Array.from(sections).find(sec => {
    const rect = sec.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  });

  if (firstVisible) {
    firstVisible.classList.add("show-up");
    // Đừng unobserve ở đây, để IntersectionObserver tiếp tục xử lý
  }
});

//js menu
function toggleMenu() {
  const menu = document.getElementById("mainMenu");

  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
  } else {
    menu.classList.add("active");
  }
}

// js scroll scene
window.addEventListener('scroll', function () {
  const header = document.querySelector('.header-menu');
  if (window.scrollY > 200) {
    header.style.display = 'flex'; 
  } else {
    header.style.display = 'none'; 
  }
});

// js scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}