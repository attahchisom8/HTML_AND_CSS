import { eval_simple_expr } from "./utils/eval.js";

const buttons = document.querySelectorAll("button");
const input = document.querySelector("input");
let isNotOn = false, str = "";
let res = 0, history = "";

if (buttons.length > 0) {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (["Off", "On"].includes(button.textContent)) {
        isNotOn = !isNotOn;
        history = "";
        if (isNotOn) {
          str = "";
          button.textContent = "On";
        } else {
          str = "0";
          button.textContent = "Off";
        }
        input.value = str;
        input.disabled = isNotOn;
      } else if (button.textContent === "Ac") {
        str = "0";
      } else if (button.textContent === "Del") {
        str = str.substring(0, str.length - 1);
      } else if (button.textContent === "Hist") {
        str = history;
      } else if (button.textContent === "=") {
        history = str;
        res = eval_simple_expr(str);
        console.log("res: ", res)
        str = res + "";
      } else {  
        str += button.textContent;
      }
      input.value = str;
    })
  });
}
