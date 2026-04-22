import { eval_simple_expr } from "./utils/eval.js";

const buttons = document.querySelectorAll("button");
const input = document.querySelector("textarea");
let isNotOn = false, str = "";
let res = null, history = "0";
let hist_arr = [], idx = 0;
let hasReturned = false, hasRes = false;

const handleEvents = (e) => {
  let parsedStr = "";
	let btnVal = e.target.textContent;

  if (["Off", "On"].includes(btnVal) || e.key === "Escape") {
    isNotOn = !isNotOn;
		hist_arr = [];
		idx = 0;
		history = "0";
		res = null;
		hasRes = false;

    if (isNotOn) {
      str = "";
      btnVal = "On";
    } else {
      str = "0";
      btnVal = "Off";
			hist_arr.push(history);
    }
    input.disabled = isNotOn;
  } else if (btnVal === "Ac" || ["c", "C"].includes(e.key)) {
    str = "0";
  } else if (btnVal === "Del" || e.key === "Backspace") {
    str = str.substring(0, str.length - 1);
    if (str === "")
      str = "0";
  } else if (btnVal === "Hist" || e.key === "ArrowDown") {
		if (idx > 0) {
			history = hist_arr[idx - 1];
			idx--;
		}
    str = history;
  } else if (btnVal === "H↑" || e.key === "ArrowUp") {
		if (idx + 1 < hist_arr.length) {
			idx++;
			history = hist_arr[idx];
		}
		str = history;
	} else if (btnVal === "=" || e.key === "Enter") {
    history = str;
		hist_arr.push(history);
		idx = hist_arr.length;
		history = "0";
		parsedStr = str.replace(/÷/g, "/");
		parsedStr = parsedStr.replace(/x/g, "*");
		 for (const token of ['+', '-', '/', '*', ' of ', '%']) {
			if (parsedStr.startsWith(token))
			if (res && hasRes)
				parsedStr = res + parsedStr;
			break;
		};
		console.log(parsedStr);
    res = eval_simple_expr(parsedStr);
    if (res === undefined)
      return;
    str = res + "";
    hasReturned = true;
    hasRes = true;
  } else {
    if (str[0] === "0" && str.length === 1)
      str = str.slice(1);
    str += btnVal || e.key;
	}

	if (input.disabled === true)
		str = "";
	if (str[0] === "0" && !isNaN(str[1]))
		str = str.slice(1);
  input.value = str;
      
  if (hasReturned) {
    str = "";
    hasReturned = false;
  }
}

if (buttons.length > 0) {
  buttons.forEach((button) => {
    button.addEventListener("click", handleEvents);
  });
}

document.addEventListener("keydown", handleEvents);