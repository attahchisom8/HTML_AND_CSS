const container = document.getElementById("container");
const loginBtn = document.getElementById("login");
const registerBtn = document.getElementById("register");

registerBtn?.addEventListener("click", () => {
	container.classList.add("active");
});

loginBtn?.addEventListener("click", () => {
	container.classList.remove("active");
});

// This will prevent default form submidsion
const formBtns = document.querySelectorAll("form button");

if (formBtns.length > 0) {
	formBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			e.preventDefault();
		});
	});
};