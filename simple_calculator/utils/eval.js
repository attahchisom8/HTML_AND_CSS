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
    case "()":
      precedence = 1;
      break;
		case "of":
			precedence = 2;
      break;
    case "/": case "*": case "%":
			precedence = 3;
      break;
		case "+": case "-":
			precedence = 4;
      break;
    default:
      precedence = 0;
      break;
	};

  return precedence;
}

/**
 * extractTokens - extract tokens of numbers and operatorrs
 * expr: the given expression
 *
 * Return: An array of extracted tokens
 */

const extractTokens = (expr) => {
  expr = expr.replace(/\s/g, "");
  return expr.split(/([\+\-\*\/\%\(\)])/).filter((t) => t != "");
}

// console.log(extractTokens("-2+5 - 7 +(3-333)"));


/**
 * bodmasParser - assigngs precedence to each operator token
 * tokens: an array of token
 *
 * Return: an object of the token with essentail feilds
 */

const bodmasParser = (tokens) => {
  const arr = [];
  tokens.forEach((token, idx) => {
    if (['+', '-', '*', '/', '%'].includes(token))
      arr.push({
        opr: token,
        idx,
        precedence: get_precedence(token)
      });
  });

  return arr.sort((a, b) => a.precedence - b.precedence);
}

// console.log(JSON.stringify(bodmasParser(extractTokens("2+5-(3+10)")), null, 1));

/**
 * performOperation - perform mathematical operation based on pre-
 * cedence
 * @tokens: an array of tokens
 * @sortedArr - a sorted array of opertor tokens based on their
 * precedence
 *
 * Return: a value based on the evaluation
 */

const performOperation = (tokens, sortedArr) => {
  let res = 0;
  const opr_obj = {
    "+": maths.sum,
    "-": maths.sub,
    "*": maths.mult,
    "of": maths.mult,
    "/": maths.div,
    "%": maths.mod,
  };

  while (tokens.includes("(")) {
    const startIdx = tokens.lastIndexOf("(");
    const endIdx = tokens.indexOf(")", startIdx);
    const subTokens = tokens.slice(startIdx + 1, endIdx);
    sortedArr = bodmasParser(subTokens);
    res = performOperation(subTokens, sortedArr);
    tokens.splice(startIdx, endIdx - startIdx + 1, res);
  }

  if (['+', '-'].includes(tokens[0])) {
    if (tokens[0] === '+')
      tokens.splice(0, 2, tokens[1] * 1);
    else
      tokens.splice(0, 2, tokens[1] * -1);
    sortedArr = bodmasParser(tokens);
  }

  while (tokens.length > 0 && sortedArr.length > 0) {
    // handles the case where sortedArr comes out of recursion with previous values
    sortedArr = bodmasParser(tokens);
    const item = sortedArr[0];
    const k = item.idx;
    const val1 = parseFloat(tokens[k - 1]);
    const val2 = parseFloat(tokens[k + 1]);
    res = opr_obj[item.opr](val1, val2);
    tokens.splice(k - 1, 3, res);
    sortedArr = bodmasParser(tokens);
  }

  return res;
}

/**
 * eval_simple_expr - evaluates simplemathematical expression
 * @expr: The given mathematical expression
 *
 * Return: The evaluated result
 */

const eval_simple_expr = (expr) => {
  const tokens = extractTokens(expr);
  const sortedArr = bodmasParser(tokens);

  return performOperation(tokens, sortedArr);
}

let expr;
// expr = "+2+5- (3 * (4 -1))*3 / 7";
// expr = "2 + 5 - 9";
// expr = "-2-8-5+44+3+300/5";
expr = "+3 + 8"
console.log(expr);
console.log(eval_simple_expr(expr));
