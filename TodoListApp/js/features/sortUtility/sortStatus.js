/*
 * sortByStatus - sorts an array by pending, completed, uncompleted
 * @arr; The given arr containing the tasks
 * status: status of the element
 *
 * Return: A sorted array by status
 */

const sortByStatus(arr, status) => {
  return arr.filter((s) => s.status === status);
}
