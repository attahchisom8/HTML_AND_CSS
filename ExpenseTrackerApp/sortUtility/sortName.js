/**
 * sortName - function that takes a list and sort it by their name
 * @expenses: the given array to sort
 * 
 * Return: in place sorted list of the array, not a new array
 */

export const sortName = (expenses) => {
	return expenses.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
}
