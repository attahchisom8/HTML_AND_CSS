/**
 * sortOverdueDate - sorts a task by its expiration date starting
 * from the one closest to expiration date
 * @overdueDate: expiration date
 * @arr: The given array containning task
 *
 * Return: A sorted Array by expiration dates
 */

export const sortOverdueDate = (arr) => {
  return arr.filter((d) => d.status === "pending")
  .sort((a, b) => new Date(a.overdueDate) - new Date(b.overdueDate));
}