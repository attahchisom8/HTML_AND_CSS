/*"
 * sum: function to sum a list of numbers
 * @args: arguments
 *
 * Return: the sum of the arguments
 */

export const sum = (...args) => {
	let sum = 0;
	for (const arg of args) {
		sum += arg;
	}

	return sum;
}

// console.log("sum of 4 and 5: ", sum(4, 5));

/**
 * sub - subtracts a list of numbers
 * @args: The list of numbers
 *
 * Return: result of subtrraction
 */

export const sub = (...args) => {
	let sub = args[0];

	for (const arg of args.slice(1)) {
		sub -= arg;
	}

	return sub;
}

 // console.log("The difference of 4 and 5: ", sub(4, 5));

/**
 * mult - mutiply a list of numbers
 * @args: arguments
 *
 * Return: the product of the numbers
 */

export  const mult = (...args) => {
	let mult = 1;

	for (const arg of args) {
		mult *= arg;
	}

	return mult;
}

// console.log("product of 4 and 5:", mult(4, 5));

export const div = (...args) => {
	let div = args[0];

	for (const arg of args.slice(1)) {
		if (arg == 0)
			return "Zero division Error";
		div /= arg;
	}

	return (div);
}

// console.log("Division of 4 and 5:", div(4, 5));

export const mod = (...args) => {
	let mod = args[0];

	for (const arg of args.slice(1)) {
		if (arg == 0)
			return "Zero division Error";
		mod %= arg;
	}
	return mod;
}

// console.log("4 mod 5: ", mod(4, 5));
