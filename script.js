const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const revealItems = document.querySelectorAll(".reveal");
const testimonialTrack = document.querySelector("[data-testimonials]");
const dots = document.querySelectorAll("[data-slide]");

const iconPaths = {
  bot: '<path d="M12 8V4m-4 8h8m-9 8h10a3 3 0 0 0 3-3v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5a3 3 0 0 0 3 3Z"/><path d="M9 14h.01M15 14h.01"/>',
  database: '<ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v7c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 12v7c0 1.7 3.1 3 7 3s7-1.3 7-3v-7"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  cloud: '<path d="M17.5 19H8a6 6 0 1 1 1.2-11.88A7 7 0 0 1 22 12.5 4.5 4.5 0 0 1 17.5 19Z"/>',
  chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-4 4"/>',
  code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
  brain: '<path d="M12 5a3 3 0 0 0-5.83 1H6a4 4 0 0 0-1.17 7.83A4 4 0 0 0 8 20h4V5Z"/><path d="M12 5a3 3 0 0 1 5.83 1H18a4 4 0 0 1 1.17 7.83A4 4 0 0 1 16 20h-4V5Z"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z"/><path d="m12 15-3-3a22 22 0 0 1 2-7 12 12 0 0 1 8-3c0 2.8-.86 5.52-3 8a22 22 0 0 1-7 2Z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/>',
  landmark: '<path d="m3 22 18 0"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="m12 2 8 5H4Z"/>',
  education: '<path d="m22 10-10-5-10 5 10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
  health: '<path d="M12 21s-8-4.5-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 6.5-8 11-8 11Z"/><path d="M12 8v6"/><path d="M9 11h6"/>',
  finance: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="M8 15h8"/>',
  building: '<path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9h.01M9 13h.01M9 17h.01M15 13h.01M15 17h.01"/>',
  network: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M12 8v4"/><path d="M5 16v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/>'
};

document.querySelectorAll("[data-icon]").forEach((icon) => {
  const name = icon.getAttribute("data-icon");
  icon.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.check}</svg>`;
});

function handleHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}
window.addEventListener("scroll", handleHeader, { passive: true });
handleHeader();

menuToggle.addEventListener("click", () => {
  const isOpen = navPanel.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navPanel.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navPanel.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });
revealItems.forEach((item) => observer.observe(item));

let activeSlide = 0;
function setSlide(index) {
  activeSlide = index;
  testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot) => dot.classList.toggle("active", Number(dot.dataset.slide) === index));
}
dots.forEach((dot) => dot.addEventListener("click", () => setSlide(Number(dot.dataset.slide))));
setInterval(() => setSlide((activeSlide + 1) % dots.length), 5500);
