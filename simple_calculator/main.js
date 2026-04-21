import { eval_simple_expr } from "./utils/eval.js";

const buttons = document.querySelectorAll("button");
const input = document.querySelector("textarea");
let isNotOn = false, str = "";
let res = null, history = "0";
let hist_arr = [], idx = 0;
let hasReturned = false;

if (buttons.length > 0) {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
			let parsedStr = "";

      if (["Off", "On"].includes(button.textContent)) {
        isNotOn = !isNotOn;
				hist_arr = [];
				idx = 0;
				history = "0";
				res = null;

        if (isNotOn) {
          str = "";
          button.textContent = "On";
        } else {
          str = "0";
          button.textContent = "Off";
					hist_arr.push(history);
        }
        input.disabled = isNotOn;
      } else if (button.textContent === "Ac") {
        str = "0";
      } else if (button.textContent === "Del") {
        str = str.substring(0, str.length - 1);
      } else if (button.textContent === "Hist") {
				if (idx > 0) {
					history = hist_arr[idx - 1];
					idx--;
				}
        str = history;
      } else if (button.textContent === "H ↑") {
				if (idx + 1 < hist_arr.length) {
					idx++;
					history = hist_arr[idx];
				}
				str = history;
			} else if (button.textContent === "=") {
        history = str;
				hist_arr.push(history);
				idx = hist_arr.length;
				history = "0";
				parsedStr = str.replace(/÷/g, "/");
				parsedStr = parsedStr.replace(/x/g, "*");
				['+', '-', '/', '*', ' of ', '%'].forEach((token) => {
				  if (parsedStr.startsWith(token) && res)
				    parsedStr = res + parsedStr;
				})
        res = eval_simple_expr(parsedStr);
        if (res === undefined)
          return;
        str = res + "";
        hasReturned = true;
      } else {  
        str += button.textContent;
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
    })
  });
}
