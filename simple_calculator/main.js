import { eval_simple_expr } from "./utils/eval.js";

const buttons = document.querySelectorAll("button");
const input = document.querySelector("textarea");
let isNotOn = false, str = "";
let res = null, history = "0";
let hist_arr = [], idx = 0;
let hasReturned = false, hasRes = false;
const switchBtn = Array.from(buttons).find((btn) => btn.textContent === "Off" || btn.textContent === "On");


const handleEvents = (btnVal) => {
  let parsedStr = "";
  console.log(btnVal);


  if (["Off", "On"].includes(btnVal)) {
    isNotOn = !isNotOn;
		hist_arr = [];
		idx = 0;
		history = "0";
		res = null;

    if (isNotOn) {
      str = "";
      if (switchBtn)
        switchBtn.textContent = "On"
      input.classList.add("inactive-state");
    } else {
      str = "0";
      if (switchBtn)
        switchBtn.textContent = "Off";
			hist_arr.push(history);
      input.classList.remove("inactive-state");
    }
    input.disabled = isNotOn;
  } else if (btnVal === "Ac") {
    str = "0";
    res = null;
  } else if (btnVal === "Del") {
    str = str.substring(0, str.length - 1);
    if (str === "")
      str = "0";
  } else if (btnVal === "Hist") {
		if (idx > 0) {
		  idx--;
			history = hist_arr[idx];
		}
    str = history;
  } else if (btnVal === "H↑") {
		if (idx + 1 < hist_arr.length) {
			idx++;
			history = hist_arr[idx];
		}
		str = history;
	} else if (btnVal === "=") {
    history = str;
		hist_arr.push(history);
		idx = hist_arr.length;
		history = "0";
		parsedStr = str.replace(/÷/g, "/").replace(/x/g, "*");
		 for (const token of ['+', '-', '/', '*', ' of ', '%']) {
			if (parsedStr.startsWith(token) && res) {
			  parsedStr = res + parsedStr;
        break;
			}
		};
		console.log(parsedStr);
    res = eval_simple_expr(parsedStr);
    if (res === undefined)
      return;
    str = res + "";
    hasReturned = true;
    hasRes = true;
  } else {
    if (hasRes) {
      if (/^[0-9.()]$/.test(btnVal)) {
        str = "";
        res = null;
      }
      hasRes = false;
    }
    if (str === "0") {
    } else
      str += btnVal;
	}

	if (input.disabled === true)
		str = "";
	if (str === "0")
		str = "0";
  input.value = str;
      
  if (hasReturned) {
    str = "";
    hasReturned = false;
  }
}

if (buttons.length > 0) {
  buttons.forEach((button) => {
    button.addEventListener("click",  (e) => handleEvents(e.target.textContent.trim()));
  });
}



document.addEventListener("keydown", (e) => {
  const keyMap = {
    "Escape": isNotOn ? "On" : "Off",
    "Enter": "=",
    "c": "Ac",
    "C": "Ac",
    "Backspace": "Del",
    "ArrowDown": "Hist",
    "ArrowUp": "H↑",
    "*": "x",
    "/": "÷"
  };
  const keyVal = keyMap[e.key] || e.key;
  
  if (/^([0-9.+\-%()]|of)$/.test(keyVal) || Object.values(keyMap).includes(keyVal)) {
    e.preventDefault();
    handleEvents(keyVal);
  }
  
});