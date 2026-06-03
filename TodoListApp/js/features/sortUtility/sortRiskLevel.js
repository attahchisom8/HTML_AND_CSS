/**
 * sortPriority - sorts a task by priority
 * @priority; The given priority
 * @arr: The given array containning task
 *
 * Return: A sorted Array
 */

export const sortPriority = (arr, priority) => {
  return arr.filter((p) => p.priority === priority);
}
