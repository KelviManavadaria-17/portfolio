// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Blog Carousel Functionality
const carouselTrack = document.querySelector(".carousel-track")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")
const blogCards = document.querySelectorAll(".blog-card")

let currentIndex = 0
const cardWidth = 370 // 350px + 20px margin
const visibleCards = window.innerWidth > 768 ? 3 : 1
const maxIndex = Math.max(0, blogCards.length - visibleCards)

function updateCarousel() {
  const translateX = -currentIndex * cardWidth
  carouselTrack.style.transform = `translateX(${translateX}px)`

  // Update button states
  prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1"
  nextBtn.style.opacity = currentIndex >= maxIndex ? "0.5" : "1"
}

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--
    updateCarousel()
  }
})

nextBtn.addEventListener("click", () => {
  if (currentIndex < maxIndex) {
    currentIndex++
    updateCarousel()
  }
})

// Auto-scroll carousel
setInterval(() => {
  if (currentIndex >= maxIndex) {
    currentIndex = 0
  } else {
    currentIndex++
  }
  updateCarousel()
}, 5000)

// Initialize carousel
updateCarousel()

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
  }
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".skill-category, .timeline-item, .interest-item, .contact-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Handle window resize for carousel
window.addEventListener("resize", () => {
  const newVisibleCards = window.innerWidth > 768 ? 3 : 1
  const newMaxIndex = Math.max(0, blogCards.length - newVisibleCards)

  if (currentIndex > newMaxIndex) {
    currentIndex = newMaxIndex
  }

  updateCarousel()
})
