export const testExpenses = [
  // 3 This Week (May 4 - May 9)
  { id: "101", name: "Grocery Run", amount: 45.50, date: "2026-05-08T10:00:00.000Z" },
  { id: "102", name: "Coffee", amount: 5.25, date: "2026-05-06T08:30:00.000Z" },
  { id: "103", name: "Gasoline", amount: 60.00, date: "2026-05-04T17:15:00.000Z" },

  // 3 Last Week (April 27 - May 3)
  { id: "201", name: "Dinner Out", amount: 85.00, date: "2023-05-02T19:00:00.000Z" },
  { id: "202", name: "Gym Membership", amount: 30.00, date: "2026-04-30T12:00:00.000Z" },
  { id: "203", name: "Cinema Tickets", amount: 25.00, date: "2026-04-28T20:45:00.000Z" },

  // 4 Last 2 Weeks (April 20 - April 26)
  { id: "301", name: "Electricity Bill", amount: 120.00, date: "2026-04-25T09:00:00.000Z" },
  { id: "302", name: "Internet", amount: 75.00, date: "2026-04-23T11:00:00.000Z" },
  { id: "303", name: "New Shoes", amount: 95.00, date: "2026-04-21T15:30:00.000Z" },
  { id: "304", name: "Lunch Meeting", amount: 22.00, date: "2026-04-20T13:00:00.000Z" },

  // 3 Last 3 Weeks (April 13 - April 19)
  { id: "401", name: "Amazon Purchase", amount: 42.99, date: "2026-04-18T14:20:00.000Z" },
  { id: "402", name: "Pharmacy", amount: 15.50, date: "2026-04-16T10:10:00.000Z" },
  { id: "403", name: "Car Wash", amount: 18.00, date: "2026-04-14T09:00:00.000Z" },

  // 5 Last Month (April 1 - April 12)
  // These specifically fall within April but outside the "3 weeks ago" range
  { id: "501", name: "Monthly Rent", amount: 1200.00, date: "2026-04-01T08:00:00.000Z" },
  { id: "502", name: "Software Subscription", amount: 15.99, date: "2026-04-03T00:00:00.000Z" },
  { id: "503", name: "Pet Food", amount: 55.00, date: "2026-04-05T16:40:00.000Z" },
  { id: "504", name: "Home Maintenance", amount: 210.00, date: "2026-04-08T11:20:00.000Z" },
  { id: "505", name: "Gift for Friend", amount: 35.00, date: "2026-03-10T14:00:00.000Z" }
];

/**
 * getWeeklyRange - get the range of days in a week from now to last monday
 * or monday to sunday
 * @date: the date given
 *
 * Retyrn: An object of the weekly range
 */

const getWeeklyRange = (date) => {
  const today = new Date(date);
  const todayFullTime = new Date(today);
  today.setUTCHours(0, 0, 0, 0);
  const day = today.getUTCDay();
  const diffToMonday = day === 0 ? 6 : day - 1;
  const monday = new Date(today);
  monday.setUTCDate(today.getUTCDate() - diffToMonday);
  if (day !== 0 && day !== 1) {
    return { monday, today: todayFullTime, sunday: null};
  }

  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  sunday.setUTCHours(23, 59, 59, 999);

  return {monday, today: null, sunday};
}

/* let date = new Date("2026-05-09T12:03:49.725Z");
console.log(date);
console.log(getWeeklyRange(date)) */

/**
 * getYersterdaysDate - get yersterday's date
 * @date: The given date
 * 
 * Return: yersterdays date
 */

const getYersterdaysDate = (date) => {
  const yersterday = new Date(date);
  yersterday.setUTCHours(0, 0, 0, 0);
  yersterday.setUTCDate(yersterday.getUTCDate() - 1);

  return yersterday;
}
/* console.log("date: ", date);
console.log("yersterday", getYersterdaysDate(date));
let monday = getWeeklyRange(date).monday;
console.log("weekly range", getWeeklyRange(getYersterdaysDate(monday))); */

/**
 * 
 * sortThisWeekExpenses - sort this week expenses by latest date
 * @expenses: expenses array
 * Return: A sorted array by weekly expenses
 */

export const sortThisWeekExpense = (expenses) => {
  const today = new Date();
  const week = getWeeklyRange(today);
  let endRangeWeek = week.today ? week.today : week.sunday;
  console.log("monday", week.monday, "endRangeWeek", endRangeWeek);

  expenses = expenses.filter((exp) => {
    const expDate = new Date(exp.date);
    return expDate >= week.monday && expDate <= endRangeWeek;
});

  return expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
}


/**
 * sortLastWeekExpenses - sort last week expnses by their latest
 * date entry
 * @expenses: The given exoenses array
 * 
 * Retrn: A sorted array by their by atest date
 */

export const sortLastWeekExpenses = (expenses) => {
  const  today = new Date();
  const thisWeekMonday = getWeeklyRange(today).monday;
  const yerterdayIsSunday = getYersterdaysDate(thisWeekMonday);
  const lastWeek = getWeeklyRange(yerterdayIsSunday);

  expenses = expenses.filter((exp) => {
    const expDate = new Date(exp.date);
    return expDate >= lastWeek.monday && expDate <= lastWeek.sunday;
  });

  return expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// nsole.log("last week expenses", sortLastWeekExpenses(testExpenses));

/**
 * sortLast2WeeksExpenses - sorts the Last two weeks expenses by
 * their date
 * @expenses: the given expense array
 * 
 * Return: a sorted array by their date
 */

export const sortLast2WeeksExpenses = (expenses) => {
  const today = new Date();
  const monday = getWeeklyRange(today).monday;
  monday.setUTCDate(monday.getUTCDate() - 14);
  const last2Weeks = getWeeklyRange(monday);
  console.log("last 2 weeks", last2Weeks);

  expenses = expenses.filter((exp) => {
    const expDate = new Date(exp.date);
    return expDate >= last2Weeks.monday && expDate <= last2Weeks.sunday;
  });

  return expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
}
// nsole.log("last 2 week expenses", sortLast2WeeksExpenses(testExpenses));


/**
 * sortLast3WeeksExpenses - sorts the Last three weeks expenses by
 * their date
 * @expenses: the given expense array
 * 
 * Return: a sorted array by their date
 */

export const sortLast3WeeksExpenses = (expenses) => {
  const today = new Date();
  const monday = getWeeklyRange(today).monday;
  console.log("monday in 3 weeks: ", monday);
  monday.setUTCDate(monday.getUTCDate() - 21);
  const last3Weeks = getWeeklyRange(monday);
  console.log("last 3 weeks", last3Weeks);

  expenses = expenses.filter((exp) => {
    const expDate = new Date(exp.date);
    return expDate >= last3Weeks.monday && expDate <= last3Weeks.sunday;
  });

  return expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
}
// console.log("last 3 week expenses", sortLast3WeeksExpenses(testExpenses));


/**
 * monthlySort - sorts expense by  monthsof the year
 * @expenses: the given expenses arrayh
 * @monthVal: the given month of the year
 * 
 * Return: A sorted list of expenses by monnth
 */

export const monthlySort = (expenses, monthVal) => {
  const date = new Date();
  const year = date.getUTCFullYear();
  const monthSearch = `${year}-${monthVal}`;

  expenses = expenses.filter((exp) => exp.date.includes(monthSearch));

  return expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
}
// console.log("monthly expenses: ", monthlySort(testExpenses, "03"));


/**
 * yearlySort - sorts expense by the current year
 * @expenses: the given expenses arrayh
 * 
 * Return: A sorted list of expenses by year
 */

export const yearlySort = (expenses) => {
  const date = new Date();
  const year = date.getUTCFullYear().toString();

  expenses = expenses.filter((exp) => exp.date.includes(year));

  return expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
}
// console.log("yearly expenses: ", yearlySort(testExpenses));

