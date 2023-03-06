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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
// creating allSections array variable and storing all sections dynamically inside it using queryselect all and es6 spread syntax
const allSections = [...document.querySelectorAll("section")];

// creating another global var to get nav list to append it later
const navMenu = document.getElementById("navbar__list");
let changed = false;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function createNavItems() {
  // using for of loop to iterate through every section and add it to the nav_bar

  for (const sec of allSections) {
    //using data-nav attr to get the name for the section to be visible later in the nav bar
    let navName = sec.getAttribute("data-nav");
    // using attribut ID to link it later so we can navigate directly from the nav bar
    let navLink = sec.getAttribute("id");

    // creating a new item on the nav bar dynmaically
    let newItem = document.createElement("li");
    // accessing inner html for the new added item in the nav bar and adding its name , link to the section and its style from css also added new const callID that generate new ID to add onclick on the new generated ID later to implement change color and smooth scroll in JS
    newItem.innerHTML =
      `<a  class='menu__link' href='#${navLink}' id="button` +
      sec.id +
      `"> ${navName}</a>`;

    const callId = newItem.childNodes[0].id;
    newItem.onclick = () => changeColorandSmoothScroll(callId);

    // appending new item in the nav bar
    navMenu.appendChild(newItem);
  }
}
// New function that change Color when pressed on the nav item button and remain active with color green untill another button is pressed it toggles of on old button and on the new button it changes the color to indicate active state, also added scrollBy() to make sure of the scroll behaviour to be smooth using JS
function changeColorandSmoothScroll(id) {
  const listItems = document.getElementsByClassName("menu__link");

  scrollBy({ behaviour: "smooth" });

  for (let i = 0; i < listItems.length; i++) {
    listItems[i].style.background = "white";
  }
  // adding functionality to toggle active section button on the navbar to indicate user
  if (id == "your-active-class") {
    const sectionId = document.getElementsByClassName(id)[0].id;

    document.getElementById("button" + sectionId).style.background = "red";
  } else {
    document.getElementById(id).style.background = "green";
    console.log("it didnt work");
    console.log(id);
  }
}

/* End Helper Functions
 * Begin Main Functions
 */
// will activate the style for your-active-class on the viewed section based on range of the section space between the top of the section and the page  if its in range will add the section your active class else it will remove it

function activateEffectOnCurrentSection() {
  for (let sec of allSections) {
    if (
      sec.getBoundingClientRect().top >= -300 &&
      sec.getBoundingClientRect().top <= 150
    ) {
      sec.classList.add("your-active-class");
      //changeColorandSmoothScroll("your-active-class");
    } else {
      sec.classList.remove("your-active-class");
    }
  }
}

// build the nav
createNavItems();

// Set sections as active while scrolling if it matches the view port created

// added preventDefault on a new add event listener as requested
document.addEventListener("click", Event.preventDefault);
document.addEventListener("scroll", activateEffectOnCurrentSection);
