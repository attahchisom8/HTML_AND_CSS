import { eval_simple_expr } from "./utils/eval.js";

const buttons = document.querySelectorAll("button");
const input = document.querySelector("input");
let isNotOn = false, str = "";
let res = 0, history = "0";
let hist_arr = [], idx = 0;

if (buttons.length > 0) {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
			let parsedStr = "";

      if (["Off", "On"].includes(button.textContent)) {
        isNotOn = !isNotOn;
				hist_arr = [];
				idx = 0;
				history = "0";

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
        res = eval_simple_expr(parsedStr);
        console.log("res: ", res);
        str = res + "";
      } else {  
        str += button.textContent;
			}

			if (input.disabled === true)
				str = "";
      input.value = str;
    })
  });
}
