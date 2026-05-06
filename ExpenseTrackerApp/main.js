const expenseInput = document.getElementById("expense-name")
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("expense-date");
const expenseTable = document.getElementById("expense-table");
const totalElem = document.getElementById("total");
let tableHead = document.querySelector("thead");
let tableBody = expenseTable.querySelector("tbody");
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let lastAvg = 0;

expenses.forEach((exp) => {
  const currDate = new Date(exp.date);
  const year = currDate.getFullYear();
  const month = currDate.getMonth() + 1;
  const date = currDate.getDate();
  exp.date = `${date}/${month}/${year}`;
})

const handleInputs = () => {
  let expVal = expenseInput.value;
  let amountVal = amountInput.value;

  if (amountVal <= 0 || !expVal) {
    alert("Enter vaid amount and expense name");
    return;
  }

  const expense = {
    id: Date.now().toString(),
    name: expVal,
    amount: Number(amountVal),
    date: dateInput.value || new Date(),
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
  let treeRow  = "";

  if (expenses.length > 0) {
    if (!tableHead) {
      tableHead = document.createElement("thead");
      tableHead.innerHTML = `
      <thead class="table-header">
        <th id="th-category">category</th>
        <th id="th-amount">Amount</th>
        <th id="th-percentage">Percent</th>
        <th id="th-date">Date</th>
        <th id="delete-buttons">Remove</th>
        </thead>
      `
    }

    if (!tableBody) {
      tableBody = document.createElement("tbody");
      tableBody.innerHTML = `<tbody></tbody>`;
   }
  } else {
    if (tableHead)
      tableHead.remove();
    if (tableBody)
      tableBody.remove();
    tableBody = null;
    tableHead = null;
  }

  expenses.forEach((exp) => {
    percentVal = totalAmount > 0 ? Number((exp.amount * 100) / totalAmount).toFixed(1) : 0;
    const outOfBounds = lastAvg > 0 && exp.amount > (3 * lastAvg);
    const colorStyle = outOfBounds ? "#ff0000" : "#000";
    console.log("lastAvg", lastAvg, "avg", avg);
    console.log("exp date length", exp.date.toString().length, "exp date", exp.date);
  
    treeRow += `
    <tr id="expense_${exp.id}" style="color: #000">
  <td>${exp.name}</td> <td id='amount_${exp.id}' style="color: ${colorStyle}">$${exp.amount}</td=> <td id='percentage_${exp.id}' style="color: ${colorStyle}">${percentVal}%</td> <td id="date_${exp.id}">${exp.date.toString().length > 8 ? exp.date.toLocaleString().slice(0, 8) : exp.date }</td> <td><button
      id='btn_${exp.id}'
      onclick="deleteExpense('${exp.id}')"
      style="color: #fff"
      >delete</button></td>
      </tr>
  `;
   });
  totalElem.textContent = totalAmount;
  if (tableBody)
    tableBody.innerHTML = treeRow;
  if (tableHead)
    expenseTable.appendChild(tableHead);
  if (tableBody)
    expenseTable.appendChild(tableBody);
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

updateUi();

// Navbar manipulation

const navBar = document.querySelector(".nav");
const toggleMenu = document.querySelector(".toggle-menu");
let subTabOpen = false, weekTabopen = false; 

console.log(navBar);
toggleMenu.addEventListener("click", () => {
  toggleMenu.classList.toggle("is-active");
  const ul = navBar.querySelector("ul");
  ul.classList.toggle("is-active");
  if (!ul.classList.contains("is-active")) {
    subTabOpen = false;
    weekTabopen = false;
  }
});