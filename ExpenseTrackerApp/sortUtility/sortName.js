/**
 * sortName - function that takes a list and sort it by their name
 * @expenses: the given array to sort
 * 
 * Return: in place sorted list of the array, not a new array
 */

const sortName = (expenses) => {
	return expenses.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
}

const m = [
	{name: "zephra", id: "1"}, {name: "bioz", id: "5"}, {name: "Arc", id: 2},
]
console.log(JSON.stringify(sortName(m)));