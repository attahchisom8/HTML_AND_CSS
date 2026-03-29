// For mobile

const menuToggle = document.getElementById("menuToggleMobile");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("is-active");
});

const li = document.getElementsByTagName("li");
Array.from(li).forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("is-active");
  });
});

// Light mode
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ?
"🌙":"☀️";
})

// Dynamic ryping animation
const typingElement = document.getElementById("typing");
const textArr = [
  "A Certified Full stack Software Engineer",
  "A python Developer",
  "A Rust Developer",
  "A Javascript Expert",
  "A Certified Mathematician",
  "And AI Enthusiast"
];

let idx = 0, charIdx = 0;

const type = () => {
  if (charIdx < textArr[idx].length) {
    typingElement.textContent += textArr[idx].charAt(charIdx);
    charIdx++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

const erase = () => {
  if (charIdx > 0) {
    charIdx--;
    typingElement.textContent = textArr[idx].substring(0, charIdx);
    setTimeout(erase, 50);
  } else {
    idx = (idx + 1) % textArr.length;
    setTimeout(type, 300);
  }
}

type();

// Particle animation
particlesJS("particles-js", {
  particles: {
    number: {value: 130},
    color: {value: "#DDFF5F"},
    shape: {type: "circle"},
    opacity: {value: 0.5},
    size: {value: 5},
    line_linked: {
      enable: true,
      distance: 150,
      color: "#FF1175",
      opacity: 0.4,
      width: 3,
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      }
    }
  }
});

