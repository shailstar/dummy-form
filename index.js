
// Year update
document.getElementById('year').textContent = new Date().getFullYear();
// Canvas background animation
const canvas = document.getElementById('bgCanvas'), ctx = canvas.getContext('2d');
let particles = []; function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight } window.addEventListener('resize', resize); resize();
class Particle { constructor() { this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height; this.size = Math.random() * 3 + 1; this.speedX = (Math.random() - 0.5) * 0.5; this.speedY = (Math.random() - 0.5) * 0.5; this.color = `hsla(${Math.random() * 360},70%,60%,0.6)`; } update() { this.x += this.speedX; this.y += this.speedY; if (this.x < 0 || this.x > canvas.width) this.speedX *= -1; if (this.y < 0 || this.y > canvas.height) this.speedY *= -1; } draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill(); } }
function init() { particles = []; for (let i = 0; i < 80; i++) { particles.push(new Particle()); } }
function animate() { ctx.clearRect(0, 0, canvas.width, canvas.height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
init(); animate();

// Intersection Observer for staggered reveal
const workItems = document.querySelectorAll('.work-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
        setTimeout(() => {
        entry.target.classList.add('visible');
        }, idx * 150); // stagger delay
        observer.unobserve(entry.target);
    }
    });
}, { threshold: 0.1 });

workItems.forEach(item => observer.observe(item));


// Notes data
const notesData = [
  {
    title: "JavaScript Design Patterns",
    date: "17-08-2025",
    author: "Shailendra Singh",
    preview: "In depth explanation of javascript design patterns",
    tags: ["javascript", "performance", "frontend"],
    notability: "https://notability.com/n/2L661PZFO8LOjWmBL4bMn4"
  },
  {
    title: "Frontend Architecture Chronology and History",
    date: "15-08-2025",
    author: "Shailendra Singh",
    preview: "How frontend architure evolved and where we are.",
    tags: ["architecture", "frontend", "javascript"],
    notability: "https://notability.com/n/3wgyQYid4Tdz0DSNwikp1"
  },
  {
    title: "CSS Mental Model",
    date: "10-08-2025",
    author: "Shailendra Singh",
    preview: "Mental Model to navigate CSS randomness",
    tags: ["css", "frontend"],
    notability: "https://notability.com/n/2KpwEGb145CtP5mLW6pbSf"
  },
  {
    title: "Flexbox Layout Mental Model",
    date: "10-08-2025",
    author: "Shailendra Singh",
    preview: "What's inside flexbox layout, how it works under the hood",
    tags: ["css", "frontend"],
    notability: "https://notability.com/n/1VZg0iXy82kf5fzawOp5L4"
  },
  {
    title: "Grid Layout Mental Model",
    date: "10-08-2025",
    author: "Shailendra Singh",
    preview: "What's inside Grid layout, how it works under the hood",
    tags: ["css", "frontend"],
    notability: "https://notability.com/n/XrO4c1KO749OHxf1RgDXX"
  },
  {
    title: "Responsive Layout Mental Modal",
    date: "10-08-2025",
    author: "Shailendra Singh",
    preview: "How to make pages responsive",
    tags: ["css", "frontend"],
    notability: "https://notability.com/n/2xIx9oiTO9Xt0_5BR4ZqOE"
  }
];

// DOM refs
const notesList = document.getElementById("notesList");
const tagFilters = document.getElementById("tagFilters");
const searchInput = document.getElementById("searchInput");

let activeTag = "all";

// Render filters dynamically
function renderFilters() {
  const allTags = new Set();
  notesData.forEach(note => note.tags.forEach(tag => allTags.add(tag)));

  const tags = ["all", ...allTags];
  tagFilters.innerHTML = tags.map(tag =>
    `<button class="tag ${tag === "all" ? "active" : ""}" data-tag="${tag}">${tag}</button>`
  ).join("");

  // Add filter listeners
  tagFilters.querySelectorAll(".tag").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tag-filters .tag").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeTag = btn.dataset.tag;
      renderNotes();
    });
  });
}

// Render notes dynamically
function renderNotes() {
  const query = searchInput.value.toLowerCase();

  notesList.innerHTML = notesData
    .filter(note => {
      const matchesQuery = note.title.toLowerCase().includes(query) || note.preview.toLowerCase().includes(query);
      const matchesTag = activeTag === "all" || note.tags.includes(activeTag);
      return matchesQuery && matchesTag;
    })
    .map(note => `
      <article class="note-card" data-tags="${note.tags.join(" ")}">
        <div class="note-content">
          <div class="note-meta">
            <span>📅 ${note.date}</span>
            <span>✍️ ${note.author}</span>
          </div>
          <h3 class="note-title">${note.title}</h3>
          <p class="note-preview">${note.preview}</p>
          <div class="note-tags">
            ${note.tags.map(t => `<span class="tag">${t}</span>`).join("")}
          </div>
          <div class="note-actions">
            <a href="${note.notability}" target="_blank" class="btn-link">📓 View Notability Note</a>
          </div>
        </div>
      </article>
    `).join("");
}

// Search listener
searchInput.addEventListener("input", renderNotes);

// Initial render
renderFilters();
renderNotes();

  


