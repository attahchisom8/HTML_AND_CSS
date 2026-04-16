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
    case "%":
      precedence = 3;
      break;
		case "*":
			precedence = 3;
      break;
		case "+":
			precedence = 5;
      break;
	  case "-":
			precedence = 5;
      break;
    default:
      /\(\)/.test(opr) ? precedence = 1 : precedence = 0;
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
 * exrractOperands - extracts operators from a given expression into an array
 * @expr: given mathematical expression
 *
 * Return: an array of operators
 */

const extractOperands = (expr) => {
  let opr_arr = [], num_arr = [], k = 0;
  let delims =['+', '-', '*', '/', '%'];

  expr = expr.replace(/\s/g, "");

  while (k < expr.length) {
    let end_idx;

    if (expr[k] === '(') {
      let item_p = {};
      const start_idx = k;

      const p_expr = expr.slice(k);
      end_idx = get_parent_idx(p_expr);
      k = k + end_idx;

      if (!isNaN(end_idx)) {
        if (expr[k + 1] === ")")
          return `extra closing bracket ')' found at ${p_expr}`;
        item_p["opr"] = "()";
        item_p["idx"] = {start_idx, end_idx: k};
        opr_arr.push(item_p);
      } else
        return `${end_idx}: ${p_expr}`;
    } else {
      if (delims.includes(expr[k])) {
        let item_opr = {};
        item_opr["opr"] = expr[k];
        item_opr["idx"] = k;
        opr_arr.push(item_opr);
      }
      else {
        let item_num = {};
        item_num["num"] = expr[k];
        item_num["idx"] = k;
        num_arr.push(item_num);
      }
    }
    k++;
  }

  return opr_arr;
}

// console.log(JSON.stringify(extractOperands("+2-7"), null, 2))

/**
 * bodmasParser - gives prededencr to operators according
 * to bodmas rule
 * oprArr: an array of operator objects
 * 
 * Return: an array of operator objects wwith predence added
 */

const bodmasParser = (oprArr) => {
  oprArr.every((item) => {
    if (item.precedence === 0) {
      console.log("invalid expression");
      return false;
    }
    const precedence = get_precedence(item.opr);
    item["precedence"] = precedence;
    return true;
  });

  return oprArr.sort((a, b) => a.precedence - b.precedence);
}

// console.log(JSON.stringify(bodmasParser(extractOperands("2222 +3 + 5 % (333 * 8-(2+7)) -6+9388")), null, 2));


/**
 * getPreviousNumbers - gets the numbers before a given inndex
 * just before the first operator encountered
 * expr: the given math expression
 * idx: the idx to start searching from
 * 
 * Return: the numbers just beore the idx
 */

const getPreviousNumbers = (expr, idx) => {
  let k = idx - 1, num = "";
  const delims = ['+', '-', '*', '/', '%'];

  if (idx === 0)
    return "getPrevious Error: invalid expression";

  if (!delims.includes(expr[idx]))
    return "pass the index of an operator to get valid number";

  while (k >= 0) {
    if (delims.includes(expr[k]))
      break;
    num += expr[k];
    k--;
  }
  num = num.split("").reverse().join("");

  return parseFloat(num);
}

// console.log(getPreviousNumbers("11112+45", 5));


/**
 * getNextNumbers - gets the numbers after a given inndex
 * just before the first operator encountered
 * expr: the given math expression
 * idx: the idx to start searching from
 * 
 * Return: the numbers just ater the idx
 */

const getNextNumbers = (expr, idx) => {
  let k, num = "";
  const delims = ['+', '-', '*', '/', '%'];

  if (!delims.includes(expr[idx]) && (idx + 1) < expr.length)
    return "pass the index of an operator to get valid number";

  if (idx + 1 >= expr.length)
    return "index out of range";

  k = idx + 1;
  while (k < expr.length) {
    if (delims.includes(expr[k]))
      break;
    num += expr[k];
    k++;
  }

  return parseFloat(num);
}

// console.log(getNextNumbers("11112+4", 5));

/**
 * performOperation - make calculation according bidmas rule
 * expr: the given math expression
 * opr_arr: array of operator objects
 * 
 * Return: The result of the calculation
 */

const performOperation = (expr, oprArr) => {
  let prev_item = null, initial = null;
  let k = 0, res = 0;
  let prevNums, nextNums;
  const opr_obj = {
    "+": maths.sum,
    "-": maths.sub,
    "*": maths.mult,
    "of": maths.mult,
    "/": maths.div,
    "%": maths.mod,
  };

  console.log("oprArr: ", JSON.stringify(oprArr, null, 1));

  for (let k = 0; k < oprArr.length; k++) {
    const item = oprArr[k];

    if (item.idx === 0) {
      initial = item;
      continue;

    }

    if (item.precedence === 1) {
      const subExpr = expr.substring(item.idx.start_idx, item.idx.end_idx);
      eval_simple_expr(subExpr);
    } else {

      if (!prev_item) {
        console.log("item_opr and index", item.opr, item.idx);
        prevNums = getPreviousNumbers(expr, item.idx);
        if ((item.idx === 2) && initial) {
          prevNums = parseFloat(initial.opr + prevNums);
          initial = null;
          console.log("prevNums with initial: ", prevNums);
        }
        if (isNaN(prevNums))
          return prevNums;
        nextNums = getNextNumbers(expr, item.idx);
        if (isNaN(nextNums))
          return nextNums;
        console.log(`nextNums: ${nextNums}, prevNums: ${prevNums} are passed to function`);
        console.log("res in nuetral: ", res);
        res = opr_obj[item.opr](prevNums, nextNums);
        console.log("res in neutral after operation: ", res);
      } else {
        if (item.idx < prev_item.idx) {
            prevNums = getPreviousNumbers(expr, item.idx);
          if ((item.idx === 2) && initial) {
            prevNums = parseFloat(initial.opr + prevNums);
            initial = null;
            console.log("prevNums with initial: ", prevNums);
          }
          if (isNaN(prevNums))
            return prevNums;
          console.log(`prevNums: ${prevNums} and res: ${res} are passed to function`);
          console.log("res in prev: ", res);
          res = opr_obj[item.opr](prevNums, res);
          console.log("res in prev after operation: ", res);
        } else {
          nextNums = getNextNumbers(expr, item.idx);
          if (isNaN(nextNums))
            return nextNums;
          console.log(`res: ${res}, nextNums: ${nextNums} are passed to function`);
          console.log("res in next: ", res);
          res = opr_obj[item.opr](res, nextNums);
          console.log("res in next after operation: ", res);
        }
      }
      prev_item = item;
    }
  };

  return res;

}

const expr = "-2-8-5+44+3+300/5";
console.log(expr);
console.log(JSON.stringify(performOperation(expr, bodmasParser(extractOperands(expr))), null, 2));
