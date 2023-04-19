"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btn = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const navlinks = document.querySelector(".nav__links");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const allSection = document.querySelectorAll(".section");
const dotContainer = document.querySelector(".dots");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
// switching btw the hidden class
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
// key event handler
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
// for scrolling
btn.addEventListener("click", function () {
  section1.scrollIntoView({ behaviour: "smooth" });
});
// page navigation
navlinks.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behaviour: "smooth" });
  }
});

// buildiong a tabbed component

// using event delegation
tabsContainer.addEventListener("click", function (e) {
  const click = e.target.closest(".operations__tab");

  if (click) {
    // deleting and activating active
    tabs.forEach((t) => t.classList.remove("operations__tab--active"));
    click.classList.add("operations__tab--active");

    //deleting and activating content area
    tabsContent.forEach((c) =>
      c.classList.remove("operations__content--active")
    );
    document
      .querySelector(`.operations__content--${click.dataset.tab}`)
      .classList.add("operations__content--active");
  }
});

// menu fade animation

const display = function (e) {
  if (e.target.classList.contains("nav__link")) {
    // console.log(this, e.currentTarget);
    const link = e.target;
    const siblings = e.target
      .closest(".nav__links")
      .querySelectorAll(".nav__link");
    // console.log(siblings);
    const logo = e.target.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      //   console.log(el);
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

nav.addEventListener("mouseover", display.bind(0.5));
nav.addEventListener("mouseout", display.bind(1));

// implementing a sticky navigation
// const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const stickynav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

let option = {
  root: null,
  rootMargin: "-15px",
  threshold: 0.1,
};
const headObserve = new IntersectionObserver(stickynav, option);
headObserve.observe(header);

// revealing the section
const revealsec = function (entries, observer) {
  const [entry] = entries;
  //   console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

let options = {
  root: null,
  threshold: 0.15,
};
const sectionObserver = new IntersectionObserver(revealsec, options);

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// lazy loading image
const imgTarget = document.querySelectorAll("img[data-src]");
const loadingImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

let optionss = {
  root: null,
  threshold: 0,
};

const imageObserver = new IntersectionObserver(loadingImg, optionss);

imgTarget.forEach((img) => imageObserver.observe(img));

// buuilding a slide component
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
let curslide = 0;
let maxslide = slides.length;
// slider.style.transform = "scale(1)";
// slider.style.overflow = "visible";
slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
// // console.log(slides);

const nextSlide = function () {
  curslide === maxslide - 1 ? (curslide = 0) : curslide++;
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curslide)}%)`)
  );
  activateDot(curslide);
};
const previousSlide = function () {
  curslide === 0 ? (curslide = maxslide - 1) : curslide--;
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curslide)}%)`)
    // activateDot(curslide);
  );
  activateDot(curslide);
};
btnLeft.addEventListener("click", previousSlide);
btnRight.addEventListener("click", nextSlide);
// -100,0,100,200

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") previousSlide();
});

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
activateDot(0);

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    console.log(slide);
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
    activateDot(slide);
    // console.log("ok");
  }
});
// console.log(slides);
