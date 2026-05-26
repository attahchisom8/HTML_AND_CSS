import * as sortUtility from "./features/sortUtility/index.js";
import * as panel from "./features/panel.js";
import * as crud from "./features/crud.js";
import * as store from "./features/dataStore.js";
import * as searchRes from "./features/search.js";


/* ===================================
HANDLE DATA PARSING AND STORAGE
=================================== */

const workspaceObj = JSON.parse(localStorage.getItem("workspaceObj")) || {
  "health": [],
  "finance": [],
  "work": [],
  "learning": [],
  "home": [],
  "personal": [],
  "projects": [],
  "travel": [],
  "fitness": [],
  "social": [],
  "shopping": [],
  "hobbies": [],
}


/* ===================================
HANDLE TASKBAR OPERATIONS
=================================== */

const nav = document.querySelector("nav");
const sortTab = document.querySelector(".sort-tab");
const workspaceTab = document.querySelector(".workspace-tab");
const tutorialPanel = document.querySelector(".tutorial-panel");
const mobileSearchContainer = document.querySelector(".mobile-search-container");
// const navlistMobile = document.querySelector(".navlist-mobile");

nav.addEventListener("click", (e) => {
  const elem = e.target;
  const text = elem.textContent;
  const div = e.target.closest("div");
  const  li = e.target.closest("li");
  const span = e.target.closest("span");
  const iTag = e.target.closest("i");

  // Handle clickable nav items

  if (div?.classList.contains("toggle-menu")){
    const istoggled = div.classList.toggle("is-active");
    sortTab.classList.toggle("is-visible", istoggled);
  }

  if (span) {
    const text = span.textContent.trim();
    if (text === "Tutorial") {
      tutorialPanel.classList.toggle("tut-active");
    }

    if (text === "sel/add/del workspace") {
      workspaceTab.classList.toggle("is-visible");
    }
  }

  // Handle menuitems  pressdown

  const navlistMobileAll = document.querySelectorAll(".navlist-mobile > *");
  if (li) {
    if (li.classList.contains("search-workspace-mobile")) {
      mobileSearchContainer.classList.add("search-active");
    navlistMobileAll.forEach((item) => item.classList.add("search-active"));
    }

    if (li.textContent.trim() === "Expiration Date")
      console.log("expired task");
  }
});
