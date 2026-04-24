# 🧮 Mastermose Pro Calculator
### *More than just a UI—A custom-built mathematical expression engine.*

Mastermose Pro is a high-performance web calculator built with **Vanilla JavaScript**. Unlike standard web calculators that rely on the risky and limited `eval()` function, this project features a custom-engineered **BODMAS/Order of Operations parser**. It demonstrates advanced logic handling, tokenization, and recursive algorithm design.

---

## 🌟 Key Features

### 🧠 Advanced Custom Math Engine
* **Zero `eval()` Usage:** Built from scratch using a custom `extractTokens` and `performOperation` architecture.
* **BODMAS Compliance:** Intelligently handles operator precedence (e.g., `of`, `/`, `*`, `+`, `-`).
* **Parenthesis Support:** Implements recursive evaluation to handle nested expressions like `(2 + 5) * (10 / (2 + 3))`.
* **The "of" Operator:** Native support for the "of" operator, treated with higher precedence as per mathematical standards.

### ⚡ Professional User Experience
* **Dual Input Support:** Seamlessly switch between mouse clicks and a fully mapped **Keyboard Mode**.
* **Smart History System:** Use `Hist` and `H↑` (or Arrow keys) to navigate through previous calculations saved in the session memory.
* **"Real-Feel" LCD Display:** Includes a custom blinking cursor state when idle, mimicking hardware digital calculators.
* **Power Management:** Fully functional `Off/On` toggle that manages lifecycle states, memory resets, and logic stack clearing.

### 🎨 Modern Responsive Design
* **Mobile-First CSS:** Optimized for touch interaction with haptic-style `:active` states and scale transformations.
* **Desktop Enhancement:** Automatically adapts to a sleek, gradient-background desktop view with expanded layouts and hover effects.

---

## 🛠️ Technical Deep Dive

### The Logic Stack
The application logic is decoupled into specialized ES6 modules:
1.  **`maths.js`**: A pure functional library for core arithmetic operations (Sum, Sub, Mult, Div, Mod).
2.  **`eval.js`**: The brains of the operation. It tokenizes raw strings, validates parenthesis matching, and sorts operations by precedence.
3.  **`main.js`**: The state controller managing UI updates, event listeners, keyboard whitelisting, and the history stack.

### Intelligent Placeholder Logic
The calculator handles the "Initial Zero" problem with precision. It distinguishes between a system placeholder and user intent:
* Typing `-5` → Shows `-5`.
* Typing `0-5` → Shows `0-5`.
* The engine intelligently truncates unnecessary leading zeros without breaking decimal logic.

---

## 🚀 Installation & Usage

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/attahchisom8/HTML_AND_CSS.git](https://github.com/attahchisom8/HTML_AND_CSS.git)
    ```
2.  **Open the project:**
    Simply open `index.html` in any modern web browser.

### ⌨️ Keyboard Shortcuts
| Key | Action |
| :--- | :--- |
| **Enter** | Calculate (`=`) |
| **Esc** | Power Toggle (`On/Off`) |
| **Backspace** | Delete Last Character |
| **c / C** | Clear Screen (`Ac`) |
| **Arrow Up / Down** | Navigate Calculation History |
| **\* / /** | Multiply / Divide |

---

## 👨‍💻 Developer Insight
This project was built to demonstrate proficiency in:
* **String Manipulation & Regex:** Tokenizing complex mathematical strings into manageable data structures.
* **Recursion:** Handling deep-nested parentheses through recursive functional calls.
* **State Management:** Tracking history, power states, and input strings without external dependencies.
* **UI/UX Design:** Creating a responsive, accessible interface with CSS variables and keyframe animations.

---
*Created by **Mastermose Production Inc.***
