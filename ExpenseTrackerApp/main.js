const expenseInput = document.getElementById("expense-name")
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expense-list");
const totalElem = document.getElementById("total");
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let lastAvg = 0;

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
  }

  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  expenseInput.value = "";
  amountInput.value = "";
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
  let htmlList  = "";

  expenses.forEach((exp) => {
    percentVal = totalAmount > 0 ? Number((exp.amount * 100) / totalAmount).toFixed(1) : 0;
    const outOfBounds = lastAvg > 0 && exp.amount > (3 * lastAvg);
    const colorStyle = outOfBounds ? "#ff0000" : "#00ff00";
    console.log("lastAvg", lastAvg, "avg", avg);
  
    htmlList += `
    <li id="expense_${exp.id}" style="color: #00ff00">
  <div>${exp.name}</div> <div id='amount_${exp.id}' style="color: ${colorStyle}">$${exp.amount}</div> <span id='percentage_${exp.id}' style="color: ${colorStyle}">${percentVal}%</span> <button
      id='btn_${exp.id}'
      onclick="deleteExpense('${exp.id}')"
      style="color: #fff"
      >delete</button>
      </li>
  `;
   });
  totalElem.textContent = totalAmount;
  expenseList.innerHTML = htmlList;
  lastAvg = avg;
  console.log("expenseList: ", expenseList);

}
// add event listener fo simulate submission and upats Ui
const addExpense = document.getElementById("add-expense");

addExpense.addEventListener("click", handleInputs);

console.log("expenseList: ", expenseList);