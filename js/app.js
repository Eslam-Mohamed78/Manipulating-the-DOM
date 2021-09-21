/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 */

const navMenu = document.querySelector(".navbar__menu");
const navUl = document.getElementById("navbar__list");
const secElements = document.querySelectorAll("section");
const fragment = document.createDocumentFragment();
const headerElement = document.querySelector(".main__hero");
const mainElement = document.querySelector("main");

/**
 * End Global Variables
 */

// building navbar links using DOM.

for (let i = 0; i < secElements.length; i++) {
  let liElement = document.createElement("li");
  let linkElement = document.createElement("a");
  linkElement.setAttribute("id", `#section${i + 1}`);
  linkElement.className = "menu__link";
  linkElement.innerHTML = `${secElements[i].getAttribute("data-nav")}`;

  liElement.appendChild(linkElement);
  fragment.appendChild(liElement);
}
navUl.appendChild(fragment);

const navLinks = navUl.querySelectorAll("li a");

// Scroll to anchor ID using scrollTO event

const sectionClick = () => {
  navUl.addEventListener("click", scrollToAnchor);
};

let scrollToAnchor = (e) => {
  let secId = e.target.getAttribute("id").substring(1);

  let scrollSection = document.getElementById(secId);

  scrollSection.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
};
sectionClick();

// Adding class 'your-active-class' to section when near top of viewport

const activeSection = () => {
  secElements.forEach((sec) => {
    const rect = sec.getBoundingClientRect();

    if (rect.top < 430 || rect.top < -200) {
      navLinks.forEach((a) => {
        a.classList.remove("active");
        a.style.cssText = "color: white;";
      });

      secElements.forEach((s) => {
        s.classList.remove("your-active-class");
      });

      sec.classList.add("your-active-class");

      // Adding class 'active' to link when section near to the top.

      for (let i = 0; i < navLinks.length; i++) {
        if (navLinks[i].textContent === sec.getAttribute("data-nav")) {
          navLinks[i].classList.add("active");
          navLinks[i].style.cssText = "background-color: #333;";
        }
      }
    } else {
      sec.classList.remove("your-active-link");
    }
  });
};

// building a scroll to top button

const divButton = document.createElement("div");
const scrollTopButton = document.createElement("button");
scrollTopButton.textContent = "Scroll Top";
divButton.appendChild(scrollTopButton);
scrollTopButton.style.cssText =
  "background-color: #19d3da; color: white; border: none; width: 120px; height: 45px; font-size: 1.2em; border-radius: 10px;";
divButton.style.textAlign = "right";
mainElement.appendChild(divButton);

// hiding fixed navigation bar while not scrolling

let timeScrolling = 0;

document.addEventListener("scroll", () => {
  navMenu.style.cssText = "display: block";
  if (timeScrolling !== 0) {
    clearTimeout(timeScrolling);
  }
  timeScrolling = setTimeout(() => {
    navMenu.style.display = "none";
  }, 2000);
});

/**
 * Begin Events
 *
 */

document.addEventListener("scroll", activeSection);

divButton.addEventListener("click", () => {
  headerElement.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
});

/**
 * End Events
 */
