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
const replacableItem = document.querySelector(".replacable-item");
const createWorkspaceContainer = document.querySelector(".create-workspace-container");
const mobileWorkspaces = document.querySelector(".workspaces");
const deleteDialog = document.querySelector(".delete-modal-box dialog");
const foundWorkspace = document.querySelector("#found-workspace");
let currTabMode = null;

const getReplacableContainer = () => {
  return document.querySelector(".replacable-item") ||
    document.querySelector(".create-workspace-container");
}

const handleWorkspaceTabAction = (workspacesTab, tabState, clickedElem) => {
      if (!workspacesTab || !tabState || !currTabMode)
        return;

      let workspaceName = clickedElem.dataset.workspace || clickedElem.textContent.trim();
      if (workspacesTab.classList.contains("dropdown-mobile-actions") || workspacesTab.classList.contains("dropdown-desktop-actions")) {
          workspaceName = foundWorkspace.textContent.trimEnd();
        }
  
      if (tabState === "selectTab") {
        const workspace = clickedElem;

        if (workspacesTab.contains(workspace) && !workspace.id.endsWith("-btn")) {
          workspaceTitle.textContent = nameWorkspaceTitle(workspaceName);
          currWorkspace = workspaceObj[workspaceName];
          tabState = null;
        }
      }

      if (tabState === "updateTab") {
        const workspace = clickedElem;
        if (workspacesTab.contains(workspace) && workspace.id !== "workspaces-cancel-btn") {
          workspacesTab.classList.remove("is-visible");
          workspaceTab.classList.remove("is-visible");

          const replacableTarget = getReplacableContainer();
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
          replacableTarget.replaceWith(itemDiv);
          tabState = null;
        }
      }
      
      if (tabState === "deleteTab") {
        const workspace = clickedElem;
        if (workspacesTab.contains(workspace) && workspace.id !== "workspaces-cancel-btn") {
          deleteDialog.showModal();
          tabState = null;
        }
      }
    }

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
  }

  // Handle menuitems  pressdown

  const navlistMobileAll = document.querySelectorAll(".navlist-mobile > *");

  if (li) {
    const text = li.textContent.trim();
    const parentUl = li.parentElement;

    if (li.classList.contains("search-workspace-mobile")) {
      mobileSearchContainer.classList.add("search-active");
    navlistMobileAll.forEach((item) => item.classList.add("search-active"));
    }

    if (text === "Add workspace") {
      workspaceTab.classList.remove("is-visible");
      mobileWorkspaces.classList.remove("is-visible");
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

    handleWorkspaceTabAction(mobileWorkspaces, currTabMode, li);

    // Desktop ersion

    if (li.classList.contains("nav-item-btn")) {
      li.classList.add("item-desk-active");
    }

    if (li.classList.contains("tut-desktop")) {
      const isToggled = tutorialPanel.classList.toggle("tut-active");
      li.classList.toggle("item-desk-active", isToggled);
    }

    if (li.classList.contains("dropdown-trigger")) {
      const arrow = li.querySelector(".arrow");
      const dropdownWrapper = li.nextElementSibling;

      const isTurned = arrow.classList.toggle("item-desk-active");
      li.classList.toggle("item-desk-active", isTurned);
      dropdownWrapper.classList.toggle("item-desk-active", isTurned);
    }
    
    if (parentUl.classList.contains("workspaces-desktop")) {
      if (parentUl.classList.contains("select-tab"))
        currTabMode = "selectTab";
      else if (parentUl.classList.contains("update-tab"))
        currTabMode = "updateTab";
      else if (parentUl.classList.contains("delete-tab"))
        currTabMode = "deleteTab";
      else currTabMode = null;

      handleWorkspaceTabAction(parentUl, currTabMode, li);
    }

    if (li.classList.contains("add-workspace-desktop")) {
      const itemDiv = document.createElement("div");
      const replacableTarget = getReplacableContainer();

        itemDiv.classList.add("create-workspace-container", "show-workspace-container");
        itemDiv.innerHTML = `
            <input
              type="text"
              placeholder="Create your workspace"
              id="create-workspace"
            />
            <button 
              type="button" 
              id="create-btn"
              >+</button>
            <button type="button" id="cancel-input-btn">x</button>
        `;
        replacableTarget.replaceWith(itemDiv);
    }
  }

  if (button) {
    if (button.id === "search-cancel-btn") {
      navlistMobileAll.forEach((item) => item.classList.remove("search-active"));
    }

    // Desltop version
    if (button.id === "desk-search-btn") {
      searchMenu.classList.add("is-search-visible");
    }
  }

  if (iTag) {
    if (iTag.id === "search-item-icon") {
      mobileSearchContainer.classList.add("search-active");
    navlistMobileAll.forEach((item) => item.classList.add("search-active"));
    }

    if (iTag.id === "search-mobile-workspace") {
      searchMenu.classList.add("is-search-visible");
    }

  }

});

//  Attaching event listener to main

const main = document.querySelector(".main-content");
const dropDownMobileActions = searchMenu.querySelector(".dropdown-mobile-actions");
const dropDownDesktopActions = searchMenu.querySelector(".dropdown-desktop-actions");
const timeDate = document.querySelector(".time-date");
const clock = timeDate.querySelector(".clock");
const date = timeDate.querySelector(".date");

main.addEventListener("click", (e) => {
  const elem = e.target;
  const text = elem.textContent;
  const div = e.target.closest("div");
  const span = e.target.closest("span");
  const iTag = e.target.closest("i");
  const button = e.target.closest("button");

  if (!searchMenu.contains(elem)) {
    searchMenu.classList.remove("is-search-visible");
    dropDownMobileActions.classList.remove("is-search-visible");
  }

  if (span) {
    const parentSpan = span.parentElement;
    if (span.id === "dropdown-icon") {
      dropDownMobileActions.classList.add("is-search-visible");
    }

    if (span.id === "mobile-action-cancel-btn") {
      dropDownMobileActions.classList.remove("is-search-visible");
    }

    if (parentSpan.classList.contains("dropdown-mobile-actions")) {
      if (span.id === "mobile-action-select")
        currTabMode = "selectTab";
      else if (span.id === "mobile-action-update")
        currTabMode = "updateTab";
      else if (span.id === "mobile-action-delete")
        currTabMode = "deleteTab";
      else
        currTabMode = null;

      handleWorkspaceTabAction(dropDownMobileActions, currTabMode, span);
    }

    //DESKTOP MODE
    if (parentSpan.classList.contains("dropdown-desktop-actions")) {
      if (span.id === "desktop-action-select")
        currTabMode = "selectTab";
      else if (span.id === "desktop-action-update")
        currTabMode = "updateTab";
      else if (span.id === "desktop-action-delete")
        currTabMode = "deleteTab";
      else
        currTabMode = null;

      handleWorkspaceTabAction(dropDownDesktopActions, currTabMode, span);
    }
  }

  if (button) {
    if (button.id === "cancel-input-btn") {
      const container = getReplacableContainer();
      container.replaceWith(replacableItem);
      document.querySelector(".add-workspace-desktop").classList.remove("item-desk-active");
    }

    if (button.id === "close-panel-btn") {
      tutorialPanel.classList.remove("tut-active");
    }
  }

});

// Add interactivity to clock panel
const hour = clock.querySelector(".hour");
const minute = clock.querySelector(".minute");
const second = clock.querySelector(".second");

panel.clockSetUp(hour, minute, second);
if (date.textContent !== panel.formattedDate());
date.textContent = panel.formattedDate();