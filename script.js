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
  console.log(entry);
  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
  }
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
