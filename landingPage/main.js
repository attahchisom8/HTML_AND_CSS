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

// Observe to watch if the skiill section are in view then animate it

const skillItems = document.querySelectorAll(".skill");
const skillPercentage = {
  rust: 30,
  c: 80,
  html: 90,
  js: 85,
  css: 80,
  react_next: 68
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progress = entry.target.querySelector(".progress");
      const span = progress.querySelector(".percentage");
      let target = 0;

      if (progress.classList.contains("Rust"))
        target = skillPercentage.rust;
      if (progress.classList.contains("C"))
        target = skillPercentage.c;
      if (progress.classList.contains("html"))
        target = skillPercentage.html;
        
      if (progress.classList.contains("js"))
        target = skillPercentage.js;
        
      if (progress.classList.contains("css"))
        target = skillPercentage.css;
        
      if (progress.classList.contains("react-next"))
        target = skillPercentage.react_next;
      
      let width = 0;
      const interval = setInterval(() => {
        if (width >= target)
          clearInterval(interval);
        else {
          width++;
          progress.style.width = width + "%";
          span.textContent = width + "%";
        }
      }, 20);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillItems.forEach((skill) => {
  observer.observe(skill);
});

// Aniamatr all section classes
const sections = document.querySelectorAll(".section");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      
      // sectionObserver.unobserve(entry.target);
    } else {
      if (entry.target.classList.contains("active"))
        entry.target.classList.remove("active");
    }
  })
}, {
  threshold: 0.05,
  rootMargin: "0px 0px -50px 0px"
});

sections.forEach((section) => {
  section.classList.add("reveal");
  sectionObserver.observe(section);
});

/** Watch and Animate The Rxperience section **/

const timeline = document.querySelector(".timeline");

if (timeline) {
  const timelineItems = timeline.querySelectorAll(".timeline-item");

  const timelineObserver = new   IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        if (entry.target.classList.contains("active")) {
          entry.target.classList.remove("active");
        }
      }
    })
  }, { threshold: 0.1 });

  timelineItems.forEach((item) => {
    timelineObserver.observe(item);
  });
}


// To mark visited links

const links = document.querySelectorAll(".nav-links li a");

if (links.length > 0) {
  links.forEach((link) => {
    link.addEventListener("click", () => {
      // irst reset all the links
      links.forEach((l) => l.classList.remove("active-link"));

      // then add  the class to the current link
      link.classList.add("active-link");
    });
  });
}