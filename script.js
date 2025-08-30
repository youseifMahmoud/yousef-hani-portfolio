// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Navbar background change on scroll
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Animate skill bars on intersection
const skillBars = document.querySelectorAll(".progress-bar");
const skillSection = document.getElementById("skills");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          const width = bar.style.width;
          bar.style.width = width;
        });
        skillObserver.unobserve(skillSection); // Stop observing after animation
      }
    });
  },
  { threshold: 0.5 }
);

if (skillSection) {
  skillObserver.observe(skillSection);
}

// Typing effect for hero title
function typeWriter(element, text, speed = 80) {
  let i = 0;
  element.innerHTML = "";
  const interval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

// Page loader functionality
const pageLoader = document.querySelector(".page-loader");
const body = document.body;

function hideLoader() {
  if (pageLoader) {
    pageLoader.classList.add("hidden");
    // Ensure body is visible and content is shown
    body.style.overflow = "auto";
  }
}

window.addEventListener("load", () => {
  // Hide the loader after a short delay to show the animation
  setTimeout(hideLoader, 500);

  // Start the typing animation
  const heroTitle = document.getElementById("typing-name");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 80);
  }

  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
  });
});

// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("li a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

// Theme toggle
const themeToggle = document.querySelector(".theme-toggle");
const bodyElement = document.body;
const moonIcon = document.querySelector(".theme-toggle .fa-moon");
const sunIcon = document.querySelector(".theme-toggle .fa-sun");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    bodyElement.classList.toggle("dark-mode");
    const isDarkMode = bodyElement.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);

    if (isDarkMode) {
      if (moonIcon) moonIcon.classList.replace("fa-moon", "fa-sun");
    } else {
      if (sunIcon) sunIcon.classList.replace("fa-sun", "fa-moon");
    }
  });

  // Check for dark mode preference on page load
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "true") {
    bodyElement.classList.add("dark-mode");
    if (moonIcon) moonIcon.classList.replace("fa-moon", "fa-sun");
  }
}