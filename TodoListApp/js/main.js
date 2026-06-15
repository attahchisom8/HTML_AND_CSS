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

const workspaceObj = store.getStoreData() || {
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
                id="update-workspace"
              />
              <button 
                type="button" 
                id="update-btn"
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

    if (span.id === "choose-mobile-workspace") {
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

    // Desktop version

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
      handleSearchInputs();
    }
  }

  if (iTag) {
    if (iTag.id === "search-item-icon") {
      mobileSearchContainer.classList.add("search-active");
    navlistMobileAll.forEach((item) => item.classList.add("search-active"));
    }

    if (iTag.id === "search-mobile-workspace") {
      searchMenu.classList.add("is-search-visible");
      handleSearchInputs();
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
const dynamicTyping = document.querySelector(".dynamic-typing");

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

    if (button.id === "dialog-cancel-btn") {
      deleteDialog.close();
    }
    
    if (button.id === "create-btn") {
      handleCreateWorkspaceInputs();
    }
    
    if (button.id === "update-btn") {
      handleUpdateWorkspaceInputs();
    }
  }

});

// Add interactivity to clock panel
const hour = clock.querySelector(".hour");
const minute = clock.querySelector(".minute");
const second = clock.querySelector(".second");

panel.clockSetUp(hour, minute, second);
if (date.textContent !== panel.formattedDate())
  date.textContent = panel.formattedDate();

// handle dynamic text rendering
const myText = "Check your deadline against the date";
let chrIdx = 0;
const lenMyText = myText.length;

const typeText = () => {
  if (chrIdx < lenMyText) {
    dynamicTyping.textContent += myText[chrIdx];
    chrIdx++;
    setTimeout(typeText, 200);
  } else {
    setTimeout(eraseText, 2000);
  }
}
typeText();

const eraseText = () => {
  if (chrIdx > 0) {
    chrIdx--;
    dynamicTyping.textContent = myText.substring(0, chrIdx);
    setTimeout(eraseText, 70);
  } else {
    setTimeout(typeText, 1000);
  }
}
eraseText();

// Handle user inputs
const navDeskSearchInput = document.querySelector("#nav-search-input");
const navMoileSearchInput = document.querySelector("#mobile-search");
// const createWorkspaceInput = document.querySelector("#create-workspace");
// const updateWprkspaceInput = document.querySelector("#update-workspace");
const taskInput = document.querySelector("#task-name");
const prioritySelector =  document.querySelector("#set-priority");
const dateInput = document.querySelector("#task-date");
const noSearchResultFound = searchMenu.querySelector(".no-search-result");
const foundSearch = searchMenu.querySelector(".found-search");

 const handleSearchInputs = () => {
const navDeskSearchValue = navDeskSearchInput.value.trim();
const navMoileSearchValue = navMoileSearchInput.value.trim();
 let activeSearch = "";
 
foundSearch.classList.remove("is-search-visible");
noSearchResultFound.classList.remove("is-search-visible");
 
 
  if (navMoileSearchValue) {
    activeSearch = navMoileSearchValue;
  } else if (navDeskSearchValue) {
    activeSearch = navDeskSearchValue;
  } else {
    return
  }
  
  if (searchRes.searchWorkspace( 
    workspaceObj, activeSearch)) {
    foundSearch.classList.add("is-search-visible");
    foundWorkspace.textContent = activeSearch;
  } else {
    noSearchResultFound.classList.add("is-search-visible");
  }

  navMoileSearchInput.value = "";
  navDeskSearchInput.value = "";
 }

 const handleCreateWorkspaceInputs = () => {
  const createWorkspaceValue = document.querySelector("#create-workspace").value;
  if (!createWorkspaceValue) {
    return;
  }
  crud.createWorkspace(workspaceObj, createWorkspaceValue);
   currWorkspace = workspaceObj[createWorkspaceValue];
   workspaceTitle.textContent = nameWorkspaceTitle(createWorkspaceValue);
   store.saveToStore(workspaceObj);
   document.querySelector("#create-workspace").value = "";
 }
 
const handleUpdateWorkspaceInputs = () => {
  const oldWorkspaceValue = document.querySelector("#update-workspace").defaultValue.trim();
  const newWorkspaceValue = document.querySelector("#update-workspace").value.trim();
  
  if (!newWorkspaceValue) {
    return;
  }
  
  if (oldWorkspaceValue === newWorkspaceValue) {
      document.querySelector("#update-workspace").value = "";
      return;
  }
  
  const workspaceContainer = getReplacableContainer();
  const divMarker = document.createElement("div");

  divMarker.classList.add("update-marker", "fa-solid", "fa-circle-check");
   

  const res = crud.updateWorkspace(workspaceObj, oldWorkspaceValue, newWorkspaceValue);
  if (res !== "undefined") {
    workspaceContainer.replaceWith(divMarker);
   
    setTimeout(() => {
      document.querySelector(".update-marker").replaceWith(workspaceContainer);
      getReplacableContainer().replaceWith(replacableItem);
    }, 7000);
  }

 }
 
const handleTaskInputs = () => {
  const taskDetailsValue = taskInput.value;
  const priorityValue = prioritySelector.value;
  const dateValue = dateInput.value;
  const now = new Date();

  if (!taskDetailsValue) {
    alert("Please enter your task details");
    return;
  }

  if (dateValue && new Date(dateValue) < new Date(now))
  {
    alert("Task date cannot be in the past");
    return;
  }

  const task = {
    id: crypto.randomUUID(),
    taskDetails: taskDetailsValue,
    priority: priorityValue,
    dueDate: dateValue ? new Date(dateValue).toISOString(now) :
    new Date().toISOString(),
    status: new Date(dateValue) < new Date(now) ? "undone" : "pending",
  };
  crud.addTask(workspaceObj, currWorkspace, task);
  store.saveToStore(workspaceObj);
}