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
    });
  } else {
    console.log("can't find .slide-adv");
  }
});
