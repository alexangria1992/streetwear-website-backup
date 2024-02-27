let slider = document.querySelector(".container .list");
let items = document.querySelectorAll(".container .list .slide");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
const dots = document.querySelectorAll(".dot");
const primaryHeader = document.querySelector(".primary-header");
const scrollWatcher = document.createElement("div");

const btnOpen = document.querySelector("#btnOpen");
const btnClose = document.querySelector("#btnClose");
const media = window.matchMedia("(width < 1024px)");
const topNavMenu = document.querySelector(".topnav-menu");

// Carousel

let active = 0;
let lengthItems = items.length - 1;
console.log(items);

next.onclick = function () {
  active = active + 1 <= lengthItems ? active + 1 : 0;

  reloadSlider();
};

prev.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : lengthItems;
  reloadSlider();
};

let refreshInterval = setInterval(() => {
  next.click();
}, 3000);

function reloadSlider() {
  slider.style.left = -items[active].offsetLeft + "px";
  let last_active_dot = document.querySelector(
    ".container .dots-container span.active"
  );
  //   dots.style.background = "#b5b5b5";
  last_active_dot.classList.remove("active");
  dots[active].classList.add("active");
  // dots[active].style.background = "#fff";

  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 3000);
}
dots.forEach((span, key) => {
  span.addEventListener("click", () => {
    active = key;
    reloadSlider();
  });
});

// Mobile Hamburger Menu Functionality
function setupTopNav(e) {
  if (e.matches) {
    // is mobile
    console.log("is mobile");
    topNavMenu.setAttribute("inert", "");
    topNavMenu.style.transition = "none";
  } else {
    console.log("is desktop");
    topNavMenu.removeAttribute("inert");
  }
}

function openMobileMenu() {
  // console.log("Click");
  btnOpen.setAttribute("aria-expanded", "true");
  topNavMenu.removeAttribute("inert");
  topNavMenu.removeAttribute("style");
}

function closeMobileMenu() {
  btnOpen.setAttribute("aria-expanded", "false");
  topNavMenu.setAttribute("inert", "");

  setTimeout(() => {
    topNavMenu.style.transition = "none";
  }, 500);
}

setupTopNav(media);

btnOpen.addEventListener("click", openMobileMenu);
btnClose.addEventListener("click", closeMobileMenu);

media.addEventListener("change", function (e) {
  setupTopNav(e);
});

// Header Animation
scrollWatcher.setAttribute("data-scroll-watcher", "");

primaryHeader.before(scrollWatcher);

const navObserver = new IntersectionObserver((entries) => {
  // console.log(entries);
  primaryHeader.classList.toggle("sticking", !entries[0].isIntersecting);
});

navObserver.observe(scrollWatcher);

// const size = slideImages[0].clientWidth;
