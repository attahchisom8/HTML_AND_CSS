/**
 * getWeeklyRange - get the range of days in a week from now to last monday
 * or monday to sunday
 * @date: the date given
 *
 * Retyrn: An object of the weekly range
 */

const getWeeklyRange = (date) => {
  const today = new Date(date);
  const todayFullTime = today;
  today.setHours(0, 0, 0, 0);
  const day = today.getDay();
  const diffToMonday = day === 0 ? 6 : day - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - diffToMonday());
  if (day !== 0) {
    return { monday, todayFullTime };
  }

  const sunday = new Date(today);
  sunday.setHours(23, 59, 59, 999);

  return {monday, sunday};
}

let date = new Date("2026-05-09T12:03:49.725Z");
console.log(getWeeklyRange(date));
