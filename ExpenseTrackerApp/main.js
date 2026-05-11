import * as sortUtility from "./sortUtility/sortDate.js";
import { sortName } from "./sortUtility/sortName.js";

const expenseInput = document.getElementById("expense-name")
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("expense-date");
const expenseTable = document.getElementById("expense-table");
const totalElem = document.getElementById("total");
const tableHead = document.querySelector("thead");
const tableBody = expenseTable.querySelector("tbody");
const addExpense = document.getElementById("add-expense");
// localStorage.setItem("expenses", JSON.stringify(sortUtility.testExpenses));
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let defaultExpenses = [...expenses];
let lastAvg = 0;

// format date tp dd/mm/yy
const formatDate = (date) => {
  const currDate = new Date(date);
  let year = currDate.getFullYear();
  const month = currDate.getMonth() + 1;
  
  year = year.toString().substring(2, 4);
  const dayDate = currDate.getDate();
  return `${dayDate}/${month}/${year}`;
}

// handle user input and adding expense
const handleInputs = () => {
  let expVal = expenseInput.value;
  let amountVal = amountInput.value;

  if (amountVal <= 0 || !expVal) {
    alert("Enter valid amount and expense name");
    return;
  }

  const expense = {
    id: Date.now().toString(),
    name: expVal,
    amount: Number(amountVal),
    date: dateInput.value ? new Date(dateInput.value).toISOString() : new Date().toISOString(),
  }

  defaultExpenses.push(expense);
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(defaultExpenses));
  expenseInput.value = "";
  amountInput.value = "";
  dateInput.value = "";
  updateUi();
}

const deleteExpense = (id) => {
  defaultExpenses = defaultExpenses.filter((exp) => exp.id !== id);
  expenses = expenses.filter((exp) => exp.id !== id);
  localStorage.setItem("expenses", JSON.stringify(defaultExpenses));
  updateUi();
}

const updateUi = () => {
  let percentVal;
  const totalAmount = expenses.length > 0 ? expenses.reduce((sum, exp) => sum + exp.amount, 0) : 0;
  let avg = expenses.length > 0 ?  totalAmount / expenses.length : 0;
  let tableRow  = "";

  if (expenses.length === 0) {
    tableHead.classList.add("hide-thead");
    totalElem.textContent = "0";
    avg = 0;
    lastAvg = 0;
    tableBody.innerHTML = "";
    return;
  }
  tableHead.classList.remove("hide-thead")

  expenses.forEach((exp) => {
    percentVal = totalAmount > 0 ? Number((exp.amount * 100) / totalAmount).toFixed(1) : 0;
    const outOfBounds = lastAvg > 0 && exp.amount > (3 * lastAvg);
    const colorStyle = outOfBounds ? "#ff0000" : "#000";
    const formatedDate = formatDate(exp.date);
    const name = exp.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  
    tableRow += `
    <tr id="expense_${exp.id}" style="color: #000">
    <td>${name}</td>
    <td id='amount_${exp.id}' style="color: ${colorStyle}">$${exp.amount}</td>
    <td id='percentage_${exp.id}' style="color: ${colorStyle}">${percentVal}%</td>
    <td id="date_${exp.id}">${formatedDate}</td>
    <td id="edit_${exp.id}" class="edit-cell">
      <button
        onclick="editPanel('${exp.id}')"
        style="color: #fff">Edit</button>
    </td>
    <td>
      <button
        id='btn_${exp.id}'
        onclick="deleteExpense('${exp.id}')"
        style="color: #fff"
        >delete</button>
      </td>
      </tr>
  `;
   });

  requestAnimationFrame(() => {
  totalElem.textContent = Number(totalAmount).toFixed(2);
  tableBody.innerHTML = tableRow;
  lastAvg = avg;
  addExpense.disabled = false;
  addExpense.style.opacity = 1;
})

}
// add event listener fo simulate submission and upats Ui

addExpense.addEventListener("click", handleInputs);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter")
    handleInputs();
});

// Navbar manipulation

const navBar = document.querySelector(".nav");
const mainTab = document.querySelector(".main-tab");
const subTab = document.querySelector(".sub-tab");
const weeklyTab = document.querySelector(".weekly-tab");
const monthlyTab = document.querySelector(".monthly-tab");
const toggleMenu = document.querySelector(".toggle-menu");
const currView = document.getElementById("curr-view");

// handle Toghling

const closeAllSubabs = () => {
  subTab.classList.remove("is-visible");
  weeklyTab.classList.remove("is-visible");
  monthlyTab.classList.remove("is-visible");
}

toggleMenu.addEventListener("click", () => {
  const isActive = toggleMenu.classList.toggle("is-active");
  if (!isActive) {
    closeAllSubabs();
    mainTab.classList.remove("is-visible");
    return;
  }
  mainTab.classList.add("is-visible");
});

// handle each Menu tab

mainTab.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li)
      return;
    
    const text = li.textContent.trim();
    // const text = e.target.textContent;

    if (text === "By Date") {
      subTab.classList.add("is-visible");
    }

    if (text === "Name") {
      currView.textContent = "View by Category";
      expenses = sortName(expenses);
      updateUi();
    }

    if (text === "Default") {
      currView.textContent = "Default view";
      expenses = [...defaultExpenses];
      updateUi();
    }
  });


subTab.addEventListener("click", (e) => {
  const li = e.target.closest("li");
    if (!li)
      return;
    
    const text = li.textContent.trim();
    //const text = e.target.textContent;
    
    if (text === "Week") {
      weeklyTab.classList.add("is-visible");
      monthlyTab.classList.remove("is-visible");
    }
    
    if (text === "Cancel") {
      closeAllSubabs();
      return;
    }
    
    if (text === "Month") {
      monthlyTab.classList.add("is-visible");
      weeklyTab.classList.remove("is-visible");

    }
    
    if (text === "Year") {
      currView.textContent = "Yearly view";
       expenses = [...defaultExpenses];
      expenses = sortUtility.yearlySort(expenses);
      updateUi();
    }
  });


weeklyTab.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li)
      return;
    
    const text = li.textContent.trim();
    // const text = e.target.textContent;
    
    if (text === "Cancel") {
      weeklyTab.classList.remove("is-visible");
    }
    
    if (text === "This week") {
      currView.textContent = "This week view";
       expenses = [...defaultExpenses];
      expenses = sortUtility.sortThisWeekExpense(expenses);
      updateUi();
    }
    
    if (text === "A week ago") {
      currView.textContent = "Last week view";
      expenses = [...defaultExpenses];
      expenses = sortUtility.sortLast3WeeksExpenses(expenses);
      updateUi();
    }
    
    if (text === "2 weeks ago") {
       currView.textContent = "Last 2 weeks view";
       expenses = [...defaultExpenses];
       expenses = sortUtility.sortLast2WeeksExpenses(expenses);
       updateUi();
    }

    if (text === "3 weeks ago") {
      currView.textContent = "Last 3 weeks view";
      expenses = [...defaultExpenses];
      expenses = sortUtility.sortLast3WeeksExpenses(expenses);
      updateUi();
    }
  });

monthlyTab.addEventListener("click", (e) => {
  const li = e.target.closest("li");
    if (!li)
      return;
    
    const text = li.textContent.trim();
    // const  text = e.target.textContent;

    if (Number(text) >= 1 && Number(text) <= 12) {
      const monthVal  = Number(text) <= 9 ? "0" + text : text;
      currView.textContent = `month ${text} view`;
      expenses = [...defaultExpenses];
      expenses = sortUtility.monthlySort(expenses, monthVal);
      updateUi();
    }

    if (text === "Cancel") {
      monthlyTab.classList.remove("is-visible");
    }

  })

  
// Handle Row Editing and Update

const editPanel = (id) => {
  const tr = document.getElementById(`expense_${id}`);
  const expense = expenses.find((exp) => exp.id === id);

  if (!expense) {
    alert("item not in table");
    return;
  }
  
  const percentVal = document.getElementById(`percentage_${id}`);
  const date = expense.date.split("T")[0];

  const tableRow = `
  <td>
  <input type="text" value="${expense.name}" id="edit-expense-name" />
  </td>
  <td>
    <input type="number" value="${expense.amount}" id="edit-expense-amount" />
  </td>
  <td>${percentVal.textContent}</td> 
  <td>
    <input type="date" value="${date}" id="edit-expense-date" />
  </td>
  <td>
    <button onclick="saveEdit('${id}')" style="color: #fff">Save</button>
  </td>
  <td>
    <button
      onclick="updateUi()"
      style="color: #fff"
      >Cancel</button>
    </td>
  `;
  
  addExpense.disabled = true;
  addExpense.style.opacity = "0.3";
  tr.innerHTML = tableRow;
}


const saveEdit = (id) => {
  const expInput = document.getElementById("edit-expense-name");
  const amtInput = document.getElementById("edit-expense-amount");
  const dInput = document.getElementById("edit-expense-date");
  const editedExpVal = expInput.value;
  const editedAmountVal = Number(amtInput.value);
  const editedDate = dInput.value;
  
  if (editedAmountVal <= 0 || !editedExpVal) {
    alert ("update with valid amount and expense name");
    return;
  }

  defaultExpenses = defaultExpenses.map((exp) => {
    if (exp.id === id) {
      return {
        ...exp,
        name: editedExpVal,
        amount: editedAmountVal,
        date: editedDate ? new Date(editedDate).toISOString() : new Date().toISOString(),
      };
    }
    return exp;
  });
  
  expenses = expenses.map((exp) => {
    if (exp.id === id) {
      return {
        ...exp,
        name: editedExpVal,
        amount: editedAmountVal,
        date: editedDate ? new Date(editedDate).toISOString() : new Date().toISOString(),
      };
    }
    return exp;
  });
  
  expInput.value = "";
  amtInput.value = "";
  dInput.value = "";
  localStorage.setItem("expenses", JSON.stringify(defaultExpenses));

  updateUi();
}

// handle hiding edit column

const editToggle = document.querySelector(".edit-toggle");

editToggle.addEventListener("click", () => {
  expenseTable.classList.toggle("is-open");
})

  
  
  updateUi();


  window.editPanel = editPanel;
  window.saveEdit = saveEdit;
  window.deleteExpense = deleteExpense;
  window.updateUi = updateUi;