/// Carousel Variables
let slider = document.querySelector(".container .list");
let items = document.querySelectorAll(".container .list .slide");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
const dots = document.querySelectorAll(".dot");

//Header Navigation Variables
const primaryHeader = document.querySelector(".primary-header");
const scrollWatcher = document.createElement("div");

// Mobile Navigation Variables
const btnOpen = document.querySelector("#btnOpen");
const btnClose = document.querySelector("#btnClose");
const media = window.matchMedia("(width < 1024px)");
const topNavMenu = document.querySelector(".topnav-menu");

//Shopping Cart Variables
let cartItem = document.querySelector("#cart-item");
let cart = document.querySelector(".cart-sidebar");
let closeCart = document.querySelector("#close-cart");

// Cart Sidebar Open
cartItem.onclick = () => {
  cart.classList.add("active");
};

// Cart Sidebar Close
closeCart.onclick = () => {
  cart.classList.remove("active");
};

// Cart working JS
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Making function
function ready() {
  // remove Items from Cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  // Quantity Changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
}

// Remove Items From Cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

//Quantity Changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

// Update Total
function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  console.log(cartContent);
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
    // If price contain some cents value
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  }
}

// Carousel

function clickMe() {
  console.log("i've been clicked");
}

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
