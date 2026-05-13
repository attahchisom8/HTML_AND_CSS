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
const chartsSection = document.getElementById("charts-section");
// localStorage.setItem("expenses", JSON.stringify(sortUtility.testExpenses));
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let defaultExpenses = [...expenses];
let avg = 0;
let chart = null, pieChart = null;

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
  avg = expenses.length > 0 ?  totalAmount / expenses.length : 0;
  const fragment = document.createDocumentFragment();

  if (expenses.length === 0) {
    tableHead.classList.add("hide-thead");
    totalElem.textContent = "0.00";
    avg = 0;
    tableBody.innerHTML = "";

    if (chart) {
      chart.destroy();
      chart = null;
    }
    if (pieChart) {
      pieChart.destroy();
      pieChart = null;
    }
    chartsSection.classList.add("hide-charts");

    return;
  }
  tableHead.classList.remove("hide-thead");
  chartsSection.classList.remove("hide-charts");
  renderCharts(expenses);

  expenses.forEach((exp) => {
    percentVal = totalAmount > 0 ? Number((exp.amount * 100) / totalAmount).toFixed(1) : 0;
    const outOfBounds = avg > 0 && exp.amount > (3 * avg);
    const colorStyle = outOfBounds ? "#ff0000" : "#000";
    const formatedDate = formatDate(exp.date);
    const name = exp.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const tr = document.createElement("tr");
  
    tr.id = `expense_${exp.id}`;
    tr.style.color = "#000";
    tr.innerHTML = `
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
  `;
  fragment.appendChild(tr);
   });

  requestAnimationFrame(() => {
  totalElem.textContent = Number(totalAmount).toFixed(2);
  tableBody.innerHTML = "";
  tableBody.appendChild(fragment);
  addExpense.disabled = false;
  addExpense.style.opacity = 1;
  });

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
      expenses = sortUtility.sortLastWeekExpenses(expenses);
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
});

// handle charts rendering

const myColors = ["#dd5578", "#988977", "#ffee00"];
const myColor2 =  [...myColors, "#00ffee"];

const getColors = (arr, colors) => {
  let idx = 0;

  const threshold = 3 * avg;
  const colorArr = arr.map((t) => {
    let currColor;
    if (t < threshold)
      currColor = colors[idx];
    else
      currColor = "#ff0000";
    idx = (1 + idx) % colors.length;
    return currColor;
  });

  return colorArr;
}

const renderCharts = (expenses) => {
  const ctx = document.getElementById("expense-chart")
  .getContext("2d");
  const ctxp = document.getElementById("expense-pie-chart")
  .getContext("2d");
  const categoriesTotals = expenses.reduce((acc, exp) => {
    acc[exp.name] = (acc[exp.name] || 0) + exp.amount;
    return acc;
  }, {});

  const categories = Object.keys(categoriesTotals);
  const totals = Object.values(categoriesTotals);
  const diffToAvg = totals.map((t) => (t < avg) ? avg - t : 0);
  const barColors = getColors(totals, myColors);


  // render composite chart

  if (chart) {
    chart.data.labels = categories;
    chart.data.datasets[0].data = totals;
    chart.data.datasets[0].backgroundColor = barColors;
    chart.data.datasets[1].data = diffToAvg;
    chart.update("none");
  } else {
  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: categories, 
      datasets: [
        {
          label: "category spending",
          data: totals,
          backgroundColor: barColors,
          borderRadius: 5
        },
        {
          label: "diff to average",
          data: diffToAvg,
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderColor: "rgb(255, 255, 255, 0.5)",
          borderRadius: 3,
          borderWidth: 1,
          borderDash: [2, 2],
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {color: "#fff"},
          stacked: true,
          grid: {color: "rgba(255, 255, 255, 0.2)"}
        },
        y: {
          ticks: {color: "#fff"},
          stacked: true,
          beginAtZero: true,
          grid: {color: "rgba(255, 255, 255, 0.2)"}
        }
      },
      plugins: {
        legend: {labels: {color: "#fff"}},
      }
    },
  });
}

  // Render pie chart
  const pieColors = getColors(totals, myColor2);

  if (pieChart) {
    pieChart.data.labels = categories;
    pieChart.data.datasets[0].data = totals;
    pieChart.data.datasets[0].backgroundColor = pieColors;
    pieChart.update("none");
  } else {
  pieChart = new Chart(ctxp, {
    type: "pie",
    data: {
      labels: categories,
      datasets: [
        {
          label: "category spending",
          data: totals,
          backgroundColor: pieColors,
          borderColor: "#fff",
          borderWidth: 2,
          hoverOffset: 20,
          spacing: 10,
        }
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          onClick: null,
          labels: {
            color: "#fff",
            generateLabels: (chart) => {
              return [
                {
                  text: "Overspending (>3x avg)",
                  fillStyle: "#ff0000",
                  strokeStyle: "#fff",
                  lineWidth: 1,
                  hidden: false,
                  fontColor: "#fff",
                },
                ...myColor2.map((c) => {
                  return {
                    text: "Normal budget",
                    fillStyle: c,
                    strokeStyle: "#fff",
                    lineWidth: 1,
                    hidden: false,
                    fontColor: "#fff"
                  }
                })
              ]
            }
            
          },
        }
      }
    }
  });
}
}

// handle sliding tutorial panel
const tutToggle = document.querySelector(".tut");
const tutorialPanel = document.querySelector(".tutorial-panel");

tutToggle.addEventListener("click", () => {
  const tutorial = tutorialPanel.classList.toggle("tut-active");
  if (tutorial)
    tutToggle.textContent = "Close-tutorial";
  else
    tutToggle.textContent = "Tutorial"
})
  
  updateUi();


  window.editPanel = editPanel;
  window.saveEdit = saveEdit;
  window.deleteExpense = deleteExpense;
  window.updateUi = updateUi;