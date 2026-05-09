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
  today.setHours(0, 0, 0, 0);
  const day = today.getDay();
  const diffToMonday = day === 0 ? 6 : day - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - diffToMonday);
  if (day !== 0) {
    return { monday, today: todayFullTime, unday: null};
  }

  const sunday = new Date(today);
  sunday.setHours(23, 59, 59, 999);

  return {monday, today: null, sunday};
}

let date = new Date("2026-05-09T12:03:49.725Z");
console.log(date);
console.log(getWeeklyRange(date))

/**
 * getYersterdaysDate - get yersterday's date
 * @date: The given date
 * 
 * Return: yersterdays date
 */

const getYersterdaysDate = (date) => {
  const yersterday = new Date(date);
  yersterday.setHours(0, 0, 0, 0);
  const today = new Date(yersterday).getDay();
  yersterday.setDate(today - 1);

  return yersterday;
}
console.log("date: ", date);
console.log(getYersterdaysDate(date));