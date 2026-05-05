const expenseInput = document.getElementById("expense-name")
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("expense-date");
const expenseTable = document.getElementById("expense-table");
const totalElem = document.getElementById("total");
const tableBody = expenseTable.querySelector("tbody");
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
    alert("please insert valid amount and expense name");
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
  tableBody.innerHTML = treeRow;
  expenseTable.appendChild(tableBody);
  lastAvg = avg;
  console.log("expenseTable: ", expenseTable);

}
// add event listener fo simulate submission and upats Ui
const addExpense = document.getElementById("add-expense");

addExpense.addEventListener("click", handleInputs);

console.log("expenseTable: ", expenseTable);

updateUi();