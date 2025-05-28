// Fungsi buka surat dari halaman envelope
function openLetter() {
  window.location.href = "message.html";
}

// Slider controls
let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelector('.slides');
  if (!slides) return;

  const totalSlides = slides.children.length;

  if (index >= totalSlides) currentSlide = 0;
  else if (index < 0) currentSlide = totalSlides - 1;
  else currentSlide = index;

  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector('.slides')) {
    showSlide(0);
  }
});

// Play music on first click
window.addEventListener('click', function () {
  const music = document.getElementById('bg-music');
  music.muted = false;
  music.play();
}, { once: true });

// ==== Fireworks ====
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
  constructor(x, y, targetY) {
    this.x = x;
    this.y = y;
    this.targetY = targetY;
    this.speed = 3 + Math.random() * 2;
    this.exploded = false;
    this.particles = [];
  }

  update() {
    if (!this.exploded) {
      this.y -= this.speed;
      if (this.y <= this.targetY) {
        this.exploded = true;
        this.createParticles();
      }
    } else {
      this.particles.forEach(p => p.update());
    }
  }

  draw() {
    if (!this.exploded) {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      this.particles.forEach(p => p.draw());
    }
  }

  createParticles() {
    const colors = ["#ff4d4d", "#ffd700", "#00ccff", "#cc00ff"];
    for (let i = 0; i < 50; i++) {
      this.particles.push(new Particle(this.x, this.y, colors[Math.floor(Math.random() * colors.length)]));
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.color = color;
    this.speed = Math.random() * 5;
    this.angle = Math.random() * 2 * Math.PI;
    this.alpha = 1;
    this.gravity = 0.05;
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle) + this.gravity;
    this.alpha -= 0.01;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

let fireworks = [];

function launchFirework() {
  let x = Math.random() * canvas.width;
  let y = canvas.height;
  let targetY = Math.random() * canvas.height / 2;
  fireworks.push(new Firework(x, y, targetY));
}

function animate() {
  requestAnimationFrame(animate);

  // Gunakan clearRect daripada fillRect hitam agar transparan
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach(f => f.update());
  fireworks.forEach(f => f.draw());
  fireworks = fireworks.filter(f => f.particles.length === 0 || f.particles[0].alpha > 0.01);
}

setInterval(launchFirework, 1000);
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
