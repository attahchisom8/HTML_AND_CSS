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
const searchMenu = document.querySelector(".dropdown-search-menu");
// const main = document.querySelectorAll(".main-content > *:not(:first-child)");
// const dropDownMobileActions = searchMenu.querySelector(".dropdown-mobile-actions");
const replacableItem = document.querySelector(".replacable-item");
const mobileWorkspaces = document.querySelector(".workspaces");

nav.addEventListener("click", (e) => {
  const elem = e.target;
  const text = elem.textContent;
  const div = e.target.closest("div");
  const  li = e.target.closest("li");
  const span = e.target.closest("span");
  const iTag = e.target.closest("i");
  const button = e.target.closest("button");

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

    /*if (span.id === "dropdown-icon") {
      console.log("i was clicked");
      console.log(dropDownMobileActions);
      dropDownMobileActions.classList.add("is-search-active");
    }*/
  }

  // Handle menuitems  pressdown

  const navlistMobileAll = document.querySelectorAll(".navlist-mobile > *");

  if (li) {
    const text = li.textContent.trim();

    if (li.classList.contains("search-workspace-mobile")) {
      mobileSearchContainer.classList.add("search-active");
    navlistMobileAll.forEach((item) => item.classList.add("search-active"));
    }

    if (text === "Add workspace") {
      workspaceTab.classList.remove("is-visible");
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("create-workspace-container", "show-workspace-container");
      itemDiv.innerHTML = `
          <input
            type="text"
            placeholder="Create your workspace"
            id="create-workspace"
          />
          <button type="button" id="create-btn">+</button>
          <button type="button" id="cancel-input-btn">x</button>
      `;
      replacableItem.replaceWith(itemDiv);
    }

    if (text === "Select workspace") {
      console.log("i am selecting");
      mobileWorkspaces.classList.add("is-visible");
    }
  }

  if (button) {
    console.log(button);
    if (button.id === "close-panel-btn") {
      tutorialPanel.classList.remove("tut-active");
    }

    if (button.id === "search-cancel-btn") {
      navlistMobileAll.forEach((item) => item.classList.remove("search-active"));
    }
  }

  if (iTag) {
    console.log(iTag);
    if (iTag.id === "search-item-icon") {
      mobileSearchContainer.classList.add("search-active");
    navlistMobileAll.forEach((item) => item.classList.add("search-active"));
    }

    if (iTag.id === "search-mobile-workspace") {
      searchMenu.classList.add("is-search-visible");
    }

  }

  /*main.forEach((mainItem) => {
    if (mainItem === elem) {
      searchMenu.classList.remove("is-search-visible");
    }
  });*/
});
