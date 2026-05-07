const expenseInput = document.getElementById("expense-name")
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("expense-date");
const expenseTable = document.getElementById("expense-table");
const totalElem = document.getElementById("total");
const tableHead = document.querySelector("thead");
 const tableBody = expenseTable.querySelector("tbody");
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let lastAvg = 0;

const formatDate = (date) => {
  const currDate = new Date(date);
  let year = currDate.getFullYear();
  const month = currDate.getMonth() + 1;
  
  year = year.toString().substring(2, 4);
  const dayDate = currDate.getDate();
  return `${dayDate}/${month}/${year}`;
}

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

  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  expenseInput.value = "";
  amountInput.value = "";
  dateInput.value = "";
  updateUi();
}

const deleteExpense = (id) => {
  expenses = expenses.filter((exp) => exp.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  updateUi();
}

const updateUi = () => {
  let percentVal;
  const totalAmount = expenses.length > 0 ? expenses.reduce((sum, exp) => sum + exp.amount, 0) : 0;
  avg = expenses.length > 0 ?  totalAmount / expenses.length : 0;
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
    console.log("lastAvg", lastAvg, "avg", avg);
    console.log("exp date length: ", exp.date.toString().length, "exp date: ", exp.date, "formatedDate: ", formatedDate);
  
    tableRow += `
    <tr id="expense_${exp.id}" style="color: #000">
  <td>${name}</td> <td id='amount_${exp.id}' style="color: ${colorStyle}">$${exp.amount}</td> <td id='percentage_${exp.id}' style="color: ${colorStyle}">${percentVal}%</td> <td id="date_${exp.id}">${formatedDate}</td> <td id="edit_${exp.id}" class="edit-cell"><button onclick="editPanel('${exp.id}')" style="color: #fff">Edit</button></td> <td><button
      id='btn_${exp.id}'
      onclick="deleteExpense('${exp.id}')"
      style="color: #fff"
      >delete</button></td>
      </tr>
  `;
   });
  totalElem.textContent = totalAmount;
  tableBody.innerHTML = tableRow;
  lastAvg = avg;
  console.log("expenseTable: ", expenseTable);

}
// add event listener fo simulate submission and upats Ui
const addExpense = document.getElementById("add-expense");

addExpense.addEventListener("click", handleInputs);
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter")
    handleInputs();
})

console.log("expenseTable: ", expenseTable);

// Navbar manipulation

const navBar = document.querySelector(".nav");
const mainTab = document.querySelector(".main-tab");
const subTab = document.querySelector(".sub-tab");
const weeklyTab = document.querySelector(".weekly-tab");
const toggleMenu = document.querySelector(".toggle-menu");
const currView = document.getElementById("curr-view");

// handle Toghling
console.log(navBar);
toggleMenu.addEventListener("click", () => {
  toggleMenu.classList.toggle("is-active");
  const ul = navBar.querySelector("ul");
  ul.classList.toggle("is-active");
  if (!ul.classList.contains("is-active")) {
    subTab.classList.remove("sub-active");
    weeklyTab.classList.remove("week-active");
  }
});

// handle each Menu tab
console.log("MainTab: ", mainTab);

  mainTab.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li)
      return;
    
    const text = li.textContent.trim();
    
    console.log("li: ", li, "content", li.textContent);

    if (text === "By Date") {
      subTab.classList.add("sub-active");
      console.log("subTab", subTab);
      console.log("mainTab", mainTab);
    }

    if (text === "Name") {
      currView.textContent = "View by Category";
    }
    console.log(currView);
  });


  subTab.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li)
      return;
      
    const text = li.textContent.trim();
    
    console.log("li: ", li, "content", li.textContent);
    
    if (text === "Week") {
      weeklyTab.classList.add("week-active");
      console.log("weekTab", weeklyTab)
      console.log("subTab", subTab);
      console.log("mainTab", mainTab);
    }
    
    if (text === "Cancel") {
      subTab.classList.remove("sub-active");
      weeklyTab.classList.remove("week-active");
    }
    
    if (text === "Month") {
      currView.textContent = "Monthly view";
    }
    
    if (text === "Year") {
      currView.textContent = "Yearly view";
    }
    console.log(currView);
  });


  weeklyTab.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li)
      return;
      
    const text = li.textContent.trim();
    
    console.log("li: ", li, "content", li.textContent);
    
    if (text === "Cancel") {
      weeklyTab.classList.remove("week-active");
      console.log("weeklyTab", weeklyTab);
      console.log("subTab", subTab);
      console.log("mainTab", mainTab);
    }
    
    if (text === "week 1") {
      currView.textContent = "Week 1 view";
    }
    
    if (text === "week 2") {
      currView.textContent = "Week 2 view";
    }
    
    if (text === "week 3") {
       currView.textContent = "Week 3 view";
    }
    console.log(currView);
  });

  
// Handle Editing 
const editPanel = (id) => {
  const tr = document.getElementById(`expense_${id}`);
  const expense = expenses.find((exp) => exp.id === id);

  if (!expense) {
    alert("item not in table");
    return;
  }
  
  const percentVal = document.getElementById(`percentage_${id}`);

  const tableRow = `
    <tr id="expense_${id}" style="color: #000">
  <td>
    <input type="text" value="${expense.name} />
  </td>
  <td>
    <input type="number" value="${expense.amount}" />
  </td>
  <td>${percentVal.textContent}</td>
  <td>
    <input type="date" value="${expense.date}" />
  </td>
  <td>
    <button onclick="saveEdit('${id}')" style="color: #fff">Save
    </button>
  </td>
  <td>
    <button
      onclick="${updateUi()}"
      style="color: #fff"
      >Cancel</button>
    </td>
      </tr>
  `;
  
  addExpense.disabled = true;
  console.log("tr: ", tr, "id: ", id);
  addExpense.style.opacity = "0.3";
  tr.innerHTML = tableRow;
  console.log("tr", tr, "id", id);
}

  
  
  updateUi();