import * as sortUtility from "./features/sortUtility/index.js";
import * as panel from "./features/panel.js";
import * as crud from "./features/crud.js";
import * as store from "./features/dataStore.js";
import * as searchRes from "./features/search.js";


/* ===================================
HANDLE DATA PARSING AND STORAGE
=================================== */
const workspaceTitle = document.querySelector("#curr-workspace");

const nameWorkspaceTitle = (workspaceName) => {
  return `${workspaceName}  workspace`;
}

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

workspaceTitle.textContent = nameWorkspaceTitle("health");
let currWorkspace = workspaceObj["health"];

/* ===================================
HANDLE TASKBAR OPERATIONS
=================================== */

const nav = document.querySelector("nav");
const toggleMenu = document.querySelector(".toggle-menu");
const sortTab = document.querySelector(".sort-tab");
const workspaceTab = document.querySelector(".workspace-tab");
const tutorialPanel = document.querySelector(".tutorial-panel");
const mobileSearchContainer = document.querySelector(".mobile-search-container");
const searchMenu = document.querySelector(".dropdown-search-menu");
// const main = document.querySelectorAll(".main-content > *:not(:first-child)");
// const dropDownMobileActions = searchMenu.querySelector(".dropdown-mobile-actions");
const replacableItem = document.querySelector(".replacable-item");
const mobileWorkspaces = document.querySelector(".workspaces");
///const chooseWorkspaceobile = document.querySelector(".choose-workspace");
let currTabMode = null;

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
      const isWsp = workspaceTab.classList.toggle("is-visible");
      if (!isWsp)
        mobileWorkspaces.classList.remove("is-visible");
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
      mobileWorkspaces.classList.add("is-visible");
      currTabMode = "selectTab";
    }

    if (text === "Update workspace") {
      mobileWorkspaces.classList.add("is-visible");
      currTabMode = "updateTab";
    }

    if (text === "Delete workspace") {
      mobileWorkspaces.classList.add("is-visible");
      currTabMode = "deleteTab";
    }

    if (li.id === "sortTab-cancel-btn") {
      sortTab.classList.remove("is-visible");
      toggleMenu.classList.remove("is-active");
    }

    if (li.id === "workspaceTab-cancel-btn") {
      workspaceTab.classList.remove("is-visible");
      mobileWorkspaces.classList.remove("is-visible");
    }

    if (li.id === "workspaces-cancel-btn") {
      mobileWorkspaces.classList.remove("is-visible");
    }

    if (currTabMode === "selectTab") {
      const workspace = li;
      if (mobileWorkspaces.contains(workspace) && workspace.id !== "workspaces-cancel-btn") {
        const workspaceName = workspace.textContent.trim();
        workspaceTitle.textContent = nameWorkspaceTitle(workspaceName);
        currWorkspace = workspaceObj[workspaceName];
        currTabMode = null;
      }
    }

    if (currTabMode === "updateTab") {
      const workspace = li;
      if (mobileWorkspaces.contains(workspace) && workspace.id !== "workspaces-cancel-btn") {
        mobileWorkspaces.classList.remove("is-visible");
        workspaceTab.classList.remove("is-visible");

        const workspaceName = workspace.textContent;
        const itemDiv = document.createElement("div");
      itemDiv.classList.add("create-workspace-container", "show-workspace-container");
      itemDiv.innerHTML = `
          <input
            type="text"
            value=${workspaceName}
            placeholder="Update your workspace"
            id="create-workspace"
          />
          <button 
            type="button" 
            id="create-btn"
            class="fa-solid fa-sync"
            ></button>
          <button type="button" id="cancel-input-btn">x</button>
      `;
      replacableItem.replaceWith(itemDiv);
      currTabMode = null;
      }
    }
    
    if (currTabMode === "deleteTabTab") {
      const workspace = li;
      if (mobileWorkspaces.contains(workspace) && workspace.id !== "workspaces-cancel-btn") {
        const workspaceName = workspace.textContent.trim();
      }
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
