import * as maths from "./maths.js";

/**
 * get_precedence: get the precedencs of an operator in its bodmas
 * ranking
 *
 * Return: The precedence
 */

const get_precedence = (opr) => {
	let precedence;

	switch (opr) {
		case "of":
			precedence = 2;
      break;
		case "/":
			precedence = 3;
      break;
		case "*":
			precedence = 4;
		case "+":
			precedence = 5;
      break;
	  case "-":
			precedence = 6;
      break;
    default:
      /\(.+\)/.test(opr) ? precedence = 1 : precedence = 0;
      break;
	};

  return precedence;
}

// console.log(`precedence: + => ${get_precedence("+")}, () => ${get_precedence("(1+ anything)")}`);


/**
 * get_parent_idx: gets the outer  ending index of parenthesis
 * @expr: the given expression must have first term as "("
 *
 * Return: end idx
 */
const get_parent_idx = (expr) => {
  let p_count = 1, end_idx = 0;

  if (expr[0] !== "(")
    return `expression ${expr} must start with '('`;

  for (const chr of expr.slice(1)) {
    end_idx++;
    if (chr === "(")
      p_count++;
    if (chr === ")")
      p_count--;
    if (p_count === 0) {
      break;
    }
  }
  if (p_count == 0)
    return end_idx;

  return "Invalid expression";
}

// console.log("nested expression: (2 * (3 + 2)): ", get_parent_idx("(2 * (3 + 2))+55"));



/**
 * exrract_operands - extracts operators from a given expression into an array
 * @expr: given mathematical expression
 *
 * Return: an array of operators
 */

const exrract_operands = (expr) => {
  let opr_arr = [];

  expr = expr.replace(/\s/g, "");

  for (let k = 1; k < expr.length; k += 2) {
    let end_idx;

    opr_arr.push(expr[k]);

    if (expr[k - 1] === "(") {
      end_idx = get_parent_idx(expr.slice(k - 1));
      if (!isNaN(end_idx)) {
        k = k - 1 + end_idx - 1;
        opr_arr.push("()");
    } else {
        return end_idx;
    }
      
  } else if (expr[k + 1] === "(") {
    end_idx = get_parent_idx(expr.slice(k + 1));
    console.log(expr.slice(k+1));
    console.log(end_idx);
    if (!isNaN(end_idx)) {
      k = k + 1 + end_idx - 1;
      opr_arr.push("()");
    } else
      return end_idx;
    }
  }

  return opr_arr;
}

console.log(exrract_operands("(3 + 5) - 2 +3 + 5 - (2 + 7) + 5 + 9 - 11"));
